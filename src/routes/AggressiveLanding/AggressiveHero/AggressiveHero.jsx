import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./AggressiveHero.scss";

// Icons
import ShieldIcon from '@mui/icons-material/Shield';
import CloudIcon from '@mui/icons-material/Cloud';
import EngineeringIcon from "@mui/icons-material/Engineering";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EventNoteIcon from '@mui/icons-material/EventNote';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PolicyIcon from '@mui/icons-material/Policy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArticleIcon from '@mui/icons-material/Article';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import avatarImg from '../../../assets/avatar.jpg';

const AggressiveHero = () => {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!consent) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "leads"), {
                name,
                phone,
                city,
                consentType: "Ogólna zgoda na kontakt w celu ofertowym",
                consentGrantedAt: Timestamp.now(),
                source: "AggressiveHero Landing Page"
            });

            navigate("/dziekuje");
        } catch (error) {
            console.error("Błąd podczas zapisywania leada: ", error);
            alert("Wystąpił błąd, spróbuj ponownie.");
            setIsSubmitting(false);
        }
    };

    return (
        <section className="aggressive-hero-section" ref={heroRef}>
            {/* Background pattern */}
            <div className="bg-grid-pattern"></div>

            {/* Background houses top */}
            <div className="bg-houses top-houses">
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-1 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-2 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-3 logo-watermark" />
            </div>

            <div className="container aggressive-hero-container">

                {/* 1. Nagłówek */}
                <h1 className="aggressive-title">
                    POLISA NA DOM<br />
                    TO ZA MAŁO.<br />
                    <span className="text-green">CHROŃ DOROBEK ŻYCIA.</span>
                </h1>

                {/* 2. Process Flow */}
                <div className="process-flow">

                    {/* Krok 1 */}
                    <div className="step-card card-blue">
                        <div className="step-content">
                            <h3>Żywioł Niszczy Twój Dom!</h3>
                            <p>Ogień lub wiatr obracają w popiół dorobek całego życia. Wszystko znika w mgnieniu oka.</p>
                        </div>
                        <div className="step-badge badge-blue">1</div>
                        <div className="step-icon">
                            <CloudIcon style={{ fontSize: '60px', color: '#475569' }} />
                        </div>
                    </div>

                    <div className="flow-arrow">↓</div>

                    {/* Krok 2 */}
                    <div className="step-card card-green">
                        <div className="step-content">
                            <h3>Rzeczoznawca ubezpieczalni bada sprawę</h3>
                            <p>Rzeczoznawca wynajęty przez ubezpieczyciela szuka technicznych zaniedbań, by uniknąć wypłaty.</p>
                        </div>
                        <div className="step-badge badge-green">2</div>
                        <div className="step-icon">
                            <SearchIcon style={{ fontSize: '60px', color: '#334155' }} />
                        </div>
                    </div>

                    <div className="flow-arrow flow-arrow-green">↓</div>

                    {/* Krok 3 */}
                    <div className="step-card card-yellow">
                        <div className="step-content">
                            <h3>Brak OBOWIĄZKOWEGO Protokółu Kontroli 5-letniej</h3>
                            <p>Twoje badania techniczne wygasły lub nie istnieją, unieważniając polisę.</p>
                            <span className="no-stamp">BRAK</span>
                        </div>
                        <div className="step-badge badge-yellow">3</div>
                        <div className="step-icon">
                            <EventNoteIcon style={{ fontSize: '60px', color: '#b45309' }} />
                        </div>
                    </div>

                    <div className="flow-arrow flow-arrow-red">↓</div>

                    {/* Krok 4 */}
                    <div className="step-card card-red">
                        <div className="step-content">
                            <h3>Formalna Odmowa Wypłaty Odszkodowania (0 zł)</h3>
                            <p>Ubezpieczyciel legalnie odmawia wypłaty powołując się na rażące niedbalstwo (brak przeglądu).</p>
                            <svg viewBox="0 0 200 200" className="policy-stamp grunge-stamp">
                                <defs>
                                    <path id="topCurve" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
                                    <path id="bottomCurve" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
                                    <filter id="grunge" x="0%" y="0%" width="100%" height="100%">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
                                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1.5" in="noise" result="coloredNoise" />
                                        <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" result="composite" />
                                    </filter>
                                </defs>
                                <g filter="url(#grunge)">
                                    <circle cx="100" cy="100" r="90" fill="none" stroke="#b91c1c" strokeWidth="8" />
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="#b91c1c" strokeWidth="2" />
                                    <circle cx="100" cy="100" r="45" fill="none" stroke="#b91c1c" strokeWidth="3" />

                                    <text fontFamily="'Courier New', monospace" fontWeight="900" fontSize="20" fill="#b91c1c" letterSpacing="1">
                                        <textPath href="#topCurve" startOffset="50%" textAnchor="middle">DECYZJA OSTATECZNA</textPath>
                                    </text>
                                    <text fontFamily="'Courier New', monospace" fontWeight="900" fontSize="16" fill="#b91c1c" letterSpacing="4">
                                        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">* 0 ZŁOTYCH *</textPath>
                                    </text>

                                    <text x="100" y="95" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="32" textAnchor="middle" fill="#b91c1c" transform="scale(1, 1.2) translate(0, -15)">ODMOWA</text>
                                    <text x="100" y="125" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="16" textAnchor="middle" fill="#b91c1c">ODSZKODOWANIA</text>
                                </g>
                            </svg>
                        </div>
                        <div className="step-badge badge-red">4</div>
                        {/* <div className="step-icon">
                            <ShieldIcon style={{ fontSize: '60px', color: '#334155' }} />
                        </div> */}
                    </div>

                </div>

                {/* 3. Bottom Grid: Services & Form */}
                <div className="bottom-split-section">

                    {/* Left: Services */}
                    <div className="services-panel">
                        <h3>Kompleksowy Przegląd 5-Letni na Śląsku (Budowlany + Elektryczny + Gazowy)   </h3>
                        <p className="subtitle">Jeden audyt = Komplet dokumentów. 100% pewności przed ubezpieczycielem i Nadzorem Budowlanym.</p>

                        <ul className="services-list">
                            <li>
                                <GppGoodIcon className="list-icon" />
                                <span>Otrzymujesz rzetelny protokół, którego nie podważy żaden rzeczoznawca w przypadku zgłoszenia szkody.</span>
                            </li>
                            <li>
                                <HomeWorkIcon className="list-icon" />
                                <span>Fachowa ocena dachu, fundamentów i ścian. Wykrywamy usterki, zanim zamienią się w kosztowną awarię.</span>
                            </li>
                            <li>
                                <ArticleIcon className="list-icon" />
                                <span>Przygotowujemy wymagane prawem dokumenty oraz dokonujemy wpisu do Książki Obiektu Budowlanego (KOB).</span>
                            </li>
                            <li>
                                <ContentPasteGoIcon className="list-icon" />
                                <span>Zgodnie z wymogami polskiego prawabadamy instalację elektryczną  i gazu.</span>
                            </li>
                            <li>
                                <EngineeringIcon className="list-icon" />
                                <span>Eliminujemy ryzyko porażenia prądem czy pożaru. Ty śpisz spokojnie przez kolejne 5 lat.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Form */}
                    <div className="form-panel action-form-section">
                        <form className="simple-quote-form" onSubmit={handleFormSubmit}>
                            <h3 className="form-header">Otrzymaj darmową wycenę przeglądu</h3>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Imię"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="tel"
                                    placeholder="Numer telefonu"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Miejscowość"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group text-area-group">
                                <textarea
                                    placeholder="Wiadomość (opcjonalnie)"
                                    rows="3"
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <label className="rodo-checkbox">
                                <input
                                    type="checkbox"
                                    required
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    disabled={isSubmitting}
                                />
                                <span>
                                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przedstawienia oferty. Wiem, że mogę tę zgodę cofnąć w każdej chwili.
                                </span>
                            </label>

                            <button type="submit" className="green-btn" disabled={isSubmitting}>
                                ODBIERZ DARMOWĄ WYCENĘ
                            </button>
                        </form>
                    </div>

                </div>

                {/* 4. Engineer Biz Card */}
                <div className="engineer-card">
                    <img src={avatarImg} alt="Inżynier Przemysław Rakotny" className="avatar" />
                    <div className="info">
                        <h4>mgr inż. Przemysław Rakotny</h4>
                        <span className="badge">
                            <VerifiedUserIcon fontSize="small" /> Uprawniony Inżynier Budownictwa
                        </span>
                        <p>Gwarancja rzetelnego raportu do Ubezpieczalni.</p>
                    </div>
                </div>

            </div>

            {/* Background houses bottom */}
            <div className="bg-houses bottom-houses">
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-1 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-2 logo-watermark" />
                <img src="/images/v2/logo_check.png?v=3" alt="" className="house house-3 logo-watermark" />
            </div>

        </section>
    );
};

export default AggressiveHero;
