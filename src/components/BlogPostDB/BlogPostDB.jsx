// Aktualizacja pliku BlogPostDB.jsx
import React from "react";
import PropTypes from "prop-types";
import "./blogPostDB.scss";

const pastelColors = [
  "#FEFAE0",
  "#FAEDCD",
  "#E9EDC9",
  "#DDB58F",
  "#CCD5AE",
  "#D4A373",
];

const BlogPostDB = ({
  id,
  src,
  title,
  content,
  type,
  categories,
  borderRadius,
  specialCorner,
  onCategoryClick,
  hasSvg,
  onTitleClick,
}) => {
  // Funkcja wyznaczająca pastelowy kolor tła
  const getPastelColor = (postId) => {
    const index = parseInt(postId, 10) % pastelColors.length;
    return pastelColors[index];
  };

  // Obsługa kliknięcia w tytuł, by nie uruchamiał się drag
  const handleTitleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (onTitleClick) {
      onTitleClick();
    }
  };

  // Wybór koloru tła dla TextPost
  let postBgColor;
  if (type === "TextPost") {
    postBgColor = getPastelColor(id);
  }

  const borderRadiusStyle =
    typeof borderRadius === "string" ? { borderRadius } : borderRadius;

  // Różne layouty w zależności od typu posta
  if (type === "StandardPost") {
    return (
      <div className="post standard-post" style={borderRadiusStyle}>
        <img src={src} alt={title} loading="lazy" />
        <div
          className="wrapper"
          style={{
            background: hasSvg
              ? 'url("/images/Subtract.svg") no-repeat bottom left / contain'
              : "none",
          }}
        >
          <div className="post-content">
            <span className="cat">
              {categories.map((cat, i) => (
                <span className="cat-item" key={i}>{cat}</span>
              ))}
            </span>
            <h2 className="postTitle" onClick={handleTitleClick}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (type === "TextPost") {
    const backgroundColor = getPastelColor(id);
    return (
      <>
        <div
          className="post text-post"
          style={{
            border: `3px solid ${backgroundColor}`,
            ...borderRadiusStyle,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="post-content">
            <h2 className="postTitle" onClick={handleTitleClick}>
              {title}
            </h2>
            <p>{content}</p>
          </div>
        </div>
        {specialCorner && (
          <div
            className="corner-wrapper"
            style={{
              position: "absolute",
              zIndex: 10,
            }}
          >
            <div
              className="corner-square"
              style={{
                zIndex: 11,
                border: `3px solid ${backgroundColor}`,
                borderRight: "none",
                borderTop: "none",
              }}
            />
            <button
              className="corner-btn-large"
              style={{ backgroundColor: postBgColor, zIndex: 12 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // Tu można dodać logikę kliknięcia w "corner" (jeśli jest potrzebna)
              }}
            >
              <span className="corner-icon">+</span>
            </button>
          </div>
        )}
      </>
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

  // Fallback – jeśli type nie jest rozpoznany (np. StandardPost domyślnie)
  return (
    <div className="post standard-post" style={borderRadiusStyle}>
      <img src={src} alt={title} loading="lazy" />
      <div className="post-content">
        <h2 className="postTitle" onClick={handleTitleClick}>
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
  type: PropTypes.oneOf(["StandardPost", "TextPost"]),
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
  hasSvg: PropTypes.bool,
};

BlogPostDB.defaultProps = {
  src: "",
  content: "",
  categories: [],
  borderRadius: "18px",
  specialCorner: false,
  hasSvg: false,
};

export default BlogPostDB;
