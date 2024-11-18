import React, { useEffect, useState } from "react";
import "./menu.scss";
import Panel from "../panel/Panel";


export default function Menu() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  
  
   // Funkcja obsługująca kliknięcie burgera
   const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
   
  return (
    <>
    {isUserLoggedIn && <Panel isOpen={isPanelOpen} />}

    <div className="menu" >
      
      <div className="logo">
        <span>przegladtechniczny.online</span>
      </div>
      <div className="menu-burger" onClick={togglePanel} >
        <span class="material-icons-outlined">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#5f6368"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </span>
      </div>
    </div>


    </>
  );
}
