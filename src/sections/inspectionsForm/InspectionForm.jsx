import React, { useState, useEffect } from "react";
import "./inspectionForm.scss";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// import { auth } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import PopupModal from "../../components/popModal/PopModal";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HouseIcon from "@mui/icons-material/House";

const InspectionFormSlide = () => {
  const [submittedProperties, setSubmittedProperties] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { currentUser } = useAuth();
  // const [currentUser, setCurrentUser] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const [formData, setFormData] = useState({
    propertyType: "",
    numberOfBlocks: "",
    propertyAddress: "",
    nearestCity: "",
    area: "",
    volume: "",
    floors: "",
    inspections: {
      gas: false,
      construction: false,
      electrical: false,
      chimney: false,
      energy: false,
    },
    preferredDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    selectAll: false,
    remindMe: false,
    acceptPrivacy: false,
    acceptTerms: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("firebaseUser"));
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        contactEmail: user.email,
      }));
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     }
  //   });
  //
  //   return () => unsubscribe();
  // }, []);

  // 1. Odczyt danych po powrocie z logowania
  useEffect(() => {
    const savedProps = localStorage.getItem("pendingProperties");
    const savedContact = localStorage.getItem("pendingContact");

    if (savedProps) {
      setSubmittedProperties(JSON.parse(savedProps));
      setShowSummary(true);
      localStorage.removeItem("pendingProperties");
    }

    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setFormData((prev) => ({
        ...prev,
        contactName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        remindMe: contact.remindMe,
        acceptPrivacy: contact.acceptPrivacy,
        acceptTerms: contact.acceptTerms,
      }));
      localStorage.removeItem("pendingContact");
    }

    // 2. Przewiń do #inspectionForm
    // const hash = window.location.hash;
    // if (hash === "#inspectionForm") {
    //   const section = document.querySelector(hash);
    //   if (section) {
    //     setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 300);
    //   }
    // }
  }, []);




  const options = [
    { value: "dom jednorodzinny", label: "Dom jednorodzinny" },
    { value: "budynek wielorodzinny", label: "Budynek wielorodzinny" },
    { value: "nieruchomość komercyjna", label: "Nieruchomość komercyjna" },
  ];
  const optionsTime = [
    { value: "pilne", label: "jak najszybciej" },
    { value: "miesiac", label: "w przyszłym miesiącu" },
    { value: "inny", label: "w innym terminie" },
  ];

  const isCurrentStepValid = () => {
    const step = filteredSteps[currentStep];

    if (step.title === "Wybierz rodzaj nieruchomości") {
      return formData.propertyType !== "";
    }

    if (step.title === "Podaj liczbę klatek") {
      return formData.numberOfBlocks !== "";
    }

    if (step.title === "Wybierz zakres przeglądów") {
      return Object.values(formData.inspections).some((v) => v === true);
    }

    if (step.title === "Adres nieruchomości") {
      return (
        formData.propertyAddress.trim() !== "" &&
        formData.nearestCity.trim() !== ""
      );
    }

    if (step.title === "Jak pilne jest przeprowadzenie przeglądu?") {
      return formData.preferredDate !== "";
    }

    return true;
  };

  const next = () => {
    if (!isCurrentStepValid()) {
      alert("Uzupełnij wymagane dane przed przejściem dalej.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProperty = () => {
    const newEntry = {
      propertyType: formData.propertyType,
      numberOfBlocks: formData.numberOfBlocks,
      propertyAddress: formData.propertyAddress,
      nearestCity: formData.nearestCity,
      area: formData.area,
      volume: formData.volume,
      floors: formData.floors,
      inspections: formData.inspections,
      preferredDate: formData.preferredDate,
      contact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
      },
    };

    setSubmittedProperties((prev) => [...prev, newEntry]);
    setShowList(true);
    setShowSummary(false);
    setCurrentStep(0);
    setFormData((prev) => ({
      ...prev,
      propertyType: "",
      numberOfBlocks: "",
      propertyAddress: "",
      nearestCity: "",
      area: "",
      volume: "",
      floors: "",
      inspections: {
        gas: false,
        construction: false,
        electrical: false,
        chimney: false,
        energy: false,
      },
      preferredDate: "",
    }));
    setSelectedType(null);
  };

  const handleSendAndShowSummary = () => {
    if (formData.propertyAddress || formData.nearestCity) {
      handleSubmitProperty(); // tylko jeśli mamy coś wpisane
    }

    setShowList(false);
    setShowSummary(true);
  };

  const handleFinalSubmit = async () => {
    if (!formData.acceptPrivacy || !formData.acceptTerms) {
      alert("Musisz zaakceptować wymagane zgody.");
      return;
    }

    const isLoggedIn = !!currentUser;

    if (!isLoggedIn) {
      setPopupMessage(
        "Aby wysłać zapytanie, musisz być zalogowany. Zostaniesz teraz przekierowany."
      );

      localStorage.setItem(
        "pendingProperties",
        JSON.stringify(submittedProperties)
      );
      localStorage.setItem(
        "pendingContact",
        JSON.stringify({
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          remindMe: formData.remindMe,
          acceptPrivacy: formData.acceptPrivacy,
          acceptTerms: formData.acceptTerms,
        })
      );
      localStorage.setItem("redirectAfterLogin", "/#inspection-form");

      return;
    }

    try {
      if (!currentUser) {
        alert("Nie rozpoznano zalogowanego użytkownika.");
        return;
      }

      const userId = currentUser.uid;
      const userEmail = currentUser.email;

      for (const property of submittedProperties) {
        await addDoc(collection(db, "userCarts"), {
          userId,
          userEmail,
          createdAt: Timestamp.now(),
          property, // jedna nieruchomość na wpis
          contact: {
            name: formData.contactName,
            email: formData.contactEmail,
            phone: formData.contactPhone,
          },
          zgody: {
            remindMe: formData.remindMe,
            acceptPrivacy: formData.acceptPrivacy,
            acceptTerms: formData.acceptTerms,
          },
          status: "Zgłoszenie przyjęte",
        });
      }
      setPopupMessage(
        <>
          <p>Zgłoszenie zostało zapisane i wysłane do wykonawcy.</p>
          <p>
            Szczegóły Twojego zgłoszenia znajdziesz w&nbsp;
            <a
              href="/dashboard"
              style={{ color: "#506446", textDecoration: "underline" }}
            >
              panelu klienta
            </a>
            .
          </p>
        </>
      );

      // alert("Wszystkie zgłoszenia zostały zapisane i wysłane do wykonawcy!");
      setSubmittedProperties([]);
      setShowSummary(false);
    } catch (error) {
      console.error("Błąd zapisu do bazy:", error);
      alert("Wystąpił błąd podczas zapisu. Spróbuj ponownie później.");
    }
  };

  const getStepIcon = () => {
    if (step.title === " ") {
      return <InfoIcon style={{ color: "#395840", fontSize: 40 }} />;
    }

    if (step.isFinalStep) {
      return <HouseIcon style={{ color: "#395840", fontSize: 40 }} />;
    }

    return <EventNoteIcon style={{ color: "#395840", fontSize: 40 }} />;
  };

  const steps = [
    {
      title: " ",
      noValidation: true, // brak walidacji
      content: (
        <div className="form-steps">
          <div className="info-content">
            <h2>
              Umów certyfikowany przegląd w 3 minuty
            </h2>
            <ul>
              <li>
                <span>1</span>
                Wybierz co i gdzie mamy sprawdzić.
              </li>
              <li>
                <span>2</span>Otrzymasz wycenę błyskawicznie na maila/telefon.
              </li>
              <li>
                <span>3</span>
                Ty wybierasz dogodny termin. My dopasowujemy się do Ciebie.
              </li>
              <li>
                <span>4</span>Gotowe! Płacisz dopiero po otrzymaniu kompletu dokumentów.
              </li>
            </ul>
            {/* <button className="start-button" onClick={next}>Zaczynamy!</button> */}
          </div>
        </div>
      ),
    },
    {
      title: "Wybierz rodzaj nieruchomości",
      content: (
        <div className="form-steps">
          <CustomDropdown
            className="slide-version"
            options={options}
            placeholder="Wybierz typ nieruchomości"
            onSelect={(option) => {
              setFormData((prev) => ({ ...prev, propertyType: option.value }));
              setSelectedType(option.value);
            }}
            selectedValue={selectedType}
          />
        </div>
      ),
    },
    {
      title: "Podaj liczbę klatek",
      condition: formData.propertyType === "budynek wielorodzinny",
      content: (
        <input
          type="number"
          name="numberOfBlocks"
          value={formData.numberOfBlocks}
          onChange={handleChange}
          placeholder="np. 3"
        />
      ),
    },
    {
      title: "Wybierz zakres przeglądów",
      content: (
        <div className="inspection-checklist">
          {[
            {
              key: "specjalista",
              title: "Odbiór techniczny nieruchomości",
              desc: " (przez uprawnionego specjalistę)",
              newPrice: "300 - 500zł",
            },

            {
              key: "budowlany",
              title: "Przegląd budowlany",
              desc: " (raz na 5 lat)",
              newPrice: "300 – 700zł",
            },
            {
              key: "gaz",
              title: "Przegląd instalacji gazowej",
              desc: " (co 1 rok)",
              newPrice: "250 – 350zł",
            },
            {
              key: "elektryka",
              title: "Przegląd instalacji elektrycznej",
              desc: " (raz na 5 lat)",
              newPrice: "450 – 950zł",
            },
            {
              key: "wentylacja",
              title: "Przegląd wentylacji grawitacyjnej",
              desc: " (co 1 rok)",
              newPrice: "250 – 450zł",
            },

          ].map((item) => (
            <label key={item.key} className="inspection-option">
              <input
                type="checkbox"
                name={item.key}
                checked={formData.inspections[item.key]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inspections: {
                      ...prev.inspections,
                      [item.key]: e.target.checked,
                    },
                  }))
                }
              />
              <div className="label-texts">
                <span className="title">{item.title}</span>
                <span className="desc">{item.desc}</span>
              </div>
              <div className="price">
                <span className="new">{item.newPrice}</span>
              </div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Adres nieruchomości",
      content: (
        <div className="contact-form">
          <input
            type="text"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="Adres budynku/ulica *"
            required
          />
          <input
            type="text"
            name="nearestCity"
            value={formData.nearestCity || ""}
            onChange={handleChange}
            placeholder="Miasto *"
            required
          />
        </div>
      ),
    },
    {
      title: "Jak pilne jest przeprowadzenie przeglądu?",
      isFinalStep: true,
      content: (
        <CustomDropdown
          className="slide-version"
          options={optionsTime}
          placeholder="Wybierz termin"
          onSelect={(option) => {
            setFormData((prev) => ({ ...prev, preferredDate: option.value }));
          }}
          selectedValue={formData.preferredDate}
        />
      ),
    },
    {
      title: "Co dalej?",
      isDecisionStep: true,
      content: (
        <div className="form-steps">
          <p>
            W następnym kroku podsumujemy wprowadzone dane nieruchomości.
            <br />
            Jeśli chcesz zgłosić kolejną nieruchomość, kliknij odpowiedni
            przycisk.
          </p>
        </div>
      ),
    },
  ];

  const filteredSteps = steps.filter((step) => step.condition !== false);
  const step = filteredSteps[currentStep];


  // Usunięto IntersectionObserver, który blokował przewijanie do sekcji poniżej formularza (np. do FAQ)

  useEffect(() => {
    if (currentStep <= 1) return; // nie przewijaj przy pierwszym kroku
    const section = document.getElementById("inspection-form");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (!isFullyVisible) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);




  return (
    <div className="inspection-form-wrapper" id="inspection-form">
      {!showSummary && (
        <div className="inspection-form-slide">
          <div className="icon-wrapper">{getStepIcon()}</div>

          {step.title.trim() !== "" ? <h3>{step.title}</h3> : null}
          <div className="form-content">{step.content}</div>

          <div className="form-navigation">
            {currentStep > 0 && !step.isDecisionStep && (
              <button className="prev" onClick={prev}>
                Wstecz
              </button>
            )}
            <div className="spacer" />
            {step.isDecisionStep ? (
              <>
                <button
                  className="prev"
                  onClick={() => {
                    handleSubmitProperty();
                    setCurrentStep(1); // pomijamy step 0 (intro)
                  }}
                >
                  Dodaj nieruchomość
                </button>
                <div className="spacer" />
                <button className="next" onClick={handleSendAndShowSummary}>
                  Dalej
                </button>
              </>
            ) : (
              <button
                className={`next ${!isCurrentStepValid() ? "disabled" : ""}`}
                onClick={next}
                disabled={!isCurrentStepValid()}
              >
                Dalej
              </button>
            )}
          </div>
        </div> // zamknięcie inspection-form-slide
      )}
      {showList && (
        <div className="summary-section">
          <h3>Dodane nieruchomości:</h3>
          <ul className="property-list">
            {submittedProperties.map((property, index) => (
              <li key={index} className="property-item">
                <strong>{property.propertyType}</strong> –{" "}
                {property.propertyAddress}, {property.nearestCity}
                <br />
                <small>
                  Zakres:{" "}
                  {Object.entries(property.inspections)
                    .filter(([_, checked]) => checked)
                    .map(([key]) => {
                      switch (key) {
                        case "gas":
                          return "gaz";
                        case "construction":
                          return "budowlany";
                        case "electrical":
                          return "elektryczny";
                        case "chimney":
                          return "wentylacja";
                        case "energy":
                          return "energetyczny";
                        default:
                          return key;
                      }
                    })
                    .join(", ") || "brak"}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSummary && (
        <>
          <div className="summary-section">
            <h3>Dodane nieruchomości:</h3>
            <ul className="property-list">
              {submittedProperties.map((property, index) => (
                <li key={index} className="property-item">
                  <strong>{property.propertyType}</strong> –{" "}
                  {property.propertyAddress}, {property.nearestCity}
                  <br />
                  <small>
                    Zakres:{" "}
                    {Object.entries(property.inspections)
                      .filter(([_, checked]) => checked)
                      .map(([key]) => {
                        switch (key) {
                          case "gas":
                            return "gaz";
                          case "construction":
                            return "budowlany";
                          case "electrical":
                            return "elektryczny";
                          case "chimney":
                            return "wentylacja";
                          case "energy":
                            return "energetyczny";
                          default:
                            return key;
                        }
                      })
                      .join(", ") || "brak"}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          <div className="consents">
            <label>
              <input
                type="checkbox"
                checked={formData.selectAll}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    selectAll: checked,
                    remindMe: checked,
                    acceptPrivacy: checked,
                    acceptTerms: checked,
                  }));
                }}
              />{" "}
              Zaznacz wszystkie
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.remindMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    remindMe: e.target.checked,
                  }))
                }
              />{" "}
              Przypomnij mi o dacie kolejnego przeglądu
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.acceptPrivacy}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptPrivacy: e.target.checked,
                  }))
                }
              />{" "}
              Zgadzam się na przekazanie danych zgodnie z{" "}
              <a
                href="/polityka-prywatnosci"
                target="_blank"
                rel="noopener noreferrer"
              >
                polityką prywatności
              </a>{" "}
              (wymagane)
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptTerms: e.target.checked,
                  }))
                }
              />{" "}
              Akceptuję{" "}
              <a href="/regulamin" target="_blank" rel="noopener noreferrer">
                regulamin
              </a>{" "}
              serwisu (wymagane)
            </label>

            <div className="contactData">
              <h4>Pozostaw swoje dane do dalszego kontaktu</h4>
              <div className="contactData-name">
                <label>
                  <input
                    type="name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Twoje imię(opcjonalnie)"
                  />
                </label>
              </div>
              <div className="contactData-phone">
                <label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Numer telefonu (opcjonalnie)"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-navigation">
            <button className="next" onClick={handleFinalSubmit}>
              Wyślij zapytanie do Wykonawcy
            </button>
          </div>
        </>
      )}
      {popupMessage && (
        <PopupModal
          message={popupMessage}
          onClose={() => {
            setPopupMessage(null);
            if (currentUser) {
              window.location.href = "/";
            } else {
              window.location.href = "/login";
            }
          }}
        />
      )}
    </div>
  );
};

export default InspectionFormSlide;
