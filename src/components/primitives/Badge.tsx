import React from 'react';

export interface BadgeProps {
  variant?: 'brand' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  icon,
  children,
  className = '',
}) => {
  const variantClass =
    variant === 'brand'
      ? 'bg-brand-blue text-on-brand-blue'
      : variant === 'success'
      ? 'bg-success-surface text-on-success-surface border border-success'
      : variant === 'warning'
      ? 'bg-warning-surface text-on-warning-surface border border-warning'
      : variant === 'error'
      ? 'bg-error-surface text-on-error-surface border border-error'
      : variant === 'info'
      ? 'bg-info-surface text-on-info-surface border border-info'
      : 'bg-surface-app text-text-primary border-adaptive';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-caption-adaptive font-medium ${variantClass} ${className}`}
    >
      {icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

