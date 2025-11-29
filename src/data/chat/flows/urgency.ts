import { DecisionNode } from '../types';

export const urgencyFlow: { [key: string]: DecisionNode } = {
  'timeline': {
    question: 'How urgent is the job?',
    description: 'This helps us prioritize and schedule appropriately',
    options: [
      { key: 'emergency', label: 'Emergency', description: 'Same day response needed' },
      { key: 'urgent', label: 'Urgent', description: '24-48 hours required' },
      { key: 'this-week', label: 'This week', description: 'Within 7 days' },
      { key: 'no-rush', label: 'No rush', description: 'Just exploring options' },
      { key: 'planning', label: 'Planning phase', description: 'Future project' }
    ],
    next: {
      'emergency': 'site-visit-interest',
      'urgent': 'site-visit-interest',
      'this-week': 'site-visit-interest',
      'no-rush': 'site-visit-interest',
      'planning': 'site-visit-interest'
    }
  },
  'site-visit-interest': {
    question: 'Would you like us to schedule a site visit for accurate measurement and planning?',
    description: 'Site visits ensure perfect system design and pricing',
    options: [
      { key: 'yes-site-visit', label: 'Yes, schedule a site visit', description: 'Book professional assessment' },
      { key: 'no-site-visit', label: 'Not now, just need a quote', description: 'Get preliminary pricing' },
      { key: 'comparing-prices', label: 'I\'m comparing prices', description: 'Research phase' },
      { key: 'had-assessment', label: 'Already had a site assessment', description: 'Proceed with quote' }
    ],
    next: {
      'yes-site-visit': 'complete',
      'no-site-visit': 'complete',
      'comparing-prices': 'complete',
      'had-assessment': 'complete'
    }
  },
  'complete': {
    question: 'Urgency assessment complete',
    description: 'Moving to contact preferences',
    options: [
      { key: 'continue', label: 'Continue', description: 'Proceed to next step' }
    ]
  }
};
