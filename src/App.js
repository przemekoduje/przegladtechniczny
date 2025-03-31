import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./routes/home/Home.jsx";
// import Register from './components/Register';
import Login from "./components/login/Login.jsx";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard.jsx";
import AdminLogin from "./components/login/adminLogin/AdminLogin.jsx";
import SignUp from "./components/signUp/SignUp.jsx";
import PrzewodnikOcena from "./routes/landingi/przewodnikOcena/PrzewodnikOcena.jsx";
import BlogDB from "./routes/BlogDB/BlogDB.jsx";
import AdminPanel from "./routes/AdminPanel/AdminPanel.jsx";
import UserDashboard from "./routes/userDashboard/UserDashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PrzegladB from "./routes/przegladB/PrzegladB";
import PrzegladG from "./routes/przegladG/PrzegladG";
import PrzegladE from "./routes/przegladE/PrzegladE";
import PrzegladW from "./routes/przegladW/PrzegladW";
import Layout from "./layouts/Layout.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const location = useLocation();

  // Dodaj dynamiczną klasę, jeśli to jest strona bez ograniczeń
  const isFullWidthPage = [
    "/login",
    "/signUp",
    "/adminLogin",
    "/przewodnik",
  ].includes(location.pathname);
  useEffect(() => {
    const locationState = location.state;
    if (locationState?.scrollTo === "inspectionForm") {
      const inspectionFormElement = document.querySelector(".inspection-form");
      if (inspectionFormElement) {
        inspectionFormElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`App ${isFullWidthPage ? "full-width" : ""}`}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user}>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/przewodnik" element={<PrzewodnikOcena />} />
        <Route path="/blogDB" element={
            <Layout user={user}>
              <BlogDB />
            </Layout>
          } />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/dashboard"
          element={
            loadingUser ? (
              <p>Ładowanie użytkownika...</p>
            ) : (
              <UserDashboard user={user} />
            )
          }
        />
        <Route
          path="/przeglad-budowlany"
          element={
            <Layout user={user}>
              <PrzegladB />
            </Layout>
          }
        />
        <Route
          path="/przeglad-gazowy"
          element={
            <Layout user={user}>
              <PrzegladG />
            </Layout>
          }
        />

        <Route
          path="/przeglad-wentylacyjny"
          element={
            <Layout user={user}>
              <PrzegladW />
            </Layout>
          }
        />
        <Route
          path="/przeglad-elektryczny"
          element={
            <Layout user={user}>
              <PrzegladE />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
