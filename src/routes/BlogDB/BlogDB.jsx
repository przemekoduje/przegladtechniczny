// Aktualizacja pliku BlogDB.jsx na Firebase
import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./blogDB.scss";
import BlogPostDB from "../../components/BlogPostDB/BlogPostDB";
import SinglePostPopup from "../../components/singlePostPopup/SinglePostPopup";
import Menu from "../../components/menu/Menu";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function BlogDB() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Funkcja do aktualizacji windowWidth
    const handleResize = () => setWindowWidth(window.innerWidth);
    // Nasłuchujemy zdarzeń resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pobieranie postów z Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Otwieranie i zamykanie posta w popupie
  const openPost = (post) => setSelectedPost(post);
  const closePost = () => setSelectedPost(null);

  // Wyznaczanie unikalnych kategorii
  const allCategories = posts.reduce((acc, post) => {
    if (Array.isArray(post.categories)) {
      return acc.concat(post.categories);
    }
    return acc;
  }, []);
  const uniqueCategories = [...new Set(allCategories)];

  // Losowanie podzbioru kategorii (do wyświetlania w CategoriesPost)
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const randomCategories = shuffleArray(uniqueCategories).slice(0, 5);

  // Filtrowanie i sortowanie postów
  const finalPosts = useMemo(() => {
    const categoriesPost = posts.find((p) => p.type === "CategoriesPost");
    const sortedPosts = posts
      .filter((p) => p.type !== "CategoriesPost")
      .sort((a, b) => {
        const aHasCat = selectedCategory && a.categories?.includes(selectedCategory);
        const bHasCat = selectedCategory && b.categories?.includes(selectedCategory);
        if (aHasCat && !bHasCat) return -1;
        if (!aHasCat && bHasCat) return 1;
        return new Date(b.date) - new Date(a.date);
      });
    // Wstawiamy CategoriesPost (jeśli istnieje) na 5. pozycję
    if (categoriesPost) {
      const indexToInsert = Math.min(4, sortedPosts.length);
      sortedPosts.splice(indexToInsert, 0, categoriesPost);
    }
    return sortedPosts;
  }, [selectedCategory, posts]);

  // Początkowe layouty dla różnych rozmiarów ekranu
  const [layouts, setLayouts] = useState({
    lg: finalPosts.map((item, index) => ({
      i: item.id,
      x: (index % 4),
      y: Math.floor(index / 4),
      w: item.w,
      h: item.h,
      static: false,
    })),
  });

  // Uaktualnianie layoutów po zmianie listy postów
  useEffect(() => {
    const createLayout = (cols) => {
      return finalPosts.map((post, index) => ({
        i: post.id,
        x: index % cols,
        y: Math.floor(index / cols),
        w: post.w,
        h: post.h,
        static: false,
      }));
    };
    setLayouts((prev) => ({
      ...prev,
      lg: createLayout(4),
      md: createLayout(3),
      sm: createLayout(2),
      xs: createLayout(1),
    }));
  }, [finalPosts]);

  const handleCategoryClick = (category) => setSelectedCategory(category);

  // 2. Wyznaczamy, czy obecnie jesteśmy na mobile (np. < 768px)
  const isMobile = windowWidth < 768;

  return (
    <div className="masonry-grid-container">
      <Menu />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={300}
        onLayoutChange={(layout, allLayouts) => setLayouts(allLayouts)}
        compactType="vertical"
        preventCollision={false}
        // Ważne: kliknięcie w .postTitle nie będzie rozpoczynać drag
        draggableCancel=".postTitle, .corner-btn-large, .category-button"

        // 3. Wyłączamy drag i resize na mobile
        isDraggable={!isMobile}
        isResizable={!isMobile}
      >
        {finalPosts.map((post) => (
          <div
            key={post.id}
            className={`grid-item ${post.w === 2 ? "wide" : ""} ${post.h === 2 ? "tall" : ""}`}
          >
            <BlogPostDB
              id={post.id}
              src={post.src}
              title={post.title}
              content={post.content}
              type={post.type}
              categories={post.type === "CategoriesPost" ? randomCategories : post.categories}
              borderRadius={post.borderRadius}
              specialCorner={post.specialCorner}
              date={post.date}
              onTitleClick={() => openPost(post)}
              onCategoryClick={handleCategoryClick}
              hasSvg={post.hasSvg}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
      {selectedPost && <SinglePostPopup post={selectedPost} onClose={closePost} />}
    </div>
  );
}
