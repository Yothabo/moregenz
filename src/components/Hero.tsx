import React, { useState, useEffect, useRef } from 'react';
import { FaTh, FaArrowRight } from 'react-icons/fa';
import ServicesDropdown from './ServicesDropdown';
import WaveBackground from './backgrounds/WaveBackground';
import { useHomeModal } from '../pages/Home';
import styles from './Hero.module.css';
import logo from '../assets/logo.png';

const Hero: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroLogoOpacity, setHeroLogoOpacity] = useState(1);
  const [headerLogoOpacity, setHeaderLogoOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Use the shared modal context from Home
  const { openModal } = useHomeModal();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const heroSection = document.getElementById('home');

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -heroRect.top / 100));

        const heroLogoOpacity = 1 - scrollProgress;
        const headerLogoOpacity = scrollProgress;

        setHeroLogoOpacity(Math.max(0, heroLogoOpacity));
        setHeaderLogoOpacity(Math.min(1, headerLogoOpacity));

        setIsScrolled(scrollTop > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
        return;
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle Get Quote Now button click - uses shared modal context
  const handleGetQuoteClick = () => {
    openModal();
  };

  const shortDescription = "Professional security solutions for homes and businesses. Advanced technology, expert installation, and reliable protection.";

  const longDescription = "Your trusted partner in advanced security solutions. With certified installations, professional support, and cutting-edge technology, we protect what matters most to you. Experience peace of mind with our reliable security systems tailored for both residential and commercial properties.";

  return (
    <>
      <header className={styles.stickyHeader}>
        <div className={styles.stickyContent}>
          <img
            src={logo}
            alt="moreGenz Security Systems"
            className={styles.headerLogo}
            style={{
              opacity: headerLogoOpacity,
              transform: `scale(${0.8 + headerLogoOpacity * 0.2})`
            }}
          />

          <nav className={styles.desktopNav}>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
            <a href="#bookings">Bookings</a>
            <a href="#contact">Contact</a>
            <ServicesDropdown variant="desktop" />
          </nav>

          <button
            ref={menuButtonRef}
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.menuButtonActive : ''}`}
            onClick={handleMenuButtonClick}
            aria-label="Toggle menu"
          >
            <FaTh />
          </button>

          <div
            className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.overlayVisible : ''}`}
            onClick={closeMenu}
          />

          <div
            ref={mobileMenuRef}
            className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          >
            <div className={styles.mobileMenuContent}>
              <a href="#gallery" onClick={closeMenu}>Gallery</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#bookings" onClick={closeMenu}>Bookings</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
              <ServicesDropdown variant="mobile" onItemClick={closeMenu} />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.hero} id="home">
        <WaveBackground />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.textContent}>
              <div className={styles.logoSection}>
                <div className={styles.logoContainer}>
                  <img
                    src={logo}
                    alt="moreGenz Security Systems"
                    className={styles.heroLogo}
                    style={{
                      opacity: heroLogoOpacity,
                      transform: `scale(${1.2 - heroLogoOpacity * 0.2})`
                    }}
                  />
                </div>
              </div>

              <div className={styles.titleRow}>
                <h1 className={styles.companyName}>moreGenz Security Systems</h1>
                <div className={styles.certifications}>
                  Centurion <span>•</span> Gemini <span>•</span> Hikvision
                </div>
                <p className={styles.description}>
                  {isMobile ? shortDescription : longDescription}
                </p>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>98%</span>
                  <span className={styles.statLabel}>Satisfaction</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Support</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>5Y</span>
                  <span className={styles.statLabel}>Warranty</span>
                </div>
              </div>

              <button 
                className={styles.ctaButton}
                onClick={handleGetQuoteClick}
              >
                Get Quote Now <FaArrowRight className={styles.arrowIcon} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
