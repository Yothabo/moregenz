import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatStyles from '../../ChatBot.module.css';

interface FreeTextFlowProps {
  additionalNotes: string;
  onFreeTextSubmit: (text: string) => void;
}

export const FreeTextFlow: React.FC<FreeTextFlowProps> = ({
  additionalNotes,
  onFreeTextSubmit
}) => {
  const [freeTextInput, setFreeTextInput] = useState('');
  const hasText = freeTextInput.trim().length > 0;

  const handleSubmit = () => {
    onFreeTextSubmit(freeTextInput);
    setFreeTextInput('');
  };

  const handleSkip = () => {
    onFreeTextSubmit('');
    setFreeTextInput('');
  };

  return (
    <div className={chatStyles.freeTextContainer}>
      <textarea
        className={chatStyles.freeTextInput}
        placeholder="Type any additional information here (optional)..."
        value={freeTextInput}
        onChange={(e) => setFreeTextInput(e.target.value)}
        rows={3}
      />
      <div className={chatStyles.freeTextButtons}>
        <button
          className={`${chatStyles.submitButton} ${chatStyles.skipButton}`}
          onClick={handleSkip}
        >
          Skip
        </button>
        <button
          className={chatStyles.submitButton}
          onClick={handleSubmit}
          disabled={!hasText}
        >
          <FaPaperPlane className={chatStyles.sendIcon} />
          Submit Notes
        </button>
      </div>
    </div>
  );
};
