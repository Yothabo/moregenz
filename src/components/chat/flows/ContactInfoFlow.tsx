import React from 'react';
import { ContactStep, ContactInfo } from '../../../data/chat/typesExtended';

interface ContactInfoFlowProps {
  currentContactStep: ContactStep;
  contactInfo: ContactInfo;
  validationError: string;
  onContactInfoSubmit: (info: string, clearInput?: () => void) => void;
}

export const ContactInfoFlow: React.FC<ContactInfoFlowProps> = ({
  currentContactStep,
  contactInfo,
  validationError,
  onContactInfoSubmit
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    onContactInfoSubmit(inputValue, () => setInputValue(''));
  };

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
    <div className="contact-info-flow">
      <input
        type={inputType}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={validationError ? 'input-error' : ''}
      />
      {validationError && (
        <div className="validation-error">
          {validationError}
        </div>
      )}
      <button 
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
      >
        Submit
      </button>
    </div>
  );
};
