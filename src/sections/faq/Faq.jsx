import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./faq.scss";
import { faqs } from "./faqs";

const QAItem = ({ faq, index, isSmallScreen }) => {
  const [isOpen, setIsOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setIsOpen(!isSmallScreen);
  }, [isSmallScreen]);

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

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => {
      const answerText = faq.answer
        .map((item) => {
          if (item.type === "text") return item.content;
          if (item.type === "list") return item.content.join(" ");
          return "";
        })
        .join(" ");

      return {
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answerText.replace(/<[^>]*>/g, ""),
        },
      };
    }),
  };

  return (
    <div className="h5-QA" id="h5-QA">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <h2>Najczęściej Zadawane Pytania (FAQ) – Przeglądy Budowlane {customCity || "Śląsk"}</h2>
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
