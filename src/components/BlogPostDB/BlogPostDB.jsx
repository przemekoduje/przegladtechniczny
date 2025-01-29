// Aktualizacja pliku BlogPostDB.jsx na potrzeby pracy z Firebase
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
  const getPastelColor = (id) => {
    const index = parseInt(id, 10) % pastelColors.length;
    return pastelColors[index];
  };

  const borderRadiusStyle =
    typeof borderRadius === "string" ? { borderRadius } : borderRadius;

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
                <span key={i} onClick={() => onCategoryClick && onCategoryClick(cat)}>
                  {cat}
                </span>
              ))}
            </span>
            <h2 onClick={onTitleClick}>{title}</h2>
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
            <h2 onClick={onTitleClick}>{title}</h2>
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
            ></div>
            <button
              className="corner-btn-large"
              style={{ backgroundColor: backgroundColor, zIndex: 12 }}
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
              onClick={() => onCategoryClick && onCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="post standard-post" style={borderRadiusStyle}>
      <img src={src} alt={title} loading="lazy" />
      <div className="post-content">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

BlogPostDB.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  type: PropTypes.oneOf(["StandardPost", "TextPost", "CategoriesPost"])
    .isRequired,
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

BlogPostDB.defaultProps = {
  src: "",
  content: "",
  categories: [],
  borderRadius: "18px",
  specialCorner: false,
};

export default BlogPostDB;