import { useEffect, useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend
} from 'recharts';
import { AlertCircle, ArrowRight, Brain, Heart, ShieldAlert, Sparkles, Wind } from 'lucide-react';
import { AssessmentResult } from '@/types';
import { Link } from 'react-router-dom';

const MOCK_MOOD_HISTORY = [
  { day: 'Mon', sadness: 2, happiness: 8, stress: 3 },
  { day: 'Tue', sadness: 3, happiness: 7, stress: 4 },
  { day: 'Wed', sadness: 5, happiness: 4, stress: 6 },
  { day: 'Thu', sadness: 4, happiness: 5, stress: 5 },
  { day: 'Fri', sadness: 2, happiness: 9, stress: 2 },
  { day: 'Sat', sadness: 1, happiness: 9, stress: 1 },
  { day: 'Sun', sadness: 2, happiness: 8, stress: 2 },
];

export const Dashboard = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('assessment_result');
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Brain className="h-12 w-12 text-indigo-500 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-white">No Assessment Data Found</h2>
          <p className="text-slate-400">Please complete the initial questionnaire to see your insights.</p>
          <Link to="/questionnaire" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const radarData = [
    { subject: 'Depression', A: result.depressionScore * 10, fullMark: 100 },
    { subject: 'Anxiety', A: result.anxietyScore * 10, fullMark: 100 },
    { subject: 'Stress', A: result.stressScore * 10, fullMark: 100 },
    { subject: 'Happiness', A: (10 - result.depressionScore) * 10, fullMark: 100 },
    { subject: 'Calmness', A: (10 - result.anxietyScore) * 10, fullMark: 100 },
    { subject: 'Energy', A: (10 - result.stressScore) * 10, fullMark: 100 },
  ];

  const riskColor = result.suicideRisk === 'High' ? 'text-rose-500' : result.suicideRisk === 'Medium' ? 'text-amber-500' : 'text-emerald-500';
  const riskBg = result.suicideRisk === 'High' ? 'bg-rose-500/10 border-rose-500/20' : result.suicideRisk === 'Medium' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20';

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Early Warning Header */}
      {result.suicideRisk !== 'Low' && (
        <div className={`p-4 rounded-2xl border flex items-center gap-4 ${riskBg}`}>
          <ShieldAlert className={`h-6 w-6 ${riskColor}`} />
          <div className="flex-1">
            <h3 className={`font-bold ${riskColor}`}>System Alert: {result.suicideRisk} Emotional Load</h3>
            <p className="text-sm text-slate-300">We noticed some patterns that might be weighing you down. We're here for you.</p>
          </div>
          <Link to="/coping" className="bg-slate-900/50 hover:bg-slate-900 px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2">
            Get Support <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Depression Level', val: result.depressionScore.toFixed(1), icon: Heart, color: 'text-rose-400' },
          { label: 'Anxiety Level', val: result.anxietyScore.toFixed(1), icon: Brain, color: 'text-violet-400' },
          { label: 'Stress Level', val: result.stressScore.toFixed(1), icon: Sparkles, color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score / 10</span>
            </div>
            <div className="text-3xl font-black text-white">{stat.val}</div>
            <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emotional Balance Radar */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Emotional Balance 🕸️</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar
                  name="Mood Profile"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Mood Trend */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Mood Timeline 📈</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MOOD_HISTORY}>
                <defs>
                  <linearGradient id="colorHapp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="happiness" stroke="#10b981" fillOpacity={1} fill="url(#colorHapp)" />
                <Area type="monotone" dataKey="stress" stroke="#f59e0b" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Breakdown */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6">Detailed Risk Distribution 📊</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Depression', value: result.depressionScore, full: 10 },
                { name: 'Anxiety', value: result.anxietyScore, full: 10 },
                { name: 'Stress', value: result.stressScore, full: 10 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} domain={[0, 10]} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* XAI Explanation */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2 italic">Explainable AI (XAI) Insight</h3>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              {result.explanation} 
              The system analyzed your responses using Transformer-based NLP conceptual logic, 
              focusing on key indicators of {result.depressionScore > 5 ? 'persistent low mood' : 'emotional stability'} 
              and {result.anxietyScore > 5 ? 'heightened vigilance patterns' : 'relaxed cognitive states'}.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <Link to="/chat" className="group p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-lg font-bold text-white">Talk to Support Buddy</h4>
          <p className="text-sm text-slate-400 mt-2">Personalized AI chat powered by Gemini-style supportive logic.</p>
        </Link>
        <Link to="/coping" className="group p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-emerald-500 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20">
              <Wind className="h-6 w-6 text-emerald-400" />
            </div>
            <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="text-lg font-bold text-white">Explore Coping Tools</h4>
          <p className="text-sm text-slate-400 mt-2">Breathing exercises and grounding techniques for immediate relief.</p>
        </Link>
      </div>
    </div>
  );
};
