import React from "react";
import "./explanations.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Explanations() {
  return (
    <div className="explanations">
      <h1>Na co komu ten cały kłopot?</h1>
      
      <span className="exp1">
        No właśnie, po co się fatygować z tymi wszystkimi przeglądami
        technicznymi? Przecież budynek stoi, prąd jest, gaz płynie, a rachunki –
        no cóż, same się nie zapłacą. Ale, żeby nie było tak łatwo, przepisy
        wymagają, żeby o budynek jednak zadbać. A oto dlaczego:
      </span>
      <span className="exp2">
        <span style={{ fontWeight: "bold" }}>
          Odbiór techniczny nieruchomości – weź fachowca, zanim podpiszesz!
        </span>{" "}
        Kupujesz dom lub mieszkanie? Zanim złożysz podpis, warto sprawdzić, co
        naprawdę kupujesz. Krzywe ściany, nieszczelne okna, błędy wykonawcze –
        to wszystko może wyjść dopiero po odbiorze. Z nami zrobisz go
        profesjonalnie, z protokołem i konkretnymi wskazówkami. To Twoja szansa,
        by uniknąć problemów lub... wynegocjować lepszą cenę. Nie kupuj kota
        w worku – my wiemy, gdzie zajrzeć.
      </span>
      <span className="exp3">
        <span style={{ fontWeight: "bold" }}>
          Przegląd budowlany nieruchomości – co roku i co pięć lat.
        </span>{" "}
        <br /> Zgodnie z Prawem budowlanym właściciele i zarządcy muszą co roku
        sprawdzić, czy dach nie przecieka, rynny nie odpadają, a elewacja nadal
        ma się dobrze. Ale to jeszcze nic – co pięć lat dochodzi pełna inspekcja
        budynku, od fundamentów po przewody piorunochronne. Taka kontrola to nie
        tylko spokój ducha, ale też oszczędność – lepiej wykryć problem
        wcześniej niż czekać, aż narobi poważnych szkód!
      </span>
      <span className="exp4">
        <span style={{ fontWeight: "bold" }}>
          Przegląd instalacji gazowej – na wszelki wypadek.
        </span>{" "}
        <br /> Z gazem nie ma żartów. Prawo nakazuje coroczny przegląd
        instalacji gazowej i przewodów kominowych. Brzmi jak formalność? A
        jednak – ten jeden raz może uratować budynek (i Twój portfel) przed
        wyciekiem gazu czy nagłym odcięciem dostaw. Bezpieczeństwo i spokój są
        bezcenne.
      </span>
      <span className="exp5">
        <span style={{ fontWeight: "bold" }}>
          Przegląd instalacji elektrycznej – raz na pięć lat.
        </span>{" "}
        <br /> Instalacja elektryczna też wymaga miłości, a przynajmniej raz na
        pięć lat. Sprawdzamy wtedy, czy kable są na miejscu, zabezpieczenia
        trzymają, a gniazdka nie chcą wysłać nas na elektryczną wycieczkę.
        Bezpieczny prąd to szczęśliwy prąd – i szczęśliwy właściciel
        nieruchomości.
      </span>

      {/* <img src="/images/exp2.png" alt="" /> */}
      <span className="exp6">
        <span style={{ fontWeight: "bold" }}>
          Świadectwo charakterystyki energetycznej – nowość, która się przyda.{" "}
        </span>{" "}
        <br /> Od niedawna, przy sprzedaży lub wynajmie budynku, trzeba mieć
        świadectwo energetyczne. To taki dokument, który zdradza, ile energii
        pożera Twoja nieruchomość. Dzięki niemu wiesz, na co się szykować przy
        rachunkach – a i wartość budynku z porządnym świadectwem może skoczyć w
        górę.
      </span>
      <span className="exp7">
        W skrócie? Te wszystkie przeglądy i świadectwa to inwestycja w
        bezpieczeństwo i spokój. Z nami nie musisz o nich pamiętać –
        przypomnimy, załatwimy i sprawimy, że nie będą żadnym „kłopotem” – tylko
        korzyścią!
      </span>

      <div className="exp-footer">
        <div className="display2">
          <h2>
            Przegląd na czas, <br /> spokój na zawsze...
          </h2>
        </div>
        <div className="zatem">
          <span>zatem</span>
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
}
