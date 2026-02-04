import { motion } from 'framer-motion';
import { Brain, Shield, Sparkles, ArrowRight, MessageCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Mental Health Awareness</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Early Detection for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
              Healthier Mind
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Analyze social media posts and self-assessments using advanced NLP & Transformer models. 
            Identify early signs of depression, anxiety, and stress with supportive AI insights.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link 
              to="/questionnaire" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-900/20 transition-all flex items-center gap-2"
            >
              Take Assessment <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/analyze" 
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-bold transition-all"
            >
              Analyze Social Posts
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Sentiment Analysis",
              desc: "Deep NLP analysis of text patterns to detect emotional shifts.",
              icon: Brain,
              color: "text-indigo-400"
            },
            {
              title: "Early Warning System",
              desc: "Gentle triggers for high-risk situations with immediate resources.",
              icon: Shield,
              color: "text-rose-400"
            },
            {
              title: "Explainable AI (XAI)",
              desc: "Understand the 'why' behind AI results for better self-awareness.",
              icon: Activity,
              color: "text-emerald-400"
            }
          ].map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-slate-700 transition-all"
            >
              <div className={`p-3 rounded-2xl bg-slate-800 w-fit mb-6 ${feat.color}`}>
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Proof Section */}
      <section className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Advanced NLP Logic for Mental Health Detection</h2>
            <div className="space-y-4">
              {[
                "Transformer-based emotion classification",
                "Temporal mood pattern tracking via LSTM logic",
                "Suicidal ideation high-risk detection triggers",
                "Personalized CBT-inspired coping strategies"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] shadow-2xl relative">
            <div className="absolute -top-4 -left-4 bg-indigo-600 p-4 rounded-2xl shadow-xl">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-slate-800 rounded-full animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-800 rounded-full animate-pulse" />
              <div className="pt-4 border-t border-slate-800 mt-4">
                <div className="flex gap-2 mb-4">
                  <div className="h-8 w-8 rounded-full bg-slate-700" />
                  <div className="space-y-1">
                    <div className="h-3 w-20 bg-slate-700 rounded-full" />
                    <div className="h-2 w-32 bg-slate-800 rounded-full" />
                  </div>
                </div>
                <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <p className="text-indigo-400 text-xs font-bold uppercase mb-2">AI Analysis Result</p>
                  <p className="text-slate-300 text-sm italic">"Detected patterns of high anxiety and burnout risk. Suggesting breathing exercises..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
