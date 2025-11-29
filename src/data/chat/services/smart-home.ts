import { ServicePath } from '../types';

export const smartHomeService: ServicePath = {
  service: 'Smart Home Automation',
  description: 'Smart locks, lighting control, home integration, and automation systems',
  questions: {
    'start': {
      question: 'What type of smart automation are you interested in?',
      description: 'Select all that apply',
      options: [
        { key: 'smart-locks', label: 'Smart Locks', description: 'Keyless entry systems' },
        { key: 'lighting', label: 'Smart Lighting', description: 'Automated lighting control' },
        { key: 'climate', label: 'Climate Control', description: 'Smart thermostats' },
        { key: 'security-integration', label: 'Security Integration', description: 'Connect with security systems' },
        { key: 'whole-home', label: 'Whole Home Automation', description: 'Complete smart home setup' }
      ],
      next: {
        'smart-locks': 'property-type',
        'lighting': 'property-type',
        'climate': 'property-type',
        'security-integration': 'property-type',
        'whole-home': 'property-type'
      }
    },
    'property-type': {
      question: 'Where will the automation be installed?',
      description: 'This helps us recommend suitable products',
      options: [
        { key: 'residential', label: 'Residential Home', description: 'Private residence' },
        { key: 'apartment', label: 'Apartment', description: 'Flat or condo' },
        { key: 'commercial', label: 'Commercial Building', description: 'Office or business' },
        { key: 'estate', label: 'Estate Property', description: 'Large residential property' }
      ],
      next: {
        'residential': 'complete',
        'apartment': 'complete',
        'commercial': 'complete',
        'estate': 'complete'
      }
    },
    'complete': {
      question: 'Smart home requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your smart home automation requirements have been captured.'
};
