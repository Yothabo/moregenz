import React, { useEffect, useState, useRef } from 'react';
import { useChatBot } from '../hooks/useChatBot';
import { servicesData } from '../data/chat/services/serviceMapping';
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

// Share Icon SVG component
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
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
    serviceStates,
    currentServiceIndex,
    textInputValue,
    setTextInputValue,
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
    handleServiceFlowTextInputSubmit,
    resetChat
  } = useChatBot();

  const [freeTextInput, setFreeTextInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current service state
  const currentServiceState = serviceStates[currentServiceIndex];

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

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'MoreGenz Security Quote',
      text: 'Get your professional security system quote from MoreGenz Security Systems',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleOptionClick = (option: { key: string; label: string; description?: string }) => {
    if (chatMode === 'conversation' || chatMode === 'service-flow') {
      if (isMultiSelect) {
        handleOptionToggle(option.key);
      } else {
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

  const handleSubmitServiceTextInput = () => {
    handleServiceFlowTextInputSubmit();
    setTextInputValue('');
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
      // MODE 1: Service Selection - ALWAYS MULTI-SELECT
      return (
        <div className={chatStyles.multiSelectContainer}>
          <div className={chatStyles.multiSelectHeader}>
            <span className={chatStyles.selectMultipleText}>Select all services you need</span>
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
                }`}
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
    } else if (showOptions && chatMode === 'service-flow') {
      // MODE 2: Service Flow - Multi-select or single based on question
      if (isMultiSelect) {
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
        // Single selection mode for service flow
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
    } else if (showOptions && chatMode === 'service-text-input') {
      // MODE 3: Service Text Input - For equipment descriptions, etc.
      const hasText = textInputValue.trim().length > 0;
      
      return (
        <div className={`${chatStyles.freeTextContainer} ${isKeyboardVisible ? chatStyles.keyboardActive : ''}`}>
          <textarea
            ref={textAreaRef}
            className={chatStyles.freeTextInput}
            placeholder="Type your description here..."
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            rows={3}
          />
          <div className={chatStyles.freeTextButtons}>
            <button 
              className={chatStyles.submitButton}
              onClick={handleSubmitServiceTextInput}
              disabled={!hasText}
            >
              <SendIcon className={chatStyles.sendIcon} />
              Submit
            </button>
          </div>
        </div>
      );
    } else if (showOptions && chatMode === 'conversation') {
      // MODE 4: Conversation Options
      if (isMultiSelect) {
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
      // MODE 5: Free Text Input
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
      // Contact Method Selection - Single selection only
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
      // Reference Number Input for standalone reference input
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

  // Get header title based on current mode
  const getHeaderTitle = () => {
    if ((chatMode === 'service-flow' || chatMode === 'service-text-input') && currentServiceState) {
      const serviceData = servicesData.find(s => s.key === currentServiceState.serviceKey);
      return serviceData?.label || 'Service Details';
    }
    return 'Security Quote';
  };

  // Render Chat Interface
  return (
    <div className={chatStyles.mobileChatContainer}>
      {/* Header */}
      <div className={chatStyles.chatHeader}>
        <button className={chatStyles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={chatStyles.headerCenter}>
          <div className={chatStyles.headerTitle}>{getHeaderTitle()}</div>
          <div className={chatStyles.headerSubtitle}>
            {(chatMode === 'service-flow' || chatMode === 'service-text-input') && serviceStates.length > 1 
              ? `Service ${currentServiceIndex + 1} of ${serviceStates.length}` 
              : 'MoreGenz Security'
            }
          </div>
        </div>
        <div className={chatStyles.headerRight}>
          {chatMode === 'completed' ? (
            <button 
              className={chatStyles.restartButton}
              onClick={initializeChat}
            >
              New Quote
            </button>
          ) : (
            <button 
              className={chatStyles.shareButton}
              onClick={handleShare}
              title="Share this quote assistant"
            >
              <ShareIcon className={chatStyles.shareIcon} />
              Share
            </button>
          )}
        </div>
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
                {message.text.split('\n').map((line: string, i: number) => (
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

export default ChatModal;
