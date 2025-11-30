import { DecisionNode } from '../types';

export const contactPreferenceFlow: DecisionNode = {
  question: 'How should we send your quote and updates?',
  description: 'Choose your preferred communication method',
  options: [
    { key: 'whatsapp', label: 'WhatsApp', description: 'Instant messaging with file support' },
    { key: 'email', label: 'Email', description: 'Detailed documents and attachments' },
    { key: 'both', label: 'Both WhatsApp and Email', description: 'Comprehensive communication' }
  ]
};
