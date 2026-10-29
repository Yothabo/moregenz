export const API_CONFIG = {
  // Yothabo backend API endpoint
  yothaboBackend: import.meta.env.VITE_YOTHABO_API || 'http://localhost:5000/api',

  // Chatbot submission endpoint
  chatbotSubmit: '/chatbot/submit',
} as const;

// Helper to get API URL
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.yothaboBackend;
  return `${baseUrl}${endpoint}`;
};
