import React from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.scss";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkAdminAndRedirect = async (user, redirect, postId, afterLogin, defaultRoute) => {
    let userIsAdmin = false;
    if (user && user.email) {
      try {
        const adminsRef = collection(db, "admins");
        const q = query(adminsRef, where("email", "==", user.email), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        userIsAdmin = !querySnapshot.empty;
      } catch (error) {
        console.error("Error checking admin statuse:", error);
      }
    }

    if (userIsAdmin || redirect === "admin") {
      navigate("/admin");
    } else if (redirect === "blogPost" && postId) {
      navigate(`/BlogDB?openPost=${postId}${afterLogin ? `&afterLogin=${afterLogin}` : ""}`);
    } else {
      const savedRedirect = localStorage.getItem("redirectAfterLogin");
      if (savedRedirect) {
        localStorage.removeItem("redirectAfterLogin");
        // Use window.location.href for hash links to ensure jumping to the element
        window.location.href = savedRedirect;
      } else {
        navigate(defaultRoute);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userToken", "true");

      const user = result.user;
      if (user) {
        localStorage.setItem(
          "firebaseUser",
          JSON.stringify({
            email: user.email,
            name: user.displayName || "",
          })
        );
      }

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania przez Google: " + error.message);
    }
  };

  // analogicznie w handleFacebookLogin

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("isLoggedIn", "true");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(result.user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania przez Facebook: " + error.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin");

      await checkAdminAndRedirect(result.user, redirect, postId, afterLogin, "/dashboard");

    } catch (error) {
      alert("Błąd logowania: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="img-left">
        <img src="/images/login_background.png" alt="" />
      </div>
      <div className="login-page">
        <div className="arrowBack" onClick={() => navigate("/")}>
          <ArrowBackIcon style={{ fontSize: "36px" }} />
        </div>
        <h2>Zaloguj się</h2>

        <div className="login-email">
          <input type="email" placeholder="Email" id="email" />
          <input type="password" placeholder="Hasło" id="password" />
          <div
            className="main_button"
            onClick={() =>
              handleEmailLogin(
                document.getElementById("email").value,
                document.getElementById("password").value
              )
            }
          >
            Logowanie przez email
          </div>
          <p>lub </p>
        </div>
        <div className="login-social">
          <button onClick={handleGoogleLogin}>
            <GoogleIcon />
          </button>
          <button onClick={handleFacebookLogin}>
            <FacebookIcon />
          </button>
        </div>

        <p className="login-signup">
          Nie masz konta?{" "}
          <button onClick={() => navigate("/signUp")}>Zarejestruj się</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
