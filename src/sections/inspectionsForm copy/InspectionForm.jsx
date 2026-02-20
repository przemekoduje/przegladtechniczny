import React, { useEffect, useState } from "react";
import "./inspectionForm.scss";
import CustomDropdown from "../../components/custonDropdown/CustomDropdown";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
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
    contactPhone: "",
  });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [localCart, setLocalCart] = useState([]); // Dane przechowywane lokalnie
  const location = useLocation();

  const saveLocalCartToStorage = (cart) => {
    localStorage.setItem("localCart", JSON.stringify(cart));
  };

  const loadLocalCartFromStorage = () => {
    const storedCart = localStorage.getItem("localCart");
    return storedCart ? JSON.parse(storedCart) : [];
  };
  useEffect(() => {
    const storedCart = loadLocalCartFromStorage();
    setLocalCart(storedCart);
  }, []);

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
      const updatedCart = [...localCart, newProperty];
      setLocalCart(updatedCart); // Aktualizacja localCart
      saveLocalCartToStorage(updatedCart); // Zapis do localStorage

      // Resetowanie formularza
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
      setSelectedType(null);
      setSelectedDate(null);
    } else {
      alert("Proszę wypełnić wszystkie wymagane pola.");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.currentUser) {
        const userCartRef = collection(db, "userCarts");
        const snapshot = await getDocs(
          query(userCartRef, where("userId", "==", auth.currentUser.uid))
        );

        const userCart = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (userCart) {
          // Jeśli userCart jest tablicą
          setCart(userCart);
          setShowCart(userCart.length > 0);
        } else {
          setCart([]); // Gdy brak danych
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
    if (e) {
      e.preventDefault(); // Upewnij się, że `e` istnieje, zanim go użyjesz
    }

    let user = auth.currentUser;


    // Jeśli użytkownik nie jest zalogowany
    if (!user) {
      // Przekierowanie na stronę logowania, jeśli użytkownik nie jest zalogowany
      alert("Musisz się zalogować, aby wysłać dane.");
      navigate("/login", { state: { from: "/" } }); // Przekazanie miejsca powrotu
      return;
    }

    try {
      const userCartRef = collection(db, "userCarts");

      // Iteracja przez dane w `localCart` i zapisanie każdego wpisu jako osobny dokument
      const savePromises = localCart.map(async (item) => {
        const docRef = await addDoc(userCartRef, {
          userId: user.uid,
          email: user.email, // Dodaj email użytkownika
          phone: formData.contactPhone || null, // Dodaj numer telefonu, jeśli istnieje
          type: item.type,
          address: item.address,
          klatki: item.klatki || null,
          floors: item.floors || null,
          area: item.area || null,
          termin: item.termin || null,
          zakres: {
            construction: item.zakres?.construction || false,
            gas: item.zakres?.gas || false,
            electrical: item.zakres?.electrical || false,
            energy: item.zakres?.energy || false,
          },
          timestamp: new Date(),
        });
        console.log("Dodano dokument z id:", docRef.id);
        return docRef.id;
      });

      await Promise.all(savePromises);

      alert("Wszystkie dane zostały zapisane w bazie danych.");
      setLocalCart([]); // Czyszczenie lokalnego koszyka
      saveLocalCartToStorage([]); // Czyszczenie localStorage
      setShowCart(false);
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
      alert("Nie udało się zapisać danych.");
    }
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
    { value: "dom jednorodzinny", label: "dom jednorodzinny" },
    { value: "budynek wielorodzinny", label: "budynek wielorodzinny" },
    { value: "nieruchomość komercyjna", label: "nieruchomość komercyjna" },
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
  const isMultiFamilyBuilding = formData.propertyType === "budynek wielorodzinny";

  useEffect(() => {
    const locationState = location.state;
    if (locationState?.scrollTo === "inspectionForm") {
      const inspectionFormElement = document.querySelector(".inspection-form");
      if (inspectionFormElement) {
        inspectionFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);


  return (
    <>
      <form className="inspection-form" id="inspection-form">
        <h2>Złóż zapytanie o przegląd</h2>
        <p>
          Każdą nieruchomość przedstaw oddzielnie a następnie dodaj ją do
          koszyka i wyślij
        </p>

        {/* Typ nieruchomości */}
        <div className="typ">
          <div>
            <label>Jaki typ nieruchomości chcesz zgłosić do przeglądu?</label>
            <CustomDropdown
              options={options}
              placeholder="Wybierz typ nieruchomości"
              onSelect={(option) => {
                setFormData({ ...formData, propertyType: option.value });
                setSelectedType(option.value);
              }}
              selectedValue={selectedType}
            />
          </div>

          {/* Liczba klatek */}

          <div
            className={`klatkiCounter ${isMultiFamilyBuilding ? "visible" : ""
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
        <div className="adres-box">
          <label>Adres nieruchomości</label>
          <input
            className="adres"
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="Miasto, ulica, nr "
          />
        </div>

        {/* Powierzchnia, kubatura i liczba kondygnacji */}
        <div className="pow_kond">
          <label>Ilość kondygnacji</label>
          <div className="danes">
            {/* <input
              className="dane"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="pow. [m2]"
            /> */}

            <input
              className="dane"
              type="text"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              placeholder="kond. [szt]"
            />
          </div>

        </div>

        {/* Zakres przeglądu */}
        <div className="zakres">
          <label className="opis">Określ zakres przeglądu</label>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="construction"
              id="construction"
              checked={formData.inspections.construction}
              onChange={handleChange}
            />
            <label for="construction">przegląd budowlany</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="gas"
              id="gas"
              checked={formData.inspections.gas}
              onChange={handleChange}
            />
            <label for="gas">przegląd instalacji gazowej</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="electrical"
              id="electrical"
              checked={formData.inspections.electrical}
              onChange={handleChange}
            />
            <label for="electrical">przegląd instalacji elektrycznej</label>
          </div>
          <div className="checkbox custom-checkbox">
            <input
              type="checkbox"
              name="energy"
              id="energy"
              checked={formData.inspections.energy}
              onChange={handleChange}
            />
            <label for="energy">świadectwo charakterystyki energetycznej</label>
          </div>
        </div>

        {/* Termin przeglądu */}
        <div className="termin">
          <label>W jakim terminie najlepiej przeprowadzić przegląd?</label>
          <CustomDropdown
            options={options2}
            placeholder="dokonaj wyboru"
            onSelect={(option) => {
              setFormData({ ...formData, preferredDate: option.value });
              setSelectedDate(option.value); // Zapisuje wybraną opcję w stanie
            }}
            selectedValue={selectedDate}
          />
        </div>

        {/* Przycisk dodaj do koszyka */}
        <button
          type="button"
          className="main_button"
          onClick={handleAddToCart}
        >
          Dodaj do koszyka
        </button>


        {/* Sekcja koszyka */}
        {localCart.length > 0 && (
          <div className="cart-section">


            <ul>
              {localCart.map((item, index) => (
                <li key={index}>
                  {item.type} - {item.address}
                </li>
              ))}
            </ul>
            <div>
              <label>Podaj numer telefonu do kontaktu w tej sprawie (opcjonalnie):</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone || ""}
                onChange={handleChange}
                placeholder="Wpisz numer telefonu"
              />
            </div>

            <button type="submit" className="main_button" onClick={handleSubmit}>
              {auth.currentUser ? "Wyślij" : "Zaloguj i wyślij"}
            </button>
          </div>

        )}
      </form>
    </>
  );
};

export default InspectionForm;
