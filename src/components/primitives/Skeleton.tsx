import React from 'react';

export interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height = 'h-6',
  width = 'w-full',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-surface-app border-adaptive rounded-control animate-pulse ${height} ${width} ${className}`}
    />
  );
};

