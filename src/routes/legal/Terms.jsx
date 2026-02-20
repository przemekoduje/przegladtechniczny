// src/routes/legal/Terms.jsx
import React from "react";
import "./legal.scss";

const Terms = () => {
  return (
    <div className="legal-page">
      <h1>Regulamin Serwisu</h1>

      <h2>1. Postanowienia ogólne</h2>
      <p>
        Korzystanie z serwisu przeglady-domu.online oznacza akceptację
        niniejszego regulaminu.
      </p>
      <p>
        Niniejszy Regulamin określa zasady korzystania z serwisu
        przeglady-domu.online, w tym składania zapytań dotyczących przeglądów
        technicznych nieruchomości. Właścicielem i administratorem serwisu jest:
        Przemysław Rakotny, e-mail: przemek.rakotny@gmail.com
      </p>

      <h2>2. Zakres usług</h2>
      <ol>
        <li>
          Serwis umożliwia użytkownikom: złożenie zapytania o wycenę przeglądów
          technicznych (m.in. budowlanych, gazowych, elektrycznych,
          wentylacyjnych), przekazanie zapytania do odpowiednich wykonawców,
          otrzymanie ofert od specjalistów i kontakt z nimi, dostęp do
          materiałów informacyjnych (np. blog, przewodnik).{" "}
        </li>
        <li>
          Serwis nie jest wykonawcą przeglądów – pośredniczy w kontakcie między
          użytkownikiem a specjalistą.
        </li>
      </ol>

      <h2>3. Warunki korzystania</h2>
      <ol>
        <li>Złożenie zapytania odbywa się poprzez wypełnienie formularza.</li>
        <li>
          Użytkownik zobowiązany jest do podania prawdziwych i kompletnych
          danych.
        </li>
        <li>
          Podanie danych kontaktowych oznacza zgodę na przekazanie ich wybranym
          wykonawcom, w celu przygotowania oferty.
        </li>
        <li>
          Formularz może być złożony bez rejestracji, jednak dostęp do panelu
          użytkownika możliwy jest tylko po zalogowaniu.
        </li>
      </ol>

      <h2>4. Odpowiedzialność</h2>
      <ol>
        <li>Administrator nie ponosi odpowiedzialności za działania wykonawców,
        którzy realizują przeglądy techniczne. </li>
        <li>Administrator dokłada wszelkich
        starań, by współpracować wyłącznie ze sprawdzonymi i kompetentnymi
        specjalistami. </li>
        <li>Użytkownik zobowiązany jest do samodzielnego wyboru
        oferty i zawarcia umowy bezpośrednio z wykonawcą. </li>
        <li>Administrator nie
        bierze udziału w rozliczeniach między użytkownikiem a wykonawcą.</li>
      </ol>

      <h2>5. Dane osobowe</h2>
      <p>
        Dane przetwarzane są zgodnie z{" "}
        <a href="/polityka-prywatnosci">Polityką Prywatności</a>.
      </p>

      <h2>6. Zmiany Regulaminu</h2>
      <p>
        Administrator zastrzega sobie prawo do zmian w regulaminie. Aktualna
        wersja jest publikowana na stronie.
      </p>
    </div>
  );
};

export default Terms;
