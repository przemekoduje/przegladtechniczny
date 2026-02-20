import React from 'react';
import './orderButton.scss';

const OrderButton = ({ 
  text = "ZAMÓW PRZEGLĄD", // Domyślny tekst
  userAvatar = null,       // URL do zdjęcia (np. "https://lh3.google...")
  showIcon = true,         // Czy w ogóle pokazywać ikonę/zdjęcie?
  onClick,                  // Funkcja obsługująca kliknięcie
  padding = "6px 6px 6px 32px"
}) => {
  return (
    <button className="order-button" onClick={onClick} style={padding ? { padding: padding } : {}}>
      <span className="order-button-text">{text}</span>
      
      {showIcon && (
        <div className="order-button-icon-wrapper">
          {userAvatar ? (
            /* Wariant 1: Użytkownik zalogowany (Zdjęcie) */
            <img 
              src={userAvatar} 
              alt="Profil użytkownika" 
              className="user-avatar" 
            />
          ) : (
            /* Wariant 2: Domyślna ikona (Ludzika) */
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="default-icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};

export default OrderButton;
