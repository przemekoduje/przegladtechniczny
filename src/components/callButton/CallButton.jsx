import React from "react";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import "./callButton.scss"


export default function CallButton({ phoneNumber }) {
  return (
    <a href={`tel:${phoneNumber}`} className="call_button">
      <div className="btn-icon">
        <PhoneInTalkIcon />
      </div>
      <span>690 029 414</span>
    </a>
  );
}
