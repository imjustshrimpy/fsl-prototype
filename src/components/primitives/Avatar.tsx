import React from 'react';

export interface AvatarProps {
  label: string;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  bgColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  label,
  emoji = '👋',
  size = 'md',
  className = '',
  bgColor = 'bg-brand-yellow',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'w-10 h-10 text-lg'
      : size === 'lg'
      ? 'w-16 h-16 text-3xl'
      : 'w-12 h-12 text-xl';

  return (
    <div
      role="img"
      aria-label={label}
      className={`rounded-avatar flex items-center justify-center shrink-0 border-adaptive shadow-sm transition-all duration-base ${bgColor} ${sizeClass} ${className}`}
    >
      <span aria-hidden="true">{emoji}</span>
    </div>
  );
};

