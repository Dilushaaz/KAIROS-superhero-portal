import React, { useState, useEffect, useRef } from 'react';
import { Radio, X, Send, Disc, RefreshCw } from 'lucide-react';
import { sendPrioritySignal } from '../utils/emailService';

export default function ChatWidget({ isOpen, onClose, onOpen }) {
  const [chatData, setChatData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    grievance: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 'kairos-0',
      sender: 'kairos',
      text: 'Signal detected. I am KAIROS, the Moment Keeper. I monitor moments that matter across the Guardian Network. What is your name?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const nextIdRef = useRef(1);

  const getNextId = (prefix) => {
    nextIdRef.current += 1;
    return `${prefix}-${nextIdRef.current}`;
  };

  // Auto-scroll on new messages or typing state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Automatically focus textarea when opened and after KAIROS finishes processing
  useEffect(() => {
    if (isOpen && !isTyping) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const executeDispatch = async (signalPayload) => {
    const timestamp = signalPayload.timestamp || new Date().toLocaleString();
    const fullPayload = {
      ...signalPayload,
      timestamp
    };

    // 1. Temporary encrypting and transmission message
    const encryptMsgId = getNextId('kairos');
    setMessages((prev) => [
      ...prev,
      {
        id: encryptMsgId,
        sender: 'kairos',
        text: '⚡ Encrypting and transmitting priority signal to the KAIROS Guardian Network...'
      }
    ]);
    setIsTyping(true);

    // 2. Invoke email service (mock or live EmailJS)
    const response = await sendPrioritySignal(fullPayload);
    setIsTyping(false);

    if (response.success) {
      setCurrentStep(5);
      const confirmMsgId = getNextId('kairos');
      setMessages((prev) => [
        ...prev,
        {
          id: confirmMsgId,
          sender: 'kairos',
          text: 'Signal successfully received. Priority dispatch confirmed. The KAIROS Guardian Network has been notified.',
          isRecord: true,
          recordData: fullPayload
        }
      ]);
    } else {
      // Failure state with retry option
      const errorMsgId = getNextId('kairos');
      setMessages((prev) => [
        ...prev,
        {
          id: errorMsgId,
          sender: 'kairos',
          text: 'Signal transmission interrupted. The priority dispatch could not be completed.',
          isError: true,
          retryPayload: fullPayload
        }
      ]);
    }
  };

  const handleRetry = (retryPayload) => {
    if (isTyping) return;
    executeDispatch(retryPayload);
  };

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;

    // Add visitor's message with a generated ID
    const visitorMsgId = getNextId('visitor');
    const visitorMsg = {
      id: visitorMsgId,
      sender: 'visitor',
      text: trimmed
    };

    setMessages((prev) => [...prev, visitorMsg]);
    setInputText('');

    if (currentStep === 4) {
      // Step 4 (Grievance submitted) -> Execute Priority Dispatch
      const updatedData = { ...chatData, grievance: trimmed };
      setChatData(updatedData);
      executeDispatch(updatedData);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        processNextStep(trimmed);
        setIsTyping(false);
      }, 600);
    }
  };

  const processNextStep = (input) => {
    const kairosMsgId = getNextId('kairos');

    if (currentStep === 0) {
      // Step 0 -> Step 1 (Name -> Age)
      const name = input;
      setChatData((prev) => ({ ...prev, name }));
      setCurrentStep(1);
      setMessages((prev) => [
        ...prev,
        {
          id: kairosMsgId,
          sender: 'kairos',
          text: `Understood, ${name}. To assist you appropriately, what is your age?`
        }
      ]);
    } else if (currentStep === 1) {
      // Step 1 -> Step 2 (Age -> Location)
      const ageNum = parseInt(input, 10);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 130) {
        setMessages((prev) => [
          ...prev,
          {
            id: kairosMsgId,
            sender: 'kairos',
            text: 'Please provide a valid numerical age so I can calibrate the response appropriately.'
          }
        ]);
        return;
      }
      setChatData((prev) => ({ ...prev, age: input }));
      setCurrentStep(2);
      setMessages((prev) => [
        ...prev,
        {
          id: kairosMsgId,
          sender: 'kairos',
          text: 'Where is the moment unfolding? Tell me your location or sector.'
        }
      ]);
    } else if (currentStep === 2) {
      // Step 2 -> Step 3 (Location -> Email)
      setChatData((prev) => ({ ...prev, location: input }));
      setCurrentStep(3);
      setMessages((prev) => [
        ...prev,
        {
          id: kairosMsgId,
          sender: 'kairos',
          text: 'Where can I transmit updates when your signal is processed? Please enter your email address.'
        }
      ]);
    } else if (currentStep === 3) {
      // Step 3 -> Step 4 (Email -> Grievance)
      if (!validateEmail(input)) {
        setMessages((prev) => [
          ...prev,
          {
            id: kairosMsgId,
            sender: 'kairos',
            text: "That signal address doesn't appear valid. Please enter a valid email address."
          }
        ]);
        return;
      }
      setChatData((prev) => ({ ...prev, email: input }));
      setCurrentStep(4);
      setMessages((prev) => [
        ...prev,
        {
          id: kairosMsgId,
          sender: 'kairos',
          text: 'Now tell me what happened. Describe the situation, problem, or request in as much detail as you need.'
        }
      ]);
    } else {
      // Post-confirmation queries
      setMessages((prev) => [
        ...prev,
        {
          id: kairosMsgId,
          sender: 'kairos',
          text: 'Your signal remains secured in the Guardian Network. A guardian node will monitor your coordinates.'
        }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button at bottom-right */}
      {!isOpen && (
        <button
          type="button"
          className="chat-floating-trigger"
          onClick={onOpen}
          aria-label="Open KAIROS Signal Messenger"
          aria-haspopup="dialog"
        >
          <span className="trigger-status-beacon" aria-hidden="true"></span>
          <Radio size={16} aria-hidden="true" />
          <span>SIGNAL KAIROS</span>
        </button>
      )}

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="chat-mobile-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className="chat-widget-wrapper"
          role="dialog"
          aria-modal="true"
          aria-label="KAIROS Guardian Signal Interface"
        >
          <div className="glass-card chat-window">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-identity">
                <div className="chat-avatar-disc" aria-hidden="true">
                  <Disc size={18} />
                </div>
                <div className="chat-brand-meta">
                  <span className="chat-brand-name">KAIROS</span>
                  <span className="chat-brand-sub">THE MOMENT KEEPER</span>
                </div>
              </div>

              <div className="chat-header-controls">
                <div className="chat-status-pill">
                  <span className="status-dot" style={{ width: '5px', height: '5px' }} aria-hidden="true"></span>
                  <span>GUARDIAN ONLINE</span>
                </div>
                <button
                  type="button"
                  className="chat-close-btn"
                  onClick={onClose}
                  aria-label="Close signal chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="chat-body" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-msg-row ${msg.sender}`}>
                  <span className="msg-sender-label">
                    {msg.sender === 'kairos' ? 'KAIROS // GUARDIAN' : 'SIGNAL TRANSMITTER'}
                  </span>
                  <div className="chat-msg-bubble">
                    {msg.text}

                    {/* Step 5 Priority Signal Summary Record */}
                    {msg.isRecord && msg.recordData && (
                      <div className="signal-record-box">
                        <span className="record-box-header">SIGNAL RECORD</span>
                        <div className="record-box-divider"></div>

                        <div className="record-line">
                          <span className="record-line-label">NAME:</span>
                          <span className="record-line-value">{msg.recordData.name}</span>
                        </div>
                        <div className="record-line">
                          <span className="record-line-label">AGE:</span>
                          <span className="record-line-value">{msg.recordData.age}</span>
                        </div>
                        <div className="record-line">
                          <span className="record-line-label">LOCATION:</span>
                          <span className="record-line-value">{msg.recordData.location}</span>
                        </div>
                        <div className="record-line">
                          <span className="record-line-label">EMAIL:</span>
                          <span className="record-line-value">{msg.recordData.email}</span>
                        </div>

                        <div className="record-status-group">
                          <div className="record-line">
                            <span className="record-line-label">STATUS:</span>
                            <span className="record-line-value status-highlight">PRIORITY SIGNAL DISPATCHED</span>
                          </div>
                          <div className="record-line">
                            <span className="record-line-label">TIMESTAMP:</span>
                            <span className="record-line-value" style={{ fontSize: '0.7rem' }}>
                              {msg.recordData.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Failure Retry Box */}
                    {msg.isError && msg.retryPayload && (
                      <div className="signal-error-box">
                        <button
                          type="button"
                          className="btn-retry-dispatch"
                          onClick={() => handleRetry(msg.retryPayload)}
                          disabled={isTyping}
                          aria-label="Retry Priority Dispatch"
                        >
                          <RefreshCw size={13} aria-hidden="true" />
                          <span>RETRY DISPATCH</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chat-typing-bubble" aria-label="KAIROS is processing">
                  <span>KAIROS is processing...</span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="chat-footer">
              <form
                className="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <textarea
                  ref={textareaRef}
                  className="chat-textarea"
                  rows={currentStep === 4 ? 2 : 1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isTyping
                      ? 'KAIROS is processing...'
                      : currentStep === 5
                      ? 'Transmit further updates...'
                      : 'Transmit your response...'
                  }
                  disabled={isTyping}
                  aria-label="Your response to KAIROS"
                />

                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!inputText.trim() || isTyping}
                  aria-label="Send signal response"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
