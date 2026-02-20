import React, { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import "./layout.scss";
// import BookingAgent from '../components/BookingAgent/BookingAgent'

export default function Layout({ children, user }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 1. Czy jesteśmy na samej górze?
    setIsTop(scrollTop < 50);

    // 2. Smart Hide (chowanie przy scrollu w dół)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Blokada scrolla strony gdy panel boczny otwarty
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isPanelOpen]);

  return (
    <>
      <nav
        className={`navbar-fixed 
          ${isVisible ? "nav-visible" : "nav-hidden"} 
          ${isTop ? "nav-transparent" : "nav-solid"}
        `}
      >
        {/* Menu to teraz tylko zawartość. 
             Layout decyduje gdzie ta zawartość wisi. */}
        <Menu
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
          isTransparent={isTop}
        />
      </nav>

      <main>
        {React.cloneElement(children, { user, isPanelOpen, setIsPanelOpen })}
      </main>

      {/* <BookingAgent/> */}
    </>
  );
}