import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatStyles from '../../ChatBot.module.css';

interface ReferenceInputFlowProps {
  referenceInput: string;
  setReferenceInput: (value: string) => void;
  validationError: string;
  onReferenceSubmit: () => void;
}

export const ReferenceInputFlow: React.FC<ReferenceInputFlowProps> = ({
  referenceInput,
  setReferenceInput,
  validationError,
  onReferenceSubmit
}) => {
  const handleReferenceInputChange = (value: string) => {
    setReferenceInput(value.toUpperCase());
  };

  return (
    <div className={chatStyles.freeTextContainer}>
      <input
        className={`${chatStyles.freeTextInput} ${validationError ? chatStyles.inputError : ''}`}
        placeholder="Enter your reference number..."
        value={referenceInput}
        onChange={(e) => handleReferenceInputChange(e.target.value)}
        type="text"
      />
      {validationError && (
        <div className={chatStyles.validationError}>
          {validationError}
        </div>
      )}
      <button
        className={chatStyles.submitButton}
        onClick={onReferenceSubmit}
        disabled={!referenceInput.trim()}
      >
        <FaPaperPlane className={chatStyles.sendIcon} />
        Continue
      </button>
    </div>
  );
};
