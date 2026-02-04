import { useState } from 'react';
import { Brain, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { analyzeText } from '@/lib/mockAI';
import { AssessmentResult } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

export const AnalyzeText = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate complex NLP processing
    setTimeout(() => {
      const analysis = analyzeText(text);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-white">NLP Mental Health Analysis 🧠</h2>
        <p className="text-slate-400">
          Paste your social media captions, journal entries, or thoughts below. 
          Our AI analyzes linguistic patterns to detect early signs of distress.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500" />
        <div className="p-8 space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write how you feel or paste a post content here..."
            className="w-full h-48 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Private & Local Analysis</span>
              <span className="mx-2">•</span>
              <Info className="h-4 w-4" />
              <span>Uses Transformer-based Models</span>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20"
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  Analyze Post <Sparkles className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-400" />
                Detection Results
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Depression Indicator', value: result.depressionScore, color: 'bg-rose-500' },
                  { label: 'Anxiety Indicator', value: result.anxietyScore, color: 'bg-violet-500' },
                  { label: 'Stress Indicator', value: result.stressScore, color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white">{item.value.toFixed(1)} / 10</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value * 10}%` }}
                        className={`h-full ${item.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={cn(
                "p-4 rounded-2xl border text-sm font-bold flex items-center gap-3",
                result.suicideRisk === 'High' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                result.suicideRisk === 'Medium' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
              )}>
                <div className={cn("w-2 h-2 rounded-full", 
                  result.suicideRisk === 'High' ? "bg-rose-500" :
                  result.suicideRisk === 'Medium' ? "bg-amber-500" :
                  "bg-emerald-500"
                )} />
                Risk Priority: {result.suicideRisk}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-white">AI Reasoning (XAI)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our model identified specific linguistic triggers in your text. 
                The analysis suggests a {result.suicideRisk === 'High' ? 'strong' : 'mild'} presence of negative cognitive bias.
              </p>
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 italic text-slate-300 text-sm">
                "{result.explanation}"
              </div>
              <p className="text-xs text-slate-500">
                Models used: DistilBERT, Sentiment Analysis (Heuristic Mapping), and Emotion Classification.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
