import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ShieldAlert, Trash2 } from 'lucide-react';
import { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Hi there! I'm your MindCare Buddy. I'm here to listen and offer supportive coping strategies. How are you feeling today?",
  timestamp: new Date(),
};

// API Backend Base URL
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch session user id
  const getUserId = () => {
    let userId = localStorage.getItem('caremind_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('caremind_user_id', userId);
    }
    return userId;
  };

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const userId = getUserId();
      try {
        const res = await fetch(`${BACKEND_URL}/api/history/${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped: ChatMessage[] = data.map((msg: any) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              timestamp: new Date(msg.timestamp)
            }));
            setMessages(mapped);
          }
        }
      } catch (err) {
        console.warn("Could not retrieve conversation history from server. Operating in offline/local mode.", err);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    const userId = getUserId();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Connect to the new Express backend API
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, message: userText })
      });

      if (!res.ok) {
        throw new Error("Server responded with error");
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: data.id || (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.warn("Backend server connection failed. Running offline fallback.", error);
      
      // Fallback: use client-side rules if backend is unreachable
      setTimeout(() => {
        const responseContent = generateSupportResponse(userText);
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent + " (Offline Fallback)",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMsg]);
      }, 1200);
    } finally {
      setIsTyping(false);
    }
  };

  // Reset assistant memory
  const handleClearMemory = async () => {
    const userId = getUserId();
    if (window.confirm("Are you sure you want to reset your CareMind Buddy's memory of your name, triggers, and preferences? This will clear its learning database for you.")) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/facts/${userId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert("Buddy memory cleared successfully!");
        } else {
          throw new Error();
        }
      } catch (err) {
        alert("Failed to reset memory. Backend server appears to be offline.");
      }
    }
  };

  // Clear chat logs
  const handleClearHistory = async () => {
    const userId = getUserId();
    if (window.confirm("Are you sure you want to clear your local chat history?")) {
      setMessages([INITIAL_MESSAGE]);
      try {
        await fetch(`${BACKEND_URL}/api/history/${userId}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.warn("Could not delete history from server:", err);
      }
    }
  };

  const generateSupportResponse = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('sad') || t.includes('cry') || t.includes('depressed')) {
      return "I'm so sorry you're feeling this way. It's okay to let those feelings out. Would you like to try a gentle breathing exercise with me, or perhaps just talk more about what's on your mind?";
    }
    if (t.includes('anxious') || t.includes('scared') || t.includes('panic')) {
      return "I hear you. Anxiety can feel really overwhelming in the body. Let's try to focus on the present moment. Can you name 3 things you can see around you right now?";
    }
    if (t.includes('stress') || t.includes('work') || t.includes('busy')) {
      return "It sounds like you're carrying a lot right now. Remember that it's okay to take small breaks. Have you had any water or stepped away from your screen lately?";
    }
    if (t.includes('die') || t.includes('suicide') || t.includes('hurt')) {
      return "I'm very concerned about what you're saying. You don't have to carry this alone. Please reach out to a professional or a helpline. In India, you can call AASRA at 91-22-27546669 or Kiran at 1800-599-0019. They are available to help you right now.";
    }
    return "Thank you for sharing that with me. I'm here to support you. How does that make you feel overall, and what do you think would help you feel even a little bit better right now?";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-140px)] flex flex-col">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">CareMind Buddy</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">AI Support Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleClearMemory}
              className="text-[10px] text-slate-400 hover:text-indigo-400 hover:border-indigo-500 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-all font-medium"
              title="Reset AI learned facts about you"
            >
              Clear Brain
            </button>
            <button
              onClick={handleClearHistory}
              className="text-[10px] text-slate-400 hover:text-rose-400 hover:border-rose-500 bg-slate-800/40 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition-all"
              title="Clear chat screen"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[10px] text-slate-300 font-medium italic">Supportive, not medical</span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex gap-3 max-w-[80%]",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    msg.role === 'assistant' ? "bg-indigo-600" : "bg-slate-700"
                  )}>
                    {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'assistant' 
                      ? "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none" 
                      : "bg-indigo-600 text-white rounded-tr-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-slate-800">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <p className="text-[10px] text-slate-500 font-medium">Powered by CareMind Adaptive Buddy Backend</p>
          </div>
        </div>
      </div>
    </div>
  );
};
