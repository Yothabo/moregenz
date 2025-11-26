import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.about} id="about">
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>About moreGenz Security Systems</h1>
        <div className={styles.content}>
          <div className={styles.profileSection}>
            <h2>Our Story</h2>
            <p>
              Professional security solutions provider with certified installations 
              and reliable maintenance services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
