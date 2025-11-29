import { ServicePath } from '../types';

export const alarmsService: ServicePath = {
  service: 'Alarm & Intrusion Detection',
  description: 'Comprehensive intrusion detection, motion sensors, glass break detectors, and fire alarm systems',
  questions: {
    'start': {
      question: 'First, do you want supply + installation, or installation only?',
      description: 'This helps us understand your needs',
      options: [
        { key: 'supply-install', label: 'Supply + Installation', description: 'Complete professional installation' },
        { key: 'install-only', label: 'Installation Only', description: 'I have the equipment already' },
        { key: 'supply-only', label: 'Supply Only', description: 'Just need equipment with guidance' },
        { key: 'security-assessment', label: 'Security Assessment Only', description: 'Professional evaluation' }
      ],
      next: {
        'supply-install': 'system-type',
        'install-only': 'system-type',
        'supply-only': 'system-type',
        'security-assessment': 'system-type'
      }
    },
    'system-type': {
      question: 'What type of alarm system do you need?',
      description: 'Select all that apply',
      options: [
        { key: 'intruder', label: 'Intruder Alarm System', description: 'Comprehensive intrusion detection' },
        { key: 'motion', label: 'Motion Sensor System', description: 'Advanced motion detection' },
        { key: 'glass-break', label: 'Glass Break Detection', description: 'Acoustic window security' },
        { key: 'fire', label: 'Fire & Smoke Detection', description: 'Early warning fire safety' },
        { key: 'combo', label: 'Complete Security System', description: 'Integrated alarm system' }
      ],
      next: {
        'intruder': 'property-details',
        'motion': 'property-details',
        'glass-break': 'property-details',
        'fire': 'property-details',
        'combo': 'property-details'
      }
    },
    'property-details': {
      question: 'Tell us about your property',
      description: 'Select all that apply',
      options: [
        { key: 'residential', label: 'Residential property', description: 'Home security' },
        { key: 'commercial', label: 'Commercial building', description: 'Business premises' },
        { key: 'industrial', label: 'Industrial facility', description: 'Factory or warehouse' },
        { key: 'multi-storey', label: 'Multi-storey building', description: 'Multiple floors' },
        { key: 'large-property', label: 'Large property', description: 'Extensive coverage needed' }
      ],
      next: {
        'residential': 'technical-specs',
        'commercial': 'technical-specs',
        'industrial': 'technical-specs',
        'multi-storey': 'technical-specs',
        'large-property': 'technical-specs'
      }
    },
    'technical-specs': {
      question: 'Technical requirements',
      description: 'Select all that apply',
      options: [
        { key: 'wireless', label: 'Wireless System', description: 'Easy installation, flexible' },
        { key: 'wired', label: 'Wired System', description: 'Most reliable, permanent' },
        { key: 'monitoring', label: 'Professional Monitoring', description: '24/7 security center' },
        { key: 'self-monitor', label: 'Self Monitoring', description: 'Mobile app alerts' },
        { key: 'integration', label: 'System Integration', description: 'With cameras/access control' }
      ],
      next: {
        'wireless': 'complete',
        'wired': 'complete',
        'monitoring': 'complete',
        'self-monitor': 'complete',
        'integration': 'complete'
      }
    },
    'complete': {
      question: 'Alarm system requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your alarm system requirements have been captured.'
};
