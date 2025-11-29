import React, { useEffect, useState, useRef } from 'react';
import { useModal } from '../hooks/useModal';
import { useChatBot } from '../hooks/useChatBot';
import styles from './ContactSection.module.css';
import chatStyles from './ChatBot.module.css';

// Simple Send Icon SVG component
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const ChatModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    chatMessages,
    isTyping,
    showOptions,
    currentOptions,
    selectedServices,
    chatMode,
    contactInfo,
    currentContactStep,
    validationError,
    referenceInput,
    setReferenceInput,
    chatContainerRef,
    isMultiSelect,
    selectedOptionKeys,
    initializeChat,
    handleServiceSelect,
    handleMultipleServicesSubmit,
    handleOptionSelect,
    handleOptionToggle,
    handleMultiSelectSubmit,
    handleFreeTextSubmit,
    handleContactMethodSelect,
    handleContactInfoSubmit,
    handleReferenceInputSubmit,
    resetChat
  } = useChatBot();

  const [freeTextInput, setFreeTextInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat when modal opens
  useEffect(() => {
    if (chatMode === 'service-selection') {
      initializeChat();
    }
  }, []);

  // Handle keyboard visibility for mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const viewportHeight = window.innerHeight;
      const isKeyboardOpen = viewportHeight < window.outerHeight * 0.8;
      
      if (isMobile) {
        setIsKeyboardVisible(isKeyboardOpen);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll when keyboard appears
  useEffect(() => {
    if (isKeyboardVisible && chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 300);
    }
  }, [isKeyboardVisible]);

  const handleOptionClick = (option: { key: string; label: string; description?: string }) => {
    if (chatMode === 'conversation') {
      if (isMultiSelect) {
        handleOptionToggle(option.key);
      } else {
        // Pass only the label, not the description
        handleOptionSelect(option.key, option.label);
      }
    } else if (chatMode === 'contact-method') {
      handleContactMethodSelect(option.key);
    }
  };

  const handleSubmitFreeText = () => {
    handleFreeTextSubmit(freeTextInput);
    setFreeTextInput('');
  };

  const handleSkipFreeText = () => {
    handleFreeTextSubmit('');
    setFreeTextInput('');
  };

  const handleSubmitContactInfo = () => {
    const clearInput = () => setContactInput('');
    handleContactInfoSubmit(contactInput, clearInput);
  };

  const handleSubmitReference = () => {
    handleReferenceInputSubmit();
  };

  // Handle cancel action - close the modal
  const handleCancel = () => {
    onClose();
  };

  // Auto-capitalize names as user types
  const handleNameInputChange = (value: string) => {
    if (currentContactStep === 'firstName' || currentContactStep === 'lastName') {
      // Capitalize first letter of each word
      const words = value.split(' ');
      const capitalizedWords = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      setContactInput(capitalizedWords.join(' '));
    } else {
      setContactInput(value);
    }
  };

  // Auto-uppercase reference numbers
  const handleReferenceInputChange = (value: string) => {
    setReferenceInput(value.toUpperCase());
  };

  // Handle input focus for mobile keyboard
  const handleInputFocus = () => {
    if (window.innerWidth <= 768) {
      setIsKeyboardVisible(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsKeyboardVisible(false);
    }, 300);
  };

  // Render different content based on chat mode
  const renderOptionsContent = () => {
    if (showOptions && chatMode === 'service-selection') {
      // MODE 1: Service Selection - SINGLE SELECTION ONLY
      return (
        <div className={chatStyles.multiSelectContainer}>
          <div className={chatStyles.multiSelectHeader}>
            <span className={chatStyles.selectMultipleText}>Select one service</span>
            <button 
              className={chatStyles.doneButton}
              onClick={handleMultipleServicesSubmit}
              disabled={selectedServices.length === 0}
            >
              <SendIcon />
            </button>
          </div>
          <div className={chatStyles.multiSelectGrid}>
            {currentOptions.map((option) => (
              <div
                key={option.key}
                className={`${chatStyles.multiSelectOption} ${
                  selectedServices.includes(option.key) ? chatStyles.selected : ''
                } ${selectedServices.length > 0 && !selectedServices.includes(option.key) ? chatStyles.disabled : ''}`}
                onClick={() => handleServiceSelect(option.key)}
              >
                <span className={chatStyles.optionLabel}>{option.label}</span>
                {option.description && (
                  <span className={chatStyles.optionDescription}>{option.description}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (showOptions && chatMode === 'conversation') {
      // MODE 2: Conversation Options
      if (isMultiSelect) {
        // Multi-select mode for coverage areas
        return (
          <div className={chatStyles.multiSelectContainer}>
            <div className={chatStyles.multiSelectHeader}>
              <span className={chatStyles.selectMultipleText}>Select all that apply</span>
              <button 
                className={chatStyles.doneButton}
                onClick={handleMultiSelectSubmit}
                disabled={selectedOptionKeys.length === 0}
              >
                <SendIcon />
              </button>
            </div>
            <div className={chatStyles.multiSelectGrid}>
              {currentOptions.map((option) => (
                <div
                  key={option.key}
                  className={`${chatStyles.multiSelectOption} ${
                    selectedOptionKeys.includes(option.key) ? chatStyles.selected : ''
                  }`}
                  onClick={() => handleOptionToggle(option.key)}
                >
                  <span className={chatStyles.optionLabel}>{option.label}</span>
                  {option.description && (
                    <span className={chatStyles.optionDescription}>{option.description}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        // Single selection mode
        return (
          <div className={chatStyles.optionsGrid}>
            {currentOptions.map((option) => (
              <button
                key={option.key}
                className={chatStyles.optionPill}
                onClick={() => handleOptionClick(option)}
              >
                <span className={chatStyles.optionLabel}>{option.label}</span>
                {option.description && (
                  <span className={chatStyles.optionDescription}>{option.description}</span>
                )}
              </button>
            ))}
          </div>
        );
      }
    } else if (chatMode === 'free-text') {
      // MODE 3: Free Text Input
      const hasText = freeTextInput.trim().length > 0;
      
      return (
        <div className={`${chatStyles.freeTextContainer} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
          <textarea
            ref={textAreaRef}
            className={chatStyles.freeTextInput}
            placeholder="Type any additional information here (optional)..."
            value={freeTextInput}
            onChange={(e) => setFreeTextInput(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            rows={3}
          />
          <div className={chatStyles.freeTextButtons}>
            <button 
              className={`${chatStyles.submitButton} ${chatStyles.skipButton}`}
              onClick={handleSkipFreeText}
            >
              Skip
            </button>
            <button 
              className={chatStyles.submitButton}
              onClick={handleSubmitFreeText}
              disabled={!hasText}
            >
              <SendIcon className={chatStyles.sendIcon} />
              Submit Notes
            </button>
          </div>
        </div>
      );
    } else if (chatMode === 'contact-method') {
      // Contact Method Selection
      return (
        <div className={chatStyles.optionsGrid}>
          {currentOptions.map((option) => (
            <button
              key={option.key}
              className={chatStyles.optionPill}
              onClick={() => handleOptionClick(option)}
            >
              <span className={chatStyles.optionLabel}>{option.label}</span>
              {option.description && (
                <span className={chatStyles.optionDescription}>{option.description}</span>
              )}
            </button>
          ))}
        </div>
      );
    } else if (chatMode === 'contact-info') {
      // Contact Information Input
      let placeholder = '';
      let inputType: 'text' | 'email' | 'tel' = 'text';
      
      switch (currentContactStep) {
        case 'firstName':
          placeholder = 'Enter your first name...';
          break;
        case 'lastName':
          placeholder = 'Enter your surname...';
          break;
        case 'contact':
          if (contactInfo.method === 'whatsapp') {
            placeholder = 'Enter your WhatsApp number with country code...';
            inputType = 'tel';
          } else {
            placeholder = 'Enter your email address...';
            inputType = 'email';
          }
          break;
      }

      return (
        <div className={`${chatStyles.freeTextContainer} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
          <input
            ref={inputRef}
            className={`${chatStyles.freeTextInput} ${validationError ? chatStyles.inputError : ''}`}
            placeholder={placeholder}
            value={contactInput}
            onChange={(e) => handleNameInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type={inputType}
          />
          {validationError && (
            <div className={chatStyles.validationError}>
              {validationError}
            </div>
          )}
          <button 
            className={chatStyles.submitButton}
            onClick={handleSubmitContactInfo}
            disabled={!contactInput.trim()}
          >
            <SendIcon className={chatStyles.sendIcon} />
            Submit
          </button>
        </div>
      );
    } else if (chatMode === 'reference-input') {
      // Reference Number Input for Feedback Service or Existing Customers
      return (
        <div className={`${chatStyles.freeTextContainer} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
          <input
            ref={inputRef}
            className={`${chatStyles.freeTextInput} ${validationError ? chatStyles.inputError : ''}`}
            placeholder="Enter your reference number (for testing use: 123456789)..."
            value={referenceInput}
            onChange={(e) => handleReferenceInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type="text"
          />
          {validationError && (
            <div className={chatStyles.validationError}>
              {validationError}
            </div>
          )}
          <button 
            className={chatStyles.submitButton}
            onClick={handleSubmitReference}
            disabled={!referenceInput.trim()}
          >
            <SendIcon className={chatStyles.sendIcon} />
            Continue
          </button>
        </div>
      );
    } else if (chatMode === 'completed') {
      // Completion State
      return (
        <div className={chatStyles.completedContainer}>
          <button 
            className={chatStyles.restartButtonLarge}
            onClick={initializeChat}
          >
            Start New Quote
          </button>
        </div>
      );
    } else {
      // Empty state
      return (
        <div className={chatStyles.emptyOptions}>
          <div className={chatStyles.emptyOptionsText}>
            {isTyping ? 'Processing...' : 'Please wait...'}
          </div>
        </div>
      );
    }
  };

  // Render Chat Interface
  return (
    <div className={chatStyles.mobileChatContainer}>
      {/* Header */}
      <div className={chatStyles.chatHeader}>
        <button className={chatStyles.backButton} onClick={onClose}>
          ←
        </button>
        <div className={chatStyles.headerCenter}>
          <div className={chatStyles.headerTitle}>Security Quote</div>
          <div className={chatStyles.headerSubtitle}>MoreGenz Security</div>
        </div>
        {chatMode === 'completed' && (
          <button 
            className={chatStyles.restartButton}
            onClick={initializeChat}
          >
            New Quote
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className={`${chatStyles.chatContent} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
        {/* Chat Messages */}
        <div className={chatStyles.chatMessages} ref={chatContainerRef}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`${chatStyles.message} ${
                message.isUser ? chatStyles.userMessage : chatStyles.botMessage
              } ${message.isDisclaimer ? chatStyles.disclaimerMessage : ''}`}
            >
              <div className={chatStyles.messageContent}>
                {message.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              {/* Only show description for bot messages, not user messages */}
              {message.description && !message.isUser && (
                <div className={`${chatStyles.messageDescription} ${message.isDisclaimer ? chatStyles.disclaimerDescription : ''}`}>
                  {message.description}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className={chatStyles.typingIndicator}>
              <div className={chatStyles.typingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              Processing your request...
            </div>
          )}
        </div>

        {/* Options Container - Now with fixed height and scrolling */}
        <div className={`${chatStyles.optionsContainer} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
          <div className={chatStyles.optionsContent}>
            {renderOptionsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ContactSection component
const ContactSection: React.FC = () => {
  const { activeModal, openModal, closeModal } = useModal();
  const { resetChat } = useChatBot();

  const handleModalOpen = () => {
    openModal('chat');
  };

  const handleModalClose = () => {
    resetChat();
    closeModal();
  };

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
              onClick={handleModalOpen}
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </section>

      {activeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <ChatModal onClose={handleModalClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
