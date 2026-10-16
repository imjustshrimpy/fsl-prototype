import React, { useState } from 'react';
import { useAgeMode } from './context/AgeModeContext';
import { useTranslation } from './i18n';
import { SignData } from './types';
import { ModeToggle } from './components/adaptive/ModeToggle';
import { RoleSwitcher } from './components/adaptive/RoleSwitcher';
import { BottomNavPill } from './components/adaptive/BottomNavPill';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, isKids } = useAgeMode();
  const { t } = useTranslation();

  const [activeLessonSign, setActiveLessonSign] = useState<SignData | null>(null);

  return (
    <div className="min-h-screen bg-surface-app text-text-primary flex flex-col antialiased selection:bg-brand-yellow selection:text-text-primary">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-surface-card border-b border-adaptive px-4 py-3 flex items-center justify-between gap-3 shadow-low">
        <div className="flex items-center gap-2.5">
          {/* Brand Mark */}
          <svg
            className={`w-9 h-9 shrink-0 ${isKids ? 'text-brand-pink fill-current' : 'text-brand-blue fill-current'}`}
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
            <h1 className={`font-extrabold text-title-adaptive leading-tight tracking-tight ${isKids ? 'text-brand-pink' : 'text-text-primary'}`}>
              Talinturo
            </h1>
            <p className="text-micro text-text-secondary hidden sm:block">{t('app.tagline')}</p>
          </div>
        </div>

        {/* Global Mode Toggle & Role Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <RoleSwitcher />
          <ModeToggle />
        </div>
      </header>

      {/* 3. Main Screen Viewport */}
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 sm:p-6 overflow-y-auto">
        {activeLessonSign ? (
          <LessonPage
            sign={activeLessonSign}
            onBack={() => setActiveLessonSign(null)}
            onCompleteLesson={() => {
              setActiveLessonSign(null);
              setActiveTab('home');
            }}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                onSelectSign={(sign) => setActiveLessonSign(sign)}
                onOpenScenarios={() => setActiveTab('scenarios')}
              />
            )}
            {activeTab === 'scenarios' && <ScenariosPage />}
            {activeTab === 'practice' && (
              <HomePage
                onSelectSign={(sign) => setActiveLessonSign(sign)}
                onOpenScenarios={() => setActiveTab('scenarios')}
              />
            )}
            {activeTab === 'progress' && <ProgressPage />}
            {activeTab === 'settings' && <SettingsPage />}
          </>
        )}
      </main>

      {/* 4. Bottom Navigation Pill */}
      <BottomNavPill />
    </div>
  );
};
