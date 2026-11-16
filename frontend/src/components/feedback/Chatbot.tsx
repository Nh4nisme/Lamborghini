import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  showAfter?: number; // Số pixel scroll trước khi hiện button (default: 400)
}

export const Chatbot: React.FC<ChatbotProps> = ({ showAfter = 400 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Chào mừng đến với Lamborghini. Tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;
    setInputValue('');

    // Add user message
    setMessages((prev) => [...prev, {
      id: `user-${prev.length}`,
      text: messageText,
      sender: 'user' as const,
      timestamp: new Date(),
    }]);

    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: `bot-${prev.length}`,
        text: getBotResponse(messageText),
        sender: 'bot' as const,
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('giá') || lowerInput.includes('bao nhiêu')) {
      return 'Giá các dòng xe Lamborghini dao động từ hàng triệu đến hàng chục triệu USD tùy model. Vui lòng liên hệ showroom để biết giá chi tiết và các ưu đãi hiện tại.';
    }
    if (lowerInput.includes('showroom') || lowerInput.includes('đại lý')) {
      return 'Bạn có thể xem danh sách các showroom Lamborghini tại trang Showroom của chúng tôi. Tôi có thể hướng dẫn bạn đến đó không?';
    }
    if (lowerInput.includes('model') || lowerInput.includes('dòng xe')) {
      return 'Lamborghini hiện có nhiều dòng xe đẳng cấp như Huracán, Aventador, Urus và Revuelto. Bạn muốn tìm hiểu về dòng xe nào?';
    }
    if (lowerInput.includes('configurator') || lowerInput.includes('tùy chỉnh')) {
      return 'Bạn có thể sử dụng công cụ Configurator để tùy chỉnh chiếc Lamborghini của mình với màu sắc, mâm xe và nhiều tùy chọn khác. Rất thú vị đấy!';
    }
    if (lowerInput.includes('lái thử') || lowerInput.includes('test drive')) {
      return 'Để đăng ký lái thử, vui lòng liên hệ trực tiếp với showroom gần nhất. Chúng tôi sẽ sắp xếp một trải nghiệm đặc biệt cho bạn.';
    }

    return 'Cảm ơn câu hỏi của bạn. Vui lòng liên hệ showroom hoặc khám phá website để biết thêm thông tin chi tiết về các dòng xe Lamborghini.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Chat Window - Full size */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-24 right-8 z-50 w-[380px] h-[520px] transition-all duration-300 animate-fadeIn">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-2xl bg-lambo-primary/10 blur-xl" />

          {/* Main chat container */}
          <div className="relative h-full bg-lambo-dark-light border-2 border-lambo-primary/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-lambo-dark to-lambo-dark-light border-b border-lambo-primary/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lambo-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-lambo-bold-black" />
                </div>
                <div>
                  <h3 className="font-family-barlow font-bold text-base uppercase tracking-wider text-lambo-secondary">
                    Lamborghini Assistant
                  </h3>
                  <p className="text-xs text-[#a3a3a3]">Luôn sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-[#a3a3a3] hover:text-lambo-primary transition-colors"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#a3a3a3] hover:text-lambo-primary transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[75%] rounded-xl px-4 py-2.5 ${
                      message.sender === 'user'
                        ? 'bg-lambo-primary text-lambo-bold-black'
                        : 'bg-lambo-dark border border-lambo-primary/20 text-[#e5e5e5]'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-[10px] opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-lambo-dark border border-lambo-primary/20 rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-lambo-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-lambo-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-lambo-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-lambo-primary/30 p-4 bg-lambo-dark">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 bg-lambo-dark-light border border-lambo-primary/20 rounded-lg px-4 py-2.5 text-sm text-[#e5e5e5] placeholder-[#666] focus:outline-none focus:border-lambo-primary transition-colors"
                  aria-label="Message input"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed disabled:bg-lambo-disabled disabled:opacity-50 disabled:cursor-not-allowed text-lambo-bold-black rounded-lg px-4 py-2.5 transition-all duration-300"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Button - Same style as ScrollToTop */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-24 right-8 z-50 group animate-fadeIn"
          aria-label="Expand chat"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-lambo-primary/20 blur-xl group-hover:bg-lambo-primary/30 transition-all duration-300" />

          {/* Main button */}
          <div className="relative flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-lambo-dark-light border-2 border-lambo-primary rounded-full flex items-center justify-center group-hover:bg-lambo-primary group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <MessageCircle className="w-6 h-6 text-lambo-primary group-hover:text-lambo-bold-black transition-colors duration-300" />
              {/* Notification badge khi có tin nhắn mới */}
              {messages.length > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-lambo-bold-black">
                  {messages.length - 1}
                </div>
              )}
            </div>

            {/* Label */}
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8e826b] group-hover:text-lambo-primary transition-colors duration-300 whitespace-nowrap">
              Chat
            </span>
          </div>
        </button>
      )}

      {/* Floating Button - Closed state */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-24 right-8 z-50 group animate-fadeIn"
          aria-label="Open chat"
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-lambo-primary/20 blur-xl group-hover:bg-lambo-primary/30 transition-all duration-300" />

          {/* Main button */}
          <div className="relative flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-lambo-dark-light border-2 border-lambo-primary rounded-full flex items-center justify-center group-hover:bg-lambo-primary group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <MessageCircle className="w-6 h-6 text-lambo-primary group-hover:text-lambo-bold-black transition-colors duration-300" />
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-lambo-bold-black animate-pulse">
                1
              </div>
            </div>

            {/* Label */}
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8e826b] group-hover:text-lambo-primary transition-colors duration-300 whitespace-nowrap">
              Chat
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default Chatbot;
