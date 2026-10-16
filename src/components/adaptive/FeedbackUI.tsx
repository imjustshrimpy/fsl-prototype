import React from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { SignData, SignAssessment } from '../../types';
import { Button } from '../primitives/Button';
import { CheckCircle2, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';

export interface FeedbackUIProps {
  targetSign: SignData;
  assessment: SignAssessment;
  onTryAgain: () => void;
  onNext: () => void;
  onSkip?: () => void;
  className?: string;
}

export const FeedbackUI: React.FC<FeedbackUIProps> = ({
  targetSign,
  assessment,
  onTryAgain,
  onNext,
  onSkip,
  className = '',
}) => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  const isRecognized = assessment.recognized;
  const isHighConfidence = assessment.confidence >= 0.75;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Primary Visual Banner (Non-judgmental tone, never 'Wrong' or 'Failed') */}
      <div
        className={`p-4 rounded-control border-adaptive flex items-start gap-3 shadow-sm ${
          isRecognized
            ? 'bg-success-surface text-on-success-surface border-success'
            : 'bg-warning-surface text-on-warning-surface border-warning'
        }`}
      >
        {isRecognized ? (
          <CheckCircle2 className="w-6 h-6 text-success shrink-0" aria-hidden="true" />
        ) : (
          <Sparkles className="w-6 h-6 text-brand-orange shrink-0" aria-hidden="true" />
        )}
        <div>
          <div className="font-bold text-body-adaptive">
            {isRecognized
              ? t('feedback.recognized')
              : isHighConfidence
              ? t('feedback.almost')
              : t('feedback.tryAgain')}
          </div>
          <div className="text-caption-adaptive mt-1 opacity-90">
            Sign: <span className="font-bold">{targetSign.gloss}</span> · Confidence: {Math.round(assessment.confidence * 100)}%
          </div>
        </div>
      </div>

      {/* Side-by-side comparison (Guide vs Learner) */}
      <div className="bg-surface-app p-3 rounded-control border-adaptive">
        <div className="font-bold text-caption-adaptive text-text-secondary uppercase tracking-wider mb-2">
          {t('feedback.compareTitle')}
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-caption-adaptive">
          <div className="bg-surface-card p-3 rounded-control border-adaptive flex flex-col items-center justify-center">
            <span className="font-bold text-brand-blue mb-1">Standard Guide</span>
            <span className="text-2xl">👋</span>
            <span className="text-text-secondary mt-1">{targetSign.parameters.palmOrientation}</span>
          </div>
          <div className="bg-surface-card p-3 rounded-control border-adaptive flex flex-col items-center justify-center">
            <span className="font-bold text-text-primary mb-1">Your Position</span>
            <span className="text-2xl">✋</span>
            <span className="text-text-secondary mt-1">
              {assessment.parameters.palmOrientation.hint || 'Matched orientation'}
            </span>
          </div>
        </div>
      </div>

      {/* Parameter Breakdown Checklist */}
      <div className="bg-surface-card p-3 rounded-control border-adaptive">
        <div className="font-bold text-caption-adaptive text-text-secondary uppercase tracking-wider mb-2">
          {t('player.parametersTitle')}
        </div>
        <div className="space-y-2">
          {(
            [
              ['handshape', t('player.handshape')],
              ['movement', t('player.movement')],
              ['location', t('player.location')],
              ['palmOrientation', t('player.palmOrientation')],
              ['nonManual', t('player.nonManual')],
            ] as const
          ).map(([key, label]) => {
            const param = assessment.parameters[key];
            const isGood = param && param.score >= 0.8;
            return (
              <div
                key={key}
                className="flex items-start justify-between gap-2 p-2 rounded-control bg-surface-app text-caption-adaptive"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-micro font-bold ${
                      isGood
                        ? 'bg-brand-green text-on-brand-green'
                        : 'bg-brand-yellow text-on-brand-yellow'
                    }`}
                  >
                    {isGood ? '✓' : '•'}
                  </span>
                  <span className="font-medium text-text-primary">{label}</span>
                </div>
                {param?.hint && (
                  <span className="text-text-secondary text-right italic font-normal">
                    {param.hint}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Actions: Try Again is always primary when not recognized; Next when recognized */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
        {isRecognized ? (
          <Button variant="primary" onClick={onNext} className="w-full sm:flex-1 font-bold">
            <span>{t('feedback.nextBtn')}</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="primary" onClick={onTryAgain} className="w-full sm:flex-1 font-bold">
            <RefreshCw className="w-4 h-4" />
            <span>{t('feedback.tryAgainBtn')}</span>
          </Button>
        )}

        {!isRecognized && (
          <Button variant="secondary" onClick={onNext} className="w-full sm:w-auto">
            <span>{t('feedback.nextBtn')}</span>
          </Button>
        )}

        {onSkip && (
          <Button variant="ghost" onClick={onSkip} className="w-full sm:w-auto text-text-secondary">
            <span>{t('feedback.skipBtn')}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
