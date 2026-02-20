import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase";
import { doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./adminDashboard.scss";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [scheduledDates, setScheduledDates] = useState({});
  const [user, setUser] = useState(null); // Dodajemy stan użytkownika

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/adminLogin");
        return;
      }

      // Sprawdzamy uprawnienia użytkownika
      const adminsRef = collection(db, "admins");
      const q = query(
        adminsRef,
        where("email", "==", currentUser.email),
        where("isActive", "==", true)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        navigate("/adminLogin");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    // Sprzątanie nasłuchiwania
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserSubmissions = async () => {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(userCartRef);

        const submissions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserSubmissions(submissions);

        // Wczytanie zapisanych dat
        const initialScheduledDates = submissions.reduce((acc, submission) => {
          if (submission.scheduledDate) {
            acc[submission.id] = submission.scheduledDate;
          }
          return acc;
        }, {});
        setScheduledDates(initialScheduledDates);
      };

      fetchUserSubmissions();
    }
  }, [user]);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const handleDateChange = (submissionId, date) => {
    setScheduledDates((prevDates) => ({
      ...prevDates,
      [submissionId]: date,
    }));
  };

  const handleSaveDate = async (submissionId) => {
    try {
      const newDate = scheduledDates[submissionId];
      if (!newDate) {
        alert("Proszę wybrać datę przed zapisaniem.");
        return;
      }

      const submissionRef = doc(db, "userCarts", submissionId);
      await updateDoc(submissionRef, { scheduledDate: newDate });

      alert("Termin został zaktualizowany.");
      setUserSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === submissionId
            ? { ...submission, scheduledDate: newDate }
            : submission
        )
      );
    } catch (error) {
      console.error("Błąd podczas aktualizacji terminu:", error);
      alert("Nie udało się zaktualizować terminu.");
    }
  };

  

  return (
    <div className="admindashboard">
        <h1>Admin Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Typ</th>
              <th>Adres</th>
              <th>Klatki</th>
              <th>Kondygnacje</th>
              <th>Powierzchnia</th>
              <th>Zakres</th>
              <th>Termin</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Ustalony termin</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {userSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.type}</td>
                <td>{submission.address}</td>
                <td>{submission.klatki || "Brak"}</td>
                <td>{submission.floors || "Brak"}</td>
                <td>{submission.area || "Brak"}</td>
                <td>
                  {Object.entries(submission.zakres || {})
                    .filter(([key, value]) => value)
                    .map(([key]) => key)
                    .join(", ") || "Brak"}
                </td>
                <td>{submission.termin}</td>
                <td>{submission.email}</td>
                <td>{submission.phone || "Brak"}</td>
                <td>
                  <input
                    type="date"
                    value={scheduledDates[submission.id] || ""}
                    onChange={(e) => handleDateChange(submission.id, e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSaveDate(submission.id)}>Zatwierdź</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className="logout-btn" onClick={handleLogout}>
        Wyloguj
      </div>
      <div className="mainPage-btn" onClick={() => navigate("/")}>
        Main Page
      </div>
    </div>
  );
}
