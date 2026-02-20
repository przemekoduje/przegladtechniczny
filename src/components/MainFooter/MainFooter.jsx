import React from "react";
import "./mainFooter.scss";
import { fontSize } from "@mui/system";
import CallButton from "../CallButton/CallButton";

export default function MainFooter() {
  return (
    <div className="mainfooter">
      <div className="greenscreamlogo">
        <span className="greenscreamlogo_up">A może tak dzwonnij?</span>
        <br />

        <CallButton phoneNumber="690029414" />

        {/* <img src="/images/logo.png"alt="" /> */}
      </div>
    </div>
  );
}
