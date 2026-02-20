import React from 'react';
import './HeroParallaxWrapper.scss';

const HeroParallaxWrapper = ({ children }) => {
  // Zakładamy, że children[0] to Hero, a children[1] to CityList
  const heroComponent = children[0];
  const cityListComponent = children[1];

  return (
    <div className="parallax-wrapper">
      
      {/* Warstwa 1: Hero (Sticky) */}
      <div className="parallax-hero-container">
        {heroComponent}
      </div>

      {/* Warstwa 2: Lista Miast (Overlay) */}
      <div className="parallax-city-overlay">
        {cityListComponent}
      </div>
      
    </div>
  );
};

export default HeroParallaxWrapper;