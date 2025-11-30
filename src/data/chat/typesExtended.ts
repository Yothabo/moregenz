export interface ChatMessage {
  text: string;
  isUser: boolean;
  description?: string;
  isDisclaimer?: boolean;
}

export type ChatMode = 
  | 'service-selection'
  | 'service-flow'
  | 'service-text-input'
  | 'conversation'
  | 'contact-method'
  | 'contact-info'
  | 'reference-input'
  | 'free-text'
  | 'completed';

export type ContactStep = 'method' | 'firstName' | 'lastName' | 'contact';

export interface ContactInfo {
  method: string;
  firstName: string;
  lastName: string;
  contact: string;
}

export interface ServiceOption {
  key: string;
  label: string;
  description?: string;
}

export interface DecisionNode {
  question: string;
  description?: string;
  options: ServiceOption[];
  multiSelect?: boolean;
  responses?: {
    [key: string]: {
      text: string;
      description?: string;
      nextAction?: string;
    };
  };
}
