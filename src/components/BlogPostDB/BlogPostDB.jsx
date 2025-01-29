// Aktualizacja pliku BlogPostDB.jsx na potrzeby pracy z Firebase i zapobieganie konfliktowi przesuwania
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

  const handleTitleClick = (event) => {
    event.stopPropagation(); // Zapobiega propagacji kliknięcia na rodzica
    event.preventDefault(); // Zapobiega przypadkowemu uruchomieniu innych eventów
    if (onTitleClick) {
      onTitleClick({ id, title, content, src, categories });
    }
  };

  return (
    <div
      className={`post ${type.toLowerCase()}-post`}
      style={borderRadiusStyle}
      onMouseDown={(e) => e.stopPropagation()} // Blokuje propagację eventu kliknięcia
    >
      {src && <img src={src} alt={title} loading="lazy" />}
      <div
        className="wrapper"
        style={{
          background: hasSvg
            ? 'url("/images/Subtract.svg") no-repeat bottom left / contain'
            : "none",
        }}
      >
        <div className="post-content">
          {categories && categories.length > 0 && (
            <span className="cat">
              {categories.map((cat, i) => (
                <span key={i} onClick={(e) => { e.stopPropagation(); onCategoryClick && onCategoryClick(cat); }}>
                  {cat}
                </span>
              ))}
            </span>
          )}
          <h2 onClick={handleTitleClick} style={{ cursor: "pointer", userSelect: "none" }}>
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

BlogPostDB.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  type: PropTypes.oneOf(["StandardPost", "TextPost"])
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
