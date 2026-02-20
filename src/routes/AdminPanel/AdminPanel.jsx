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
  BarChart
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
import { db, storage } from "../../firebase";
import ButtonBlot from "../../components/Quill/ButtonBlot.js";
import AnalyticsView from "./AnalyticsView";

Quill.register("modules/imageResize", ImageResize);
Quill.register("formats/button", ButtonBlot);

export default function AdminPanel() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("list"); // "list" | "form"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

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
    fetchPosts();
  }, []);

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
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h2>
              {activeTab === "list" ? "Baza wpisów blogowych" :
                activeTab === "analytics" ? "Analityka i Statystyki" :
                  editingPost ? "Edycja wpisu" : "Nowy wpis"}
            </h2>
            <p>
              {activeTab === "list" ? `W systemie znajduje się ${posts.length} wpisów` :
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

