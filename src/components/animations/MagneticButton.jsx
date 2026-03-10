import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick }) {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    // We use a relatively weak magnetic pull to keep it subtle
    const magnetize = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const reset = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', magnetize);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', magnetize);
      el.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div 
      ref={magneticRef} 
      className={`magnetic-wrapper ${className}`} 
      onClick={onClick}
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
