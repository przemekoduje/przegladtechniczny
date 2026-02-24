// routes/AdminPanel/AdminPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import "./adminPanel.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import {
  LogOut,
  Plus,
  Trash2,
  ChevronRight,
  Send,
  Calendar,
  Layers,
  BarChart3,
  Users,
  MessageSquare,
  FileEdit,
  X,
  PlusCircle,
  Clock,
  ExternalLink,
  Sparkles,
  Zap,
  Layout,
  Inbox,
  FileText,
  BarChart,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  MapPin,
  Mail,
  User,
  Phone,
  Edit3,
  Type,
  Grid,
  Save,
  Tag,
  Check
} from "lucide-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { httpsCallable } from "firebase/functions";
import { db, storage, auth, functions } from "../../firebase";
import { signOut } from "firebase/auth";
import ButtonBlot from "../../components/quill/ButtonBlot.js";
import AnalyticsView from "./AnalyticsView";
import AIDraftEditor from "./AIDraftEditor";
import { useNavigate } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);
Quill.register("formats/button", ButtonBlot);

export default function AdminPanel() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [clientRequests, setClientRequests] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [activeTab, setActiveTab] = useState("requests"); // "list" | "form" | "analytics" | "requests" | "ai-drafts" | "keywords"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDraft, setEditingDraft] = useState(null); // For AI Draft Editor
  const [feedback, setFeedback] = useState(null);
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false); // Safeguard status

  // Draft Actions with Feedback (Phase 7)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [modalFeedback, setModalFeedback] = useState("");
  const [draftToProcess, setDraftToProcess] = useState(null);
  const [currentActionType, setCurrentActionType] = useState(null); // "publish" | "reject"

  // Appointment scheduling
  const [editRequestId, setEditRequestId] = useState(null);
  const [proposedDate, setProposedDate] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    content2: "",
    categories: "",
    tags: "",
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
      buttonOnClick: post.buttonOnClick || "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : ""
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
      buttonOnClick: "",
      tags: ""
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

    // Real-time listener for pending posts
    const q = query(collection(db, "pending_posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const drafts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingPosts(drafts);
    });

    // Listener for automation settings
    const unsubSettings = onSnapshot(doc(db, "settings", "blogAutomator"), (docSnap) => {
      if (docSnap.exists()) {
        setIsAutomationEnabled(docSnap.data().isNextCycleEnabled);
      } else {
        setIsAutomationEnabled(false);
      }
    });

    // Listener for keywords (Phase 8)
    const unsubKeywords = onSnapshot(doc(db, "settings", "blogKeywords"), (docSnap) => {
      if (docSnap.exists()) {
        setKeywords(docSnap.data().keywords || []);
      } else {
        setKeywords([]);
      }
    });

    return () => {
      unsubscribe();
      unsubSettings();
      unsubKeywords();
    };
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

  const handlePublishDraft = (draft) => {
    setDraftToProcess(draft);
    setModalFeedback("");
    setCurrentActionType("publish");
    setShowFeedbackModal(true);
  };

  const handleDeleteDraft = (draft) => {
    setDraftToProcess(draft);
    setModalFeedback("");
    setCurrentActionType("reject");
    setShowFeedbackModal(true);
  };

  const confirmDraftAction = async () => {
    if (!draftToProcess || !currentActionType) return;
    setIsSubmitting(true);
    try {
      // 1. Save feedback if provided (or just log the action for the AI loop)
      const { serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "blog_feedback"), {
        feedbackText: modalFeedback.trim() || (currentActionType === "publish" ? "Opublikowano bez dodatkowych uwag." : "Odrzucono bez szczegółowego powodu."),
        date: serverTimestamp(),
        draftTitle: draftToProcess.title,
        action: currentActionType // "publish" or "reject"
      });
      console.log(`Feedback for ${currentActionType} saved.`);

      if (currentActionType === "publish") {
        // PUBLISH LOGIC
        const updatedData = {
          ...draftToProcess,
          status: "published",
          publishedAt: serverTimestamp(),
          date: serverTimestamp(),
        };
        const { id, ...saveData } = updatedData;
        await addDoc(collection(db, "posts"), saveData);
        await deleteDoc(doc(db, "pending_posts", id));
        showFeedback("success", "Artykuł opublikowany!");
      } else {
        // REJECT LOGIC
        await deleteDoc(doc(db, "pending_posts", draftToProcess.id));
        showFeedback("success", "Szkic odrzucony.");
      }

      setShowFeedbackModal(false);
      setDraftToProcess(null);
      setCurrentActionType(null);
    } catch (error) {
      console.error(`Error during ${currentActionType}:`, error);
      showFeedback("error", `Błąd podczas akcji ${currentActionType}.`);
    } finally {
      setIsSubmitting(false);
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
        tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
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

  const handleUpdateDraft = async (id, updatedData) => {
    try {
      const draftRef = doc(db, "pending_posts", id);
      await updateDoc(draftRef, updatedData);
      showFeedback("success", "Szkic został zaktualizowany.");
      setEditingDraft(null);
    } catch (error) {
      showFeedback("error", "Błąd podczas aktualizacji szkicu.");
    }
  };

  const handleManualGeneration = async () => {
    setIsSubmitting(true);
    try {
      const genFunc = httpsCallable(functions, "generateDraftManual");
      showFeedback("success", "Rozpoczęto generowanie szkicu AI. Może to potrwać około 30-60 sekund...");
      const result = await genFunc();

      if (result.data.success) {
        showFeedback("success", "Nowy szkic AI został pomyślnie wygenerowany!");
      } else {
        showFeedback("error", `Błąd generowania: ${result.data.error || 'Nieznany błąd'}`);
      }
    } catch (error) {
      console.error("Error manual generation:", error);
      showFeedback("error", `Błąd generowania: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAutomation = async () => {
    setIsSubmitting(true);
    try {
      const toggleFunc = httpsCallable(functions, "setAutomationGate");
      await toggleFunc({ isEnabled: !isAutomationEnabled });
      showFeedback("success", isAutomationEnabled ? "Automatyzacja została wstrzymana." : "Autoryzowano kolejny automatyczny wpis!");
    } catch (error) {
      console.error("Error toggling automation:", error);
      showFeedback("error", "Błąd zmiany ustawień automatyzacji.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddKeyword = async (e) => {
    e.preventDefault();
    const newKeyword = e.target.keyword.value.trim();
    if (!newKeyword) return;
    if (keywords.includes(newKeyword)) {
      showFeedback("error", "To słowo kluczowe już istnieje.");
      return;
    }

    try {
      const updatedKeywords = [...keywords, newKeyword];
      await updateDoc(doc(db, "settings", "blogKeywords"), { keywords: updatedKeywords });
      e.target.reset();
      showFeedback("success", "Dodano słowo kluczowe.");
    } catch (error) {
      // If doc doesn't exist, create it
      try {
        await addDoc(collection(db, "settings"), { keywords: [newKeyword] }); // This is wrong, should be doc.set
      } catch (inner) {
        const adminRef = doc(db, "settings", "blogKeywords");
        await updateDoc(adminRef, { keywords: [newKeyword] }).catch(async () => {
          const { setDoc } = await import("firebase/firestore");
          // Actually, I can just use setDoc elsewhere or handle it properly
        });
      }
      showFeedback("error", "Błąd podczas dodawania słowa kluczowego.");
    }
  };

  // Improved add keyword with proper setDoc handling if needed
  const handleAddKeywordFixed = async (newKeyword) => {
    if (!newKeyword) return;
    try {
      const { setDoc } = await import("firebase/firestore");
      const ref = doc(db, "settings", "blogKeywords");
      await setDoc(ref, { keywords: [...keywords, newKeyword] }, { merge: true });
      showFeedback("success", "Dodano słowo kluczowe.");
    } catch (error) {
      showFeedback("error", "Błąd zapisu słowa.");
    }
  };

  const handleDeleteKeyword = async (kw) => {
    if (!window.confirm(`Czy na pewno usunąć "${kw}"?`)) return;
    try {
      const updatedKeywords = keywords.filter(item => item !== kw);
      await updateDoc(doc(db, "settings", "blogKeywords"), { keywords: updatedKeywords });
      showFeedback("success", "Usunięto słowo kluczowe.");
    } catch (error) {
      showFeedback("error", "Błąd podczas usuwania.");
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

          <button
            className={activeTab === "ai-drafts" ? "active" : ""}
            onClick={() => setActiveTab("ai-drafts")}
          >
            <Sparkles size={18} /> Szkice AI
            {pendingPosts.length > 0 && <span className="nav-badge">{pendingPosts.length}</span>}
          </button>

          <button
            className={activeTab === "keywords" ? "active" : ""}
            onClick={() => setActiveTab("keywords")}
          >
            <Tag size={18} /> Słowa kluczowe
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
                    activeTab === "ai-drafts" ? "Szkice AI (Blog Automator)" :
                      activeTab === "keywords" ? "Zarządzanie Słowami Kluczowymi" :
                        editingPost ? "Edycja wpisu" : "Nowy wpis"}
            </h2>
            <p>
              {activeTab === "requests" ? `Liczba rezerwacji w systemie: ${clientRequests.length}` :
                activeTab === "list" ? `W systemie znajduje się ${posts.length} wpisów` :
                  activeTab === "analytics" ? "Przeglądaj dane o ruchu na Twojej stronie" :
                    activeTab === "ai-drafts" ? `AI wygenerowało ${pendingPosts.length} szkiców oczekujących na zatwierdzenie` :
                      activeTab === "keywords" ? `W bazie znajduje się ${keywords.length} słów kluczowych` :
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
          ) : activeTab === "ai-drafts" ? (
            <section className="drafts-container">
              <header className="drafts-section-header">
                <div className="header-info">
                  <h3>Oczekujące szkice</h3>
                  <div className={`automation-status ${isAutomationEnabled ? 'status-active' : 'status-locked'}`}>
                    <div className="status-dot"></div>
                    <span>{isAutomationEnabled ? 'Automatyzacja: GOTOWA' : 'Automatyzacja: WSTRZYMANA'}</span>
                  </div>
                </div>

                <div className="header-actions">
                  {!isAutomationEnabled && (
                    <button
                      className="btn-enable-automation"
                      onClick={handleToggleAutomation}
                      disabled={isSubmitting}
                    >
                      <Zap size={16} /> Autoryzuj kolejny wpis
                    </button>
                  )}
                  <button
                    className="btn-trigger-ai"
                    onClick={handleManualGeneration}
                    disabled={isSubmitting}
                  >
                    <Sparkles size={16} />
                    {isSubmitting ? "Generowanie..." : "Generuj ręcznie teraz"}
                  </button>
                </div>
              </header>

              {pendingPosts.length === 0 ? (
                <div className="empty-state">Brak nowych szkiców AI. Sprawdź ponownie rano!</div>
              ) : (
                <div className="drafts-grid">
                  {pendingPosts.map((draft) => (
                    <div key={draft.id} className="draft-card">
                      <div className="draft-image">
                        {draft.src ? <img src={draft.src} alt="" /> : <ImageIcon size={32} />}
                      </div>
                      <div className="draft-content">
                        <h3>{draft.title}</h3>
                        <div
                          className="draft-description"
                          dangerouslySetInnerHTML={{ __html: draft.content }}
                        />
                        {draft.content2 && (
                          <div
                            className="draft-body-preview"
                            style={{ fontSize: "0.85rem", color: "#718096", marginTop: "0.5rem", maxHeight: "60px", overflow: "hidden" }}
                            dangerouslySetInnerHTML={{ __html: draft.content2.substring(0, 150) + "..." }}
                          />
                        )}
                        <div className="draft-meta">
                          {draft.categories?.map((cat, i) => <span key={i} className="mini-badge">{cat}</span>)}
                          <span className="date-badge">
                            {draft.createdAt ? new Date(draft.createdAt.seconds * 1000).toLocaleDateString() : 'Nowy'}
                          </span>
                        </div>
                      </div>
                      <div className="draft-actions">
                        <button className="btn-edit" onClick={() => setEditingDraft(draft)}>
                          <FileEdit size={16} /> Edytuj
                        </button>
                        <button className="btn-reject" onClick={() => handleDeleteDraft(draft)}>
                          <X size={16} /> Odrzuć
                        </button>
                        <button className="btn-publish" onClick={() => handlePublishDraft(draft)} disabled={isSubmitting}>
                          <Check size={16} /> Publikuj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
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
          ) : activeTab === "keywords" ? (
            <section className="keywords-manager">
              <div className="keywords-form-box">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddKeywordFixed(e.target.keyword.value.trim());
                  e.target.reset();
                }}>
                  <input name="keyword" type="text" placeholder="Dodaj nowe słowo kluczowe..." required />
                  <button type="submit" className="btn-add-keyword">
                    <PlusCircle size={18} /> Dodaj
                  </button>
                </form>
              </div>

              <div className="keywords-list">
                {keywords.length === 0 ? (
                  <p className="empty-state">Brak zdefiniowanych słów kluczowych.</p>
                ) : (
                  <div className="kw-tags-grid">
                    {keywords.map((kw, i) => (
                      <div key={i} className="kw-tag-item">
                        <span>{kw}</span>
                        <button onClick={() => handleDeleteKeyword(kw)} className="btn-del-kw">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

                  <div className="form-group full">
                    <label>Tagi (po przecinku, np. #bezpieczeństwo, #inspekcja)</label>
                    <input
                      type="text"
                      placeholder="np. dach, kontrola, prawo"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
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

          {/* Unified Feedback Modal (Phase 7) */}
          {showFeedbackModal && (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <div className="modal-header">
                  <h3>{currentActionType === "publish" ? "Publikacja artykułu" : "Odrzucenie szkicu"}</h3>
                  <button onClick={() => setShowFeedbackModal(false)}><X size={20} /></button>
                </div>
                <div className="modal-body">
                  <p>
                    {currentActionType === "publish"
                      ? "Gratulacje! Zanim opublikujesz, możesz dodać uwagi dla AI, co najbardziej podobało Ci się w tym tekście lub co warto utrzymać w przyszłości."
                      : "Podaj powód odrzucenia. Twoje uwagi zostaną wzięte pod uwagę przez AI przy generowaniu kolejnego tekstu."}
                  </p>
                  <textarea
                    placeholder={currentActionType === "publish"
                      ? "np. Świetny ton, bardzo dobre wypunktowanie instalacji..."
                      : "np. Zbyt oficjalny język, brak konkretów o dachach, popraw dane o art. 62..."}
                    value={modalFeedback}
                    onChange={(e) => setModalFeedback(e.target.value)}
                    style={{ width: "100%", minHeight: "120px", padding: "12px", borderRadius: "8px", border: "1px solid #edf2f7", marginTop: "1rem" }}
                  />
                </div>
                <div className="modal-footer" style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowFeedbackModal(false)}
                    style={{ padding: "10px 20px" }}
                  >
                    Anuluj
                  </button>
                  <button
                    className="btn-publish"
                    onClick={confirmDraftAction}
                    disabled={isSubmitting}
                    style={{ background: currentActionType === "publish" ? "#10b981" : "#f56565", padding: "10px 20px" }}
                  >
                    {isSubmitting ? "Przetwarzanie..." : (currentActionType === "publish" ? "Publikuj i zapisz uwagi" : "Odrzuć i zapisz uwagi")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div> {/* admin-content */}
      </main>

      {editingDraft && (
        <AIDraftEditor
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
          onSave={handleUpdateDraft}
        />
      )}
    </div>
  );
}

