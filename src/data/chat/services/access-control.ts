import { ServicePath } from '../types';

export const accessControlService: ServicePath = {
  service: 'Access Control & Gate Automation',
  description: 'Secure entry management including biometric systems, card access, intercoms, and gate automation',
  questions: {
    'start': {
      question: 'First, do you want supply + installation, or installation only?',
      description: 'This helps us understand your needs',
      options: [
        { key: 'supply-install', label: 'Supply + Installation', description: 'Complete professional installation' },
        { key: 'install-only', label: 'Installation Only', description: 'I have the equipment already' },
        { key: 'supply-only', label: 'Supply Only', description: 'Just need equipment with guidance' },
        { key: 'system-design', label: 'System Design Only', description: 'Professional system planning' }
      ],
      next: {
        'supply-install': 'system-type',
        'install-only': 'system-type',
        'supply-only': 'system-type',
        'system-design': 'system-type'
      }
    },
    'system-type': {
      question: 'What type of access control do you need?',
      description: 'Select all that apply',
      options: [
        { key: 'biometric', label: 'Biometric Systems', description: 'Fingerprint, facial recognition' },
        { key: 'card-access', label: 'Card Access Systems', description: 'RFID, smart card entry' },
        { key: 'video-intercom', label: 'Video Intercom', description: 'Audio-visual visitor communication' },
        { key: 'gate-automation', label: 'Gate Automation', description: 'Sliding, swing, or boom gates' },
        { key: 'number-plate', label: 'Number Plate Recognition', description: 'Automated vehicle access' },
        { key: 'mobile-access', label: 'Mobile Access', description: 'Smartphone-controlled entry' },
        { key: 'keypad', label: 'Keypad Systems', description: 'Code-based entry' }
      ],
      next: {
        'biometric': 'gate-details',
        'card-access': 'gate-details',
        'video-intercom': 'gate-details',
        'gate-automation': 'gate-details',
        'number-plate': 'gate-details',
        'mobile-access': 'gate-details',
        'keypad': 'gate-details'
      }
    },
    'gate-details': {
      question: 'Tell us about your gates and entry points',
      description: 'Select all that apply',
      options: [
        { key: 'sliding-gate', label: 'Sliding gate', description: 'Horizontal movement' },
        { key: 'swing-gate', label: 'Swing gate', description: 'Hinged movement' },
        { key: 'boom-gate', label: 'Boom gate', description: 'Barrier arm system' },
        { key: 'industrial-gate', label: 'Industrial gate', description: 'Heavy-duty application' },
        { key: 'single-vehicle', label: 'Single vehicle gate', description: 'Standard residential' },
        { key: 'double-vehicle', label: 'Double vehicle gate', description: 'Wide entrance' },
        { key: 'large-commercial', label: 'Large commercial gate', description: 'Business premises' },
        { key: 'industrial-size', label: 'Industrial size gate', description: 'Heavy industrial use' }
      ],
      next: {
        'sliding-gate': 'technical-requirements',
        'swing-gate': 'technical-requirements',
        'boom-gate': 'technical-requirements',
        'industrial-gate': 'technical-requirements',
        'single-vehicle': 'technical-requirements',
        'double-vehicle': 'technical-requirements',
        'large-commercial': 'technical-requirements',
        'industrial-size': 'technical-requirements'
      }
    },
    'technical-requirements': {
      question: 'Technical specifications and preferences',
      description: 'Select all that apply',
      options: [
        { key: 'poe', label: 'Power over Ethernet (PoE)', description: 'Single cable solution' },
        { key: 'wireless', label: 'Wireless connectivity', description: 'Reduced cabling needs' },
        { key: 'battery-backup', label: 'Battery backup', description: 'Operation during outages' },
        { key: 'solar-power', label: 'Solar power option', description: 'Off-grid capability' },
        { key: 'integration-ready', label: 'Integration ready', description: 'With other security systems' },
        { key: 'remote-management', label: 'Remote management', description: 'Cloud-based control' },
        { key: 'multi-user', label: 'Multi-user access', description: 'Different access levels' },
        { key: 'time-based', label: 'Time-based access', description: 'Scheduled entry permissions' }
      ],
      next: {
        'poe': 'complete',
        'wireless': 'complete',
        'battery-backup': 'complete',
        'solar-power': 'complete',
        'integration-ready': 'complete',
        'remote-management': 'complete',
        'multi-user': 'complete',
        'time-based': 'complete'
      }
    },
    'complete': {
      question: 'Access control requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your access control requirements have been documented.'
};
