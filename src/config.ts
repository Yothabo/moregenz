export const CONFIG = {
  company: {
    name: "moreGenz Security Systems",
    phone: "+27-XXX-XXXX",
    email: "info@moregenz-security.co.za",
    address: "South Africa"
  },
  colors: {
    primary: "#00FF00", // Lime
    secondary: "#000000", // Black
    accent: "#808080", // Gray
    text: {
      primary: "#FFFFFF", // White
      secondary: "#CCCCCC" // Light Gray
    }
  },
  emailjs: {
    serviceId: "your_service_id",
    templateId: "your_template_id", 
    publicKey: "your_public_key"
  }
} as const;
