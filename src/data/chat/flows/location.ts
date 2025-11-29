import { DecisionNode } from '../types';

export const locationFlow: { [key: string]: DecisionNode } = {
  'property-type': {
    question: 'Where should the installation or service take place?',
    description: 'This helps us understand the property type and requirements',
    options: [
      { key: 'home', label: 'Home', description: 'Residential property' },
      { key: 'business', label: 'Business', description: 'Commercial premises' },
      { key: 'complex', label: 'Complex / Estate', description: 'Gated community or complex' },
      { key: 'industrial', label: 'Industrial Site', description: 'Factory, warehouse, industrial facility' }
    ],
    next: {
      'home': 'location-sharing',
      'business': 'location-sharing',
      'complex': 'location-sharing',
      'industrial': 'location-sharing'
    }
  },
  'location-sharing': {
    question: 'Great. How would you like to share your location?',
    description: 'Choose the method that works best for you',
    options: [
      { key: 'maps-pin', label: 'Send Google Maps pin', description: 'Share your exact location' },
      { key: 'street-address', label: 'Type street address', description: 'Enter your address manually' },
      { key: 'live-location', label: 'Send live location', description: 'Share real-time location' },
      { key: 'provide-later', label: 'I\'ll provide it later', description: 'Continue without location for now' }
    ],
    next: {
      'maps-pin': 'address-confirmation',
      'street-address': 'address-confirmation',
      'live-location': 'address-confirmation',
      'provide-later': 'access-requirements'
    }
  },
  'address-confirmation': {
    question: 'Perfect. Can you also confirm the city and suburb?',
    description: 'This ensures we serve your area',
    options: [
      { key: 'confirm-address', label: 'Confirm Address', description: 'Proceed with location details' }
    ],
    next: {
      'confirm-address': 'access-requirements'
    }
  },
  'access-requirements': {
    question: 'Do we need special access for entry?',
    description: 'This helps our technicians prepare for the site visit',
    options: [
      { key: 'no-access', label: 'No', description: 'Standard access available' },
      { key: 'security-gate', label: 'Security gate / access code needed', description: 'Gate codes or remote access' },
      { key: 'estate-access', label: 'Estate or complex access required', description: 'Guard house or complex entry' },
      { key: 'limited-parking', label: 'On-site parking is limited', description: 'Parking challenges' },
      { key: 'timing-restrictions', label: 'Specific timing restrictions apply', description: 'Limited access hours' }
    ],
    next: {
      'no-access': 'complete',
      'security-gate': 'complete',
      'estate-access': 'complete',
      'limited-parking': 'complete',
      'timing-restrictions': 'complete'
    }
  },
  'complete': {
    question: 'Location details complete',
    description: 'Moving to visual documentation',
    options: [
      { key: 'continue', label: 'Continue', description: 'Proceed to next step' }
    ]
  }
};
