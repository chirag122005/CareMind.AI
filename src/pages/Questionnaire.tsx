import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { MENTAL_HEALTH_QUESTIONS } from '@/constants/questions';
import { getQuestionnaireScore } from '@/lib/mockAI';
import { cn } from '@/utils/cn';

export const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(MENTAL_HEALTH_QUESTIONS.length).fill(''));
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
    
    // Auto advance if not last step
    if (currentStep < MENTAL_HEALTH_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleFinish = () => {
    const result = getQuestionnaireScore(answers);
    localStorage.setItem('assessment_result', JSON.stringify(result));
    localStorage.setItem('assessment_completed', 'true');
    navigate('/dashboard');
  };

  const progress = ((currentStep + 1) / MENTAL_HEALTH_QUESTIONS.length) * 100;
  const currentQ = MENTAL_HEALTH_QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Question {currentStep + 1} of {MENTAL_HEALTH_QUESTIONS.length}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-4 uppercase tracking-wider">
              {currentQ.category}
            </span>
            <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                    answers[currentStep] === option.value
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                  )}
                >
                  <span>{option.label}</span>
                  {answers[currentStep] === option.value && (
                    <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white disabled:opacity-0 transition-all"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              
              {currentStep === MENTAL_HEALTH_QUESTIONS.length - 1 ? (
                <button
                  disabled={!answers[currentStep]}
                  onClick={handleFinish}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all flex items-center gap-2"
                >
                  View My Results <CheckCircle2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  disabled={!answers[currentStep]}
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="text-slate-400 hover:text-white flex items-center gap-2 font-medium disabled:opacity-30"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-slate-500 text-sm mt-8">
          All your responses are analyzed locally for your privacy.
        </p>
      </div>
    </div>
  );
};
