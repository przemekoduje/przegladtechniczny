// Aktualizacja pliku BlogPostDB.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./blogPostDB.scss";
import { useNavigate } from "react-router-dom";

const BlogPostDB = ({
  id,
  src = "",
  title,
  content = "",
  type,
  categories = [],
  borderRadius = "24px",
  specialCorner = false,
  onCategoryClick,
  onTitleClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  // Placeholder image when Firestore/Firebase fails
  const fallbackSrc = "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800";

  const handleTitleClick = (event) => {
    navigate(`/blogDB?openPost=${id}`);
    event.stopPropagation();
    event.preventDefault();
    if (onTitleClick) {
      onTitleClick();
    }
  };

  const borderRadiusStyle =
    typeof borderRadius === "string" ? { borderRadius } : borderRadius;

  if (type === "StandardPost") {
    return (
      <div className="post standard-post" style={borderRadiusStyle}>
        <img
          src={imgError || !src ? fallbackSrc : src}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="wrapper">
          <div className="post-content">
            <div className="cat">
              {categories.map((cat, i) => (
                <span className="cat-item" key={i}>{cat}</span>
              ))}
            </div>
            <h2 className="postTitle" onClick={handleTitleClick}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (type === "TextPost") {
    return (
      <div className="post text-post" style={borderRadiusStyle}>
        <div className="post-content">
          <h2 className="postTitle" onClick={handleTitleClick}>
            {title}
          </h2>
          <p>{content?.replace(/(<([^>]+)>)/gi, "")}</p>
        </div>
        {specialCorner && (
          <div className="corner-wrapper">
            <button
              className="corner-btn-large"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleTitleClick(e);
              }}
            >
              <span className="corner-icon">+</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (type === "CategoriesPost") {
    return (
      <div className="post categories-post" style={borderRadiusStyle}>
        <div className="categories-buttons">
          {categories.slice(0, 10).map((category, index) => (
            <button
              key={index}
              className="category-button"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="post standard-post" style={borderRadiusStyle}>
      <div className="post-content" style={{ padding: '20px' }}>
        <h2 className="postTitle" onClick={handleTitleClick} style={{ color: '#333' }}>
          {title}
        </h2>
      </div>
    </div>
  );
};

BlogPostDB.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  type: PropTypes.oneOf(["StandardPost", "TextPost", "CategoriesPost"]),
  categories: PropTypes.arrayOf(PropTypes.string),
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      borderTopLeftRadius: PropTypes.string,
      borderTopRightRadius: PropTypes.string,
      borderBottomLeftRadius: PropTypes.string,
      borderBottomRightRadius: PropTypes.string,
    }),
  ]),
  specialCorner: PropTypes.bool,
  onCategoryClick: PropTypes.func,
  onTitleClick: PropTypes.func,
};

export default BlogPostDB;
