import React from 'react';
import chatStyles from '../../ChatBot.module.css';

interface VisualDocumentationFlowProps {
  showOptions: boolean;
  currentOptions: Array<{ key: string; label: string; description?: string }>;
  onOptionSelect: (key: string, label: string, description?: string) => void;
}

export const VisualDocumentationFlow: React.FC<VisualDocumentationFlowProps> = ({
  showOptions,
  currentOptions,
  onOptionSelect
}) => {
  if (!showOptions) return null;

  return (
    <div className={chatStyles.optionsGrid}>
      {currentOptions.map((option) => (
        <button
          key={option.key}
          className={chatStyles.optionPill}
          onClick={() => onOptionSelect(option.key, option.label, option.description)}
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
