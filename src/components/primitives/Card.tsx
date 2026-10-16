import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: 'none' | 'low' | 'mid' | 'high';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'low',
  className = '',
  ...rest
}) => {
  const shadowClass = elevation === 'none' ? '' : elevation === 'low' ? 'shadow-low' : elevation === 'mid' ? 'shadow-mid' : 'shadow-high';

  return (
    <div
      className={`bg-surface-card text-text-primary rounded-card border-adaptive pad-adaptive-control transition-all duration-base ${shadowClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
