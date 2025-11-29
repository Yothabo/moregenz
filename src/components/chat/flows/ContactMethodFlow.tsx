import React from 'react';
import chatStyles from '../../ChatBot.module.css';

interface ContactMethodFlowProps {
  showOptions: boolean;
  currentOptions: Array<{ key: string; label: string; description?: string }>;
  onContactMethodSelect: (methodKey: string) => void;
}

export const ContactMethodFlow: React.FC<ContactMethodFlowProps> = ({
  showOptions,
  currentOptions,
  onContactMethodSelect
}) => {
  if (!showOptions) return null;

  return (
    <div className={chatStyles.optionsGrid}>
      {currentOptions.map((option) => (
        <button
          key={option.key}
          className={chatStyles.optionPill}
          onClick={() => onContactMethodSelect(option.key)}
        >
          <span className={chatStyles.optionLabel}>{option.label}</span>
          {option.description && (
            <span className={chatStyles.optionDescription}>{option.description}</span>
          )}
        </button>
      ))}
    </div>
  );
};
