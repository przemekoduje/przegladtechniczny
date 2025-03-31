// Layout.jsx
import React, { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import './layout.scss';

export default function Layout({ children, user }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  let scrollTimeout;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop + 10) {
      setIsVisible(false);
    } else if (scrollTop < lastScrollTop) {
      setIsVisible(true);
    }
    setLastScrollTop(scrollTop);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => setIsVisible(true), 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isPanelOpen]);

  return (
    <>
      <div className={`menu-section ${isVisible ? "visible" : "hidden"}`}>
        <Menu isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      </div>

      {/* renderowana zawartość strony */}
      {React.cloneElement(children, { user, isPanelOpen, setIsPanelOpen })}
    </>
  );
}
