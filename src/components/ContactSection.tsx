import React from 'react';
import { useHomeModal } from '../pages/Home';
import styles from './ContactSection.module.css';

// Main ContactSection component
const ContactSection: React.FC = () => {
  // Use the shared modal context from Home
  const { openModal } = useHomeModal();

  return (
    <>
      <section className={styles.contact} id="contact">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get Your Security Quote</h2>
          <p className={styles.sectionSubtitle}>
            Use our intelligent quote assistant to get accurate pricing for your security needs.
            We'll guide you through service selection and gather all necessary details.
          </p>

          <div className={styles.formSelector}>
            <button
              className={styles.selectorButton}
              onClick={openModal}
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
