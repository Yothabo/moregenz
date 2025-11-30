import React from 'react';
import styles from './PolygonBackground.module.css';

const PolygonBackground: React.FC = () => {
  const pentagons = [
    // Bottom right - large, prominent
    { size: 180, opacity: 0.15, left: 85, top: 70, color: 'lime', hollow: false },
    { size: 160, opacity: 0.12, left: 90, top: 80, color: 'gray', hollow: true },
    { size: 140, opacity: 0.18, left: 80, top: 85, color: 'lime', hollow: false },
    
    // Moving up - medium size, medium opacity
    { size: 120, opacity: 0.1, left: 75, top: 60, color: 'gray', hollow: false },
    { size: 100, opacity: 0.08, left: 85, top: 50, color: 'lime', hollow: true },
    { size: 110, opacity: 0.09, left: 70, top: 70, color: 'gray', hollow: false },
    
    // Higher up - smaller, less opaque
    { size: 80, opacity: 0.06, left: 65, top: 40, color: 'lime', hollow: false },
    { size: 70, opacity: 0.05, left: 80, top: 30, color: 'gray', hollow: true },
    { size: 90, opacity: 0.07, left: 60, top: 55, color: 'lime', hollow: false },
    
    // Top area - smallest, most transparent
    { size: 60, opacity: 0.04, left: 55, top: 25, color: 'gray', hollow: false },
    { size: 50, opacity: 0.03, left: 70, top: 15, color: 'lime', hollow: true },
    { size: 40, opacity: 0.02, left: 45, top: 35, color: 'gray', hollow: false }
  ];

  return (
    <div className={styles.pentagonBackground}>
      {pentagons.map((pentagon, index) => (
        <div
          key={index}
          className={`${styles.pentagon} ${styles[pentagon.color]} ${pentagon.hollow ? styles.hollow : ''}`}
          style={{
            width: `${pentagon.size}px`,
            height: `${pentagon.size}px`,
            opacity: pentagon.opacity,
            left: `${pentagon.left}%`,
            top: `${pentagon.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default PolygonBackground;
