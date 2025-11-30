import React from 'react';
import styles from './WaveBackground.module.css';

const WaveBackground: React.FC = () => {
  return (
    <div className={styles.waveBackground}>
      <svg 
        className={styles.waves} 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00CC00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00CC00" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32CD32" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#32CD32" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ADFF2F" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ADFF2F" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Wave Layer 1 - Darkest (bottom) */}
        <path 
          className={styles.waveBottom}
          d="M0,41.047c73.333,31.338,233.333,31.338,320,0s186.667-31.338,280,0s213.333,31.338,320,0s226.667-31.338,280,0v78.953H0Z" 
          fill="url(#waveGrad1)"
        />
        {/* Wave Layer 2 - Medium (middle) */}
        <path 
          className={styles.waveMiddle}
          d="M0,61.047c93.333,31.338,253.333,31.338,360,0s166.667-31.338,240,0s173.333,31.338,280,0s246.667-31.338,320,0v58.953H0Z" 
          fill="url(#waveGrad2)"
        />
        {/* Wave Layer 3 - Lightest (top - highest z-index) */}
        <path 
          className={styles.waveTop}
          d="M0,81.047c113.333,31.338,273.333,31.338,400,0s146.667-31.338,200,0s133.333,31.338,280,0s266.667-31.338,320,0v38.953H0Z" 
          fill="url(#waveGrad3)"
        />
      </svg>
    </div>
  );
};

export default WaveBackground;
