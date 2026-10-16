import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { withFeedback, FeedbackType } from '../../lib/feedback';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  feedbackType?: FeedbackType;
  children: React.ReactNode;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  variant = 'ghost',
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
      ? 'bg-brand-yellow text-on-brand-yellow shadow-low hover:shadow-mid'
      : variant === 'secondary'
      ? 'bg-surface-card text-text-primary border-adaptive shadow-low hover:shadow-mid'
      : 'bg-transparent text-text-primary hover:bg-surface-app';

  const pressOrLift = isKids ? 'active:scale-95 transition-transform duration-base' : 'hover:-translate-y-0.5 transition-transform duration-base';

  return (
    <button
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={disabled}
      className={`min-h-touch inline-flex items-center justify-center cursor-pointer rounded-control pad-adaptive-control focus-ring-adaptive transition-all duration-base disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${pressOrLift} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
