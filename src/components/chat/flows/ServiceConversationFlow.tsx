import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatStyles from '../../ChatBot.module.css';

interface ServiceConversationFlowProps {
  showOptions: boolean;
  currentOptions: Array<{ key: string; label: string; description?: string }>;
  isMultiSelect: boolean;
  selectedOptionKeys: string[];
  onOptionSelect: (key: string, label: string, description?: string) => void;
  onOptionToggle: (key: string) => void;
  onMultiSelectSubmit: () => void;
}

export const ServiceConversationFlow: React.FC<ServiceConversationFlowProps> = ({
  showOptions,
  currentOptions,
  isMultiSelect,
  selectedOptionKeys,
  onOptionSelect,
  onOptionToggle,
  onMultiSelectSubmit
}) => {
  if (!showOptions) return null;

  if (isMultiSelect) {
    return (
      <div className={chatStyles.multiSelectContainer}>
        <div className={chatStyles.multiSelectHeader}>
          <span className={chatStyles.selectMultipleText}>Select all that apply</span>
          <button
            className={chatStyles.doneButton}
            onClick={onMultiSelectSubmit}
            disabled={selectedOptionKeys.length === 0}
          >
            <FaPaperPlane />
          </button>
        </div>
        <div className={chatStyles.multiSelectGrid}>
          {currentOptions.map((option) => (
            <div
              key={option.key}
              className={`${chatStyles.multiSelectOption} ${
                selectedOptionKeys.includes(option.key) ? chatStyles.selected : ''
              }`}
              onClick={() => onOptionToggle(option.key)}
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
  }

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
