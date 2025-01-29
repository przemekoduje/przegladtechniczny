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

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  const allCategories = posts.reduce((acc, post) => {
    if (post.categories && Array.isArray(post.categories)) {
      return acc.concat(post.categories);
    }
    return acc;
  }, []);

  const uniqueCategories = [...new Set(allCategories)];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const randomCategories = shuffleArray(uniqueCategories).slice(0, 5);

  const finalPosts = useMemo(() => {
    const categoriesPost = posts.find((post) => post.type === "CategoriesPost");

    const sortedPosts = posts
      .filter((post) => post.type !== "CategoriesPost")
      .sort((a, b) => {
        const aHasCat =
          selectedCategory && a.categories.includes(selectedCategory);
        const bHasCat =
          selectedCategory && b.categories.includes(selectedCategory);

        if (aHasCat && !bHasCat) return -1;
        if (!aHasCat && bHasCat) return 1;

        return new Date(b.date) - new Date(a.date);
      });

    if (categoriesPost) {
      const indexToInsert = Math.min(4, sortedPosts.length);
      sortedPosts.splice(indexToInsert, 0, categoriesPost);
    }

    return sortedPosts;
  }, [selectedCategory, posts]);

  const [layouts, setLayouts] = useState({
    lg: finalPosts.map((item, index) => ({
      i: item.id,
      x: (index % 4) * item.w,
      y: Math.floor(index / 4),
      w: item.w,
      h: item.h,
      static: false,
    })),
  });

  useEffect(() => {
    const newLayoutLg = finalPosts.map((post, index) => ({
      i: post.id,
      x: index % 4,
      y: Math.floor(index / 4),
      w: post.w,
      h: post.h,
      static: false,
    }));

    const newLayoutMd = finalPosts.map((post, index) => ({
      i: post.id,
      x: index % 3,
      y: Math.floor(index / 3),
      w: post.w,
      h: post.h,
      static: false,
    }));

    const newLayoutSm = finalPosts.map((post, index) => ({
      i: post.id,
      x: index % 2,
      y: Math.floor(index / 2),
      w: post.w,
      h: post.h,
      static: false,
    }));

    const newLayoutXs = finalPosts.map((post, index) => ({
      i: post.id,
      x: index % 1,
      y: Math.floor(index / 1),
      w: post.w,
      h: post.h,
      static: false,
    }));

    setLayouts((prev) => ({
      ...prev,
      lg: newLayoutLg,
      md: newLayoutMd,
      sm: newLayoutSm,
      xs: newLayoutXs,
    }));
  }, [finalPosts]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="masonry-grid-container">
      <div>
        <Menu />
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={300}
        onLayoutChange={(layout, allLayouts) => setLayouts(allLayouts)}
        compactType="vertical"
        preventCollision={false}
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
              categories={
                post.type === "CategoriesPost"
                  ? randomCategories
                  : post.categories
              }
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
      {selectedPost && (
        <SinglePostPopup post={selectedPost} onClose={closePost} />
      )}
    </div>
  );
}
