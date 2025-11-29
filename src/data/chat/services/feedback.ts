import { ServicePath } from '../types';

export const feedbackService: ServicePath = {
  service: 'Feedback & Support',
  description: 'Share your experience, provide feedback, or get support for existing systems',
  requiresReference: true,
  questions: {
    'start': {
      question: 'Do you have a reference number from a previous quote or installation?',
      description: 'Feedback and support is available to existing customers with reference numbers',
      options: [
        { key: 'yes-reference', label: 'Yes, I have a reference number', description: 'Proceed with feedback or support request' },
        { key: 'no-reference', label: 'No reference number', description: 'Get a quote first to receive a reference number' }
      ],
      next: {
        'yes-reference': 'reference-input',
        'no-reference': 'get-quote-redirect'
      }
    },
    'reference-input': {
      question: 'Please enter your reference number:',
      description: 'Enter the reference number from your previous quotation',
      options: [
        { key: 'continue', label: 'Continue', description: 'Proceed after entering reference number' }
      ]
    },
    'get-quote-redirect': {
      question: 'To access feedback and support, you\'ll need a reference number from a previous quote.',
      description: 'Please request a quote first to receive your reference number',
      options: [
        { key: 'get-quote', label: 'Get a Quote', description: 'Start a new quote request' },
        { key: 'cancel', label: 'Cancel', description: 'Return to main menu' }
      ]
    },
    'service-type': {
      question: 'Welcome back! What type of assistance do you need today?',
      description: 'We\'re here to help with any issues or questions',
      options: [
        { key: 'service-feedback', label: 'Service Feedback', description: 'Share your experience with our work' },
        { key: 'technical-support', label: 'Technical Support', description: 'Help with existing systems' },
        { key: 'maintenance-request', label: 'Maintenance Request', description: 'Service or repairs' },
        { key: 'quote-followup', label: 'Quote Follow-up', description: 'Previous quote questions' },
        { key: 'urgent-fault', label: 'Urgent Fault Report', description: 'System not working' },
        { key: 'warranty-claim', label: 'Warranty Claim', description: 'Manufacturing issues' },
        { key: 'billing-inquiry', label: 'Billing Inquiry', description: 'Invoice questions' }
      ],
      next: {
        'service-feedback': 'complete',
        'technical-support': 'complete',
        'maintenance-request': 'complete',
        'quote-followup': 'complete',
        'urgent-fault': 'complete',
        'warranty-claim': 'complete',
        'billing-inquiry': 'complete'
      }
    },
    'complete': {
      question: 'Support request received',
      description: 'Our team will contact you shortly',
      options: [
        { key: 'finish', label: 'Finish', description: 'Complete support request' }
      ]
    }
  },
  finalMessage: 'Thank you for your support request. Our team will contact you within 24 hours to assist you.'
};
