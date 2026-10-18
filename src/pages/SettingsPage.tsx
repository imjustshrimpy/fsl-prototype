import React from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import {
  Sliders,
  Eye,
  Vibrate,
  Gauge,
  Zap,
  Type,
  VolumeX,
  Languages,
} from 'lucide-react';

interface SettingsPageProps {
  onRestartSetup: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onRestartSetup }) => {
  const { accessibility, updateAccessibility, isKids, role } = useAgeMode();
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto">
      <div>
        <h2 className="text-title-adaptive font-black text-text-primary">
          {t('settings.title')}
        </h2>
        <p className="text-body-adaptive text-text-secondary mt-1">
          Customized accessible preferences saved across sessions.
        </p>
      </div>

      {/* 1. Mode & Role Controls */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="font-bold text-body-adaptive text-text-primary">
              {t('settings.setupLabel')}
            </div>
            <div className="text-caption-adaptive text-text-secondary">
              {t('settings.setupSummary', {
                mode: t(isKids ? 'settings.kidsMode' : 'settings.adultMode'),
                role: t(`settings.roles.${role}`),
              })}
            </div>
          </div>
          <Button variant="secondary" onClick={onRestartSetup} className="w-full">
            {t('settings.changeSetup')}
          </Button>
        </div>

        {/* Language Selection */}
        <div className="border-t border-adaptive pt-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-brand-blue" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">Language / Wika</div>
              <div className="text-caption-adaptive text-text-secondary">Filipino / Philippine English</div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-surface-app p-1 rounded-pill border-adaptive">
            <button
              onClick={() => setLocale('en-PH')}
              className={`px-3 py-1 rounded-pill text-caption-adaptive font-bold cursor-pointer min-h-touch ${
                locale === 'en-PH' ? 'bg-brand-blue text-on-brand-blue' : 'text-text-secondary'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLocale('fil-PH')}
              className={`px-3 py-1 rounded-pill text-caption-adaptive font-bold cursor-pointer min-h-touch ${
                locale === 'fil-PH' ? 'bg-brand-blue text-on-brand-blue' : 'text-text-secondary'
              }`}
            >
              Filipino
            </button>
          </div>
        </div>
      </Card>

      {/* 2. DHH Accessibility Preferences */}
      <Card className="space-y-4">
        <h3 className="text-subtitle-adaptive font-bold text-text-primary flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-blue" aria-hidden="true" />
          <span>Accessibility Preferences</span>
        </h3>

        {/* Captions */}
        <div className="flex items-center justify-between py-2 border-b border-adaptive">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-brand-blue shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.captionsLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">Gloss line & text description (≥ 7:1)</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={accessibility.captions}
            onChange={(e) => updateAccessibility({ captions: e.target.checked })}
            aria-label={t('settings.captionsLabel')}
            className="w-6 h-6 adaptive-checkbox cursor-pointer focus-ring-adaptive"
          />
        </div>

        {/* Haptics */}
        <div className="flex items-center justify-between py-2 border-b border-adaptive">
          <div className="flex items-center gap-2.5">
            <Vibrate className="w-5 h-5 text-brand-blue shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.hapticsLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">Gentle tactile vibration pulses</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={accessibility.hapticsEnabled}
            onChange={(e) => updateAccessibility({ hapticsEnabled: e.target.checked })}
            aria-label={t('settings.hapticsLabel')}
            className="w-6 h-6 adaptive-checkbox cursor-pointer focus-ring-adaptive"
          />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between py-2 border-b border-adaptive">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-brand-yellow shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.highContrastLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">High-contrast solid borders and palette</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={accessibility.highContrast}
            onChange={(e) => updateAccessibility({ highContrast: e.target.checked })}
            aria-label={t('settings.highContrastLabel')}
            className="w-6 h-6 adaptive-checkbox cursor-pointer focus-ring-adaptive"
          />
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between py-2 border-b border-adaptive">
          <div className="flex items-center gap-2.5">
            <Gauge className="w-5 h-5 text-brand-green shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.reducedMotionLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">Disables springs, loops, and rapid motion</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={accessibility.reducedMotion}
            onChange={(e) => updateAccessibility({ reducedMotion: e.target.checked })}
            aria-label={t('settings.reducedMotionLabel')}
            className="w-6 h-6 adaptive-checkbox cursor-pointer focus-ring-adaptive"
          />
        </div>

        {/* Text Size Scale */}
        <div className="flex items-center justify-between py-2 border-b border-adaptive flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Type className="w-5 h-5 text-brand-blue shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.textSizeLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">100%, 125%, or 150% magnification</div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-surface-app p-1 rounded-pill border-adaptive">
            {(['100', '125', '150'] as const).map((size) => (
              <button
                key={size}
                onClick={() => updateAccessibility({ textSize: size })}
                className={`px-3 py-1 rounded-pill text-caption-adaptive font-bold cursor-pointer min-h-touch ${
                  accessibility.textSize === size ? 'bg-brand-blue text-on-brand-blue' : 'text-text-secondary'
                }`}
              >
                {size}%
              </button>
            ))}
          </div>
        </div>

        {/* Optional Sound Effects (Off by default, NO TTS anywhere) */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <VolumeX className="w-5 h-5 text-text-secondary shrink-0" aria-hidden="true" />
            <div>
              <div className="font-bold text-body-adaptive text-text-primary">{t('settings.soundLabel')}</div>
              <div className="text-caption-adaptive text-text-secondary">Purely optional tone; no voice speech</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={accessibility.optionalSoundEffects}
            onChange={(e) => updateAccessibility({ optionalSoundEffects: e.target.checked })}
            aria-label={t('settings.soundLabel')}
            className="w-6 h-6 adaptive-checkbox cursor-pointer focus-ring-adaptive"
          />
        </div>
      </Card>
    </div>
  );
};

