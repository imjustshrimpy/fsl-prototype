import { describe, it, expect } from 'vitest';
import {
  calculateWeightedAccuracy,
  isDueForReview,
  computeAdaptiveRecommendation,
} from './adaptive';
import { SIGN_MANIFEST } from '../data/sign-manifest';

describe('Adaptive Difficulty Engine', () => {
  it('calculates weighted accuracy accurately', () => {
    const record = {
      signId: 'kumusta',
      attempts: 10,
      correct: 8,
      accuracy: 0.8,
      lastPracticed: Date.now(),
      parameterScores: { handshape: 0.9, palmOrientation: 0.7 },
    };
    const acc = calculateWeightedAccuracy(record);
    expect(acc).toBe(0.8);
  });

  it('determines spaced repetition due status correctly', () => {
    const now = 1000000000;
    const recentRecord = {
      signId: 'salamat',
      attempts: 5,
      correct: 4,
      accuracy: 0.8,
      lastPracticed: now - 3600 * 1000, // 1 hour ago
      parameterScores: {},
    };
    expect(isDueForReview(recentRecord, now)).toBe(false);

    const staleRecord = {
      signId: 'salamat',
      attempts: 5,
      correct: 3,
      accuracy: 0.6,
      lastPracticed: now - 30 * 3600 * 1000, // 30 hours ago (> 24h)
      parameterScores: {},
    };
    expect(isDueForReview(staleRecord, now)).toBe(true);
  });

  it('recommends slower clip playback and more hints when accuracy is low', () => {
    const records = {
      kumusta: {
        signId: 'kumusta',
        attempts: 6,
        correct: 3, // 50%
        accuracy: 0.5,
        lastPracticed: Date.now() - 1000,
        parameterScores: { palmOrientation: 0.5, movement: 0.6 },
      },
    };

    const rec = computeAdaptiveRecommendation({
      allSigns: SIGN_MANIFEST,
      records,
    });

    expect(rec.recommendedSpeed).toBe(0.75);
    expect(rec.hintsCount).toBe(3);
    expect(rec.weakAreas.length).toBeGreaterThan(0);
    expect(rec.weakAreas[0].signId).toBe('kumusta');
    expect(rec.weakAreas[0].reason).toContain('palm orientation');
  });

  it('progresses scenario complexity when user has demonstrated mastery', () => {
    const records: Record<string, any> = {};
    for (let i = 0; i < 6; i++) {
      const signId = SIGN_MANIFEST[i].id;
      records[signId] = {
        signId,
        attempts: 5,
        correct: 5,
        accuracy: 1.0,
        lastPracticed: Date.now(),
        parameterScores: { handshape: 1.0, movement: 0.95 },
      };
    }

    const rec = computeAdaptiveRecommendation({
      allSigns: SIGN_MANIFEST,
      records,
    });

    expect(rec.scenarioComplexity).toBe('advanced');
    expect(rec.recommendedSpeed).toBe(1.0);
    expect(rec.hintsCount).toBe(1);
  });
});

