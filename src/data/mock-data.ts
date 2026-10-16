import { Scenario, BadgeItem } from '../types';

export const MOCK_SCENARIOS: Scenario[] = [
  {
    id: 'household-dinner',
    category: 'household',
    title: 'Dinner with the Family',
    situation: 'You are having dinner with your family. You want to ask for food and water politely.',
    difficulty: 'beginner',
    unlockRequirement: 'Unlocked by default',
    steps: [
      {
        id: 'hh-1',
        speaker: 'Kuya Marco',
        situationText: 'Marco sits at the dinner table and smiles at you.',
        prompt: 'Greet your brother warmly.',
        targetSignId: 'kumusta',
        acceptedAlternativeIds: ['kumusta'],
        contextObjectHint: 'Family table',
      },
      {
        id: 'hh-2',
        speaker: 'Nanay Elena',
        situationText: 'Nanay points to the food dish on the counter.',
        prompt: 'Ask politely for the food.',
        targetSignId: 'pagkain',
        acceptedAlternativeIds: ['pagkain', 'pakiusap'],
        contextObjectHint: 'Plate of food',
      },
      {
        id: 'hh-3',
        speaker: 'Nanay Elena',
        situationText: 'Nanay places a serving on your plate and asks if you need anything else.',
        prompt: 'Ask for a drink / water.',
        targetSignId: 'inumin',
        acceptedAlternativeIds: ['inumin'],
        contextObjectHint: 'Glass of water',
      },
      {
        id: 'hh-4',
        speaker: 'Nanay Elena',
        situationText: 'Nanay passes the pitcher of water with a smile.',
        prompt: 'Thank Nanay for the food and water.',
        targetSignId: 'salamat',
        acceptedAlternativeIds: ['salamat'],
      },
    ],
  },
  {
    id: 'school-classroom',
    category: 'school',
    title: 'Classroom Assistance',
    situation: 'You are working on a classroom exercise and need guidance on the current activity.',
    difficulty: 'beginner',
    unlockRequirement: 'Complete 1 Household Scenario',
    steps: [
      {
        id: 'sc-1',
        speaker: 'Teacher Joy',
        situationText: 'Teacher Joy walks near your desk checking student work.',
        prompt: 'Catch the teacher’s eye and greet her.',
        targetSignId: 'kumusta',
        acceptedAlternativeIds: ['kumusta', 'guro'],
        contextObjectHint: 'Teacher desk',
      },
      {
        id: 'sc-2',
        speaker: 'Teacher Joy',
        situationText: 'Teacher Joy steps over to look at your worksheet.',
        prompt: 'Indicate yourself to say you have a question.',
        targetSignId: 'ako',
        acceptedAlternativeIds: ['ako'],
      },
      {
        id: 'sc-3',
        speaker: 'Teacher Joy',
        situationText: 'Teacher Joy waits for your request.',
        prompt: 'Ask for help with the exercise.',
        targetSignId: 'tulong',
        acceptedAlternativeIds: ['tulong', 'pakiusap'],
      },
      {
        id: 'sc-4',
        speaker: 'Teacher Joy',
        situationText: 'Teacher Joy demonstrates the steps clearly on the board.',
        prompt: 'Express your gratitude to your teacher.',
        targetSignId: 'salamat',
        acceptedAlternativeIds: ['salamat'],
      },
    ],
  },
  {
    id: 'public-desk',
    category: 'public',
    title: 'Community Help Desk',
    situation: 'You are at a community library / information desk asking for direction and support.',
    difficulty: 'intermediate',
    unlockRequirement: 'Complete Classroom Assistance',
    steps: [
      {
        id: 'pub-1',
        speaker: 'Desk Officer',
        situationText: 'The officer looks up and waves in greeting.',
        prompt: 'Wave back and greet the officer.',
        targetSignId: 'kumusta',
        acceptedAlternativeIds: ['kumusta'],
      },
      {
        id: 'pub-2',
        speaker: 'Desk Officer',
        situationText: 'The officer waits patiently to assist you.',
        prompt: 'Politely request assistance.',
        targetSignId: 'pakiusap',
        acceptedAlternativeIds: ['pakiusap', 'tulong'],
      },
      {
        id: 'pub-3',
        speaker: 'Desk Officer',
        situationText: 'The officer points you to the reading room materials.',
        prompt: 'Thank the desk officer.',
        targetSignId: 'salamat',
        acceptedAlternativeIds: ['salamat'],
      },
    ],
  },
  {
    id: 'emergency-clinic',
    category: 'emergency',
    title: 'Medical Clinic Assistance',
    situation: 'Calm clinic consultation: practice communicating medical needs with health staff.',
    difficulty: 'advanced',
    unlockRequirement: 'Always accessible for safety practice',
    steps: [
      {
        id: 'em-1',
        speaker: 'Triage Nurse',
        situationText: 'The triage nurse approaches calmly and looks at you attentively.',
        prompt: 'Greet the nurse and establish eye contact.',
        targetSignId: 'kumusta',
        acceptedAlternativeIds: ['kumusta'],
      },
      {
        id: 'em-2',
        speaker: 'Triage Nurse',
        situationText: 'The nurse holds up an intake clipboard to begin assistance.',
        prompt: 'Request medical help calmly.',
        targetSignId: 'tulong',
        acceptedAlternativeIds: ['tulong'],
      },
      {
        id: 'em-3',
        speaker: 'Triage Nurse',
        situationText: 'The nurse asks which healthcare staff you are here to see.',
        prompt: 'Sign that you are here for the doctor.',
        targetSignId: 'doktor',
        acceptedAlternativeIds: ['doktor'],
      },
      {
        id: 'em-4',
        speaker: 'Triage Nurse',
        situationText: 'The nurse guides you to the consultation room seat.',
        prompt: 'Thank the triage nurse for their care.',
        targetSignId: 'salamat',
        acceptedAlternativeIds: ['salamat'],
      },
    ],
  },
];

export const MOCK_BADGES: BadgeItem[] = [
  {
    id: 'first-sign',
    name: 'First Sign',
    description: 'Complete your very first sign practice session.',
    iconName: 'hand',
    unlocked: true,
    progress: [1, 1],
  },
  {
    id: 'warm-hello',
    name: 'Warm Hello',
    description: 'Use the greeting sign in 3 different interactive scenarios.',
    iconName: 'smile',
    unlocked: true,
    progress: [3, 3],
  },
  {
    id: 'steady-hands',
    name: 'Steady Hands',
    description: 'Sign 5 accurate gestures without needing a retry.',
    iconName: 'sparkles',
    unlocked: true,
    progress: [5, 5],
  },
  {
    id: 'seven-day-streak',
    name: 'Seven-Day Streak',
    description: 'Practice consistently across 7 days in a row.',
    iconName: 'flame',
    unlocked: false,
    progress: [6, 7],
  },
  {
    id: 'quick-signer',
    name: 'Fluid Signer',
    description: 'Complete signs with high clarity and smooth transitions.',
    iconName: 'zap',
    unlocked: false,
    progress: [2, 3],
  },
  {
    id: 'family-helper',
    name: 'Family Circle',
    description: 'Master everyday mealtime and household signs.',
    iconName: 'heart',
    unlocked: true,
    progress: [4, 4],
  },
  {
    id: 'classroom-star',
    name: 'School Star',
    description: 'Complete all steps in the Classroom scenario.',
    iconName: 'book-open',
    unlocked: false,
    progress: [3, 4],
  },
  {
    id: 'first-responder',
    name: 'Safety Ready',
    description: 'Complete all emergency communication practice steps.',
    iconName: 'shield',
    unlocked: false,
    progress: [1, 4],
  },
];

export interface StudentRosterItem {
  id: string;
  name: string;
  level: number;
  accuracy: number;
  avgTimeSeconds: number;
  scenariosDone: number;
  lastActive: string;
  weakSign: string;
}

export const MOCK_EDUCATOR_ROSTER: StudentRosterItem[] = [
  { id: 'st-1', name: 'Maria Santos', level: 2, accuracy: 88, avgTimeSeconds: 4.2, scenariosDone: 3, lastActive: 'Today', weakSign: 'tulong' },
  { id: 'st-2', name: 'Paolo Reyes', level: 3, accuracy: 93, avgTimeSeconds: 3.5, scenariosDone: 6, lastActive: 'Today', weakSign: 'inumin' },
  { id: 'st-3', name: 'Ana Lim', level: 2, accuracy: 68, avgTimeSeconds: 7.1, scenariosDone: 2, lastActive: 'Yesterday', weakSign: 'pakiusap' },
  { id: 'st-4', name: 'Jomar Dela Cruz', level: 2, accuracy: 82, avgTimeSeconds: 5.0, scenariosDone: 3, lastActive: 'Today', weakSign: 'pagkain' },
  { id: 'st-5', name: 'Bea Villanueva', level: 4, accuracy: 96, avgTimeSeconds: 3.0, scenariosDone: 9, lastActive: 'Today', weakSign: 'doktor' },
  { id: 'st-6', name: 'Carlo Ramos', level: 1, accuracy: 60, avgTimeSeconds: 8.8, scenariosDone: 1, lastActive: '4 days ago', weakSign: 'ako' },
];

export const MOCK_FAMILY_SUMMARY = {
  childName: 'Leo',
  weeklyStars: 14,
  streakDays: 6,
  recentSignsLearned: ['kumusta', 'salamat', 'pagkain', 'inumin'],
  recommendedHomeActivity: 'Practice signing "pagkain" (food) and "salamat" (thank you) together at lunch today!',
  nextMilestone: 'Leo is 1 practice away from the Seven-Day Streak badge!',
};

