import { MockSignRecognizerService } from './recognizerCore';
import { RecognizerRequest, RecognizerResponse } from './recognizerProtocol';

/**
 * PROTOTYPE: Recognition worker.
 * The mock service runs here so the main thread is never blocked and so a real
 * landmark-based classifier can be dropped in behind the same message protocol.
 * Frames are passed via structured clone (never persisted or uploaded).
 */

// Minimal worker-scope typing so this file stays valid under the DOM lib.
interface WorkerScope {
  onmessage: ((event: MessageEvent<RecognizerRequest>) => void) | null;
  postMessage: (message: RecognizerResponse) => void;
}

const scope = self as unknown as WorkerScope;
const service = new MockSignRecognizerService();

scope.onmessage = async (event: MessageEvent<RecognizerRequest>) => {
  const request = event.data;
  try {
    if (request.type === 'classify') {
      service.setForcedOutcome(request.forcedOutcome);
      const result = await service.classify(request.frame, request.target, request.ctx);
      scope.postMessage({ id: request.id, type: 'classify', result });
    } else {
      const result = await service.detectObjects(request.frame);
      scope.postMessage({ id: request.id, type: 'detectObjects', result });
    }
  } catch (error) {
    scope.postMessage({
      id: request.id,
      type: 'error',
      message: error instanceof Error ? error.message : 'Unknown recognizer error',
    });
  }
};
