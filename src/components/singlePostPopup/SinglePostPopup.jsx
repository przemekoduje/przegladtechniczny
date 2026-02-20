// Aktualizacja pliku SinglePostPopup.jsx na potrzeby Firebase
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./singlePostPopup.scss";
import { db } from "../../firebase";
import {
  collection,
  query,
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
  const [imgError, setImgError] = useState(false);

  const navigate = useNavigate();
  const prevUserRef = useRef(user);
  const scrolledOnLoginRef = useRef(false);

  const fallbackSrc = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200";

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate(`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`);
      return;
    }
    if (!newComment.trim()) return;
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

  useEffect(() => {
    if (prevUserRef.current === null && user != null && !scrolledOnLoginRef.current) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
        scrolledOnLoginRef.current = true;
      }
    }
    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    if (scrollToComments) {
      const commentsSectionEl = document.getElementById("commentsSection");
      if (commentsSectionEl) {
        commentsSectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollToComments]);

  return (
    <div
      className={`popup-overlay ${isClosing ? "popup-hide" : ""}`}
      onClick={(e) => {
        if (e.target.classList.contains("popup-overlay")) {
          handleClose();
        }
      }}
    >
      <div className="popup-cont" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          <CloseIcon />
        </button>

        <img
          src={imgError || !post.src ? fallbackSrc : post.src}
          alt={post.title}
          className="popup-image"
          onError={() => setImgError(true)}
        />

        <div className="popup-body">
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

          <div className="comments-section" id="commentsSection">
            <h2>Komentarze ({comments.length})</h2>
            {comments.length === 0 ? (
              <p style={{ color: '#718096' }}>Brak komentarzy. Bądź pierwszy!</p>
            ) : (
              <ul className="comments-list">
                {comments.map((comment) => {
                  const emailPrefix = comment.userEmail?.split("@")[0] || "Anonim";
                  return (
                    <li key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <strong>{emailPrefix}</strong>
                        <span>
                          {comment.timestamp?.toDate().toLocaleString("pl-PL") || ""}
                        </span>
                      </div>
                      <div className="comment-content">{comment.content}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

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
              <p style={{ color: "#718096", fontSize: '15px' }}>
                Musisz być zalogowany, aby dodać komentarz.{" "}
                <Link
                  to={`/login?redirect=blogPost&postId=${post.id}&afterLogin=1`}
                  style={{ color: "#38b2ac", fontWeight: '700' }}
                >
                  Zaloguj się
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
