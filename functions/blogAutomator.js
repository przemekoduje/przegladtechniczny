// const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onCall } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const OpenAI = require("openai");
const path = require("path");
const nodemailer = require("nodemailer");

// Load .env from the functions directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_firebase_deploy"
});

const BOT_EMAIL = "przemek.rakotny@gmail.com";
const BOT_PASSWORD = "fjax fevs qlsb etjq";
const ADMIN_EMAIL = "przemek.rakotny@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: BOT_EMAIL, pass: BOT_PASSWORD },
});

const db = getFirestore();

/**
 * Downloads an image from a URL and uploads it to Firebase Storage
 */
async function downloadAndUploadImage(url, fileName) {
  console.log(`Downloading image from ${url}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const bucket = getStorage().bucket();
  const file = bucket.file(`blog-images/${fileName}`);

  console.log(`Uploading to Storage: blog-images/${fileName}...`);
  await file.save(buffer, {
    metadata: { contentType: 'image/webp' },
    public: true
  });

  return `https://storage.googleapis.com/${bucket.name}/blog-images/${fileName}`;
}

/**
 * AI Blog Generation Core Logic
 */
async function runBlogAutomation() {
  const postsSnapshot = await db.collection("posts")
    .orderBy("date", "desc")
    .limit(15)
    .get();

  const existingTitles = postsSnapshot.docs.map(doc => doc.data().title);

  const pillars = [
    "Prawo budowlane i normy techniczne",
    "Awarie, usterki i diagnostyka budynków",
    "Ubezpieczenia, finanse i koszty eksploatacji",
    "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
  ];

  const funnelStages = [
    "Edukacja ogólna (budowanie świadomości)",
    "Rozwiązywanie konkretnego problemu (edukacja ekspercka)",
    "Mocna sprzedaż i CTA (zachęta do audytu/przeglądu)"
  ];

  const imageStyles = [
    "A minimalist, hand-drawn pencil sketch on a pure white background. Key elements colored using a single, vibrant orange crayon (hex #f97316) in a loose, waxy texture.",
    "A technical architectural blueprint style. Clean white lines on a dark blue grid background. One key focal element MUST be highlighted with a vibrant orange crayon (hex #f97316) texture.",
    "A rough, conceptual engineering sketch using messy charcoal lines on white paper. Highlighted only with a vibrant orange crayon (hex #f97316) for emphasis."
  ];

  let feedbackTexts = [];
  try {
    const feedbackSnapshot = await db.collection("blog_feedback")
      .orderBy("date", "desc")
      .limit(3)
      .get();
    feedbackTexts = feedbackSnapshot.docs.map(doc => doc.data().feedbackText).filter(Boolean);
  } catch (err) {
    console.error("Error fetching feedback:", err);
  }

  let targetKeywords = [
    "przeglądy techniczne nieruchomości", "przegląd 5-letni domu", "odbiór techniczny mieszkania Śląsk",
    "koszt przeglądu budowlanego", "ubezpieczenie domu a przegląd", "inżynier budownictwa Gliwice",
    "książka obiektu budowlanego", "badanie instalacji elektrycznej", "kamera termowizyjna Śląsk"
  ];

  try {
    const keywordsDoc = await db.collection("settings").doc("blogKeywords").get();
    if (keywordsDoc.exists && keywordsDoc.data().keywords) {
      targetKeywords = keywordsDoc.data().keywords;
    }
  } catch (err) {
    console.error("Error fetching keywords:", err);
  }

  const activePillar = pillars[Math.floor(Math.random() * pillars.length)];
  const activeStage = funnelStages[Math.floor(Math.random() * funnelStages.length)];
  const activeStyle = imageStyles[Math.floor(Math.random() * imageStyles.length)];
  const selectedKeywords = [...targetKeywords].sort(() => 0.5 - Math.random()).slice(0, 3);

  const systemPrompt = "Jesteś doświadczonym inżynierem budownictwa ze Śląska...";
  const userPrompt = `Napisz artykuł... Tytuły: [ ${existingTitles.join(', ')} ]. Strategia: ${activePillar}`;

  console.log("Calling OpenAI for draft...");
  const contentCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
  });

  const aiResponse = JSON.parse(contentCompletion.choices[0].message.content);
  const finalImagePrompt = `illustration for '${aiResponse.title}'. Style: ${activeStyle}.`;

  let imageUrl = "https://placehold.co/1792x1024/orange/white?text=Blog+Update";
  try {
    const falResponse = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: { "Authorization": `Key ${process.env.FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: finalImagePrompt, image_size: "landscape_16_9", num_inference_steps: 4, sync_mode: true })
    });
    const falData = await falResponse.json();
    const tempUrl = falData.images?.[0]?.url || falData.image?.url;
    if (tempUrl) {
      const safeTitle = aiResponse.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
      imageUrl = await downloadAndUploadImage(tempUrl, `${safeTitle}_${Date.now()}.webp`);
    }
  } catch (e) {
    console.error("Image failed:", e);
  }

  const draftData = {
    title: aiResponse.title,
    content: aiResponse.description,
    content2: aiResponse.content,
    categories: aiResponse.categories,
    tags: aiResponse.tags || [],
    facebookPost: aiResponse.facebookPost || "",
    imageUrl: imageUrl,
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
    type: "StandardPost"
  };

  const docRef = await db.collection("pending_posts").add(draftData);
  return { id: docRef.id, title: aiResponse.title };
}

/**
 * AI Analytics for Co-Pilot
 */
exports.getBlogAnalytics = onCall({ cors: true }, async (request) => {
  try {
    console.log("[Co-Pilot] analytical scan started...");

    // Fetch from BOTH 'posts' and 'pending_posts' to see all activity
    // Removed orderBy to ensure it works even if indexes are missing during migration
    const [postsSnapshot, pendingSnapshot] = await Promise.all([
      db.collection("posts").limit(100).get(),
      db.collection("pending_posts").limit(100).get()
    ]);

    const allDocs = [
      ...postsSnapshot.docs.map(d => ({ ...d.data(), source: 'published' })),
      ...pendingSnapshot.docs.map(d => ({ ...d.data(), source: 'pending' }))
    ];

    const titles = allDocs.map(p => p.title).filter(t => typeof t === "string" && t.trim() !== "");
    console.log(`[Co-Pilot] titles count: ${titles.length}`);

    const pillars = [
      "Prawo budowlane i normy techniczne",
      "Awarie, usterki i diagnostyka budynków",
      "Ubezpieczenia, finanse i koszty eksploatacji",
      "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
    ];

    const pillarCounts = {};
    pillars.forEach(p => pillarCounts[p] = 0);
    allDocs.forEach(post => {
      if (post.categories) {
        post.categories.forEach(cat => {
          if (pillarCounts.hasOwnProperty(cat)) pillarCounts[cat]++;
        });
      }
    });

    // --- SUPER PERMISSIVE SERIES DETECTION & AGGREGATION ---
    const detectedCyclesMap = new Map();

    titles.forEach(title => {
      // Look for (\d+ / \d+) or similar patterns anywhere. 
      const numberingRegex = /(\d+)\s*[\/z]\s*(\d+)/i;
      const match = title.match(numberingRegex);

      if (match) {
        const fullMatchText = match[0];
        const lastIndex = title.lastIndexOf(fullMatchText);
        let base = title.substring(0, lastIndex).trim();

        // Remove Polish prefixes often used: Część, Cześć, Cz., Part
        base = base.replace(/(?:\s*(?:Cz\.|Część|Cześć|Part))\s*$/i, "").trim();
        // Remove trailing punctuation or formatting
        base = base.replace(/[.,:;(\[/\s-]+$/, "").trim() || "Bez tytułu";

        const current = parseInt(match[1]);
        const total = parseInt(match[2]);

        // Create an aggressive normalized key for deduplication (strip emojis, lowerspace)
        const normalizeStr = (str) => {
          return str.toLowerCase()
            .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
            .replace(/[^a-z0-9]/gi, '')
            .trim();
        };
        const key = normalizeStr(base);

        if (!detectedCyclesMap.has(key)) {
          detectedCyclesMap.set(key, {
            name: base, // Keep original name from the first time we see it (usually the newest version)
            maxCurrent: current,
            total: total,
            existingParts: [{ title: title, current: current }]
          });
        } else {
          // Update if we find a higher part or just add to existing parts list
          const cycleData = detectedCyclesMap.get(key);
          if (current > cycleData.maxCurrent) {
            cycleData.maxCurrent = current;
          }
          cycleData.existingParts.push({ title: title, current: current });
        }
      }
    });

    const uniqueCycles = [];
    detectedCyclesMap.forEach((cycleData) => {
      if (cycleData.maxCurrent < cycleData.total) { // Only suggest if not finished
        uniqueCycles.push({
          name: cycleData.name,
          current: cycleData.maxCurrent,
          total: cycleData.total,
          suggestion: `${cycleData.name} Cz. ${cycleData.maxCurrent + 1}/${cycleData.total}`,
          existingParts: cycleData.existingParts.sort((a, b) => a.current - b.current)
        });
      }
    });

    // Suggestions
    const cycleTitles = uniqueCycles.map(c => c.suggestion);
    const analysisTargets = [...pillars, ...cycleTitles];

    let aiSuggestionsByTarget = {};
    if (analysisTargets.length > 0) {
      console.log("[Co-Pilot] Requesting suggestions for targets:", analysisTargets.length);
      const topicCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Jesteś ekspertem SEO i content helperem. Dla każdego podanego obszaru/tytułu zasugeruj 3 konkretne, profesjonalne tematy. Musisz zwrócić TYLKO poprawny obiekt JSON, gdzie kluczem jest nazwa obszaru, a wartością TABLICA 3 STRINGÓW."
          },
          {
            role: "user",
            content: `Obszary: [ ${analysisTargets.join(", ")} ]. Poprzednie tytuły: [ ${titles.slice(0, 15).join(", ")} ].
          Zwróć dokładnie taki format:
          {
            "Nazwa obszaru 1": ["Temat 1", "Temat 2", "Temat 3"],
            "Nazwa obszaru 2": ["Temat 1", "Temat 2", "Temat 3"]
          }`
          }
        ],
        response_format: { type: "json_object" }
      });
      aiSuggestionsByTarget = JSON.parse(topicCompletion.choices[0].message.content);
    }

    let targetKeywords = ["przegląd domu", "przeglądy techniczne", "Gliwice"];
    try {
      const keywordsDoc = await db.collection("settings").doc("blogKeywords").get();
      if (keywordsDoc.exists && keywordsDoc.data().keywords) targetKeywords = keywordsDoc.data().keywords;
    } catch (e) { }

    const seoSuggestions = [...targetKeywords].sort(() => 0.5 - Math.random()).slice(0, 5);

    return {
      success: true,
      data: {
        topicRadar: {
          counts: pillarCounts,
          missing: pillars.filter(p => pillarCounts[p] === 0)
        },
        topicSuggestions: aiSuggestionsByTarget,
        openCycles: uniqueCycles,
        seoSuggestions,
        allKeywords: targetKeywords,
        _debugStatus: {
          titlesFound: titles.length,
          lastDetectedCycleCount: uniqueCycles.length,
          collections: ["posts", "pending_posts"]
        }
      }
    };
  } catch (error) {
    console.error("[Co-Pilot] Critical Error:", error);
    return { success: false, error: error.message };
  }
});

exports.generateDraftManual = onCall({ cors: true }, async (request) => {
  try {
    const result = await runBlogAutomation();
    return { success: true, ...result };
  } catch (error) {
    console.error("Manual generation failed:", error);
    return { success: false, error: error.message };
  }
});
