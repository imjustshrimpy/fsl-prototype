import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { SignData } from '../../types';
import { withFeedback } from '../../lib/feedback';
import {
  CheckCircle2,
  Lock,
  ChevronRight,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export type NodeStatus = 'completed' | 'in-progress' | 'locked' | 'needs-review' | 'default';

export interface LearningNodeCardProps {
  sign: SignData;
  status: NodeStatus;
  unlockRequirement?: string;
  onClick: (sign: SignData) => void;
  className?: string;
}

export const LearningNodeCard: React.FC<LearningNodeCardProps> = ({
  sign,
  status,
  unlockRequirement,
  onClick,
  className = '',
}) => {
  const { isKids, accessibility } = useAgeMode();
  const { t } = useTranslation();

  const isLocked = status === 'locked';

  const handleClick = () => {
    if (isLocked) {
      withFeedback(() => {}, 'error', accessibility.hapticsEnabled, accessibility.optionalSoundEffects)();
      return;
    }
    withFeedback(() => onClick(sign), 'click', accessibility.hapticsEnabled, accessibility.optionalSoundEffects)();
  };

  const statusBadge = {
    completed: (
      <span className="inline-flex items-center gap-1 text-caption-adaptive bg-success-surface text-on-success-surface px-2.5 py-0.5 rounded-pill font-bold border border-success">
        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('common.completed')}</span>
      </span>
    ),
    'in-progress': (
      <span className="inline-flex items-center gap-1 text-caption-adaptive bg-info-surface text-on-info-surface px-2.5 py-0.5 rounded-pill font-bold border border-info">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('common.inProgress')}</span>
      </span>
    ),
    locked: (
      <span className="inline-flex items-center gap-1 text-caption-adaptive bg-surface-app text-text-secondary px-2.5 py-0.5 rounded-pill font-bold border-adaptive">
        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('common.locked')}</span>
      </span>
    ),
    'needs-review': (
      <span className="inline-flex items-center gap-1 text-caption-adaptive bg-warning-surface text-on-warning-surface px-2.5 py-0.5 rounded-pill font-bold border border-warning">
        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('common.needsReview')}</span>
      </span>
    ),
    default: (
      <span className="inline-flex items-center gap-1 text-caption-adaptive bg-surface-app text-text-secondary px-2.5 py-0.5 rounded-pill font-bold border-adaptive">
        <Sparkles className="w-3.5 h-3.5 text-brand-blue" aria-hidden="true" />
        <span>Ready</span>
      </span>
    ),
  }[status];

  if (isKids) {
    return (
      <button
        onClick={handleClick}
        disabled={isLocked}
        aria-label={`${sign.gloss} - ${status}. ${isLocked ? unlockRequirement : ''}`}
        className={`w-full min-h-node text-left bg-surface-card rounded-card border-adaptive p-4 shadow-sm flex items-center gap-4 transition-all duration-base cursor-pointer focus-ring-adaptive disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {/* Large Kids Avatar Badge */}
        <div
          className={`w-14 h-14 rounded-avatar flex items-center justify-center shrink-0 border border-mode text-2xl ${
            isLocked
              ? 'bg-surface-app text-text-secondary'
              : status === 'completed'
              ? 'bg-brand-green text-on-brand-green'
              : 'bg-brand-yellow text-on-brand-yellow font-bold'
          }`}
          aria-hidden="true"
        >
          {isLocked ? '🔒' : status === 'completed' ? '⭐' : '🤟'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-caption-adaptive font-bold uppercase tracking-wider text-brand-blue">
              {sign.category}
            </span>
            {statusBadge}
          </div>
          <div className="text-title-adaptive font-black text-text-primary truncate">
            {sign.gloss}
          </div>
          <div className="text-body-adaptive text-text-secondary truncate">
            {sign.english} ({sign.filipino})
          </div>
          {isLocked && unlockRequirement && (
            <div className="text-caption-adaptive text-brand-orange font-bold mt-1">
              {unlockRequirement}
            </div>
          )}
        </div>

        <ChevronRight className="w-6 h-6 text-text-secondary shrink-0" aria-hidden="true" />
      </button>
    );
  }

  // Adult Mode: Streamlined list row
  return (
    <button
      onClick={handleClick}
      disabled={isLocked}
      aria-label={`${sign.gloss} - ${status}. ${isLocked ? unlockRequirement : ''}`}
      className={`w-full min-h-node text-left bg-surface-card rounded-card border-adaptive px-4 py-3 shadow-sm flex items-center justify-between gap-4 transition-all duration-base cursor-pointer focus-ring-adaptive hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-control flex items-center justify-center shrink-0 border-adaptive text-sm font-bold ${
            status === 'completed'
              ? 'bg-success-surface text-on-success-surface'
              : isLocked
              ? 'bg-surface-app text-text-secondary'
              : 'bg-brand-blue text-on-brand-blue'
          }`}
          aria-hidden="true"
        >
          {isLocked ? <Lock className="w-4 h-4" /> : sign.gloss.substring(0, 2)}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-body-adaptive text-text-primary truncate">
              {sign.gloss}
            </span>
            <span className="text-caption-adaptive text-text-secondary">
              · {sign.english}
            </span>
          </div>
          <div className="text-caption-adaptive text-text-secondary truncate">
            {sign.description}
          </div>
          {isLocked && unlockRequirement && (
            <div className="text-caption-adaptive text-brand-orange mt-0.5">
              Requires: {unlockRequirement}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {statusBadge}
        <ChevronRight className="w-5 h-5 text-text-secondary" aria-hidden="true" />
      </div>
    </button>
  );
};
