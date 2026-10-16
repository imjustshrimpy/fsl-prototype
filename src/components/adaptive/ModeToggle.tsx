import React, { useState } from 'react';
import { useAgeMode, SHOW_MODE_TOGGLE } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { ParentalGateModal } from './ParentalGateModal';
import { Baby, Briefcase } from 'lucide-react';

export const ModeToggle: React.FC = () => {
  const { mode, setMode, isKids } = useAgeMode();
  const { t } = useTranslation();
  const [showGate, setShowGate] = useState<boolean>(false);

  if (!SHOW_MODE_TOGGLE) return null;

  const handleToggle = () => {
    if (isKids) {
      // Switching from Kids to Adult requires simple visual parental gate per Stage 7
      setShowGate(true);
    } else {
      setMode('kids');
    }
  };

  const handleGatePassed = () => {
    setShowGate(false);
    setMode('adult');
  };

  return (
    <>
      <div className="flex items-center gap-1 bg-surface-card p-1 rounded-pill border-adaptive shadow-md">
        <button
          onClick={() => {
            if (!isKids) setMode('kids');
          }}
          aria-pressed={isKids}
          aria-label="Switch to Kids Mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption-adaptive font-bold transition cursor-pointer ${
            isKids
              ? 'bg-brand-yellow text-on-brand-yellow shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Baby className="w-4 h-4" aria-hidden="true" />
          <span>Kids</span>
        </button>

        <button
          onClick={() => {
            if (isKids) {
              setShowGate(true);
            } else {
              setMode('adult');
            }
          }}
          aria-pressed={!isKids}
          aria-label="Switch to Adult Mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption-adaptive font-bold transition cursor-pointer ${
            !isKids
              ? 'bg-brand-blue text-on-brand-blue shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Briefcase className="w-4 h-4" aria-hidden="true" />
          <span>Adult</span>
        </button>
      </div>

      <ParentalGateModal
        isOpen={showGate}
        onSuccess={handleGatePassed}
        onCancel={() => setShowGate(false)}
      />
    </>
  );
};

