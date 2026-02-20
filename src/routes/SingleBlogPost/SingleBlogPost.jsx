import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Helmet } from "react-helmet";
import deburr from "lodash/deburr";
import "./singleBlogPost.scss";

export default function SingleBlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [allPosts, setAllPosts] = useState([]);

    // Comments state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Helper to create slug (ensure consistency)
    const createSlug = (title) =>
        deburr(title)
            .toLowerCase()
            .replace(/[^a-z0-9\s]/gi, "")
            .replace(/\s+/g, "-");

    // Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllPosts(postsArray);

                // Find current post
                const foundPost = postsArray.find(p => createSlug(p.title) === slug);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    // Handle 404 or redirect
                    console.log("Post not found");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [slug]);

    // Fetch comments
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
            navigate(`/login?redirect=blogPost&postSlug=${slug}&afterLogin=1`);
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

    if (loading) return <div className="blog-loader">Ładowanie...</div>;
    if (!post) return <div className="blog-error">Nie znaleziono wpisu.</div>;

    const date = post.date ? new Date(post.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : "";

    return (
        <div className="single-blog-post-page">
            <Helmet>
                <title>{post.title} | Blog Techniczny</title>
                <meta name="description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <link rel="canonical" href={`https://przegladtechniczny.pl/blogDB/${slug}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://przegladtechniczny.pl/blogDB/${slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <meta property="og:image" content={post.src} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://przegladtechniczny.pl/blogDB/${slug}`} />
                <meta property="twitter:title" content={post.title} />
                <meta property="twitter:description" content={post.content?.replace(/(<([^>]+)>)/gi, "").slice(0, 160)} />
                <meta property="twitter:image" content={post.src} />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": "${post.title}",
                            "image": [
                                "${post.src}"
                            ],
                            "datePublished": "${post.date ? new Date(post.date).toISOString() : ''}",
                            "dateModified": "${post.date ? new Date(post.date).toISOString() : ''}",
                            "author": [{
                                "@type": "Person",
                                "name": "Przemek Rakotny",
                                "url": "https://przegladtechniczny.pl/o-mnie"
                            }]
                        }
                    `}
                </script>
            </Helmet>

            <header className="post-header">
                <div className="header-content">
                    <div className="categories">
                        {post.categories?.map((cat) => (
                            <span key={cat} className="category-tag">{cat}</span>
                        ))}
                    </div>
                    <h1>{post.title}</h1>
                    <div className="post-meta">
                        <span className="date">{date}</span>
                        <span className="author">Autor: Przemek Rakotny</span>
                    </div>
                </div>
                <div className="header-image-container">
                    <img
                        src={post.src || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"}
                        alt={post.title}
                        className="header-image"
                    />
                </div>
            </header>

            <main className="post-content-wrapper">
                <article className="post-content">
                    {post.content && (
                        <div className="post-lead" dangerouslySetInnerHTML={{ __html: post.content }} />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: post.content2 || "" }} />

                    <div className="post-cta">
                        <h3>Potrzebujesz przeglądu technicznego?</h3>
                        <p>Skontaktuj się ze mną, aby umówić profesjonalny przegląd Twojego domu lub mieszkania.</p>
                        <Link to="/#scope-container" className="btn-cta">Zobacz Ofertę</Link>
                    </div>
                </article>

                <div className="comments-section-wrapper" id="commentsSection">
                    <h3>Komentarze ({comments.length})</h3>

                    {comments.length === 0 ? (
                        <p className="no-comments">Brak komentarzy. Bądź pierwszy!</p>
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

                    <div className="comment-form">
                        {user ? (
                            <form onSubmit={handleAddComment}>
                                <textarea
                                    placeholder="Napisz komentarz..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button type="submit" className="btn-submit-comment">Dodaj komentarz</button>
                            </form>
                        ) : (
                            <div className="login-prompt">
                                <p>
                                    Musisz być zalogowany, aby dodać komentarz.{" "}
                                    <Link
                                        to={`/login?redirect=blogPost&postSlug=${slug}&afterLogin=1`}
                                    >
                                        Zaloguj się
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <div className="read-next">
                <h3>Zobacz także</h3>
                <div className="read-next-grid">
                    {allPosts
                        .filter(p => p.id !== post.id && p.type !== 'CategoriesPost')
                        .slice(0, 3)
                        .map(p => (
                            <div key={p.id} className="read-next-card" onClick={() => navigate(`/blogDB/${createSlug(p.title)}`)}>
                                <img src={p.src} alt={p.title} />
                                <h4>{p.title}</h4>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
