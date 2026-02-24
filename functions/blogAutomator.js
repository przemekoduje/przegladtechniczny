const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onCall } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const OpenAI = require("openai");
const path = require("path");
const nodemailer = require("nodemailer");

// Load .env from the functions directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
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
 * @param {string} url - The temporary image URL
 * @param {string} fileName - Destination filename in Storage
 * @returns {Promise<string>} - Permanent public URL
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

  // Return the public URL
  return `https://storage.googleapis.com/${bucket.name}/blog-images/${fileName}`;
}

/**
 * AI Blog Generation Core Logic
 */
async function runBlogAutomation() {
  // 1. Fetch 15 most recent post titles from 'posts' collection (Anti-Dubel)
  const postsSnapshot = await db.collection("posts")
    .orderBy("date", "desc")
    .limit(15)
    .get();

  const existingTitles = postsSnapshot.docs.map(doc => doc.data().title);
  console.log("Existing titles for context:", existingTitles);

  // 1a. Define Strategy Matrix (Phase 7)
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

  // Rule 10: Feedback Loop (Phase 7)
  let feedbackTexts = [];
  try {
    const feedbackSnapshot = await db.collection("blog_feedback")
      .orderBy("date", "desc")
      .limit(3)
      .get();
    feedbackTexts = feedbackSnapshot.docs.map(doc => doc.data().feedbackText).filter(Boolean);
    if (feedbackTexts.length > 0) {
      console.log(`Injecting ${feedbackTexts.length} feedback items.`);
    }
  } catch (err) {
    console.error("Error fetching feedback:", err);
  }

  // Rule 3: Fetch SEO keywords from Firestore (Phase 8)
  let targetKeywords = [
    "przeglądy techniczne nieruchomości",
    "przegląd 5-letni domu",
    "odbiór techniczny mieszkania Śląsk",
    "koszt przeglądu budowlanego",
    "ubezpieczenie domu a przegląd",
    "inżynier budownictwa Gliwice",
    "książka obiektu budowlanego",
    "badanie instalacji elektrycznej",
    "kamera termowizyjna Śląsk"
  ];

  try {
    const keywordsDoc = await db.collection("settings").doc("blogKeywords").get();
    if (keywordsDoc.exists && keywordsDoc.data().keywords) {
      targetKeywords = keywordsDoc.data().keywords;
      console.log("Using keywords from Firestore settings.");
    }
  } catch (err) {
    console.error("Error fetching keywords from Firestore, using fallback:", err);
  }

  // Randomly select strategy for this run
  const activePillar = pillars[Math.floor(Math.random() * pillars.length)];
  const activeStage = funnelStages[Math.floor(Math.random() * funnelStages.length)];
  const activeStyle = imageStyles[Math.floor(Math.random() * imageStyles.length)];
  
  // Rule 3: Randomly select 2-3 keywords
  const numKeywords = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const selectedKeywords = [...targetKeywords]
    .sort(() => 0.5 - Math.random())
    .slice(0, numKeywords);

  console.log("--- STRATEGIA AI DLA TEGO CYKLU ---");
  console.log("Filar tematyczny:", activePillar);
  console.log("Etap lejka:", activeStage);
  console.log("Styl graficzny:", activeStyle);
  console.log("Słowa kluczowe SEO:", selectedKeywords.join(", "));
  console.log("-----------------------------------");

  // 2. Prepare AI Prompt for Content (Phase 7 Master Prompt - Refined)
  const systemPrompt = `
    Jesteś doświadczonym inżynierem budownictwa ze Śląska, ekspertem od przeglądów technicznych budynków. 
    Prowadzisz ten blog dla właścicieli domów, kupujących nieruchomości oraz zarządców. 
    Piszesz z perspektywy pierwszej osoby liczby pojedynczej ('ja'). 
    Twój ton jest rzeczowy, profesjonalny, konkretny, ale naturalny i przystępny. 
    Unikaj marketingowego slangu i sztucznego entuzjazmu. Nie nazywaj siebie w tekście 'Inżynier Przemek'. 
    ZAKAZY: Nigdy nie wymyślaj własnych interpretacji prawnych. 
    Przegląd diagnozuje stan faktyczny, a nie naprawia budynek. 
    W kwestiach ubezpieczeń zawsze zalecaj sprawdzenie Ogólnych Warunków Ubezpieczenia (OWU).
  `;

  const userPrompt = `
    Napisz merytoryczny artykuł na bloga o tematyce inżynieryjno-budowlanej.
    
    Wytyczne strategiczne dla tego wpisu:
    - Główny temat: ${activePillar}
    - Cel artykułu (Etap lejka): ${activeStage}
    
    Oto lista ostatnich artykułów. Twój nowy tekst MUSI poruszać inny problem lub podchodzić do tematu z innej perspektywy, aby uniknąć dublowania treści:
    [ ${existingTitles.join(', ')} ]
       - Wymogi techniczne (Zwróć jako czysty kod HTML, nie używaj znaczników markdown \`\`\`html):
    - Struktura JSON (KRYTYCZNE DLA TWOJEGO ISTNIENIA):
      1. 'description': Bardzo krótki, zachęcający wstęp (Lead) - max 2-3 zdania. ZAKOŃCZ TO POLEM KROPKĄ. Nigdy nie kończ wstępu dwukropkiem.
      2. 'content': OGROMNE, techniczne rozwinięcie (minimum 1000 słów). Musi zawierać wiele sekcji H2 i H3. To tutaj mają być wszystkie listy i szczegóły.
    - REGUŁA LIST (BEZWZGLĘDNA): 
      * Każdy akapit w polu 'content' kończący się dwukropkiem (:) MUSI być bezpośrednio połączony z listą <ul><li>. 
      * Przykład: "<p>Wymagamy następujących dokumentów:</p><ul><li>Dokument 1</li><li>Dokument 2</li></ul>"
      * Zakaz używania myślników (-) jako wypunktowań tekstowych. Tylko HTML.
    - Język: Ekspercki, inżynieryjny, Śląski konkret. Nie bój się wchodzić w detale techniczne konstrukcji, instalacji i przepisów. Artykuł musi być wyczerpujący i sprawiać wrażenie napisanego przez człowieka z 20-letnim doświadczeniem.
    - Wpleć naturalnie w treść (np. jako zwykły akapit, NIE używaj tagu <blockquote>) jedną krótką anegdotę lub przykład z faktycznej kontroli budowlanej na Śląsku, aby uwiarygodnić tekst. Nie podpisuj tej anegdoty.
    - Jeśli to naturalnie pasuje do kontekstu (ale TYLKO wtedy, nie wciskaj tego na siłę), możesz wspomnieć o wymogach Prawa Budowlanego, np. o art. 62.
    - Na końcu artykułu dodaj wyraźne wezwanie do akcji (CTA) zachęcające do darmowej wyceny lub kontaktu.
    - OPTYMALIZACJA SEO: Masz do dyspozycji następujące słowa kluczowe: [ ${selectedKeywords.join(', ')} ]. BEZWZGLĘDNY ZAKAZ wklejania ich w surowej, nieodmienionej formie. MUSISZ je odmieniać przez przypadki i liczby (np. 'przegląd budowlany Gliwice' -> 'podczas przeglądu budowlanego w Gliwicach'). Tekst musi płynąć naturalnie.
    - imagePrompt: Krótki opis sceny do wygenerowania obrazka (po angielsku).

    ${feedbackTexts.length > 0 ? `
    - UWAGI OD GŁÓWNEGO INŻYNIERA (MUSISZ SIĘ DOSTOSOWAĆ I WDROŻYĆ POPRAWKI): [ ${feedbackTexts.join(' | ')} ]
    ` : ""}

    Zwróć wynik jako JSON: { title, description, content, categories, tags, facebookPost, imagePrompt }.
  `;

  // 3. Call OpenAI gpt-4o for content
  console.log("Calling OpenAI for Master Prompt generation...");
  const contentCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4000,
  });

  const aiResponse = JSON.parse(contentCompletion.choices[0].message.content);
  console.log("AI generated post title:", aiResponse.title);

  // 4. Generate Image with fal.ai Flux (SCHNELL - cheaper version)
  console.log("Calling fal.ai for image generation (Flux Schnell)...");
  // Rule 3: Randomly select style and combine with title
  const finalImagePrompt = `Create an illustration for a blog post titled '${aiResponse.title}'. Style: ${activeStyle}. STRICT RULES: No 3D, no text, keep it flat and architectural. Details: ${aiResponse.imagePrompt}`;
  
  let imageUrl = "";
  try {
    const falResponse = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: finalImagePrompt,
        image_size: "landscape_16_9",
        num_inference_steps: 4, // Schnell optimized for fewer steps
        sync_mode: true
      })
    });

    const falData = await falResponse.json();
    const tempUrl = falData.images?.[0]?.url || falData.image?.url;
    
    if (!tempUrl) {
      throw new Error(`Cloud not get image URL from fal.ai response: ${JSON.stringify(falData)}`);
    }

    // 5. Persist image to Firebase Storage
    const timestamp = Date.now();
    const safeTitle = aiResponse.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
    const fileName = `${safeTitle}_${timestamp}.webp`;
    
    imageUrl = await downloadAndUploadImage(tempUrl, fileName);
    console.log("Permanent image URL:", imageUrl);
  } catch (imgError) {
    console.error("Image generation or persistence failed, using placeholder:", imgError);
    imageUrl = "https://placehold.co/1792x1024/orange/white?text=Inzynieria+Budowlana";
  }

  // 6. Save to Firestore 'pending_posts'
  const draftData = {
    title: aiResponse.title,
    content: aiResponse.description, // Lead (short description)
    content2: aiResponse.content,   // Full article body
    categories: aiResponse.categories,
    tags: aiResponse.tags || [],   // SEO Tags
    facebookPost: aiResponse.facebookPost || "", // Facebook social post
    src: imageUrl, 
    imageUrl: imageUrl, 
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
    type: "StandardPost",
    w: 2,
    h: 2
  };

  const docRef = await db.collection("pending_posts").add(draftData);
  console.log("Draft saved with ID:", docRef.id);

  // 7. Reset Automation Gate - disarm for next scheduled run
  await db.collection("settings").doc("blogAutomator").set({
    isNextCycleEnabled: false,
    lastGeneratedAt: FieldValue.serverTimestamp()
  }, { merge: true });
  console.log("Automation Gate disarmed for next cycle.");

  // 8. Send Email Notification
  const adminPanelUrl = "https://przeglady-domu.online/admin"; // Using domain from breadcrumbs context
  await transporter.sendMail({
    from: BOT_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[AI Blog] Nowy szkic: ${aiResponse.title}`,
    html: `
      <h2>Nowy szkic AI czeka na Twoją akceptację</h2>
      <p><strong>Tytuł:</strong> ${aiResponse.title}</p>
      <p><strong>Opis:</strong> ${aiResponse.description}</p>
      <br>
      <div style="margin: 20px 0;">
        <img src="${imageUrl}" alt="Blog Image" style="max-width: 400px; border-radius: 8px;">
      </div>
      <br>
      <a href="${adminPanelUrl}" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
        PRZEJDŹ DO PANELU ADMINA
      </a>
      <p style="color: #666; font-size: 0.8em; margin-top: 20px;">Wiadomość wygenerowana automatycznie.</p>
    `,
  });

  return { id: docRef.id, title: aiResponse.title };
}

/**
 * Daily scheduled function at 8:00 AM
 */
exports.generateDailyPost = onSchedule("0 8 * * *", async (event) => {
  console.log("Starting scheduled daily blog generation check...");
  try {
    const gateDoc = await db.collection("settings").doc("blogAutomator").get();
    const isEnabled = gateDoc.exists ? gateDoc.data().isNextCycleEnabled : false;

    if (!isEnabled) {
      console.log("Automation Gate is CLOSED. Skipping scheduled generation to save costs.");
      return;
    }

    const result = await runBlogAutomation();
    console.log("Scheduled generation finished successfully:", result.title);
  } catch (error) {
    console.error("Scheduled generation failed:", error);
  }
});

/**
 * Manual trigger for testing
 */
exports.generateDraftManual = onCall({ cors: true }, async (request) => {
  try {
    const result = await runBlogAutomation();
    return { success: true, ...result };
  } catch (error) {
    console.error("Manual generation failed:", error);
    return { success: false, error: error.message };
  }
});
