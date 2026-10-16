import { SignData } from '../types';

/**
 * PROTOTYPE: Sign Manifest
 * All sign clips, descriptions, and glosses in this prototype are strictly placeholders.
 * In production, sign recordings and linguistic annotations must be produced, reviewed,
 * and validated by Deaf FSL signers and certified Deaf FSL instructors.
 */
export const SIGN_MANIFEST_PLACEHOLDER_NOTICE =
  'Placeholder content. Real FSL clips must be produced and validated by Deaf FSL signers/instructors.';

export const SIGN_MANIFEST: SignData[] = [
  {
    id: 'kumusta',
    gloss: 'KUMUSTA',
    filipino: 'Kumusta',
    english: 'Hello / How are you',
    category: 'basic',
    description: 'Flat open hand moves outward from near forehead/chin in a polite greeting motion with pleasant facial expression.',
    parameters: {
      handshape: 'Open 5-hand / Flat hand',
      movement: 'Forward and slight downward wave',
      location: 'Neutral space in front of upper chest / face',
      palmOrientation: 'Palm facing inward/forward toward receiver',
      nonManual: 'Gentle nod and warm facial engagement',
    },
    placeholderSvg: 'hand-wave',
  },
  {
    id: 'salamat',
    gloss: 'SALAMAT',
    filipino: 'Salamat',
    english: 'Thank you',
    category: 'basic',
    description: 'Fingertips of dominant flat hand lightly touch lips/chin and move forward and slightly downward toward recipient.',
    parameters: {
      handshape: 'Flat open hand, fingers together',
      movement: 'Arc moving forward from chin toward receiver',
      location: 'Chin / Mouth to neutral chest space',
      palmOrientation: 'Palm facing inward initially, then slightly up',
      nonManual: 'Slight head nod and affirmative eye contact',
    },
    placeholderSvg: 'hand-heart',
  },
  {
    id: 'ako',
    gloss: 'AKO',
    filipino: 'Ako',
    english: 'I / Me',
    category: 'basic',
    description: 'Index finger of dominant hand points directly to the center of the chest.',
    parameters: {
      handshape: 'Index point (1-handshape)',
      movement: 'Direct contact touch to sternum',
      location: 'Center of upper chest',
      palmOrientation: 'Palm facing toward chest',
      nonManual: 'Direct self-referential gaze',
    },
    placeholderSvg: 'point-self',
  },
  {
    id: 'pakiusap',
    gloss: 'PAKIUSAP',
    filipino: 'Pakiusap',
    english: 'Please',
    category: 'basic',
    description: 'Flat dominant hand placed on the chest rubs in a gentle circular clockwise motion.',
    parameters: {
      handshape: 'Flat hand (B-handshape)',
      movement: 'Clockwise circular rub on sternum',
      location: 'Mid-chest',
      palmOrientation: 'Palm facing inward on chest',
      nonManual: 'Soft, polite facial posture',
    },
    placeholderSvg: 'rub-chest',
  },
  {
    id: 'tulong',
    gloss: 'TULONG',
    filipino: 'Tulong',
    english: 'Help',
    category: 'school',
    description: 'Closed fist with thumb upright (A-hand) rests on the flat palm of the non-dominant hand; both lift upward together.',
    parameters: {
      handshape: 'Dominant fist on non-dominant flat base palm',
      movement: 'Upward lift toward person needing help',
      location: 'Neutral space, waist to chest level',
      palmOrientation: 'Base palm facing up, fist thumb up',
      nonManual: 'Attentive or inquiring expression depending on context',
    },
    placeholderSvg: 'hands-help',
  },
  {
    id: 'guro',
    gloss: 'GURO',
    filipino: 'Guro',
    english: 'Teacher',
    category: 'school',
    description: 'Flattened O-hands near temples move outward and open into flat hands, followed by the person-affix downward motion.',
    parameters: {
      handshape: 'Flattened O transitioning to open 5, followed by parallel flat palms',
      movement: 'Forward from temples then downward vertical stroke',
      location: 'Temples moving outward to mid-chest space',
      palmOrientation: 'Palms facing each other during downward trace',
      nonManual: 'Attentive neutral demeanor',
    },
    placeholderSvg: 'chalkboard-teacher',
  },
  {
    id: 'pagkain',
    gloss: 'PAGKAIN',
    filipino: 'Pagkain',
    english: 'Food / Eat',
    category: 'everyday',
    description: 'Flattened O-hand (fingertips together) moves toward mouth repeatedly in short eating motions.',
    parameters: {
      handshape: 'Flattened O (fingers touching thumb)',
      movement: 'Repeated double touch toward mouth',
      location: 'Mouth / Lower face',
      palmOrientation: 'Palm facing mouth',
      nonManual: 'Slight mouth posture associated with food',
    },
    placeholderSvg: 'food-plate',
  },
  {
    id: 'inumin',
    gloss: 'INUMIN',
    filipino: 'Inumin',
    english: 'Drink / Water',
    category: 'everyday',
    description: 'C-handshape mimics holding a small cup tilting gently toward the mouth.',
    parameters: {
      handshape: 'C-handshape',
      movement: 'Upward tilt toward lower lip',
      location: 'Mouth / Chin space',
      palmOrientation: 'Palm facing inward/side',
      nonManual: 'Neutral pleasant expression',
    },
    placeholderSvg: 'cup-drink',
  },
  {
    id: 'doktor',
    gloss: 'DOKTOR',
    filipino: 'Doktor',
    english: 'Doctor',
    category: 'emergency',
    description: 'Dominant bent-hand or M/D hand taps the inside pulse point of the non-dominant wrist.',
    parameters: {
      handshape: 'Bent fingertips / 2-finger check',
      movement: 'Double tap on wrist pulse',
      location: 'Inner wrist of extended non-dominant arm',
      palmOrientation: 'Base wrist facing upward',
      nonManual: 'Calm, focused expression',
    },
    placeholderSvg: 'medical-cross',
  },
  {
    id: 'pulis',
    gloss: 'PULIS',
    filipino: 'Pulis',
    english: 'Police',
    category: 'emergency',
    description: 'C-handshape touches the upper chest on the non-dominant side, mimicking a police badge.',
    parameters: {
      handshape: 'C-handshape',
      movement: 'Single or double light tap',
      location: 'Upper left chest (badge position)',
      palmOrientation: 'Palm facing inward toward chest',
      nonManual: 'Direct and calm',
    },
    placeholderSvg: 'shield-badge',
  },
];

export function getSignById(id: string): SignData | undefined {
  return SIGN_MANIFEST.find((s) => s.id === id);
}

