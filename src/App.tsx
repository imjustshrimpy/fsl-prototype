import React, { useEffect, useRef, useState } from 'react';
import { useAgeMode } from './context/AgeModeContext';
import { useTranslation } from './i18n';
import { AgeMode, OnboardingSettings, SignData, UserRole } from './types';
import { BottomNavPill } from './components/adaptive/BottomNavPill';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { OnboardingPage } from './pages/OnboardingPage';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, isKids, setMode, setRole, role, setOnboardingSettings } = useAgeMode();
  const { t } = useTranslation();

  const [activeLessonSign, setActiveLessonSign] = useState<SignData | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const completeOnboarding = (mode: AgeMode, role: UserRole, settings: OnboardingSettings) => {
    setMode(mode);
    setRole(role);
    setOnboardingSettings(settings);
    setActiveTab('home');
    setOnboardingComplete(true);
  };

  const restartOnboarding = () => {
    setActiveLessonSign(null);
    setOnboardingSettings({
      goalFocus: 'family',
      dailyCommitment: 'regular',
      strictness: 'balanced',
      sensoryMode: 'visual-audio',
      cameraPerspective: 'mirror',
      notificationStyle: 'morning-mascot',
    });
    setOnboardingComplete(false);
  };

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [activeTab, activeLessonSign, onboardingComplete]);

  const renderMainScreen = () => {
    if (role === 'educator') {
      if (activeTab === 'settings') {
        return <SettingsPage onRestartSetup={restartOnboarding} />;
      }
      return <ProgressPage initialInstructorTab={activeTab === 'progress' ? 'grades' : 'stream'} />;
    }

    if (activeTab === 'home') {
      return (
        <HomePage
          onSelectSign={(sign) => setActiveLessonSign(sign)}
          onOpenScenarios={() => setActiveTab('scenarios')}
        />
      );
    }

    if (activeTab === 'scenarios') return <ScenariosPage />;
    if (activeTab === 'progress') return <ProgressPage />;
    if (activeTab === 'settings') return <SettingsPage onRestartSetup={restartOnboarding} />;
    return null;
  };

  return (
    <div className="mobile-app-shell bg-surface-app text-text-primary flex flex-col antialiased selection:bg-brand-yellow selection:text-text-primary">
      {/* Top Header Bar */}
      <header className="relative z-30 bg-surface-card border-b border-adaptive px-4 py-3 flex items-center shadow-low">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Brand Mark */}
          <svg
            className={`w-7 h-7 shrink-0 ${isKids ? 'text-brand-pink fill-current' : 'text-brand-blue fill-current'}`}
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path
              d="M16 2c-3.5 0-6.5 2.5-7.5 6 0 1.1 0.5 2.1 1.2 2.8l2.2-2.2c0.6-0.6 1.6-0.6 2.2 0l2.2 2.2c0.6 0.6 0.6 1.6 0 2.2l-2.2 2.2c-0.6 0.6-1.6 0.6-2.2 0l-1.1-1.1c-0.8-0.7-1.3-1.8-1.3-2.8 0-3.5 3-6.5 6.5-6.5 3.5 0 6.5 3 6.5 6.5s-3 6.5-6.5 6.5-6.5-3-6.5-6.5c0-1 0.5-2.1 1.3-2.8l1.1 1.1c0.6 0.6 1.6 0.6 2.2 0l2.2-2.2c0.6-0.6 1.6-0.6 2.2 0l2.2 2.2c0.6 0.6 1.2-1.7 1.2-2.8C22.5 4.5 19.5 2 16 2"
              fill="currentColor"
            />
            <circle cx="16" cy="16" r="4" fill="currentColor" />
          </svg>
          <div>
            <h1 className={`font-extrabold text-subtitle-adaptive leading-tight tracking-tight ${isKids ? 'text-brand-pink' : 'text-text-primary'}`}>
              Talinturo
            </h1>
            <p className="text-micro text-text-secondary hidden">{t('app.tagline')}</p>
          </div>
        </div>
      </header>

      {/* 3. Main Screen Viewport */}
      <main ref={mainRef} className="min-h-0 flex-1 w-full p-4 overflow-y-auto overscroll-contain">
        {!onboardingComplete ? (
          <OnboardingPage onComplete={completeOnboarding} />
        ) : activeLessonSign ? (
          <LessonPage
            sign={activeLessonSign}
            onBack={() => setActiveLessonSign(null)}
            onCompleteLesson={() => {
              setActiveLessonSign(null);
              setActiveTab('home');
            }}
          />
        ) : (
          renderMainScreen()
        )}
      </main>

      {/* 4. Bottom Navigation Pill */}
      {onboardingComplete && <BottomNavPill />}
    </div>
  );
};
