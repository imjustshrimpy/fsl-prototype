import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AgeMode, UserRole, AccessibilityPreferences, OnboardingSettings } from '../types';

interface NavItemConfig {
  id: string;
  labelKey: string;
  iconName: 'home' | 'play' | 'message-square' | 'bar-chart' | 'settings' | 'star' | 'user';
}

interface SignPlayerDefaults {
  autoPlayLoop: boolean;
  defaultSpeed: number;
  defaultMirror: boolean;
  largeFraming: boolean;
}

interface AgeModeContextType {
  mode: AgeMode;
  setMode: (mode: AgeMode) => void;
  isKids: boolean;
  isAdult: boolean;
  role: UserRole;
  setRole: (role: UserRole) => void;
  accessibility: AccessibilityPreferences;
  updateAccessibility: (updates: Partial<AccessibilityPreferences>) => void;
  onboardingSettings: OnboardingSettings;
  setOnboardingSettings: (settings: OnboardingSettings) => void;
  signPlayerDefaults: SignPlayerDefaults;
  navItems: NavItemConfig[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DEFAULT_ACCESSIBILITY: AccessibilityPreferences = {
  captions: true,
  hapticsEnabled: true,
  signPlaybackSpeed: 1.0,
  reducedMotion: false,
  highContrast: false,
  textSize: '100',
  optionalSoundEffects: false, // OFF by default in both modes; no TTS anywhere
};

export const DEFAULT_ONBOARDING_SETTINGS: OnboardingSettings = {
  goalFocus: 'family',
  dailyCommitment: 'regular',
  strictness: 'balanced',
  sensoryMode: 'visual-audio',
  cameraPerspective: 'mirror',
  notificationStyle: 'morning-mascot',
};

const KIDS_NAV: NavItemConfig[] = [
  { id: 'home', labelKey: 'nav.kids.play', iconName: 'play' },
  { id: 'progress', labelKey: 'nav.kids.stars', iconName: 'star' },
  { id: 'settings', labelKey: 'nav.kids.me', iconName: 'user' },
];

const ADULT_NAV: NavItemConfig[] = [
  { id: 'home', labelKey: 'nav.adult.home', iconName: 'home' },
  { id: 'scenarios', labelKey: 'nav.adult.scenarios', iconName: 'message-square' },
  { id: 'progress', labelKey: 'nav.adult.progress', iconName: 'bar-chart' },
  { id: 'settings', labelKey: 'nav.adult.settings', iconName: 'settings' },
];

const EDUCATOR_NAV: NavItemConfig[] = [
  { id: 'home', labelKey: 'nav.educator.classroom', iconName: 'home' },
  { id: 'progress', labelKey: 'nav.educator.progress', iconName: 'bar-chart' },
  { id: 'settings', labelKey: 'nav.adult.settings', iconName: 'settings' },
];

const AgeModeContext = createContext<AgeModeContextType | null>(null);

export const AgeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AgeMode>(() => {
    try {
      const saved = localStorage.getItem('talinturo.ageMode');
      if (saved === 'kids' || saved === 'adult') return saved;
    } catch (e) {}
    return 'adult'; // Default adult per spec
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('talinturo.role');
      if (saved === 'learner' || saved === 'educator' || saved === 'family') return saved;
    } catch (e) {}
    return 'learner';
  });

  const [activeTab, setActiveTab] = useState<string>('home');

  const [accessibility, setAccessibility] = useState<AccessibilityPreferences>(() => {
    try {
      const saved = localStorage.getItem('talinturo.accessibility');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && 'captions' in parsed) {
          return { ...DEFAULT_ACCESSIBILITY, ...parsed };
        }
      }
    } catch (e) {}
    return DEFAULT_ACCESSIBILITY;
  });

  const [onboardingSettings, setOnboardingSettingsState] = useState<OnboardingSettings>(() => {
    try {
      const saved = localStorage.getItem('talinturo.onboardingSettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_ONBOARDING_SETTINGS, ...parsed };
        }
      }
    } catch (e) {}
    return DEFAULT_ONBOARDING_SETTINGS;
  });

  const setMode = useCallback((newMode: AgeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem('talinturo.ageMode', newMode);
      document.documentElement.dataset.ageMode = newMode;
    } catch (e) {}
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem('talinturo.role', newRole);
    } catch (e) {}
  }, []);

  const setOnboardingSettings = useCallback((nextSettings: OnboardingSettings) => {
    setOnboardingSettingsState(nextSettings);
    try {
      localStorage.setItem('talinturo.onboardingSettings', JSON.stringify(nextSettings));
    } catch (e) {}
  }, []);

  const updateAccessibility = useCallback((updates: Partial<AccessibilityPreferences>) => {
    setAccessibility((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('talinturo.accessibility', JSON.stringify(next));
        if (next.highContrast) {
          document.documentElement.dataset.highContrast = 'true';
        } else {
          delete document.documentElement.dataset.highContrast;
        }

        if (next.reducedMotion) {
          document.documentElement.dataset.reducedMotion = 'true';
        } else {
          delete document.documentElement.dataset.reducedMotion;
        }

        if (next.textSize !== '100') {
          document.documentElement.dataset.textSize = next.textSize;
        } else {
          delete document.documentElement.dataset.textSize;
        }
      } catch (e) {}
      return next;
    });
  }, []);

  // Synchronize DOM dataset on mount and mode changes
  useEffect(() => {
    document.documentElement.dataset.ageMode = mode;
  }, [mode]);

  useEffect(() => {
    if (accessibility.highContrast) {
      document.documentElement.dataset.highContrast = 'true';
    } else {
      delete document.documentElement.dataset.highContrast;
    }

    if (accessibility.reducedMotion) {
      document.documentElement.dataset.reducedMotion = 'true';
    } else {
      delete document.documentElement.dataset.reducedMotion;
    }

    if (accessibility.textSize !== '100') {
      document.documentElement.dataset.textSize = accessibility.textSize;
    } else {
      delete document.documentElement.dataset.textSize;
    }
  }, [accessibility]);

  const isKids = mode === 'kids';
  const isAdult = mode === 'adult';

  useEffect(() => {
    if (role === 'educator' && activeTab !== 'home' && activeTab !== 'progress' && activeTab !== 'settings') {
      setActiveTab('home');
    }
  }, [role, activeTab]);

  const signPlayerDefaults: SignPlayerDefaults = isKids
    ? { autoPlayLoop: true, defaultSpeed: 0.75, defaultMirror: true, largeFraming: true }
    : { autoPlayLoop: true, defaultSpeed: 1.0, defaultMirror: false, largeFraming: false };

  const navItems = role === 'educator' ? EDUCATOR_NAV : isKids ? KIDS_NAV : ADULT_NAV;

  return (
    <AgeModeContext.Provider
      value={{
        mode,
        setMode,
        isKids,
        isAdult,
        role,
        setRole,
        accessibility,
        updateAccessibility,
        onboardingSettings,
        setOnboardingSettings,
        signPlayerDefaults,
        navItems,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AgeModeContext.Provider>
  );
};

export function useAgeMode(): AgeModeContextType {
  const context = useContext(AgeModeContext);
  if (!context) {
    throw new Error('useAgeMode must be used within an AgeModeProvider');
  }
  return context;
}

