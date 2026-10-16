import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { SignData } from '../types';
import { SignClip } from '../components/adaptive/SignClip';
import { SignPracticeCamera } from '../components/adaptive/SignPracticeCamera';
import { Button } from '../components/primitives/Button';
import { Card } from '../components/primitives/Card';
import { ArrowLeft, Camera, CheckCircle2, Award, Sparkles } from 'lucide-react';

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

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.22, ease: 'easeOut' },
  };

  return (
    <div className="pb-24 max-w-xl mx-auto">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between mb-2"
      >
        <Button variant="ghost" onClick={onBack} aria-label="Back to lessons">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('nav.adult.home')}</span>
        </Button>

        <div className="text-caption-adaptive font-bold px-3 py-1.5 rounded-pill bg-brand-blue/10 text-brand-blue border-adaptive">
          {sign.gloss} · {sign.category.toUpperCase()}
        </div>
      </motion.div>

      <motion.div
        key={step}
        variants={fadeIn}
        className="space-y-4"
      >
        {/* Step 1: Watch Sign Demonstration */}
        {step === 'watch' && (
          <div className="space-y-4">
            <Card elevation="mid" className="overflow-hidden">
              <div>
                <h2 className="text-title-adaptive font-extrabold text-text-primary mb-1">
                  {sign.gloss}
                </h2>
                <p className="text-body-adaptive text-text-secondary">
                  {sign.english} ({sign.filipino})
                </p>
              </div>
              <SignClip clipId={sign.id} autoPlayLoop={true} showCaptions={true} />
            </Card>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => setStep('practice')}
                className="w-full text-body-adaptive font-extrabold shadow-mid"
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
            <Card elevation="low">
              <div className="border-b border-adaptive flex items-center justify-between">
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
            </Card>
          </div>
        )}

        {/* Step 3: Visual Celebration Reward */}
        {step === 'reward' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 17 }}
            className="bg-surface-card rounded-card border-adaptive p-8 text-center shadow-high space-y-6"
          >
            <div className="flex justify-center">
              <div
                className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center text-5xl shadow-inner border border-adaptive ${isKids ? 'bg-brand-yellow text-on-brand-yellow' : 'bg-brand-blue text-on-brand-blue'}`}
              >
                {isKids ? '🌟' : <Award className="w-14 h-14" />}
              </div>
            </div>
            <div className="flex justify-center space-y-1 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Sparkles
                  key={i}
                  className={`w-6 h-6 text-brand-yellow animate-bounce inline-block ${isKids ? 'text-brand-orange' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  aria-hidden="true"
                />
              ))}
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

            <div className="pt-3 flex flex-col gap-2">
              <Button
                variant="primary"
                onClick={onCompleteLesson}
                className="w-full font-bold shadow-mid"
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
