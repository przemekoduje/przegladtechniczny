import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import deburr from "lodash/deburr";
import "./serviceBlogSection.scss";

// Helper to sanitize title to slug (matching BlogDB and SingleBlogPost)
const createSlug = (title) =>
  deburr(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .replace(/\s+/g, "-");

// Configured keywords for scoring and matching posts by service topic
const TOPIC_CONFIGS = {
  budowlany: {
    primary: ["budowlan", "5-letni", "konstrukc", "żelbet", "rysy", "pęknięcia", "odbiór budynku"],
    secondary: ["przegląd techniczny", "stan techniczny", "prawo budowlane", "ubezpieczenie"],
    fallbacks: [
      {
        title: "Na czym polega przegląd budowlany?",
        slug: "na-czym-polega-przeglad-budowlany",
        image: "/images/blog01.png",
        excerpt: "Regularny przegląd budowlany to gwarancja bezpieczeństwa i długowieczności Twojej nieruchomości. Dowiedz się, jak przebiega taka kontrola i dlaczego warto ją przeprowadzać zgodnie z przepisami.",
      },
      {
        title: "Kompletny przewodnik: Przegląd 5-letni domu jednorodzinnego od A do Z",
        slug: "kompletny-przewodnik-przeglad-5-letni-domu-jednorodzinnego-od-a-do-z",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fblog02.png?alt=media&token=f96ef1d7-2f63-470b-967b-fbc3e9be1c8d",
        excerpt: "Wszystko, co musisz wiedzieć o obowiązkowej 5-letniej kontroli stanu technicznego budynku: zakres prac, uprawnienia inżyniera i protokół do ubezpieczenia.",
      },
      {
        title: "Pęknięcia w konstrukcjach żelbetowych – przyczyny, diagnostyka i naprawa",
        slug: "pekniecia-w-konstrukcjach-zelbetowych-przyczyny-diagnostyka-i-naprawa",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fblog03.png?alt=media&token=794bd2b7-8cab-4e35-b4cb-d606d6e7e1fc",
        excerpt: "Jak odróżnić niegroźne rysy skurczowe od niebezpiecznych pęknięć konstrukcyjnych? Ekspertyza i zalecenia inżyniera budowlanego.",
      },
    ],
  },
  gazowy: {
    primary: ["gaz", "kuchenk", "próba szczelności"],
    secondary: ["szczelnoś", "przegląd instalacji", "nieszczelności", "instalacja gazowa"],
    fallbacks: [
      {
        title: "Przeglądy techniczne: instalacja gazowa – obowiązki ustawowe właściciela",
        slug: "przeglady-techniczne-instalacja-gazowa-obowiazki-ustawowe-wlasciciela",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fblog_gas.png?alt=media&token=7452088e-1a5b-443f-89df-b8c323a2ad77",
        excerpt: "Szczegółowe wyjaśnienie obowiązków ustawowych właściciela domu w zakresie kontroli instalacji gazowej i prób szczelności.",
      },
      {
        title: "Coroczny przegląd instalacji gazowej – dlaczego może uratować życie?",
        slug: "coroczny-przeglad-instalacji-gazowej-dlaczego-moze-uratowac-zycie",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fwent4.png?alt=media&token=42fb7998-33ec-448f-aa13-f8a4efc85771",
        excerpt: "Niewidoczny i bezwonny gaz to ogromne ryzyko. Zobacz, jak przebiega kontrola detektorem i dlaczego coroczny przegląd to absolutna podstawa bezpieczeństwa.",
      },
      {
        title: "Przepisy dotyczące modernizacji instalacji gazowej w Polsce",
        slug: "przepisy-dotyczace-modernizacji-instalacji-gazowej-w-polsce",
        image: "/images/blog02.png",
        excerpt: "Remont, przebudowa czy nowa instalacja gazowa? Jakie wymagania techniczne i formalne musisz spełnić według prawa budowlanego.",
      },
    ],
  },
  elektryczny: {
    primary: ["elektr", "sep"],
    secondary: ["pomiary", "pożar", "bezpieczeństwo", "instalacja elektryczna", "awarii"],
    fallbacks: [
      {
        title: "Ocena istniejącej instalacji elektrycznej pod kątem bezpieczeństwa użytkowania",
        slug: "ocena-istniejacej-instalacji-elektrycznej-pod-katem-bezpieczenstwa-uzytkowania",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fblog03.png?alt=media&token=794bd2b7-8cab-4e35-b4cb-d606d6e7e1fc",
        excerpt: "Bezpieczeństwo użytkowania instalacji elektrycznej: pomiary rezystancji izolacji, pętli zwarcia i skuteczności ochrony przeciwporażeniowej.",
      },
      {
        title: "Przeglądy techniczne: instalacja elektryczna w budynkach mieszkalnych – przepisy, procedura i dokumentacja",
        slug: "przeglady-techniczne-instalacja-elektryczna-w-budynkach-mieszkalnych-przepisy-procedura-i-dokumentacja",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fblog02.png?alt=media&token=f96ef1d7-2f63-470b-967b-fbc3e9be1c8d",
        excerpt: "Jak często wykonywać przegląd instalacji elektrycznej i jakie uprawnienia SEP musi posiadać osoba wykonująca protokół.",
      },
      {
        title: "Przegląd 5-letni domu a ubezpieczenie: Jak nie stracić odszkodowania po pożarze?",
        slug: "przeglad-5-letni-domu-a-ubezpieczenie-jak-nie-stracic-odszkodowania-po-pozarze",
        image: "/images/blog01.png",
        excerpt: "Większość odmów wypłaty odszkodowania z polisy dotyczy braku aktualnego protokołu pomiarów instalacji elektrycznej i odgromowej.",
      },
    ],
  },
  wentylacyjny: {
    primary: ["wentylac", "komin", "nawiewnik"],
    secondary: ["cyrkulacj", "czyste powietrze", "wilgoć", "grzyb"],
    fallbacks: [
      {
        title: "Nawiewniki okienne w Polsce: Kompleksowy przewodnik",
        slug: "nawiewniki-okienne-w-polsce-kompleksowy-przewodnik",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fwent4.png?alt=media&token=42fb7998-33ec-448f-aa13-f8a4efc85771",
        excerpt: "Czym grozi brak nawiewników w szczelnych oknach? Zasady montażu, rodzaje nawiewników ciśnieniowych i higrosterowanych oraz przepisy.",
      },
      {
        title: "Jak przegląd wentylacji może poprawić zdrowie mieszkańców Twojego budynku?",
        slug: "jak-przeglad-wentylacji-moze-poprawic-zdrowie-mieszkancow-twojego-budynku",
        image: "https://firebasestorage.googleapis.com/v0/b/przegladtechniczny-6b336.firebasestorage.app/o/images%2Fwent1.png?alt=media&token=99d4a068-e50d-4c74-8f66-666211c091bc",
        excerpt: "Objawy złej wentylacji: bóle głowy, parowanie szyb i pleśń. Zobacz, jak regularny przegląd kominiarski i wentylacyjny przywraca świeże powietrze.",
      },
      {
        title: "Ocena stanu technicznego instalacji wentylacyjnych",
        slug: "ocena-stanu-technicznego-instalacji-wentylacyjnych",
        image: "/images/went4.png",
        excerpt: "Wymogi techniczne dla przewodów grawitacyjnych i mechanicznych. Jak inżynier mierzy ciąg powietrza anemometrem.",
      },
    ],
  },
};

export default function ServiceBlogSection({ topic = "budowlany" }) {
  const config = TOPIC_CONFIGS[topic] || TOPIC_CONFIGS.budowlany;
  const [posts, setPosts] = useState(config.fallbacks);

  useEffect(() => {
    let isMounted = true;

    const fetchAndFilterPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (!allPosts || allPosts.length === 0) return;

        // Score each post based on category, title, and content
        const scored = allPosts
          .map((post) => {
            let score = 0;
            const titleLower = (post.title || "").toLowerCase();
            const catsLower = Array.isArray(post.categories)
              ? post.categories.join(" ").toLowerCase()
              : (post.category || "").toLowerCase();
            const contentSnippet = (post.content || "").slice(0, 1000).toLowerCase();

            config.primary.forEach((k) => {
              if (titleLower.includes(k) || catsLower.includes(k)) score += 5;
              else if (contentSnippet.includes(k)) score += 2;
            });

            config.secondary.forEach((k) => {
              if (titleLower.includes(k) || catsLower.includes(k)) score += 2;
              else if (contentSnippet.includes(k)) score += 1;
            });

            return { ...post, score };
          })
          .filter((p) => p.score > 0)
          .sort((a, b) => b.score - a.score);

        // Pick matching posts
        const topMatched = scored.filter((p) => p.score >= 3);
        const candidatePool = topMatched.length >= 3 ? topMatched : scored;

        let selected = [];

        if (candidatePool.length >= 3) {
          // Shuffle candidate pool and pick 3 random matching posts
          selected = [...candidatePool].sort(() => 0.5 - Math.random()).slice(0, 3);
        } else {
          // If fewer than 3 match, take whatever matches and backfill with random other posts
          const matchedIds = new Set(candidatePool.map((p) => p.id));
          const otherPosts = allPosts
            .filter((p) => !matchedIds.has(p.id))
            .sort(() => 0.5 - Math.random());
          selected = [...candidatePool, ...otherPosts].slice(0, 3);
        }

        if (isMounted && selected.length > 0) {
          setPosts(selected);
        }
      } catch (err) {
        console.warn("Could not fetch Firestore posts, using topic fallbacks:", err);
      }
    };

    fetchAndFilterPosts();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <div className="container_blog service-blog-container">
      {posts.map((post, idx) => {
        const slug = post.slug || createSlug(post.title);
        const postImage =
          post.src ||
          post.imageUrl ||
          post.image ||
          `/images/blog0${(idx % 2) + 1}.png`;
        const rawExcerpt =
          post.excerpt ||
          post.summary ||
          (post.content
            ? post.content.replace(/(<([^>]+)>)/gi, "").slice(0, 160) + "..."
            : "");

        return (
          <article className="blog" key={post.id || slug || idx}>
            <div className="blog_left">
              <Link to={`/blog/${slug}`} aria-label={`Przeczytaj wpis: ${post.title}`}>
                <img src={postImage} alt={post.title} loading="lazy" />
              </Link>
            </div>
            <div className="blog_right">
              <Link to={`/blog/${slug}`} className="blog_title_link">
                <h3>{post.title}</h3>
              </Link>
              <p>{rawExcerpt}</p>
              <Link to={`/blog/${slug}`} className="blog_btn_link">
                <button className="blog_button" type="button">
                  Przeczytaj całość
                </button>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
