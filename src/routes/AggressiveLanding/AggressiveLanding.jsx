import React, { useEffect } from "react";
import "./AggressiveLanding.scss";
import { Helmet } from "react-helmet-async";
import AggressiveHero from "./AggressiveHero/AggressiveHero";
import InspectionsTimeline from "../../components/InspectionsTimeline/InspectionsTimeline";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm"; // <--- Zaktualizowany path
import CityListBanner from "../../sections/CityListBanner/CityListBanner";
import Faq from "../../sections/faq/Faq"; // <--- Zaktualizowana wielkość liter
import StickyOrderBar from "../../components/StickyOrderBar/StickyOrderBar";

const AggressiveLanding = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="aggressive-landing-page">
            <Helmet>
                <title>Zagrożenie Kary PINB i Odmowa Z OC | Przegląd Techniczny</title>
                <meta
                    name="description"
                    content="Brak ważnego przeglądu budynku to podstawa do odrzucenia odszkodowania po pożarze i kary od PINB. Zabezpiecz swój majątek już teraz."
                />
                <meta name="robots" content="noindex, nofollow" /> {/* Landingi typowo adsowe można ukryć przed SEO bazowym */}
            </Helmet>

            {/* 1. Nowy agresywny "Hook" sprzedażowy */}
            <AggressiveHero />

            {/* 2. Przebieg procesu (budowanie zaufania po mocnym uderzeniu) */}
            <div className="section-divider">
                <InspectionsTimeline />
            </div>

            {/* 3. Formularz docelowy (Action) */}
            <div id="inspection-form" className="section-divider bg-light">
                <InspectionForm />
            </div>

            {/* 4. Dowód działalności lokalnej (Trust) */}
            {/* <div className="section-divider">
                <CityListBanner />
            </div> */}

            {/* 5. Rozwiewanie obiekcji */}
            <div className="section-divider bg-light pb-large">
                <Faq />
            </div>

            {/* 6. Pływający pasek zamówienia dla konwersji scrollujących */}
            <StickyOrderBar />
        </div>
    );
};

export default AggressiveLanding;
