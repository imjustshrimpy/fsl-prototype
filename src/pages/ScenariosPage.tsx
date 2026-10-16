import React, { useState } from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { MOCK_SCENARIOS } from '../data/mock-data';
import { getSignById } from '../data/sign-manifest';
import { Scenario, ScenarioStep } from '../types';
import { SignPracticeCamera } from '../components/adaptive/SignPracticeCamera';
import { Button } from '../components/primitives/Button';
import { Card } from '../components/primitives/Card';
import { Badge } from '../components/primitives/Badge';
import {
  Compass,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Home,
  GraduationCap,
  Users,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ScenariosPage: React.FC = () => {
  const { isKids } = useAgeMode();
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isScenarioFinished, setIsScenarioFinished] = useState<boolean>(false);

  const filteredScenarios =
    activeCategory === 'all'
      ? MOCK_SCENARIOS
      : MOCK_SCENARIOS.filter((s: Scenario) => s.category === activeCategory);

  const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    household: <Home className="w-4 h-4" aria-hidden="true" />,
    school: <GraduationCap className="w-4 h-4" aria-hidden="true" />,
    public: <Users className="w-4 h-4" aria-hidden="true" />,
    emergency: <ShieldAlert className="w-4 h-4 text-brand-orange" aria-hidden="true" />,
  };

  const getCategoryIcon = (cat: string) => CATEGORY_ICONS[cat] ?? <Compass className="w-4 h-4" aria-hidden="true" />;

  const handleStepComplete = () => {
    if (!selectedScenario) return;
    if (currentStepIndex < selectedScenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsScenarioFinished(true);
    }
  };

  const handleResetScenario = () => {
    setSelectedScenario(null);
    setCurrentStepIndex(0);
    setIsScenarioFinished(false);
  };

  // 1. Scenario Player View
  if (selectedScenario) {
    const currentStep: ScenarioStep = selectedScenario.steps[currentStepIndex];
    const targetSign = getSignById(currentStep.targetSignId) || {
      id: currentStep.targetSignId,
      gloss: currentStep.targetSignId.toUpperCase(),
      filipino: currentStep.targetSignId,
      english: currentStep.targetSignId,
      category: 'basic' as const,
      description: 'Practice the indicated sign shape clearly.',
      parameters: {
        handshape: 'Standard',
        movement: 'Fluid',
        location: 'Chest space',
        palmOrientation: 'Neutral',
        nonManual: 'Engaged',
      },
      placeholderSvg: '',
    };

    return (
      <div className="space-y-4 pb-24 max-w-xl mx-auto">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleResetScenario}>
            <ArrowLeft className="w-5 h-5" />
            <span>All Scenarios</span>
          </Button>

          <Badge variant="brand" icon={getCategoryIcon(selectedScenario.category)}>
            {selectedScenario.category.toUpperCase()}
          </Badge>
        </div>

        {/* Emergency Disclaimer Banner per Spec 3.4 */}
        {selectedScenario.category === 'emergency' && (
          <div
            role="note"
            className="p-3.5 bg-warning-surface text-on-warning-surface rounded-card border border-warning text-caption-adaptive flex items-start gap-2.5"
          >
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" aria-hidden="true" />
            <span>{t('scenarios.emergencyDisclaimer')}</span>
          </div>
        )}

        {/* Scenario Completion Summary */}
        {isScenarioFinished ? (
          <div className="bg-surface-card rounded-card border-adaptive p-6 text-center space-y-5 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-brand-green text-on-brand-green mx-auto flex items-center justify-center text-3xl shadow-low">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-title-adaptive font-black text-text-primary">
                {t('scenarios.completeTitle')}
              </h2>
              <p className="text-body-adaptive text-text-secondary mt-1">
                {t('scenarios.completeDesc')}
              </p>
            </div>

            {/* Turn-by-turn recap */}
            <div className="bg-surface-app pad-adaptive-control rounded-card border-adaptive text-left space-y-3">
              <div className="text-caption-adaptive font-bold text-text-secondary uppercase tracking-wider">
                Turn-by-Turn Dialogue Recap
              </div>
              {selectedScenario.steps.map((st: ScenarioStep) => (
                <div key={st.id} className="flex items-center justify-between text-body-adaptive border-b border-adaptive pb-2 last:border-b-0">
                  <div>
                    <span className="font-bold text-brand-blue">{st.speaker}: </span>
                    <span className="text-text-primary">{st.situationText}</span>
                  </div>
                  <span className="text-caption-adaptive font-bold bg-success-surface text-on-success-surface px-2 py-0.5 rounded-pill shrink-0 ml-2">
                    {st.targetSignId.toUpperCase()} ✓
                  </span>
                </div>
              ))}
            </div>

            <Button variant="primary" onClick={handleResetScenario} className="w-full py-3 font-bold">
              Return to Scenarios Hub
            </Button>
          </div>
        ) : (
          /* Active Dialogue Step */
          <div className="space-y-4">
            {/* Step Header */}
            <Card className="space-y-3">
              <div className="flex items-center justify-between text-caption-adaptive text-text-secondary">
                <span className="font-bold text-brand-blue">
                  {t('scenarios.stepProgress', {
                    current: currentStepIndex + 1,
                    total: selectedScenario.steps.length,
                  })}
                </span>
                <span>{selectedScenario.title}</span>
              </div>

              {/* Dialogue Box */}
              <div className="p-3.5 bg-surface-app rounded-control border-adaptive flex items-start gap-3">
                <div className="w-10 h-10 rounded-avatar bg-brand-yellow text-on-brand-yellow flex items-center justify-center font-bold text-lg shrink-0">
                  {currentStep.speaker[0]}
                </div>
                <div>
                  <div className="font-bold text-caption-adaptive text-text-primary">
                    {currentStep.speaker}
                  </div>
                  <div className="text-body-adaptive text-text-primary mt-0.5">
                    "{currentStep.situationText}"
                  </div>
                </div>
              </div>

              {/* Sign Prompt */}
              <div className="bg-brand-blue/10 pad-adaptive-control rounded-control border border-brand-blue/30 flex items-center gap-3 text-body-adaptive font-bold text-brand-blue shadow-low">
                <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{currentStep.prompt}</span>
              </div>

              {currentStep.contextObjectHint && (
                <div className="text-caption-adaptive text-text-secondary">
                  💡 Context Object: <span className="font-medium text-text-primary">{currentStep.contextObjectHint}</span>
                </div>
              )}
            </Card>

            {/* In-Context Camera Practice */}
            <SignPracticeCamera
              targetSign={targetSign}
              scenarioId={selectedScenario.id}
              stepIndex={currentStepIndex}
              onSuccess={handleStepComplete}
              onSkip={handleStepComplete}
            />
          </div>
        )}
      </div>
    );
  }

  // 2. Scenario Picker Hub
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-title-adaptive font-black text-text-primary">
          {t('scenarios.title')}
        </h2>
        <p className="text-body-adaptive text-text-secondary mt-1">
          {t('scenarios.subtitle')}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['all', 'household', 'school', 'public', 'emergency'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-h-touch px-4 py-2 rounded-pill text-caption-adaptive font-bold transition cursor-pointer shrink-0 border-adaptive ${
              activeCategory === cat
                ? 'bg-brand-blue text-on-brand-blue shadow-low'
                : 'bg-surface-card text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

          {/* Scenarios Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredScenarios.map((scen: Scenario) => (
          <button
            key={scen.id}
            onClick={() => {
              setSelectedScenario(scen);
              setCurrentStepIndex(0);
              setIsScenarioFinished(false);
            }}
            className="w-full text-left bg-surface-card rounded-card border-adaptive pad-adaptive-control shadow-low transition-all duration-base cursor-pointer hover:shadow-mid hover:-translate-y-0.5 focus-ring-adaptive group"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-avatar bg-surface-app border-adaptive flex items-center justify-center shrink-0 text-xl group-hover:scale-105 transition-transform">
                {getCategoryIcon(scen.category)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-caption-adaptive font-bold uppercase tracking-wider text-brand-blue">
                    {scen.category}
                  </span>
                  <span className="text-caption-adaptive text-text-secondary">
                    · {scen.steps.length} Turns
                  </span>
                </div>
                <div className="text-title-adaptive font-bold text-text-primary truncate">
                  {scen.title}
                </div>
                <div className="text-body-adaptive text-text-secondary line-clamp-2 mt-0.5">
                  {scen.situation}
                </div>
              </div>
            </div>

            <ChevronRight className="w-6 h-6 text-text-secondary shrink-0 group-hover:text-brand-blue transition-colors" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};

