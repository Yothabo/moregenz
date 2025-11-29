import React from 'react';
import chatStyles from '../../ChatBot.module.css';

interface CompletedFlowProps {
  onRestart: () => void;
}

export const CompletedFlow: React.FC<CompletedFlowProps> = ({ onRestart }) => {
  return (
    <div className={chatStyles.completedContainer}>
      <button
        className={chatStyles.restartButtonLarge}
        onClick={onRestart}
      >
        Start New Quote
      </button>
    </div>
  );
};
