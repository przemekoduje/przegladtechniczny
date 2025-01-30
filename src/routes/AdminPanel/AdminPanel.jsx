// Aktualizacja pliku AdminPanel.jsx na obsługę uploadu obrazów
import React, { useState, useEffect, useRef } from "react";
import "./adminPanel.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";

Quill.register("modules/imageResize", ImageResize);

export default function AdminPanel() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    content2: "",
    categories: "",
    src: null,
    type: "StandardPost",
    w: 1,
    h: 1,
  });
  const [editingPost, setEditingPost] = useState(null);

  const startEditing = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      content2: post.content2 || "",
      categories: Array.isArray(post.categories) ? post.categories.join(", ") : "", // Poprawka: zawsze tablica

      type: post.type,
      src: post.src || null,
      w: post.w,
      h: post.h,
    });

    if (quillRef.current) {
      quillRef.current.root.innerHTML = post.content2 || "";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          categories: Array.isArray(doc.data().categories) ? doc.data().categories : [], // Poprawka: zawsze tablica

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
      console.log("Post został usunięty.");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        await updateDoc(postRef, {
          title: form.title,
          content: form.content,
          content2: form.content2,
          categories: form.categories.split(",").map((cat) => cat.trim()),
          type: form.type,
          src: imageUrl,
          w: form.w,
          h: form.h,
        });
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id ? { ...post, ...form, src: imageUrl } : post
          )
        );
        
      } else {
        const docRef = await addDoc(collection(db, "posts"), {
          title: form.title,
          content: form.content,
          content2: form.content2,
          categories: form.categories.split(",").map((cat) => cat.trim()),
          type: form.type,
          src: imageUrl,
          w: form.w,
          h: form.h,
        });
        setPosts((prevPosts) => [...prevPosts, { id: docRef.id, ...form, src: imageUrl }]);
      }

      setForm({
        title: "",
        content: "",
        content2: "",
        categories: "",
        src: null,
        type: "StandardPost",
        w: 1,
        h: 1,
      });
      if (quillRef.current) {
        quillRef.current.root.innerHTML = "";
      }

      setEditingPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      quillRef.current = quill;

      quill.on("text-change", () => {
        setForm((prevForm) => ({
          ...prevForm,
          content2: quill.root.innerHTML,
        }));
      });
    }
  }, []);

  return (
    <div className="admin-panel">
      <h1>Panel Administracyjny</h1>

      <section className="posts-list">
        <h2>Lista Wpisów</h2>
        <table>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Kategorie</th>
              <th>Typ</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{Array.isArray(post.categories) ? post.categories.join(", ") : "Brak kategorii"}</td> {/* Poprawka: zawsze tablica */}

                <td>{post.type}</td>
                <td>
                  <button onClick={() => startEditing(post)}>Edytuj</button>
                  <button onClick={() => handleDelete(post.id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="post-form">
        <h2>Dodaj Nowy Wpis</h2>
        <form onSubmit={handleSubmit}>
          
           <div>
            <label>Szerokosc (w)</label>
            <input
              type="number"
              value={form.w}
              onChange={(e) => setForm({ ...form, w: parseInt(e.target.value, 10) || 0 })}
            />
          </div>
          <div>
            <label>Wysokosc (h)</label>
            <input
              type="number"
              value={form.h}
              onChange={(e) => setForm({ ...form, h: parseInt(e.target.value, 10) || 0 })}
            />
          </div>
          <div>
            <label>Tytuł:</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label>Nagłówek:</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div>
            <label>Treść:</label>
            <div id="editor" ref={editorRef}></div>
          </div>
          <div>
            <label>Kategorie:</label>
            <input
              type="text"
              value={form.categories}
              onChange={(e) => setForm({ ...form, categories: e.target.value })}
            />
          </div>
          <div>
            <label>Obrazek:</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, src: e.target.files[0] })}
            />
          </div>
          <div>
            <label>Typ:</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="StandardPost">StandardPost</option>
              <option value="TextPost">TextPost</option>
              <option value="CategoriesPost">CategoriesPost</option>
            </select>
          </div>
          <button type="submit">
            {editingPost ? "Zapisz zmiany" : "Dodaj post"}
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={() => {
                setEditingPost(null);
                setForm({
                  title: "",
                  content: "",
                  content2: "",
                  categories: "",
                  src: null,
                  type: "StandardPost",
                  w: 1,
                  h: 1,
                });
                if (quillRef.current) {
                  quillRef.current.root.innerHTML = "";
                }
              }}
            >
              Anuluj
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
