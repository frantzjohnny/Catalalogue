import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// --- Card ---
export const GlassCard = ({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:bg-white/80 relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 border-0",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    outline: "bg-transparent text-gray-700 border border-gray-300 hover:border-violet-500 hover:text-violet-600",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100/50",
    success: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  );
};

// --- Badge ---
export const Badge = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info', className?: string }) => {
  const variants = {
    primary: "bg-violet-100/80 text-violet-700 border-violet-200 backdrop-blur-sm",
    success: "bg-emerald-100/80 text-emerald-700 border-emerald-200 backdrop-blur-sm",
    danger: "bg-red-100/80 text-red-700 border-red-200 backdrop-blur-sm",
    warning: "bg-amber-100/80 text-amber-700 border-amber-200 backdrop-blur-sm",
    info: "bg-blue-100/80 text-blue-700 border-blue-200 backdrop-blur-sm"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">{label}</label>}
    <div className="relative group">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-violet-500 transition-colors">
          {icon}
        </div>
      )}
      <input
        className={`block w-full rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all duration-200 text-sm py-2.5 ${icon ? 'pl-10' : 'pl-4'} ${className}`}
        {...props}
      />
    </div>
  </div>
);

// --- Modal ---
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  title: string, 
  children: React.ReactNode,
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' 
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[95vw] h-[95vh]'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose} />
      <div className={`relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 border border-white/50`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100/50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Toast Notification ---
export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const borders = {
    success: 'border-l-4 border-l-emerald-500',
    error: 'border-l-4 border-l-red-500',
    warning: 'border-l-4 border-l-amber-500',
    info: 'border-l-4 border-l-blue-500'
  };

  return (
    <div className={`flex items-center gap-3 bg-white shadow-lg rounded-lg p-4 min-w-[300px] animate-in slide-in-from-right duration-300 ${borders[type]}`}>
      {icons[type]}
      <p className="text-sm font-medium text-gray-800">{message}</p>
    </div>
  );
};

export const ToastContainer = ({ toasts }: { toasts: { id: number, type: ToastType, message: string }[] }) => (
  <div className="fixed bottom-4 right-4 z-[110] flex flex-col gap-2">
    {toasts.map(t => (
      <div key={t.id}>{/* Rendered by parent mostly, but structure here ensures stacking */}</div>
    ))}
  </div>
);
