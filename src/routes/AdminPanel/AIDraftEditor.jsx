import React, { useState } from "react";
import { X, Save, Type, FileText, Grid, Image as ImageIcon, Tag } from "lucide-react";

/**
 * AIDraftEditor - Simplified modal component to edit AI-generated blog drafts using raw HTML.
 */
export default function AIDraftEditor({ draft, onClose, onSave }) {
    const [form, setForm] = useState({
        title: draft.title || "",
        content: draft.content || "", // Lead
        content2: draft.content2 || "", // Body (Raw HTML)
        categories: Array.isArray(draft.categories) ? draft.categories.join(", ") : "",
        tags: Array.isArray(draft.tags) ? draft.tags.join(", ") : "",
        facebookPost: draft.facebookPost || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoriesArray = form.categories.split(",").map(c => c.trim()).filter(Boolean);
        const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
        onSave(draft.id, {
            ...form,
            categories: categoriesArray,
            tags: tagsArray,
        });
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-card">
                <header className="modal-header">
                    <div className="title-area">
                        <div className="icon-circle">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h3>Edytuj Szkic (Format HTML)</h3>
                            <p>Podgląd i edycja surowego kodu wygenerowanego przez AI</p>
                        </div>
                    </div>
                    <button className="btn-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-body">
                        <div className="form-group">
                            <label><Type size={16} /> Tytuł</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Krótki opis (Lead)</label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                rows={3}
                                style={{ fontFamily: "monospace", fontSize: "13px" }}
                            />
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Treść artykułu (Kod HTML)</label>
                            <textarea
                                value={form.content2}
                                onChange={(e) => setForm({ ...form, content2: e.target.value })}
                                rows={15}
                                style={{ fontFamily: "monospace", fontSize: "13px", lineHeight: "1.6" }}
                                placeholder="Wklej lub edytuj kod HTML tutaj..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><Grid size={16} /> Kategorie</label>
                                <input
                                    type="text"
                                    value={form.categories}
                                    onChange={(e) => setForm({ ...form, categories: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label><Tag size={16} /> Tagi SEO</label>
                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label><ImageIcon size={16} /> Post na Facebooka</label>
                            <textarea
                                value={form.facebookPost}
                                onChange={(e) => setForm({ ...form, facebookPost: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="image-preview">
                            <label>Wygenerowana grafika:</label>
                            {draft.src ? (
                                <img src={draft.src} alt="Draft preview" style={{ borderRadius: "8px", marginTop: "10px" }} />
                            ) : (
                                <div className="no-image">Brak obrazka</div>
                            )}
                        </div>
                    </div>

                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Anuluj
                        </button>
                        <button type="submit" className="btn-save">
                            <Save size={18} /> Zapisz zmiany w HTML
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
