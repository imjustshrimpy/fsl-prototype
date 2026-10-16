import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { withFeedback, FeedbackType } from '../../lib/feedback';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  feedbackType?: FeedbackType;
  children: React.ReactNode;
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
      ? 'bg-brand-yellow text-on-brand-yellow'
      : variant === 'secondary'
      ? 'bg-surface-card text-text-primary border-adaptive'
      : 'bg-transparent text-text-primary hover:bg-surface-app';

  return (
    <button
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={disabled}
      className={`min-h-touch inline-flex items-center justify-center cursor-pointer transition-all duration-base rounded-control pad-adaptive-control focus-ring-adaptive disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

