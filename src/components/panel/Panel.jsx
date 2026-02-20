import React from "react";
import "./panel.scss";
// Jeśli masz zainstalowane MUI icons, odkomentuj linię poniżej. 
// Jeśli nie, użyjemy "X" tekstowego w CSS.
import CloseIcon from "@mui/icons-material/Close"; 

export default function Panel({ isOpen, setIsOpen, children }) {
  
  return (
    <div className={`panel ${isOpen ? "open" : ""}`}>
      {/* Przycisk zamknięcia wewnątrz panelu */}
      <div className="panel-header">
         <div className="close-btn" onClick={() => setIsOpen(false)}>
            {/* Jeśli masz MUI: <CloseIcon sx={{ fontSize: 40 }} /> */}
            {/* Jeśli nie masz, zostaw sam tekst lub SVG: */}
            <CloseIcon style={{ width: "40px", height: "40px", color: "#333" }} />
         </div>
      </div>

      {/* Wyświetlanie zawartości przekazanej z Menu.js */}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
}