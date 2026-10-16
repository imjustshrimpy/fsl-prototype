import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { Star, Award, Flame, Zap, CheckCircle2, Shield } from 'lucide-react';

export interface StatGridProps {
  signsLearned?: number;
  accuracy?: number;
  streak?: number;
  xp?: number;
  stars?: number;
  className?: string;
}

export const StatGrid: React.FC<StatGridProps> = ({
  signsLearned = 8,
  accuracy = 89,
  streak = 6,
  xp = 1240,
  stars = 24,
  className = '',
}) => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  if (isKids) {
    return (
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {/* Kids Stars Collector */}
        <div className="bg-brand-yellow text-on-brand-yellow p-4 rounded-card border-adaptive shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-avatar bg-surface-card flex items-center justify-center shrink-0 border border-mode">
            <Star className="w-7 h-7 text-brand-orange fill-brand-yellow" aria-hidden="true" />
          </div>
          <div>
            <div className="text-caption-adaptive font-bold uppercase tracking-wider">
              {t('stats.stars')}
            </div>
            <div className="text-title-adaptive font-black tracking-tight" aria-label={`${stars} stars collected`}>
              {stars} ⭐
            </div>
          </div>
        </div>

        {/* Kids Streak / Badges Collector */}
        <div className="bg-brand-pink text-on-brand-pink p-4 rounded-card border-adaptive shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-avatar bg-surface-card flex items-center justify-center shrink-0 border border-mode">
            <Flame className="w-7 h-7 text-brand-orange fill-brand-orange" aria-hidden="true" />
          </div>
          <div>
            <div className="text-caption-adaptive font-bold uppercase tracking-wider">
              {t('stats.streak')}
            </div>
            <div className="text-title-adaptive font-black tracking-tight" aria-label={`${streak} day streak`}>
              {streak} Days 🔥
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      {/* Signs Learned */}
      <div className="bg-surface-card p-4 rounded-card border-adaptive shadow-sm">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1">
          <CheckCircle2 className="w-4 h-4 text-brand-green" aria-hidden="true" />
          <span>{t('stats.signsLearned')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {signsLearned}
        </div>
      </div>

      {/* Accuracy */}
      <div className="bg-surface-card p-4 rounded-card border-adaptive shadow-sm">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1">
          <Award className="w-4 h-4 text-brand-blue" aria-hidden="true" />
          <span>{t('stats.accuracy')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {accuracy}%
        </div>
      </div>

      {/* Streak */}
      <div className="bg-surface-card p-4 rounded-card border-adaptive shadow-sm">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1">
          <Flame className="w-4 h-4 text-brand-orange" aria-hidden="true" />
          <span>{t('stats.streak')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-title-adaptive font-bold text-text-primary tabular-nums">{streak} d</span>
          <span title={t('stats.freezeNotice')} className="text-caption-adaptive bg-surface-app p-1 rounded-pill border-adaptive">
            <Shield className="w-3.5 h-3.5 text-brand-blue" aria-label={t('stats.freezeNotice')} />
          </span>
        </div>
      </div>

      {/* XP */}
      <div className="bg-surface-card p-4 rounded-card border-adaptive shadow-sm">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1">
          <Zap className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
          <span>{t('stats.xp')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {xp}
        </div>
      </div>
    </div>
  );
};

