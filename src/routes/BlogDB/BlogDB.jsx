// Aktualizacja pliku BlogDB.jsx na Firebase
import React, { useEffect, useMemo, useState } from "react";
import "./blogDB.scss";
import BlogPostDB from "../../components/BlogPostDB/BlogPostDB";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import deburr from "lodash/deburr";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BlogDB() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const navigate = useNavigate();

  const createSlug = (title) =>
    deburr(title)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "")
      .replace(/\s+/g, "-");

  // Fetch posts from Firebase
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
    navigate(`/blogDB/${createSlug(post.title)}`);
  };

  // Categories logic
  const uniqueCategories = useMemo(() => {
    const all = posts.flatMap(p => p.categories || []);
    return ["Wszystkie", ...new Set(all)];
  }, [posts]);

  // Filter and Sort
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (selectedCategory !== "Wszystkie") {
      result = posts.filter(p => p.categories?.includes(selectedCategory));
    }

    return [...result].sort((a, b) => { // Create a copy before sorting just in case
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB - dateA;
    });
  }, [selectedCategory, posts]);

  console.log("BlogDB Debug:", {
    postsCount: posts.length,
    selectedCategory,
    filteredCount: filteredPosts.length,
    firstPost: filteredPosts[0]
  });

  // Hero Post (First valid one)
  const validHeroIndex = filteredPosts.findIndex(p => p.src && p.title && p.content);
  const heroPost = validHeroIndex !== -1 ? filteredPosts[validHeroIndex] : null;

  // Grid Posts (Everything else, excluding the hero)
  const gridPosts = filteredPosts.filter((_, index) => index !== validHeroIndex);

  return (
    <div className="blog-db-container">
      <Helmet>
        <title>Blog Techniczny | Przeglądy Domu</title>
        <meta name="description" content="Porady, nowości i wiedza techniczna o przeglądach budowlanych, instalacjach i bezpieczeństwie domu." />
      </Helmet>

      {/* Category Filter Bar */}
      <div className="category-filter-bar">
        <div className="filter-scroll">
          {uniqueCategories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-content">
        {/* Hero Section */}
        {heroPost && (
          <section className="hero-post-section" onClick={() => openPost(heroPost)}>
            <div className="hero-image-wrapper">
              <img
                src={heroPost.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"}
                alt={heroPost.title}
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <div className="hero-tags">
                    {heroPost.categories?.map(c => <span key={c} className="tag">{c}</span>)}
                  </div>
                  <h1>{heroPost.title}</h1>
                  <p>{heroPost.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 200)}...</p>
                  <button className="read-more-btn">
                    Czytaj dalej <ArrowForwardIcon />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Grid Section */}
        <section className="posts-grid">
          {gridPosts.map((post) => (
            <div key={post.id} className="grid-post-card" onClick={() => openPost(post)}>
              <div className="card-image">
                <img
                  src={post.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600"}
                  alt={post.title}
                  loading="lazy"
                />
                <div className="card-tags">
                  {post.categories?.slice(0, 2).map(c => <span key={c} className="mini-tag">{c}</span>)}
                </div>
              </div>
              <div className="card-content">
                <h3>{post.title}</h3>
                <p>{post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 100)}...</p>
                <span className="read-link">Czytaj więcej</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
