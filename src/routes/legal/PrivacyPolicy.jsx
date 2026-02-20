// src/routes/legal/PrivacyPolicy.jsx
import React from "react";
import "./legal.scss";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <h1>Polityka Prywatności</h1>

      <p>
        Niniejsza polityka prywatności określa zasady przetwarzania danych
        osobowych użytkowników serwisu przegladtechniczny.eu.
      </p>

      <h2>1. Administrator danych</h2>
      <p>
        Administratorem danych jest Przemysław Rakotny. Kontakt:
        przemek.rakotny@gmail.com.
      </p>
      <p>
        Administrator przetwarza dane zgodnie z obowiązującymi przepisami prawa,
        w szczególności z Rozporządzeniem Parlamentu Europejskiego i Rady (UE)
        2016/679 (RODO).
      </p>

      <h2>2. Zakres zbieranych danych</h2>
      <p>
        W ramach działania serwisu mogą być zbierane następujące dane
        użytkownika: imię i nazwisko (opcjonalnie), adres e-mail, numer telefonu
        (opcjonalnie), informacje o nieruchomości (adres, typ budynku, dane
        techniczne), dane techniczne przesyłane automatycznie: adres IP,
        informacje o przeglądarce, systemie operacyjnym.
      </p>

      <h2>3. Cel przetwarzania danych</h2>
      <p>
        Dane są przetwarzane w celu:
        <ul>
          <li>realizacji zapytania ofertowego,</li>
          <li>kontaktu z wykonawcami,</li>
          <li>prowadzenia komunikacji marketingowej (jeśli wyrażono zgodę).</li>
          <li>cele analityczne i statystyczne, bezpieczeństwo serwisu.</li>
        </ul>
      </p>
      <p>
        Podstawą prawną przetwarzania danych jest art. 6 ust. 1 lit. b, c oraz f
        RODO.
      </p>

      <h2>4. Odbiorcy danych</h2>
      <p>Dane osobowe mogą być udostępniane: </p>
      <ul>
        <li>
          współpracującym wykonawcom przeglądów technicznych, jeśli użytkownik
          wyraził taką wolę,
        </li>
        <li>
          podmiotom świadczącym usługi hostingowe i obsługujące systemy IT (np.
          Google Firebase),
        </li>
        <li>
          upoważnionym organom publicznym – wyłącznie w przypadkach
          przewidzianych przepisami prawa.
        </li>
      </ul>

      <h2>5. Prawa użytkownika</h2>
      <p>
        Użytkownik ma prawo do: dostępu do swoich danych osobowych, ich
        sprostowania, żądania usunięcia („prawo do bycia zapomnianym”),
        ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania,
        przenoszenia danych, wniesienia skargi do Prezesa Urzędu Ochrony Danych
        Osobowych (PUODO).
      </p>

      <h2>6. Pliki cookies</h2>
      <p>
        Serwis wykorzystuje pliki cookies w celu: zapewnienia prawidłowego
        działania formularza, analityki (np. Google Analytics), zapamiętywania
        sesji użytkownika. Użytkownik może zarządzać plikami cookies w
        ustawieniach przeglądarki.
      </p>

      <h2>7. Kontakt</h2>
      <p>
        W sprawach związanych z danymi osobowymi prosimy pisać na:
        przemek.rakotny@gmail.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
