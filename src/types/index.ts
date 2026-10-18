export type AgeMode = 'kids' | 'adult';

export type UserRole = 'learner' | 'educator' | 'family';

export type GoalFocus = 'family' | 'school' | 'community' | 'workplace';
export type DailyCommitment = 'casual' | 'regular' | 'serious' | 'intensive';
export type StrictnessLevel = 'encouraging' | 'balanced' | 'strict';
export type SensoryMode = 'visual-audio' | 'visual-haptics' | 'readability';
export type CameraPerspective = 'mirror' | 'observer' | 'multiview';
export type NotificationStyle = 'morning-mascot' | 'morning-direct' | 'afternoon-mascot' | 'afternoon-direct' | 'evening-mascot' | 'evening-direct' | 'off';

export interface OnboardingSettings {
  goalFocus: GoalFocus;
  dailyCommitment: DailyCommitment;
  strictness: StrictnessLevel;
  sensoryMode: SensoryMode;
  cameraPerspective: CameraPerspective;
  notificationStyle: NotificationStyle;
}

export type SignCategory = 'basic' | 'school' | 'everyday' | 'public' | 'emergency';

export interface SignParameters {
  handshape: string;
  movement: string;
  location: string;
  palmOrientation: string;
  nonManual: string;
}

export interface SignData {
  id: string;
  gloss: string;
  filipino: string;
  english: string;
  category: SignCategory;
  description: string;
  parameters: SignParameters;
  placeholderSvg: string; // Flat-vector representation of the sign
}

export interface SignAssessment {
  recognized: boolean;
  confidence: number; // 0–1
  inContext: boolean;
  parameters: Record<'handshape' | 'movement' | 'location' | 'palmOrientation' | 'nonManual', {
    score: number;
    hint?: string;
  }>;
}

export interface SignTarget {
  id: string;
  gloss: string;
}

export interface ScenarioContext {
  scenarioId: string;
  stepIndex: number;
  expectedSignId: string;
}

export interface DetectedObject {
  label: string;
  confidence: number;
}

export interface SignRecognizer {
  classify(frame: ImageBitmap | null, target: SignTarget, ctx: ScenarioContext): Promise<SignAssessment>;
  detectObjects?(frame: ImageBitmap | null): Promise<DetectedObject[]>;
}

export type ScenarioCategory = 'household' | 'school' | 'public' | 'emergency';

export interface ScenarioStep {
  id: string;
  speaker: string;
  situationText: string;
  prompt: string;
  targetSignId: string;
  acceptedAlternativeIds: string[];
  contextObjectHint?: string;
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  title: string;
  situation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: ScenarioStep[];
  unlockRequirement: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress: [number, number];
}

export interface AccessibilityPreferences {
  captions: boolean;
  hapticsEnabled: boolean;
  signPlaybackSpeed: number; // 0.5 | 0.75 | 1.0
  reducedMotion: boolean;
  highContrast: boolean;
  textSize: '100' | '125' | '150';
  optionalSoundEffects: boolean;
}

export interface AdaptiveSignRecord {
  signId: string;
  attempts: number;
  correct: number;
  accuracy: number;
  lastPracticed: number; // timestamp
  parameterScores: Record<string, number>;
}

export interface AdaptiveRecommendation {
  nextLessonSignId: string;
  recommendedSpeed: number;
  hintsCount: number;
  scenarioComplexity: 'beginner' | 'intermediate' | 'advanced';
  weakAreas: Array<{
    signId: string;
    parameter: string;
    reason: string;
  }>;
}

export type Locale = 'en-PH' | 'fil-PH';

