import React from 'react';
import { 
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaEnvelope
} from 'react-icons/fa';
import { CONFIG } from '../config';
import { socialLinks } from '../data/socialLinks';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <FaWhatsapp className={styles.footerSocialIcon} />;
      case 'facebook':
        return <FaFacebook className={styles.footerSocialIcon} />;
      case 'instagram':
        return <FaInstagram className={styles.footerSocialIcon} />;
      case 'email':
        return <FaEnvelope className={styles.footerSocialIcon} />;
      default:
        return null;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>moreGenz Security Systems</h3>
            <p className={styles.footerDescription}>
              Professional security solutions for homes and businesses across South Africa.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Contact Info</h4>
            <p className={styles.footerText}>{CONFIG.company.phone}</p>
            <p className={styles.footerText}>{CONFIG.company.email}</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Follow Us</h4>
            <div className={styles.footerSocials}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={styles.footerSocialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} moreGenz Security Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
