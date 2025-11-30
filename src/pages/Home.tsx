import React, { createContext, useContext, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Certifications from '../components/Certifications';
import Gallery from '../components/Gallery';
import ContactSection from '../components/ContactSection';
import NewsSection from '../components/NewsSection';
import { useChatBot } from '../hooks/useChatBot';
import ChatModal from '../components/ChatModal';
import styles from './Home.module.css';
import contactStyles from '../components/ContactSection.module.css';

// Create a context for modal state
interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to use modal context
export const useHomeModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useHomeModal must be used within a HomeModalProvider');
  }
  return context;
};

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeChat, resetChat } = useChatBot();

  // Effect to handle body scroll when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    initializeChat();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetChat();
    setIsModalOpen(false);
  };

  const modalContextValue: ModalContextType = {
    isModalOpen,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <div className={styles.home}>
        <Hero />
        <Services />
        <Certifications />
        <Gallery />
        <ContactSection />
        <NewsSection />

        {/* Global Modal - Single Source of Truth */}
        {isModalOpen && (
          <div className={contactStyles.modalOverlay}>
            <div className={contactStyles.modalContent}>
              <ChatModal onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </ModalContext.Provider>
  );
};

export default Home;
