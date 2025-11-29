import { DecisionNode } from '../types';

export const visualDocumentationFlow: { [key: string]: DecisionNode } = {
  'media-request': {
    question: 'To help us understand your setup and provide the most accurate quote, could you upload a few visuals?',
    description: 'Visuals help us assess installation challenges and requirements',
    options: [
      { key: 'upload-photos', label: 'Upload photos', description: 'Share pictures of the area' },
      { key: 'upload-video', label: 'Upload a short video', description: 'Walk-through video of the space' },
      { key: 'skip-media', label: 'Skip for now', description: 'Continue without media' }
    ],
    next: {
      'upload-photos': 'complete',
      'upload-video': 'complete',
      'skip-media': 'complete'
    }
  },
  'complete': {
    question: 'Visual documentation complete',
    description: 'Moving to urgency assessment',
    options: [
      { key: 'continue', label: 'Continue', description: 'Proceed to next step' }
    ]
  }
};
