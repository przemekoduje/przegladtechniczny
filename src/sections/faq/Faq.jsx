// QAList.js
import React, { useState } from "react";
import "./faq.scss";
import { faqs } from "./faqs";

const QAItem = ({ faq, index, toggleFAQ, isOpen }) => {
  // Funkcja renderująca odpowiedzi
  const renderAnswer = (answer) => {
    return answer.map((item, idx) => {
      if (item.type === "text") {
        // Renderowanie zwykłego tekstu
        return (
          <div
            key={idx}
            className="faq-answer-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        );
      } else if (item.type === "list") {
        // Renderowanie listy
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
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => toggleFAQ(index)}>
        {faq.question}
        <span className={`faq-toggle-icon ${isOpen ? "open" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        {isOpen && renderAnswer(faq.answer)}
      </div>
    </div>
  );
};

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="h5-QA" id="faq-section" >
      <h2>F.A.Q.</h2>
      <div className="faq-list lato-regular">
        {faqs.map((faq, index) => (
          <QAItem
            key={index}
            faq={faq}
            index={index}
            toggleFAQ={toggleFAQ}
            isOpen={openIndexes.includes(index)} // Sprawdza, czy pytanie jest otwarte
          />
        ))}
      </div>
    </div>
  );
}
