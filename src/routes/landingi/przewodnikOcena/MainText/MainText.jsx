import React from "react";

const MainText = ({ content }) => {
  return (
    <div className="main-text">
      {content.map((element, index) => {
        if (element.type === "h2") {
          // Znajdź odpowiadający element "ul" dla tego "h2"
          const nextUl = content[index + 1];
          if (nextUl && nextUl.type === "ul") {
            return (
              <div className="grupa" key={index}>
                <h2>{element.content}</h2>
                <ul>
                  {nextUl.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <div className="grupa" key={index}>
                <h2>{element.content}</h2>
              </div>
            );
          }
        }
        return null; // Pomijamy "ul", bo obsługujemy je wewnątrz "h2"
      })}
    </div>
  );
};

export default MainText;
