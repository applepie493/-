import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useState } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function ResponsiveAlert({ type, title, message, dismissible = true, onDismiss }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 flex-shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 flex-shrink-0" />;
      case 'info':
        return <Info className="w-4 h-4 flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 flex-shrink-0" />;
    }
  };

  return (
    <div className={`flex items-start space-x-3 p-3 border rounded-lg ${getTypeStyles()}`}>
      {getIcon()}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium text-sm mb-1">{title}</h4>
        )}
        <p className="text-sm break-words">{message}</p>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}