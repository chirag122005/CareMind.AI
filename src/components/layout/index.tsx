import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, LayoutDashboard, MessageSquare, Wind, Info, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/chat', icon: MessageSquare },
    { name: 'Coping Tools', path: '/coping', icon: Wind },
    { name: 'Analyze', path: '/analyze', icon: Brain },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-indigo-600 p-1.5 transition-transform group-hover:scale-110">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MindCare AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400",
                location.pathname === item.path ? "text-indigo-400" : "text-slate-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            to="/questionnaire" 
            className="hidden sm:inline-flex rounded-full bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            Retake Assessment
          </Link>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 px-4 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">MindCare AI</h3>
          <p className="text-slate-400 text-sm max-w-md">
            An AI-powered mental health awareness platform for early detection and supportive care. 
            Not a medical diagnostic tool.
          </p>
        </div>
        
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h4 className="text-sm font-semibold text-indigo-400 mb-4 uppercase tracking-wider">Connect with Developer</h4>
          <div className="space-y-3">
            <a href="mailto:developer@example.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
              <span className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg text-xs">📧</span>
              <span>developer@example.com</span>
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
              <span className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg text-xs">💼</span>
              <span>LinkedIn / Professional Profile</span>
            </a>
            <a href="https://github.com/username" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
              <span className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg text-xs">🧑‍💻</span>
              <span>GitHub / Project Source</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} MindCare AI Project. Created for Academic Purposes.
      </div>
    </footer>
  );
};
