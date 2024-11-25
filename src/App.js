import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/home/Home.jsx';
// import Register from './components/Register';
import Login from './components/login/Login.jsx';
import AdminDashboard from './routes/adminDashboard/AdminDashboard.jsx';
import AdminLogin from './components/login/adminLogin/AdminLogin.jsx';
import SignUp from './components/signUp/SignUp.jsx';


function App() {
  const location = useLocation();

  // Dodaj dynamiczną klasę, jeśli to jest strona bez ograniczeń
  const isFullWidthPage = ["/login", "/signUp", "/adminLogin"].includes(location.pathname);

  return (
    <div className={`App ${isFullWidthPage ? "full-width" : ""}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
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
