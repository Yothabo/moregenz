import { ServicePath } from '../types';

export const networkingService: ServicePath = {
  service: 'Networking & Connectivity',
  description: 'WiFi extension, mesh setup, network cabling, and connectivity solutions',
  questions: {
    'start': {
      question: 'First, what type of networking service do you need?',
      description: 'This helps us understand your requirements',
      options: [
        { key: 'wifi-extension', label: 'WiFi Extension', description: 'Improve wireless coverage' },
        { key: 'mesh-setup', label: 'Mesh Network Setup', description: 'Whole-home/business coverage' },
        { key: 'network-cabling', label: 'Network Cabling', description: 'Structured cabling installation' },
        { key: 'consultation', label: 'Consultation & Assessment', description: 'Professional network evaluation' }
      ],
      next: {
        'wifi-extension': 'property-size',
        'mesh-setup': 'property-size',
        'network-cabling': 'property-size',
        'consultation': 'property-size'
      }
    },
    'property-size': {
      question: 'What size is the area that needs coverage?',
      description: 'This helps determine equipment requirements',
      options: [
        { key: 'small', label: 'Small (up to 150m²)', description: 'Apartment or small office' },
        { key: 'medium', label: 'Medium (150-300m²)', description: 'House or medium office' },
        { key: 'large', label: 'Large (300-600m²)', description: 'Large home or office floor' },
        { key: 'x-large', label: 'Extra Large (600m²+)', description: 'Commercial building or estate' }
      ],
      next: {
        'small': 'current-issues',
        'medium': 'current-issues',
        'large': 'current-issues',
        'x-large': 'current-issues'
      }
    },
    'current-issues': {
      question: 'What connectivity issues are you experiencing?',
      description: 'Select all that apply',
      options: [
        { key: 'dead-zones', label: 'Dead zones', description: 'Areas with no signal' },
        { key: 'slow-speeds', label: 'Slow speeds', description: 'Poor performance' },
        { key: 'intermittent', label: 'Intermittent connection', description: 'Dropping connection' },
        { key: 'coverage', label: 'Poor coverage', description: 'Weak signal in some areas' },
        { key: 'new-setup', label: 'New setup needed', description: 'First time installation' }
      ],
      next: {
        'dead-zones': 'complete',
        'slow-speeds': 'complete',
        'intermittent': 'complete',
        'coverage': 'complete',
        'new-setup': 'complete'
      }
    },
    'complete': {
      question: 'Networking requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your networking requirements have been captured.'
};
