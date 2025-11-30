export interface ServiceOption {
  key: string;
  label: string;
  description: string;
}

export const servicesData: ServiceOption[] = [
  {
    key: 'cameras',
    label: 'Camera & Surveillance Systems',
    description: 'CCTV, thermal imaging, license plate recognition, dash cams, PTZ cameras'
  },
  {
    key: 'fencing',
    label: 'Fencing & Perimeter Security',
    description: 'Electric fencing, razor wire, palisade fencing, bollard systems'
  },
  {
    key: 'access-control',
    label: 'Access Control & Gate Automation',
    description: 'Biometric systems, card access, intercoms, gate automation'
  },
  {
    key: 'alarms',
    label: 'Alarm & Intrusion Detection',
    description: 'Intruder alarms, motion sensors, glass break detectors, fire alarms'
  },
  {
    key: 'networking',
    label: 'Networking & Connectivity',
    description: 'WiFi extension, mesh setup, network cabling'
  },
  {
    key: 'smart-home',
    label: 'Smart Home Automation',
    description: 'Smart locks, lighting control, home integration'
  },
  {
    key: 'maintenance',
    label: 'Maintenance & Service Plans',
    description: 'Ongoing support, maintenance contracts'
  },
  {
    key: 'feedback',
    label: 'Feedback & Support',
    description: 'For existing customers with reference numbers only'
  }
];
