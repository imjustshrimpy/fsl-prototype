import React, { useState } from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { SIGN_MANIFEST } from '../data/sign-manifest';
import { SignData } from '../types';
import { computeAdaptiveRecommendation } from '../lib/adaptive';
import { AdaptiveHeroCard } from '../components/adaptive/AdaptiveHeroCard';
import { StatGrid } from '../components/adaptive/StatGrid';
import { LearningNodeCard, NodeStatus } from '../components/adaptive/LearningNodeCard';
import { Sparkles, History, Compass } from 'lucide-react';

export interface HomePageProps {
  onSelectSign: (sign: SignData) => void;
  onOpenScenarios: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectSign, onOpenScenarios }) => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  // Mock learner history records for adaptive engine
  const [records] = useState<Record<string, any>>({
    kumusta: {
      signId: 'kumusta',
      attempts: 8,
      correct: 7,
      accuracy: 0.88,
      lastPracticed: Date.now() - 1000 * 3600 * 12,
      parameterScores: { handshape: 0.9, palmOrientation: 0.72 },
    },
    salamat: {
      signId: 'salamat',
      attempts: 6,
      correct: 6,
      accuracy: 1.0,
      lastPracticed: Date.now() - 1000 * 3600 * 24,
      parameterScores: { handshape: 0.95, movement: 0.92 },
    },
    tulong: {
      signId: 'tulong',
      attempts: 5,
      correct: 3,
      accuracy: 0.6,
      lastPracticed: Date.now() - 1000 * 3600 * 48,
      parameterScores: { palmOrientation: 0.58, handshape: 0.7 },
    },
  });

  const recommendation = computeAdaptiveRecommendation({
    allSigns: SIGN_MANIFEST,
    records,
  });

  const getSignStatus = (signId: string, index: number): NodeStatus => {
    if (signId === 'tulong') return 'needs-review';
    if (signId === 'salamat' || signId === 'kumusta') return 'completed';
    if (index === 2) return 'in-progress';
    if (index > 4) return 'locked';
    return 'default';
  };

  const recommendedSign = SIGN_MANIFEST.find((s: SignData) => s.id === recommendation.nextLessonSignId) || SIGN_MANIFEST[0];

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Adaptive Hero Card */}
      <AdaptiveHeroCard
        onStartPractice={() => onSelectSign(recommendedSign)}
        masteryPercentage={74}
      />

      {/* 2. Stat Grid */}
      <StatGrid
        signsLearned={6}
        accuracy={88}
        streak={6}
        xp={1240}
        stars={18}
      />

      {/* 3. Review Shelf (Fed by Adaptive Engine) */}
      {recommendation.weakAreas.length > 0 && (
        <section aria-labelledby="review-shelf-heading" className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-brand-orange" aria-hidden="true" />
            <h3 id="review-shelf-heading" className="text-subtitle-adaptive font-bold text-text-primary">
              {t('shelf.reviewShelf')}
            </h3>
          </div>

          <div className="bg-warning-surface text-on-warning-surface p-3.5 rounded-card border border-warning text-caption-adaptive">
            <span className="font-bold">Spaced Repetition: </span>
            <span>{recommendation.weakAreas[0].reason}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {recommendation.weakAreas.map((wa: { signId: string; parameter: string; reason: string }) => {
              const sign = SIGN_MANIFEST.find((s: SignData) => s.id === wa.signId);
              if (!sign) return null;
              return (
                <LearningNodeCard
                  key={`review-${sign.id}`}
                  sign={sign}
                  status="needs-review"
                  onClick={onSelectSign}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Today's Lesson Shelf */}
      <section aria-labelledby="lessons-shelf-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-blue" aria-hidden="true" />
            <h3 id="lessons-shelf-heading" className="text-subtitle-adaptive font-bold text-text-primary">
              {t('shelf.todayLessons')}
            </h3>
          </div>

          <button
            onClick={onOpenScenarios}
            className="text-caption-adaptive font-bold text-brand-blue flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Explore Scenarios</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {SIGN_MANIFEST.map((sign: SignData, idx: number) => (
            <LearningNodeCard
              key={sign.id}
              sign={sign}
              status={getSignStatus(sign.id, idx)}
              unlockRequirement={idx > 4 ? 'Complete previous 4 signs' : undefined}
              onClick={onSelectSign}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
