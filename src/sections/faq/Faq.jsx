import React, { useState, useEffect } from "react";
import "./faq.scss";
import { faqs } from "./faqs";

const QAItem = ({ faq, index, isSmallScreen }) => {
  const [isOpen, setIsOpen] = useState(!isSmallScreen); // Domyślnie otwarte na dużych ekranach

  // Efekt aktualizujący `isOpen` przy zmianie rozmiaru ekranu
  useEffect(() => {
    setIsOpen(!isSmallScreen);
  }, [isSmallScreen]);
  // Funkcja renderująca odpowiedzi
  const renderAnswer = (answer) => {
    return answer.map((item, idx) => {
      if (item.type === "text") {
        return (
          <div
            key={idx}
            className="faq-answer-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        );
      } else if (item.type === "list") {
        return (
          <ul key={idx}>
            {item.content.map((listItem, listIdx) => (
              <li
                key={listIdx}
                dangerouslySetInnerHTML={{ __html: listItem }}
              />
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  const toggleAnswer = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleAnswer}>
        {faq.question}
      </div>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        {renderAnswer(faq.answer)}
      </div>
    </div>
  );
};

export default function Faq({ customCity }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 680);
    };

    // Ustaw początkowy stan
    handleResize();

    // Dodaj nasłuchiwanie zmiany rozmiaru okna
    window.addEventListener("resize", handleResize);

    return () => {
      // Usuń nasłuchiwanie przy odmontowaniu komponentu
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h5-QA" id="h5-QA">
      <h2>FAQ</h2>
      <div className="faq-list lato-regular">
        {faqs.map((faq, index) => (
          <QAItem
            key={index}
            faq={faq}
            index={index}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </div>
    </div>
  );
}
