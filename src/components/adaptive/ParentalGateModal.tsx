import React, { useState, useRef } from 'react';
import { useTranslation } from '../../i18n';
import { Button } from '../primitives/Button';
import { ShieldCheck, X } from 'lucide-react';

export interface ParentalGateModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentalGateModal: React.FC<ParentalGateModalProps> = ({
  isOpen,
  onSuccess,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleStartHold = () => {
    let p = 0;
    const interval = 50; // ms
    const totalTime = 2000; // 2 seconds hold
    timerRef.current = window.setInterval(() => {
      p += (interval / totalTime) * 100;
      if (p >= 100) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setHoldProgress(100);
        onSuccess();
      } else {
        setHoldProgress(p);
      }
    }, interval);
  };

  const handleStopHold = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setHoldProgress(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="parental-gate-title"
      className="fixed inset-0 z-50 bg-overlay-scrim flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div className="bg-surface-card rounded-card border-adaptive p-6 max-w-sm w-full text-center shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <ShieldCheck className="w-7 h-7 text-brand-blue" aria-hidden="true" />
          <button
            onClick={onCancel}
            aria-label={t('common.close')}
            className="p-1 rounded-control hover:bg-surface-app cursor-pointer"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <h3 id="parental-gate-title" className="text-title-adaptive font-bold text-text-primary mb-2">
          {t('settings.parentalGateTitle')}
        </h3>
        <p className="text-body-adaptive text-text-secondary mb-6">
          {t('settings.parentalGateDesc')}
        </p>

        {/* Visual Press-and-Hold Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onMouseDown={handleStartHold}
            onMouseUp={handleStopHold}
            onMouseLeave={handleStopHold}
            onTouchStart={handleStartHold}
            onTouchEnd={handleStopHold}
            className="w-28 h-28 rounded-full border-4 border-brand-blue bg-surface-app flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden focus-ring-adaptive shadow-inner active:scale-95 transition-transform"
          >
            <div
              className="absolute inset-0 bg-brand-blue/30 transition-all pointer-events-none"
              style={{ height: `${holdProgress}%`, bottom: 0, top: 'auto' }}
            />
            <span className="font-bold text-body-adaptive text-brand-blue z-10">
              Hold {Math.round(holdProgress)}%
            </span>
          </button>

          <Button variant="ghost" onClick={onCancel}>
            {t('common.close')}
          </Button>
        </div>
      </div>
    </div>
  );
};

