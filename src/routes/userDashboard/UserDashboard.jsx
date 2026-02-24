// UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import "./userDashboard.scss";

export default function UserDashboard({ user }) {
  const [cart, setCart] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  // States for Date Change Modal
  const [editingItemId, setEditingItemId] = useState(null);
  const [newDate, setNewDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const userCartRef = collection(db, "userCarts");
      const snapshot = await getDocs(
        query(userCartRef, where("userId", "==", user.uid))
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCart(data);
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userToken");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Czy chcesz usunąć to zgłoszenie?")) {
      await deleteDoc(doc(db, "userCarts", id));
      setCart((prev) => prev.filter((item) => item.id !== id));
      setActiveMenu(null);
    }
  };

  // --- Otwiera okienko edycji daty ---
  const handleOpenDateChange = (item) => {
    setEditingItemId(item.id);
    // Ustawiamy domyślną wartość inputa na to, co już było (lub pustą, żeby wybrać nową)
    if (item.scheduledDate) {
      const d = new Date(item.scheduledDate);
      if (!isNaN(d)) {
        const localDateTime = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setNewDate(localDateTime);
      } else {
        setNewDate(item.scheduledDate);
      }
    } else {
      setNewDate("");
    }
    setActiveMenu(null); // Zamykamy małe menu z opcjami ("Usuń", "Zmień termin")
  };

  // --- Zapisuje wybraną datę do bazy ---
  const saveNewDate = async () => {
    if (!newDate) {
      alert("Proszę wybrać poprawną datę.");
      return;
    }
    try {
      const itemRef = doc(db, "userCarts", editingItemId);
      await updateDoc(itemRef, {
        scheduledDate: newDate,
        status: "KLIENT PROPONUJE TERMIN"
      });

      // Aktualizujemy lokalny stan, by UI natychmiast wychwyciło zmianę
      setCart((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? { ...item, scheduledDate: newDate, status: "KLIENT PROPONUJE TERMIN" }
            : item
        )
      );

      setEditingItemId(null); // Zamyka modal
    } catch (error) {
      console.error("Błąd podczas aktualizacji daty:", error);
      alert("Nie udało się zaktualizować terminu. Spróbuj ponownie.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const getStatus = (item) => {
    if (item.status) return item.status;
    return item.scheduledDate ? "Termin ustalony" : "W trakcie ustaleń";
  };

  const handleAcceptDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "ZATWIERDZONY" });
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, status: "ZATWIERDZONY" } : item));
    } catch (error) {
      console.error("Error accepting date:", error);
      alert("Nie udało się zaakceptować terminu.");
    }
  };

  const handleRejectDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "DO ZMIANY" });
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, status: "DO ZMIANY" } : item));
    } catch (error) {
      console.error("Error rejecting date:", error);
      alert("Nie udało się odrzucić terminu.");
    }
  };

  const getPreferredDateLabel = (val) => {
    if (val === "pilne") return "jak najszybciej";
    if (val === "miesiac") return "w przyszłym miesiącu";
    if (val === "inny") return "w innym terminie";
    return val || "brak sugestii";
  };

  const getInspectionsList = (inspections) => {
    if (!inspections) return "brak";
    return Object.entries(inspections)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        switch (key) {
          case "specjalista": return "odbiór techniczny";
          case "budowlany": return "przegląd budowlany";
          case "gaz": return "instalacja gazowa";
          case "elektryka": return "instalacja elektryczna";
          case "wentylacja": return "wentylacja";
          default: return key;
        }
      })
      .join(", ") || "brak";
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="user-dashboard">
        {user ? (
          <>
            <header className="header">
              <div className="header-titles">
                <h2>Twoje zgłoszenia</h2>
                <p className="user-email">Zalogowano jako: <strong>{user.email}</strong></p>
              </div>
              <div className="header-actions">
                <button className="btn-home" onClick={handleGoHome}>
                  Wróć na stronę główną
                </button>
                <button className="btn-logout" onClick={handleLogout}>
                  Wyloguj się
                </button>
              </div>
            </header>

            {cart.length === 0 ? (
              <div className="empty-state">
                <p>Brak zgłoszeń. Wypełnij formularz, aby rozpocząć współpracę.</p>
                <button className="btn-cta" onClick={() => navigate("/", { state: { scrollTo: "inspection-form" } })}>
                  Zamów przegląd
                </button>
              </div>
            ) : (
              <div className="submissions">
                {cart.map((item) => (
                  <div key={item.id} className="submission">
                    <div className="submission-info">
                      <strong>
                        {item.property?.propertyType || "Typ nieruchomości"}
                      </strong>
                      <p>
                        Adres: {item.property?.propertyAddress},{" "}
                        {item.property?.nearestCity}
                      </p>
                      <p>
                        Zakres prac: {getInspectionsList(item.property?.inspections)}
                      </p>
                      <p>
                        Preferowany czas (sugestia): {getPreferredDateLabel(item.property?.preferredDate)}
                      </p>

                      <p className={`status-badge ${item.status === "ZATWIERDZONY" ? "confirmed" :
                        item.status === "OCZEKUJE NA AKCEPTACJĘ" ? "pending-action" :
                          item.status === "KLIENT PROPONUJE TERMIN" ? "pending" :
                            item.status === "DO ZMIANY" ? "needs-attention" :
                              item.scheduledDate ? "confirmed" : "pending"
                        }`}>
                        Status: {getStatus(item)}
                      </p>

                      {item.scheduledDate ? (
                        <div className="scheduled-date-container">
                          <p className="scheduled-date">Termin: <strong>{formatDate(item.scheduledDate)}</strong></p>
                          {item.status !== "ZATWIERDZONY" && (
                            <button className="btn-propose-inline" onClick={() => handleOpenDateChange(item)}>
                              ✏️ Zmień termin
                            </button>
                          )}

                          {item.status === "OCZEKUJE NA AKCEPTACJĘ" && (
                            <div className="date-approval-actions">
                              <button className="btn-accept" onClick={() => handleAcceptDate(item.id)}>✓ Akceptuj termin</button>
                              <button className="btn-reject" onClick={() => handleRejectDate(item.id)}>✕ Odrzuć</button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="scheduled-date-container">
                          <div className="offer-notification" style={{ backgroundColor: '#e9f5ff', borderLeft: '4px solid #007bff', padding: '10px', marginBottom: '15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📩</span>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#0056b3', lineHeight: '1.4' }}>
                              Mamy to! Trwa analiza Twojego zgłoszenia.<br />
                              <strong>Niebawem wyślemy do Ciebie maila i SMS z przygotowaną ofertą.</strong>
                            </p>
                          </div>
                          <button className="btn-propose-inline" onClick={() => handleOpenDateChange(item)}>
                            📅 Zaproponuj termin
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="submission-actions">
                      <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}>
                        <MoreVertIcon />
                      </button>
                      {activeMenu === item.id && (
                        <div className="submission-menu">
                          <button onClick={() => handleDelete(item.id)} className="danger">
                            🗑️ Usuń zgłoszenie
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODAL DO ZMIANY DATY */}
            {editingItemId && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Zmień termin realizacji</h3>
                    <CloseIcon
                      className="close-icon"
                      onClick={() => setEditingItemId(null)}
                    />
                  </div>
                  <p className="modal-desc">Wybierz nową datę wizyty naszego fachowca poniżej. Zmiana zostanie zapisana w systemie i zaktualizuje Twój wniosek.</p>
                  <input
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="date-picker-input"
                  />
                  <div className="modal-buttons">
                    <button className="btn-cancel" onClick={() => setEditingItemId(null)}>
                      Anuluj
                    </button>
                    <button className="btn-save" onClick={saveNewDate}>
                      Zapisz nową datę
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Widok wylogowany / logowanie */}
            <h3>
              <span style={{ fontSize: "30px" }}>
                panel użytkownika <br />
              </span>
              <span style={{ fontSize: "16px", color: "#666" }}>
                Zarządzaj swoimi zleceniami przeglądów budowlanych w jednym miejscu.
              </span>
            </h3>
            <button className="main_button" onClick={() => navigate("/login")}>
              Zaloguj się
            </button>
            <button className="secondary_button" onClick={handleGoHome} style={{ marginTop: '15px' }}>
              Wróć na stronę główną
            </button>
          </>
        )}
      </div>
    </div>
  );
}
