/**
 * Haptic patterns (durations in milliseconds)
 * Feature-detected with silent fallback for unsupported devices / desktop.
 */
export type FeedbackType = 'click' | 'success' | 'gentle' | 'error';

class FeedbackService {
  private hasHaptics: boolean = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  public trigger(type: FeedbackType, hapticsEnabled: boolean = true, soundEnabled: boolean = false) {
    if (hapticsEnabled && this.hasHaptics) {
      try {
        switch (type) {
          case 'click':
            navigator.vibrate(10);
            break;
          case 'success':
            navigator.vibrate([20, 40, 30]);
            break;
          case 'gentle':
            navigator.vibrate(15);
            break;
          case 'error':
            navigator.vibrate([30, 50, 30, 50, 40]);
            break;
        }
      } catch (e) {
        // Silent fallback
      }
    }

    // Optional synthesized sound (OFF by default per DHH guidelines; no TTS)
    if (soundEnabled && typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const freq = type === 'success' ? 587.33 : type === 'click' ? 440 : 330;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch (e) {}
    }
  }

  public click(haptics = true, sound = false) {
    this.trigger('click', haptics, sound);
  }

  public success(haptics = true, sound = false) {
    this.trigger('success', haptics, sound);
  }

  public gentle(haptics = true, sound = false) {
    this.trigger('gentle', haptics, sound);
  }

  public error(haptics = true, sound = false) {
    this.trigger('error', haptics, sound);
  }
}

export const feedback = new FeedbackService();

/**
 * Wrap event handlers with tactile and optional feedback
 */
export function withFeedback<T extends (...args: any[]) => any>(
  handler: T,
  type: FeedbackType = 'click',
  hapticsEnabled = true,
  soundEnabled = false
): (...args: Parameters<T>) => ReturnType<T> {
  if (!soundEnabled) {
    return (...args: Parameters<T>) => {
      feedback.trigger(type, hapticsEnabled, false);
      return handler(...args);
    };
  }

  const AudioCtx =
    typeof window !== 'undefined' && 'AudioContext' in window
      ? window.AudioContext
      : undefined;
  return (...args: Parameters<T>) => {
    feedback.trigger(type, hapticsEnabled, true);
    if (AudioCtx) {
      try {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const freq = type === 'success' ? 587.33 : type === 'click' ? 440 : 330;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch {}
    }
    return handler(...args);
  };
}

