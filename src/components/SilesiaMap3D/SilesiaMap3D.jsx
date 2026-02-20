import React from 'react';
import './SilesiaMap3D.scss';

const SilesiaMap3D = () => {
  // Lista punktów (miast) na mapie - pozycje procentowe (top, left)
  // Możesz je precyzyjnie dostosować przesuwając wartości
  const cities = [
    { name: "Gliwice", top: "55%", left: "20%", main: true },
    { name: "Katowice", top: "50%", left: "60%", main: true },
    { name: "Bytom", top: "35%", left: "45%" },
    { name: "Zabrze", top: "48%", left: "35%" },
    { name: "Sosnowiec", top: "45%", left: "75%" },
    { name: "Tychy", top: "75%", left: "55%" },
    { name: "Ruda Śląska", top: "52%", left: "45%" },
    { name: "Tarnowskie Góry", top: "20%", left: "40%" },
  ];

  return (
    <div className="map-3d-container">
      <div className="map-plane">
        {/* SVG Obrysu Mapy */}
        <svg 
          viewBox="0 0 200 150" 
          className="silesia-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cień pod mapą (dla efektu 3D) */}
          <path 
            className="map-shadow"
            d="M20,60 Q50,10 90,30 T150,40 T180,80 T140,130 T80,140 T30,110 Z" 
          />
          {/* Właściwa mapa */}
          <path 
            className="map-shape"
            d="M20,60 Q50,10 90,30 T150,40 T180,80 T140,130 T80,140 T30,110 Z" 
          />
        </svg>

        {/* Pinezki Miast */}
        {cities.map((city, index) => (
          <div 
            key={index} 
            className={`map-pin ${city.main ? 'main-pin' : ''}`}
            style={{ top: city.top, left: city.left }}
          >
            <div className="pin-pulse"></div>
            <div className="pin-dot"></div>
            {/* Opcjonalnie: nazwa miasta na mapie */}
            {/* <span className="pin-label">{city.name}</span> */}
          </div>
        ))}

        {/* Główna Pinezka 3D (np. na środku lub w Gliwicach) */}
        <div className="big-marker" style={{ top: "40%", left: "50%" }}>
           <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
           </svg>
           <div className="marker-shadow"></div>
        </div>
      </div>
    </div>
  );
};

export default SilesiaMap3D;