import React from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./ThankYouPage.scss";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <CheckCircleOutlineIcon className="success-icon" />
        <h1>Dziękuję za zapytanie!</h1>
        <p className="highlight-text">Twój numer jest u mnie.</p>
        <p className="details-text">
          Będę dzwonił w ciągu najbliższych 24 godzin z numeru <strong>500-XXX-XXX</strong>. 
          Przygotuj proszę informację o metrażu domu.
        </p>
        <button onClick={() => navigate("/")} className="back-btn">
          Wróć do strony głównej
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
