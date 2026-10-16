import React, { useState, useEffect, useRef } from 'react';
import { useAgeMode } from '../../context/AgeModeContext';
import { useTranslation } from '../../i18n';
import { SignData, SignAssessment } from '../../types';
import { mockSignRecognizer, ForcedOutcome } from '../../lib/recognizer';
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
  Sparkles,
} from 'lucide-react';

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

  // Camera states
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied' | 'fallback'>('prompt');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isAssessing, setIsAssessing] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<SignAssessment | null>(null);
  const [environmentWarning, setEnvironmentWarning] = useState<string | null>(null);

  // Self-check mode
  const [selfCheckSelected, setSelfCheckSelected] = useState<boolean>(false);

  // Dev forced outcome panel
  const [devOutcome, setDevOutcome] = useState<ForcedOutcome>('auto');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Stop camera tracks helper
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
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

      setStream(mediaStream);
      setIsCameraActive(true);
      setPermissionState('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
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
    mockSignRecognizer.setForcedOutcome(devOutcome);
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

  // 1. Permission Pre-Prompt Screen
  if (permissionState === 'prompt') {
    return (
      <div className={`bg-surface-card rounded-card border-adaptive p-6 text-center max-w-md mx-auto shadow-sm ${className}`}>
        <div className="w-16 h-16 rounded-avatar bg-brand-blue text-on-brand-blue mx-auto flex items-center justify-center text-2xl mb-4">
          <Camera className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="text-title-adaptive font-bold text-text-primary mb-2">
          {t('camera.prepromptTitle')}
        </h3>
        <p className="text-body-adaptive text-text-secondary mb-6">
          {t('camera.prepromptDesc')}
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={startCamera}>
            <Camera className="w-5 h-5" aria-hidden="true" />
            <span>{t('camera.allowBtn')}</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => setPermissionState('fallback')}
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
      <div className={`bg-surface-card rounded-card border-adaptive p-5 shadow-sm ${className}`}>
        <div className="flex items-center justify-between border-b border-adaptive pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-orange" aria-hidden="true"></span>
            <span className="font-bold text-body-adaptive">{t('camera.selfCheckTitle')}</span>
          </div>
          <button
            onClick={() => setPermissionState('prompt')}
            className="text-caption-adaptive text-brand-blue font-medium underline cursor-pointer"
          >
            Try Camera Again
          </button>
        </div>

        <p className="text-body-adaptive text-text-secondary mb-5">
          {t('camera.selfCheckDesc')}
        </p>

        {!assessment ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <Button
              variant="success"
              onClick={() => handleSelfCheckRate(true)}
              className="py-4"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('camera.selfCheckRateMatch')}</span>
            </Button>
            <Button
              variant="warning"
              onClick={() => handleSelfCheckRate(false)}
              className="py-4"
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
    <div className={`bg-surface-card rounded-card border-adaptive overflow-hidden flex flex-col shadow-sm ${className}`}>
      {/* Video Viewport Stage */}
      <div className="relative bg-surface-app border-b border-adaptive min-h-sign-video flex items-center justify-center overflow-hidden">
        {/* Mirrored Video Preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />

        {/* Framing Guide (Head-to-waist overlay with hands position area) */}
        <div className="absolute inset-4 pointer-events-none border-2 border-dashed border-brand-yellow rounded-card flex flex-col items-center justify-between p-3 opacity-80">
          <div className="w-24 h-28 border-2 border-brand-yellow rounded-pill opacity-60"></div>
          <div className="flex items-center justify-between w-full px-6">
            <div className="w-14 h-14 border border-brand-yellow rounded-avatar opacity-70 flex items-center justify-center text-caption-adaptive text-brand-yellow font-bold">
              L Hand
            </div>
            <div className="w-14 h-14 border border-brand-yellow rounded-avatar opacity-70 flex items-center justify-center text-caption-adaptive text-brand-yellow font-bold">
              R Hand
            </div>
          </div>
          <div className="text-caption-adaptive font-bold bg-caption-bg text-caption-text px-3 py-1 rounded-pill">
            Keep upper body & hands in frame
          </div>
        </div>

        {/* Environment warning alert if hands out of frame or lighting low */}
        {environmentWarning && (
          <div
            role="status"
            className="absolute top-3 left-3 right-3 bg-warning-surface text-on-warning-surface p-2.5 rounded-control text-caption-adaptive font-bold border border-warning flex items-center gap-2"
          >
            <SunMedium className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{environmentWarning}</span>
          </div>
        )}

        {/* Camera Off Action Button */}
        <div className="absolute top-3 right-3 z-10">
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
      <div className="p-4 bg-surface-card flex flex-col gap-3">
        {!assessment ? (
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="primary"
              onClick={handleCheckSign}
              disabled={isAssessing}
              className="flex-1 font-bold"
            >
              <Scan className="w-5 h-5" />
              <span>{isAssessing ? 'Checking Sign...' : 'Check My Sign'}</span>
            </Button>

            {onSkip && (
              <Button variant="ghost" onClick={onSkip}>
                {t('feedback.skipBtn')}
              </Button>
            )}
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

        {/* Dev Panel to Force Outcomes per Spec 3.2 */}
        <div className="mt-2 pt-2 border-t border-adaptive flex flex-wrap items-center gap-1.5 text-caption-adaptive">
          <span className="font-bold text-text-secondary">DEV TEST:</span>
          {(['auto', 'correct', 'almost', 'try_again', 'low_confidence', 'camera_lost'] as const).map((outcome) => (
            <button
              key={outcome}
              onClick={() => {
                setDevOutcome(outcome);
                mockSignRecognizer.setForcedOutcome(outcome);
              }}
              className={`px-2 py-0.5 rounded-control text-micro font-bold border-adaptive cursor-pointer ${
                devOutcome === outcome
                  ? 'bg-brand-blue text-on-brand-blue'
                  : 'bg-surface-app text-text-secondary hover:text-text-primary'
              }`}
            >
              {outcome}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
