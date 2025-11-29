import { ServicePath } from '../types';

export const maintenanceService: ServicePath = {
  service: 'Maintenance & Service Plans',
  description: 'Ongoing support, maintenance contracts, and service agreements',
  questions: {
    'start': {
      question: 'What type of maintenance service do you need?',
      description: 'Select the service that matches your needs',
      options: [
        { key: 'routine-maintenance', label: 'Routine Maintenance', description: 'Scheduled service checks' },
        { key: 'emergency-repair', label: 'Emergency Repair', description: 'Urgent system fixes' },
        { key: 'service-contract', label: 'Service Contract', description: 'Ongoing maintenance agreement' },
        { key: 'system-check', label: 'System Health Check', description: 'Comprehensive system assessment' }
      ],
      next: {
        'routine-maintenance': 'systems-covered',
        'emergency-repair': 'systems-covered',
        'service-contract': 'systems-covered',
        'system-check': 'systems-covered'
      }
    },
    'systems-covered': {
      question: 'Which systems need maintenance?',
      description: 'Select all that apply',
      options: [
        { key: 'cameras', label: 'Camera Systems', description: 'CCTV and surveillance' },
        { key: 'fencing', label: 'Fencing Systems', description: 'Electric or perimeter fencing' },
        { key: 'access-control', label: 'Access Control', description: 'Gates and entry systems' },
        { key: 'alarms', label: 'Alarm Systems', description: 'Intrusion detection' },
        { key: 'networking', label: 'Networking', description: 'Network equipment' },
        { key: 'all-systems', label: 'All Security Systems', description: 'Complete system maintenance' }
      ],
      next: {
        'cameras': 'complete',
        'fencing': 'complete',
        'access-control': 'complete',
        'alarms': 'complete',
        'networking': 'complete',
        'all-systems': 'complete'
      }
    },
    'complete': {
      question: 'Maintenance requirements complete',
      description: 'Moving to location details',
      options: [
        { key: 'continue', label: 'Continue to Location Details', description: 'Proceed with property information' }
      ]
    }
  },
  finalMessage: 'Your maintenance service requirements have been captured.'
};
