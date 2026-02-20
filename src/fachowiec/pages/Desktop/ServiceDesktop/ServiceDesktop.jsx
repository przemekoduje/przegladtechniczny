import React, { useState } from "react";
import PopupForm from "../../components/PopupForm/PopupForm";
import heroTiles from "../../components/heroTilesData.js";
import "./serviceDesktop.scss";
import HeroTile2 from "../../components/Herotile2/HeroTile2";
import { db } from "../../../../firebase"; // Ścieżka do pliku firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ServiceDesktop() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [issues, setIssues] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const handleFieldChange = (field, value) => {
    setFormFields(prev => ({ ...prev, [field]: value }));
  };

  const openPopup = (tile) => {
    setSelectedTile(tile);
    setPopupOpen(true);
  };

  // Dodawanie usterki do listy
  const handleAddIssue = () => {
    if (selectedTile) {
      setIssues((prev) => [...prev, { title: selectedTile.title, desc: selectedTile.desc }]);
    }
    setPopupOpen(false);
    setSelectedTile(null);
  };

  // Usuwanie usterki z listy
  const handleRemoveIssue = (idx) => {
    setIssues((prev) => prev.filter((_, i) => i !== idx));
  };


  const closePopup = () => {
    setPopupOpen(false);
    setSelectedTile(null);
  };


  const handleOrder = async (formData) => {
    // Upewnij się, że ostatnia tile też się doda
    let allIssues = issues;
    if (selectedTile) {
      const already = issues.some(iss => iss.title === selectedTile.title && iss.desc === selectedTile.desc);
      if (!already) {
        allIssues = [...issues, { title: selectedTile.title, desc: selectedTile.desc }];
      }
    }
  
    try {
      await addDoc(collection(db, "zgloszenia"), {
        ...formFields,
        issues: allIssues,
        created: serverTimestamp(),
      });
      alert("Zgłoszenie wysłane!");
      setIssues([]);
      setFormFields({ name: "", phone: "", address: "", note: "" });
      setPopupOpen(false);
      setSelectedTile(null);
    } catch (e) {
      alert("Błąd przy wysyłce");
      console.error(e);
    }
  };

  return (
    <div className="service-tiles-root" id="uslugi">
      <div className="herotiles-head">
        <span>z czym masz</span>{" "}<span className="blue">kłopot ?</span>
      </div>
      <div className={`hero-tiles-grid${popupOpen ? " blurred" : ""}`}>
        {heroTiles.map((tile) => (
          <HeroTile2
            key={tile.id}
            icon={tile.icon}
            title={tile.title}
            desc={tile.desc}
            color={tile.color}
            onClick={() => openPopup(tile)}
          />
        ))}
      </div>
      {popupOpen && (
        <PopupForm
        tile={selectedTile}
        issues={issues}
        onAddIssue={handleAddIssue}
        onRemoveIssue={handleRemoveIssue}
        onOrder={handleOrder} // <- ten handleOrder ZOSTAJE!
        onClose={closePopup}
        name={formFields.name}
        phone={formFields.phone}
        address={formFields.address}
        note={formFields.note}
        onFieldChange={handleFieldChange}
      />
      )}
    </div>
  );
}
