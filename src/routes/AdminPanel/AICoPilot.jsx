import React, { useState, useEffect, useRef } from "react";
import { Sparkles, FileText, Tag, ChevronRight, Zap, Quote, MessageCircle, Info, Search, X, Layers, RotateCcw } from "lucide-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";

export default function AICoPilot({ keywords: dbKeywords }) {
    const [analytics, setAnalytics] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedOutline, setGeneratedOutline] = useState("");

    const [formData, setFormData] = useState({
        topic: "",

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (generatedOutline) {
            // STEP 2: Generuj finalny tekst na podstawie poprawionego konspektu HTML
            setIsGenerating(true);
            try {
                const draftFromOutline = httpsCallable(functions, "generateDraftFromOutline");
                const result = await draftFromOutline({
                    outlineHtml: generatedOutline,
                    topic: formData.topic,
                    selectedKeywords: formData.selectedKeywords,
                    isSeries: formData.isSeries,
                    seriesName: formData.seriesName
                });

                if (result.data.success) {
                    alert("Szkic wygenerowany! Sprawdź zakładkę 'Moje Szkice', aby go opublikować.");
                    // Reset formularza
                    setGeneratedOutline("");
                    setFormData({
                        topic: "",
                        selectedKeywords: [],
                        isSeries: false,
                        seriesName: "",
                        theses: "",
                        includeBuildingLaw: true,
                        includeAnecdote: true
                    });
                } else {
                    alert("Błąd podczas generowania finalnego tekstu: " + result.data.error);
                }
            } catch (error) {
                console.error(error);
                alert("Błąd połączenia z serwerem podczas Kroku 2.");
            } finally {
                setIsGenerating(false);
            }
            return;
        }

        const submission = { ...formData };

        setIsGenerating(true);
        try {
            const generateOutline = httpsCallable(functions, "generateDraftCoPilot");
            const result = await generateOutline(submission);

            if (result.data.success) {
                setGeneratedOutline(result.data.outline);
            } else {
                alert("Błąd podczas generowania konspektu: " + result.data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Błąd połączenia z serwerem.");
        } finally {
            setIsGenerating(false);
        }
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
                    <div className="form-group mb-6">
                        <label>Wybrany temat do konspektu</label>
                        <input
                            type="text"
                            placeholder="Kliknij w powyzszą sugestię AI, lub wpisz własny tytuł..."
                            value={formData.topic}
                            onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value, isSeries: false, seriesName: "" }))}
                            className="w-full"
                            required
                        />
                        {formData.isSeries && (
                            <div className="series-badge">
                                <Layers size={14} /> Kontynuacja cyklu: <strong>{formData.seriesName}</strong>
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
                        {generatedOutline ? (
                            <div className="outline-review-container mt-6 p-6 bg-gray-100 rounded-xl border border-gray-200 shadow-inner">
                                <label className="outline-label flex items-center gap-2 font-bold text-gray-800 mb-4 text-lg">
                                    <FileText size={22} className="text-orange-500" />
                                    Konspekt Artykułu (Edytor)
                                </label>

                                <div className="editor-google-docs-style bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden mb-6">
                                    {/* Toolbar */}
                                    <div className="toolbar flex flex-wrap gap-2 p-3 bg-gray-50 border-b border-gray-200">
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); document.execCommand('strikeThrough', false, null); }}
                                            className="px-3 py-1.5 bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Zaznacz tekst i kliknij, aby go usunąć ze szkicu"
                                        >
                                            <span className="line-through block">Usuń</span> <span className="text-xs font-normal opacity-75">(Skreśl)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); if (!document.execCommand('hiliteColor', false, '#fef08a')) document.execCommand('backColor', false, '#fef08a'); }}
                                            className="px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded border border-yellow-200 hover:bg-yellow-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Zaznacz dopisany przez siebie tekst"
                                        >
                                            <span className="bg-yellow-300 px-1 rounded block">Dodaj</span> <span className="text-xs font-normal opacity-75">(Wyróżnij)</span>
                                        </button>
                                        <button
                                            type="button"
                                            onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold', false, null); }}
                                            className="px-3 py-1.5 bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-100 text-sm font-semibold flex items-center gap-2 transition-colors focus:outline-none"
                                            title="Pogrub fragmenty"
                                        >
                                            <strong className="block">Ważne</strong> <span className="text-xs font-normal opacity-75">(Bold)</span>
                                        </button>
                                    </div>

                                    {/* Editable Area (The "Page") */}
                                    <div className="editor-page-wrapper p-8 bg-white" style={{ minHeight: "500px", maxHeight: "65vh", overflowY: "auto" }}>
                                        <div
                                            className="outline-editable-div w-full min-h-full text-gray-900 outline-none style-prose"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => setGeneratedOutline(e.currentTarget.innerHTML)}
                                            dangerouslySetInnerHTML={{ __html: generatedOutline }}
                                            style={{
                                                lineHeight: "1.8",
                                                fontSize: "16px",
                                                fontFamily: "system-ui, -apple-system, sans-serif"
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" disabled={isGenerating} className="btn-generate-draft w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Sparkles size={24} className={isGenerating ? "animate-pulse" : ""} />
                                    <span>{isGenerating ? "Pisanie artykułu przez AI (to może zająć chwilę)..." : "Krok 2/3: Zatwierdź Konspekt i Poproś AI o finalny tekst"}</span>
                                </button>
                            </div>
                        ) : (
                            <button type="submit" className="btn-generate-draft" disabled={isGenerating}>
                                <Sparkles size={18} />
                                {isGenerating ? "Generowanie Konspektu (Proszę czekać...)" : "Krok 1: Generuj Konspekt"}
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
}
