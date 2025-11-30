import { useState, useRef, useEffect, useCallback } from 'react';
import { servicesData, serviceFlows, ServiceKey } from '../data/chat/services/serviceMapping';
import { contactPreferenceFlow } from '../data/chat/flows/contact-preference';
import { 
  ChatMessage, 
  ChatMode, 
  ContactStep, 
  ContactInfo, 
  ServiceOption 
} from '../data/chat/typesExtended';
import { ServicePath, DecisionNode } from '../data/chat/types';

interface ServiceState {
  serviceKey: string;
  currentQuestion: string;
  answers: Record<string, string[]>;
  selectedOptions: string[]; // For multi-select questions
  textInputValue: string; // For text input questions
}

export const useChatBot = () => {
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<ServiceOption[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [chatMode, setChatMode] = useState<ChatMode>('service-selection');
  const [isMultiSelect, setIsMultiSelect] = useState(true);
  const [selectedOptionKeys, setSelectedOptionKeys] = useState<string[]>([]);
  const [textInputValue, setTextInputValue] = useState(''); // For text input in service flows

  // Service flow state
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [serviceStates, setServiceStates] = useState<ServiceState[]>([]);
  const [currentServiceFlow, setCurrentServiceFlow] = useState<ServicePath | null>(null);
  const [currentQuestionNode, setCurrentQuestionNode] = useState<DecisionNode | null>(null);

  // Contact info state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    method: '',
    firstName: '',
    lastName: '',
    contact: ''
  });
  const [currentContactStep, setCurrentContactStep] = useState<ContactStep>('method');
  const [validationError, setValidationError] = useState('');

  // Reference input state
  const [referenceInput, setReferenceInput] = useState('');

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  // Add message to chat
  const addMessage = useCallback((message: ChatMessage) => {
    console.log('Adding message:', message);
    setChatMessages(prev => [...prev, message]);
  }, []);

  // Simulate typing delay
  const simulateTyping = useCallback(async (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
    callback();
  }, []);

  // Handle option toggle for multi-select
  const handleOptionToggle = useCallback((key: string) => {
    setSelectedOptionKeys(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  }, []);

  // Initialize service flow
  const startServiceFlow = useCallback((serviceKey: string) => {
    const flow = serviceFlows[serviceKey as ServiceKey];
    if (!flow) return;

    setCurrentServiceFlow(flow);
    
    // Initialize service state
    const newServiceState: ServiceState = {
      serviceKey,
      currentQuestion: 'start',
      answers: {},
      selectedOptions: [],
      textInputValue: ''
    };
    
    setServiceStates(prev => [...prev, newServiceState]);
    
    // Show first question
    const startQuestion = flow.questions.start;
    setCurrentQuestionNode(startQuestion);
    
    addMessage({
      text: startQuestion.question,
      isUser: false,
      description: startQuestion.description
    });
    
    setCurrentOptions(startQuestion.options || []);
    setIsMultiSelect(startQuestion.multiSelect || false);
    setSelectedOptionKeys([]);
    setTextInputValue('');
    setShowOptions(true);
    setChatMode('service-flow');
  }, [addMessage]);

  // Handle text input submission in service flow
  const handleServiceFlowTextInputSubmit = useCallback(() => {
    if (!currentServiceFlow || !currentQuestionNode || !textInputValue.trim()) return;

    addMessage({
      text: textInputValue,
      isUser: true
    });

    setShowOptions(false);

    const currentServiceState = serviceStates[currentServiceIndex];
    const currentQuestionKey = currentServiceState.currentQuestion;
    
    // Update answers with text input
    setServiceStates(prev => {
      const updated = [...prev];
      const serviceState = updated[currentServiceIndex];
      if (!serviceState.answers[currentQuestionKey]) {
        serviceState.answers[currentQuestionKey] = [];
      }
      serviceState.answers[currentQuestionKey].push(textInputValue);
      serviceState.textInputValue = textInputValue;
      return updated;
    });

    // Move to next question
    const nextQuestionKey = currentQuestionNode.next?.['text-input-complete'];
    
    if (nextQuestionKey && currentServiceFlow.questions[nextQuestionKey]) {
      // Move to next question
      setServiceStates(prev => {
        const updated = [...prev];
        updated[currentServiceIndex].currentQuestion = nextQuestionKey;
        return updated;
      });

      simulateTyping(() => {
        const nextQuestion = currentServiceFlow.questions[nextQuestionKey];
        setCurrentQuestionNode(nextQuestion);
        
        addMessage({
          text: nextQuestion.question,
          isUser: false,
          description: nextQuestion.description
        });
        
        setCurrentOptions(nextQuestion.options || []);
        setIsMultiSelect(nextQuestion.multiSelect || false);
        setSelectedOptionKeys([]);
        setTextInputValue('');
        setShowOptions(true);
      });
    } else {
      // Service flow completed
      simulateTyping(() => {
        addMessage({
          text: currentServiceFlow.finalMessage,
          isUser: false
        });

        // Move to next service or contact info
        const nextServiceIndex = currentServiceIndex + 1;
        if (nextServiceIndex < selectedServices.length) {
          setCurrentServiceIndex(nextServiceIndex);
          startServiceFlow(selectedServices[nextServiceIndex]);
        } else {
          // All services completed - show privacy disclaimer before contact info
          simulateTyping(() => {
            addMessage({
              text: "Before we proceed with your contact information, please note:",
              isUser: false
            });
            addMessage({
              text: "Your information is collected solely for business purposes to provide you with accurate quotes and service. We do not share your details with third parties and adhere to strict privacy protection standards.",
              isUser: false,
              isDisclaimer: true
            });
            
            setChatMode('contact-method');
            addMessage({
              text: contactPreferenceFlow.question,
              isUser: false,
              description: contactPreferenceFlow.description
            });
            setCurrentOptions(contactPreferenceFlow.options || []);
            setIsMultiSelect(false);
            setShowOptions(true);
          });
        }
      });
    }
  }, [currentServiceFlow, currentQuestionNode, textInputValue, serviceStates, currentServiceIndex, selectedServices, addMessage, simulateTyping, startServiceFlow]);

  // Handle service flow option selection (single select)
  const handleServiceFlowOption = useCallback((key: string, label: string) => {
    if (!currentServiceFlow || !currentQuestionNode) return;

    addMessage({
      text: label,
      isUser: true
    });

    setShowOptions(false);

    const currentServiceState = serviceStates[currentServiceIndex];
    const currentQuestionKey = currentServiceState.currentQuestion;
    
    // Update answers
    setServiceStates(prev => {
      const updated = [...prev];
      const serviceState = updated[currentServiceIndex];
      if (!serviceState.answers[currentQuestionKey]) {
        serviceState.answers[currentQuestionKey] = [];
      }
      serviceState.answers[currentQuestionKey].push(key);
      return updated;
    });

    // Handle next step
    const nextQuestionKey = currentQuestionNode.next?.[key];
    
    if (nextQuestionKey && currentServiceFlow.questions[nextQuestionKey]) {
      const nextQuestion = currentServiceFlow.questions[nextQuestionKey];
      
      // Check if next question requires text input
      if (nextQuestion.requiresTextInput) {
        // Move to text input question
        setServiceStates(prev => {
          const updated = [...prev];
          updated[currentServiceIndex].currentQuestion = nextQuestionKey;
          return updated;
        });

        simulateTyping(() => {
          setCurrentQuestionNode(nextQuestion);
          
          addMessage({
            text: nextQuestion.question,
            isUser: false,
            description: nextQuestion.description
          });
          
          // Set mode to text input
          setChatMode('service-text-input');
          setTextInputValue('');
          setShowOptions(true);
        });
      } else {
        // Move to next regular question
        setServiceStates(prev => {
          const updated = [...prev];
          updated[currentServiceIndex].currentQuestion = nextQuestionKey;
          return updated;
        });

        simulateTyping(() => {
          setCurrentQuestionNode(nextQuestion);
          
          addMessage({
            text: nextQuestion.question,
            isUser: false,
            description: nextQuestion.description
          });
          
          setCurrentOptions(nextQuestion.options || []);
          setIsMultiSelect(nextQuestion.multiSelect || false);
          setSelectedOptionKeys([]);
          setShowOptions(true);
        });
      }
    } else {
      // Service flow completed
      simulateTyping(() => {
        addMessage({
          text: currentServiceFlow.finalMessage,
          isUser: false
        });

        // Move to next service or contact info
        const nextServiceIndex = currentServiceIndex + 1;
        if (nextServiceIndex < selectedServices.length) {
          setCurrentServiceIndex(nextServiceIndex);
          startServiceFlow(selectedServices[nextServiceIndex]);
        } else {
          // All services completed - show privacy disclaimer before contact info
          simulateTyping(() => {
            addMessage({
              text: "Before we proceed with your contact information, please note:",
              isUser: false
            });
            addMessage({
              text: "Your information is collected solely for business purposes to provide you with accurate quotes and service. We do not share your details with third parties and adhere to strict privacy protection standards.",
              isUser: false,
              isDisclaimer: true
            });
            
            setChatMode('contact-method');
            addMessage({
              text: contactPreferenceFlow.question,
              isUser: false,
              description: contactPreferenceFlow.description
            });
            setCurrentOptions(contactPreferenceFlow.options || []);
            setIsMultiSelect(false);
            setShowOptions(true);
          });
        }
      });
    }
  }, [currentServiceFlow, currentQuestionNode, serviceStates, currentServiceIndex, selectedServices, addMessage, simulateTyping, startServiceFlow]);

  // Handle service flow multi-select submission
  const handleServiceFlowMultiSelectSubmit = useCallback(() => {
    if (!currentServiceFlow || !currentQuestionNode || selectedOptionKeys.length === 0) return;

    const selectedLabels = selectedOptionKeys.map(key => {
      const option = currentOptions.find(opt => opt.key === key);
      return option?.label || key;
    }).join(', ');

    addMessage({
      text: `Selected: ${selectedLabels}`,
      isUser: true
    });

    setShowOptions(false);

    const currentServiceState = serviceStates[currentServiceIndex];
    const currentQuestionKey = currentServiceState.currentQuestion;
    
    // Update answers with all selected options
    setServiceStates(prev => {
      const updated = [...prev];
      const serviceState = updated[currentServiceIndex];
      serviceState.answers[currentQuestionKey] = selectedOptionKeys;
      return updated;
    });

    // For multi-select, we need to determine the next step
    // Since multiple keys are selected, we'll use the first one to determine next step
    const firstSelectedKey = selectedOptionKeys[0];
    const nextQuestionKey = currentQuestionNode.next?.[firstSelectedKey];
    
    if (nextQuestionKey && currentServiceFlow.questions[nextQuestionKey]) {
      const nextQuestion = currentServiceFlow.questions[nextQuestionKey];
      
      // Check if next question requires text input
      if (nextQuestion.requiresTextInput) {
        // Move to text input question
        setServiceStates(prev => {
          const updated = [...prev];
          updated[currentServiceIndex].currentQuestion = nextQuestionKey;
          return updated;
        });

        simulateTyping(() => {
          setCurrentQuestionNode(nextQuestion);
          
          addMessage({
            text: nextQuestion.question,
            isUser: false,
            description: nextQuestion.description
          });
          
          // Set mode to text input
          setChatMode('service-text-input');
          setTextInputValue('');
          setShowOptions(true);
        });
      } else {
        // Move to next regular question
        setServiceStates(prev => {
          const updated = [...prev];
          updated[currentServiceIndex].currentQuestion = nextQuestionKey;
          return updated;
        });

        simulateTyping(() => {
          setCurrentQuestionNode(nextQuestion);
          
          addMessage({
            text: nextQuestion.question,
            isUser: false,
            description: nextQuestion.description
          });
          
          setCurrentOptions(nextQuestion.options || []);
          setIsMultiSelect(nextQuestion.multiSelect || false);
          setSelectedOptionKeys([]);
          setShowOptions(true);
        });
      }
    } else {
      // Service flow completed
      simulateTyping(() => {
        addMessage({
          text: currentServiceFlow.finalMessage,
          isUser: false
        });

        // Move to next service or contact info
        const nextServiceIndex = currentServiceIndex + 1;
        if (nextServiceIndex < selectedServices.length) {
          setCurrentServiceIndex(nextServiceIndex);
          startServiceFlow(selectedServices[nextServiceIndex]);
        } else {
          // All services completed - show privacy disclaimer before contact info
          simulateTyping(() => {
            addMessage({
              text: "Before we proceed with your contact information, please note:",
              isUser: false
            });
            addMessage({
              text: "Your information is collected solely for business purposes to provide you with accurate quotes and service. We do not share your details with third parties and adhere to strict privacy protection standards.",
              isUser: false,
              isDisclaimer: true
            });
            
            setChatMode('contact-method');
            addMessage({
              text: contactPreferenceFlow.question,
              isUser: false,
              description: contactPreferenceFlow.description
            });
            setCurrentOptions(contactPreferenceFlow.options || []);
            setIsMultiSelect(false);
            setShowOptions(true);
          });
        }
      });
    }
  }, [currentServiceFlow, currentQuestionNode, selectedOptionKeys, currentOptions, serviceStates, currentServiceIndex, selectedServices, addMessage, simulateTyping, startServiceFlow]);

  // Initialize chat
  const initializeChat = useCallback(() => {
    console.log('Initializing chat');
    setChatMessages([]);
    setSelectedServices([]);
    setSelectedOptionKeys([]);
    setServiceStates([]);
    setCurrentServiceIndex(0);
    setCurrentServiceFlow(null);
    setCurrentQuestionNode(null);
    setContactInfo({ method: '', firstName: '', lastName: '', contact: '' });
    setCurrentContactStep('method');
    setValidationError('');
    setReferenceInput('');
    setTextInputValue('');
    setChatMode('service-selection');
    setIsMultiSelect(true);

    const welcomeMessage: ChatMessage = {
      text: "Welcome to MoreGenz Security! I'll help you get a quote for our security services. Let's start by selecting the services you're interested in.",
      isUser: false
    };

    addMessage(welcomeMessage);
    
    simulateTyping(() => {
      setCurrentOptions(servicesData);
      setShowOptions(true);
    }, 1500);
  }, [addMessage, simulateTyping]);

  // Handle service selection
  const handleServiceSelect = useCallback((serviceKey: string) => {
    console.log('Service selected:', serviceKey);
    setSelectedServices(prev => {
      if (prev.includes(serviceKey)) {
        return prev.filter(key => key !== serviceKey);
      } else {
        return [...prev, serviceKey];
      }
    });
  }, []);

  // Handle multiple services submission
  const handleMultipleServicesSubmit = useCallback(() => {
    console.log('Submitting services:', selectedServices);
    if (selectedServices.length === 0) return;

    // Add user message showing selected services
    const selectedServiceLabels = selectedServices.map(key => {
      const service = servicesData.find(s => s.key === key);
      return service?.label || key;
    }).join(', ');

    addMessage({
      text: `Selected services: ${selectedServiceLabels}`,
      isUser: true
    });

    setShowOptions(false);

    simulateTyping(() => {
      // Start with first service
      setCurrentServiceIndex(0);
      startServiceFlow(selectedServices[0]);
    });
  }, [selectedServices, addMessage, simulateTyping, startServiceFlow]);

  // Handle option selection
  const handleOptionSelect = useCallback((key: string, label: string) => {
    console.log('Option selected:', key, label);
    
    if (chatMode === 'service-flow') {
      if (isMultiSelect) {
        // For multi-select, just toggle the option
        handleOptionToggle(key);
      } else {
        // For single select, proceed with the flow
        handleServiceFlowOption(key, label);
      }
    } else {
      addMessage({
        text: label,
        isUser: true
      });

      setShowOptions(false);
      setSelectedOptionKeys([]);

      simulateTyping(() => {
        setChatMode('contact-method');
        addMessage({
          text: contactPreferenceFlow.question,
          isUser: false,
          description: contactPreferenceFlow.description
        });
        setCurrentOptions(contactPreferenceFlow.options || []);
        setIsMultiSelect(false);
        setShowOptions(true);
      });
    }
  }, [chatMode, isMultiSelect, handleServiceFlowOption, handleOptionToggle, addMessage, simulateTyping]);

  // Handle multi-select submission
  const handleMultiSelectSubmit = useCallback(() => {
    if (selectedOptionKeys.length === 0) return;

    if (chatMode === 'service-flow') {
      handleServiceFlowMultiSelectSubmit();
    } else {
      const selectedLabels = selectedOptionKeys.map(key => {
        const option = currentOptions.find(opt => opt.key === key);
        return option?.label || key;
      }).join(', ');

      addMessage({
        text: `Selected: ${selectedLabels}`,
        isUser: true
      });

      setShowOptions(false);
      setSelectedOptionKeys([]);

      simulateTyping(() => {
        setChatMode('contact-method');
        addMessage({
          text: contactPreferenceFlow.question,
          isUser: false,
          description: contactPreferenceFlow.description
        });
        setCurrentOptions(contactPreferenceFlow.options || []);
        setIsMultiSelect(false);
        setShowOptions(true);
      });
    }
  }, [chatMode, selectedOptionKeys, currentOptions, handleServiceFlowMultiSelectSubmit, addMessage, simulateTyping]);

  // Handle free text submission
  const handleFreeTextSubmit = useCallback((text: string) => {
    if (text.trim()) {
      addMessage({
        text: text,
        isUser: true
      });
    }

    setChatMode('contact-method');
    simulateTyping(() => {
      addMessage({
        text: contactPreferenceFlow.question,
        isUser: false,
        description: contactPreferenceFlow.description
      });
      setCurrentOptions(contactPreferenceFlow.options || []);
      setIsMultiSelect(false);
      setShowOptions(true);
    });
  }, [addMessage, simulateTyping]);

  // Handle contact method selection
  const handleContactMethodSelect = useCallback((method: string) => {
    setContactInfo(prev => ({ ...prev, method }));
    
    addMessage({
      text: method === 'whatsapp' ? 'WhatsApp' : 'Email',
      isUser: true
    });

    setShowOptions(false);

    simulateTyping(() => {
      setChatMode('contact-info');
      setCurrentContactStep('firstName');
      addMessage({
        text: "Great! Let's get your contact information. What's your first name?",
        isUser: false
      });
    });
  }, [addMessage, simulateTyping]);

  // Handle contact info submission
  const handleContactInfoSubmit = useCallback((value: string, clearInput?: () => void) => {
    if (!value.trim()) {
      setValidationError('This field is required');
      return;
    }

    if (currentContactStep === 'contact') {
      if (contactInfo.method === 'whatsapp') {
        const phoneRegex = /^[+]?[\d\s\-()]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 8) {
          setValidationError('Please enter a valid phone number');
          return;
        }
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setValidationError('Please enter a valid email address');
          return;
        }
      }
    }

    setValidationError('');
    if (clearInput) clearInput();

    setContactInfo(prev => ({
      ...prev,
      [currentContactStep]: value
    }));

    addMessage({
      text: value,
      isUser: true
    });

    simulateTyping(() => {
      if (currentContactStep === 'firstName') {
        setCurrentContactStep('lastName');
        addMessage({
          text: "Thanks! What's your surname?",
          isUser: false
        });
      } else if (currentContactStep === 'lastName') {
        setCurrentContactStep('contact');
        const contactType = contactInfo.method === 'whatsapp' ? 'WhatsApp number' : 'email address';
        addMessage({
          text: `Perfect! What's your ${contactType}?`,
          isUser: false
        });
      } else if (currentContactStep === 'contact') {
        setChatMode('completed');
        addMessage({
          text: "Thank you! We've received all your information. Our team will contact you shortly with your personalized quote. We typically respond within 24 hours.",
          isUser: false
        });
        addMessage({
          text: "For urgent matters, feel free to call us directly at +27 12 345 6789. Thank you for choosing MoreGenz Security!",
          isUser: false,
          isDisclaimer: true
        });
      }
    });
  }, [currentContactStep, contactInfo.method, addMessage, simulateTyping]);

  // Handle reference input submission
  const handleReferenceInputSubmit = useCallback(() => {
    if (!referenceInput.trim()) {
      setValidationError('Please enter your reference number');
      return;
    }

    if (referenceInput.trim().length < 3) {
      setValidationError('Please enter a valid reference number');
      return;
    }

    setValidationError('');

    addMessage({
      text: referenceInput,
      isUser: true
    });

    setChatMode('completed');
    simulateTyping(() => {
      addMessage({
        text: `Thank you! We've found your account with reference ${referenceInput}. Our support team will review your request and contact you shortly. For urgent support, please call +27 12 345 6789.`,
        isUser: false
      });
    });
  }, [referenceInput, addMessage, simulateTyping]);

  // Reset chat
  const resetChat = useCallback(() => {
    setChatMessages([]);
    setSelectedServices([]);
    setSelectedOptionKeys([]);
    setServiceStates([]);
    setCurrentServiceIndex(0);
    setCurrentServiceFlow(null);
    setCurrentQuestionNode(null);
    setShowOptions(false);
    setChatMode('service-selection');
    setContactInfo({ method: '', firstName: '', lastName: '', contact: '' });
    setCurrentContactStep('method');
    setValidationError('');
    setReferenceInput('');
    setTextInputValue('');
  }, []);

  // Auto-scroll when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, scrollToBottom]);

  return {
    // State
    chatMessages,
    isTyping,
    showOptions,
    currentOptions,
    selectedServices,
    chatMode,
    contactInfo,
    currentContactStep,
    validationError,
    referenceInput,
    setReferenceInput,
    chatContainerRef,
    isMultiSelect,
    selectedOptionKeys,
    serviceStates,
    currentServiceIndex,
    textInputValue,
    setTextInputValue,

    // Actions
    initializeChat,
    handleServiceSelect,
    handleMultipleServicesSubmit,
    handleOptionSelect,
    handleOptionToggle,
    handleMultiSelectSubmit,
    handleFreeTextSubmit,
    handleContactMethodSelect,
    handleContactInfoSubmit,
    handleReferenceInputSubmit,
    handleServiceFlowTextInputSubmit,
    resetChat
  };
};
