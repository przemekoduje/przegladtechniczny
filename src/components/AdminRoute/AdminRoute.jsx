import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        // Nie zalogowany? Wyślij na główny login z dopiskiem (żeby wrócić tu po zalogowaniu)
        return <Navigate to="/login?redirect=admin" replace />;
    }

    if (!isAdmin) {
        // Zalogowany, ale brak uprawnień admina? Wyślij gołych userów na dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
