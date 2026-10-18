import { AdaptiveSignRecord, AdaptiveRecommendation, GoalFocus, SignData } from '../types';

/**
 * Adaptive Difficulty Engine
 * Pure functions for spaced repetition, rolling accuracy, and transparent personalized recommendations.
 */

export interface AdaptiveInput {
  allSigns: SignData[];
  records: Record<string, AdaptiveSignRecord>;
  currentTimestamp?: number;
}

/**
 * Calculates the accuracy ratio for a sign record.
 * Returns correct / attempts, clamped to [0, 1].
 * Returns 0 when there are no attempts.
 */
export function calculateWeightedAccuracy(record: AdaptiveSignRecord): number {
  if (record.attempts === 0) return 0;
  return Math.min(1, Math.max(0, record.correct / record.attempts));
}

/**
 * Determines if a sign is due for spaced-repetition review.
 * Default interval: 24 hours (86,400,000 ms) for accuracy < 0.8, 72 hours for accuracy >= 0.8.
 */
export function isDueForReview(record: AdaptiveSignRecord, now: number): boolean {
  const accuracy = calculateWeightedAccuracy(record);
  const intervalMs = accuracy >= 0.8 ? 72 * 3600 * 1000 : 24 * 3600 * 1000;
  return now - record.lastPracticed >= intervalMs;
}

/**
 * Generates transparent next-lesson recommendations and weak area reviews.
 */
const GOAL_FOCUS_ORDER: Record<GoalFocus, string[]> = {
  family: ['pagkain', 'inumin', 'kumusta', 'salamat', 'pakiusap', 'ako', 'guro', 'tulong', 'doktor', 'pulis'],
  school: ['guro', 'tulong', 'kumusta', 'ako', 'salamat', 'pakiusap', 'pagkain', 'inumin', 'doktor', 'pulis'],
  community: ['kumusta', 'pakiusap', 'salamat', 'tulong', 'guro', 'pagkain', 'inumin', 'doktor', 'pulis', 'ako'],
  workplace: ['kumusta', 'pakiusap', 'salamat', 'guro', 'tulong', 'doktor', 'pulis', 'pagkain', 'inumin', 'ako'],
};

export function orderSignsByGoalFocus(signs: SignData[], goalFocus: GoalFocus): SignData[] {
  const order = GOAL_FOCUS_ORDER[goalFocus] || GOAL_FOCUS_ORDER.family;
  const orderMap = new Map(order.map((signId, index) => [signId, index]));

  return [...signs].sort((a, b) => {
    const aIndex = orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return a.id.localeCompare(b.id);
  });
}

export function computeAdaptiveRecommendation(input: AdaptiveInput): AdaptiveRecommendation {
  const { allSigns, records, currentTimestamp = Date.now() } = input;

  const signScores = allSigns.map((sign) => {
    const record = records[sign.id] || {
      signId: sign.id,
      attempts: 0,
      correct: 0,
      accuracy: 0,
      lastPracticed: 0,
      parameterScores: {},
    };
    const accuracy = calculateWeightedAccuracy(record);
    const due = isDueForReview(record, currentTimestamp);

    return {
      sign,
      record,
      accuracy,
      due,
    };
  });

  // Calculate overall mastery
  const attempted = signScores.filter((s) => s.record.attempts > 0);
  const averageAccuracy =
    attempted.length > 0
      ? attempted.reduce((acc, curr) => acc + curr.accuracy, 0) / attempted.length
      : 0.5;

  // Determine speed recommendation
  let recommendedSpeed = 1.0;
  let hintsCount = 2;
  if (averageAccuracy < 0.7) {
    recommendedSpeed = 0.75;
    hintsCount = 3;
  } else if (averageAccuracy >= 0.88) {
    recommendedSpeed = 1.0;
    hintsCount = 1;
  }

  // Determine scenario complexity
  const masteredCount = attempted.filter((s) => s.accuracy >= 0.8 && s.record.attempts >= 3).length;
  let scenarioComplexity: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  if (masteredCount >= 5 && averageAccuracy >= 0.82) {
    scenarioComplexity = 'advanced';
  } else if (masteredCount >= 2 || averageAccuracy >= 0.75) {
    scenarioComplexity = 'intermediate';
  }

  // Find next lesson sign:
  // 1. Due for review with lowest accuracy
  // 2. Unattempted sign
  // 3. First sign fallback
  const dueWeakSigns = signScores
    .filter((s) => s.record.attempts > 0 && s.accuracy < 0.8)
    .sort((a, b) => a.accuracy - b.accuracy);

  const unattempted = signScores.filter((s) => s.record.attempts === 0);

  let nextSignId = allSigns[0]?.id || 'kumusta';
  if (dueWeakSigns.length > 0) {
    nextSignId = dueWeakSigns[0].sign.id;
  } else if (unattempted.length > 0) {
    nextSignId = unattempted[0].sign.id;
  }

  // Find weak parameter areas with human-readable rationale
  const weakAreas: Array<{ signId: string; parameter: string; reason: string }> = [];

  for (const item of attempted) {
    const params = item.record.parameterScores || {};
    for (const [param, score] of Object.entries(params)) {
      if (score < 0.75) {
        let reason = `Focusing on ${param} clarity to ensure the shape is unambiguous.`;
        if (param === 'palmOrientation') {
          reason = 'Practicing palm orientation so your sign faces the recipient correctly.';
        } else if (param === 'handshape') {
          reason = 'Fine-tuning finger positioning for sharper sign definition.';
        } else if (param === 'movement') {
          reason = 'Refining movement tempo and direction for smoother signing.';
        }
        weakAreas.push({
          signId: item.sign.id,
          parameter: param,
          reason,
        });
      }
    }
  }

  return {
    nextLessonSignId: nextSignId,
    recommendedSpeed,
    hintsCount,
    scenarioComplexity,
    weakAreas: weakAreas.slice(0, 4),
  };
}

