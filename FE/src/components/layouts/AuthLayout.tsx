import React from 'react';
import Background from '../Background';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative p-4">
      <Background />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          
          <h1 className="text-4xl font-bold text-slate-200 mb-2">{title}</h1>
          <p className="text-slate-400 text-lg">{subtitle}</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5">
          {children}
        </div>

        
      </div>
    </div>
  );
};

export default AuthLayout;