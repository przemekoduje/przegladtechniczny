// --- IMPORT IKON 3D (Premium) ---
import iconB2B from '../assets/roczny-scope-card-icon.png';
import iconHouse from '../assets/5-scope-card-icon.png';
import iconGas from '../assets/instal-scope-card-icon.png';
import iconEngineer from '../assets/doradztwo-scope-card-icon.png';
import iconEnergy from '../assets/energ-scope-card-icon.png';

import iconMining from "../assets/mining-risk-icon.png";
import iconOldBuilding from "../assets/old-building-risk-icon.png";
import iconMoisture from "../assets/moisture-risk-icon.png";
import iconModernBuilding from "../assets/modern-building-risk-icon.png";
import iconIndustrial from "../assets/industrial-risk-icon.png";
import iconSurvey from "../assets/survey-risk-icon.png";

export const citiesData = [
  // --- CZĘŚĆ CENTRALNA I ZACHODNIA ---

  {
    name: "Katowice",
    lat: 50.264,
    lng: 19.023,
    slug: "katowice",
    seoTitle: "Przeglądy Budowlane Katowice | Ekspertyzy i Odbiory Mieszkań",
    seoDescription: "Inżynier budownictwa w Katowicach. Wykonuję przeglądy 5-letnie, opinie techniczne oraz odbiory deweloperskie w Śródmieściu, Ligocie i na nowych osiedlach.",
    localDescription: "Katowice to miasto kontrastów – od zabytkowych kamienic i modernistycznej architektury po nowoczesne wieżowce. Jako inżynierowie zwracamy tu szczególną uwagę na szkody górnicze w południowych dzielnicach oraz stan techniczny wielkiej płyty.",
    risks: [
      {
        icon: iconMining,
        title: "Szkody Górnicze",
        description: "Dzielnice takie jak Murcki, Kostuchna czy Panewniki wciąż narażone są na osiadanie gruntu i wstrząsy."
      },
      {
        icon: iconOldBuilding,
        title: "Modernizm i Tarasy",
        description: "Katowicka moderna to piękne budynki, ale często borykające się z problemami szczelności płaskich dachów i tarasów."
      },
      {
        icon: iconEnergy,
        title: "Termomodernizacja",
        description: "Weryfikujemy jakość dociepleń w budynkach z wielkiej płyty (Osiedle Tysiąclecia, Paderewskiego)."
      }
    ]
  },

  {
    name: "Gliwice",
    lat: 50.294,
    lng: 18.6657,
    slug: "gliwice",
    seoTitle: "Przeglądy Budowlane Gliwice - 5-letnie i Roczne | Inżynier Budownictwa",
    seoDescription: "Szukasz inżyniera w Gliwicach? Wykonuję okresowe przeglądy budowlane, odbiory mieszkań i audyty energetyczne na terenie Gliwic i powiatu.",
    localDescription: "Gliwice to poligon budowlany o dwóch twarzach. Z jednej strony historyczne Zatorze i Śródmieście z wymagającymi drewnianymi stropami. Z drugiej – dynamiczne nowe osiedla, gdzie pośpiech deweloperów często odbija się na izolacji.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Poniemieckie Kamienice",
        description: "Specjalizujemy się w ocenie drewnianych stropów i zawilgoconych piwnic w budynkach z cegły."
      },
      {
        icon: iconMining,
        title: "Tereny Górnicze",
        description: "Mimo zamknięcia kopalń, dzielnice jak Sośnica czy Łabędy wciąż wymagają weryfikacji wychyleń budynku."
      },
      {
        icon: iconMoisture,
        title: "Grunty Gliniaste",
        description: "Specyfika gruntu w Gliwicach wymaga sprawnego drenażu opaskowego. Weryfikujemy jego drożność."
      }
    ]
  },

  {
    name: "Zabrze",
    lat: 50.3086,
    lng: 18.787,
    slug: "zabrze",
    seoTitle: "Przegląd Budowlany Zabrze | Szkody Górnicze i Odbiory",
    seoDescription: "Kompleksowe przeglądy budynków w Zabrzu. Specjalizacja w obiektach na terenach górniczych oraz starych familokach. Szybkie terminy.",
    localDescription: "Zabrze to miasto o wyjątkowej, ale trudnej strukturze geologicznej. Intensywna eksploatacja górnicza w przeszłości wymusiła stosowanie zabezpieczeń (kotwienie), których stan techniczny jest kluczowy dla bezpieczeństwa.",
    risks: [
      {
        icon: iconMining,
        title: "Kategoria Terenu",
        description: "Weryfikujemy zabezpieczenia budynków na terenach III i IV kategorii szkód górniczych (np. Makoszowy, Kończyce)."
      },
      {
        icon: iconSurvey,
        title: "Pęknięcia Ścian",
        description: "Analizujemy czy rysy na elewacji są stabilne, czy wynikają z aktywnej pracy górotworu."
      },
      {
        icon: iconOldBuilding,
        title: "Familoki",
        description: "Przeglądy techniczne historycznych osiedli robotniczych – stan więźby dachowej i instalacji."
      }
    ]
  },

  {
    name: "Bytom",
    lat: 50.347,
    lng: 18.9232,
    slug: "bytom",
    seoTitle: "Przeglądy Techniczne Bytom | Ekspertyzy Budowlane",
    seoDescription: "Rzetelne przeglądy okresowe w Bytomiu. Sprawdzamy stan techniczny kamienic i budynków narażonych na osiadanie terenu.",
    localDescription: "Bytom posiada piękną architekturę secesyjną, która niestety mocno ucierpiała przez szkody górnicze. Nasze przeglądy w Bytomiu skupiają się na statyce budynków i szczelności instalacji gazowych.",
    risks: [
      {
        icon: iconMining,
        title: "Osiadanie Terenu",
        description: "Szczegółowa kontrola pionowości ścian i poziomów stropów w dzielnicach takich jak Karb czy Bobrek."
      },
      {
        icon: iconMoisture,
        title: "Wilgoć Kapilarna",
        description: "Problem podciągania wilgoci w starych murach ceglanych bez izolacji poziomej."
      },
      {
        icon: iconOldBuilding,
        title: "Stan Elewacji",
        description: "Kontrola gzymsów i balkonów zagrażających przechodniom w ścisłym centrum."
      }
    ]
  },

  {
    name: "Ruda Śląska",
    lat: 50.2858,
    lng: 18.8748,
    slug: "ruda-slaska",
    seoTitle: "Przeglądy Budowlane Ruda Śląska | Inżynier z Uprawnieniami",
    seoDescription: "Przeglądy roczne i 5-letnie w Rudzie Śląskiej. Obsługa wspólnot mieszkaniowych i domów jednorodzinnych. Halemba, Wirek, Bielszowice.",
    localDescription: "Ruda Śląska to aglomeracja wielu dzielnic o zróżnicowanym charakterze. Od szkód górniczych w Halembie po starą zabudowę Wirku. Skupiamy się tu na fundamentach i dylatacjach.",
    risks: [
      {
        icon: iconMining,
        title: "Wstrząsy Górnicze",
        description: "Regularne monitorowanie wpływu wstrząsów na konstrukcję nośną budynków."
      },
      {
        icon: iconIndustrial,
        title: "Instalacje",
        description: "Weryfikacja szczelności instalacji w budynkach narażonych na ruchy górotworu."
      },
      {
        icon: iconOldBuilding,
        title: "Domy Jednorodzinne",
        description: "Odbiory techniczne nowych domów w dynamicznie rozwijających się częściach miasta."
      }
    ]
  },

  {
    name: "Chorzów",
    lat: 50.297,
    lng: 18.954,
    slug: "chorzow",
    seoTitle: "Przegląd Budynku Chorzów | Kontrole Okresowe KOB",
    seoDescription: "Prowadzenie Książki Obiektu Budowlanego w Chorzowie. Przeglądy instalacji i konstrukcji. Skontaktuj się z inżynierem.",
    localDescription: "Chorzów łączy starą tkankę miejską z terenami parkowymi. Głównym wyzwaniem inżynierskim jest tu wiek budynków oraz adaptacja starych konstrukcji do nowych norm energetycznych.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Stropy Kleina",
        description: "Ocena stanu technicznego stalowo-ceramicznych stropów w kamienicach z przełomu wieków."
      },
      {
        icon: iconMoisture,
        title: "Kanalizacja",
        description: "Inspekcja starych przyłączy kanalizacyjnych i deszczowych."
      },
      {
        icon: iconEnergy,
        title: "Audyty Energetyczne",
        description: "Przygotowanie dokumentacji dla programu Czyste Powietrze dla starszych domów."
      }
    ]
  },

  {
    name: "Świętochłowice",
    lat: 50.2906,
    lng: 18.9195,
    slug: "swietochlowice",
    seoTitle: "Przeglądy Budowlane Świętochłowice",
    seoDescription: "Inżynier budownictwa Świętochłowice. Przeglądy, opinie techniczne, odbiory.",
    localDescription: "Świętochłowice to miasto o gęstej zabudowie historycznej. Skupiamy się tutaj na ocenie stanu technicznego murów oraz bezpieczeństwie pożarowym (kominy, instalacje).",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Stara Zabudowa",
        description: "Weryfikacja stanu technicznego lipin i chropaczowskich familoków."
      },
      {
        icon: iconIndustrial,
        title: "Kominy",
        description: "Kontrola przewodów kominowych i wentylacyjnych w starszych budynkach."
      },
      {
        icon: iconMoisture,
        title: "Piwnice",
        description: "Ocena zawilgocenia przyziemia i izolacji fundamentów."
      }
    ]
  },

  {
    name: "Siemianowice Śl.",
    lat: 50.308,
    lng: 19.03,
    slug: "siemianowice-slaskie",
    seoTitle: "Inżynier Budowlany Siemianowice Śląskie",
    seoDescription: "Przeglądy techniczne i odbiory mieszkań Siemianowice. Bytków, Michałkowice, Centrum.",
    localDescription: "Siemianowice to dynamicznie rozwijające się osiedla (np. Bytków) sąsiadujące z postindustrialną historią. Wykonujemy tu dużo odbiorów deweloperskich.",
    risks: [
      {
        icon: iconSurvey,
        title: "Odbiory Deweloperskie",
        description: "Sprawdzanie tynków, wylewek i stolarki okiennej w nowych inwestycjach."
      },
      {
        icon: iconOldBuilding,
        title: "Wielka Płyta",
        description: "Kontrola łączeń płyt elewacyjnych na osiedlach wysokościowców."
      },
      {
        icon: iconEngineer,
        title: "Tereny Zielone",
        description: "Weryfikacja drenażu na osiedlach budowanych w sąsiedztwie terenów parkowych."
      }
    ]
  },

  {
    name: "Piekary Śląskie",
    lat: 50.384,
    lng: 18.9456,
    slug: "piekary-slaskie",
    seoTitle: "Przeglądy Budowlane Piekary Śląskie",
    seoDescription: "Fachowe przeglądy domów i budynków w Piekarach Śląskich. Zadzwoń i umów termin.",
    localDescription: "W Piekarach Śląskich dominują domy jednorodzinne oraz osiedla z lat 70-tych. Nasza praca skupia się na audytach energetycznych i kontroli stanu dachów.",
    risks: [
      {
        icon: iconEnergy,
        title: "Termowizja",
        description: "Badanie ucieczki ciepła w domach jednorodzinnych - mostki termiczne."
      },
      {
        icon: iconOldBuilding,
        title: "Dachy Skośne",
        description: "Sprawdzanie stanu więźby dachowej i pokrycia w zabudowie jednorodzinnej."
      },
      {
        icon: iconMining,
        title: "Szkody",
        description: "Monitorowanie ewentualnych wpływów eksploatacji górniczej."
      }
    ]
  },

  {
    name: "Tychy",
    lat: 50.1144,
    lng: 18.9966,
    slug: "tychy",
    seoTitle: "Przegląd Budowlany Tychy | Audytora Energetyczny",
    seoDescription: "Tychy: Przeglądy 5-letnie, Świadectwa Energetyczne, Odbiory mieszkań. Sprawdź ofertę inżyniera.",
    localDescription: "Tychy to przykład dobrze zaplanowanego miasta modernistycznego, jednak upływ czasu dotyka tutejsze budynki. Skupiamy się na problemach 'wielkiej płyty' oraz termomodernizacji.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Systemy Prefabrykowane",
        description: "Ocena stanu złącz i korozji betonu w systemach wielkopłytowych."
      },
      {
        icon: iconEnergy,
        title: "Termomodernizacja",
        description: "Nadzór nad dociepleniami budynków i wymianą stolarki okiennej."
      },
      {
        icon: iconMoisture,
        title: "Dachy Płaskie",
        description: "Weryfikacja szczelności pokryć dachowych z papy termozgrzewalnej."
      }
    ]
  },

  {
    name: "Mysłowice",
    lat: 50.2446,
    lng: 19.1391,
    slug: "myslowice",
    seoTitle: "Przeglądy Budynków Mysłowice",
    seoDescription: "Mysłowice - przeglądy techniczne, opinie, ekspertyzy. Obsługa firm i klientów indywidualnych.",
    localDescription: "Mysłowice to miasto o zróżnicowanej zabudowie, często narażone na podtopienia i szkody górnicze. Wymaga to kompleksowego podejścia do izolacji i konstrukcji.",
    risks: [
      {
        icon: iconMoisture,
        title: "Wody Gruntowe",
        description: "Ocena ryzyka podtopień piwnic i skuteczności izolacji pionowych."
      },
      {
        icon: iconMining,
        title: "Szkody Górnicze",
        description: "Weryfikacja wychyleń i pęknięć w dzielnicach górniczych (Wesoła, Brzezinka)."
      },
      {
        icon: iconOldBuilding,
        title: "Stan Techniczny",
        description: "Ogólna ocena zużycia technicznego budynków przed zakupem."
      }
    ]
  },

  // --- ZAGŁĘBIE ---

  {
    name: "Sosnowiec",
    lat: 50.2781,
    lng: 19.1343,
    slug: "sosnowiec",
    seoTitle: "Przeglądy Budowlane Sosnowiec | Inżynier Zagłębie",
    seoDescription: "Profesjonalne przeglądy budowlane w Sosnowcu. Mieszkania, domy, hale przemysłowe.",
    localDescription: "Sosnowiec jako stolica Zagłębia posiada wiele terenów poprzemysłowych oraz starą zabudowę czynszową. Problemy często dotyczą osiadania gruntów nasypowych i wilgoci.",
    risks: [
      {
        icon: iconIndustrial,
        title: "Grunty Nasypowe",
        description: "Badanie stabilności podłoża na terenach rekultywowanych."
      },
      {
        icon: iconOldBuilding,
        title: "Kamienice",
        description: "Ocena stanu technicznego elewacji i balkonów w centrum miasta."
      },
      {
        icon: iconMoisture,
        title: "Wilgoć",
        description: "Problemy z izolacją przeciwwilgociową w starszym budownictwie."
      }
    ]
  },

  {
    name: "Dąbrowa Górnicza",
    lat: 50.3309,
    lng: 19.2079,
    slug: "dabrowa-gornicza",
    seoTitle: "Inżynier Budownictwa Dąbrowa Górnicza",
    seoDescription: "Przeglądy techniczne i odbiory Dąbrowa Górnicza. Gołonóg, Centrum, Ząbkowice.",
    localDescription: "Dąbrowa to miasto przestrzenne, z dużą ilością terenów zielonych i jezior, ale też przemysłu. Weryfikujemy tu często wpływ wód gruntowych na piwnice.",
    risks: [
      {
        icon: iconMoisture,
        title: "Poziom Wód",
        description: "Weryfikacja szczelności piwnic w rejonach blisko zbiorników wodnych."
      },
      {
        icon: iconIndustrial,
        title: "Hale Przemysłowe",
        description: "Przeglądy okresowe obiektów wielkopowierzchniowych i magazynowych."
      },
      {
        icon: iconSurvey,
        title: "Odbiory",
        description: "Pomoc przy odbiorze mieszkań od deweloperów w nowych inwestycjach."
      }
    ]
  },

  {
    name: "Czeladź",
    lat: 50.3185,
    lng: 19.0737,
    slug: "czeladz",
    seoTitle: "Przeglądy Budowlane Czeladź",
    seoDescription: "Usługi inżynierskie w Czeladzi. Przeglądy roczne i 5-letnie, opinie techniczne.",
    localDescription: "Czeladź, najstarsze miasto Zagłębia, wymaga dbałości o historyczną substancję przy jednoczesnym rozwoju stref logistycznych.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Stare Miasto",
        description: "Nadzór nad stanem technicznym budynków w zabytkowym układzie urbanistycznym."
      },
      {
        icon: iconIndustrial,
        title: "Obiekty Logistyczne",
        description: "Przeglądy wielkopowierzchniowe (dachy, instalacje ppoż)."
      },
      {
        icon: iconEnergy,
        title: "Ocieplenia",
        description: "Weryfikacja poprawności wykonania termomodernizacji."
      }
    ]
  },

  {
    name: "Orzesze",
    lat: 50.1439,
    lng: 18.7756,
    slug: "orzesze",
    seoTitle: "Przeglądy Domów Orzesze",
    seoDescription: "Przeglądy budowlane Orzesze i okolice. Sprawdź stan techniczny swojego domu.",
    localDescription: "Orzesze to dominujaąca zabudowa jednorodzinna. Skupiamy się tu na przeglądach okresowych domów prywatnych oraz audytach Czyste Powietrze.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Domy Prywatne",
        description: "Kompleksowe przeglądy 5-letnie wymagane przez ubezpieczycieli."
      },
      {
        icon: iconEnergy,
        title: "Piece i Kotły",
        description: "Doradztwo przy wymianie źródeł ciepła i termomodernizacji."
      },
      {
        icon: iconEngineer,
        title: "Otoczenie",
        description: "Wpływ drzewostanu i wód opadowych na fundamenty budynku."
      }
    ]
  },

  {
    name: "Jaworzno",
    lat: 50.2034,
    lng: 19.2722,
    slug: "jaworzno",
    seoTitle: "Przeglądy Budowlane Jaworzno",
    seoDescription: "Inżynier Jaworzno. Przeglądy, odbiory, opinie techniczne. Szybki dojazd.",
    localDescription: "Jaworzno to miasto o dużej powierzchni i zróżnicowanym terenie. Wykonujemy tu przeglądy zarówno w centrum, jak i w dzielnicach podmiejskich.",
    risks: [
      {
        icon: iconMining,
        title: "Geologia",
        description: "Miejscowe zapadliska i pustki poeksploatacyjne (płytkie górnictwo)."
      },
      {
        icon: iconOldBuilding,
        title: "Nowe Domy",
        description: "Kontrola jakości budowy domów w systemie gospodarczym."
      },
      {
        icon: iconSurvey,
        title: "Pomiary",
        description: "Inwentaryzacje budowlane i pomiary powierzchni użytkowej."
      }
    ]
  },

  // --- POŁUDNIE I POŁUDNIOWY WSCHÓD ---

  {
    name: "Mikołów",
    lat: 50.1692,
    lng: 18.9044,
    slug: "mikolow",
    seoTitle: "Przeglądy Techniczne Mikołów",
    seoDescription: "Ekspertyzy i przeglądy budowlane w Mikołowie. Kamionka, Centrum, Borowa Wieś.",
    localDescription: "Mikołów to popularne miejsce do życia z dużą ilością nowych inwestycji deweloperskich, które wymagają wnikliwej kontroli przy odbiorze.",
    risks: [
      {
        icon: iconSurvey,
        title: "Jakość Deweloperska",
        description: "Weryfikacja kątów ścian, tynków i wylewek w nowych apartamentach."
      },
      {
        icon: iconMoisture,
        title: "Wody Opadowe",
        description: "Problemy z zagospodarowaniem deszczówki na nowych osiedlach."
      },
      {
        icon: iconOldBuilding,
        title: "Domy Szeregowe",
        description: "Kontrola dylatacji i akustyki w zabudowie szeregowej."
      }
    ]
  },

  // --- PÓŁNOC I ZACHÓD ---

  {
    name: "Tarnowskie Góry",
    lat: 50.4445,
    lng: 18.8555,
    slug: "tarnowskie-gory",
    seoTitle: "Przeglądy Budowlane Tarnowskie Góry",
    seoDescription: "Inżynier Tarnowskie Góry. Zabytki, domy jednorodzinne, obiekty handlowe.",
    localDescription: "Miasto Gwarków to specyficzny grunt (dolomit) i historyczne podziemia. Budownictwo tutaj wymaga uwzględnienia stabilności podłoża.",
    risks: [
      {
        icon: iconMining,
        title: "Pustki Podziemne",
        description: "Analiza ryzyka związanego z historycznym górnictwem kruszcowym."
      },
      {
        icon: iconOldBuilding,
        title: "Zabytki",
        description: "Nadzór nad remontami budynków objętych ochroną konserwatorską."
      },
      {
        icon: iconMoisture,
        title: "Wilgoć",
        description: "Ochrona przed wilgocią w starych piwnicach i przyziemiach."
      }
    ]
  },

  {
    name: "Pyskowice",
    lat: 50.3981,
    lng: 18.6277,
    slug: "pyskowice",
    seoTitle: "Przegląd Budowlany Pyskowice - Audyty i Odbiory Domów",
    seoDescription: "Profesjonalne przeglądy techniczne budynków w Pyskowicach. Dojazd w cenie usługi. Sprawdź stan swojego domu przed zakupem lub ubezpieczeniem.",
    localDescription: "Obsługujemy zarówno zabytkowe kamienice w centrum Pyskowic, jak i nową zabudowę jednorodzinną. Gwarantujemy terminy w ciągu 48h dla mieszkańców powiatu gliwickiego.",
    risks: [
      {
        icon: iconOldBuilding,
        title: "Stare Miasto",
        description: "Ocena stanu więźby dachowej i stropów w zabudowie rynkowej."
      },
      {
        icon: iconEnergy,
        title: "Czyste Powietrze",
        description: "Audyty energetyczne dla domów jednorodzinnych."
      },
      {
        icon: iconIndustrial,
        title: "Kolej",
        description: "Wpływ drgań od węzła kolejowego na konstrukcję pobliskich budynków."
      }
    ]
  },

  {
    name: "Rybnik",
    lat: 50.0956,
    lng: 18.542,
    slug: "Rybnik",
    seoTitle: "Przeglądy Budowlane Rybnik | Inżynier",
    seoDescription: "Usługi inżynierskie w Rybniku. Przeglądy okresowe, opinie techniczne, odbiory domów.",
    localDescription: "Rybnik to miasto, które mocno stawia na walkę ze smogiem. Nasze usługi tutaj często dotyczą termomodernizacji i wymiany źródeł ciepła.",
    risks: [
      {
        icon: iconEnergy,
        title: "Smog i Termo",
        description: "Audyty kompleksowe budynków w celu zmniejszenia niskiej emisji."
      },
      {
        icon: iconMining,
        title: "Szkody",
        description: "Weryfikacja wpływu eksploatacji węgla w dzielnicach południowych."
      },
      {
        icon: iconMoisture,
        title: "Kanalizacja",
        description: "Sprawdzanie poprawności podłączeń do nowych sieci kanalizacyjnych."
      }
    ]
  }
];