import React, { useEffect, useState } from "react";
import "./inspectionForm.scss";
import CustomDropdown from "../../components/custonDropdown/CustomDropdown";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";



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
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

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

  console.log(formData);

  // Funkcja do dodawania nieruchomości do koszyka
  const handleAddToCart = () => {
    const newProperty = {
      type: formData.propertyType,
      klatki: formData.numberOfBlocks,
      address: formData.propertyAddress,
      area: formData.area,
      zakres: formData.inspections,
      termin: formData.preferredDate,
    };

    if (newProperty.type && newProperty.address) {
      const updatedCart = [...cart, newProperty];
      setCart(updatedCart);
      setShowCart(true);
      

      // Resetowanie formularza po dodaniu do koszyka
      setFormData({
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
    } else {
      alert("Proszę wypełnić wszystkie wymagane pola.");
    }
  };

  // // Funkcja zapisywania do Local Storage
  // const saveToLocalStorage = (key, value) => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // };

  // // Funkcja odczytywania danych z Local Storage
  // const loadFromLocalStorage = (key) => {
  //   const storedData = localStorage.getItem(key);
  //   return storedData ? JSON.parse(storedData) : null;
  // };

  // // Ładowanie danych z Local Storage przy pierwszym renderowaniu
  // useEffect(() => {
  //   const savedCart = loadFromLocalStorage("cart");
  //   const savedFormData = loadFromLocalStorage("formData");

  //   if (savedCart) {
  //     setCart(savedCart);
  //     setShowCart(savedCart.length > 0);
  //   }

  //   if (savedFormData) {
  //     setFormData(savedFormData);
  //   }
  // }, []);

  // // Zapisuj dane formularza przy każdej zmianie
  // useEffect(() => {
  //   saveToLocalStorage("formData", formData);
  // }, [formData]);


  useEffect(() => {
    const fetchCart = async () => {
      if (auth.currentUser) {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(userCartRef);
        const userCart = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .find(cart => cart.userId === auth.currentUser.uid);
  
        if (userCart) {
          setCart(userCart.cart);
          setShowCart(userCart.cart.length > 0);
        }
      }
    };
  
    fetchCart();
  }, [auth.currentUser]);

  // Funkcja logowania użytkownika
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Użytkownik zalogowany:", auth.currentUser);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

 

  // Funkcja wysyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser; // Pobierz aktualnego użytkownika

    if (!user) {
      // Jeśli użytkownik nie jest zalogowany, zaloguj go
      alert("Musisz się zalogować przed wysłaniem danych.");
      try {
        await handleLogin(); // Wywołaj logowanie przez Google
      } catch (error) {
        console.error("Błąd logowania:", error);
        return; // Jeśli logowanie się nie powiedzie, przerwij
      }
    }

    try {
      const userCartRef = collection(db, "userCarts"); // Kolekcja w Firestore
      await addDoc(userCartRef, {
        userId: auth.currentUser.uid, // Powiązanie z użytkownikiem
        cart: cart,
        formData: formData, // Dane formularza
        timestamp: new Date(),
      });
      alert("Dane zostały zapisane w bazie danych.");
      setCart([]); // Opróżnienie koszyka
      setFormData({
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
      }); // Resetuj formularz
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
      alert("Nie udało się zapisać danych.");
    }

    // // Zapisz dane koszyka do localStorage po zalogowaniu
    // console.log("Zalogowany użytkownik:", auth.currentUser.displayName);
    // console.log("Zapisuję dane koszyka do localStorage...");
    // localStorage.setItem("cart", JSON.stringify(cart)); // Zapisz koszyk
    // alert("Dane zapisane pomyślnie!");
  };

  useEffect(() => {
    // Zmien kolor pierwszej opcji w każdym <select>
    const selects = document.querySelectorAll("select");
    selects.forEach((select) => {
      select.style.color = select.value === "" ? "#888" : "#000";
      select.addEventListener("change", () => {
        select.style.color = select.value === "" ? "#888" : "#000";
      });
    });
  }, []);

  const options = [
    { value: "dom", label: "dom jednorodzinny" },
    { value: "wielorodzinny", label: "budynek wielorodzinny" },
    { value: "komercja", label: "nieruchomość komercyjna" },
  ];
  const options2 = [
    { value: "szybko", label: "jak najszybciej" },
    { value: "miesiac", label: "w przyszłym miesiącu" },
    { value: "termin", label: "w innym terminie" },
  ];

  // // Funkcja do obsługi wyboru opcji w CustomDropdown
  // const handleSelect = (option) => {
  //   setFormData({ ...formData, propertyType: option });
  // };
  // Sprawdzamy, czy wybrano opcję "budynek wielorodzinny"
  const isMultiFamilyBuilding = formData.propertyType === "wielorodzinny";

  return (
    <>
      <form className="inspection-form">
        <h2>Złóż zapytanie o przegląd</h2>
        <p>
          Każdą nieruchomość przedstaw oddzielnie a następnie dodaj ją do
          koszyka
        </p>

        {/* Typ nieruchomości */}
        <div className="typ">
          <div>
            <label>Jaki typ nieruchomości chcesz zgłosić do przeglądu?</label>
            <CustomDropdown
              options={options}
              placeholder="Wybierz typ nieruchomości"
              onSelect={(option) =>
                setFormData({ ...formData, propertyType: option.value })
              }
            />
          </div>

          {/* Liczba klatek */}

          <div
            className={`klatkiCounter ${
              isMultiFamilyBuilding ? "visible" : ""
            }`}
          >
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
          <label>Powierzchnia całkowita oraz ilość kondygnacji</label>
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
        <div className="termin">
          <label>W jakim terminie najlepiej przeprowadzić przegląd?</label>
          <CustomDropdown
            options={options2}
            placeholder="dokonaj wyboru"
            onSelect={(option) =>
              setFormData({ ...formData, preferredDate: option.value })
            }
          />
        </div>

        {/* Przycisk dodaj do koszyka */}
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Dodaj do koszyka
        </button>
      </form>

      {/* Sekcja koszyka */}
      {showCart && (
        <div className="cart-section">
          <h3>Koszyk</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.type} - {item.address}
              </li>
            ))}
          </ul>
          {/* Formularz danych kontaktowych */}
          <h3>Dane kontaktowe / logowanie</h3>
          <div>
            <label>Dane osoby do kontaktu</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="wpisz dane"
            />
            <label>jeeli to osoba trzecia wpisz jej telefon</label>
            <input
              type="text"
              name="contactTel"
              value={formData.contactTel}
              onChange={handleChange}
              placeholder="wpisz dane"
            />
          </div>
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
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Wyślij
          </button>
        </div>
      )}
    </>
  );
};

export default InspectionForm;
