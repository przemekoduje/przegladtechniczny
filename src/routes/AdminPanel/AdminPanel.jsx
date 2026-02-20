// routes/AdminPanel/AdminPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import "./adminPanel.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Layout,
  ChevronLeft,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Save,
  Type,
  Grid,
  BarChart,
  Inbox,
  Calendar,
  MapPin,
  Clock,
  LogOut,
  Mail,
  User,
  Phone
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import ButtonBlot from "../../components/quill/ButtonBlot.js";
import AnalyticsView from "./AnalyticsView";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);
Quill.register("formats/button", ButtonBlot);

export default function AdminPanel() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [clientRequests, setClientRequests] = useState([]); // NOWE ZGŁOSZENIA
  const [activeTab, setActiveTab] = useState("requests"); // "list" | "form" | "analytics" | "requests"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  // Appointment scheduling
  const [editRequestId, setEditRequestId] = useState(null);
  const [proposedDate, setProposedDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    content2: "",
    categories: "",
    src: null,
    type: "StandardPost",
    w: 1,
    h: 1,
    buttonLabel: "",
    buttonClass: "",
    buttonOnClick: ""
  });
  const [editingPost, setEditingPost] = useState(null);

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const startEditing = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      content2: post.content2 || "",
      categories: Array.isArray(post.categories) ? post.categories.join(", ") : "",
      type: post.type,
      src: post.src || null,
      w: post.w,
      h: post.h,
      buttonLabel: post.buttonLabel || "",
      buttonClass: post.buttonClass || "",
      buttonOnClick: post.buttonOnClick || ""
    });
    setActiveTab("form");

    // Quill needs a small delay to be available if tab just switched
    setTimeout(() => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = post.content2 || "";
      }
    }, 100);
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      content2: "",
      categories: "",
      src: null,
      type: "StandardPost",
      w: 1,
      h: 1,
      buttonLabel: "",
      buttonClass: "",
      buttonOnClick: ""
    });
    setEditingPost(null);
    if (quillRef.current) {
      quillRef.current.root.innerHTML = "";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          categories: Array.isArray(doc.data().categories) ? doc.data().categories : [],
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userCarts"));
        const reqArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientRequests(reqArray);
      } catch (error) {
        console.error("Błąd podczas pobierania zgłoszeń:", error);
      }
    };

    fetchPosts();
    fetchRequests();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      showFeedback("error", "Nie udało się wylogować.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      showFeedback("success", "Wpis został usunięty.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania wpisu.");
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to ZGŁOSZENIE (przepadnie)?")) return;
    try {
      await deleteDoc(doc(db, "userCarts", id));
      setClientRequests((prev) => prev.filter((req) => req.id !== id));
      showFeedback("success", "Zgłoszenie zostało usunięte z bazy.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania zgłoszenia.");
    }
  };

  const handleProposeDate = async (id) => {
    if (!proposedDate) {
      alert("Wybierz datę przed zapisaniem.");
      return;
    }

    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, {
        scheduledDate: proposedDate,
        status: "OCZEKUJE NA AKCEPTACJĘ"
      });

      setClientRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, scheduledDate: proposedDate, status: "OCZEKUJE NA AKCEPTACJĘ" } : req
        )
      );

      setEditRequestId(null);
      setProposedDate("");
      showFeedback("success", "Zaproponowano termin klientowi.");
    } catch (error) {
      showFeedback("error", "Błąd podczas zapisu terminu.");
    }
  };

  const handleAcceptClientDate = async (id) => {
    try {
      const itemRef = doc(db, "userCarts", id);
      await updateDoc(itemRef, { status: "ZATWIERDZONY" });
      setClientRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: "ZATWIERDZONY" } : req
        )
      );
      showFeedback("success", "Termin zaproponowany przez klienta został zatwierdzony.");
    } catch (error) {
      console.error("Error accepting client date:", error);
      showFeedback("error", "Nie udało się zatwierdzić terminu.");
    }
  };

  const getPreferredDateLabel = (val) => {
    if (val === "pilne") return "jak najszybciej";
    if (val === "miesiac") return "w przyszłym miesiącu";
    if (val === "inny") return "w innym terminie";
    return val || "brak sugestii";
  };

  const getInspectionsList = (inspections) => {
    if (!inspections) return "brak";
    return Object.entries(inspections)
      .filter(([_, checked]) => checked)
      .map(([key]) => {
        switch (key) {
          case "specjalista": return "odbiór techniczny";
          case "budowlany": return "przegląd budowlany";
          case "gaz": return "instalacja gazowa";
          case "elektryka": return "instalacja elektryczna";
          case "wentylacja": return "wentylacja";
          default: return key;
        }
      })
      .join(", ") || "brak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = form.src;
      if (form.src && typeof form.src !== "string") {
        const imageRef = ref(storage, `images/${form.src.name}`);
        const snapshot = await uploadBytes(imageRef, form.src);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const postData = {
        title: form.title,
        content: form.content,
        content2: form.content2,
        categories: form.categories ? form.categories.split(",").map((cat) => cat.trim()) : [],
        type: form.type,
        src: imageUrl,
        w: form.w,
        h: form.h,
      };

      if (editingPost) {
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, postData);
        setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
        showFeedback("success", "Wpis zaktualizowany!");
      } else {
        const docRef = await addDoc(collection(db, "posts"), postData);
        setPosts(prev => [...prev, { id: docRef.id, ...postData }]);
        showFeedback("success", "Nowy wpis dodany!");
      }

      resetForm();
      setActiveTab("list");
    } catch (error) {
      showFeedback("error", "Błąd zapisu danych.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (activeTab === "form" && editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["blockquote", "code-block"],
              ["link", "image", "video", "button"],
              ["clean"],
            ],
            handlers: {
              button: function () {
                const cursorPosition = this.quill.getSelection()?.index || 0;
                const html = `<button class="main_button quill-button"><span>Kliknij mnie</span></button>`;
                this.quill.clipboard.dangerouslyPasteHTML(cursorPosition, html);
                this.quill.setSelection(cursorPosition + 1);
              },
            },
          },
          imageResize: { displaySize: true },
        },
      });
      quillRef.current = quill;
      quill.on("text-change", () => {
        setForm((prev) => ({ ...prev, content2: quill.root.innerHTML }));
      });
    }
    // Cleanup if switching away from form
    if (activeTab !== "form") {
      quillRef.current = null;
    }
  }, [activeTab]);

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Layout size={24} />
          <span>Panel Admina</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            <Inbox size={18} /> Zgłoszenia użytkowników
          </button>
          <button
            className={activeTab === "list" ? "active" : ""}
            onClick={() => setActiveTab("list")}
          >
            <FileText size={18} /> Wszystkie wpisy
          </button>
          <button
            className={activeTab === "form" ? "active" : ""}
            onClick={() => { resetForm(); setActiveTab("form"); }}
          >
            <Plus size={18} /> Nowy wpis
          </button>
          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart size={18} /> Analityka
          </button>

          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <button onClick={handleLogout} style={{ color: "#f56565", width: "100%" }}>
              <LogOut size={18} /> Wyloguj się
            </button>
          </div>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h2>
              {activeTab === "requests" ? "Zgłoszenia Użytkowników" :
                activeTab === "list" ? "Baza wpisów blogowych" :
                  activeTab === "analytics" ? "Analityka i Statystyki" :
                    editingPost ? "Edycja wpisu" : "Nowy wpis"}
            </h2>
            <p>
              {activeTab === "requests" ? `Liczba rezerwacji w systemie: ${clientRequests.length}` :
                activeTab === "list" ? `W systemie znajduje się ${posts.length} wpisów` :
                  activeTab === "analytics" ? "Przeglądaj dane o ruchu na Twojej stronie" :
                    "Wypełnij pola poniżej, aby opublikować wpis"}
            </p>
          </div>
          {activeTab === "form" && (
            <button className="btn-back" onClick={() => setActiveTab("list")}>
              <ChevronLeft size={18} /> Powrót do listy
            </button>
          )}
        </header>

        {feedback && (
          <div className={`admin-alert ${feedback.type}`}>
            {feedback.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
            {feedback.message}
          </div>
        )}

        <div className="admin-content">
          {activeTab === "analytics" ? (
            <AnalyticsView />
          ) : activeTab === "requests" ? (
            <section className="requests-container">
              {clientRequests.length === 0 ? (
                <div className="empty-state">Brak aktualnych zgłoszeń systemowych.</div>
              ) : (
                <div className="requests-grid">
                  {clientRequests.map((req) => (
                    <div key={req.id} className={`request-card ${req.status === "DO ZMIANY" ? "needs-attention" : ""}`}>
                      <div className="req-header">
                        <span className={`status-pill ${req.status === "ZATWIERDZONY" ? "confirmed" :
                          req.status === "OCZEKUJE NA AKCEPTACJĘ" ? "pending-user" :
                            req.status === "KLIENT PROPONUJE TERMIN" ? "pending-action" :
                              req.status === "DO ZMIANY" ? "needs-attention" : "pending"
                          }`}>
                          {req.status || (req.scheduledDate ? "ZATWIERDZONO (stare)" : "NOWE ZGŁOSZENIE")}
                        </span>
                        <div className="req-actions">
                          <button onClick={() => handleDeleteRequest(req.id)} className="action-delete" title="Usuń zgłoszenie">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="req-body">
                        <div className="req-row">
                          <strong><Calendar size={16} /> Termin:</strong>{" "}
                          {editRequestId === req.id ? (
                            <div className="date-propose-row">
                              <input
                                type="datetime-local"
                                value={proposedDate}
                                onChange={(e) => setProposedDate(e.target.value)}
                                className="date-input"
                              />
                              <button onClick={() => handleProposeDate(req.id)} className="btn-save-sm">Zapisz</button>
                              <button onClick={() => setEditRequestId(null)} className="btn-cancel-sm">Anuluj</button>
                            </div>
                          ) : (
                            <>
                              <span style={{ marginRight: '10px' }}>{formatDateTime(req.scheduledDate) || "Brak / nieustalony"}</span>
                              {req.status === "KLIENT PROPONUJE TERMIN" && (
                                <button onClick={() => handleAcceptClientDate(req.id)} className="btn-accept" style={{ marginRight: '10px' }}>
                                  Zatwierdź
                                </button>
                              )}
                              {req.status !== "ZATWIERDZONY" && (
                                <button onClick={() => { setEditRequestId(req.id); setProposedDate(req.scheduledDate || ""); }} className="btn-propose">
                                  {req.scheduledDate ? "Zmień / Zaproponuj nowy" : "Zaproponuj termin"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        <div className="req-row"><strong><MapPin size={16} /> Adres:</strong> {req.property?.propertyAddress || "Brak"}, {req.property?.nearestCity}</div>
                        <div className="req-row"><strong><Layout size={16} /> Typ budynku:</strong> {req.property?.propertyType}</div>
                        <div className="req-row"><strong><FileText size={16} /> Zakres prac:</strong> {getInspectionsList(req.property?.inspections)}</div>
                        <div className="req-row"><strong><Clock size={16} /> Preferowany czas:</strong> {getPreferredDateLabel(req.property?.preferredDate)}</div>
                        <div className="req-row"><strong><Mail size={16} /> Email klienta:</strong> {req.userEmail || req.contact?.email || "Brak"}</div>
                        {req.contact?.name && <div className="req-row"><strong><User size={16} /> Imię:</strong> {req.contact.name}</div>}
                        {req.contact?.phone && <div className="req-row"><strong><Phone size={16} /> Telefon:</strong> {req.contact.phone}</div>}
                        <div className="req-row"><strong><Clock size={16} /> Utworzono:</strong> {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleString() : "Brak danych o czasie"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : activeTab === "list" ? (
            <section className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post-row-card">
                  <div className="post-info">
                    <div className="post-image-mini">
                      {post.src ? <img src={post.src} alt="" /> : <ImageIcon size={20} />}
                    </div>
                    <div>
                      <h3>{post.title}</h3>
                      <div className="post-tags">
                        {post.categories.map((c, i) => <span key={i} className="tag">{c}</span>)}
                        <span className="type-badge">{post.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button className="action-edit" onClick={() => startEditing(post)} title="Edytuj">
                      <Edit3 size={18} />
                    </button>
                    <button className="action-delete" onClick={() => handleDelete(post.id)} title="Usuń">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="empty-state">Brak wpisów w bazie. Dodaj pierwszy post!</div>}
            </section>
          ) : (
            <section className="form-container">
              <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-grid">
                  <div className="form-group full">
                    <label><Type size={16} /> Tytuł wpisu</label>
                    <input
                      type="text"
                      required
                      placeholder="Wprowadź chwytliwy tytuł..."
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group full">
                    <label>Krótki nagłówek (Lead)</label>
                    <textarea
                      placeholder="Krótki opis widoczny na kafelku..."
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                  </div>

                  <div className="form-group half">
                    <label><Grid size={16} /> Wymiary (W x H)</label>
                    <div className="input-row">
                      <input type="number" value={form.w} onChange={(e) => setForm({ ...form, w: parseInt(e.target.value, 10) || 1 })} />
                      <span>x</span>
                      <input type="number" value={form.h} onChange={(e) => setForm({ ...form, h: parseInt(e.target.value, 10) || 1 })} />
                    </div>
                  </div>

                  <div className="form-group half">
                    <label>Kategorie (po przecinku)</label>
                    <input
                      type="text"
                      placeholder="np. Remont, Prawo, Porady"
                      value={form.categories}
                      onChange={(e) => setForm({ ...form, categories: e.target.value })}
                    />
                  </div>

                  <div className="form-group half">
                    <label>Zdjęcie wyróżniające</label>
                    <div className="file-input-wrapper">
                      <input type="file" onChange={(e) => setForm({ ...form, src: e.target.files[0] })} />
                      <div className="file-info">{form.src ? (typeof form.src === 'string' ? 'Podmieniasz obecne' : form.src.name) : 'Wybierz plik...'}</div>
                    </div>
                  </div>

                  <div className="form-group half">
                    <label>Typ wpisu</label>
                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="StandardPost">Standardowy (StandardPost)</option>
                      <option value="TextPost">Tylko tekst (TextPost)</option>
                      <option value="CategoriesPost">Kategoria (CategoriesPost)</option>
                    </select>
                  </div>
                </div>

                <div className="editor-section">
                  <label>Treść główna artykułu</label>
                  <div className="quill-wrapper">
                    <div id="editor" ref={editorRef}></div>
                  </div>
                </div>

                <div className="form-footer">
                  <button type="submit" className="btn-save" disabled={isSubmitting}>
                    {isSubmitting ? "Zapisywanie..." : <><Save size={18} /> {editingPost ? "Zapisz zmiany" : "Opublikuj wpis"}</>}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setActiveTab("list")}>
                    Anuluj
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

