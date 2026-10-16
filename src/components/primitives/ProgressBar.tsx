import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label: string;
  variant?: 'brand' | 'success' | 'accent';
  className?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  variant = 'brand',
  className = '',
  showText = false,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const barColor =
    variant === 'success'
      ? 'bg-brand-green'
      : variant === 'accent'
      ? 'bg-brand-yellow'
      : 'bg-brand-blue';

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-caption-adaptive font-medium text-text-secondary">{label}</span>
        {showText && <span className="text-caption-adaptive font-bold text-text-primary">{clamped}%</span>}
      </div>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="w-full h-3 bg-surface-app rounded-pill border-adaptive overflow-hidden relative"
      >
        <div
          className={`h-full transition-all duration-base ${barColor}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

