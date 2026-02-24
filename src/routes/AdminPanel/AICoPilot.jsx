import React, { useState, useEffect, useRef } from "react";
import { Sparkles, FileText, Tag, ChevronRight, Zap, Quote, MessageCircle, Info, Search, X, Layers, RotateCcw } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

export default function AICoPilot({ keywords: dbKeywords }) {
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [formData, setFormData] = useState({
        topic: "",
        customTopic: "",
        selectedKeywords: [],
        isSeries: false,
        seriesName: "",
        theses: "",
        includeBuildingLaw: true,
        includeAnecdote: true
    });

    const [activeRadarItem, setActiveRadarItem] = useState(null); // Key for suggestions mapping (Pillar name or Cycle suggestion string)
    const [keywordSearch, setKeywordSearch] = useState("");
    const [showKeywordList, setShowKeywordList] = useState(false);
    const keywordRef = useRef(null);

    useEffect(() => {
        fetchAnalytics();

        const handleClickOutside = (event) => {
            if (keywordRef.current && !keywordRef.current.contains(event.target)) {
                setShowKeywordList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const getAnalytics = httpsCallable(functions, "getBlogAnalytics");
            const result = await getAnalytics();
            if (result.data.success) {
                setAnalytics(result.data.data);
            } else {
                console.error("Backend error:", result.data.error);
                setAnalytics(null);
            }
        } catch (error) {
            console.error("Function call failed:", error);
            setAnalytics(null);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleKeyword = (kw) => {
        setFormData(prev => ({
            ...prev,
            selectedKeywords: prev.selectedKeywords.includes(kw)
                ? prev.selectedKeywords.filter(k => k !== kw)
                : [...prev.selectedKeywords, kw]
        }));
    };

    const availableKeywords = (analytics?.allKeywords || dbKeywords || [])
        .filter(kw => kw.toLowerCase().includes(keywordSearch.toLowerCase()))
        .filter(kw => !formData.selectedKeywords.includes(kw));

    const selectSuggestion = (radarKey, suggestionText) => {
        const cycle = analytics?.openCycles?.find(c => c.suggestion === radarKey);

        if (cycle) {
            const combined = `${radarKey} - ${suggestionText}`;
            setFormData(prev => ({
                ...prev,
                topic: combined,
                isSeries: true,
                seriesName: cycle.name
            }));
        } else {
            const combined = `${radarKey} - ${suggestionText}`;
            setFormData(prev => ({ ...prev, topic: combined, isSeries: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalTopic = formData.topic === "custom" ? formData.customTopic : formData.topic;
        const submission = { ...formData, topic: finalTopic };
        console.log("Krok 1: Dane do generowania draftu:", submission);
        alert("Dane zebrane! Sprawdź konsolę (F12). W kolejnym kroku podepniemy tu OpenAI.");
    };

    const pillars = [
        "Prawo budowlane i normy techniczne",
        "Awarie, usterki i diagnostyka budynków",
        "Ubezpieczenia, finanse i koszty eksploatacji",
        "Porady dla kupujących mieszkania i domy (rynek wtórny/pierwotny)"
    ];

    return (
        <div className="ai-copilot-panel">
            <section className="analytics-hints">
                <div className="section-header">
                    <Sparkles size={20} className="text-orange" />
                    <h3>Analityka i Sugestie</h3>
                </div>

                {isLoading ? (
                    <div className="loading-state">Pobieranie analityki...</div>
                ) : analytics ? (
                    <div className="hints-grid">
                        {/* COLUMN 1: TOPIC RADAR (Unified List) */}
                        <div className="hint-card topic-radar">
                            <h4><Zap size={16} /> Radar Tematów</h4>
                            <div className="topic-radar-content">
                                <div className="unified-radar-list">
                                    <p className="label">Obszary i aktywne cykle:</p>
                                    <ul>
                                        {pillars.map((topic, i) => (
                                            <li
                                                key={`p-${i}`}
                                                className={activeRadarItem === topic ? "active" : ""}
                                                onClick={() => setActiveRadarItem(topic)}
                                            >
                                                <span className="dot" style={{ backgroundColor: analytics.topicRadar.missing.includes(topic) ? "#f97316" : "#cbd5e0" }}></span>
                                                <span className="text-truncate">{topic}</span>
                                                <ChevronRight size={14} />
                                            </li>
                                        ))}
                                        {analytics.openCycles?.map((cycle, i) => (
                                            <li
                                                key={`c-${i}`}
                                                className={`cycle-radar-item group relative ${activeRadarItem === cycle.suggestion ? "active" : ""}`}
                                                onClick={() => setActiveRadarItem(cycle.suggestion)}
                                            >
                                                <RotateCcw size={14} className="text-orange" />
                                                <span className="text-truncate">Kontynuacja: {cycle.name} ({cycle.current}/{cycle.total})</span>
                                                <ChevronRight size={14} />

                                                {/* Tooltip on Hover */}
                                                <div className="absolute left-0 bottom-[100%] mb-2 z-50 hidden group-hover:block w-96 bg-white rounded-lg shadow-xl border border-gray-100 p-3 tooltip-cycle">
                                                    <h6 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1">Istniejące wpisy w cyklu:</h6>
                                                    <ul className="text-xs text-gray-600 space-y-1">
                                                        {cycle.existingParts?.map((part, idx) => (
                                                            <li key={idx} className="flex gap-2">
                                                                <span className="text-orange font-bold">Cz.{part.current}</span>
                                                                <span className="full-title">{part.title}</span>
                                                            </li>
                                                        ))}
                                                        {(!cycle.existingParts || cycle.existingParts.length === 0) && (
                                                            <li>Brak danych historycznych.</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 2: DYNAMIC SUGGESTIONS */}
                        <div className="hint-card topic-suggestions">
                            <h4><Sparkles size={16} /> Nowe Pomysły od AI</h4>
                            <div className="dynamic-suggestions-container">
                                {!activeRadarItem ? (
                                    <div className="empty-selection-prompt">
                                        <Info size={40} />
                                        <p>Wybierz obszar lub cykl z Radaru po lewej, aby zobaczyć konkretne pomysły.</p>
                                    </div>
                                ) : (
                                    <div className="suggestion-group">
                                        <h5 className="pillar-name">
                                            {analytics.openCycles?.some(c => c.suggestion === activeRadarItem) ? "Rozwinięcie dla kolejnej części cyklu" : activeRadarItem}
                                        </h5>
                                        <ul>
                                            {Array.isArray(analytics.topicSuggestions[activeRadarItem]) ? (
                                                analytics.topicSuggestions[activeRadarItem].map((s, i) => (
                                                    <li key={i} onClick={() => selectSuggestion(activeRadarItem, s)}>
                                                        {s} <ChevronRight size={14} />
                                                    </li>
                                                ))
                                            ) : (
                                                !analytics.topicSuggestions[activeRadarItem] ? (
                                                    <div className="no-suggestions">AI przygotowuje pomysły... (Spróbuj odświeżyć jeśli to trwa zbyt długo)</div>
                                                ) : (
                                                    <div className="no-suggestions text-red-500">Błąd formatu danych od AI.</div>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLUMN 3: SEO */}
                        <div className="hint-card seo-suggestions">
                            <h4><Tag size={16} /> Sugestie SEO</h4>
                            <div className="tag-cloud">
                                {analytics.seoSuggestions?.map((kw, i) => (
                                    <span key={i} className="hint-tag" onClick={() => toggleKeyword(kw)}>
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error-state">
                        <Info size={16} />
                        Nie udało się pobrać podpowiedzi. Sprawdź połączenie z Firebase.
                    </div>
                )}
            </section>

            {/* SECTION: EDITORIAL FORM */}
            <section className="editorial-form-container">
                <div className="section-header">
                    <FileText size={20} className="text-orange" />
                    <h3>Formularz Startowy Redaktora</h3>
                </div>

                <form onSubmit={handleSubmit} className="co-pilot-form">
                    <div className="form-group">
                        <label>Temat główny wpisu</label>
                        <select
                            value={formData.topic}
                            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                            required
                            className="smart-select"
                        >
                            <option value="">-- Wybierz temat z sugestii AI lub własny --</option>
                            {Object.entries(analytics?.topicSuggestions || {}).map(([target, suggestions], idx) => {
                                const validSuggestions = Array.isArray(suggestions) ? suggestions : [];
                                if (validSuggestions.length === 0) return null;
                                return (
                                    <optgroup key={idx} label={target}>
                                        {validSuggestions.map((s, i) => {
                                            const val = `${target} - ${s}`;
                                            return <option key={`opt-${idx}-${i}`} value={val}>{s}</option>;
                                        })}
                                    </optgroup>
                                );
                            })}
                            <option value="custom">Inny (Wpisz własny temat)...</option>
                        </select>

                        {formData.topic === "custom" && (
                            <input
                                type="text"
                                placeholder="Wpisz własny temat tutaj..."
                                value={formData.customTopic}
                                onChange={(e) => setFormData(prev => ({ ...prev, customTopic: e.target.value }))}
                                className="mt-2"
                                required
                            />
                        )}

                        {formData.topic && formData.topic !== "custom" && (
                            <div className="selected-topic-preview">
                                <span className="label">Wybrany temat:</span> {formData.topic}
                                {formData.isSeries && (
                                    <div className="series-badge mt-1">
                                        <Layers size={14} /> Kontynuacja cyklu: <strong>{formData.seriesName}</strong>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-group" ref={keywordRef}>
                        <label>Słowa kluczowe (Searchable Multi-Select)</label>
                        <div className="keyword-selector-wrapper">
                            <div className="selected-tags-box" onClick={() => setShowKeywordList(true)}>
                                {formData.selectedKeywords.map((kw, i) => (
                                    <span key={i} className="tag">
                                        {kw} <X size={12} onClick={(e) => { e.stopPropagation(); toggleKeyword(kw); }} />
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    placeholder={formData.selectedKeywords.length === 0 ? "Wyszukaj lub wybierz z bazy..." : ""}
                                    value={keywordSearch}
                                    onChange={(e) => { setKeywordSearch(e.target.value); setShowKeywordList(true); }}
                                    onFocus={() => setShowKeywordList(true)}
                                />
                            </div>

                            {showKeywordList && (
                                <div className="keyword-dropdown">
                                    {availableKeywords.length > 0 ? (
                                        availableKeywords.map((kw, i) => (
                                            <div key={i} className="dropdown-item" onClick={() => { toggleKeyword(kw); setKeywordSearch(""); }}>
                                                {kw}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-results">Brak pasujących słów.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Moje tezy / Szkic (Wytyczne dla AI)</label>
                        <textarea
                            placeholder="O czym ma być tekst? Twoje główne myśli, konkretne przypadki z budowy, ważne wnioski..."
                            value={formData.theses}
                            onChange={(e) => setFormData(prev => ({ ...prev, theses: e.target.value }))}
                            rows={5}
                        />
                    </div>

                    <div className="form-toggles">
                        <div className="toggle-group">
                            <label className="switch-label">
                                <input
                                    type="checkbox"
                                    checked={formData.includeBuildingLaw}
                                    onChange={(e) => setFormData(prev => ({ ...prev, includeBuildingLaw: e.target.checked }))}
                                />
                                <Quote size={16} /> Cytat z Prawa Budowlanego
                            </label>
                        </div>
                        <div className="toggle-group">
                            <label className="switch-label">
                                <input
                                    type="checkbox"
                                    checked={formData.includeAnecdote}
                                    onChange={(e) => setFormData(prev => ({ ...prev, includeAnecdote: e.target.checked }))}
                                />
                                <MessageCircle size={16} /> Anegdota / przykład z życia
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-generate-draft" disabled={isGenerating}>
                            <Sparkles size={18} />
                            {isGenerating ? "Generowanie..." : "Krok 1: Generuj Draft"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
