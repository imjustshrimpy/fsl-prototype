import {
  SignRecognizer,
  SignAssessment,
  SignTarget,
  ScenarioContext,
  DetectedObject,
} from '../types';
import { MockSignRecognizerService } from './recognizerCore';
import { ForcedOutcome, RecognizerRequest, RecognizerResponse } from './recognizerProtocol';

export type { ForcedOutcome } from './recognizerProtocol';

interface PendingRequest {
  request: RecognizerRequest;
  resolve: (response: RecognizerResponse) => void;
}

/**
 * PROTOTYPE: Main-thread bridge to the recognition worker.
 *
 * The mock recognizer runs inside `recognizer.worker.ts` so the main thread is
 * never blocked (see spec 5.5). If Web Workers are unavailable (SSR, tests,
 * older browsers) or the worker dies, every call transparently falls back to an
 * in-process `MockSignRecognizerService` so callers never break. A real
 * landmark-based classifier replaces the service without changing this API.
 */
class WorkerSignRecognizerBridge implements SignRecognizer {
  private readonly fallback = new MockSignRecognizerService();
  private readonly pending = new Map<number, PendingRequest>();
  private worker: Worker | null;
  private sequence = 0;
  private forcedOutcome: ForcedOutcome = 'auto';

  constructor() {
    this.worker = this.createWorker();
  }

  private createWorker(): Worker | null {
    if (typeof Worker === 'undefined') return null;
    try {
      const worker = new Worker(new URL('./recognizer.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (event: MessageEvent<RecognizerResponse>) => {
        const response = event.data;
        const pending = this.pending.get(response.id);
        if (!pending) return;
        this.pending.delete(response.id);
        pending.resolve(response);
      };
      worker.onerror = () => this.handleWorkerFailure();
      return worker;
    } catch {
      return null;
    }
  }

  private handleWorkerFailure(): void {
    console.warn('[Talinturo] Recognition worker unavailable; falling back to in-process mock.');
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    const pending = Array.from(this.pending.values());
    this.pending.clear();
    pending.forEach(({ request, resolve }) => {
      void this.runFallback(request).then(resolve);
    });
  }

  public setForcedOutcome(outcome: ForcedOutcome): void {
    this.forcedOutcome = outcome;
  }

  public getForcedOutcome(): ForcedOutcome {
    return this.forcedOutcome;
  }

  private dispatch(request: RecognizerRequest): Promise<RecognizerResponse> {
    const worker = this.worker;
    if (!worker) return this.runFallback(request);
    return new Promise<RecognizerResponse>((resolve) => {
      this.pending.set(request.id, { request, resolve });
      worker.postMessage(request);
    });
  }

  private async runFallback(request: RecognizerRequest): Promise<RecognizerResponse> {
    if (request.type === 'classify') {
      this.fallback.setForcedOutcome(request.forcedOutcome);
      const result = await this.fallback.classify(request.frame, request.target, request.ctx);
      return { id: request.id, type: 'classify', result };
    }
    const result = await this.fallback.detectObjects(request.frame);
    return { id: request.id, type: 'detectObjects', result };
  }

  public async classify(
    frame: ImageBitmap | null,
    target: SignTarget,
    ctx: ScenarioContext
  ): Promise<SignAssessment> {
    const response = await this.dispatch({
      id: ++this.sequence,
      type: 'classify',
      target,
      ctx,
      forcedOutcome: this.forcedOutcome,
      frame,
    });
    if (response.type === 'classify') return response.result;
    throw new Error(response.type === 'error' ? response.message : 'Unexpected recognizer response');
  }

  public async detectObjects(frame: ImageBitmap | null): Promise<DetectedObject[]> {
    const response = await this.dispatch({ id: ++this.sequence, type: 'detectObjects', frame });
    if (response.type === 'detectObjects') return response.result;
    throw new Error(response.type === 'error' ? response.message : 'Unexpected recognizer response');
  }
}

export const mockSignRecognizer = new WorkerSignRecognizerBridge();
