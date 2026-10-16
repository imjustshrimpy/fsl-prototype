import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { Button } from '../primitives/Button';
import { ProgressBar } from '../primitives/ProgressBar';
import { Avatar } from '../primitives/Avatar';
import { Play, Sparkles } from 'lucide-react';

export interface AdaptiveHeroCardProps {
  onStartPractice: () => void;
  masteryPercentage?: number;
  className?: string;
}

export const AdaptiveHeroCard: React.FC<AdaptiveHeroCardProps> = ({
  onStartPractice,
  masteryPercentage = 68,
  className = '',
}) => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  if (isKids) {
    return (
      <div
        className={`bg-brand-yellow text-on-brand-yellow rounded-card border-adaptive p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm transition-all duration-base ${className}`}
      >
        <Avatar
          label="Friendly guide companion"
          emoji="🦜"
          size="lg"
          bgColor="bg-brand-pink text-on-brand-pink"
        />

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 font-black text-caption-adaptive uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-brand-orange" aria-hidden="true" />
            <span>Talinturo Kids</span>
          </div>
          <h2 className="text-title-adaptive font-extrabold leading-tight">
            {t('hero.kids.greeting')}
          </h2>
          <p className="text-body-adaptive mt-1 opacity-90">
            {t('hero.kids.prompt')}
          </p>
          <div className="mt-4">
            <Button
              variant="primary"
              onClick={onStartPractice}
              className="w-full sm:w-auto font-bold shadow-md"
            >
              <Play className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>{t('hero.kids.cta')}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-surface-card text-text-primary rounded-card border-adaptive p-5 shadow-sm transition-all duration-base ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-caption-adaptive font-bold text-brand-blue uppercase tracking-wider mb-1">
            {t('hero.adult.title')}
          </div>
          <h2 className="text-title-adaptive font-bold text-text-primary">
            {t('hero.adult.subtitle')}
          </h2>
          <div className="mt-3 max-w-md">
            <ProgressBar
              value={masteryPercentage}
              label={t('hero.adult.masteryLabel')}
              showText={true}
              variant="brand"
            />
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            onClick={onStartPractice}
            className="w-full sm:w-auto font-bold"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>{t('hero.adult.cta')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

