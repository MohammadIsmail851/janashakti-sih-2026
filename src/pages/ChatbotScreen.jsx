import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Mic, 
  Bot, 
  ChevronRight, 
  ShieldCheck, 
  HelpCircle,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScholarship } from '../context/ScholarshipContext';
import { useChat } from '../context/ChatContext';
import { useNotifications } from '../context/NotificationContext';

export const ChatbotScreen = () => {
  const { t, language } = useLanguage();
  const { student, schemes } = useScholarship();
  const { chatMessages, sendJagoMessage } = useChat();
  const { showToast } = useNotifications();

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    sendJagoMessage(text.trim());
    setInputText('');
  };

  const handleVoiceInputSimulation = () => {
    setIsListening(true);
    showToast(t('listening'), "info");
    
    setTimeout(() => {
      setIsListening(false);
      let simulatedQuery = "Why is my application pending?";
      if (language === 'hi') {
        simulatedQuery = "मेरा आवेदन लंबित क्यों है?";
      } else if (language === 'te') {
        simulatedQuery = "నా దరఖాస్తు ఎందుకు పెండింగ్‌లో ఉంది?";
      }
      handleSend(simulatedQuery);
    }, 2000);
  };

  const faqItems = [
    { q: t('queryWhyPending') },
    { q: t('queryPaymentEta') },
    { q: t('queryAmIEligible') },
    { q: t('queryMissingDocs') },
    { q: t('queryExplainNfst') },
    { q: t('queryExplainNos') },
  ];

  return (
    <div className="min-h-screen bg-surface-bg pb-24 lg:pb-12 pt-3 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col space-y-4">
        
        {/* Chatbot Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  {t('jagoTitle')}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  MoTA PMU
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t('jagoSubtitle')} • {student.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NSP 2.0 Live</span>
          </div>
        </div>

        {/* Responsive Layout: Chat box on left, Knowledge Sidebar on desktop right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[580px]">
          
          {/* Main Chat Interface (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col bg-white rounded-card border border-slate-200/80 shadow-soft p-4 sm:p-5 overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1 max-h-[550px]">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-soft-sm ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-slate-50 text-slate-800 border border-slate-200/70 rounded-bl-sm'
                      }`}
                    >
                      {!isUser && msg.title && (
                        <div className="text-xs sm:text-sm font-bold text-blue-700 mb-1.5 pb-1 border-b border-slate-200/60 flex items-center">
                          <Sparkles className="w-4 h-4 text-blue-600 mr-1.5" />
                          {msg.title}
                        </div>
                      )}

                      <div className="whitespace-pre-line font-medium text-slate-700">
                        {msg.text}
                      </div>

                      {msg.subText && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-500">
                          {msg.subText}
                        </div>
                      )}
                    </div>

                    {/* AI Prompt Chips */}
                    {!isUser && msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                        {msg.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(chip)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold transition-all haptic-press flex items-center space-x-1"
                          >
                            <span>{chip}</span>
                            <ChevronRight className="w-3 h-3 text-blue-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isListening && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center space-x-3 text-xs text-blue-800 animate-pulse">
                  <Mic className="w-4 h-4 text-blue-600" />
                  <span>{t('listening')}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200"
              >
                <button
                  type="button"
                  onClick={handleVoiceInputSimulation}
                  className={`p-2.5 rounded-xl transition-all haptic-press ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                  }`}
                  title={t('voiceSearch')}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('askPlaceholder')}
                  className="flex-1 text-xs sm:text-sm text-slate-900 bg-transparent focus:outline-none font-medium px-2"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-xl transition-all haptic-press ${
                    inputText.trim()
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Desktop Right Column: FAQ & Tribal Knowledge Base (4 cols) */}
          <div className="hidden lg:flex flex-col space-y-4 lg:col-span-4">
            <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </div>
              <div className="space-y-2">
                {faqItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(item.q)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/70 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-all haptic-press flex items-center justify-between"
                  >
                    <span>{item.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-card p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>JAGO AI Capabilities</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                JAGO analyzes student eligibility in real-time by cross-matching institutional enrollment at NIT Rourkela with Ministry of Tribal Affairs guidelines for ST scholars.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
