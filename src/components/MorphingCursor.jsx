import React, { useState, useEffect } from 'react';
import './MorphingCursor.css';

const MorphingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => [...prev.slice(-20), { 
        x: e.clientX, 
        y: e.clientY, 
        id: Date.now() 
      }]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsHovering(true);
        setCursorVariant('link');
      } else if (target.classList.contains('project-card') || 
                 target.classList.contains('skill-card')) {
        setIsHovering(true);
        setCursorVariant('card');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsHovering(true);
        setCursorVariant('text');
      } else if (target.classList.contains('image-hover')) {
        setIsHovering(true);
        setCursorVariant('image');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.classList.contains('project-card') ||
          target.classList.contains('skill-card') ||
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
          target.classList.contains('image-hover')) {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`morphing-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''} ${cursorVariant}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-inner"></div>
      </div>

      {/* Cursor follower */}
      <div
        className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: index / trail.length,
            transform: `scale(${index / trail.length})`,
          }}
        />
      ))}
    </>
  );
};

export default MorphingCursor;
