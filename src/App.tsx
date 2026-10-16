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
      <header className="sticky top-0 z-30 bg-surface-card border-b border-adaptive px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-avatar flex items-center justify-center font-black text-xl shadow-sm ${
              isKids ? 'bg-brand-yellow text-on-brand-yellow' : 'bg-brand-blue text-on-brand-blue'
            }`}
          >
            🐦
          </div>
          <div>
            <h1 className="font-extrabold text-body-adaptive leading-tight tracking-tight">
              Talinturo
            </h1>
            <p className="text-micro text-text-secondary hidden sm:block">
              {t('app.tagline')}
            </p>
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
