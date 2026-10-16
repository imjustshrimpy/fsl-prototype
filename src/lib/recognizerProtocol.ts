import { SignAssessment, SignTarget, ScenarioContext, DetectedObject } from '../types';

/**
 * Shared message protocol between the main thread and the recognition worker.
 * Keeping this typed and separate means the real landmark-based classifier can
 * replace the mock inside the worker without changing any caller.
 */

export type ForcedOutcome = 'auto' | 'correct' | 'almost' | 'try_again' | 'low_confidence' | 'camera_lost';

export type RecognizerRequest =
  | {
      id: number;
      type: 'classify';
      target: SignTarget;
      ctx: ScenarioContext;
      forcedOutcome: ForcedOutcome;
      frame: ImageBitmap | null;
    }
  | { id: number; type: 'detectObjects'; frame: ImageBitmap | null };

export type RecognizerResponse =
  | { id: number; type: 'classify'; result: SignAssessment }
  | { id: number; type: 'detectObjects'; result: DetectedObject[] }
  | { id: number; type: 'error'; message: string };
