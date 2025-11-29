import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatStyles from '../../ChatBot.module.css';

interface ContactInfoFlowProps {
  currentContactStep: 'method' | 'firstName' | 'lastName' | 'contact' | 'complete';
  contactInfo: {
    method: string;
    firstName: string;
    lastName: string;
    contact: string;
  };
  validationError: string;
  onContactInfoSubmit: (info: string, clearInput?: () => void) => void;
}

export const ContactInfoFlow: React.FC<ContactInfoFlowProps> = ({
  currentContactStep,
  contactInfo,
  validationError,
  onContactInfoSubmit
}) => {
  const [inputValue, setInputValue] = useState('');

  const getPlaceholder = () => {
    switch (currentContactStep) {
      case 'firstName':
        return 'Enter your first name...';
      case 'lastName':
        return 'Enter your surname...';
      case 'contact':
        if (contactInfo.method === 'whatsapp') {
          return 'Enter your WhatsApp number with country code...';
        } else {
          return 'Enter your email address...';
        }
      default:
        return '';
    }
  };

  const getInputType = () => {
    if (currentContactStep === 'contact' && contactInfo.method === 'whatsapp') {
      return 'tel';
    } else if (currentContactStep === 'contact' && contactInfo.method === 'email') {
      return 'email';
    }
    return 'text';
  };

  const handleSubmit = () => {
    onContactInfoSubmit(inputValue, () => setInputValue(''));
  };

  const handleNameInputChange = (value: string) => {
    if (currentContactStep === 'firstName' || currentContactStep === 'lastName') {
      const words = value.split(' ');
      const capitalizedWords = words.map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      setInputValue(capitalizedWords.join(' '));
    } else {
      setInputValue(value);
    }
  };

  return (
    <div className={chatStyles.freeTextContainer}>
      <input
        className={`${chatStyles.freeTextInput} ${validationError ? chatStyles.inputError : ''}`}
        placeholder={getPlaceholder()}
        value={inputValue}
        onChange={(e) => handleNameInputChange(e.target.value)}
        type={getInputType()}
      />
      {validationError && (
        <div className={chatStyles.validationError}>
          {validationError}
        </div>
      )}
      <button
        className={chatStyles.submitButton}
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
      >
        <FaPaperPlane className={chatStyles.sendIcon} />
        Submit
      </button>
    </div>
  );
};
