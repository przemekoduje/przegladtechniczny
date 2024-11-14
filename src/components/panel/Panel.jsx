import React from "react";
import "./panel.scss";

export default function Panel({ isOpen }) {
  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      <div className="handler">
        <span>panel</span>
      </div>
      <div className="left-panel">
        <div className="head-account">
          <img src="images/profil.jpg" alt="" />
          <h3>Witaj Przemek</h3>
        </div>

        <div className="reminder-buttons">
          <button className="reminder-btn">
            <div className="texts">
              <span className="type">PRZEGLĄD BUDOWLANY</span>
              <span className="adress">Gliwice, ul. Dworcowa 53</span>
            </div>

            <div className="date-btn">
              <span>
                2024 <br />
                11/12
              </span>
            </div>
          </button>
          <button className="reminder-btn">
            <div className="texts">
              <span className="type">PRZEGLĄD BUDOWLANY</span>
              <span className="adress">Gliwice, ul. Dworcowa 53</span>
            </div>

            <div className="date-btn">
              <span>
                2024 <br />
                11/12
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="right-panel">
        <img src="images/panel-right.png" alt="" />
      </div>
    </div>
  );
}
