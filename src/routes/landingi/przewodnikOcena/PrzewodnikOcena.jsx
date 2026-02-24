import React, { useEffect, useState } from "react";
import "./przewodnikOcena.scss";
import { Parallax } from "react-parallax";
import "intersection-observer";
import MainText from "./MainText/MainText";
import Menu from "../../../components/menu/Menu.jsx";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


export default function PrzewodnikOcena() {
  const [visibleTextIndexes, setVisibleTextIndexes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleTextIndexes((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.4 } // Wyzwalaj, gdy 20% elementu jest widoczne
    );

    const elements = document.querySelectorAll(".text-item");
    if (elements.length > 0) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect(); // Sprzątanie po odmontowaniu
  }, [visibleTextIndexes]);

  //   useEffect(() => {
  //     const updateScale = () => {
  //       const bgImage = document.querySelector(".react-parallax-bgimage");
  //       if (bgImage) {
  //         const currentTransform = bgImage.style.transform || "";
  //         if (!currentTransform.includes("scale")) {
  //           bgImage.style.transform = `${currentTransform} scale(1)`.trim();

  //         }
  //       }
  //     };

  //     // Wywołaj na początku
  //     updateScale();

  //     // Ustaw nasłuchiwanie, aby w razie potrzeby aktualizować
  //     const observer = new MutationObserver(updateScale);
  //     const bgImage = document.querySelector(".react-parallax-bgimage");
  //     if (bgImage) {
  //       observer.observe(bgImage, {
  //         attributes: true,
  //         attributeFilter: ["style"],
  //       });
  //     }

  //     return () => observer.disconnect();
  //   }, []);

  const handleButtonClick = () => {
    window.location.href = "/#inspection-form";
  };

  const sectionsData = [
    {
      id: 1,
      bgColor: "#E8E2C5",
      bgImage: "/images/pdfs/background03_scale2.png",
      pgnr: "1",
      szyld: (
        <>
          Elewacja <br />
          <span className="szyld-bold">& fundamenty</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Pęknięcia w ścianach lub fundamentach.",
            "Odpadający tynk, zacieki, wykwity solne na powierzchni ścian.",
            "Oznaki wilgoci w dolnej części budynku.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Zwróć uwagę na wielkość i kierunek pęknięć. Pęknięcia pionowe mogą być mniej groźne niż ukośne, które mogą wskazywać na osiadanie fundamentów.",
            "Sprawdź, czy woda opadowa jest skutecznie odprowadzana, np. przez rynny i drenaż.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Jeśli zauważysz poważne pęknięcia lub wilgoć, skontaktuj się z ekspertem budowlanym.",
          ],
        },
      ],
      ciekawostka:
        "Czy wiesz, że największe szkody fundamentów powoduje zamarzająca woda? Regularne sprawdzanie drenażu może zapobiec problemom.",
    },
    {
      id: 2,
      bgColor: "#F2E8CE",
      bgImage: "/images/pdfs/background04_scale.png",
      pgnr: "2",
      szyld: "Dach",
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Uszkodzone, brakujące lub przesunięte dachówki.",
            "Zacieki na poddaszu, szczególnie po intensywnych opadach.",
            "Korozja na elementach metalowych (np. rynnach, okuciach).",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Dokładnie obejrzyj dach z zewnątrz za pomocą lornetki lub drona.",
            "Sprawdź stan pokrycia dachowego i szczelność połączeń wokół kominów i okien dachowych.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Uszkodzone elementy powinny zostać jak najszybciej naprawione, aby zapobiec przeciekom.",
          ],
        },
      ],
      ciekawostka:
        "Tradycyjne dachówki ceramiczne mogą wytrzymać nawet 100 lat, pod warunkiem regularnej konserwacji.",
    },
    {
      id: 3,
      bgColor: "#E8F0F2",
      bgImage: "/images/pdfs/background05_scale.png",
      pgnr: "3",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">gazowe</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Nieszczelności (można wyczuć zapach gazu).",
            "Korozja rur lub uszkodzone połączenia.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Jeśli wyczujesz zapach gazu, natychmiast wywietrz pomieszczenie i zamknij zawór gazu.",
            "Sprawdź, czy przewody są odpowiednio zamocowane i nie są uszkodzone.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "W przypadku podejrzenia nieszczelności skontaktuj się z gazownią lub licencjonowanym specjalistą.",
          ],
        },
      ],
      ciekawostka:
        "W niektórych krajach dodaje się do gazu zapachowy związek chemiczny, aby nieszczelności były łatwiej wykrywalne przez ludzi.",
    },
    {
      id: 4,
      bgColor: "#F2E8F0",
      bgImage: "/images/pdfs/background06_scale.png",
      pgnr: "4",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">elektryczne</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Przegrzewające się gniazdka i przełączniki.",
            "Widoczne iskrzenie przy włączaniu urządzeń.",
            "Luźne przewody lub uszkodzone izolacje.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Użyj miernika napięcia, aby sprawdzić podstawowe parametry instalacji.",
            "Skontroluj tablicę rozdzielczą i poszukaj śladów korozji lub przepaleń.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wszelkie problemy z instalacją elektryczną powinny zostać natychmiast zbadane przez elektryka.",
          ],
        },
      ],
      ciekawostka:
        "Współczesne instalacje elektryczne wyposażone są w wyłączniki różnicowoprądowe, które automatycznie odcinają prąd w przypadku zagrożenia.",
    },
    {
      id: 5,
      bgColor: "#E8E2F0",
      bgImage: "/images/pdfs/background07_scale.png",
      pgnr: "5",
      szyld: (
        <>
          Okna <br />
          <span className="szyld-bold">& Drzwi</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Uszczelki, które nie przylegają, przeciągi w okolicach okien i drzwi.",
            "Uszkodzone zawiasy lub mechanizmy zamykające.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Zamknij okna i drzwi i sprawdź, czy nie przepuszczają powietrza.",
            "Upewnij się, że mechanizmy działają płynnie i bez oporu.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wymień uszczelki, a w przypadku większych uszkodzeń rozważ wymianę okien lub drzwi.",
          ],
        },
      ],
      ciekawostka:
        "Energooszczędne okna z potrójnymi szybami mogą zmniejszyć straty ciepła nawet o 40% w porównaniu z tradycyjnymi.",
    },
    {
      id: 6,
      bgColor: "#E8F0E2",
      bgImage: "/images/pdfs/background08_scale.png",
      pgnr: "6",
      szyld: (
        <>
          Instalacje <br />
          <span className="szyld-bold">wod - kan</span>
        </>
      ),
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Wycieki pod zlewami lub w łazience.",
            "Spadki ciśnienia w kranach.",
            "Nieszczelności na rurach.",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Otwórz krany i sprawdź siłę strumienia wody.",
            "Poszukaj oznak wilgoci w okolicach rur, szczególnie w piwnicach i podłogach.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wszelkie wycieki powinny zostać jak najszybciej naprawione, aby zapobiec poważniejszym uszkodzeniom.",
          ],
        },
      ],
      ciekawostka:
        "Pierwsze systemy kanalizacyjne powstały ponad 4 tysiące lat temu w starożytnych cywilizacjach Doliny Indusu.",
    },
    {
      id: 7,
      bgColor: "#F0E8E2",
      bgImage: "/images/pdfs/background09_scale.png",
      pgnr: "7",
      szyld: "Wentylacja",
      mainText: [
        { type: "h2", content: "Czego szukać?" },
        {
          type: "ul",
          items: [
            "Niedrożne kratki wentylacyjne.",
            "Nadmiar wilgoci w pomieszczeniach (np. parowanie szyb, pleśń).",
          ],
        },
        { type: "h2", content: "Jak ocenić?" },
        {
          type: "ul",
          items: [
            "Sprawdź, czy kratki wentylacyjne są czyste i czy nie ma przeszkód utrudniających przepływ powietrza.",
            "Zwróć uwagę na zapachy stęchlizny, co może wskazywać na problemy z wentylacją.",
          ],
        },
        { type: "h2", content: "Co zrobić?" },
        {
          type: "ul",
          items: [
            "Wyczyść kratki i zainwestuj w systemy wspomagające wentylację, np. rekuperatory.",
          ],
        },
      ],
      ciekawostka:
        "Dobrze zaprojektowana wentylacja może zmniejszyć koszty ogrzewania nawet o 30%, ponieważ zapobiega utracie ciepła.",
    },
    {
      id: 8,
      bgColor: "#F0E8E2",
      bgImage: "/images/pdfs/background10_scale.png",
      pgnr: "",
      szyld: "",
      mainText: [],
      layout: "cta", // Nowy typ układu
      cta: {
        headline: "Czujesz jednak, że to zadanie zbyt skomplikowane?",
        buttonText: "Skontaktuj się z nami",
        phoneNumber:
          " <span span style='font-size: 16px; font-weight: 200;'>lub </span> <br/> <br/> +48 690 029 414",
        info: "Pamiętaj, że przeglądy gazowe i wentylacji są obowiązkowe co rok, a elektryczne – co pięć lat. Co więcej, firmy ubezpieczeniowe mogą zażądać aktualnych przeglądów budowlanych, zanim wypłacą odszkodowanie.",
      },
    },
  ];

  return (
    <div className="przewodnikOcena">
      <div className="close_przewodnik" onClick={() => navigate("/")}>
        <CloseIcon />
      </div>

      {/* Sekcja okładki */}

      <div className="okladka">
        <div className="rect-back01"></div>
        <div className="okladka-background">
          <img
            src="/images/pdfs/background02crop.png"
            alt=""
            className="fullscreen-image"
          />
        </div>
        <div className="okladka-text">
          <p>
            Oto prosty{" "}
            <span className="okladka-text-bold">
              przewodnik do samodzielnej oceny stanu technicznego budynku
            </span>
            , który pomoże Ci zidentyfikować potencjalne problemy i podjąć
            odpowiednie kroki zanim wezwiesz specjalistę.
          </p>
        </div>
      </div>

      {/* Sekcja z paralaksą */}
      {sectionsData.map((section) => {
        if (section.layout === "cta") {
          // Specjalne renderowanie dla ostatniej sekcji
          return (
            <Parallax
              key={section.id}
              bgImage={section.bgImage}
              strength={400}
              bgImageStyle={{
                objectFit: "cover",
                objectPosition: "right center",
                height: "100%",
                width: "100%",
                transform: "scale(0.7)",
              }}
            >
              <div
                className="cta-section"
              // style={{ backgroundColor: section.bgColor || "transparent" }}
              >
                <div className="cta-content">
                  <h1 className="headline">{section.cta?.headline}</h1>
                  <button className="main_button_2" onClick={handleButtonClick}>
                    {section.cta?.buttonText}
                  </button>
                  <div
                    className="cta-phone"
                    dangerouslySetInnerHTML={{
                      __html: section.cta?.phoneNumber,
                    }}
                  ></div>

                  <p className="cta-info">{section.cta?.info}</p>
                </div>
              </div>
            </Parallax>
          );
        }

        // Domyślne renderowanie dla powtarzalnej sekcji
        return (
          <>
            <Parallax
              key={section.id}
              bgImage={section.bgImage}
              strength={400}
              bgImageStyle={
                {
                  //   objectFit: "cover",
                  //   height: "100%",
                  //   width: "100%",
                }
              }
            >
              <div className="parallax-section">
                <div className="parallax-content">
                  <div className="page-number">{section.pgnr}</div>
                  <div className="szyld">{section.szyld}</div>

                  <MainText content={section.mainText} />
                </div>
              </div>
            </Parallax>
          </>
        );
      })}
    </div>
  );
}
