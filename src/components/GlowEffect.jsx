import React, { useEffect, useRef } from 'react';
import './GlowEffect.css';

const GlowEffect = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={glowRef} className="glow-effect">
      <div className="glow-inner"></div>
      <div className="glow-outer"></div>
    </div>
  );
};

export default GlowEffect;
