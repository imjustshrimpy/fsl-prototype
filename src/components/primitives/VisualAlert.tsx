import React, { useEffect } from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { feedback } from '../../lib/feedback';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface VisualAlertProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

export const VisualAlert: React.FC<VisualAlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
}) => {
  const { accessibility } = useAgeMode();

  useEffect(() => {
    // Replace audio alert with gentle visual + haptic pulse
    if (type === 'error') {
      feedback.error(accessibility.hapticsEnabled, accessibility.optionalSoundEffects);
    } else if (type === 'success') {
      feedback.success(accessibility.hapticsEnabled, accessibility.optionalSoundEffects);
    } else {
      feedback.gentle(accessibility.hapticsEnabled, accessibility.optionalSoundEffects);
    }
  }, [type, accessibility.hapticsEnabled, accessibility.optionalSoundEffects]);

  const config = {
    success: {
      container: 'bg-success-surface text-on-success-surface border border-success',
      icon: <CheckCircle2 className="w-6 h-6 text-success shrink-0" aria-hidden="true" />,
      shapeLabel: 'Success Checkmark',
    },
    warning: {
      container: 'bg-warning-surface text-on-warning-surface border border-warning',
      icon: <AlertTriangle className="w-6 h-6 text-warning shrink-0" aria-hidden="true" />,
      shapeLabel: 'Attention Triangle',
    },
    error: {
      container: 'bg-error-surface text-on-error-surface border border-error',
      icon: <AlertCircle className="w-6 h-6 text-error shrink-0" aria-hidden="true" />,
      shapeLabel: 'Alert Shield',
    },
    info: {
      container: 'bg-info-surface text-on-info-surface border border-info',
      icon: <Info className="w-6 h-6 text-info shrink-0" aria-hidden="true" />,
      shapeLabel: 'Information Square',
    },
  }[type];

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`rounded-control p-4 flex items-start justify-between gap-3 shadow-md transition-all duration-base ${config.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        {config.icon}
        <div>
          <div className="font-bold text-body-adaptive leading-tight">{title}</div>
          {message && <div className="text-caption-adaptive mt-1 opacity-90">{message}</div>}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="p-1 rounded-control hover:opacity-80 transition cursor-pointer focus-ring-adaptive shrink-0"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

