import React from "react";
import "./menu.scss";
import Panel from "../panel/Panel";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallButton from "../CallButton/CallButton";

export default function Menu({ isPanelOpen, setIsPanelOpen, isTransparent }) {
  const { currentUser: user, isAdmin } = useAuth();
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleDashboardClick = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
    } else if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    setIsPanelOpen(false);
  };

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
          <Link to="/#scope" onClick={(e) => scrollToSection(e, "scope")}>co robimy</Link>
          <Link to="/#h5-QA" onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</Link>
          <Link to="/blog" onClick={() => setIsPanelOpen(false)}>poradniki</Link>
          <span className="client-panel-link" onClick={handleDashboardClick}>
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="User" className="panel-icon-img avatar" />
            ) : (
              <AccountCircleIcon className="panel-icon-img" />
            )}
            {user ? "panel klienta" : "zaloguj"}
          </span>

          <div className="mobile-btn-wrapper">
            <CallButton phoneNumber="690029414" />
          </div>
        </div>
      </Panel>

      {/* Kontener menu - szerokość i układ */}
      <div className="menu-container">
        <div className="logo">
          <Link to="/" aria-label="Przeglądy Techniczne Nieruchomości - Strona Główna">
            <img
              src="/images/v2/logo_check.png?v=3"
              alt="Przeglądy Techniczne Nieruchomości Śląsk – Inżynier Przemysław Rakotny"
              style={{ width: "60px" }}
            />
          </Link>

          {/* LINKI DESKTOP */}
          <nav className="sitemenu">
            <Link to="/#scope" onClick={(e) => scrollToSection(e, "scope")}>co robimy</Link>
            <Link to="/#h5-QA" onClick={(e) => scrollToSection(e, "h5-QA")}>warto wiedzieć</Link>
            <Link to="/blog" onClick={() => setIsPanelOpen(false)}>poradniki</Link>
            <div className="call-wrapper" onClick={(e) => e.stopPropagation()}>
              <CallButton phoneNumber="690029414" />
            </div>
          </nav>

        </div>

        <span className="client-panel-link" onClick={handleDashboardClick}>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="User" className="panel-icon-img avatar" />
          ) : (
            <AccountCircleIcon className="panel-icon-img" />
          )}
        </span>


        {/* BURGER MOBILE */}
        <div className="menu-burger" onClick={togglePanel}>
          <MenuIcon style={{ width: "40px", height: "40px", color: "#333" }} />
        </div>
      </div>
    </>
  );
}