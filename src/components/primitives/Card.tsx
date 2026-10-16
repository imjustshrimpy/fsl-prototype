import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={`bg-surface-card text-text-primary rounded-card border-adaptive p-4 transition-all duration-base ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

