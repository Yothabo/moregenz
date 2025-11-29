// Import all services
import { camerasService } from './services/cameras';
import { fencingService } from './services/fencing';
import { accessControlService } from './services/access-control';
import { alarmsService } from './services/alarms';
import { networkingService } from './services/networking';
import { smartHomeService } from './services/smart-home';
import { maintenanceService } from './services/maintenance';
import { feedbackService } from './services/feedback';

// Import all flows
import { locationFlow } from './flows/location';
import { visualDocumentationFlow } from './flows/visual-documentation';
import { urgencyFlow } from './flows/urgency';
import { contactPreferenceFlow } from './flows/contact-preference';

// Export types
export * from './types';

// Export service paths
export const servicePaths = {
  'cameras': camerasService,
  'fencing': fencingService,
  'access-control': accessControlService,
  'alarms': alarmsService,
  'networking': networkingService,
  'smart-home': smartHomeService,
  'maintenance': maintenanceService,
  'feedback': feedbackService
};

// Export flows
export {
  locationFlow,
  visualDocumentationFlow,
  urgencyFlow,
  contactPreferenceFlow
};

// Services list with categories and detailed descriptions
export const availableServices = [
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

// Contact methods (WhatsApp and Email only as requested)
export const contactMethods = [
  { key: 'whatsapp', label: 'WhatsApp', description: 'WhatsApp message' },
  { key: 'email', label: 'Email', description: 'Email communication' }
];

// Clean, consistent conversation patterns
export const conversationPatterns = {
  greeting: [
    "Welcome to MoreGenz Security. What can we help you with today?"
  ],
  singleService: [
    "" // Empty string to remove the message
  ],
  multipleServices: [
    "Great. I'll guide you through each service one by one."
  ],
  serviceIntroduction: (serviceLabel: string) => `Now let's discuss your ${serviceLabel.toLowerCase()} needs.`,
  finalClarification: [
    "That concludes our current requirements. Should there be any additional information you wish to provide, such as layout specifics, special requests, or any other details we may not have inquired about, please feel free to elaborate here."
  ],
  completion: [
    "Thank you. We now possess a comprehensive understanding of your requirements. A consultant will review this information and subsequently contact you with a quotation and recommendations. You will receive a reference number with your quotation that you can use for future feedback and support requests."
  ],
  disclaimer: [
    "Disclaimer: The information you provide will be used solely for quotation purposes and to contact you regarding your security requirements. Your data will be handled in accordance with our privacy policy."
  ],
  contactMethodQuestion: "How would you prefer to be contacted?",
  firstNameQuestion: "Please provide your first name:",
  lastNameQuestion: "Please provide your surname:",
  contactInfoQuestion: (method: string) => {
    switch(method) {
      case 'whatsapp': return "Please provide your WhatsApp number (include country code, e.g., +27123456789):";
      case 'email': return "Please provide your email address:";
      default: return "Please provide your contact information:";
    }
  },
  finalThankYou: [
    "Thank you for providing your information. Our consultant will contact you shortly using your preferred method. We appreciate your interest in MoreGenz Security and look forward to assisting you with your security needs."
  ],
  referenceRequired: [
    "Feedback and support services are available to existing customers with reference numbers from previous quotations."
  ],
  getQuoteFirst: [
    "To access feedback and support, please request a quote first. You'll receive a reference number with your quotation that you can use for future support requests."
  ],
  quoteDelivery: [
    "Thanks! I've collected all the information needed for an accurate quote. Your tailored quote will be prepared and sent to your preferred contact method. You'll receive detailed equipment breakdown, installation costs, timeline estimate, and support information."
  ]
};

// Validation functions
export const validationRules = {
  whatsapp: (value: string) => {
    // International phone number validation (supports country codes)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  },
  email: (value: string) => {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(value) && value.length <= 254;
  },
  name: (value: string) => {
    return value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value);
  },
  reference: (value: string) => {
    // Accept any reference number for testing
    return value.trim().length >= 3;
  }
};
