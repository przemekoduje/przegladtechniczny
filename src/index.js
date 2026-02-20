import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // 1. Import biblioteki
import App from './App';
import "./styles/global.scss";

const container = document.getElementById("root");

// Przygotowujemy aplikację owiniętą w HelmetProvider
// (żeby nie powtarzać kodu w dwóch miejscach)
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Sprawdzamy, czy w środku już coś jest (czy react-snap wygenerował HTML)
if (container.hasChildNodes()) {
  // TAK: Używamy hydrateRoot (dla gotowego HTML z SEO)
  hydrateRoot(container, app);
} else {
  // NIE: Używamy createRoot (standardowy render, np. podczas pisania kodu)
  createRoot(container).render(app);
}