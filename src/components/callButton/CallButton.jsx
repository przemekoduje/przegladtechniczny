import React from "react";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import "./callButton.scss"


export default function CallButton({ phoneNumber }) {
  return (
    <a href={`tel:${phoneNumber}`} className="call-button">
      <button className="main-button">
        <span>+48 690 024 414</span>
        <div className="btn-icon">
          <PhoneInTalkIcon />
        </div>
      </button>
    </a>
  );
}
