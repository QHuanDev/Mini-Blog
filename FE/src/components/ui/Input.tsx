import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-400">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-slate-900/80 border border-slate-800 rounded-xl 
            py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-4
            text-slate-200 placeholder-slate-600
            focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;