// Aktualizacja pliku SinglePostPopup.jsx na potrzeby Firebase
import React, { useEffect, useState } from "react";
import "./singlePostPopup.scss";

export default function SinglePostPopup({ post, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div className={`popup-overlay ${isClosing ? "popup-hide" : ""}`}>
      <div className="popup-cont">
        <div className="short-background"></div>
        <button className="close-button" onClick={handleClose}>
          x
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
          <img
            src={post.src}
            alt={post.title}
            className="popup-image"
          />
        )}
        {post.content2 && (
          <div
            className="popup-content2"
            dangerouslySetInnerHTML={{ __html: post.content2 }}
          />
        )}
      </div>
    </div>
  );
}
