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

  const generateSupportResponse = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('sad') || t.includes('cry') || t.includes('depressed')) {
      return "I'm so sorry you're feeling this way. It's okay to let those feelings out. Would you like to try a gentle breathing exercise with me, or perhaps just talk more about what's on your mind?";
    }
    if (t.includes('lonely') || t.includes('alone') || t.includes('isolated')) {
  return "Feeling alone can be really heavy sometimes. Just remember, even reaching out with a small message to someone you trust can make a difference.";
}

if (t.includes('angry') || t.includes('mad') || t.includes('furious')) {
  return "I can sense a lot of frustration there. Taking a slow breath before reacting can sometimes help clear the mind a little.";
}

if (t.includes('tired') || t.includes('exhausted') || t.includes('drained')) {
  return "It sounds like your mind and body are asking for rest. Even a short break or a few deep breaths can help recharge you a bit.";
}

if (t.includes('overthinking') || t.includes('overthink') || t.includes('thoughts')) {
  return "Overthinking can trap you in endless loops. Try focusing on one small thing you can control right now.";
}

if (t.includes('worthless') || t.includes('useless') || t.includes('failure')) {
  return "I'm sorry you're feeling this way. Your value isn't defined by one moment, one mistake, or one bad day.";
}

if (t.includes('heartbroken') || t.includes('breakup') || t.includes('broken')) {
  return "Heartbreak hurts deeply, and healing takes time. Be patient and gentle with yourself while you process everything.";
}

if (t.includes('lost') || t.includes('confused') || t.includes('directionless')) {
  return "It's okay not to have everything figured out right now. Sometimes taking one small step forward is enough.";
}

if (t.includes('hopeless') || t.includes('empty') || t.includes('numb')) {
  return "I'm really sorry you're carrying these feelings. Even if it doesn't feel like it now, things can change with support and time.";
}

if (t.includes('afraid') || t.includes('fear') || t.includes('terrified')) {
  return "Fear can feel intense, but you're here right now and that's important. Try taking one slow deep breath with me.";
}

if (t.includes('burnout') || t.includes('burned out') || t.includes('overworked')) {
  return "Burnout can sneak up quietly. Your mind deserves rest just as much as your body does.";
}

if (t.includes('pressure') || t.includes('expectations') || t.includes('performance')) {
  return "That sounds like a lot of pressure to carry. Remember, you don't have to be perfect to be enough.";
}

if (t.includes('guilty') || t.includes('regret') || t.includes('mistake')) {
  return "Everyone makes mistakes sometimes. What's important is learning and growing from them, not punishing yourself forever.";
}

if (t.includes('insecure') || t.includes('ugly') || t.includes('unattractive')) {
  return "I'm sorry you're feeling down about yourself. Try speaking to yourself with the same kindness you'd give a friend.";
}

if (t.includes('jealous') || t.includes('envy') || t.includes('comparison')) {
  return "Comparing yourself to others can be exhausting. Your journey doesn't have to look like anyone else's.";
}

if (t.includes('crying') || t.includes('tears') || t.includes('sob')) {
  return "Crying can be a healthy release sometimes. You don't have to hide your emotions here.";
}

if (t.includes('unmotivated') || t.includes('lazy') || t.includes('procrastinating')) {
  return "Starting can feel hard when motivation is low. Try focusing on just one tiny task instead of the whole mountain.";
}

if (t.includes('rejected') || t.includes('ignored') || t.includes('left out')) {
  return "Being rejected or ignored can really hurt. That pain is real, and it's okay to acknowledge it.";
}

if (t.includes('embarrassed') || t.includes('awkward') || t.includes('humiliated')) {
  return "Awkward moments happen to everyone, even if they feel huge right now. Most people move on faster than we think.";
}

if (t.includes('sick') || t.includes('ill') || t.includes('unwell')) {
  return "I'm sorry you're not feeling well. Please make sure you're resting and taking care of yourself.";
}

if (t.includes('sleep') || t.includes('insomnia') || t.includes('cant sleep')) {
  return "Lack of sleep can make everything feel heavier. Maybe try stepping away from screens and taking a few calming breaths.";
}

if (t.includes('family') || t.includes('parents') || t.includes('home')) {
  return "Family situations can be emotionally complicated. You deserve understanding and support too.";
}

if (t.includes('friend') || t.includes('friendship') || t.includes('best friend')) {
  return "Friendships can affect us deeply. Communication and honesty often help more than carrying things silently.";
}

if (t.includes('school') || t.includes('college') || t.includes('exam')) {
  return "Academic pressure can feel overwhelming sometimes. Remember to give yourself breaks while studying.";
}

if (t.includes('money') || t.includes('financial') || t.includes('bills')) {
  return "Financial stress can be really draining. Try focusing on one manageable step at a time instead of everything at once.";
}

if (t.includes('job') || t.includes('career') || t.includes('office')) {
  return "Work struggles can affect mental health a lot. It's okay to pause and take care of yourself too.";
}

if (t.includes('future') || t.includes('uncertain') || t.includes('life')) {
  return "The future can feel scary when things seem uncertain. You don't need every answer today.";
}

if (t.includes('grief') || t.includes('loss') || t.includes('mourning')) {
  return "Loss can leave a deep ache that takes time to process. Be gentle with yourself while healing.";
}

if (t.includes('trapped') || t.includes('stuck') || t.includes('helpless')) {
  return "Feeling stuck can be frustrating and painful. Even small changes can slowly create movement.";
}

if (t.includes('hate myself') || t.includes('self hate') || t.includes('self-hate')) {
  return "I'm sorry you're feeling this much pain toward yourself. You deserve compassion too, even when it's hard to believe.";
}

if (t.includes('self harm') || t.includes('cutting') || t.includes('harm myself')) {
  return "I'm really concerned about you right now. Please consider reaching out to someone you trust or a mental health professional for support.";
}

if (t.includes('worth living') || t.includes('give up') || t.includes('ending it')) {
  return "You matter, even if your mind is telling you otherwise right now. Please reach out to a trusted person or crisis support line.";
}

if (t.includes('panic attack') || t.includes('hyperventilating') || t.includes('cant breathe')) {
  return "Panic can feel terrifying, but it will pass. Try breathing in slowly for 4 seconds and out for 6 seconds.";
}

if (t.includes('nervous') || t.includes('worried') || t.includes('uneasy')) {
  return "It's understandable to feel nervous sometimes. Try grounding yourself in the present moment.";
}

if (t.includes('motivated') || t.includes('productive') || t.includes('focused')) {
  return "That's great to hear. Keep taking things one step at a time and remember not to burn yourself out.";
}

if (t.includes('toxic') || t.includes('manipulated') || t.includes('abused')) {
  return "That sounds emotionally exhausting. You deserve respect, safety, and support in your relationships.";
}

if (t.includes('bullied') || t.includes('picked on') || t.includes('harassed')) {
  return "I'm sorry you're dealing with that. Nobody deserves to be treated unfairly or cruelly.";
}

if (t.includes('betrayed') || t.includes('lied to') || t.includes('cheated')) {
  return "Betrayal can cut really deep emotionally. It's okay to take time to process those feelings.";
}

if (t.includes('disappointed') || t.includes('let down') || t.includes('frustrated')) {
  return "Disappointment hurts, especially when you cared a lot. Give yourself space to feel it without judging yourself.";
}

if (t.includes('homesick') || t.includes('miss home') || t.includes('miss family')) {
  return "Missing home can feel emotional and lonely. Sometimes familiar music, food, or a call can help a little.";
}

if (t.includes('social anxiety') || t.includes('socially awkward') || t.includes('people')) {
  return "Social situations can feel draining when anxiety kicks in. You don't need to force yourself to be perfect.";
}

if (t.includes('relationship') || t.includes('partner') || t.includes('love')) {
  return "Relationships can bring both joy and stress. Honest communication often helps more than bottling things up.";
}

if (t.includes('cry myself to sleep') || t.includes('cant stop crying') || t.includes('cry all night')) {
  return "I'm really sorry things feel this painful right now. You don't have to carry it all alone.";
}

if (t.includes('mental health') || t.includes('therapy') || t.includes('counseling')) {
  return "Taking care of your mental health is important and brave. Seeking support is a strength, not a weakness.";
}

if (t.includes('fear of failure') || t.includes('not good enough') || t.includes('failing')) {
  return "Fear of failure can stop people from seeing how much they've already survived and learned.";
}

if (t.includes('abandoned') || t.includes('nobody cares') || t.includes('unloved')) {
  return "I'm sorry you're feeling abandoned or unloved. Your feelings matter and you deserve care and connection.";
}

if (t.includes('stressed out') || t.includes('too much') || t.includes('overwhelmed')) {
  return "That sounds like a lot all at once. Try focusing only on the next small step instead of everything together.";
}

if (t.includes('cant focus') || t.includes('distracted') || t.includes('mind racing')) {
  return "A racing mind can make focusing really hard. Sometimes writing thoughts down can help clear mental clutter.";
}

if (t.includes('hopelessness') || t.includes('dark thoughts') || t.includes('pain')) {
  return "I'm really sorry you're going through this. Please remember you don't have to face heavy thoughts completely alone.";
}

if (t.includes('scared of future') || t.includes('fear future') || t.includes('future anxiety')) {
  return "The unknown can feel intimidating, but you don't have to solve your entire future today.";
}

if (t.includes('need help') || t.includes('help me') || t.includes('support')) {
  return "I'm here with you. Talking about what's happening is already a meaningful step.";
}

if (t.includes('hoping') || t.includes('healing') || t.includes('recovering')) {
  return "Healing isn't always linear, but every small step forward still matters.";
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
