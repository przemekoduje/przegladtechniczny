import React from "react";
import { auth } from "../../firebase";
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

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("userToken", "true");

      const user = auth.currentUser;
      if (user) {
        localStorage.setItem(
          "firebaseUser",
          JSON.stringify({
            email: user.email,
            name: user.displayName || "",
          })
        );
      }

      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectPath;
        return;
      }

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin"); // np. "1" lub null

      if (redirect === "blogPost" && postId) {
        navigate(
          `/BlogDB?openPost=${postId}${
            afterLogin ? `&afterLogin=${afterLogin}` : ""
          }`
        );
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Błąd logowania przez Google: " + error.message);
    }
  };

  // analogicznie w handleFacebookLogin

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("isLoggedIn", "true");

      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin"); // np. "1" lub null

      if (redirect === "blogPost" && postId) {
        navigate(
          `/BlogDB?openPost=${postId}${
            afterLogin ? `&afterLogin=${afterLogin}` : ""
          }`
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Błąd logowania przez Facebook: " + error.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");

      // Sprawdzamy, czy w URL jest redirect=blogPost i postId=XYZ
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const postId = params.get("postId");
      const afterLogin = params.get("afterLogin"); // np. "1" lub null

      if (redirect === "blogPost" && postId) {
        // wracamy do BlogDB z otwartym postem
        navigate(
          `/BlogDB?openPost=${postId}${
            afterLogin ? `&afterLogin=${afterLogin}` : ""
          }`
        );
      } else {
        // stara logika: powrót do / z anchorem "inspectionForm"
        navigate("/");
      }
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
