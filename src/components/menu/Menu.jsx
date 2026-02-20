import React, { useEffect, useState } from "react";
import "./menu.scss";
import Panel from "../Panel/Panel";
// import { auth, onAuthStateChanged } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom"; // Dodaj useLocation jeśli planujesz nawigację między stronami
import MenuIcon from "@mui/icons-material/Menu";
import OrderButton from "../../components/OrderButton/OrderButton";

export default function Menu({ isPanelOpen, setIsPanelOpen, isTransparent }) {
  const { currentUser: user } = useAuth();
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // --- BRAKUJĄCA FUNKCJA ---
  // const location = useLocation(); // Already imported in line 6

  const scrollToSection = (e, id) => {
    e.stopPropagation();
    // 1. Spróbuj znaleźć element na obecnej stronie
    const element = document.getElementById(id);

    if (element) {
      // Jeśli jest, przewiń do niego
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`); // Aktualizuj hash w URL
      setIsPanelOpen(false); // Zamknij panel
    } else {
      // Jeśli elementu nie ma (np. jesteś na innej podstronie),
      // przekieruj na stronę główną z informacją o scrollu
      navigate("/", { state: { scrollTo: id } });
      setIsPanelOpen(false);
    }
  };
  // -------------------------

  const handleBlogClick = (e) => {
    e.stopPropagation();
    navigate("/blogDB");
    setIsPanelOpen(false);
  };

  const scrollToInspectionForm = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const formSection = document.getElementById("inspection-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
      setIsPanelOpen(false);
    } else {
      navigate("/", { state: { scrollTo: "inspection-form" } });
      setIsPanelOpen(false);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <Panel
        isOpen={isPanelOpen}
        setIsOpen={setIsPanelOpen}
        user={user}
      >
        <div className="mobile-menu-content">
          {/* LINKI MOBILE */}
          <span onClick={(e) => scrollToSection(e, "scope-container")}>co robimy</span>
          <span onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</span>
          <span onClick={handleBlogClick}>poradniki</span>

          <div className="mobile-btn-wrapper">
            <OrderButton
              showIcon={false}
              text="Zamów przegląd"
              padding="12px 40px"
              onClick={scrollToInspectionForm}
            />
          </div>
        </div>
      </Panel>

      {/* Kontener menu - szerokość i układ */}
      <div className="menu-container">
        <div className="logo" onClick={() => navigate("/")}>
          <img
            src="/images/v2/logo_check.png?v=3"
            alt="Logo"
            style={{ width: "60px" }}
          />

          {/* LINKI DESKTOP */}
          <div className="sitemenu">
            <span onClick={(e) => scrollToSection(e, "scope-container")}>co robimy</span>
            <span onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</span>
            <span onClick={handleBlogClick}>poradniki</span>
            <div onClick={(e) => e.stopPropagation()}>
              <OrderButton
                showIcon={false}
                text="Zamów przegląd"
                padding="6px 32px 6px 32px"
                onClick={scrollToInspectionForm}
              />
            </div>
          </div>
        </div>

        {/* BURGER MOBILE */}
        <div className="menu-burger" onClick={togglePanel}>
          <MenuIcon style={{ width: "40px", height: "40px", color: "#333" }} />
        </div>
      </div>
    </>
  );
}