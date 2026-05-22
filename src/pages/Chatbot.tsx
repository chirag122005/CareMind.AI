import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Hi there! I'm your MindCare Buddy. I'm here to listen and offer supportive coping strategies. How are you feeling today?",
  timestamp: new Date(),
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI logic
    setTimeout(() => {
      const responseContent = generateSupportResponse(input);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

function getSupportReply(input) {
  const t = input.toLowerCase();

  const replies = [
    {
      keywords: ['sad', 'cry', 'depressed', 'down', 'unhappy'],
      reply: "I’m really sorry you’re feeling this way. It’s okay to let it out. Do you want to talk about what happened?"
    },
    {
      keywords: ['anxious', 'scared', 'panic', 'nervous', 'worried'],
      reply: "That sounds really overwhelming. Try to take one slow breath with me. What is one thing around you that feels safe right now?"
    },
    {
      keywords: ['stress', 'stressed', 'pressure', 'tense', 'overwhelmed'],
      reply: "You sound like you have a lot on your plate. Let’s slow things down. What is the biggest thing stressing you out right now?"
    },
    {
      keywords: ['work', 'job', 'office', 'boss', 'shift'],
      reply: "Work can get heavy fast. Please remember to take small breaks and breathe. What part of work is feeling hardest today?"
    },
    {
      keywords: ['busy', 'packed', 'hectic', 'rush', 'overloaded'],
      reply: "It sounds like your day is packed. You do not have to do everything at once. What is the one thing you need to handle first?"
    },
    {
      keywords: ['hurt', 'pain', 'broken', 'badly', 'injured'],
      reply: "I’m sorry you’re hurting. Please take care of yourself first and reach out to someone nearby if you need support."
    },
    {
      keywords: ['die', 'suicide', 'kill myself', 'end it', 'self harm'],
      reply: "I’m really concerned about your safety. Please reach out to emergency services or a crisis helpline right now, and tell a trusted person nearby immediately."
    },
    {
      keywords: ['lonely', 'alone', 'isolated', 'left out', 'abandoned'],
      reply: "Feeling alone can hurt a lot. You matter, and you do not need to sit with this by yourself. Can you message one trusted person right now?"
    },
    {
      keywords: ['anger', 'angry', 'mad', 'furious', 'annoyed'],
      reply: "That sounds really intense. It may help to step away for a minute and cool down before replying or deciding anything."
    },
    {
      keywords: ['tired', 'exhausted', 'sleepy', 'burnout', 'burned out'],
      reply: "You sound exhausted. Rest is not laziness. Can you give yourself a real pause, even for 10 minutes?"
    },

    // More support lines
    {
      keywords: ['confused', 'lost', 'stuck', 'mixed up', 'unclear'],
      reply: "Feeling stuck can be frustrating. Let’s break it into smaller pieces. What is the first small step you can take?"
    },
    {
      keywords: ['failure', 'failed', 'worthless', 'useless', 'bad'],
      reply: "That thought is very heavy, but it is not the full truth about you. One hard moment does not define your value."
    },
    {
      keywords: ['panic attack', 'panic', 'breathing', 'hyperventilate'],
      reply: "Let’s slow it down together. Try breathing in for 4, hold for 4, and out for 6. Repeat a few times."
    },
    {
      keywords: ['exam', 'studies', 'study', 'school', 'college'],
      reply: "Academic pressure can be a lot. You do not need to solve everything in one sitting. What topic is stressing you most?"
    },
    {
      keywords: ['relationship', 'breakup', 'partner', 'girlfriend', 'boyfriend'],
      reply: "Relationship pain can hit hard. Be gentle with yourself. Do you want to talk about what happened?"
    },
    {
      keywords: ['family', 'parents', 'home', 'siblings', 'relative'],
      reply: "Family stress can feel extra personal. I’m here with you. What part of the situation feels hardest?"
    },
    {
      keywords: ['money', 'broke', 'debt', 'poor', 'expenses'],
      reply: "Money stress can be exhausting. Let’s focus on the next small step instead of the whole mountain at once."
    },
    {
      keywords: ['future', 'career', 'jobless', 'uncertain', 'direction'],
      reply: "Not knowing the future can feel scary. You do not need all the answers today. What is one thing you can do this week?"
    },
    {
      keywords: ['failure', 'rejected', 'rejection', 'embarrassed', 'ashamed'],
      reply: "Rejection stings, for real. But one no does not erase your worth or your progress."
    },
    {
      keywords: ['sleep', 'insomnia', 'can’t sleep', 'awake', 'night'],
      reply: "Lack of sleep can make everything feel louder. Try putting the phone away for a bit and letting your body rest."
    },

    // More
    {
      keywords: ['crying', 'tears', 'weeping'],
      reply: "It is okay to cry. Sometimes tears are just the body’s way of letting pressure out. You do not have to hide it here."
    },
    {
      keywords: ['numb', 'empty', 'blank', 'nothing'],
      reply: "Feeling numb can be really unsettling. You’re not alone in this. Try noticing one small thing you can see or touch right now."
    },
    {
      keywords: ['hopeless', 'no hope', 'give up', 'pointless'],
      reply: "I’m sorry it feels so dark right now. Even if it does not feel like it, this moment can change."
    },
    {
      keywords: ['pressure', 'expectations', 'performance'],
      reply: "That sounds like a lot of pressure. You do not have to be perfect to be enough."
    },
    {
      keywords: ['weak', 'failure', 'bad person'],
      reply: "Having a hard time does not make you weak. It makes you human."
    },
    {
      keywords: ['fear', 'afraid', 'terrified'],
      reply: "Fear can make everything feel bigger than it is. Let’s focus on the next safe step, not the whole future."
    },
    {
      keywords: ['argue', 'fight', 'fighting', 'conflict'],
      reply: "Conflict can drain you fast. It may help to pause before reacting and give yourself a little space."
    },
    {
      keywords: ['sadness', 'melancholy', 'blue'],
      reply: "I’m here with you. You do not have to explain everything perfectly to be heard."
    },
    {
      keywords: ['depressed', 'depression'],
      reply: "That sounds really hard. Please consider reaching out to someone you trust or a mental health professional today."
    },
    {
      keywords: ['suicidal', 'self-harm', 'hurt myself'],
      reply: "Your safety matters most. Please contact emergency services or a crisis line now, and reach out to a trusted person immediately."
    },

    // Extra 20 to make it 50
    {
      keywords: ['annoyed', 'irritated', 'frustrated'],
      reply: "That is frustrating, no doubt. Take one breath before dealing with it again."
    },
    {
      keywords: ['panic', 'freaking out'],
      reply: "Let’s ground ourselves: name 3 things you can see, 2 things you can touch, and 1 thing you can hear."
    },
    {
      keywords: ['alone at work', 'overworked'],
      reply: "Being overwhelmed at work is rough. Try to separate urgent tasks from everything else."
    },
    {
      keywords: ['insecure', 'self doubt', 'doubt'],
      reply: "Self-doubt can be loud, but it is not always accurate. Be kind to yourself today."
    },
    {
      keywords: ['overthinking', 'thinking too much'],
      reply: "Overthinking is exhausting. Try writing the thought down instead of carrying it in your head."
    },
    {
      keywords: ['failure', 'mess up', 'mistake'],
      reply: "Mistakes happen. They are painful, but they are also part of learning."
    },
    {
      keywords: ['sad at night', 'night sad', 'midnight thoughts'],
      reply: "Nights can make feelings hit harder. Try a glass of water, a slow breath, and a calmer screen break."
    },
    {
      keywords: ['mood', 'bad mood', 'low mood'],
      reply: "A low mood can pass, even if it feels stuck right now. Start with one tiny comfort."
    },
    {
      keywords: ['headache', 'body ache', 'sick'],
      reply: "Your body may be asking for rest. Hydrate, pause, and take care of the basics first."
    },
    {
      keywords: ['crying alone', 'hide tears'],
      reply: "You do not need to hide your pain here. It is okay to be honest about how you feel."
    },

    {
      keywords: ['bad day', 'rough day'],
      reply: "Some days are just rough. You made it this far, and that counts."
    },
    {
      keywords: ['unmotivated', 'lazy', 'can’t start'],
      reply: "Starting is the hardest part sometimes. Try the tiniest possible step."
    },
    {
      keywords: ['failure again', 'keep failing'],
      reply: "Keeping going after failure is hard, but it also means you have not given up."
    },
    {
      keywords: ['stress at home', 'home stress'],
      reply: "Home stress can be draining. Is there a small quiet moment you can create for yourself?"
    },
    {
      keywords: ['panic again', 'panic returning'],
      reply: "I’m here with you. Let’s slow the body down first, then deal with the rest."
    },
    {
      keywords: ['worthless', 'not enough'],
      reply: "You are not worthless. A hard moment can lie to you about who you are."
    },
    {
      keywords: ['hurt feelings', 'heartbroken'],
      reply: "That sounds painful. Take your time, and be gentle with yourself."
    },
    {
      keywords: ['nervous about work', 'job interview', 'interview'],
      reply: "Interviews can be scary, but they do not decide your whole value. One step at a time."
    },
    {
      keywords: ['busy day', 'no time'],
      reply: "When life is full-speed, even tiny pauses help. Drink some water and reset for a second."
    },
    {
      keywords: ['need help', 'help me'],
      reply: "I’m here. Tell me what is going on, and we’ll figure out the next step together."
    }
  ];

  for (const item of replies) {
    for (const keyword of item.keywords) {
      if (t.includes(keyword)) {
        return item.reply;
      }
    }
  }

  return "I’m here with you. Tell me a little more about what’s going on, and I’ll try to help.";
}

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
              <h3 className="font-bold text-white text-sm">MindCare Buddy</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">AI Support Active</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] text-slate-300 font-medium italic">Supportive, not medical</span>
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
            <p className="text-[10px] text-slate-500 font-medium">Powered by MindCare NLP & Safety Triggers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
