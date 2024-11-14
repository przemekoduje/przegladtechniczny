import React, { useState } from "react";
import "./inspectionForm.scss";

const InspectionForm = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    numberOfBlocks: "",
    propertyAddress: "",
    area: "",
    volume: "",
    floors: "",
    inspections: {
      construction: false,
      gas: false,
      electrical: false,
      energy: false,
    },
    preferredDate: "",
    contactName: "",
    contactEmail: "",
  });

  // Funkcja do obsługi zmiany wartości w formularzu
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        inspections: {
          ...prevData.inspections,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Funkcja do obsługi wysyłania formularza
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Dodaj logikę wysyłki danych do backendu tutaj
  };

  return (
    <form onSubmit={handleSubmit} className="inspection-form">
      
      
      <h2>Złóż zapytanie o przegląd</h2>

      {/* Typ nieruchomości */}
      <div className="typ">
        <div>
          <label>Jaki typ nieruchomości chcesz zgłosić do przeglądu?</label>
          <select
            className="prop"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          >
            <option value="">dokonaj wyboru</option>
            <option value="mieszkalna">dom jednorodzinny</option>
            <option value="biurowa">budynek wielorodzinny</option>
            <option value="przemysłowa">Nieruchomość komercyjna</option>
          </select>
        </div>

        {/* Liczba klatek */}
        <div>
          <label>Liczba klatek</label>
          <input
            className="klatki"
            type="number"
            name="numberOfBlocks"
            value={formData.numberOfBlocks}
            onChange={handleChange}
            placeholder="wpisz dane"
          />
        </div>
      </div>

      {/* Adres nieruchomości */}
      <div>
        <label>Adres nieruchomości</label>
        <input
          className="adres"
          type="text"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange}
          placeholder="wpisz dane"
        />
      </div>

      {/* Powierzchnia, kubatura i liczba kondygnacji */}
      <div>
        <label>
          Powierzchnia całkowita oraz kubatura oraz ilość kondygnacji
        </label>
        <input
          className="dane"
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="pow. [m2]"
        />
        <input
        className="dane"
          type="text"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          placeholder="kub. [m3]"
        />
        <input
        className="dane"
          type="text"
          name="floors"
          value={formData.floors}
          onChange={handleChange}
          placeholder="kond. [szt]"
        />
      </div>

      {/* Zakres przeglądu */}
      <div className="zakres">
        <label className="opis">Zakres przeglądu</label>
        <div className="checkbox">
          <input
            type="checkbox"
            name="construction"
            checked={formData.inspections.construction}
            onChange={handleChange}
          />
          <label>przegląd budowlany</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="gas"
            checked={formData.inspections.gas}
            onChange={handleChange}
          />
          <label>przegląd instalacji gazowej</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="electrical"
            checked={formData.inspections.electrical}
            onChange={handleChange}
          />
          <label>przegląd instalacji elektrycznej</label>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="energy"
            checked={formData.inspections.energy}
            onChange={handleChange}
          />
          <label>świadectwo charakterystyki energetycznej</label>
        </div>
      </div>

      {/* Termin przeglądu */}
      <div>
        <label>W jakim terminie najlepiej przeprowadzić przegląd?</label>
        <select
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
        >
          <option value="">dokonaj wyboru</option>
          <option value="asap">Jak najszybciej</option>
          <option value="next_month">W przyszłym miesiącu</option>
          <option value="specific_date">W konkretnym terminie</option>
        </select>
      </div>

      {/* Przycisk dodaj do koszyka */}
      <button type="button" className="add-to-cart-btn">
        Dodaj do koszyka
      </button>

      <h3>Dane kontaktowe / logowanie</h3>

      {/* Imię i nazwisko osoby do kontaktu */}
      <div>
        <label>Dane osoby do kontaktu w tej sprawie</label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="wpisz dane"
        />
      </div>

      {/* Adres email */}
      <div>
        <label>Adres email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="wpisz dane"
        />
      </div>

      {/* Przycisk zarejestruj i wyślij */}
      <button type="submit" className="submit-btn">
        ZAREJESTRUJ I WYŚLIJ
      </button>
    </form>
  );
};

export default InspectionForm;
