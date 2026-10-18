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
        <div className="bg-brand-yellow text-on-brand-yellow pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base flex flex-col items-start gap-2">
          <div className="w-10 h-10 rounded-avatar bg-surface-card flex items-center justify-center shrink-0 border border-mode">
            <Star className="w-6 h-6 text-brand-orange fill-brand-yellow" aria-hidden="true" />
          </div>
          <div className="w-full min-w-0">
            <div className="text-caption-adaptive font-bold uppercase tracking-wider break-words">
              {t('stats.stars')}
            </div>
            <div className="text-title-adaptive font-black tracking-tight" aria-label={`${stars} stars collected`}>
              {stars} ⭐
            </div>
          </div>
        </div>

        {/* Kids Streak / Badges Collector */}
        <div className="bg-brand-pink text-on-brand-pink pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base flex flex-col items-start gap-2">
          <div className="w-10 h-10 rounded-avatar bg-surface-card flex items-center justify-center shrink-0 border border-mode">
            <Flame className="w-6 h-6 text-brand-orange fill-brand-orange" aria-hidden="true" />
          </div>
          <div className="w-full min-w-0">
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
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {/* Signs Learned */}
      <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base hover:shadow-mid group">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1 group-hover:text-brand-blue transition-colors">
          <CheckCircle2 className="w-4 h-4 text-brand-green group-hover:text-brand-blue" aria-hidden="true" />
          <span>{t('stats.signsLearned')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {signsLearned}
        </div>
      </div>

      {/* Accuracy */}
      <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base hover:shadow-mid group">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1 group-hover:text-brand-blue transition-colors">
          <Award className="w-4 h-4 text-brand-blue group-hover:text-brand-blue" aria-hidden="true" />
          <span>{t('stats.accuracy')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {accuracy}%
        </div>
      </div>

      {/* Streak */}
      <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base hover:shadow-mid group">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1 group-hover:text-brand-orange transition-colors">
          <Flame className="w-4 h-4 text-brand-orange group-hover:text-brand-yellow" aria-hidden="true" />
          <span>{t('stats.streak')}</span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-title-adaptive font-bold text-text-primary tabular-nums">{streak} d</span>
          <span title={t('stats.freezeNotice')} className="max-w-full inline-flex items-start gap-1.5 text-caption-adaptive bg-surface-app px-1.5 py-1 rounded-control border-adaptive leading-tight">
            <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-blue" aria-hidden="true" />
            <span>{t('stats.freezeNotice')}</span>
          </span>
        </div>
      </div>

      {/* XP */}
      <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low transition-all duration-base hover:shadow-mid group">
        <div className="flex items-center gap-1.5 text-text-secondary text-caption-adaptive mb-1 group-hover:text-brand-blue transition-colors">
          <Zap className="w-4 h-4 text-brand-yellow group-hover:text-brand-blue" aria-hidden="true" />
          <span>{t('stats.xp')}</span>
        </div>
        <div className="text-title-adaptive font-bold text-text-primary tabular-nums">
          {xp}
        </div>
      </div>
    </div>
  );
};

