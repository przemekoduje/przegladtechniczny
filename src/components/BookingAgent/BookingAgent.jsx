import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './BookingAgent.scss';


const BookingAgent = () => {
  const [status, setStatus] = useState("idle"); 
  const [messages, setMessages] = useState([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const messagesRef = useRef([]);
  const recognitionRef = useRef(null);
  const sessionActiveRef = useRef(false);
  const API_URL = "http://127.0.0.1:5001/przegladtechniczny-6b336/us-central1/chatAgent"; 

  // --- MOWA ---
  const speak = (text, shouldOpenInput = false) => {
    if (!text) return;
    setStatus("speaking");
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL'; 
    const voices = window.speechSynthesis.getVoices();
    const plVoice = voices.find(v => v.lang.includes("pl")) || voices[0];
    if (plVoice) utterance.voice = plVoice;

    utterance.onend = () => {
      // TU JEST NOWA LOGIKA:
      // Jeśli backend kazał otworzyć input (shouldOpenInput === true), to otwieramy i NIE słuchamy.
      if (shouldOpenInput) {
          console.log("📝 Stan EMAIL wykryty -> Otwieram input.");
          setShowEmailInput(true);
          setStatus("idle"); 
      } else {
          startListening();
      }
    };

    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
  };

  // --- SŁUCHANIE ---
  const startListening = () => {
    if (showEmailInput) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (recognitionRef.current) recognitionRef.current.abort();

    const recognition = new SpeechRecognition();
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;

    recognition.onstart = () => setStatus("listening");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (!transcript.trim()) return;
      const newHistory = [...messagesRef.current, { role: "user", content: transcript }];
      updateMessages(newHistory);
      handleAIResponse(newHistory);
    };
    recognition.onerror = (ev) => { if (ev.error !== 'no-speech') setStatus("idle"); };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // --- KOMUNIKACJA ---
  const handleAIResponse = async (history) => {
    setStatus("processing");
    try {
      const res = await axios.post(API_URL, { messages: history });
      const { response, state } = res.data; // Pobieramy tekst I stan
      
      const updatedHistory = [...history, { role: "assistant", content: response }];
      updateMessages(updatedHistory);
      
      // Decyzja sterowana backendem: Czy to jest krok pobierania maila?
      const isEmailStep = (state === "EMAIL");
      
      speak(response, isEmailStep);

    } catch (error) { setStatus("idle"); }
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
    messagesRef.current = newMessages;
  };

  const handleManualStart = () => {
    setIsSessionActive(true);
    
    // --- DODAJ TĘ LINIJKĘ PONIŻEJ: ---
    sessionActiveRef.current = true; 
    
    setShowEmailInput(false);
    updateMessages([]);
    handleAIResponse([]); 
  };

  const resetSession = () => {
    console.log("⚡ RESET - Wznawiam mikrofon");
    
    // 1. Uciszamy bota
    window.speechSynthesis.cancel();
    
    // 2. Resetujemy stany blokujące
    if (recognitionRef.current) recognitionRef.current.abort();
    setStatus("idle");
    setShowEmailInput(false);
    
    // 3. Automatyczny restart nasłuchiwania (Rozruch na popych)
    // Dajemy 300ms na wyczyszczenie, żeby przeglądarka nie zgłupiała
    setTimeout(() => {
        if (sessionActiveRef.current) {
            startListening();
        }
    }, 300);
  };

  const handleSendEmail = (e) => {
      e.preventDefault(); 
      if (!emailValue.trim()) return;
      const content = `Mój email to: ${emailValue}`;
      setShowEmailInput(false);
      setEmailValue("");
      const newHistory = [...messagesRef.current, { role: "user", content: content }];
      updateMessages(newHistory);
      handleAIResponse(newHistory);
  };

  const handleCancelEmail = () => setShowEmailInput(false);
  useEffect(() => { return () => resetSession(); }, []);

  return (
    <div className={`agent-wrapper ${isSessionActive ? 'active-session' : ''}`}>
      <div className={`avatar-container ${status}`}>
        <div className="avatar-face">{status === 'speaking' ? '🗣️' : status === 'listening' ? '👂' : '🤖'}</div>
      </div>
      <div className="status-text">
        {showEmailInput ? "Wpisz email poniżej 👇" : (status === 'listening' ? "Słucham..." : (status === 'speaking' ? "Mówię..." : "Gotowy"))}
      </div>

      {showEmailInput && (
        <div className="email-container">
            <form className="email-form" onSubmit={handleSendEmail}>
                <input type="email" placeholder="jan@kowalski.pl" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} autoFocus />
                <div className="form-buttons">
                    <button type="submit" className="btn-send">Wyślij</button>
                    <button type="button" className="btn-cancel" onClick={handleCancelEmail}>Anuluj</button>
                </div>
            </form>
        </div>
      )}

      {!showEmailInput && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button className="talk-btn" onClick={handleManualStart}>{isSessionActive ? 'Restart' : 'Start'}</button>
            <button onClick={resetSession} className="reset-btn">⚡</button>
        </div>
      )}
      <div className="transcript-box">
          {messages.length > 0 && messages[messages.length - 1].role === 'assistant' ? messages[messages.length - 1].content : "..."}
      </div>
    </div>
  );
};

export default BookingAgent;