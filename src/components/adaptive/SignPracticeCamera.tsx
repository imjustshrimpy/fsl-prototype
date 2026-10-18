import React, { useState, useEffect, useRef } from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { SignData, SignAssessment } from '../../types';
import { mockSignRecognizer } from '../../lib/recognizer';
import { Button } from '../primitives/Button';
import { IconButton } from '../primitives/IconButton';
import { FeedbackUI } from './FeedbackUI';
import {
  Camera,
  CameraOff,
  SunMedium,
  Scan,
  CheckCircle2,
  HelpCircle,
  School,
  Sparkles,
} from 'lucide-react';

const HAND_POINTS: Array<[number, number]> = [
  [74, 168], [58, 147], [47, 132], [37, 116], [28, 101],
  [48, 121], [42, 96], [38, 72], [35, 51],
  [64, 116], [61, 85], [60, 57], [59, 32],
  [80, 117], [83, 88], [85, 65], [86, 45],
  [96, 122], [106, 102], [112, 84], [117, 68],
];

const HAND_BONES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];

const ClassroomBackdrop: React.FC = () => (
  <svg
    viewBox="0 0 1000 450"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 z-0 h-full w-full"
    aria-hidden="true"
  >
    <rect width="1000" height="450" fill="var(--color-warning-surface)" />
    <rect y="348" width="1000" height="102" fill="var(--color-brand-orange)" opacity="0.3" />
    <path d="M0 348H1000" stroke="var(--color-border-strong)" strokeWidth="5" />

    <g aria-hidden="true">
      <rect x="48" y="48" width="142" height="178" rx="10" fill="var(--color-surface-card)" stroke="var(--color-border-strong)" strokeWidth="8" />
      <rect x="62" y="65" width="114" height="142" fill="var(--color-info-surface)" />
      <path d="M119 65v142M62 136h114" stroke="var(--color-border-subtle)" strokeWidth="5" />
      <path d="m91 105 9 15-16-3-12 11 2-17-11-11 16-3 8-15 7 15 16 5z" fill="var(--color-brand-yellow)" />
      <circle cx="156" cy="86" r="9" fill="var(--color-brand-orange)" />

      <rect x="455" y="20" width="90" height="90" rx="45" fill="var(--color-surface-card)" stroke="var(--color-text-primary)" strokeWidth="8" />
      <circle cx="500" cy="65" r="4" fill="var(--color-text-primary)" />
      <path d="M500 65 521 48M500 65 489 40" stroke="var(--color-text-primary)" strokeWidth="5" strokeLinecap="round" />
      <path d="M500 30v8m0 54v8m35-35h-8m-54 0h-8" stroke="var(--color-border-strong)" strokeWidth="4" />

      <rect x="266" y="118" width="465" height="208" rx="13" fill="var(--color-brand-orange)" opacity="0.65" />
      <rect x="280" y="132" width="437" height="176" rx="5" fill="var(--color-brand-green)" />
      <path d="M282 313h433v13H282z" fill="var(--color-warning-surface)" />
      <path d="M328 164h123m-123 25h92m86-25h83m-83 25h108" stroke="var(--color-surface-card)" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <rect x="548" y="210" width="108" height="77" fill="var(--color-surface-card)" stroke="var(--color-border-strong)" strokeWidth="4" />
      <path d="M560 229h81m-81 14h69m-69 14h52" stroke="var(--color-brand-blue)" strokeWidth="4" strokeLinecap="round" />
      <path d="M371 326h44v6h-44m57 0h53v-6h-53" fill="var(--color-surface-card)" />
      <rect x="624" y="316" width="48" height="12" rx="3" fill="var(--color-text-primary)" />

      <rect x="796" y="104" width="159" height="247" fill="var(--color-warning-surface)" stroke="var(--color-border-strong)" strokeWidth="8" />
      <path d="M800 178h151m-151 83h151" stroke="var(--color-border-strong)" strokeWidth="8" />
      <path d="M818 115h14v55h-14zm22 0h17v55h-17zm25 0h15v55h-15zm23 0h22v55h-22zm30 0h18v55h-18z" fill="var(--color-brand-blue)" />
      <path d="M813 190h24v63h-24zm34 0h18v63h-18zm28 0h24v63h-24zm34 0h23v63h-23z" fill="var(--color-brand-orange)" />
      <rect x="815" y="271" width="38" height="72" fill="var(--color-brand-green)" />
      <rect x="860" y="284" width="31" height="59" fill="var(--color-brand-yellow)" />
      <rect x="900" y="265" width="42" height="78" fill="var(--color-brand-blue)" />
      <path d="M895 98c-4-34 13-47 28-48 16 1 29 15 27 48z" fill="var(--color-brand-green)" />
      <path d="M919 96c-27-13-33-28-31-39 17 4 29 15 31 39zm4 0c8-26 22-35 34-36-1 18-13 31-34 36z" fill="var(--color-brand-green)" />
      <path d="M890 99h60l-8 12h-44z" fill="var(--color-brand-orange)" />

      <path d="M85 350v-31h235v31" fill="var(--color-brand-orange)" />
      <rect x="68" y="315" width="270" height="22" rx="5" fill="var(--color-warning-surface)" stroke="var(--color-border-strong)" strokeWidth="5" />
      <path d="M89 337v104m219-104v104" stroke="var(--color-text-primary)" strokeWidth="10" />
      <path d="M159 313v-41h65v41" fill="var(--color-surface-card)" stroke="var(--color-border-strong)" strokeWidth="5" />
      <path d="m159 313 29-28 36 28" fill="var(--color-surface-app)" stroke="var(--color-border-strong)" strokeWidth="5" />
      <rect x="251" y="288" width="28" height="26" rx="4" fill="var(--color-brand-blue)" />
      <path d="M256 280h18v9h-18z" fill="var(--color-brand-orange)" />
      <path d="M252 278h25m-19-8v8m7-11v11m7-7v7" stroke="var(--color-brand-yellow)" strokeWidth="4" strokeLinecap="round" />

      <path d="M684 351v-54h75v54" fill="var(--color-brand-blue)" opacity="0.8" />
      <path d="M677 300h89v15h-89z" fill="var(--color-warning-surface)" stroke="var(--color-border-strong)" strokeWidth="4" />
      <path d="M689 315v36m65-36v36" stroke="var(--color-text-primary)" strokeWidth="8" />
      <rect x="700" y="266" width="41" height="31" rx="4" fill="var(--color-surface-app)" stroke="var(--color-border-strong)" strokeWidth="4" />
      <path d="M695 300h52l-7 7h-38z" fill="var(--color-text-primary)" />
      <path d="m722 266 8-25m-8 25-15-20m15 20 19-19" stroke="var(--color-brand-green)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="708" cy="246" r="8" fill="var(--color-brand-green)" />
      <circle cx="730" cy="240" r="9" fill="var(--color-brand-green)" />
      <circle cx="745" cy="248" r="7" fill="var(--color-brand-green)" />
    </g>
  </svg>
);

const PrototypeHandLandmarks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 150 190"
    preserveAspectRatio="none"
    className={`pointer-events-none text-brand-blue ${className}`}
    aria-hidden="true"
  >
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
      {HAND_BONES.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={HAND_POINTS[from][0]}
          y1={HAND_POINTS[from][1]}
          x2={HAND_POINTS[to][0]}
          y2={HAND_POINTS[to][1]}
        />
      ))}
    </g>
    {HAND_POINTS.map(([x, y], index) => (
      <circle
        key={index}
        cx={x}
        cy={y}
        r={index === 4 || index === 8 || index === 12 || index === 16 || index === 20 ? 3.2 : 2.2}
        fill={index % 4 === 0 ? 'var(--color-brand-yellow)' : 'currentColor'}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    ))}
  </svg>
);

const ManoGuide: React.FC<{
  message: string;
  compact?: boolean;
  mood?: 'idle' | 'happy' | 'confused';
}> = ({ message, compact = false, mood = 'idle' }) => (
  <div className={`absolute z-40 flex flex-col items-end gap-1.5 ${compact ? 'bottom-2 right-2' : 'bottom-2 right-3'}`}>
    <div
      aria-live="polite"
      className={`max-w-1/2 rounded-control border-adaptive bg-surface-card p-2 text-caption-adaptive font-bold text-text-primary shadow-mid ${compact ? 'text-micro' : ''}`}
    >
      {message}
    </div>
    <svg viewBox="0 0 88 104" className={`${compact ? 'h-14 w-12' : 'h-20 w-16'} shrink-0 drop-shadow-low`} aria-hidden="true">
      <g className={mood === 'happy' ? 'motion-safe:animate-bounce' : mood === 'confused' ? '-rotate-6' : ''}>
        <path d="M18 101 15 76 73 76 70 101z" fill="var(--color-brand-blue)" stroke="var(--color-text-primary)" strokeWidth="3" />
        <ellipse cx="16" cy="39" rx="15" ry="18" fill="var(--color-brand-orange)" stroke="var(--color-text-primary)" strokeWidth="3" />
        <ellipse cx="72" cy="39" rx="15" ry="18" fill="var(--color-brand-orange)" stroke="var(--color-text-primary)" strokeWidth="3" />
        <circle cx="44" cy="43" r="34" fill="var(--color-brand-yellow)" stroke="var(--color-text-primary)" strokeWidth="3" />
        <ellipse cx="32" cy="42" rx="10" ry="12" fill="var(--color-surface-card)" />
        <ellipse cx="56" cy="42" rx="10" ry="12" fill="var(--color-surface-card)" />
        <circle cx="34" cy="43" r="4" fill="var(--color-text-primary)" />
        <circle cx="54" cy="43" r="4" fill="var(--color-text-primary)" />
        <ellipse cx="44" cy="58" rx="7" ry="5" fill="var(--color-brand-orange)" />
        <path
          d={mood === 'happy' ? 'M32 64q12 15 24 0' : mood === 'confused' ? 'M34 70q10-9 20 0' : 'M34 66q10 10 20 0'}
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </div>
);

export interface SignPracticeCameraProps {
  targetSign: SignData;
  scenarioId?: string;
  stepIndex?: number;
  onSuccess: () => void;
  onSkip?: () => void;
  className?: string;
}

export const SignPracticeCamera: React.FC<SignPracticeCameraProps> = ({
  targetSign,
  scenarioId = 'practice-session',
  stepIndex = 0,
  onSuccess,
  onSkip,
  className = '',
}) => {
  const { isKids, accessibility } = useAgeMode();
  const { t } = useTranslation();
  const scenarioCategory = scenarioId === 'practice-session'
    ? null
    : scenarioId.split('-')[0];
  const stageLabel = scenarioCategory
    ? t(`scenarios.categories.${scenarioCategory}`)
    : t('camera.prepromptTitle');

  // Camera states
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'fallback'>('prompt');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isAssessing, setIsAssessing] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<SignAssessment | null>(null);
  const [environmentWarning, setEnvironmentWarning] = useState<string | null>(null);

  // Self-check mode
  const [selfCheckSelected, setSelfCheckSelected] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera tracks helper
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (videoRef.current && stream && isCameraActive) {
      videoRef.current.srcObject = stream;
      void videoRef.current.play().catch(() => {});
    }
  }, [stream, isCameraActive]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  // Request camera access
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false, // DHH-first: No audio requested
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsCameraActive(true);
      setPermissionState('granted');
    } catch (err) {
      setPermissionState('fallback');
      stopCamera();
    }
  };

  // Perform sign assessment
  const handleCheckSign = async () => {
    setIsAssessing(true);
    setAssessment(null);
    setEnvironmentWarning(null);

    // Call mock recognizer
    mockSignRecognizer.setForcedOutcome('auto');
    const result = await mockSignRecognizer.classify(null, { id: targetSign.id, gloss: targetSign.gloss }, {
      scenarioId,
      stepIndex,
      expectedSignId: targetSign.id,
    });

    setIsAssessing(false);
    setAssessment(result);

    if (result.confidence < 0.6) {
      setEnvironmentWarning(t('camera.handsOutNotice'));
    }
  };

  const handleSelfCheckRate = (matched: boolean) => {
    setSelfCheckSelected(true);
    const simulatedResult: SignAssessment = {
      recognized: matched,
      confidence: matched ? 0.9 : 0.6,
      inContext: true,
      parameters: {
        handshape: { score: matched ? 0.95 : 0.7, hint: matched ? undefined : 'Focus on finger alignment.' },
        movement: { score: matched ? 0.9 : 0.65 },
        location: { score: 0.9 },
        palmOrientation: { score: matched ? 0.92 : 0.68, hint: matched ? undefined : 'Keep palm orientation stable.' },
        nonManual: { score: 0.85 },
      },
    };
    setAssessment(simulatedResult);
  };

  const guideMessage = environmentWarning || (
    isAssessing
      ? t('camera.checkingSign')
      : assessment
      ? assessment.recognized
        ? t('feedback.recognized')
        : t('feedback.tryAgain')
      : t('camera.keepInFrame')
  );
  const guideMood = assessment
    ? assessment.recognized ? 'happy' : 'confused'
    : 'idle';

  // 1. Permission Pre-Prompt Screen
  if (permissionState === 'prompt') {
    return (
      <div className={`bg-surface-card rounded-card border-adaptive p-6 text-center max-w-md mx-auto shadow-mid ${className}`}>
        <div className="relative mb-4 aspect-video overflow-hidden rounded-card border-adaptive">
            <ClassroomBackdrop />
            <div className="absolute left-3 top-3 z-10 rounded-control bg-caption-bg/90 px-3 py-2 text-caption-adaptive font-bold text-caption-text">
              {stageLabel}
            </div>
            <div className="absolute bottom-3 left-3 z-10 rounded-control bg-caption-bg/90 px-3 py-2 text-caption-adaptive font-bold text-caption-text">
              {targetSign.gloss}
            </div>
            <PrototypeHandLandmarks className="absolute left-1/4 top-1/4 z-10 h-2/3 w-1/3 text-brand-blue opacity-90" />
            <ManoGuide message={t('camera.keepInFrame')} compact={!isKids} />
        </div>
        <div className="w-16 h-16 rounded-avatar bg-brand-blue text-on-brand-blue mx-auto flex items-center justify-center text-2xl mb-4 shadow-low">
          <Camera className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="text-title-adaptive font-bold text-text-primary mb-2">
          {t('camera.prepromptTitle')}
        </h3>
        <p className="text-body-adaptive text-text-secondary mb-6 leading-relaxed">
          {t('camera.prepromptDesc')}
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={startCamera} className="w-full font-bold shadow-mid">
            <Camera className="w-5 h-5" aria-hidden="true" />
            <span>{t('camera.allowBtn')}</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setPermissionState('fallback')}
            className="w-full font-bold"
          >
            <HelpCircle className="w-5 h-5 text-brand-orange" aria-hidden="true" />
            <span>{t('camera.fallbackBtn')}</span>
          </Button>
        </div>
      </div>
    );
  }

  // 2. Self-Check Fallback Mode (No camera or camera denied)
  if (permissionState === 'fallback' || !isCameraActive) {
    return (
      <div className={`bg-surface-card rounded-card border-adaptive pad-adaptive-control shadow-mid ${className}`}>
        <div className="relative mb-4 aspect-video overflow-hidden rounded-card border-adaptive">
            <ClassroomBackdrop />
            <div className="absolute left-3 top-3 z-10 rounded-control bg-caption-bg/90 px-3 py-2 text-caption-adaptive font-bold text-caption-text">
              {stageLabel}
            </div>
            <div className="absolute bottom-3 left-3 z-10 rounded-control bg-caption-bg/90 px-3 py-2 text-caption-adaptive font-bold text-caption-text">
              {targetSign.gloss}
            </div>
            <PrototypeHandLandmarks className="absolute left-1/4 top-1/4 z-10 h-2/3 w-1/3 text-brand-blue opacity-90" />
            <ManoGuide message={guideMessage} compact={!isKids} mood={guideMood} />
        </div>
        <div className="flex flex-col items-start gap-2 border-b border-adaptive pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-avatar bg-brand-orange" aria-hidden="true"></span>
            <span className="font-bold text-body-adaptive">{t('camera.selfCheckTitle')}</span>
          </div>
          <button
            onClick={() => setPermissionState('prompt')}
            className="w-full text-left text-caption-adaptive text-brand-blue font-medium underline cursor-pointer min-h-touch focus-ring-adaptive"
          >
            {t('camera.tryAgainBtn')}
          </button>
        </div>

        <p className="text-body-adaptive text-text-secondary mb-5 leading-relaxed">
          {t('camera.selfCheckDesc')}
        </p>

        {!assessment ? (
          <div className="grid grid-cols-1 gap-3 mb-4">
            <Button
              variant="success"
              onClick={() => handleSelfCheckRate(true)}
              className="py-2 font-bold shadow-low"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('camera.selfCheckRateMatch')}</span>
            </Button>
            <Button
              variant="warning"
              onClick={() => handleSelfCheckRate(false)}
              className="py-2 font-bold shadow-low"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t('camera.selfCheckRateAlmost')}</span>
            </Button>
          </div>
        ) : (
          <FeedbackUI
            targetSign={targetSign}
            assessment={assessment}
            onTryAgain={() => {
              setAssessment(null);
              setSelfCheckSelected(false);
            }}
            onNext={onSuccess}
            onSkip={onSkip}
          />
        )}
      </div>
    );
  }

  // 3. Active Camera Practice View
  return (
      <div className={`bg-surface-card rounded-card border-adaptive overflow-hidden flex flex-col shadow-high ${className}`}>
      {/* Video Viewport Stage */}
      <div className="relative isolate aspect-video bg-surface-app border-b border-adaptive min-h-sign-video flex items-center justify-center overflow-hidden">
        <ClassroomBackdrop />

        {/* Mirrored Video Preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 z-10 h-full w-full object-cover opacity-85"
          style={{ transform: 'scaleX(-1)' }}
        />

        <>
            {/* PROTOTYPE: Replace sample pose points with MediaPipe Hand Landmarker output. */}
            <PrototypeHandLandmarks
              className={`absolute left-1/4 top-1/4 z-20 h-2/3 w-1/3 opacity-90 transition-transform duration-base ${
                assessment?.recognized ? 'text-brand-green' : assessment ? 'text-brand-orange' : 'text-brand-blue'
              } ${isAssessing ? 'animate-pulse' : ''}`}
            />

            <div className="absolute left-3 right-3 top-3 z-40 flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-control border-adaptive bg-caption-bg/90 px-3 py-2 text-caption-adaptive font-bold text-caption-text shadow-low">
                <School className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">{stageLabel}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div
                  aria-label={`${t('camera.prepromptTitle')}: 98.4%`}
                  title={`${t('camera.prepromptTitle')}: 98.4%`}
                  className="inline-flex min-h-touch items-center gap-2 rounded-control border-adaptive bg-caption-bg/90 px-3 text-caption-adaptive font-bold text-caption-text shadow-low"
                >
                  <span className="h-2 w-2 rounded-avatar bg-brand-green" aria-hidden="true" />
                  <span>98.4%</span>
                </div>
                <IconButton
                  aria-label={t('camera.cameraOffBtn')}
                  variant="secondary"
                  onClick={stopCamera}
                >
                  <CameraOff className="h-5 w-5 text-brand-orange" />
                </IconButton>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 z-40 flex max-w-1/2 flex-col rounded-control border-adaptive bg-caption-bg/90 px-3 py-2 text-caption-text shadow-low">
              <span className="text-micro">{t('scenarios.inContextNotice')}</span>
              <span className="font-bold">{targetSign.gloss}</span>
            </div>
            <ManoGuide message={guideMessage} compact={!isKids} mood={guideMood} />
        </>

        {/* Framing Guide (Head-to-waist overlay with hands position area) */}
        <div className="pointer-events-none absolute inset-4 z-30 flex flex-col items-center justify-between rounded-card border-2 border-dashed border-brand-blue p-3 pt-14 opacity-80 shadow-low">
          <div className="h-12 w-16 rounded-control border-2 border-brand-yellow opacity-70"></div>
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-brand-yellow text-caption-adaptive font-bold text-brand-yellow">
              {t('camera.lHand')}
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-brand-yellow text-caption-adaptive font-bold text-brand-yellow">
              {t('camera.rHand')}
            </div>
          </div>
        </div>

        {/* Environment warning alert if hands out of frame or lighting low */}
        {environmentWarning && (
          <div
            role="status"
            aria-live="polite"
            className="absolute left-3 right-3 top-16 z-50 flex items-center gap-2 rounded-control border border-warning bg-warning-surface p-2.5 text-caption-adaptive font-bold text-on-warning-surface shadow-mid"
          >
            <SunMedium className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{environmentWarning}</span>
          </div>
        )}

        {/* Camera Off Action Button */}
        <div className="absolute right-3 top-3 z-40">
          <IconButton
            aria-label={t('camera.cameraOffBtn')}
            variant="secondary"
            onClick={stopCamera}
          >
            <CameraOff className="w-5 h-5 text-brand-orange" />
          </IconButton>
          </div>
      </div>

      {/* Camera Action Toolbar */}
      <div className="pad-adaptive-control bg-surface-card flex flex-col gap-3">
        {!assessment ? (
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="primary"
              onClick={handleCheckSign}
              disabled={isAssessing}
              className="flex-1 font-bold shadow-mid"
            >
              <Scan className="w-5 h-5" />
              <span>{isAssessing ? t('camera.checkingSign') : t('camera.checkMySign')}</span>
            </Button>
          </div>
        ) : (
          <FeedbackUI
            targetSign={targetSign}
            assessment={assessment}
            onTryAgain={() => setAssessment(null)}
            onNext={onSuccess}
            onSkip={onSkip}
          />
        )}

      </div>
    </div>
  );
};
