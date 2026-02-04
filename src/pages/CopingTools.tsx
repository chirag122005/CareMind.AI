import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, ShieldCheck, Heart, Coffee, Book, Phone } from 'lucide-react';

const HELPLINES = [
  { name: 'AASRA', number: '91-22-27546669', desc: '24/7 Suicide Prevention' },
  { name: 'Kiran', number: '1800-599-0019', desc: 'Mental Health Rehabilitation' },
  { name: 'Vandrevala Foundation', number: '1860-266-2345', desc: 'Emotional Support' },
];

const COPING_STRATEGIES = [
  { 
    title: '5-4-3-2-1 Grounding', 
    desc: 'Focus on 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.',
    icon: ShieldCheck,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10'
  },
  { 
    title: 'Mindful Journaling', 
    desc: 'Write down 3 things you are grateful for today, no matter how small.',
    icon: Book,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  { 
    title: 'Digital Detox', 
    desc: 'Step away from social media for 30 minutes. Focus on your immediate surroundings.',
    icon: Coffee,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  }
];

export const CopingTools = () => {
  const [breathing, setBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval: any;
    if (breathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (breathStage === 'Inhale') {
              setBreathStage('Hold');
              return 4;
            } else if (breathStage === 'Hold') {
              setBreathStage('Exhale');
              return 6;
            } else {
              setBreathStage('Inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimer(4);
      setBreathStage('Inhale');
    }
    return () => clearInterval(interval);
  }, [breathing, breathStage]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-white">Coping Strategies & Tools 🌱</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          These tools are designed to help you manage immediate stress and anxiety. 
          Remember, taking a moment for yourself is a sign of strength.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Breathing Exercise Section */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <Wind className="h-5 w-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Box Breathing (4-4-6)</h3>
          </div>

          <div className="relative h-64 w-64 flex items-center justify-center">
            {/* Pulsing Circle */}
            <motion.div
              animate={{
                scale: breathing ? (breathStage === 'Inhale' ? 1.5 : breathStage === 'Hold' ? 1.5 : 1) : 1,
                opacity: breathing ? (breathStage === 'Hold' ? 0.8 : 0.5) : 0.5,
              }}
              transition={{ duration: timer, ease: "easeInOut" }}
              className="absolute h-40 w-40 bg-indigo-500 rounded-full blur-2xl"
            />
            
            <motion.div
              animate={{
                scale: breathing ? (breathStage === 'Inhale' ? 1.5 : breathStage === 'Hold' ? 1.5 : 1) : 1,
              }}
              transition={{ duration: timer, ease: "easeInOut" }}
              className="h-40 w-40 border-4 border-indigo-400 rounded-full flex flex-col items-center justify-center relative z-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={breathStage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                  <span className="block text-xl font-black text-white uppercase tracking-tighter">{breathStage}</span>
                  <span className="text-3xl font-bold text-indigo-400">{timer}s</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <button
            onClick={() => setBreathing(!breathing)}
            className={`mt-10 px-8 py-3 rounded-xl font-bold transition-all ${
              breathing 
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700" 
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/40"
            }`}
          >
            {breathing ? "Stop Exercise" : "Start Breathing"}
          </button>
        </div>

        {/* Strategies Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 px-2">
            <Heart className="h-4 w-4 text-rose-400" /> Grounding Techniques
          </h3>
          {COPING_STRATEGIES.map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex gap-4 hover:border-slate-600 transition-colors">
              <div className={`p-3 rounded-xl h-fit ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{s.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helplines Section */}
      <div className="bg-rose-500/5 border border-rose-500/10 p-8 rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="h-6 w-6 text-rose-500" />
          <h3 className="text-xl font-bold text-white">Emergency Support Helplines (India 🇮🇳)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HELPLINES.map((h, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 transition-colors">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1 block">{h.name}</span>
              <div className="text-xl font-black text-white mb-2">{h.number}</div>
              <p className="text-xs text-slate-500">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
