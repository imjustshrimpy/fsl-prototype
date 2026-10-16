import React, { useState } from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { SignData } from '../types';
import { SignClip } from '../components/adaptive/SignClip';
import { SignPracticeCamera } from '../components/adaptive/SignPracticeCamera';
import { Button } from '../components/primitives/Button';
import { ArrowLeft, Camera, CheckCircle2, Award } from 'lucide-react';

export interface LessonPageProps {
  sign: SignData;
  onBack: () => void;
  onCompleteLesson: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  sign,
  onBack,
  onCompleteLesson,
}) => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  const [step, setStep] = useState<'watch' | 'practice' | 'reward'>('watch');

  const handlePracticeSuccess = () => {
    setStep('reward');
  };

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} aria-label="Back to lessons">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('nav.adult.home')}</span>
        </Button>

        <div className="text-caption-adaptive font-bold px-3 py-1 rounded-pill bg-brand-blue/10 text-brand-blue border-adaptive">
          {sign.gloss} · {sign.category.toUpperCase()}
        </div>
      </div>

      {/* Step 1: Watch Sign Demonstration */}
      {step === 'watch' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-4 rounded-card border-adaptive">
            <h2 className="text-title-adaptive font-extrabold text-text-primary mb-1">
              {sign.gloss}
            </h2>
            <p className="text-body-adaptive text-text-secondary">
              {sign.english} ({sign.filipino})
            </p>
          </div>

          <SignClip clipId={sign.id} autoPlayLoop={true} showCaptions={true} />

          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => setStep('practice')}
              className="w-full py-4 text-body-adaptive font-extrabold shadow-md"
            >
              <Camera className="w-5 h-5" />
              <span>Your Turn: Practice Sign</span>
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Camera Practice & Feedback */}
      {step === 'practice' && (
        <div className="space-y-4">
          <div className="bg-surface-card p-3 rounded-card border-adaptive flex items-center justify-between">
            <div>
              <span className="text-caption-adaptive text-text-secondary">Target sign:</span>
              <span className="font-bold text-body-adaptive ml-2">{sign.gloss}</span>
            </div>
            <button
              onClick={() => setStep('watch')}
              className="text-caption-adaptive font-bold text-brand-blue hover:underline cursor-pointer"
            >
              Watch Guide Again
            </button>
          </div>

          <SignPracticeCamera
            targetSign={sign}
            onSuccess={handlePracticeSuccess}
            onSkip={handlePracticeSuccess}
          />
        </div>
      )}

      {/* Step 3: Visual Celebration Reward */}
      {step === 'reward' && (
        <div className="bg-surface-card rounded-card border-adaptive p-8 text-center shadow-lg space-y-6">
          <div
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-md border-adaptive ${
              isKids ? 'bg-brand-yellow text-on-brand-yellow' : 'bg-brand-blue text-on-brand-blue'
            }`}
          >
            {isKids ? '🌟' : <Award className="w-12 h-12" />}
          </div>

          <div>
            <h2 className="text-title-adaptive font-black text-text-primary">
              {isKids ? 'Salamat sa Magandang Senyas!' : 'Sign Mastered!'}
            </h2>
            <p className="text-body-adaptive text-text-secondary mt-1">
              {isKids
                ? 'Nakakuha ka ng 3 Bituin para sa iyong pagsasanay!'
                : `You earned +40 XP and reinforced your ${sign.gloss} signing proficiency.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-caption-adaptive font-bold">
            <div className="p-3 bg-surface-app rounded-control border-adaptive">
              <span className="text-brand-orange">⭐ +3 Stars</span>
            </div>
            <div className="p-3 bg-surface-app rounded-control border-adaptive">
              <span className="text-brand-blue">⚡ +40 XP</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={onCompleteLesson}
              className="w-full py-3.5 font-bold"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Complete Lesson</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setStep('watch')}
              className="w-full"
            >
              Practice Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

