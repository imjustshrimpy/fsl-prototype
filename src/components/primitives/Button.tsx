import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { withFeedback, FeedbackType } from '../../lib/feedback';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'success' | 'warning';
  feedbackType?: FeedbackType;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  feedbackType = 'click',
  onClick,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  const { accessibility } = useAgeMode();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) {
      withFeedback(onClick, feedbackType, accessibility.hapticsEnabled, accessibility.optionalSoundEffects)(e);
    }
  };

  const variantClass =
    variant === 'primary'
      ? 'bg-brand-blue text-on-brand-blue'
      : variant === 'accent'
      ? 'bg-brand-yellow text-on-brand-yellow font-bold'
      : variant === 'success'
      ? 'bg-brand-green text-on-brand-green font-bold'
      : variant === 'warning'
      ? 'bg-brand-orange text-on-brand-orange font-bold'
      : variant === 'secondary'
      ? 'bg-surface-card text-text-primary border-adaptive'
      : 'bg-transparent text-text-primary hover:bg-surface-app';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`min-h-touch inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-all duration-base rounded-control pad-adaptive-control focus-ring-adaptive disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

