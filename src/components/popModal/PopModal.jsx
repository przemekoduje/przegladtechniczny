import React from "react";
import "./popupModal.scss";

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default PopupModal;
