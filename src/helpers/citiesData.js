// --- IMPORT IKON 3D (Premium) ---
import iconB2B from '../assets/roczny-scope-card-icon.png';
import iconHouse from '../assets/5-scope-card-icon.png';
import iconGas from '../assets/instal-scope-card-icon.png';
import iconEngineer from '../assets/doradztwo-scope-card-icon.png';
import iconEnergy from '../assets/energ-scope-card-icon.png';




const iconMining = require("../assets/mining-risk-icon.png");
const iconAudyt = require("../assets/risk-icon-audyt.png");
const iconDewelop = require("../assets/risk-icon-dewelop.png");
const iconFamiloki = require("../assets/risk-icon-familoki.png");
const iconInstal = require("../assets/risk-icon-instal.png");
const iconKolej = require("../assets/risk-icon-kolej.png");
const iconLogistyka = require("../assets/risk-icon-logistyka.png");
const iconPłyta = require("../assets/risk-icon-płyta.png");
const iconStarowka = require("../assets/risk-icon-starówka.png");
const iconTermoDron = require("../assets/risk-icon-termo-dron.png");
const iconWoda = require("../assets/risk-icon-woda.png");
const iconZabytki = require("../assets/risk-icon-zabytki.png");
const iconZielone = require("../assets/risk-icon-zielone.png");

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
        icon: iconFamiloki,
        title: "Szkody Górnicze",
        description: "Dzielnice takie jak Murcki, Kostuchna czy Panewniki wciąż narażone są na osiadanie gruntu i wstrząsy."
      },
      {
        icon: iconZabytki,
        title: "Modernizm i Tarasy",
        description: "Katowicka moderna to piękne budynki, ale często borykające się z problemami szczelności płaskich dachów i tarasów."
      },
      {
        icon: iconPłyta,
        title: "Termomodernizacja",
        description: "Weryfikujemy jakość dociepleń v budynkach z wielkiej płyty (Osiedle Tysiąclecia, Paderewskiego)."
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
        icon: iconStarowka,
        title: "Poniemieckie Kamienice",
        description: "Specjalizujemy się w ocenie drewnianych stropów i zawilgoconych piwnic w budynkach z cegły."
      },
      {
        icon: iconZabytki,
        title: "Tereny Górnicze",
        description: "Mimo zamknięcia kopalń, dzielnice jak Sośnica czy Łabędy wciąż wymagają weryfikacji wychyleń budynku."
      },
      {
        icon: iconZielone,
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
        icon: iconZabytki,
        title: "Kategoria Terenu",
        description: "Weryfikujemy zabezpieczenia budynków na terenach III i IV kategorii szkód górniczych (np. Makoszowy, Kończyce)."
      },
      {
        icon: iconAudyt,
        title: "Pęknięcia Ścian",
        description: "Analizujemy czy rysy na elewacji są stabilne, czy wynikają z aktywnej pracy górotworu."
      },
      {
        icon: iconFamiloki,
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
        icon: iconStarowka,
        title: "Osiadanie Terenu",
        description: "Szczegółowa kontrola pionowości ścian i poziomów stropów v dzielnicach takich jak Karb czy Bobrek."
      },
      {
        icon: iconWoda,
        title: "Wilgoć Kapilarna",
        description: "Problem podciągania wilgoci w starych murach ceglanych bez izolacji poziomej."
      },
      {
        icon: iconZabytki,
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
        icon: iconZabytki,
        title: "Wstrząsy Górnicze",
        description: "Regularne monitorowanie wpływu wstrząsów na konstrukcję nośną budynków."
      },
      {
        icon: iconInstal,
        title: "Instalacje",
        description: "Weryfikacja szczelności instalacji w budynkach narażonych na ruchy górotworu."
      },
      {
        icon: iconDewelop,
        title: "Domy Jednorodzinne",
        description: "Odbiory techniczne nowych domów v dynamicznie rozwijających się częściach miasta."
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
        icon: iconFamiloki,
        title: "Stropy Kleina",
        description: "Ocena stanu technicznego stalowo-ceramicznych stropów w kamienicach z przełomu wieków."
      },
      {
        icon: iconWoda,
        title: "Kanalizacja",
        description: "Inspekcja starych przyłączy kanalizacyjnych i deszczowych."
      },
      {
        icon: iconTermoDron,
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
        icon: iconFamiloki,
        title: "Stara Zabudowa",
        description: "Weryfikacja stanu technicznego lipin i chropaczowskich familoków."
      },
      {
        icon: iconInstal,
        title: "Kominy",
        description: "Kontrola przewodów kominowych i wentylacyjnych w starszych budynkach."
      },
      {
        icon: iconWoda,
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
        icon: iconDewelop,
        title: "Odbiory Deweloperskie",
        description: "Sprawdzanie tynków, wylewek i stolarki okiennej w nowych inwestycjach."
      },
      {
        icon: iconPłyta,
        title: "Wielka Płyta",
        description: "Kontrola łączeń płyt elewacyjnych na osiedlach wysokościowców."
      },
      {
        icon: iconZielone,
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
        icon: iconTermoDron,
        title: "Termowizja",
        description: "Badanie ucieczki ciepła w domach jednorodzinnych - mostki termiczne."
      },
      {
        icon: iconStarowka,
        title: "Dachy Skośne",
        description: "Sprawdzanie stanu więźby dachowej i pokrycia w zabudowie jednorodzinnej."
      },
      {
        icon: iconZabytki,
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
        icon: iconPłyta,
        title: "Systemy Prefabrykowane",
        description: "Ocena stanu złącz i korozji betonu w systemach wielkopłytowych."
      },
      {
        icon: iconTermoDron,
        title: "Termomodernizacja",
        description: "Nadzór nad dociepleniami budynków i wymianą stolarki okiennej."
      },
      {
        icon: iconWoda,
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
        icon: iconWoda,
        title: "Wody Gruntowe",
        description: "Ocena ryzyka podtopień piwnic i skuteczności izolacji pionowych."
      },
      {
        icon: iconZabytki,
        title: "Szkody Górnicze",
        description: "Weryfikacja wychyleń i pęknięć w dzielnicach górniczych (Wesoła, Brzezinka)."
      },
      {
        icon: iconAudyt,
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
        icon: iconLogistyka,
        title: "Grunty Nasypowe",
        description: "Badanie stabilności podłoża na terenach rekultywowanych."
      },
      {
        icon: iconZabytki,
        title: "Kamienice",
        description: "Ocena stanu technicznego elewacji i balkonów w centrum miasta."
      },
      {
        icon: iconWoda,
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
        icon: iconWoda,
        title: "Poziom Wód",
        description: "Weryfikacja szczelności piwnic v rejonach blisko zbiorników wodnych."
      },
      {
        icon: iconLogistyka,
        title: "Hale Przemysłowe",
        description: "Przeglądy okresowe obiektów wielkopowierzchniowych i magazynowych."
      },
      {
        icon: iconDewelop,
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
        icon: iconStarowka,
        title: "Stare Miasto",
        description: "Nadzór nad stanem technicznym budynków w zabytkowym układzie urbanistycznym."
      },
      {
        icon: iconLogistyka,
        title: "Obiekty Logistyczne",
        description: "Przeglądy wielkopowierzchniowe (dachy, instalacje ppoż)."
      },
      {
        icon: iconTermoDron,
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
        icon: iconAudyt,
        title: "Domy Prywatne",
        description: "Kompleksowe przeglądy 5-letnie wymagane przez ubezpieczycieli."
      },
      {
        icon: iconInstal,
        title: "Piece i Kotły",
        description: "Doradztwo przy wymianie źródeł ciepła i termomodernizacji."
      },
      {
        icon: iconZielone,
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
        icon: iconZabytki,
        title: "Geologia",
        description: "Miejscowe zapadliska i pustki poeksploatacyjne (płytkie górnictwo)."
      },
      {
        icon: iconDewelop,
        title: "Nowe Domy",
        description: "Kontrola jakości budowy domów w systemie gospodarczym."
      },
      {
        icon: iconAudyt,
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
        icon: iconDewelop,
        title: "Jakość Deweloperska",
        description: "Weryfikacja kątów ścian, tynków i wylewek w nowych apartamentach."
      },
      {
        icon: iconZielone,
        title: "Wody Opadowe",
        description: "Problemy z zagospodarowaniem deszczówki na nowych osiedlach."
      },
      {
        icon: iconAudyt,
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
        icon: iconZabytki,
        title: "Pustki Podziemne",
        description: "Analiza ryzyka związanego z historycznym górnictwem kruszcowym."
      },
      {
        icon: iconStarowka,
        title: "Zabytki",
        description: "Nadzór nad remontami budynków objętych ochroną konserwatorską."
      },
      {
        icon: iconWoda,
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
        icon: iconStarowka,
        title: "Stare Miasto",
        description: "Ocena stanu więźby dachowej i stropów w zabudowie rynkowej."
      },
      {
        icon: iconTermoDron,
        title: "Czyste Powietrze",
        description: "Audyty energetyczne dla domów jednorodzinnych."
      },
      {
        icon: iconKolej,
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
        icon: iconTermoDron,
        title: "Smog i Termo",
        description: "Audyty kompleksowe budynków w celu zmniejszenia niskiej emisji."
      },
      {
        icon: iconZabytki,
        title: "Szkody",
        description: "Weryfikacja wpływu eksploatacji węgla w dzielnicach południowych."
      },
      {
        icon: iconWoda,
        title: "Kanalizacja",
        description: "Sprawdzanie poprawności podłączeń do nowych sieci kanalizacyjnych."
      }
    ]
  }
];