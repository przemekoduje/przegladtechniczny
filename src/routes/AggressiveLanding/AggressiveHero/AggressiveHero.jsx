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
                 <HomeWorkIcon className="house house-1" />
                 <HomeWorkIcon className="house house-2" />
                 <HomeWorkIcon className="house house-3" />
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
                            <h3>Wichura/Pożar</h3>
                            <p>Wichura/pożar niszczą dach ze spienionym pods</p>
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
                            <p>Odmowa uzn. roszczenia z powodu podwieszeń dla ubezpieczyciela</p>
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
                            <h3>Brak wpisu z rocznego przeglądu</h3>
                            <p>Pusta strona przeglądu w rubrykach.</p>
                            <span className="no-stamp">NO</span>
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
                            <h3>Odmowa wypłaty (0 zł)</h3>
                            <p>Odmowa przelana przez PINB</p>
                            <PolicyIcon className="policy-stamp" style={{ fontSize: '40px' }} />
                        </div>
                        <div className="step-badge badge-red">4</div>
                        <div className="step-icon">
                            <ShieldIcon style={{ fontSize: '60px', color: '#334155' }} />
                        </div>
                    </div>

                </div>

                {/* 3. Bottom Grid: Services & Form */}
                <div className="bottom-split-section">
                    
                    {/* Left: Services */}
                    <div className="services-panel">
                        <h3>Kompleksowe przeglądy budowlane i pomiary elektryczne na Śląsku</h3>
                        <p className="subtitle">Kompleksowe przeglądy znaczy rzetelne rzemiosło.</p>
                        
                        <ul className="services-list">
                            <li>
                                <GppGoodIcon className="list-icon" />
                                <span>Skuteczna ubezpieczenia</span>
                            </li>
                            <li>
                                <HomeWorkIcon className="list-icon" />
                                <span>Kompleksowe przeglądy budowlane</span>
                            </li>
                            <li>
                                <ArticleIcon className="list-icon" />
                                <span>Formalności z przeglądy i asystowanie budowom</span>
                            </li>
                            <li>
                                <ContentPasteGoIcon className="list-icon" />
                                <span>Kompleksowe przeglądy klimatyzacyjne</span>
                            </li>
                            <li>
                                <EngineeringIcon className="list-icon" />
                                <span>Kompleksowe przeglądy i ocena wizualna</span>
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
                    <img src="https://i.pravatar.cc/150?img=11" alt="Inżynier Przemysław Rakotny" className="avatar" />
                    <div className="info">
                        <h4>Inż. Przemysław Rakotny</h4>
                        <span className="badge">
                            <VerifiedUserIcon fontSize="small" /> Uprawniony Inżynier
                        </span>
                        <p>Gwarancja rzetelnego raportu do ubezpieczalni.</p>
                    </div>
                </div>

            </div>

             {/* Background houses bottom */}
             <div className="bg-houses bottom-houses">
                 <HomeWorkIcon className="house house-1" />
                 <HomeWorkIcon className="house house-2" />
                 <HomeWorkIcon className="house house-3" />
            </div>

        </section>
    );
};

export default AggressiveHero;
