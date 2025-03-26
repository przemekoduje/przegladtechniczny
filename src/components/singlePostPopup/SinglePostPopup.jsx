// Aktualizacja pliku SinglePostPopup.jsx na potrzeby Firebase
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./singlePostPopup.scss";
import { db } from "../../firebase"; // Upewnij się, że ścieżka do pliku firebase.js jest prawidłowa
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";

export default function SinglePostPopup({
  post,
  onClose,
  user,
  scrollToComments,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  // Ref do poprzedniej wartości user
  const prevUserRef = useRef(user);

  useEffect(() => {
    if (scrollToComments) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollToComments]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  // 1. POBIERANIE komentarzy z subkolekcji "comments" w dokumencie postu
  useEffect(() => {
    if (!post?.id) return;

    const commentsRef = collection(db, "posts", post.id, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [post?.id]);

  // 2. DODAWANIE nowego komentarza
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      // Przechodzimy do logowania z parametrem "redirect"
      navigate(`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`);
      return;
    }
    if (!newComment.trim()) {
      return; // Pusta treść komentarza
    }
    try {
      const commentsRef = collection(db, "posts", post.id, "comments");
      await addDoc(commentsRef, {
        content: newComment,
        userEmail: user.email,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Błąd przy dodawaniu komentarza:", error);
    }
  };

  // *** TYLKO po zalogowaniu: przewijamy do sekcji komentarzy,
  // ale wyłącznie gdy user przechodzi z "null" do obiektu.
  useEffect(() => {
    // Jeżeli poprzedni user był null, a obecny jest nie-null,
    // to znaczy, że właśnie się zalogowano
    if (prevUserRef.current === null && user != null) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Zaktualizuj ref poprzedniego usera
    prevUserRef.current = user;
  }, [user]);

  return (
    <div className={`popup-overlay ${isClosing ? "popup-hide" : ""}`}>
      <div className="popup-cont">
        <div className="short-background"></div>
        <button className="close-button" onClick={handleClose}>
          <CloseIcon />
        </button>
        <h1 className="popup-title">{post.title}</h1>
        {post.categories && (
          <div className="post-categories">
            {post.categories.map((category, index) => (
              <span key={index} className="category">
                {category}
              </span>
            ))}
          </div>
        )}
        {post.src && (
          <img src={post.src} alt={post.title} className="popup-image" />
        )}
        {post.content && (
          <div
            className="popup-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
        {post.content2 && (
          <div
            className="popup-content2"
            dangerouslySetInnerHTML={{ __html: post.content2 }}
          />
        )}

        {/* SEKCJA WYŚWIETLANIA KOMENTARZY */}
        <div className="comments-section" id="commentsSection">
          <h2>Komentarze</h2>
          {comments.length === 0 ? (
            <p>Brak komentarzy. Bądź pierwszy!</p>
          ) : (
            <ul className="comments-list">
              {comments.map((comment) => {
                // Wyciągamy przedrostek e-maila przed "@"
                const emailPrefix =
                  comment.userEmail?.split("@")[0] || "Anonim";

                return (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <strong>{emailPrefix}</strong>{" "}
                      <span style={{ fontSize: "0.8rem" }}>
                        {comment.timestamp?.toDate().toLocaleString("pl-PL") ||
                          ""}
                      </span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* FORMULARZ DODAWANIA KOMENTARZA (tylko jeśli user jest zalogowany) */}
        <div className="comment-form">
          {user ? (
            <form onSubmit={handleAddComment}>
              <textarea
                placeholder="Napisz komentarz..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Dodaj komentarz</button>
            </form>
          ) : (
            // Komunikat + link do logowania
            <p style={{ color: "gray" }}>
              Musisz być zalogowany.{" "}
              <Link
                to={`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`}
                style={{ color: "#0066cc" }}
              >
                Zaloguj się
              </Link>{" "}
              aby dodać komentarz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
