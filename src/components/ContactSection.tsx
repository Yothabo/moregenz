import React, { useState, useRef, useEffect } from 'react';
import { services } from '../data/services';
import styles from './ContactSection.module.css';

// Security-related keywords and responses
const securityKeywords = {
  // CCTV & Camera Systems
  'cctv': 'We install high-quality CCTV systems from brands like Hikvision and Dahua. Our systems include HD cameras, night vision, and remote monitoring.',
  'camera': 'We offer various camera types: dome, bullet, PTZ, and thermal cameras for comprehensive surveillance coverage.',
  'surveillance': 'Our surveillance solutions include 24/7 monitoring, motion detection, and cloud storage options.',
  'recording': 'We provide DVR/NVR systems with storage from 1TB to 10TB, supporting continuous or motion-activated recording.',

  // Access Control
  'access control': 'We install access control systems including biometric, card, and intercom systems for secure entry management.',
  'biometric': 'Our biometric systems include fingerprint and facial recognition for high-security areas.',
  'intercom': 'Video intercom systems allow you to see and speak with visitors before granting access.',
  'gate motor': 'We install Centurion and other premium gate motors with remote control and safety features.',

  // Alarm Systems
  'alarm': 'Our alarm systems include intruder detection, panic buttons, and 24/7 monitoring services.',
  'motion sensor': 'We install PIR motion sensors with pet immunity and adjustable sensitivity.',
  'intruder': 'Intruder alarm systems with door/window sensors and siren alerts.',
  'glass break': 'Glass break detectors that trigger alarms when windows are shattered.',

  // Fencing & Perimeter
  'electric fence': 'We install NEMTEK electric fencing with weatherproof energizers and zone monitoring.',
  'fencing': 'Complete perimeter security including electric fencing, palisade, and razor wire.',
  'perimeter': 'Perimeter security solutions with intrusion detection and barrier systems.',
  'razor wire': 'Razor wire installations for enhanced perimeter protection.',

  // General Security
  'security': 'We provide comprehensive security solutions including surveillance, access control, and alarm systems.',
  'install': 'Professional installation services with warranty and ongoing support.',
  'maintenance': 'We offer maintenance contracts for all our security systems.',
  'quote': 'We provide free, no-obligation quotes for all security installations.',
  'price': 'Contact us for competitive pricing on all security solutions.',
  'cost': 'We offer various packages to suit different budgets and security needs.',

  // Brands
  'hikvision': 'We are certified Hikvision partners, offering their full range of security products.',
  'dahua': 'Dahua Technology products including IP cameras and video management systems.',
  'centurion': 'Centurion gate motors and access control systems with warranty.',
  'nemtek': 'NEMTEK electric fencing systems with reliable performance.',
  'gemini': 'Gemini wireless alarm systems for home and business security.',
  'bosch': 'Bosch professional security and fire detection systems.'
};

const ContactSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'chat' | 'booking' | 'newsletter' | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean, timestamp: Date}>>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    date: '',
    time: '',
    newsletterConsent: false
  });

  // Prevent body scrolling when modal is open - EXACTLY like ProjectModal
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Add welcome message when chat modal opens
  useEffect(() => {
    if (activeModal === 'chat' && chatMessages.length === 0) {
      setChatMessages([{
        text: "Hello! I'm your security assistant. Ask me about CCTV, alarms, access control, electric fencing, or request a quote. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [activeModal]);

  const openModal = (modalType: 'chat' | 'booking' | 'newsletter') => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    // Reset chat when closing
    if (activeModal === 'chat') {
      setChatMessages([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      generateBotResponse(userInput.toLowerCase());
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string) => {
    let response = '';
    let foundKeyword = false;

    // Check for keywords in the user's message
    for (const [keyword, botResponse] of Object.entries(securityKeywords)) {
      if (userMessage.includes(keyword.toLowerCase())) {
        response = botResponse;
        foundKeyword = true;
        break;
      }
    }

    if (!foundKeyword) {
      response = "I'm primarily trained to answer security-related questions. For detailed information about your specific needs, one of our security consultants will contact you shortly. Could you please leave your contact details so we can assist you further?";
    }

    const botMessage = {
      text: response,
      isUser: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, botMessage]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on activeModal
    console.log('Form submitted:', { type: activeModal, data: formData });
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      date: '',
      time: '',
      newsletterConsent: false
    });
    closeModal();
  };

  const quickQuestions = [
    "Tell me about CCTV systems",
    "How much does electric fencing cost?",
    "What access control options do you have?",
    "Do you install alarm systems?",
    "Get a free quote"
  ];

  const handleQuickQuestion = (question: string) => {
    setUserInput(question);
  };

  return (
    <>
      <section className={styles.contact} id="contact">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.sectionSubtitle}>
            Choose how you'd like to connect with us - chat with our security bot for instant answers,
            book a consultation, or join our newsletter for security insights.
          </p>

          {/* Form Type Selector */}
          <div className={styles.formSelector}>
            <button
              className={styles.selectorButton}
              onClick={() => openModal('chat')}
            >
              Live Chat
            </button>
            <button
              className={styles.selectorButton}
              onClick={() => openModal('booking')}
            >
              Book Consultation
            </button>
            <button
              className={styles.selectorButton}
              onClick={() => openModal('newsletter')}
            >
              Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Modal Overlay - EXACTLY like ProjectModal */}
      {activeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Back Button - Only way to close modal - EXACTLY like ProjectModal */}
            <button className={styles.backButton} onClick={closeModal}>
              ← Back
            </button>

            <div className={styles.modalBody}>
              {/* Modal Content Area */}
              <div className={styles.contentArea}>
                {/* Live Chat Bot Modal */}
                {activeModal === 'chat' && (
                  <div className={styles.chatContainer}>
                    <h3 className={styles.sectionTitle}>Security Assistant</h3>
                    <p className={styles.modalDescription}>
                      Ask me anything about security systems, pricing, or services. I'm here to help!
                    </p>

                    {/* Quick Questions */}
                    <div className={styles.quickQuestions}>
                      <p>Quick questions:</p>
                      <div className={styles.quickButtons}>
                        {quickQuestions.map((question, index) => (
                          <button
                            key={index}
                            className={styles.quickButton}
                            onClick={() => handleQuickQuestion(question)}
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className={styles.chatMessages} ref={chatContainerRef}>
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}
                        >
                          <div className={styles.messageContent}>
                            {message.text}
                          </div>
                          <div className={styles.messageTime}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className={styles.typingIndicator}>
                          <div className={styles.typingDots}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          Security assistant is typing...
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <form className={styles.chatForm} onSubmit={handleChatSubmit}>
                      <div className={styles.chatInputContainer}>
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Type your security question here..."
                          className={styles.chatInput}
                          required
                        />
                        <button type="submit" className={styles.chatSendButton}>
                          Send
                        </button>
                      </div>
                    </form>

                    {/* Contact Form for when bot can't answer */}
                    <div className={styles.contactFallback}>
                      <h4>Need detailed assistance?</h4>
                      <p>Leave your details and a security expert will contact you:</p>
                      <div className={styles.contactFormMini}>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className={styles.formInput}
                        />
                        <input
                          type="tel"
                          placeholder="Your Phone"
                          className={styles.formInput}
                        />
                        <button className={styles.submitButton}>
                          Request Call Back
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Form Modal */}
                {activeModal === 'booking' && (
                  <form className={`${styles.form} ${styles.consultationForm}`} onSubmit={handleFormSubmit}>
                    <h3 className={styles.sectionTitle}>Book a Consultation</h3>
                    <p className={styles.modalDescription}>
                      Schedule a free on-site consultation with our security experts.
                    </p>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className={styles.formInput}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className={styles.formInput}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Your Phone"
                          className={styles.formInput}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <select
                          name="service"
                          className={styles.formInput}
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="date"
                          name="date"
                          className={styles.formInput}
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <select
                          name="time"
                          className={styles.formInput}
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Preferred Time</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <textarea
                        name="message"
                        placeholder="Any specific requirements or questions?"
                        rows={2}
                        className={styles.formTextarea}
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Book Consultation
                    </button>
                  </form>
                )}

                {/* Newsletter Form Modal */}
                {activeModal === 'newsletter' && (
                  <form className={`${styles.form} ${styles.newsletterForm}`} onSubmit={handleFormSubmit}>
                    <h3 className={styles.sectionTitle}>Stay Updated</h3>
                    <p className={styles.modalDescription}>
                      Subscribe to our newsletter for security tips, industry insights, and exclusive offers.
                    </p>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          className={styles.formInput}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          className={styles.formInput}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.consentGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="newsletterConsent"
                          checked={formData.newsletterConsent}
                          onChange={handleInputChange}
                          required
                        />
                        <span className={styles.checkboxText}>
                          I agree to receive security tips, updates, and promotional offers from moreGenz Security Systems
                        </span>
                      </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Subscribe to Newsletter
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
