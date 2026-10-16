import {
  SignRecognizer,
  SignAssessment,
  SignTarget,
  ScenarioContext,
  DetectedObject,
} from '../types';
import { ForcedOutcome } from './recognizerProtocol';

/**
 * PROTOTYPE: MockSignRecognizerService
 * In production, this is backed by a MediaPipe Hands / Holistic pipeline with a
 * lightweight transformer or MLP model classifying normalized 3D hand/pose
 * landmarks, running on-device (no frames streamed off-device). This service is
 * hosted inside recognizer.worker.ts; only the worker's message protocol is part
 * of the public API.
 */
export class MockSignRecognizerService implements SignRecognizer {
  private forcedOutcome: ForcedOutcome = 'auto';

  public setForcedOutcome(outcome: ForcedOutcome) {
    this.forcedOutcome = outcome;
  }

  public getForcedOutcome(): ForcedOutcome {
    return this.forcedOutcome;
  }

  public async classify(
    _frame: ImageBitmap | null,
    target: SignTarget,
    ctx: ScenarioContext
  ): Promise<SignAssessment> {
    // Simulate lightweight classification delay (180ms)
    await new Promise((resolve) => setTimeout(resolve, 180));

    const outcome = this.forcedOutcome;

    if (outcome === 'camera_lost') {
      return {
        recognized: false,
        confidence: 0.1,
        inContext: false,
        parameters: {
          handshape: { score: 0.1, hint: 'Camera view was interrupted. Switched to self-check mode.' },
          movement: { score: 0.1 },
          location: { score: 0.1 },
          palmOrientation: { score: 0.1 },
          nonManual: { score: 0.1 },
        },
      };
    }

    if (outcome === 'low_confidence') {
      return {
        recognized: false,
        confidence: 0.42, // Below 0.6 threshold
        inContext: true,
        parameters: {
          handshape: { score: 0.45, hint: 'Hands were partially obscured. Bring hands fully into the guide frame.' },
          movement: { score: 0.4 },
          location: { score: 0.5 },
          palmOrientation: { score: 0.4 },
          nonManual: { score: 0.6 },
        },
      };
    }

    if (outcome === 'almost') {
      return {
        recognized: false,
        confidence: 0.78,
        inContext: true,
        parameters: {
          handshape: { score: 0.88, hint: 'Hand shape is crisp and well formed.' },
          movement: { score: 0.82 },
          location: { score: 0.85 },
          palmOrientation: { score: 0.55, hint: 'Almost there! Try turning your palm inward toward your chest.' },
          nonManual: { score: 0.85 },
        },
      };
    }

    if (outcome === 'try_again') {
      return {
        recognized: false,
        confidence: 0.65,
        inContext: true,
        parameters: {
          handshape: { score: 0.6, hint: 'Keep trying! Focus on keeping your fingertips together.' },
          movement: { score: 0.62, hint: 'Slow down the forward arc slightly.' },
          location: { score: 0.7 },
          palmOrientation: { score: 0.68 },
          nonManual: { score: 0.7 },
        },
      };
    }

    if (outcome === 'correct') {
      return {
        recognized: true,
        confidence: 0.94,
        inContext: true,
        parameters: {
          handshape: { score: 0.95, hint: 'Great handshape clarity!' },
          movement: { score: 0.92, hint: 'Smooth, natural signing movement.' },
          location: { score: 0.93 },
          palmOrientation: { score: 0.96 },
          nonManual: { score: 0.9 },
        },
      };
    }

    // Default 'auto' mode: deterministic high success with realistic variations
    const isExpected = target.id === ctx.expectedSignId;
    const confidence = isExpected ? 0.91 : 0.68;

    return {
      recognized: isExpected,
      confidence,
      inContext: isExpected,
      parameters: {
        handshape: { score: isExpected ? 0.94 : 0.7, hint: isExpected ? 'Crisp finger alignment.' : 'Check finger spread.' },
        movement: { score: isExpected ? 0.9 : 0.65, hint: isExpected ? 'Fluent tempo.' : 'Try a smoother wave.' },
        location: { score: 0.92 },
        palmOrientation: { score: isExpected ? 0.93 : 0.72 },
        nonManual: { score: 0.88 },
      },
    };
  }

  public async detectObjects(_frame: ImageBitmap | null): Promise<DetectedObject[]> {
    // PROTOTYPE: Mocked on-device object bounding box recognizer for scenario prompts
    return [
      { label: 'cup', confidence: 0.92 },
      { label: 'plate', confidence: 0.88 },
    ];
  }
}
