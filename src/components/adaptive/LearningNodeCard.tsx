import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { SignData } from '../../types';
import { withFeedback } from '../../lib/feedback';
import { StatusBadge } from '../primitives/StatusBadge';
import { Lock, ChevronRight } from 'lucide-react';

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

  const statusBadge = <StatusBadge variant={status} className="shrink-0" />;

  if (isKids) {
    return (
      <button
        onClick={handleClick}
        disabled={isLocked}
        aria-label={`${sign.gloss} - ${status}. ${isLocked ? unlockRequirement : ''}`}
        className={`w-full min-h-node text-left bg-surface-card rounded-card border-adaptive pad-adaptive-control shadow-low flex items-center gap-4 transition-all duration-base cursor-pointer focus-ring-adaptive disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {/* Large Kids Avatar Badge */}
        <div
          className={`w-14 h-14 rounded-avatar flex items-center justify-center shrink-0 border border-adaptive text-2xl ${
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
          <div className="mb-1">
            <span className="text-caption-adaptive font-bold uppercase tracking-wider text-brand-blue">
              {sign.category}
            </span>
          </div>
          <div className="text-title-adaptive font-black leading-tight text-text-primary truncate">
            {sign.gloss}
          </div>
          <div className="text-body-adaptive text-text-secondary truncate">
            {sign.english} ({sign.filipino})
          </div>
          <div className="mt-2">{statusBadge}</div>
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
      className={`w-full min-h-node text-left bg-surface-card rounded-card border-adaptive pad-adaptive-control shadow-low flex items-center gap-3 transition-all duration-base cursor-pointer focus-ring-adaptive hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <div className="flex flex-1 items-center gap-3 min-w-0">
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

        <div className="flex-1 min-w-0">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 font-bold text-body-adaptive text-text-primary">
              {sign.gloss}
            </span>
            <span className="min-w-0 truncate whitespace-nowrap text-caption-adaptive text-text-secondary">
              · {sign.english}
            </span>
          </div>
          <div className="text-caption-adaptive text-text-secondary truncate">
            {sign.description}
          </div>
          <div className="mt-1.5">{statusBadge}</div>
          {isLocked && unlockRequirement && (
            <div className="text-caption-adaptive text-brand-orange mt-0.5">
              Requires: {unlockRequirement}
            </div>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 shrink-0 text-text-secondary" aria-hidden="true" />
    </button>
  );
};
