import React from 'react';
import styles from './SellingParagraph.module.css';

const SellingParagraph: React.FC = () => {
  return (
    <section className={styles.sellingSection} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Why Choose moreGenz Security Systems?</h2>
          <div className={styles.paragraphs}>
            <p className={styles.paragraph}>
              With over a decade of experience in the security industry, <strong>moreGenz Security Systems</strong> 
              stands as your trusted partner for comprehensive security solutions. We understand that every property 
              has unique security needs, which is why we offer customized systems designed to provide maximum 
              protection for your home or business.
            </p>
            
            <p className={styles.paragraph}>
              Our team of certified professionals specializes in the latest security technologies, including 
              <strong> advanced surveillance systems</strong>, <strong>access control solutions</strong>, 
              and <strong>intelligent alarm systems</strong>. We work with industry-leading brands to ensure 
              you receive reliable, cutting-edge security that adapts to your lifestyle and business operations.
            </p>
            
            <p className={styles.paragraph}>
              What sets us apart is our commitment to <strong>24/7 support</strong> and <strong>prompt maintenance services</strong>. 
              We don't just install systems and walk away – we build lasting relationships with our clients, 
              providing ongoing support to ensure your security infrastructure remains effective and up-to-date. 
              Your peace of mind is our top priority.
            </p>
            
            <p className={styles.paragraph}>
              Whether you're looking to protect your family, secure your business assets, or implement 
              enterprise-level security solutions, moreGenz Security Systems delivers professional 
              installation, reliable equipment, and unparalleled customer service. 
              <strong> Join hundreds of satisfied customers</strong> who trust us with their security needs.
            </p>
          </div>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔒</span>
              <h3 className={styles.featureTitle}>Certified Expertise</h3>
              <p className={styles.featureDescription}>
                Our technicians are certified by leading security brands and undergo regular training.
              </p>
            </div>
            
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <h3 className={styles.featureTitle}>Quick Response</h3>
              <p className={styles.featureDescription}>
                24/7 support with rapid response times for maintenance and emergency situations.
              </p>
            </div>
            
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🛡️</span>
              <h3 className={styles.featureTitle}>Comprehensive Solutions</h3>
              <p className={styles.featureDescription}>
                From residential security to commercial systems, we provide end-to-end solutions.
              </p>
            </div>
            
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💰</span>
              <h3 className={styles.featureTitle}>Competitive Pricing</h3>
              <p className={styles.featureDescription}>
                Quality security solutions at affordable prices with flexible payment options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellingParagraph;
