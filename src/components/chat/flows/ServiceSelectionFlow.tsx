import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import chatStyles from '../../ChatBot.module.css';

interface ServiceSelectionFlowProps {
  showOptions: boolean;
  currentOptions: Array<{ key: string; label: string; description?: string }>;
  selectedServices: string[];
  onServiceToggle: (serviceKey: string) => void;
  onMultipleServicesSubmit: () => void;
}

export const ServiceSelectionFlow: React.FC<ServiceSelectionFlowProps> = ({
  showOptions,
  currentOptions,
  selectedServices,
  onServiceToggle,
  onMultipleServicesSubmit
}) => {
  console.log('ServiceSelectionFlow - showOptions:', showOptions);
  console.log('ServiceSelectionFlow - currentOptions:', currentOptions);
  console.log('ServiceSelectionFlow - selectedServices:', selectedServices);

  if (!showOptions) {
    console.log('ServiceSelectionFlow: showOptions is false, returning null');
    return null;
  }

  if (!currentOptions || currentOptions.length === 0) {
    console.log('ServiceSelectionFlow: currentOptions is empty, returning null');
    return null;
  }

  return (
    <div className={chatStyles.multiSelectContainer}>
      <div className={chatStyles.multiSelectHeader}>
        <span className={chatStyles.selectMultipleText}>Select a service</span>
        <button
          className={chatStyles.doneButton}
          onClick={onMultipleServicesSubmit}
          disabled={selectedServices.length === 0}
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className={chatStyles.multiSelectGrid}>
        {currentOptions.map((option) => (
          <div
            key={option.key}
            className={`${chatStyles.multiSelectOption} ${
              selectedServices.includes(option.key) ? chatStyles.selected : ''
            }`}
            onClick={() => onServiceToggle(option.key)}
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
};
