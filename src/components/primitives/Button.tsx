import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { withFeedback, FeedbackType } from '../../lib/feedback';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'success' | 'warning';
  feedbackType?: FeedbackType;
  children: React.ReactNode;
  className?: string;
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
  const { isKids, accessibility } = useAgeMode();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onClick) {
      withFeedback(onClick, feedbackType, accessibility.hapticsEnabled, accessibility.optionalSoundEffects)(e);
    }
  };

  const variantClass =
    variant === 'primary'
      ? 'bg-brand-blue text-on-brand-blue shadow-low hover:shadow-mid'
      : variant === 'accent'
      ? 'bg-brand-yellow text-on-brand-yellow font-bold shadow-low hover:shadow-mid'
      : variant === 'success'
      ? 'bg-brand-green text-on-brand-green font-bold shadow-low hover:shadow-mid'
      : variant === 'warning'
      ? 'bg-brand-orange text-on-brand-orange font-bold shadow-low hover:shadow-mid'
      : variant === 'secondary'
      ? 'bg-surface-card text-text-primary border-adaptive shadow-low hover:shadow-mid'
      : 'bg-transparent text-text-primary hover:bg-surface-app';

  const pressOrLift = isKids
    ? 'active:scale-95 transition-transform duration-base'
    : 'hover:-translate-y-0.5 transition-transform duration-base';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`min-h-touch inline-flex items-center justify-center gap-2 font-medium cursor-pointer rounded-control pad-adaptive-control focus-ring-adaptive transition-all duration-base disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${pressOrLift} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
