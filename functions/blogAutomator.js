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

/**
 * AI Co-Pilot: Outline Generation (Step 1)
 * Accepts user instructions from the Admin Panel and returns a detailed Markdown outline.
 */
exports.generateDraftCoPilot = onCall({ cors: true }, async (request) => {
  try {
    const payload = request.data;
    console.log("[Co-Pilot] Outline generation requested with payload:", payload);

    const {
      topic,
      theses,
      selectedKeywords,
      includeBuildingLaw,
      includeAnecdote
    } = payload;

    if (!topic) {
      throw new Error("Missing required field: topic");
    }

    const systemPrompt = "Jesteś asystentem redakcyjnym i strategiem treści dla doświadczonego inżyniera budownictwa. Twoim zadaniem jest stworzenie szczegółowego konspektu artykułu na podstawie wytycznych.";

    let userPromptBuilder = `Oto wytyczne od Głównego Inżyniera:\n\n`;
    userPromptBuilder += `- Temat: ${topic}\n`;
    
    if (selectedKeywords && selectedKeywords.length > 0) {
      userPromptBuilder += `- Słowa kluczowe do wplecenia: ${selectedKeywords.join(", ")}\n`;
    }
    
    if (theses) {
      userPromptBuilder += `- Główne tezy inżyniera:\n${theses}\n`;
    }

    let constraints = [];
    if (includeBuildingLaw) constraints.push("cytat prawny (Prawo Budowlane / Normy)");
    if (includeAnecdote) constraints.push("anegdotę z budowy ze Śląska");
    
    if (constraints.length > 0) {
      userPromptBuilder += `- Uwzględnij miejsce na: ${constraints.join(" oraz ")}.\n`;
    }

    userPromptBuilder += `\nZadanie: Wygeneruj szczegółowy konspekt artykułu. Zwróć go jako rzetelnie sformatowany kod HTML.
Konspekt musi zawierać:
1. Propozycję chwytliwego Tytułu w znaczniku <h2>.
2. Nagłówki sekcji w znacznikach <h3>.
3. Pod każdym nagłówkiem krótkie wypunktowanie (<ul><li>) tego, co powinno się tam znaleźć.
4. Wyraźnie zaznacz w konspekcie [MIEJSCE NA TWOJĄ ANEGDOTĘ] lub [MIEJSCE NA CYTAT Z PRAWA] używając np. pogrubienia <strong>, abym wiedział, gdzie mam dopisać swój tekst ekspercki.

Zwróć TYLKO czysty kod HTML (nie dodawaj znaczników \`\`\`html ani \`\`\` wokół kodu). Będzie on od razu wyświetlony w edytorze.`;

    console.log("Calling OpenAI for Co-Pilot outline...");
    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPromptBuilder }
      ]
      // No JSON formatting forced here, we want standard markdown text
    });

    const markdownOutline = contentCompletion.choices[0].message.content.trim();
    
    return {
      success: true,
      outline: markdownOutline
    };

  } catch (error) {
    console.error("[Co-Pilot] Error generating outline:", error);
    return { success: false, error: error.message };
  }
});

// Krok 2: Generowanie pełnego artykułu na podstawie zedytowanego konspektu HTML
exports.generateDraftFromOutline = onCall(async (request) => {
  try {
    const { outlineHtml, topic, selectedKeywords, isSeries, seriesName } = request.data;
    if (!outlineHtml || !topic) {
      throw new Error("Missing required fields: outlineHtml or topic");
    }

    const systemPrompt = `Jesteś doświadczonym Inżynierem Przemkiem, autorem bloga o prawie budowlanym i przeglądach domów.
Twoim zadaniem jest napisanie WYCZERPUJĄCEGO, merytorycznego i eksperckiego artykułu (min. 800 słów) na podstawie dostarczonego konspektu HTML.

ZASADY:
1. ZIGNORUJ fragmenty konspektu, które są przekreślone (zawarte w znaczniku <strike> lub <span style="text-decoration: line-through;">).
2. SZCZEGÓLNIE ROZWIŃ I PODKREŚL fragmenty, które są zaznaczone żółtym tłem (zawarte w znanczniku ze stylem background-color, np. <span style="background-color: rgb(254, 240, 138);">).
3. Artykuł MUSI być zwrócony w czystym formacie HTML (używaj <h2>, <h3>, <ul>, <li>, <p>).
4. Słowa kluczowe do naturalnego wplecenia: ${selectedKeywords ? selectedKeywords.join(", ") : "Brak"}.
5. Jeśli artykuł jest z cyklu, wpleć informację o cyklu do tytułu.
6. Zwracasz obiekt JSON z następującymi kluczami:
   - "title": proponowany finalny tytuł artykułu. Jeśli to kontynuacja cyklu, musi zawierać nazwę cyklu.
   - "content": Krótki lead (max 2 zdania), tzw. SEO description (czysty tekst, zero HTML).
   - "content2": Właściwa treść. Długi, pełny artykuł w HTML (bez tagu title i body wewnątrz).
   - "categories": tablica max 2 kategorii (np. ["Prawo budowlane", "Porady"]).
   - "tags": tablica 4-6 tagów SEO (np. ["odbiór techniczny", "usterki"]).
   - "facebookPost": Klikalny, chwytliwy post na Facebooka promujący ten artykuł z odpowiednimi emotikonami i wezwaniem do akcji (bez HTML).
   - "imagePrompt": Krótki prompt graficzny po angielsku do FLUX opisujący zdjęcie (bez tekstu na obrazku).`;

    const userMessage = `Napisz gotowy artykuł na ten temat: ${topic} \n${isSeries ? `(To jest kontynuacja cyklu: ${seriesName} - wymuś kontynuację w tytule!)` : ""}\n\nOto zatwierdzony i zedytowany konspekt HTML:\n\n${outlineHtml}`;

    console.log("Calling OpenAI (gpt-4o) for full article from outline...");
    const contentCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    });

    const aiContentData = JSON.parse(contentCompletion.choices[0].message.content);
    
    console.log("Generating image with fal.ai Flux Schnell for Co-Pilot...");
    const finalImagePrompt = aiContentData.imagePrompt + ", bright, minimalist, high quality, highly detailed, photorealistic, 4k, no text";
    let imageUrl = "https://via.placeholder.com/800x450.png?text=Brak+obrazu";
    
    if (process.env.FAL_KEY) {
      try {
        const imgResponse = await fetch("https://queue.fal.run/fal-ai/flux/schnell", {
          method: "POST",
          headers: {
            "Authorization": `Key ${process.env.FAL_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: finalImagePrompt,
            image_size: { width: 1024, height: 576 }, // 16:9 ratio
            num_images: 1,
            num_inference_steps: 4
          })
        });

        const imgData = await imgResponse.json();
        if (imgData && imgData.images && imgData.images.length > 0) {
           const tempUrl = imgData.images[0].url;
           console.log("Fal.ai successful, downloading and uploading to Firebase Storage...");
           imageUrl = await downloadAndUploadImage(tempUrl);
        } else {
           console.warn("Fal.ai didn't return images:", imgData);
        }
      } catch (e) {
        console.error("Error calling Fal.ai for Co-Pilot:", e);
      }
    } else {
      console.warn("FAL_KEY is missing. Using generic placeholder.");
    }

    const docId = db.collection("pending_posts").doc().id;
    const now = FieldValue.serverTimestamp();

    const draftData = {
      title: aiContentData.title,
      content: aiContentData.content,
      content2: aiContentData.content2,
      categories: aiContentData.categories || ["Porady ekspertów"],
      tags: aiContentData.tags || [],
      facebookPost: aiContentData.facebookPost || "",
      imageUrl: imageUrl,
      imagePrompt: finalImagePrompt,
      createdAt: now,
      status: "AI_DRAFT",
      keywords: selectedKeywords || [],
      isSeries: isSeries || false,
      seriesName: seriesName || "",
      strategyLog: {
        source: "AI Co-Pilot (Outline Flow)",
        model: "gpt-4o"
      }
    };

    await db.collection("pending_posts").doc(docId).set(draftData);

    return {
      success: true,
      pendingPostId: docId
    };

  } catch (error) {
    console.error("[Co-Pilot] Error passing from outline to draft:", error);
    return { success: false, error: error.message };
  }
});
