const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const OpenAI = require("openai");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const { determineNextAction, STATES } = require("./stateMachine");
const {
  checkAvailability,
  bookEvent,
  sendAlertEmail,
  notifyAdminAboutConfirmation,
} = require("./calendarManager");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_firebase_deploy" });

// NARZĘDZIA
const tool_Book = {
  type: "function",
  function: {
    name: "book_appointment",
    description: "Zapisz wizytę.",
    parameters: {
      type: "object",
      properties: {
        summary: { type: "string" },
        dateStart: { type: "string" },
        clientEmail: { type: "string" },
      },
      required: ["summary", "dateStart", "clientEmail"],
    },
  },
};

const tool_Check = {
  type: "function",
  function: {
    name: "check_availability",
    description: "Sprawdź dostępność.",
    parameters: {
      type: "object",
      properties: { dateStart: { type: "string" } },
      required: ["dateStart"],
    },
  },
};

const tool_Emergency = {
  type: "function",
  function: {
    name: "report_emergency",
    description: "Zgłoś zagrożenie.",
    parameters: {
      type: "object",
      properties: { description: { type: "string" } },
      required: ["description"],
    },
  },
};

function getCalendarCheatSheet() {
  const polishDays = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  const days = [];

  // TO JEST KLUCZOWE: Wymuszamy czas warszawski, niezależnie od ustawień serwera
  const nowInPoland = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Warsaw" })
  );

  // --- DODAJ TĘ LINIJKĘ ---
  console.log(
    ">>> [DEBUG CZASU] Czas w Polsce (start kalendarza):",
    nowInPoland.toString()
  );
  // ------------------------

  for (let i = 0; i < 7; i++) {
    const d = new Date(nowInPoland);
    d.setDate(nowInPoland.getDate() + i);

    const dayName = polishDays[d.getDay()];
    // Ręczne formatowanie YYYY-MM-DD (bezpieczniejsze niż ISO)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    days.push(`${dayName} = ${year}-${month}-${day}`);
  }
  return days.join("\n");
}

// --- ANALITYK (Ulepszony Snajper) ---
async function extractContext(messages, cheatSheet) {
  const userMsgs = messages.filter((m) => m.role === "user");
  const assistantMsgs = messages.filter((m) => m.role === "assistant");

  const lastUserMsg =
    userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].content : "";
  const lastAssistantMsg =
    assistantMsgs.length > 0
      ? assistantMsgs[assistantMsgs.length - 1].content
      : "";

  const extractionPrompt = `
  Jesteś analitykiem.
  KALENDARZ (Polska):
  ${cheatSheet}
  
  OSTATNIA WIADOMOŚĆ KLIENTA: "${lastUserMsg}"
  
  ZASADY DATY (KRYTYCZNE):
  1. Czy klient wskazał konkretny dzień/godzinę w TEJ wiadomości?
     - TAK -> Oblicz datę (YYYY-MM-DDTHH:mm:ss) używając kalendarza. NIE ZMIENIAJ GODZINY NA UTC.
     - NIE -> Wstaw NULL. Nie wpisuj daty "domyślnej" ani "dzisiejszej".
  
  ZASADY EMAIL:
  - Czy jest znak '@'? TAK -> Zapisz. NIE -> NULL.
  
  ZASADY POTWIERDZENIA (isDateConfirmed):
  - Ustaw TRUE TYLKO I WYŁĄCZNIE, gdy Asystent w OSTATNIEJ wiadomości napisał wyraźnie: "Termin jest wolny" lub "Rezerwuję termin".
  - Jeśli Klient dopiero podaje datę (np. "To może wtorek?"), isDateConfirmed MUSI być FALSE.
  - Jeśli Klient zmienia datę na inną, isDateConfirmed MUSI być FALSE.

  Zwróć JSON:
  - city, street, type, service
  - priceAccepted (bool)
  - date (string ISO/null)
  - email (string/null)
  - isDateConfirmed (bool)
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: extractionPrompt }, ...messages],
      response_format: { type: "json_object" },
      temperature: 0,
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    return {
      city: null,
      street: null,
      type: null,
      service: null,
      priceAccepted: false,
      date: null,
      email: null,
      isDateConfirmed: false,
    };
  }
}

exports.chatAgent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST")
      return res.status(405).send("Method Not Allowed");
    const { messages } = req.body;

    const calendarCheatSheet = getCalendarCheatSheet();

    try {
      // 1. Ekstrakcja
      const currentContext = await extractContext(messages, calendarCheatSheet);
      console.log("[CONTEXT]:", currentContext);

      // 2. Stan
      const nextAction = determineNextAction(currentContext);
      console.log("[STATE]:", nextAction.state);

      // 3. Narzędzia
      let activeTools = [tool_Emergency];
      if (nextAction.state === STATES.SCHEDULING) activeTools.push(tool_Check);
      else if (nextAction.state === STATES.CONFIRMATION)
        activeTools.push(tool_Book);

      // 4. Prompt
      const dynamicSystemPrompt = `
      Jesteś SYSTEMEM REZERWACJI.
      Działasz 24/7. Ignoruj weekendy.
      
      KALENDARZ:
      ${calendarCheatSheet}
      
      ZADANIE:
      ${nextAction.instruction}
      
      ZASADY:
      1. Wykonuj TYLKO instrukcję.
      2. Korzystaj z kalendarza powyżej.
      3. BEZWZGLĘDNY ZAKAZ wypowiadania prośby o email na głos.
         - Jeśli potrzebujesz emaila, Twój jedyny komunikat to: "Proszę wpisać adres e-mail w formularzu."
         - Nigdy nie pytaj "Czy może Pan podać email?".
         - Nigdy nie proś o podyktowanie.
         - Jeśli klient już podał email wcześniej, NIE pytaj o niego ponownie. Przejdź do potwierdzenia.
         - Jedyny dozwolony komunikat to: "Proszę wpisać adres e-mail w formularzu." (tylko jeśli emaila brakuje).

      `;

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: dynamicSystemPrompt },
          ...messages.filter((m) => m.role !== "system"),
        ],
        model: "gpt-4o-mini",
        temperature: 0.6,
        tools: activeTools.length > 0 ? activeTools : undefined,
        tool_choice: "auto",
      });

      const message = completion.choices[0].message;

      // 5. Narzędzia
      if (message.tool_calls && message.tool_calls.length > 0) {
        const toolCall = message.tool_calls[0];
        const fnName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let aiResult = "";

        if (fnName === "check_availability") {
          const result = await checkAvailability(args.dateStart);
          if (result.available) {

            // === ZMIANA: WYMUSZENIE STANU EMAIL ===
            // Skoro termin jest wolny, manualnie przestawiamy stan, 
            // aby frontend wiedział, że ma otworzyć formularz.
            nextAction.state = STATES.EMAIL;

            // Nowa instrukcja warunkowa dla AI
            aiResult = `STATUS: WOLNE. 
              Sprawdź w historii czy masz już email klienta.
              - JEŚLI MASZ EMAIL: Powiedz "Termin jest dostępny. Potwierdzam rezerwację na ten adres email."
              - JEŚLI BRAK EMAILA: Powiedz "Termin dostępny. Proszę wpisać email w formularzu."`;
          } else {
            aiResult = `STATUS: ZAJĘTE. Powód: ${result.reason}. Zaproponuj inny termin.`;
          }
        } else if (fnName === "book_appointment") {
          const fullAddress = `${currentContext.city || ""}, ${currentContext.street || ""
            }`;
          const bookingData = {
            summary: args.summary,
            dateStart: args.dateStart,
            clientEmail: args.clientEmail,
            description: fullAddress,
          };
          const result = await bookEvent(bookingData);
          aiResult = result.success
            ? "SUCCESS: Zapisano."
            : `ERROR: ${result.error}`;
        } else if (fnName === "report_emergency") {
          await sendAlertEmail(args.description);
          aiResult = "ALERT_SENT";
        }

        const secondResponse = await openai.chat.completions.create({
          messages: [
            { role: "system", content: dynamicSystemPrompt },
            ...messages,
            message,
            { role: "tool", tool_call_id: toolCall.id, content: aiResult },
          ],
          model: "gpt-4o-mini",
        });

        res.json({
          response: secondResponse.choices[0].message.content,
          state: nextAction.state,
        });
      } else {
        res.json({ response: message.content, state: nextAction.state });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
});

exports.confirmVisit = functions.https.onRequest(async (req, res) => {
  const { email, date, service, address } = req.query;
  if (!email) {
    res.status(400).send("Brak danych.");
    return;
  }
  await notifyAdminAboutConfirmation(
    email,
    date,
    service,
    address || "Brak adresu"
  );
  res.status(200).send("Potwierdzono.");
});
exports.speakEleven = functions.https.onRequest((req, res) => {
  res.status(200).send("OK");
});
