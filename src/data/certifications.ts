export interface Certification {
  id: number
  name: string
  provider: string
  description: string
  height: 'short' | 'medium' | 'tall' | 'x-tall'
  width: 'normal' | 'wide'
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Hikvision",
    provider: "CCTV Systems",
    description: "Advanced surveillance cameras and video management systems",
    height: "tall",
    width: "normal"
  },
  {
    id: 2,
    name: "Centurion Systems",
    provider: "Access Control",
    description: "Gate motors and vehicle access control systems",
    height: "short",
    width: "normal"
  },
  {
    id: 3,
    name: "Gemini",
    provider: "Alarm Systems",
    description: "Wireless intruder detection and alarm systems",
    height: "medium",
    width: "normal"
  },
  {
    id: 4,
    name: "NEMTEK",
    provider: "Electric Fencing",
    description: "Perimeter security and electric fence systems",
    height: "short",
    width: "normal"
  },
  {
    id: 5,
    name: "BlackVue",
    provider: "Dashboard Cameras",
    description: "HD dash cam installation with cloud connectivity",
    height: "medium",
    width: "normal"
  },
  {
    id: 6,
    name: "Dahua Technology",
    provider: "Security Solutions",
    description: "IP cameras and video surveillance systems",
    height: "x-tall",
    width: "wide"
  },
  {
    id: 7,
    name: "Bosch Security",
    provider: "Professional Systems",
    description: "Intrusion detection and building security systems",
    height: "tall",
    width: "normal"
  },
  {
    id: 8,
    name: "Axis Communications",
    provider: "Network Video",
    description: "IP cameras and video analytics solutions",
    height: "short", /* Fixed from tall to short */
    width: "normal"
  },
  {
    id: 9,
    name: "Professional Security Integration",
    provider: "moreGenz Security Systems",
    description: "Expert installation and integration of leading security brands",
    height: "medium", /* Fixed from wide to normal height */
    width: "wide"
  }
]
