import { ServicePath } from '../types';

export const fencingService: ServicePath = {
  service: 'Fencing & Perimeter Security',
  description: 'Complete perimeter protection including electric fencing, razor wire, palisade fencing, and barrier systems',
  questions: {
    'start': {
      question: 'First, do you want supply + installation, or installation only?',
      description: 'This helps us understand your needs',
      options: [
        { key: 'supply-install', label: 'Supply + Installation', description: 'Complete professional installation' },
        { key: 'install-only', label: 'Installation Only', description: 'I have the equipment already' },
        { key: 'supply-only', label: 'Supply Only', description: 'Just need equipment with guidance' },
        { key: 'security-assessment', label: 'Security Assessment Only', description: 'Professional security evaluation' }
      ],
      next: {
        'supply-install': 'fence-type',
        'install-only': 'fence-type',
        'supply-only': 'fence-type',
        'security-assessment': 'fence-type'
      }
    },
    'fence-type': {
      question: 'What type of perimeter security do you need?',
      description: 'Select all that apply',
      options: [
        { key: 'electric', label: 'Electric Fencing', description: 'Shock deterrent perimeter security' },
        { key: 'razor-wire', label: 'Razor Wire Systems', description: 'High-security physical barrier' },
        { key: 'palisade', label: 'Palisade Fencing', description: 'Durable steel barrier fencing' },
        { key: 'bollards', label: 'Bollard Systems', description: 'Vehicle access control protection' },
        { key: 'barrier-arms', label: 'Barrier Arms', description: 'Traffic control and entry points' },
        { key: 'anti-climb', label: 'Anti-climb Features', description: 'Top security enhancements' },
        { key: 'detection', label: 'Detection Systems', description: 'Perimeter intrusion detection' }
      ],
      next: {
        'electric': 'property-environment',
        'razor-wire': 'property-environment',
        'palisade': 'property-environment',
        'bollards': 'property-environment',
        'barrier-arms': 'property-environment',
        'anti-climb': 'property-environment',
        'detection': 'property-environment'
      }
    },
    'property-environment': {
      question: 'Tell us about your property and environment',
      description: 'Select all that apply',
      options: [
        { key: 'residential', label: 'Residential property', description: 'Home security focus' },
        { key: 'commercial', label: 'Commercial premises', description: 'Business security needs' },
        { key: 'industrial', label: 'Industrial facility', description: 'Heavy-duty requirements' },
        { key: 'rural', label: 'Rural/farm property', description: 'Large area coverage' },
        { key: 'high-risk', label: 'High-risk area', description: 'Enhanced security needed' },
        { key: 'coastal', label: 'Coastal environment', description: 'Corrosion resistance required' },
        { key: 'rocky', label: 'Rocky terrain', description: 'Special installation considerations' },
        { key: 'sloping', label: 'Sloping ground', description: 'Level changes affect installation' }
      ],
      next: {
        'residential': 'technical-specs',
        'commercial': 'technical-specs',
        'industrial': 'technical-specs',
        'rural': 'technical-specs',
        'high-risk': 'technical-specs',
        'coastal': 'technical-specs',
        'rocky': 'technical-specs',
        'sloping': 'technical-specs'
      }
    },
    'technical-specs': {
      question: 'Technical details we need to know',
      description: 'These affect equipment selection and installation complexity',
      options: [
        { key: 'perimeter-short', label: 'Perimeter: <50m', description: 'Small property perimeter' },
        { key: 'perimeter-medium', label: 'Perimeter: 50-200m', description: 'Standard property coverage' },
        { key: 'perimeter-large', label: 'Perimeter: 200-500m', description: 'Large property perimeter' },
        { key: 'perimeter-xlarge', label: 'Perimeter: 500m+', description: 'Extensive perimeter coverage' },
        { key: 'ground-soft', label: 'Ground: Soft soil', description: 'Easy installation' },
        { key: 'ground-rocky', label: 'Ground: Rocky', description: 'Special equipment needed' },
        { key: 'ground-clay', label: 'Ground: Clay', description: 'Standard installation' },
        { key: 'ground-sand', label: 'Ground: Sand', description: 'Reinforcement needed' }
      ],
      next: {
        'perimeter-short': 'complete',
        'perimeter-medium': 'complete',
        'perimeter-large': 'complete',
        'perimeter-xlarge': 'complete',
        'ground-soft': 'complete',
        'ground-rocky': 'complete',
        'ground-clay': 'complete',
        'ground-sand': 'complete'
      }
    },
    'complete': {
      question: 'Fencing requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your perimeter security assessment is complete.'
};
