import React from 'react';
import { useTranslation } from '../../i18n';
import { CheckCircle2, Clock, Lock, RefreshCw, Sparkles } from 'lucide-react';

type StatusBadgeVariant = 'completed' | 'in-progress' | 'locked' | 'needs-review' | 'default';

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  className?: string;
}

const variantConfig: Record<StatusBadgeVariant, { icon: React.ReactNode; labelKey: string; container: string }> = {
  completed: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
    labelKey: 'common.completed',
    container: 'bg-success-surface text-on-success-surface border border-success',
  },
  'in-progress': {
    icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
    labelKey: 'common.inProgress',
    container: 'bg-info-surface text-on-info-surface border border-info',
  },
  locked: {
    icon: <Lock className="w-3.5 h-3.5" aria-hidden="true" />,
    labelKey: 'common.locked',
    container: 'bg-surface-app text-text-secondary border-adaptive',
  },
  'needs-review': {
    icon: <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />,
    labelKey: 'common.needsReview',
    container: 'bg-warning-surface text-on-warning-surface border border-warning',
  },
  default: {
    icon: <Sparkles className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" />,
    labelKey: 'common.completed',
    container: 'bg-surface-app text-text-secondary border-adaptive',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  className = '',
}) => {
  const { t } = useTranslation();
  const cfg = variantConfig[variant];
  const label = variant === 'default' ? 'Ready' : t(cfg.labelKey);

  return (
    <span
      className={`inline-flex items-center gap-1 text-caption-adaptive px-2.5 py-0.5 rounded-pill font-bold ${cfg.container} ${className}`}
    >
      {cfg.icon}
      <span>{label}</span>
    </span>
  );
};
