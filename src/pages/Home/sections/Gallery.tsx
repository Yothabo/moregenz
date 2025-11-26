import React from 'react'
import styles from './Gallery.module.css'

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Gallery Test</h2>
        <p className={styles.sectionDescription}>
          This is a test gallery section to verify it's working.
        </p>
        <div className={styles.testContent}>
          <p>If you can see this text, the gallery component is loading correctly.</p>
        </div>
      </div>
    </section>
  )
}
