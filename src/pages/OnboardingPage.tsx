import React, { useMemo, useState } from 'react';
import { ArrowLeft, Baby, Check, GraduationCap, UserRound } from 'lucide-react';
import {
  AgeMode,
  CameraPerspective,
  DailyCommitment,
  GoalFocus,
  NotificationStyle,
  OnboardingSettings,
  SensoryMode,
  StrictnessLevel,
  UserRole,
} from '../types';
import { useTranslation } from '../i18n';
import { Button } from '../components/primitives/Button';
import { DEFAULT_ONBOARDING_SETTINGS } from '../context/AgeModeContext';
import { StepperProgress } from '../components/adaptive/StepperProgress';

type ChoiceId = 'child' | 'learner' | 'educator';

interface OnboardingPageProps {
  onComplete: (mode: AgeMode, role: UserRole, settings: OnboardingSettings) => void;
}

const profileChoices: Array<{
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

const goalOptions: Array<{ value: GoalFocus; labelKey: string; detailKey: string }> = [
  { value: 'family', labelKey: 'onboarding.goal.family.label', detailKey: 'onboarding.goal.family.detail' },
  { value: 'school', labelKey: 'onboarding.goal.school.label', detailKey: 'onboarding.goal.school.detail' },
  { value: 'community', labelKey: 'onboarding.goal.community.label', detailKey: 'onboarding.goal.community.detail' },
  { value: 'workplace', labelKey: 'onboarding.goal.workplace.label', detailKey: 'onboarding.goal.workplace.detail' },
];

const commitmentOptions: Array<{ value: DailyCommitment; labelKey: string; detailKey: string }> = [
  { value: 'casual', labelKey: 'onboarding.commitment.casual.label', detailKey: 'onboarding.commitment.casual.detail' },
  { value: 'regular', labelKey: 'onboarding.commitment.regular.label', detailKey: 'onboarding.commitment.regular.detail' },
  { value: 'serious', labelKey: 'onboarding.commitment.serious.label', detailKey: 'onboarding.commitment.serious.detail' },
  { value: 'intensive', labelKey: 'onboarding.commitment.intensive.label', detailKey: 'onboarding.commitment.intensive.detail' },
];

const strictnessOptions: Array<{ value: StrictnessLevel; labelKey: string; detailKey: string }> = [
  { value: 'encouraging', labelKey: 'onboarding.strictness.encouraging.label', detailKey: 'onboarding.strictness.encouraging.detail' },
  { value: 'balanced', labelKey: 'onboarding.strictness.balanced.label', detailKey: 'onboarding.strictness.balanced.detail' },
  { value: 'strict', labelKey: 'onboarding.strictness.strict.label', detailKey: 'onboarding.strictness.strict.detail' },
];

const sensoryOptions: Array<{ value: SensoryMode; labelKey: string; detailKey: string }> = [
  { value: 'visual-audio', labelKey: 'onboarding.sensory.visualAudio.label', detailKey: 'onboarding.sensory.visualAudio.detail' },
  { value: 'visual-haptics', labelKey: 'onboarding.sensory.visualHaptics.label', detailKey: 'onboarding.sensory.visualHaptics.detail' },
  { value: 'readability', labelKey: 'onboarding.sensory.readability.label', detailKey: 'onboarding.sensory.readability.detail' },
];

const cameraOptions: Array<{ value: CameraPerspective; labelKey: string; detailKey: string }> = [
  { value: 'mirror', labelKey: 'onboarding.camera.mirror.label', detailKey: 'onboarding.camera.mirror.detail' },
  { value: 'observer', labelKey: 'onboarding.camera.observer.label', detailKey: 'onboarding.camera.observer.detail' },
  { value: 'multiview', labelKey: 'onboarding.camera.multiview.label', detailKey: 'onboarding.camera.multiview.detail' },
];

const notificationOptions: Array<{ value: NotificationStyle; labelKey: string; detailKey: string }> = [
  { value: 'morning-mascot', labelKey: 'onboarding.notifications.morningMascot.label', detailKey: 'onboarding.notifications.morningMascot.detail' },
  { value: 'afternoon-direct', labelKey: 'onboarding.notifications.afternoonDirect.label', detailKey: 'onboarding.notifications.afternoonDirect.detail' },
  { value: 'evening-direct', labelKey: 'onboarding.notifications.eveningDirect.label', detailKey: 'onboarding.notifications.eveningDirect.detail' },
  { value: 'off', labelKey: 'onboarding.notifications.off.label', detailKey: 'onboarding.notifications.off.detail' },
];

const stepMeta = [
  { key: 'identity', labelKey: 'onboarding.stepLabels.roleSelection' },
  { key: 'goal', labelKey: 'onboarding.stepLabels.focus' },
  { key: 'pace', labelKey: 'onboarding.stepLabels.commitment' },
  { key: 'strictness', labelKey: 'onboarding.stepLabels.strictness' },
  { key: 'sensory', labelKey: 'onboarding.stepLabels.sensory' },
  { key: 'complete', labelKey: 'onboarding.stepLabels.setupComplete' },
] as const;

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const [profileId, setProfileId] = useState<ChoiceId>('learner');
  const [settings, setSettings] = useState<OnboardingSettings>(DEFAULT_ONBOARDING_SETTINGS);

  const selectedProfile = useMemo(
    () => profileChoices.find((choice) => choice.id === profileId) ?? profileChoices[1],
    [profileId],
  );

  const currentKey = stepMeta[stepIndex]?.key ?? 'identity';

  const setStepValue = <T extends string>(key: keyof OnboardingSettings, value: T) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const isLastStep = stepIndex === stepMeta.length - 1;
  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, stepMeta.length - 1));
  const previousStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const renderChoiceGrid = <T extends string>(
    options: Array<{ value: T; labelKey: string; detailKey: string }>,
    currentValue: T,
    onSelect: (value: T) => void,
  ) => (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const selected = currentValue === option.value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option.value)}
            className={`w-full rounded-card border-adaptive p-4 text-left focus-ring-adaptive ${
              selected ? 'border-brand-blue bg-brand-blue/10 text-brand-blue' : 'bg-surface-card text-text-primary'
            }`}
          >
            <div className="font-bold text-body-adaptive">{t(option.labelKey)}</div>
            <div className="mt-1 text-caption-adaptive text-text-secondary">{t(option.detailKey)}</div>
          </button>
        );
      })}
    </div>
  );

  const sensorySummaryKey =
    settings.sensoryMode === 'visual-audio'
      ? 'onboarding.sensory.visualAudio.label'
      : settings.sensoryMode === 'visual-haptics'
      ? 'onboarding.sensory.visualHaptics.label'
      : 'onboarding.sensory.readability.label';

  const onFinish = () => {
    onComplete(selectedProfile.mode, selectedProfile.role, settings);
  };

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col gap-5 py-4">
      <div>
        <p className="text-caption-adaptive font-bold text-brand-blue">{t('onboarding.eyebrow')}</p>
        <h2 className="mt-1 text-title-adaptive font-black text-text-primary">{t(`onboarding.steps.${currentKey}.title`)}</h2>
        <p className="mt-2 text-body-adaptive text-text-secondary">{t(`onboarding.steps.${currentKey}.description`)}</p>
      </div>

      <StepperProgress
        steps={stepMeta.map((meta, index) => ({
          step: index + 1,
          labelKey: meta.labelKey,
        }))}
        activeStep={stepIndex + 1}
        t={t}
      />

      {currentKey === 'identity' && (
        <div className="flex flex-col gap-3" role="group" aria-label={t('onboarding.title')}>
          {profileChoices.map((choice) => {
            const isSelected = profileId === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setProfileId(choice.id)}
                className={`flex min-h-touch w-full items-center gap-3 rounded-card border-adaptive p-4 text-left focus-ring-adaptive ${
                  isSelected ? 'border-brand-blue bg-brand-blue/10 text-brand-blue' : 'bg-surface-card text-text-primary'
                }`}
              >
                {choice.icon}
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-body-adaptive">{t(choice.titleKey)}</span>
                  <span className="mt-1 block text-caption-adaptive text-text-secondary">{t(choice.descriptionKey)}</span>
                </span>
                {isSelected && <Check className="w-5 h-5 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}

      {currentKey === 'goal' && renderChoiceGrid(goalOptions, settings.goalFocus, (value) => setStepValue('goalFocus', value))}
      {currentKey === 'pace' && renderChoiceGrid(commitmentOptions, settings.dailyCommitment, (value) => setStepValue('dailyCommitment', value))}
      {currentKey === 'strictness' && renderChoiceGrid(strictnessOptions, settings.strictness, (value) => setStepValue('strictness', value))}
      {currentKey === 'sensory' && renderChoiceGrid(sensoryOptions, settings.sensoryMode, (value) => setStepValue('sensoryMode', value))}
      {currentKey === 'complete' && (
        <div className="flex flex-col gap-3">
          <div className="rounded-card border-adaptive bg-surface-card p-4">
            <div className="text-caption-adaptive font-bold uppercase text-brand-blue">{t('onboarding.summary.profile')}</div>
            <div className="mt-2 text-body-adaptive font-bold text-text-primary">{t(selectedProfile.titleKey)}</div>
          </div>

          <div className="rounded-card border-adaptive bg-surface-card p-4">
            <div className="text-caption-adaptive font-bold uppercase text-brand-blue">{t('onboarding.summary.preferences')}</div>
            <ul className="mt-3 space-y-2 text-body-adaptive text-text-secondary">
              <li><span className="font-bold text-text-primary">{t('onboarding.summary.goal')}:</span> {t(`onboarding.goal.${settings.goalFocus}.label`)}</li>
              <li><span className="font-bold text-text-primary">{t('onboarding.summary.commitment')}:</span> {t(`onboarding.commitment.${settings.dailyCommitment}.label`)}</li>
              <li><span className="font-bold text-text-primary">{t('onboarding.summary.strictness')}:</span> {t(`onboarding.strictness.${settings.strictness}.label`)}</li>
              <li><span className="font-bold text-text-primary">{t('onboarding.summary.sensory')}:</span> {t(sensorySummaryKey)}</li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="button" variant="secondary" onClick={previousStep} disabled={stepIndex === 0} className="flex-1">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t('onboarding.back')}</span>
        </Button>

        {isLastStep ? (
          <Button type="button" onClick={onFinish} className="flex-1">
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>{t('onboarding.finish')}</span>
          </Button>
        ) : (
          <Button type="button" onClick={nextStep} className="flex-1">
            <span>{t('onboarding.continue')}</span>
          </Button>
        )}
      </div>
    </section>
  );
};
