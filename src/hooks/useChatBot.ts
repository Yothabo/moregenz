import { useState, useRef, useEffect } from 'react';
import { 
  servicePaths, 
  conversationPatterns, 
  availableServices,
  contactMethods,
  validationRules
} from '../data/chat/knowledgeBase';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  description?: string;
  type?: 'message' | 'options' | 'free-text' | 'input';
  isDisclaimer?: boolean;
}

interface ServiceState {
  key: string;
  currentQuestion: string | null;
  choices: { [key: string]: string[] };
  referenceNumber?: string;
}

export type ChatMode = 'service-selection' | 'conversation' | 'free-text' | 'contact-method' | 'contact-info' | 'completed' | 'reference-input';

export const useChatBot = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<Array<{ key: string; label: string; description?: string }>>([]);
  const [serviceState, setServiceState] = useState<ServiceState | null>(null);
  
  const [uiSelectedServices, setUiSelectedServices] = useState<string[]>([]);
  const [processingServices, setProcessingServices] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  
  const [pendingServices, setPendingServices] = useState<string[]>([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [serviceDetails, setServiceDetails] = useState<{[key: string]: any}>({});
  const [chatMode, setChatMode] = useState<ChatMode>('service-selection');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedOptionKeys, setSelectedOptionKeys] = useState<string[]>([]);
  
  const [contactInfo, setContactInfo] = useState({
    method: '',
    firstName: '',
    lastName: '',
    contact: '',
  });
  const [currentContactStep, setCurrentContactStep] = useState<'method' | 'firstName' | 'lastName' | 'contact' | 'complete'>('method');
  const [validationError, setValidationError] = useState('');
  
  const [referenceInput, setReferenceInput] = useState('');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, showOptions]);

  const initializeChat = () => {
    setChatMessages([]);
    setChatMode('service-selection');
    setUiSelectedServices([]);
    setProcessingServices([]);
    setPendingServices([]);
    setCurrentServiceIndex(0);
    setServiceDetails({});
    setAdditionalNotes('');
    setSelectedOptionKeys([]);
    setIsMultiSelect(false);
    setContactInfo({
      method: '',
      firstName: '',
      lastName: '',
      contact: '',
    });
    setCurrentContactStep('method');
    setValidationError('');
    setReferenceInput('');
    
    setChatMessages([{
      text: conversationPatterns.greeting[0],
      isUser: false,
      timestamp: new Date(),
      type: 'message'
    }]);

    setTimeout(() => {
      showServiceSelection();
    }, 500);
  };

  const showServiceSelection = () => {
    setChatMode('service-selection');
    setShowOptions(true);
    setCurrentOptions(availableServices);
  };

  const addMessage = (text: string, isUser: boolean = false, description?: string, type?: 'message' | 'options' | 'free-text' | 'input', isDisclaimer?: boolean) => {
    const message: ChatMessage = {
      text,
      isUser,
      description: isUser ? undefined : description,
      timestamp: new Date(),
      type: type || 'message',
      isDisclaimer
    };
    setChatMessages(prev => [...prev, message]);
  };

  // MODE 1: Service Selection Logic - SINGLE SELECTION ONLY
  const handleServiceToggle = (serviceKey: string) => {
    // Single selection only - select the clicked service and deselect others
    setUiSelectedServices([serviceKey]);
  };

  const handleServiceSelect = (serviceKey: string) => {
    setUiSelectedServices([serviceKey]);
  };

  const handleMultipleServicesSubmit = () => {
    if (uiSelectedServices.length === 0) return;

    const servicesToProcess = [...uiSelectedServices];
    setProcessingServices(servicesToProcess);

    const selectedLabels = servicesToProcess.map(key => 
      availableServices.find(s => s.key === key)?.label || key
    ).join(', ');
    
    addMessage(selectedLabels, true);

    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      setUiSelectedServices([]);
      
      if (servicesToProcess.length === 1) {
        // No message for single service
      } else {
        addMessage(conversationPatterns.multipleServices[0], false);
      }
      
      setPendingServices(servicesToProcess);
      startServiceFlow(servicesToProcess[0], 0, servicesToProcess.length);
      
      setIsTyping(false);
    }, 1000);
  };

  // MODE 2: Conversation Logic
  const startServiceFlow = (serviceKey: string, index: number, total: number) => {
    const service = servicePaths[serviceKey as keyof typeof servicePaths];
    if (!service) return;

    const serviceLabel = availableServices.find(s => s.key === serviceKey)?.label || serviceKey;
    
    if (total > 1 && index > 0) {
      addMessage(conversationPatterns.serviceIntroduction(serviceLabel), false);
    }

    const newServiceState: ServiceState = {
      key: serviceKey,
      currentQuestion: 'start',
      choices: {}
    };
    setServiceState(newServiceState);
    setCurrentServiceIndex(index);
    setChatMode('conversation');
    
    setServiceDetails(prev => ({
      ...prev,
      [serviceKey]: {
        service: serviceLabel,
        choices: {}
      }
    }));

    setTimeout(() => {
      askQuestion(serviceKey, 'start');
    }, 1000);
  };

  const askQuestion = (serviceKey: string, questionId: string) => {
    const service = servicePaths[serviceKey as keyof typeof servicePaths];
    const question = service.questions[questionId as keyof typeof service.questions];
    
    if (!question) {
      completeService(serviceKey);
      return;
    }

    // Check if this is a multi-select question
    const isMultiSelectQuestion = questionId.includes('coverage-areas') || 
                                 question.options.some((opt: any) => opt.description?.includes('Select all'));
    
    setIsMultiSelect(isMultiSelectQuestion);
    setSelectedOptionKeys([]);
    setCurrentQuestion(question);

    addMessage(question.question, false, question.description);

    setTimeout(() => {
      setShowOptions(true);
      setCurrentOptions(question.options);
    }, 800);
  };

  const handleOptionToggle = (optionKey: string) => {
    if (!isMultiSelect) {
      handleOptionSelect(optionKey, currentOptions.find(opt => opt.key === optionKey)?.label || optionKey);
      return;
    }

    setSelectedOptionKeys(prev => {
      if (prev.includes(optionKey)) {
        return prev.filter(key => key !== optionKey);
      } else {
        return [...prev, optionKey];
      }
    });
  };

  const handleMultiSelectSubmit = () => {
    if (selectedOptionKeys.length === 0) return;

    if (!serviceState || !currentQuestion) return;

    const selectedLabels = selectedOptionKeys.map(key => 
      currentOptions.find(opt => opt.key === key)?.label || key
    ).join(', ');
    
    addMessage(selectedLabels, true);

    setShowOptions(false);
    setIsTyping(true);
    setSelectedOptionKeys([]);

    setTimeout(() => {
      const service = servicePaths[serviceState.key as keyof typeof servicePaths];
      
      const updatedChoices = {
        ...serviceState.choices,
        [serviceState.currentQuestion!]: selectedOptionKeys
      };

      const updatedServiceState = {
        ...serviceState,
        choices: updatedChoices
      };

      setServiceState(updatedServiceState);

      setServiceDetails(prev => ({
        ...prev,
        [serviceState.key]: {
          ...prev[serviceState.key],
          choices: {
            ...prev[serviceState.key]?.choices,
            [serviceState.currentQuestion!]: selectedLabels
          }
        }
      }));

      if (currentQuestion.next) {
        const nextQuestionId = currentQuestion.next[selectedOptionKeys[0]];
        if (nextQuestionId) {
          setServiceState({
            ...updatedServiceState,
            currentQuestion: nextQuestionId
          });
          askQuestion(serviceState.key, nextQuestionId);
        } else {
          completeService(serviceState.key);
        }
      } else {
        completeService(serviceState.key);
      }

      setIsTyping(false);
    }, 1000);
  };

  const handleOptionSelect = (optionKey: string, optionLabel: string, optionDescription?: string) => {
    if (!serviceState || chatMode !== 'conversation') return;

    addMessage(optionLabel, true);

    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      const service = servicePaths[serviceState.key as keyof typeof servicePaths];
      const currentQuestion = service.questions[serviceState.currentQuestion! as keyof typeof service.questions];
      
      if (serviceState.key === 'feedback') {
        if (optionKey === 'no-reference') {
          addMessage(conversationPatterns.getQuoteFirst[0], false);
          setShowOptions(true);
          setCurrentOptions([
            { key: 'get-quote', label: 'Get a Quote', description: 'Start a new quote request' },
            { key: 'cancel', label: 'Cancel', description: 'Close this conversation' }
          ]);
          setIsTyping(false);
          return;
        } else if (optionKey === 'get-quote') {
          initializeChat();
          return;
        } else if (optionKey === 'cancel') {
          setChatMode('completed');
          setIsTyping(false);
          return;
        } else if (optionKey === 'yes-reference') {
          addMessage("Please enter your reference number:", false, '', 'input');
          setChatMode('reference-input');
          setIsTyping(false);
          return;
        } else if (optionKey === 'submit' && (
          serviceState.currentQuestion === 'feedback-details' ||
          serviceState.currentQuestion === 'support-details' ||
          serviceState.currentQuestion === 'issue-details'
        )) {
          addMessage("Please provide your detailed message below:", false, '', 'free-text');
          setChatMode('free-text');
          setIsTyping(false);
          return;
        }
      }

      const updatedChoices = {
        ...serviceState.choices,
        [serviceState.currentQuestion!]: [optionKey]
      };

      const updatedServiceState = {
        ...serviceState,
        choices: updatedChoices
      };

      setServiceState(updatedServiceState);

      setServiceDetails(prev => ({
        ...prev,
        [serviceState.key]: {
          ...prev[serviceState.key],
          choices: {
            ...prev[serviceState.key]?.choices,
            [serviceState.currentQuestion!]: optionLabel
          }
        }
      }));

      if (currentQuestion.next && currentQuestion.next[optionKey]) {
        const nextQuestionId = currentQuestion.next[optionKey];
        setServiceState({
          ...updatedServiceState,
          currentQuestion: nextQuestionId
        });
        askQuestion(serviceState.key, nextQuestionId);
      } else {
        completeService(serviceState.key);
      }

      setIsTyping(false);
    }, 1000);
  };

  const completeService = (serviceKey: string) => {
    const service = servicePaths[serviceKey as keyof typeof servicePaths];
    
    addMessage(service.finalMessage, false);

    const remainingPendingServices = pendingServices.slice(currentServiceIndex + 1);
    
    if (remainingPendingServices.length > 0) {
      setTimeout(() => {
        const nextService = remainingPendingServices[0];
        const nextIndex = currentServiceIndex + 1;
        
        setPendingServices(remainingPendingServices);
        startServiceFlow(nextService, nextIndex, pendingServices.length);
      }, 1500);
    } else {
      setTimeout(() => {
        if (serviceKey === 'feedback') {
          setChatMode('completed');
        } else {
          addMessage(conversationPatterns.finalClarification[0], false, '', 'free-text');
          setChatMode('free-text');
        }
        setServiceState(null);
        setProcessingServices([]);
      }, 1500);
    }
  };

  // MODE 3: Free Text Logic
  const handleFreeTextSubmit = (text: string) => {
    if (serviceState?.key === 'feedback') {
      setAdditionalNotes(text);
      
      if (text.trim()) {
        addMessage(text, true);
      }

      setShowOptions(false);
      setIsTyping(true);

      setTimeout(() => {
        const service = servicePaths[serviceState.key as keyof typeof servicePaths];
        addMessage(service.finalMessage, false);
        setChatMode('completed');
        setIsTyping(false);
      }, 1000);
    } else {
      setAdditionalNotes(text);
      
      if (text.trim()) {
        addMessage(text, true);
      }

      setShowOptions(false);
      setIsTyping(true);

      setTimeout(() => {
        addMessage(conversationPatterns.completion[0], false);
        addMessage(conversationPatterns.disclaimer[0], false, '', 'message', true);
        
        setChatMode('contact-method');
        setShowOptions(true);
        setCurrentOptions([
          ...contactMethods,
          { key: 'reference', label: 'I have a reference number', description: 'Use existing customer reference' }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Contact Information Flow
  const handleContactMethodSelect = (methodKey: string) => {
    const method = contactMethods.find(m => m.key === methodKey);
    
    if (methodKey === 'reference') {
      addMessage("I have a reference number", true);
      setShowOptions(false);
      setIsTyping(true);

      setTimeout(() => {
        addMessage("Please enter your reference number:", false, '', 'input');
        setChatMode('reference-input');
        setIsTyping(false);
      }, 1000);
      return;
    }

    if (!method) return;

    addMessage(method.label, true);
    setContactInfo(prev => ({ ...prev, method: methodKey }));

    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      addMessage(conversationPatterns.firstNameQuestion, false, '', 'input');
      setChatMode('contact-info');
      setCurrentContactStep('firstName');
      setIsTyping(false);
    }, 1000);
  };

  const validateInput = (value: string, step: string): boolean => {
    setValidationError('');
    
    switch (step) {
      case 'firstName':
      case 'lastName':
        if (!validationRules.name(value)) {
          setValidationError('Please enter a valid name (letters and spaces only, minimum 2 characters)');
          return false;
        }
        break;
      case 'contact':
        if (contactInfo.method === 'whatsapp') {
          if (!validationRules.whatsapp(value)) {
            setValidationError('Please enter a valid South African WhatsApp number (e.g., 0712345678 or +27712345678)');
            return false;
          }
        } else if (contactInfo.method === 'email') {
          if (!validationRules.email(value)) {
            setValidationError('Please enter a valid email address');
            return false;
          }
        }
        break;
      case 'reference':
        if (!validationRules.reference(value)) {
          setValidationError('Please enter a valid reference number (minimum 3 characters)');
          return false;
        }
        break;
    }
    return true;
  };

  const handleContactInfoSubmit = (info: string, clearInput?: () => void) => {
    if (!info.trim()) {
      setValidationError('This field is required');
      return;
    }

    if (!validateInput(info, currentContactStep)) {
      return;
    }

    addMessage(info, true);
    setValidationError('');
    if (clearInput) clearInput();

    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      switch (currentContactStep) {
        case 'firstName':
          setContactInfo(prev => ({ ...prev, firstName: info }));
          addMessage(conversationPatterns.lastNameQuestion, false, '', 'input');
          setCurrentContactStep('lastName');
          break;

        case 'lastName':
          setContactInfo(prev => ({ ...prev, lastName: info }));
          addMessage(conversationPatterns.contactInfoQuestion(contactInfo.method), false, '', 'input');
          setCurrentContactStep('contact');
          break;

        case 'contact':
          setContactInfo(prev => ({ ...prev, contact: info }));
          addMessage(conversationPatterns.finalThankYou[0], false);
          setChatMode('completed');
          setCurrentContactStep('complete');
          break;
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleReferenceInputSubmit = () => {
    if (!referenceInput.trim()) {
      setValidationError('Reference number is required');
      return;
    }

    if (!validateInput(referenceInput, 'reference')) {
      return;
    }

    addMessage(referenceInput, true);
    setValidationError('');

    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      if (serviceState?.key === 'feedback') {
        setServiceState({
          ...serviceState,
          currentQuestion: 'service-type',
          referenceNumber: referenceInput
        });
        setReferenceInput('');
        askQuestion(serviceState.key, 'service-type');
      } else {
        addMessage("Thank you for contacting us again! Your quote will be sent to your previously used contact information.", false);
        setChatMode('completed');
      }
      setIsTyping(false);
    }, 1000);
  };

  const resetChat = () => {
    setChatMessages([]);
    setShowOptions(false);
    setCurrentOptions([]);
    setServiceState(null);
    setUiSelectedServices([]);
    setProcessingServices([]);
    setPendingServices([]);
    setCurrentServiceIndex(0);
    setServiceDetails({});
    setAdditionalNotes('');
    setChatMode('service-selection');
    setSelectedOptionKeys([]);
    setIsMultiSelect(false);
    setCurrentQuestion(null);
    setContactInfo({
      method: '',
      firstName: '',
      lastName: '',
      contact: '',
    });
    setCurrentContactStep('method');
    setValidationError('');
    setReferenceInput('');
  };

  return {
    chatMessages,
    isTyping,
    showOptions,
    currentOptions,
    selectedServices: uiSelectedServices,
    serviceDetails,
    additionalNotes,
    chatMode,
    contactInfo,
    currentContactStep,
    validationError,
    referenceInput,
    setReferenceInput,
    chatContainerRef,
    isMultiSelect,
    selectedOptionKeys,
    initializeChat,
    handleServiceToggle,
    handleServiceSelect,
    handleMultipleServicesSubmit,
    handleOptionSelect,
    handleOptionToggle,
    handleMultiSelectSubmit,
    handleFreeTextSubmit,
    handleContactMethodSelect,
    handleContactInfoSubmit,
    handleReferenceInputSubmit,
    resetChat
  };
};
