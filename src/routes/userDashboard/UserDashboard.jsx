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
} from "firebase/firestore";
import { db } from "../../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./userDashboard.scss";

export default function UserDashboard({ user }) {
  const [cart, setCart] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
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

  const handleDelete = async (id) => {
    if (window.confirm("Czy chcesz usunąć to zgłoszenie?")) {
      await deleteDoc(doc(db, "userCarts", id));
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  };

  const getStatus = (item) => {
    return item.scheduledDate ? "Termin ustalony" : "Zgłoszenie przyjęte";
  };

  return (
    <div className="user-dashboard">
      {user ? (
        <>
          {/* Widok po zalogowaniu (dashboard z danymi) */}
          <header className="header">
            <h2>Twoje zgłoszenia</h2>
            <button onClick={handleLogout}>Wyloguj się</button>
          </header>

          {cart.length === 0 ? (
            <p>Brak zgłoszeń. Wypełnij formularz, aby rozpocząć współpracę.</p>
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

                    <p>Status: {getStatus(item)}</p>
                    {item.scheduledDate && (
                      <p>Termin: {formatDate(item.scheduledDate)}</p>
                    )}
                  </div>
                  <div className="submission-actions">
                    <button onClick={() => setActiveMenu(item.id)}>
                      <MoreVertIcon />
                    </button>
                    {activeMenu === item.id && (
                      <div className="submission-menu">
                        <button onClick={() => handleDelete(item.id)}>
                          🗑 Usuń
                        </button>
                        <button
                          onClick={() =>
                            alert("Opcja niedostępna: zmiana terminu")
                          }
                        >
                          📅 Zmień termin
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Elegancki widok zachęcający do logowania */}
          <h3>
            <span style={{ fontSize: "30px" }}>
              panel użytkownika <br />
            </span>
            <span style={{ fontSize: "16px" }}>
              tylko z dobrymi wiadomościami
            </span>
          </h3>
          <button className="main_button" onClick={() => navigate("/login")}>
            Zaloguj się
          </button>
        </>
      )}
    </div>
  );
}
