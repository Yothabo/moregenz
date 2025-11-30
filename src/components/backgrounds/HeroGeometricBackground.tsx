import React from 'react';
import WaveBackground from './WaveBackground';
import styles from './HeroGeometricBackground.module.css';

const HeroGeometricBackground: React.FC = () => {
  return (
    <div className={styles.heroGeometricBackground}>
      <WaveBackground />
    </div>
  );
};

export default HeroGeometricBackground;
