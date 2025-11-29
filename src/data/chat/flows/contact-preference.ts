import { DecisionNode } from '../types';

export const contactPreferenceFlow: { [key: string]: DecisionNode } = {
  'contact-method': {
    question: 'How should we send your quote and updates?',
    description: 'Choose your preferred communication method',
    options: [
      { key: 'whatsapp', label: 'WhatsApp', description: 'Instant messaging with file support' },
      { key: 'email', label: 'Email', description: 'Detailed documents and attachments' },
      { key: 'both', label: 'Both WhatsApp and Email', description: 'Comprehensive communication' }
    ],
    next: {
      'whatsapp': 'complete',
      'email': 'complete',
      'both': 'complete'
    }
  },
  'complete': {
    question: 'All information collected!',
    description: 'Ready to proceed with quote generation',
    options: [
      { key: 'finish', label: 'Get My Quote', description: 'Complete the process' }
    ]
  }
};
