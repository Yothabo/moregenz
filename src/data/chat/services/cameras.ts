import { ServicePath } from '../types';

export const camerasService: ServicePath = {
  service: 'Camera & Surveillance Systems',
  description: 'Complete surveillance solutions from basic monitoring to advanced AI-powered security',
  questions: {
    'start': {
      question: 'How can we help you with camera systems today?',
      description: 'Choose the service that matches your needs',
      options: [
        { key: 'supply-install', label: 'Supply and Install', description: 'We provide equipment and professional installation' },
        { key: 'supply-only', label: 'Supply Only', description: 'You need equipment with setup guidance' },
        { key: 'install-only', label: 'Install Only', description: 'You already have cameras and equipment' }
      ],
      next: {
        'supply-install': 'property-type',
        'supply-only': 'property-type',
        'install-only': 'existing-equipment-details'
      }
    },
    'existing-equipment-details': {
      question: 'Tell us about the camera equipment you already have',
      description: 'Please describe your existing cameras, brands, models, or what you want installed',
      options: [
        { key: 'describe-equipment', label: 'I\'ll describe my equipment', description: 'Enter details in next step' },
        { key: 'not-sure-details', label: 'Not sure what I have', description: 'Need professional assessment' }
      ],
      next: {
        'describe-equipment': 'equipment-description',
        'not-sure-details': 'property-type'
      }
    },
    'equipment-description': {
      question: 'Please describe your existing camera equipment',
      description: 'What cameras, brands, models, or specific equipment do you want installed?',
      options: [
        { key: 'continue-after-description', label: 'Continue', description: 'Proceed after entering details' }
      ]
    },
    'property-type': {
      question: 'What type of property needs cameras?',
      description: 'This helps us understand the right camera types and placement',
      options: [
        { key: 'house', label: 'House', description: 'Residential home' },
        { key: 'apartment', label: 'Apartment/Flat', description: 'Multi-unit building' },
        { key: 'complex', label: 'Complex/Estate', description: 'Gated community' },
        { key: 'office', label: 'Office Building', description: 'Commercial office space' },
        { key: 'retail', label: 'Retail Store', description: 'Shop or store' },
        { key: 'warehouse', label: 'Warehouse/Factory', description: 'Industrial facility' },
        { key: 'commercial', label: 'Commercial Complex', description: 'Mall or multiple buildings' },
        { key: 'vehicles', label: 'Vehicle Fleet', description: 'Cars, trucks, fleet' }
      ],
      next: {
        'house': 'coverage-areas-residential',
        'apartment': 'coverage-areas-residential',
        'complex': 'coverage-areas-residential',
        'office': 'coverage-areas-commercial',
        'retail': 'coverage-areas-commercial',
        'warehouse': 'coverage-areas-commercial',
        'commercial': 'coverage-areas-commercial',
        'vehicles': 'coverage-areas-vehicles'
      }
    },
    'coverage-areas-residential': {
      question: 'Which areas need camera coverage?',
      description: 'Select all locations you want monitored',
      options: [
        { key: 'front-door', label: 'Front Door/Entrance', description: 'Main entry point' },
        { key: 'back-door', label: 'Back Door', description: 'Rear access' },
        { key: 'driveway', label: 'Driveway/Garage', description: 'Vehicle area' },
        { key: 'garden', label: 'Garden/Yard', description: 'Outdoor spaces' },
        { key: 'perimeter', label: 'Property Perimeter', description: 'Boundaries and fences' },
        { key: 'living-room', label: 'Living Room', description: 'Main indoor area' },
        { key: 'kitchen', label: 'Kitchen', description: 'Food preparation area' },
        { key: 'hallway', label: 'Hallway/Stairs', description: 'Passageways' },
        { key: 'bedroom', label: 'Bedrooms', description: 'Sleeping areas' },
        { key: 'kids-room', label: 'Children\'s Room', description: 'Child monitoring' },
        { key: 'gate', label: 'Gate/Entrance', description: 'Property access point' }
      ],
      next: {
        'front-door': 'camera-features-residential',
        'back-door': 'camera-features-residential',
        'driveway': 'camera-features-residential',
        'garden': 'camera-features-residential',
        'perimeter': 'camera-features-residential',
        'living-room': 'camera-features-residential',
        'kitchen': 'camera-features-residential',
        'hallway': 'camera-features-residential',
        'bedroom': 'camera-features-residential',
        'kids-room': 'camera-features-residential',
        'gate': 'camera-features-residential'
      }
    },
    'coverage-areas-commercial': {
      question: 'Which business areas need camera coverage?',
      description: 'Select all locations requiring monitoring',
      options: [
        { key: 'entrance', label: 'Main Entrance', description: 'Building access point' },
        { key: 'reception', label: 'Reception Area', description: 'Visitor greeting area' },
        { key: 'sales-floor', label: 'Sales Floor/Shop', description: 'Customer area' },
        { key: 'cash-register', label: 'Cash Register/Till', description: 'Payment points' },
        { key: 'office-space', label: 'Office Space', description: 'Work areas' },
        { key: 'storage-room', label: 'Storage Room', description: 'Inventory storage' },
        { key: 'parking', label: 'Parking Lot', description: 'Vehicle parking' },
        { key: 'loading-bay', label: 'Loading Bay', description: 'Shipping/receiving' },
        { key: 'warehouse-floor', label: 'Warehouse Floor', description: 'Storage operations' },
        { key: 'corridors', label: 'Corridors/Hallways', description: 'Internal passages' },
        { key: 'server-room', label: 'Server Room', description: 'IT infrastructure' }
      ],
      next: {
        'entrance': 'camera-features-commercial',
        'reception': 'camera-features-commercial',
        'sales-floor': 'camera-features-commercial',
        'cash-register': 'camera-features-commercial',
        'office-space': 'camera-features-commercial',
        'storage-room': 'camera-features-commercial',
        'parking': 'camera-features-commercial',
        'loading-bay': 'camera-features-commercial',
        'warehouse-floor': 'camera-features-commercial',
        'corridors': 'camera-features-commercial',
        'server-room': 'camera-features-commercial'
      }
    },
    'coverage-areas-vehicles': {
      question: 'What vehicle monitoring do you need?',
      description: 'Select camera placement for your vehicles',
      options: [
        { key: 'front-view', label: 'Front View', description: 'Forward-facing camera' },
        { key: 'rear-view', label: 'Rear View', description: 'Backup and rear monitoring' },
        { key: 'side-view', label: 'Side View', description: 'Blind spot coverage' },
        { key: 'interior', label: 'Interior Cabin', description: 'Driver and passenger area' },
        { key: 'cargo-area', label: 'Cargo Area', description: 'Load monitoring' },
        { key: 'fleet-tracking', label: 'Fleet Management', description: 'Multiple vehicle tracking' }
      ],
      next: {
        'front-view': 'camera-features-vehicles',
        'rear-view': 'camera-features-vehicles',
        'side-view': 'camera-features-vehicles',
        'interior': 'camera-features-vehicles',
        'cargo-area': 'camera-features-vehicles',
        'fleet-tracking': 'camera-features-vehicles'
      }
    },
    'camera-features-residential': {
      question: 'What camera features are important for your home?',
      description: 'Select features that match your security needs',
      options: [
        { key: 'night-vision', label: 'Night Vision', description: 'See in complete darkness' },
        { key: 'weatherproof', label: 'Weatherproof', description: 'Outdoor durability' },
        { key: 'motion-alerts', label: 'Motion Alerts', description: 'Get notified of movement' },
        { key: 'two-way-audio', label: 'Two-Way Audio', description: 'Speak through camera' },
        { key: 'mobile-access', label: 'Mobile App', description: 'View on smartphone' },
        { key: 'person-detection', label: 'Person Detection', description: 'Distinguish people from objects' },
        { key: 'package-detection', label: 'Package Detection', description: 'Delivery notifications' },
        { key: 'local-recording', label: 'Local Recording', description: 'Save footage on device' },
        { key: 'cloud-storage', label: 'Cloud Storage', description: 'Remote video backup' }
      ],
      next: {
        'night-vision': 'monitoring-purpose-residential',
        'weatherproof': 'monitoring-purpose-residential',
        'motion-alerts': 'monitoring-purpose-residential',
        'two-way-audio': 'monitoring-purpose-residential',
        'mobile-access': 'monitoring-purpose-residential',
        'person-detection': 'monitoring-purpose-residential',
        'package-detection': 'monitoring-purpose-residential',
        'local-recording': 'monitoring-purpose-residential',
        'cloud-storage': 'monitoring-purpose-residential'
      }
    },
    'camera-features-commercial': {
      question: 'What business security features do you need?',
      description: 'Select features for your commercial needs',
      options: [
        { key: '24-7-recording', label: '24/7 Recording', description: 'Continuous monitoring' },
        { key: 'motion-detection', label: 'Motion Detection', description: 'Activity-based recording' },
        { key: 'people-counting', label: 'People Counting', description: 'Customer traffic analytics' },
        { key: 'license-plates', label: 'License Plate Recognition', description: 'Vehicle identification' },
        { key: 'face-detection', label: 'Face Detection', description: 'People identification' },
        { key: 'theft-prevention', label: 'Theft Prevention', description: 'Anti-shoplifting features' },
        { key: 'staff-monitoring', label: 'Staff Monitoring', description: 'Employee oversight' },
        { key: 'vandal-proof', label: 'Vandal-Proof', description: 'Tamper-resistant' },
        { key: 'remote-access', label: 'Remote Management', description: 'Multiple location access' }
      ],
      next: {
        '24-7-recording': 'monitoring-purpose-commercial',
        'motion-detection': 'monitoring-purpose-commercial',
        'people-counting': 'monitoring-purpose-commercial',
        'license-plates': 'monitoring-purpose-commercial',
        'face-detection': 'monitoring-purpose-commercial',
        'theft-prevention': 'monitoring-purpose-commercial',
        'staff-monitoring': 'monitoring-purpose-commercial',
        'vandal-proof': 'monitoring-purpose-commercial',
        'remote-access': 'monitoring-purpose-commercial'
      }
    },
    'camera-features-vehicles': {
      question: 'What vehicle camera features do you need?',
      description: 'Select features for your vehicle monitoring',
      options: [
        { key: 'gps-tracking', label: 'GPS Tracking', description: 'Location monitoring' },
        { key: 'impact-sensor', label: 'Impact Sensor', description: 'Collision detection' },
        { key: 'parking-mode', label: 'Parking Mode', description: 'Record while parked' },
        { key: 'speed-monitoring', label: 'Speed Monitoring', description: 'Speed tracking' },
        { key: 'driver-behavior', label: 'Driver Behavior', description: 'Driving habit monitoring' },
        { key: 'live-tracking', label: 'Live Tracking', description: 'Real-time location' },
        { key: 'fuel-monitoring', label: 'Fuel Monitoring', description: 'Fuel usage tracking' },
        { key: 'maintenance-alerts', label: 'Maintenance Alerts', description: 'Vehicle service reminders' }
      ],
      next: {
        'gps-tracking': 'monitoring-purpose-vehicles',
        'impact-sensor': 'monitoring-purpose-vehicles',
        'parking-mode': 'monitoring-purpose-vehicles',
        'speed-monitoring': 'monitoring-purpose-vehicles',
        'driver-behavior': 'monitoring-purpose-vehicles',
        'live-tracking': 'monitoring-purpose-vehicles',
        'fuel-monitoring': 'monitoring-purpose-vehicles',
        'maintenance-alerts': 'monitoring-purpose-vehicles'
      }
    },
    'monitoring-purpose-residential': {
      question: 'What are your main security concerns at home?',
      description: 'This helps us prioritize the right solutions',
      options: [
        { key: 'package-theft', label: 'Package Theft', description: 'Protect deliveries' },
        { key: 'break-ins', label: 'Break-in Prevention', description: 'Secure against intruders' },
        { key: 'property-monitoring', label: 'Property Monitoring', description: 'General home security' },
        { key: 'child-safety', label: 'Child/Pet Monitoring', description: 'Family member safety' },
        { key: 'visitor-monitoring', label: 'Visitor Monitoring', description: 'See who comes to door' },
        { key: 'vacation-security', label: 'Vacation Security', description: 'Monitor while away' }
      ],
      next: {
        'package-theft': 'budget-residential',
        'break-ins': 'budget-residential',
        'property-monitoring': 'budget-residential',
        'child-safety': 'budget-residential',
        'visitor-monitoring': 'budget-residential',
        'vacation-security': 'budget-residential'
      }
    },
    'monitoring-purpose-commercial': {
      question: 'What are your main business security goals?',
      description: 'Primary objectives for your commercial security',
      options: [
        { key: 'theft-prevention', label: 'Theft Prevention', description: 'Stop shoplifting/employee theft' },
        { key: 'safety-compliance', label: 'Safety Compliance', description: 'Meet legal requirements' },
        { key: 'liability-protection', label: 'Liability Protection', description: 'Incident documentation' },
        { key: 'staff-productivity', label: 'Staff Productivity', description: 'Employee performance' },
        { key: 'customer-analytics', label: 'Customer Analytics', description: 'Business intelligence' },
        { key: 'property-protection', label: 'Property Protection', description: 'Asset security' }
      ],
      next: {
        'theft-prevention': 'budget-commercial',
        'safety-compliance': 'budget-commercial',
        'liability-protection': 'budget-commercial',
        'staff-productivity': 'budget-commercial',
        'customer-analytics': 'budget-commercial',
        'property-protection': 'budget-commercial'
      }
    },
    'monitoring-purpose-vehicles': {
      question: 'What are your main vehicle monitoring goals?',
      description: 'Primary reasons for vehicle surveillance',
      options: [
        { key: 'driver-safety', label: 'Driver Safety', description: 'Protect drivers and passengers' },
        { key: 'fleet-management', label: 'Fleet Management', description: 'Multiple vehicle oversight' },
        { key: 'insurance-discount', label: 'Insurance Discount', description: 'Lower insurance costs' },
        { key: 'theft-recovery', label: 'Theft Recovery', description: 'Recover stolen vehicles' },
        { key: 'accident-evidence', label: 'Accident Evidence', description: 'Document incidents' },
        { key: 'fuel-efficiency', label: 'Fuel Efficiency', description: 'Monitor fuel usage' }
      ],
      next: {
        'driver-safety': 'budget-vehicles',
        'fleet-management': 'budget-vehicles',
        'insurance-discount': 'budget-vehicles',
        'theft-recovery': 'budget-vehicles',
        'accident-evidence': 'budget-vehicles',
        'fuel-efficiency': 'budget-vehicles'
      }
    },
    'budget-residential': {
      question: 'What budget range works for your home security?',
      description: 'Helps us recommend suitable options',
      options: [
        { key: 'basic-home', label: 'Basic (R3,000 - R8,000)', description: 'Essential coverage for key areas' },
        { key: 'standard-home', label: 'Standard (R8,000 - R15,000)', description: 'Good coverage with smart features' },
        { key: 'premium-home', label: 'Premium (R15,000 - R25,000+)', description: 'Full property with advanced features' },
        { key: 'consult-home', label: 'Not Sure - Need Advice', description: 'Professional recommendation' }
      ],
      next: {
        'basic-home': 'timeline',
        'standard-home': 'timeline',
        'premium-home': 'timeline',
        'consult-home': 'timeline'
      }
    },
    'budget-commercial': {
      question: 'What investment range for business security?',
      description: 'Commercial system pricing ranges',
      options: [
        { key: 'small-business', label: 'Small Business (R8,000 - R20,000)', description: 'Single location basic system' },
        { key: 'medium-business', label: 'Medium Business (R20,000 - R50,000)', description: 'Comprehensive coverage' },
        { key: 'large-business', label: 'Large Business (R50,000 - R150,000+)', description: 'Multiple locations, advanced features' },
        { key: 'enterprise', label: 'Enterprise Solution', description: 'Custom quote for large operations' }
      ],
      next: {
        'small-business': 'timeline',
        'medium-business': 'timeline',
        'large-business': 'timeline',
        'enterprise': 'timeline'
      }
    },
    'budget-vehicles': {
      question: 'What budget for vehicle monitoring?',
      description: 'Pricing for vehicle camera systems',
      options: [
        { key: 'single-vehicle', label: 'Single Vehicle (R2,000 - R5,000)', description: 'One car or truck' },
        { key: 'small-fleet', label: 'Small Fleet (R5,000 - R15,000)', description: '2-5 vehicles' },
        { key: 'medium-fleet', label: 'Medium Fleet (R15,000 - R40,000)', description: '6-15 vehicles' },
        { key: 'large-fleet', label: 'Large Fleet (R40,000+)', description: '16+ vehicles with management' }
      ],
      next: {
        'single-vehicle': 'timeline',
        'small-fleet': 'timeline',
        'medium-fleet': 'timeline',
        'large-fleet': 'timeline'
      }
    },
    'timeline': {
      question: 'When do you need this installed?',
      description: 'Helps us schedule appropriately',
      options: [
        { key: 'urgent', label: 'As Soon as Possible', description: 'Within the next week' },
        { key: 'soon', label: 'Next 2-4 Weeks', description: 'Flexible scheduling' },
        { key: 'planning', label: '1-2 Months', description: 'Planning phase' },
        { key: 'exploring', label: 'Just Exploring Options', description: 'No specific timeline' }
      ],
      next: {
        'urgent': 'complete',
        'soon': 'complete',
        'planning': 'complete',
        'exploring': 'complete'
      }
    },
    'complete': {
      question: 'Perfect! We have everything needed for your camera quote',
      description: 'Your requirements have been captured and we\'ll prepare a tailored solution',
      options: [
        { key: 'finish', label: 'Complete Quote Request', description: 'Proceed to contact details' }
      ]
    }
  },
  finalMessage: 'Your camera system requirements have been captured. We\'ll prepare a detailed quote with equipment recommendations and pricing based on your specific property type and security needs.'
};
