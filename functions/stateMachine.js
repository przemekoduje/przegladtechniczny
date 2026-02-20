const STATES = {
    WELCOME: "WELCOME",
    QUALIFICATION: "QUALIFICATION",
    PRICING: "PRICING",
    SCHEDULING: "SCHEDULING",
    EMAIL: "EMAIL",
    CONFIRMATION: "CONFIRMATION"
};

function determineNextAction(context) {
    
    // 0. START
    if (!context.type && !context.city && !context.street && !context.service) {
        return { state: STATES.WELCOME, instruction: `Przywitaj się.` };
    }

    // 1. DANE
    if (!context.type) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o rodzaj budynku.` };
    if (!context.city) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o miasto.` };
    if (!context.street) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o ulicę i numer.` };
    if (!context.service) return { state: STATES.QUALIFICATION, instruction: `Zapytaj o rodzaj usługi.` };

    // 2. CENA
    if (!context.priceAccepted) {
        return { state: STATES.PRICING, instruction: `Podaj cenę (350zł). Zapytaj o akceptację.` };
    }

    // 3. DATA
    if (!context.date) {
        return { state: STATES.SCHEDULING, instruction: `Zapytaj: "Jaki termin wizyty Panu pasuje?".` };
    }

    // 3b. SPRAWDZANIE
    if (context.date && !context.isDateConfirmed) {
        return {
            state: STATES.SCHEDULING,
            instruction: `Data: ${context.date}. Użyj 'check_availability'.`
        };
    }

    // 4. EMAIL - INPUT TRIGGER
    // Ponieważ Analityk w index.js teraz patrzy tylko na ostatnią wiadomość
    // To jeśli użytkownik nie wpisał maila PRZED CHWILĄ, context.email będzie null.
    // I ten warunek ZADZIAŁA.
    if (!context.email || !context.email.includes('@')) {
        return {
            state: STATES.EMAIL,
            instruction: `
                Termin jest wolny i zarezerwowany wstępnie.
                POWIEDZ TYLKO: "Potrzebuję jeszcze adresu e-mail. Proszę go wpisać w formularzu, który się teraz pojawi."
                Nie zadawaj pytań. Czekaj na wpisanie danych.
            `
        };
    }

    // 5. ZAPIS
    return {
        state: STATES.CONFIRMATION,
        instruction: `Mamy komplet (Email: ${context.email}). Użyj 'book_appointment'.`
    };
}

module.exports = { determineNextAction, STATES };