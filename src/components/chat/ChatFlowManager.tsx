import React from 'react';
import { ServiceSelectionFlow } from './flows/ServiceSelectionFlow';
import { ServiceConversationFlow } from './flows/ServiceConversationFlow';
import { ContactMethodFlow } from './flows/ContactMethodFlow';
import { ContactInfoFlow } from './flows/ContactInfoFlow';
import { ReferenceInputFlow } from './flows/ReferenceInputFlow';
import { FreeTextFlow } from './flows/FreeTextFlow';
import { CompletedFlow } from './flows/CompletedFlow';
import { useChatBot } from '../../hooks/useChatBot';
import chatStyles from '../ChatBot.module.css';

interface ChatFlowManagerProps {
  onClose: () => void;
}

export const ChatFlowManager: React.FC<ChatFlowManagerProps> = ({ onClose }) => {
  const {
    chatMessages,
    isTyping,
    showOptions,
    currentOptions,
    selectedServices,
    serviceDetails,
    additionalNotes,
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
    handleServiceToggle,
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

  // Render the appropriate flow based on chat mode
  const renderCurrentFlow = () => {
    switch (chatMode) {
      case 'service-selection':
        return (
          <ServiceSelectionFlow
            showOptions={showOptions}
            currentOptions={currentOptions}
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
            onMultipleServicesSubmit={handleMultipleServicesSubmit}
          />
        );

      case 'conversation':
        return (
          <ServiceConversationFlow
            showOptions={showOptions}
            currentOptions={currentOptions}
            isMultiSelect={isMultiSelect}
            selectedOptionKeys={selectedOptionKeys}
            onOptionSelect={handleOptionSelect}
            onOptionToggle={handleOptionToggle}
            onMultiSelectSubmit={handleMultiSelectSubmit}
          />
        );

      case 'contact-method':
        return (
          <ContactMethodFlow
            showOptions={showOptions}
            currentOptions={currentOptions}
            onContactMethodSelect={handleContactMethodSelect}
          />
        );

      case 'contact-info':
        return (
          <ContactInfoFlow
            currentContactStep={currentContactStep}
            contactInfo={contactInfo}
            validationError={validationError}
            onContactInfoSubmit={handleContactInfoSubmit}
          />
        );

      case 'reference-input':
        return (
          <ReferenceInputFlow
            referenceInput={referenceInput}
            setReferenceInput={setReferenceInput}
            validationError={validationError}
            onReferenceSubmit={handleReferenceInputSubmit}
          />
        );

      case 'free-text':
        return (
          <FreeTextFlow
            additionalNotes={additionalNotes}
            onFreeTextSubmit={handleFreeTextSubmit}
          />
        );

      case 'completed':
        return (
          <CompletedFlow onRestart={initializeChat} />
        );

      default:
        return (
          <div className={chatStyles.emptyOptions}>
            <div className={chatStyles.emptyOptionsText}>
              Loading...
            </div>
          </div>
        );
    }
  };

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
      <div className={chatStyles.chatContent}>
        {/* Chat Messages */}
        <div className={chatStyles.chatMessages} ref={chatContainerRef}>
          {chatMessages.length === 0 ? (
            <div className={chatStyles.typingIndicator}>
              <div className={chatStyles.typingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              Starting chat...
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Current Flow Options */}
        <div className={chatStyles.optionsContainer}>
          <div className={chatStyles.optionsContent}>
            {renderCurrentFlow()}
          </div>
        </div>
      </div>
    </div>
  );
};
