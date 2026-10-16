# TASK: Build the "Talinturo" Filipino Sign Language (FSL) Learning Prototype with Age-Adaptive Modes

## 0. ROLE, CONTEXT & NON-NEGOTIABLES

You are a senior front-end engineer building a **clickable prototype** of an interactive FSL learning platform, a central hub for learners, educators, and families. The primary users are **Deaf and hard-of-hearing (DHH) learners**. The platform has **two age-adaptive modes**:

- **Kids Mode:** visual, play-based, simplified navigation, rich *visual and haptic* cues.
- **Adult Mode:** streamlined, context-driven, focused on practical conversation and self-paced mastery.

Both modes share one flat-vector brand identity and one codebase, driven by a single central state.

**Prototype scope:** This is a prototype. Backend, auth, and the real ML model are mocked behind typed interfaces. Prioritize a polished, believable UX and clean architecture over completeness. Anything stubbed must be marked `// PROTOTYPE:` with the production approach noted.

**Rules for every file:**
1. No "vibe coding." Every color, size, radius, spacing, duration, and spring value comes from a declared token.
2. No hardcoded hex codes, pixel values, or arbitrary Tailwind values (`[72px]`, `bg-[#...]`) in component or screen files. Hex values live ONLY in `globals.css`. Need a new value? Add a token first.
3. No scattered `mode === 'kids' ? … : …` ternaries on raw values. Mode differences resolve through CSS variables or the `useAgeMode()` hook and typed config objects.
4. **DHH-first rule:** No feature may depend on sound, speech, or spoken-language comprehension. Audio is never required and never the only channel. Every cue has a visual equivalent. Sign video is the primary content; text supports it.
5. All UI copy lives in an i18n dictionary. Default locale `en-PH`, with a `fil-PH` translation for all UI strings. Use plain, short sentences (reading level around grade 5), because written language may be a second language for many Deaf users. No string literals in JSX.
6. **Never invent FSL content.** Sign clips, glosses, and sign descriptions in the prototype are clearly labeled placeholders, loaded from a manifest (`/data/sign-manifest.ts`). Add a visible dev-only banner: "Placeholder content. Real FSL clips must be produced and validated by Deaf FSL signers/instructors."

**Assumed stack (confirm against the repo; do not silently swap):** React 18+, TypeScript (strict), Tailwind CSS, Framer Motion, `getUserMedia` for the camera, `navigator.vibrate` for haptics (feature-detected), Vitest + Testing Library, axe-core.

---

## STAGE 1: DESIGN TOKENS & SYSTEM STATE

### 1.1 Token architecture
- CSS custom properties in `globals.css` under `:root`, with overrides under `[data-age-mode="kids"]` and `[data-age-mode="adult"]` on `<html>`.
- Expose to Tailwind via `theme.extend` using `var(--token)` so `bg-brand-blue`, `rounded-card`, `min-h-touch` resolve per mode.
- Naming: `--color-*`, `--radius-*`, `--space-*`, `--font-size-*`, `--touch-min`, `--duration-*`, `--spring-*`.

### 1.2 Shared palette (flat vector; no gradients; shadows only via elevation tokens)

| Token | Value | Name |
|---|---|---|
| `brand-blue` | `#1B40FF` | Electric Kobalt Blue |
| `brand-yellow` | `#FFC800` | Vibrant Warm Yellow |
| `brand-green` | `#2DB85C` | Fresh Green |
| `brand-orange` | `#FF5E2C` | Coral Orange |
| `brand-pink` | `#FF88B8` | Soft Bubblegum |
| `surface-app` | `#F5F6FA` | Canvas |
| `surface-card` | `#FFFFFF` | Card |
| `text-primary` | `#111827` | Primary text |
| `text-secondary` | `#6B7280` | Secondary text |

**Required additional tokens (WCAG AA):**
- `on-brand-*` pairs for each fill (default `text-primary`; white only where ≥ 4.5:1, likely only blue).
- `text-secondary-on-app` (≥ 4.5:1 on `surface-app`).
- `border-subtle`, `border-strong`, `focus-ring` (≥ 3:1 against adjacent colors).
- Semantic `success`, `error`, `warning`, `info` with `on-` pairs. **Avoid red/green as the only distinguishing pair**, and use shape and icon as well.
- Video-overlay tokens: caption background/foreground (≥ 7:1), camera-guide overlay stroke.

**Deliverable:** `docs/contrast-matrix.md` (or an automated test) listing every text/background pair used, its ratio, and pass/fail. Brand colors are not used as text on white unless they pass.

### 1.3 Mode tokens

| Token | Kids | Adult |
|---|---|---|
| `--radius-card` | `28px` | `16px` |
| `--radius-control` | `20px` | `12px` |
| `--radius-pill` | `9999px` | `9999px` |
| `--border-width` | `2px` | `1px` |
| `--border-color` | `border-strong` | `border-subtle` |
| `--font-size-body` | `18px` min | `15px` (14–16) |
| `--font-size-title` | `28px` | `20px` |
| `--line-height-body` | `1.6` | `1.5` |
| `--touch-min` | `52px` | `44px` |
| `--control-padding` | `1rem` | `0.75rem` |
| `--node-min-height` | `72px` | `56px` |
| `--nav-item-min-height` | `52px` | `44px` |
| `--sign-video-min-height` | large, define | compact, define |
| `--duration-base` / springs | spring `500/15` | tween `150–200ms` ease-out |
| `--hover-lift` | none (press-scale `0.96`) | `-2px` translateY |

One sans-serif family (specify it and its fallbacks). Kids may use a heavier weight scale; Adult uses a strict hierarchy (title / subtitle / body / caption with declared size, weight, line-height tokens). Kids' "bold high-contrast strokes" must be ≥ 3:1 (WCAG 1.4.11); `gray-900/10` alone fails, so define and verify it.

### 1.4 `AgeModeContext`
- `type AgeMode = 'kids' | 'adult'`. Provider exposes `{ mode, setMode, toggleMode }`. `useAgeMode()` returns `{ mode, isKids, isAdult, motion, haptics, nav, signPlayerDefaults }`.
- On change, set `document.documentElement.dataset.ageMode`.
- Persist in `localStorage` (`talinturo.ageMode`) with safe fallback. Set the attribute before hydration to avoid a flash. Default `adult`.
- `<ModeToggle />`: floating, labeled, keyboard accessible, `aria-pressed`, gated behind `SHOW_MODE_TOGGLE`. Switching must not remount screens or lose scroll/form/camera state. Animate the layout change (crossfade under reduced motion).
- **Role switcher** (prototype only): `learner | educator | family`, controlling which dashboard view is shown. Mock data only.

### 1.5 Accessibility preferences (persisted, available in both modes)
`captions` (on by default), `hapticsEnabled`, `signPlaybackSpeed` default, `reducedMotion` override (follows the OS by default), `highContrast` (swaps to a high-contrast token set), `textSize` (100/125/150%), `optionalSoundEffects` (**off by default in both modes**, no TTS anywhere).

---

## STAGE 2: CORE PLATFORM (Objective 1) & ADAPTIVE COMPONENTS (Objective 2)

Build in `/components/adaptive/`. Each component has a typed props interface, a story or demo route showing both modes, and renders from tokens only.

### 2.1 Shared primitives (build first)
`<Button>`, `<IconButton>`, `<Card>`, `<Badge>`, `<ProgressBar>`, `<Avatar>`, `<Skeleton>`, `<VisualAlert>` (replaces any audio alert: banner or toast with icon, text, and color, plus optional haptic), `<SignClip>` (below).

### 2.2 `<SignClip />`: the core learning element
A video player for sign demonstrations, built for sign language learning:
- Controls: play/pause, **loop (on by default)**, **speed (0.5×, 0.75×, 1×)**, **mirror toggle** (learner-perspective view), replay, and frame-step or scrub. Large targets per mode.
- Always shows captions or a gloss line (toggleable) plus a plain-language description.
- Keyboard accessible, no autoplay with sound (clips are silent), pause control for any auto-playing loop (WCAG 2.2.2).
- Kids: large framing, friendly character host. Adult: compact, with detail tabs (handshape, movement, location, palm orientation, non-manual markers).
- Props: `clipId`, `autoPlayLoop`, `showCaptions`, `showMirror`, `onComplete`. Loading, error, and offline states are required.

### 2.3 `<AdaptiveHeroCard />`
- **Kids:** large vector character avatar, `brand-yellow` or `brand-pink` background with `on-*` text, play-based visual prompt, and a big "Watch the sign" CTA that plays the clip (not audio).
- **Adult:** module header (e.g., "Emergency phrases", "Conversation practice"), subtitle, mastery percentage, `role="progressbar"` with `aria-valuenow/min/max` and label.

### 2.4 `<StatGrid />`
- **Kids:** star/badge collector counters with icons, count-up animation, and a **visual + haptic** celebration on increment.
- **Adult:** 4-column bar (`Signs learned`, `Accuracy`, `Streak`, `XP`), bold numbers, muted labels, tabular numerals; 2×2 at 375px.
- Every stat has a visible label and an accessible name. Never rely on color or icon alone.

### 2.5 `<LearningNodeCard />`
- **Kids:** large card (`min-h-node`), color-coded avatar badge, high-contrast text, visual status badge.
- **Adult:** list row (`min-h-node`), status icon, scenario tag, difficulty tag, right arrow.
- States: default, hover (adult lift), focus-visible, pressed, disabled, **locked** (with an unlock requirement shown), in-progress, completed, **needs-review** (from adaptive engine).
- Semantics: single `<button>`/`<a>`, never a clickable `<div>`.

### 2.6 `<BottomNavPill />`
- **Kids:** 3 tabs (`Play`, `My Stars`, `Me`), big icons, labels always visible, `min-h-nav-item`.
- **Adult:** 4 tabs (`Home`, `Scenarios`, `Practice`, `Progress`) with a sliding active pill via Framer Motion `layoutId`.
- `<nav aria-label>`, `aria-current="page"`, safe-area padding, no content hidden behind it. Tab configs come from one typed config keyed by mode; do not branch in JSX.

### 2.7 Pages (compose only from the components above)
1. **Home:** hero, stats, today's lessons, and a "Review" shelf of weak signs (adaptive).
2. **Lesson:** `<SignClip />` → "Your turn" → camera practice → feedback → reward.
3. **Scenarios:** scenario picker and scenario player (Stage 3).
4. **Progress:** gamification and analytics (Stage 4), switched by role.
5. **Profile/Settings:** mode, accessibility preferences (1.5), role.
Every page has loading (skeleton), empty, error, and offline states. Mock data lives in one file.

---

## STAGE 3: AI & COMPUTER VISION, SCENARIO ENGINE (Objective 3)

### 3.1 Camera practice (`<SignPracticeCamera />`)
- Uses `getUserMedia` with a **clear permission pre-prompt** screen explaining why, how video is used, and that it is not recorded or uploaded. Provide a full no-camera fallback path (self-check mode: watch, copy, self-rate), so the lesson is never blocked.
- Mirror-view preview, a visual framing guide (head-to-waist, hands visible), and visual environment checks (lighting too dark, hands out of frame) shown as text and icon cues, never audio.
- Processing is on-device by design. Never store frames. A "camera off" control is always visible.

### 3.2 Recognition behind an interface (mocked)
```ts
interface SignRecognizer {
  classify(frame: ImageBitmap, target: SignTarget, ctx: ScenarioContext): Promise<SignAssessment>;
  detectObjects?(frame: ImageBitmap): Promise<DetectedObject[]>; // object identification for scenarios
}
type SignAssessment = {
  recognized: boolean;
  confidence: number;               // 0–1
  inContext: boolean;               // is the sign appropriate to the scenario?
  parameters: Record<'handshape'|'movement'|'location'|'palmOrientation'|'nonManual',
                     { score: number; hint?: string }>;
};
```
- Ship `MockSignRecognizer` (scripted, randomized, deterministic via a seed) and a dev panel to force outcomes (correct / almost / try again / low confidence / camera lost). Document where a real model (landmark-based classifier) plugs in.
- Handle low-confidence and "can't see your hands" explicitly. Never show a verdict when confidence is below the threshold.

### 3.3 Non-judgmental feedback
- Language: "Almost! Try turning your palm toward you," never "Wrong" or "Failed." No red-alone failure state, no buzzer, no sad character.
- Feedback is organized by sign parameter (handshape, movement, location, palm orientation, facial/non-manual), each with a short hint and a **side-by-side comparison** (the clip vs. the learner's mirrored view). A "Try again" is always the primary action, and "Skip for now" is always available.
- Feedback channels: visual (icon + text + color + shape), haptic (optional, a gentle pattern), never audio-only.

### 3.4 Scenario engine
- Typed `Scenario` data: `id`, `category` (`household | school | public | emergency | …extensible`), `situation` (short plain-language setup), `steps[]` (each step: prompt, target signs, accepted alternatives, context objects), `difficulty`, and `unlockRequirement`.
- Build 4 sample scenarios (one per category) with 3–5 steps each. The scenario player shows the situation as an illustration plus a sign prompt (never audio), checks "in context" via the recognizer's `inContext`, and gives a step-by-step summary at the end.
- **Emergency scenarios:** calm tone, no timers or pressure, no scary imagery, and a clear disclaimer that practice is not a substitute for real emergency communication plans.
- Objects (`detectObjects`) can be used to prompt scenario steps (e.g., show the cup → sign "water"); mocked in the prototype.

---

## STAGE 4: GAMIFICATION, ADAPTIVE PROGRESSION & ANALYTICS (Objective 4)

### 4.1 Gamification
- XP per completed step, with a daily goal. **Streaks** with a gentle "freeze" mechanic so a miss isn't punishing. **Badges** (define 8 with unlock rules) and **unlockable levels**.
- Kids: star and badge collection, character rewards, a big visual celebration. Adult: concise XP and mastery delta, with level progress.
- Celebrations must obey the flash-rate limit (≤ 3 flashes/sec) and the reduced-motion rules.

### 4.2 Adaptive difficulty engine (`/lib/adaptive.ts`, pure and unit-tested)
- Tracks per-sign and per-parameter accuracy, recency, and attempts. Uses a simple documented algorithm (e.g., weighted rolling accuracy + spaced-repetition intervals).
- Outputs: next-lesson recommendation, difficulty adjustment (clip speed, number of hints, scenario complexity), and a "weak areas" list that feeds the Home "Review" shelf.
- Show the learner *why* (e.g., "You're practicing palm orientation more because it's the tricky part right now"). No hidden changes.

### 4.3 Analytics dashboards (mock data, charts accessible)
- **Learner view:** accuracy over time, signs mastered, streak calendar, weak parameters, scenario completion.
- **Educator view:** class roster, per-learner accuracy and growth, commonly missed signs, assignment of scenarios, export (CSV stub).
- **Family view:** simplified progress summary and suggested at-home practice.
- Accessibility: every chart has a text summary and a data table alternative, uses patterns/shapes plus color, and is keyboard navigable. Privacy: show only what each role should see.

---

## STAGE 5: ACCESSIBILITY, MOTION & PERFORMANCE

### 5.1 DHH accessibility
- Visual alerts for all notifications and state changes, with optional haptics. No sound-only cues anywhere.
- Captions or gloss on all clips, with caption contrast ≥ 7:1 and size controllable.
- Clip layout keeps the signer's full upper body, face, and hands visible. Never crop or overlay UI on them.
- Don't use ear/hearing metaphors ("listen", "hear") in copy or iconography. Use "watch", "show", "sign".
- Avoid reliance on timing: no timed answers by default, and any timer must be extendable or off.

### 5.2 General accessibility
- Touch targets: Kids ≥ `52px` (`p-4`), Adult ≥ `44px` (`p-3`), with ≥ 8px between targets.
- Text ≥ 4.5:1 (large text ≥ 3:1); component boundaries and focus indicators ≥ 3:1. Info never by color alone.
- Visible `:focus-visible` ring on all interactives. Support 200% text zoom with no clipping or horizontal scroll. Landmarks, one `h1` per screen, logical headings. Icon-only controls have accessible names.

### 5.3 Motion
- Presets in `/lib/motion.ts`: `kidsSpring` (`stiffness: 500, damping: 15`), `adultTransition` (`duration: 0.18, ease: 'easeOut'`), stagger values, kids floating-character loop, adult hover lift.
- `prefers-reduced-motion: reduce` (or the in-app override): Kids replaces springs, staggers, and loops with opacity fades ≤ 200ms; Adult removes lifts and decoration. Functional feedback remains. Looping decoration stops after a short period. Animate only `transform`/`opacity`.

### 5.4 Haptics & optional sound (`/lib/feedback.ts`)
- `feedback.click() | success() | gentle() | error()` triggers haptics (feature-detected, fails silently) plus a visual pulse. Optional sound effects only if `optionalSoundEffects` is on. Wrap handlers with `withFeedback(handler, type)` rather than inlining calls.

### 5.5 Performance
Budgets: initial JS ≤ 250 KB gzipped, route-level code splitting, lazy-load the camera and chart modules, clips use poster images and `preload="metadata"`, the main thread is never blocked by recognition (use a worker for the mock interface boundary), and the camera releases tracks when leaving the screen.

---

## STAGE 6: QUALITY EVALUATION, ISO/IEC 25010 (Objective 5)

Produce `docs/quality-evaluation.md` plus automated checks where possible. Note that in ISO/IEC 25010:2011, *Accessibility* is a sub-characteristic of *Usability*, and the 2023 revision renames Usability to *Interaction Capability* (with Inclusivity). Evaluate Accessibility as its own row because it is a project goal, and state which edition you follow.

| Characteristic | Prototype checks (examples) | Evidence |
|---|---|---|
| **Functional Suitability** | Every Stage 2–4 feature has a test: lessons complete, scenarios resolve, XP/streak/badge rules fire, adaptive engine recommends correctly | Unit + component tests, requirements traceability table |
| **Usability** | Task-based test script for learners (child and adult) and instructors: task success, time on task, errors, SUS questionnaire | Test script, SUS template, observation sheet (to be run with FSL learners and instructors) |
| **Performance Efficiency** | Bundle-size budget, Lighthouse performance, mode switch < 100 ms, camera-to-feedback latency target (define) | Lighthouse report, measured timings |
| **Reliability** | Camera denied/lost, offline, storage unavailable, clip load failure all degrade gracefully | Failure-injection tests |
| **Accessibility** | axe zero serious/critical in both modes, contrast matrix, keyboard walkthrough, 200% zoom, reduced motion, **DHH-specific checklist (5.1)**, review by Deaf evaluators | axe output, checklist, evaluator notes template |

Include a short **user-feedback instrument** (questionnaire in `en-PH` and `fil-PH`, plain language, sign-video-friendly) for FSL learners and instructors, and note that all evaluation involving Deaf participants should be co-designed with and reviewed by the Deaf community, with informed consent (and guardian consent for minors).

---

## STAGE 7: CHILD SAFETY & PRIVACY
- In production, mode comes from the learner profile, not a free toggle. Switching from Kids to Adult requires a simple visual parental gate (press-and-hold or a picture task, not a spoken or text-heavy challenge). Stub with a TODO if out of scope.
- Kids Mode: no external links, ads, or open text inputs; no camera use without guardian-aware consent copy.
- `localStorage` holds only mode, accessibility preferences, and mock progress. No personal data. Camera frames are never persisted or transmitted.

---

## EXECUTION CHECKLIST
1. Tokens (`globals.css`, `tailwind.config.js`) and contrast matrix.
2. `AgeModeContext`, `useAgeMode`, no-flash bootstrap, persistence, `<ModeToggle />`, role switcher, accessibility preferences.
3. `/lib/motion.ts`, `/lib/feedback.ts`, `/lib/adaptive.ts`, i18n dictionaries (`en-PH`, `fil-PH`), mock data, sign manifest, `MockSignRecognizer`.
4. Shared primitives, `<SignClip />`, then the adaptive components.
5. `<SignPracticeCamera />`, feedback UI, scenario engine.
6. Gamification, adaptive engine tests, dashboards.
7. Compose the pages with all states.
8. Write `docs/quality-evaluation.md`, then run the audit below and fix everything before reporting.

## ACCEPTANCE CRITERIA (report pass/fail for each)
- [ ] No hex codes or `[Npx]` values in `/components` and `/pages` (grep returns zero).
- [ ] Toggling modes changes radii, borders, type scale, touch targets, nav layout, sign-player layout, and motion with no remount and no lost camera state.
- [ ] **The entire app is fully usable with sound muted and no audio output; there is no TTS or audio dependency anywhere.**
- [ ] Every feedback, error, and success event has a visual cue, and haptics are optional and feature-detected.
- [ ] Every sign clip has captions/gloss, loop, speed, and mirror controls.
- [ ] Camera denied, camera lost, low confidence, and offline paths all work with a no-camera fallback.
- [ ] Feedback copy contains no "wrong/failed/incorrect," and no red-only states.
- [ ] Contrast matrix all ≥ 4.5:1 (captions ≥ 7:1); control heights Kids ≥ 52px, Adult ≥ 44px.
- [ ] Reduced motion → Kids shows only opacity fades; no flash > 3/sec.
- [ ] Layouts verified at 375, 390, 430px with no horizontal scroll or content under the nav.
- [ ] Full keyboard walkthrough on all pages; axe zero serious/critical in both modes.
- [ ] Adaptive engine unit tests pass; learner, educator, and family dashboards render with text/table alternatives.
- [ ] TypeScript strict with no `any`; performance budgets met.

## OUTPUT FORMAT
(1) File tree, (2) complete code for each file with no "…rest unchanged" placeholders, (3) a short list of assumptions, deviations, and every `PROTOTYPE:` stub with its production path, (4) the acceptance checklist with results.

## OUT OF SCOPE
Real backend/auth, a trained recognition model, real FSL clip production, real curriculum, and palette changes beyond the tokens above.