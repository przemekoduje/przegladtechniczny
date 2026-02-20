const { google } = require("googleapis");
const path = require("path");
const nodemailer = require("nodemailer");

const KEY_PATH = path.join(__dirname, "service-account.json");
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});
const calendar = google.calendar({ version: "v3", auth });

const CALENDAR_ID = "przemek.rakotny@gmail.com";
const BOT_EMAIL = "przemek.rakotny@gmail.com";
const BOT_PASSWORD = "fjax fevs qlsb etjq";
const ADMIN_EMAIL = "przemek.rakotny@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: BOT_EMAIL, pass: BOT_PASSWORD },
});

// Helper: Dodaje 1h do daty
function addHourToIsoString(dateStr) {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 1);
  return date.toISOString().split(".")[0];
}

async function checkAvailability(dateStart) {
  let cleanDateStart = dateStart.replace("Z", "").slice(0, 19);
  const myStart = new Date(cleanDateStart + "+01:00").getTime();
  const myEnd = myStart + 60 * 60 * 1000;

  const checkDate = new Date(cleanDateStart);
  const day = checkDate.getDay();
  const hour = checkDate.getHours();

  if (day === 0 || day === 6) return { available: false, reason: "Weekend" };
  if (hour < 8 || hour >= 17)
    return { available: false, reason: "Poza godzinami pracy (8-17)" };

  const dayStartStr = cleanDateStart.split("T")[0] + "T00:00:00Z";
  const dayEndStr = cleanDateStart.split("T")[0] + "T23:59:59Z";

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: dayStartStr,
      timeMax: dayEndStr,
      timeZone: "Europe/Warsaw",
      singleEvents: true,
    });

    const items = response.data.items || [];
    const conflict = items.find((event) => {
      if (!event.start.dateTime) return false;
      const existingStart = new Date(event.start.dateTime).getTime();
      const existingEnd = new Date(event.end.dateTime).getTime();

      console.log(
        `Sprawdzam: ${cleanDateStart} vs Zajęte: ${event.start.dateTime}`
      );

      return myStart < existingEnd && myEnd > existingStart;
    });

    if (conflict) {
      console.log("⚠️ KONFLIKT WYKRYTY! Uruchamiam szukanie sugestii...");
      const suggestions = [];
      const baseDateIso = cleanDateStart.split("T")[0]; // np. "2026-02-02"

      for (let h = 8; h <= 16; h++) {
        const hourString = h < 10 ? `0${h}` : `${h}`;
        const slotStartMs = new Date(
          `${baseDateIso}T${hourString}:00:00`
        ).getTime();
        const slotEndMs = slotStartMs + 60 * 60 * 1000; // +1h

        // Sprawdzamy, czy ten slot koliduje z listą 'items', którą już mamy pobraną
        const isSlotBusy = items.find((event) => {
          if (!event.start.dateTime) return false;
          const existingStart = new Date(event.start.dateTime).getTime();
          const existingEnd = new Date(event.end.dateTime).getTime();
          return slotStartMs < existingEnd && slotEndMs > existingStart;
        });

        if (!isSlotBusy) {
          suggestions.push(`${hourString}:00`);
        }
      }

      console.log("Znalezione sugestie:", suggestions); // <--- DODAJ TO

      // Budujemy odpowiedź dla AI z listą sugestii
      let reasonMsg = "Wybrany termin jest zajęty.";
      if (suggestions.length > 0) {
        reasonMsg += ` Dostępne godziny tego dnia to: ${suggestions.join(
          ", "
        )}. Zaproponuj jedną z nich.`;
      } else {
        reasonMsg +=
          " Brak wolnych terminów w tym dniu. Zaproponuj inny dzień.";
      }

      return {
        available: false,
        reason:
          "Ten termin jest niestety zajęty. Proszę zaproponować inną godzinę lub dzień.",
      };
    }
    return { available: true };
  } catch (e) {
    throw e;
  }
}

async function bookEvent(eventDetails) {
  const { summary, description, dateStart, clientEmail } = eventDetails;

  const avail = await checkAvailability(dateStart);
  if (!avail.available) return { success: false, error: avail.reason };

  const cleanStart = dateStart.replace("Z", "").slice(0, 19);
  const cleanEnd = addHourToIsoString(cleanStart);

  try {
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: {
        summary,
        description: `${description}\nEmail: ${clientEmail}`,
        start: { dateTime: cleanStart, timeZone: "Europe/Warsaw" },
        end: { dateTime: cleanEnd, timeZone: "Europe/Warsaw" },
      },
    });

    if (clientEmail && clientEmail.includes("@")) {
      const projectId = "przegladtechniczny-6b336";
      const confirmLink = `http://127.0.0.1:5001/${projectId}/us-central1/confirmVisit?email=${encodeURIComponent(
        clientEmail
      )}&date=${encodeURIComponent(cleanStart)}&service=${encodeURIComponent(
        summary
      )}&address=${encodeURIComponent(description)}`;

      // === TUTAJ JEST PRZYWRÓCONY BOGATY HTML ===
      await transporter.sendMail({
        from: BOT_EMAIL,
        to: clientEmail,
        subject: "Potwierdzenie Wizyty - WYMAGANA AKCJA",
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
                    <h2 style="color: #2c3e50;">Wstępna Rezerwacja Wizyty</h2>
                    <p>Aby wizyta doszła do skutku, prosimy o zaakceptowanie poniższych warunków technicznych.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 20px;">
                        <p style="margin: 5px 0;">📅 <strong>Data:</strong> ${cleanStart.replace(
                          "T",
                          " godz. "
                        )}</p>
                        <p style="margin: 5px 0;">📍 <strong>Adres:</strong> ${description}</p>
                        <p style="margin: 5px 0;">📋 <strong>Usługa:</strong> ${summary}</p>
                    </div>

                    <h3 style="color: #c0392b;">WARUNKI REALIZACJI USŁUGI:</h3>
                    <ol style="line-height: 1.5; padding-left: 20px;">
                        <li style="margin-bottom: 10px;"><strong>Dokumentacja:</strong> Zleceniodawca zobowiązany jest przygotować <u>Książkę Obiektu Budowlanego (KOB)</u> oraz protokoły z poprzednich przeglądów.</li>
                        <li style="margin-bottom: 10px;"><strong>Dostęp:</strong> Prosimy o zapewnienie bezpiecznego dostępu do wszystkich elementów budynku (piwnice, kotłownia, strych, wyłaz na dach).</li>
                        <li style="margin-bottom: 10px;"><strong>Zakres usługi:</strong> Usługa obejmuje <u>przegląd wizualny</u> stanu technicznego. Nie obejmuje odkrywek ani ekspertyz.</li>
                        <li style="margin-bottom: 10px;"><strong>Oświadczenie:</strong> Potwierdzenie wizyty jest równoznaczne z oświadczeniem o posiadaniu tytułu prawnego do lokalu.</li>
                    </ol>

                    <div style="background: #fff3cd; padding: 20px; border: 1px solid #ffeeba; margin-top: 25px; text-align: center;">
                        <p style="margin-top: 0; font-weight: bold;">KROK KOŃCOWY:</p>
                        <p>Klikając poniższy przycisk potwierdzają Państwo zapoznanie się i akceptację powyższych punktów.</p>
                        
                        <a href="${confirmLink}" 
                           style="background-color: #28a745; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 10px; font-size: 14px;">
                           ZAPOZNAŁEM SIĘ, ZGADZAM I ZATWIERDZAM
                        </a>
                    </div>
                </div>
            `,
      });
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function sendAlertEmail(desc) {
  await transporter.sendMail({
    from: BOT_EMAIL,
    to: ADMIN_EMAIL,
    subject: "ALERT",
    text: desc,
  });
}

async function notifyAdminAboutConfirmation(
  clientEmail,
  date,
  service,
  address
) {
  await transporter.sendMail({
    from: BOT_EMAIL,
    to: ADMIN_EMAIL,
    subject: "✅ ZATWIERDZONO",
    html: `<p>Klient: ${clientEmail}</p><p>Status: OK</p>`,
  });
}

module.exports = {
  checkAvailability,
  bookEvent,
  sendAlertEmail,
  notifyAdminAboutConfirmation,
};
