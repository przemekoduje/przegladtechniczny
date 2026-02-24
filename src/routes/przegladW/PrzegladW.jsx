import React, { useEffect, useState } from "react";
import "./przegladW.scss";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "../../components/menu/Menu.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PrzegladW = ({ user, isPanelOpen, setIsPanelOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    setTimeout(() => {
      navigate("/", { state: { scrollTo: id } });
    }, 300);
  };

  useEffect(() => {
    if (user) {
      setUserPhoto(user.photoURL || "images/user-50.png");
    } else {
      setUserPhoto("images/user-50.png");
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Przegląd Wentylacyjny Gliwice & Śląsk | Drożność Kominów</title>
        <meta name="description" content="Profesjonalne przeglądy instalacji wentylacyjnej i kominowej w Gliwicach. Zadbaj o zdrowie i prawidłową cyrkulację powietrza w swoim domu. Śląskie uprawnienia i rzetelność." />
        <link rel="canonical" href="https://przeglady-domu.online/przeglad-wentylacyjny" />
      </Helmet>
      <section className="przeglad-wentylacyjny">
        <div className="container_info">
          <h1>Przegląd instalacji wentylacyjnej</h1>

          <div className="textsAndButton">
            <div className="left">
              <p className="description">
                Sprawna wentylacja to nie tylko komfort, ale przede wszystkim
                zdrowie domowników. Zgodnie z przepisami należy wykonywać
                regularne przeglądy instalacji wentylacyjnej – zadbaj o to z
                naszą pomocą.
              </p>

              <button className="main_button"
                onClick={() => scrollToSection("inspection-form")}>
                <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
                <div className="btn-icon">
                  <img src={userPhoto} alt="Profil" />
                </div>
              </button>
            </div>
            <div className="right">
              <div className="steps">
                <p>Cały proces w kilku prostych krokach:</p>
                <ul>
                  <li>
                    Wypełnij prosty formularz i wyślij zapytanie bezpośrednio do
                    naszych specjalistów. Masz wątpliwości lub pytania? Nasza
                    asystentka chętnie pomoże.
                  </li>
                  <li>
                    Najczęściej otrzymasz odpowiedź już w ciągu kilku godzin.
                  </li>
                  <li>
                    Wybierz dogodną ofertę i wspólnie ustalcie termin wykonania
                    przeglądu.
                  </li>
                  <li>
                    Po wykonaniu usługi otrzymasz protokół, na podstawie którego
                    łatwo rozliczysz się z wykonawcą.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container_faq">
          <div className="faq faq_one">
            <p>Czym dokładnie jest przegląd techniczny nieruchomości?</p>
            <span>
              Przegląd techniczny nieruchomości to obowiązkowa kontrola stanu
              technicznego budynku, obejmująca jego konstrukcję, instalacje
              (gazową, elektryczną) oraz elementy narażone na działanie
              czynników atmosferycznych i instalacje kominowe. Celem przeglądu
              jest zapewnienie bezpieczeństwa użytkowników budynku oraz zgodność
              obiektu z wymogami prawa budowlanego.
            </span>
            <button className="main_button"
              onClick={() => scrollToSection("inspection-form")}>
              <span>ZAMÓW BEZPŁATNĄ WYCENĘ</span>
              <div className="btn-icon">
                <img src={userPhoto} alt="Profil" />
              </div>
            </button>
          </div>
          <div className="faq faq_two">
            <p>
              Jakie przeglądy techniczne nieruchomości należy przeprowadzać i
              jak często?
            </p>
            <span>
              Roczne przeglądy: Obejmują elementy budynku narażone na wpływy
              atmosferyczne (np. dach, rynny), instalacje ochrony środowiska
              oraz instalacje kominowe – dymowe, spalinowe i wentylacyjne.
              Przegląd kominiarski jest wymagany co najmniej raz w roku i ma na
              celu sprawdzenie drożności oraz bezpieczeństwa przewodów
              kominowych, co minimalizuje ryzyko pożaru i zapewnia odpowiednią
              wentylację. Pięcioletnie przeglądy: Przeprowadzane co pięć lat,
              obejmują kompleksową ocenę stanu technicznego i przydatności
              budynku do użytkowania. Przegląd pięcioletni obejmuje również
              instalacje elektryczne i piorunochronne, sprawdzenie estetyki
              budynku oraz ocenę innych kluczowych elementów konstrukcji.
            </span>
          </div>
          <div className="faq faq_three">
            <p>
              Czy brak przeglądów technicznych może mieć wpływ na wypłatę
              odszkodowania z polisy ubezpieczeniowej?
            </p>
            <span>
              Tak, zdecydowanie. W przypadku szkody, wielu ubezpieczycieli może
              odmówić wypłaty odszkodowania, jeśli nieruchomość nie miała
              przeprowadzonych wymaganych przeglądów technicznych, takich jak
              przegląd instalacji elektrycznej, gazowej czy ogólny przegląd
              budynku. Brak tych przeglądów może być traktowany jako zaniedbanie
              obowiązków właściciela lub zarządcy budynku, co z kolei daje
              ubezpieczycielowi podstawy do ograniczenia lub całkowitego
              odmówienia wypłaty odszkodowania.
            </span>
          </div>
        </div>
        <div className="container_warning">
          <h2>DLACZEGO NIE WARTO RYZYKOWAĆ?</h2>
          <p>
            Czy masz świadomość, że brak aktualnych przeglądów technicznych może
            spowodować problemy przy uzyskaniu odszkodowania od ubezpieczyciela?
            Towarystwa ubezpieczeniowe często stosują zapis w Ogólnych Warunkach
            Ubezpieczenia, zgodnie z którym właściciel nieruchomości ma
            obowiązek użytkować budynek oraz jego instalacje w sposób zgodny z
            wymaganiami określonymi w Prawie budowlanym. Regularne przeglądy
            techniczne to Twoje zabezpieczenie na wypadek szkody i gwarancja
            pełnej ochrony ubezpieczeniowej.
          </p>
        </div>
        <div className="container_blog">
          <div className="blog blog_one">
            <div className="blog_left">
              <img src="/images/blog01.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>Na czym polega przegląd budowlany?</h3>
              <p>
                Regularny przegląd budowlany to gwarancja bezpieczeństwa i
                długowieczności Twojej nieruchomości. Dowiedz się, jak przebiega
                taka kontrola i dlaczego warto ją przeprowadzać zgodnie z
                obowiązującymi przepisami.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
          <div className="blog blog_two">
            <div className="blog_left">
              <img src="/images/blog02.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Przepisy dotyczące modernizacji instalacji gazowej w Polsce
              </h3>
              <p>
                Prawo budowlane pozostawia duże pole do indywidualnej
                interpretacji, szczególnie jeśli chodzi o instalacje budowlane.
                Wprowadzono rozróżnienie na remont, przebudowę i instalację
                nową, co oznacza, że każdy rodzaj pracy może podlegać innym
                wymaganiom formalnym i technicznym.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>

          <div className="blog blog_three">
            <div className="blog_left">
              <img src="/images/went4.png" alt="" />
            </div>
            <div className="blog_right">
              <h3>
                Zmiany w przepisach prawa dotyczących montażu nawiewników
                okiennych, szczególnie w kuchniach z kuchenką gazową
              </h3>
              <p>
                Montaż nawiewników okiennych stał się kluczowym elementem
                przepisów dotyczących prawidłowej wentylacji budynków
                mieszkalnych. Jest to szczególnie istotne w kuchniach
                wyposażonych w urządzenia gazowe, gdzie odpowiedni dopływ
                świeżego powietrza warunkuje prawidłowe i bezpieczne spalanie
                gazu.
              </p>
              <button className="blog_button">Przeczytaj całość</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrzegladW;
