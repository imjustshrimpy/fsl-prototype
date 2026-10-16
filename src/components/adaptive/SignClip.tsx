import React, { useState, useEffect, useRef } from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { getSignById } from '../../data/sign-manifest';
import { IconButton } from '../primitives/IconButton';
import { Play, Pause, RotateCcw, Repeat, FlipHorizontal, Eye, EyeOff } from 'lucide-react';

export interface SignClipProps {
  clipId: string;
  autoPlayLoop?: boolean;
  showCaptions?: boolean;
  showMirror?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const SignClip: React.FC<SignClipProps> = ({
  clipId,
  autoPlayLoop = true,
  showCaptions = true,
  showMirror = false,
  onComplete,
  className = '',
}) => {
  const { isKids, accessibility } = useAgeMode();
  const { t } = useTranslation();

  const sign = getSignById(clipId);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(autoPlayLoop);
  const [speed, setSpeed] = useState<number>(accessibility.signPlaybackSpeed || (isKids ? 0.75 : 1.0));
  const [isMirrored, setIsMirrored] = useState<boolean>(showMirror);
  const [captionsVisible, setCaptionsVisible] = useState<boolean>(showCaptions && accessibility.captions);
  const [activeParamTab, setActiveParamTab] = useState<'handshape' | 'movement' | 'location' | 'palmOrientation' | 'nonManual'>('handshape');
  const [frameProgress, setFrameProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Animation cycle loop for the vector sign demonstration
  useEffect(() => {
    let progress = 0;
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isPlaying) {
        progress += delta * speed * 0.6; // normalized 0 to 1 cycle
        if (progress >= 1) {
          if (isLooping) {
            progress = 0;
          } else {
            progress = 1;
            setIsPlaying(false);
            if (onComplete) onComplete();
          }
        }
        setFrameProgress(progress);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, isLooping, speed, onComplete]);

  if (!sign) {
    return (
      <div className="p-4 bg-error-surface text-on-error-surface rounded-card border-adaptive">
        Sign clip "{clipId}" not found in manifest.
      </div>
    );
  }

  // Hand movement calculations based on frame progress
  const cycleVal = Math.sin(frameProgress * Math.PI * 2);
  const handOffsetY = cycleVal * 24;
  const handOffsetX = Math.cos(frameProgress * Math.PI * 2) * 14;

  return (
    <div className={`bg-surface-card rounded-card border-adaptive overflow-hidden flex flex-col ${className}`}>
      {/* Video Demonstration Stage */}
      <div className="relative bg-surface-app border-b border-adaptive overflow-hidden flex items-center justify-center min-h-sign-video select-none">
        {/* Mirror container */}
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-4 transition-transform duration-base ${
            isMirrored ? 'scale-x-[-1]' : ''
          }`}
        >
          {/* Flat-vector Signer Avatar */}
          <svg
            viewBox="0 0 240 240"
            className="w-48 h-48 drop-shadow-sm transition-transform"
            aria-label={`Sign demonstration animation for ${sign.gloss}`}
          >
            {/* Background aura */}
            <circle cx="120" cy="120" r="100" fill="var(--color-surface-card)" stroke="var(--color-border-subtle)" strokeWidth="2" />

            {/* Torso & Shoulders */}
            <path
              d="M 60 220 C 60 160, 180 160, 180 220 Z"
              fill={isKids ? 'var(--color-brand-yellow)' : 'var(--color-brand-blue)'}
            />

            {/* Neck */}
            <rect x="110" y="125" width="20" height="25" fill="var(--color-avatar-skin)" rx="4" />

            {/* Head / Face */}
            <circle cx="120" cy="95" r="38" fill="var(--color-avatar-skin)" />

            {/* Hair */}
            <path d="M 82 90 C 82 55, 158 55, 158 90 C 158 70, 82 70, 82 90 Z" fill="var(--color-avatar-hair)" />

            {/* Friendly Facial Features (Non-manual markers) */}
            <circle cx="106" cy="95" r="4" fill="var(--color-avatar-feature)" />
            <circle cx="134" cy="95" r="4" fill="var(--color-avatar-feature)" />
            <path
              d={cycleVal > 0 ? 'M 108 112 Q 120 124 132 112' : 'M 110 114 Q 120 118 130 114'}
              stroke="var(--color-avatar-feature)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Non-dominant base hand (static or supportive) */}
            <circle cx="85" cy="170" r="14" fill="var(--color-avatar-skin)" stroke="var(--color-border-strong)" strokeWidth="2" />

            {/* Dominant Active Signing Hand (Moving with cycleVal) */}
            <g transform={`translate(${handOffsetX}, ${handOffsetY})`}>
              <circle
                cx="140"
                cy="145"
                r="18"
                fill="var(--color-avatar-skin)"
                stroke="var(--color-border-strong)"
                strokeWidth="2.5"
              />
              {/* Palm gesture indicator lines */}
              <line x1="135" y1="135" x2="135" y2="122" stroke="var(--color-avatar-hair)" strokeWidth="3" strokeLinecap="round" />
              <line x1="141" y1="134" x2="141" y2="120" stroke="var(--color-avatar-hair)" strokeWidth="3" strokeLinecap="round" />
              <line x1="147" y1="135" x2="147" y2="123" stroke="var(--color-avatar-hair)" strokeWidth="3" strokeLinecap="round" />
              <line x1="152" y1="138" x2="155" y2="128" stroke="var(--color-avatar-hair)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>

          {/* Kids Friendly Character Badge */}
          {isKids && (
            <div className="absolute top-3 left-3 bg-brand-pink text-on-brand-pink px-3 py-1 rounded-pill font-bold text-caption-adaptive shadow-sm border border-mode">
              ⭐ Kuya Signer
            </div>
          )}

          {/* Offline / Cache Indicator */}
          <div className="absolute top-3 right-3 bg-surface-card text-text-secondary px-2.5 py-1 rounded-pill text-caption-adaptive border-adaptive shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-green" aria-hidden="true"></span>
            <span>{t('player.offline')}</span>
          </div>
        </div>

        {/* Captions Overlay (WCAG AAA ≥ 7:1) */}
        {captionsVisible && (
          <div
            className="absolute bottom-3 left-3 right-3 bg-caption-bg text-caption-text p-2.5 rounded-control text-center shadow-lg pointer-events-none"
            aria-live="polite"
          >
            <div className="font-extrabold text-subtitle-adaptive tracking-wide">
              {sign.gloss}
            </div>
            <div className="text-caption-adaptive opacity-95">
              {sign.english} ({sign.filipino})
            </div>
            <div className="text-caption-adaptive text-amber-300 font-medium mt-0.5">
              {sign.description}
            </div>
          </div>
        )}
      </div>

      {/* Control Bar (Large targets meeting touch guidelines) */}
      <div className="p-3 bg-surface-card flex flex-wrap items-center justify-between gap-2 border-t border-adaptive">
        <div className="flex items-center gap-2">
          {/* Play / Pause Toggle */}
          <IconButton
            aria-label={isPlaying ? t('player.pause') : t('player.play')}
            variant="primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </IconButton>

          {/* Replay */}
          <IconButton
            aria-label={t('player.replay')}
            variant="secondary"
            onClick={() => {
              setFrameProgress(0);
              setIsPlaying(true);
            }}
          >
            <RotateCcw className="w-5 h-5" />
          </IconButton>

          {/* Loop Toggle */}
          <IconButton
            aria-label={t('player.loop')}
            variant={isLooping ? 'accent' : 'secondary'}
            onClick={() => setIsLooping(!isLooping)}
          >
            <Repeat className="w-5 h-5" />
          </IconButton>

          {/* Mirror Perspective Toggle */}
          <IconButton
            aria-label={t('player.mirror')}
            variant={isMirrored ? 'accent' : 'secondary'}
            onClick={() => setIsMirrored(!isMirrored)}
          >
            <FlipHorizontal className="w-5 h-5" />
          </IconButton>

          {/* Captions Toggle */}
          <IconButton
            aria-label={captionsVisible ? t('player.captionsOff') : t('player.captionsOn')}
            variant={captionsVisible ? 'accent' : 'secondary'}
            onClick={() => setCaptionsVisible(!captionsVisible)}
          >
            {captionsVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </IconButton>
        </div>

        {/* Speed Selector Buttons */}
        <div className="flex items-center gap-1 bg-surface-app p-1 rounded-control border-adaptive">
          {[0.5, 0.75, 1.0].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              aria-label={`${t('player.speed')}: ${s}x`}
              className={`min-h-touch px-2.5 py-1 text-caption-adaptive rounded-control font-bold transition cursor-pointer ${
                speed === s
                  ? 'bg-brand-blue text-on-brand-blue shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Adult Mode: Linguistic Parameter Detail Tabs */}
      {!isKids && (
        <div className="p-3 bg-surface-app border-t border-adaptive">
          <div className="font-bold text-caption-adaptive text-text-secondary mb-2 uppercase tracking-wider">
            {t('player.parametersTitle')}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 mb-2">
            {(['handshape', 'movement', 'location', 'palmOrientation', 'nonManual'] as const).map((param) => (
              <button
                key={param}
                onClick={() => setActiveParamTab(param)}
                className={`py-1.5 px-2 text-caption-adaptive rounded-control font-medium transition text-center cursor-pointer ${
                  activeParamTab === param
                    ? 'bg-surface-card text-text-primary font-bold shadow-sm border border-brand-blue'
                    : 'text-text-secondary hover:bg-surface-card'
                }`}
              >
                {t(`player.${param}`)}
              </button>
            ))}
          </div>
          <div className="bg-surface-card p-3 rounded-control border-adaptive text-body-adaptive">
            <span className="font-bold text-brand-blue">{t(`player.${activeParamTab}`)}: </span>
            <span className="text-text-primary">{sign.parameters[activeParamTab]}</span>
          </div>
        </div>
      )}
    </div>
  );
};
