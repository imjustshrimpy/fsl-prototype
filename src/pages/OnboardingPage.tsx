import React, { useState } from 'react';
import { Baby, Check, GraduationCap, UserRound } from 'lucide-react';
import { AgeMode, UserRole } from '../types';
import { useTranslation } from '../i18n';
import { Button } from '../components/primitives/Button';

type ChoiceId = 'child' | 'learner' | 'educator';

interface OnboardingPageProps {
  onComplete: (mode: AgeMode, role: UserRole) => void;
}

const choices: Array<{
  id: ChoiceId;
  mode: AgeMode;
  role: UserRole;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'child',
    mode: 'kids',
    role: 'learner',
    titleKey: 'onboarding.childTitle',
    descriptionKey: 'onboarding.childDescription',
    icon: <Baby className="w-6 h-6 shrink-0" aria-hidden="true" />,
  },
  {
    id: 'learner',
    mode: 'adult',
    role: 'learner',
    titleKey: 'onboarding.learnerTitle',
    descriptionKey: 'onboarding.learnerDescription',
    icon: <UserRound className="w-6 h-6 shrink-0" aria-hidden="true" />,
  },
  {
    id: 'educator',
    mode: 'adult',
    role: 'educator',
    titleKey: 'onboarding.educatorTitle',
    descriptionKey: 'onboarding.educatorDescription',
    icon: <GraduationCap className="w-6 h-6 shrink-0" aria-hidden="true" />,
  },
];

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [selectedChoice, setSelectedChoice] = useState<ChoiceId | null>(null);
  const selection = choices.find((choice) => choice.id === selectedChoice);

  return (
    <section className="mx-auto flex w-full max-w-sm flex-col gap-5 py-4">
      <div>
        <p className="text-caption-adaptive font-bold text-brand-blue">{t('onboarding.eyebrow')}</p>
        <h2 className="mt-1 text-title-adaptive font-black text-text-primary">
          {t('onboarding.title')}
        </h2>
        <p className="mt-2 text-body-adaptive text-text-secondary">
          {t('onboarding.description')}
        </p>
      </div>

      <div className="flex flex-col gap-3" role="group" aria-label={t('onboarding.title')}>
        {choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedChoice(choice.id)}
              className={`flex min-h-touch w-full items-center gap-3 rounded-card border-adaptive p-4 text-left focus-ring-adaptive ${
                isSelected
                  ? 'border-brand-blue bg-brand-blue/10 text-brand-blue'
                  : 'bg-surface-card text-text-primary'
              }`}
            >
              {choice.icon}
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-body-adaptive">{t(choice.titleKey)}</span>
                <span className="mt-1 block text-caption-adaptive text-text-secondary">
                  {t(choice.descriptionKey)}
                </span>
              </span>
              {isSelected && <Check className="w-5 h-5 shrink-0" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <Button
        className="w-full"
        disabled={!selection}
        onClick={() => selection && onComplete(selection.mode, selection.role)}
      >
        {t('onboarding.continue')}
      </Button>
    </section>
  );
};