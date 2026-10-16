# Talinturo: Adaptations to the Build Spec

This file records every change, assumption, and deviation from the original brief. Update it as decisions are made.

## 1. Build approach

The spec covers about 60 files. It is built in six layers. Each layer runs and is tested before the next begins.

| Layer | Scope | Done when |
|---|---|---|
| 1. Foundation | `globals.css` tokens (kids, adult, high-contrast), `tailwind.config.js`, `docs/contrast-matrix.md`, `AgeModeContext`, no-flash bootstrap, `ModeToggle`, accessibility preferences, role switcher | Mode switch changes all tokens with no remount |
| 2. Libraries | `lib/motion.ts`, `lib/feedback.ts`, `lib/adaptive.ts` (+ tests), i18n (`en-PH`, `fil-PH`), `data/sign-manifest.ts`, `MockSignRecognizer` | Unit tests pass |
| 3. Components | Primitives, `SignClip`, `AdaptiveHeroCard`, `StatGrid`, `LearningNodeCard`, `BottomNavPill` | Demo route shows both modes |
| 4. Camera and scenarios | `SignPracticeCamera`, feedback UI, scenario engine, 4 sample scenarios | Denied, lost, and low-confidence paths work |
| 5. Gamification and pages | XP, streaks, badges, dashboards, 5 pages with all states | Every page has loading, empty, error, offline |
| 6. Evaluation | `docs/quality-evaluation.md`, audit, acceptance checklist | Checklist reported pass/fail |

## 2. Token and contrast adaptations

Ratios below were computed with the WCAG relative-luminance formula, not estimated.

| Pair | Ratio | Result | Decision |
|---|---|---|---|
| `text-primary` on `surface-app` | 16.43 | Pass | Use as is |
| `text-primary` on `surface-card` | 17.74 | Pass | Use as is |
| `text-secondary` (#6B7280) on `surface-app` | 4.48 | **Fail** (just under 4.5) | Add `text-secondary-on-app` using #4B5563 (7.00) |
| `text-secondary` on `surface-card` | 4.83 | Pass | Use as is |
| White on `brand-blue` | 6.51 | Pass | `on-brand-blue` = white |
| `text-primary` on `brand-blue` | 2.72 | Fail | Never use dark text on blue |
| `text-primary` on `brand-yellow` | 11.42 | Pass | `on-brand-yellow` = text-primary |
| `text-primary` on `brand-green` | 6.86 | Pass | `on-brand-green` = text-primary |
| `text-primary` on `brand-orange` | 5.82 | Pass | `on-brand-orange` = text-primary |
| `text-primary` on `brand-pink` | 8.00 | Pass | `on-brand-pink` = text-primary |
| White on `brand-green` / `brand-orange` | 2.59 / 3.05 | Fail | Never use white on these |
| `brand-green` as text on white | 2.59 | Fail | Brand colors are fills only, except blue |
| `brand-blue` as text on white | 6.51 | Pass | Allowed as link/accent text |
| White caption on #111827 | 17.74 | Pass (≥ 7:1) | Caption token pair |
| `gray-900/10` border on card | ~1.2 | **Fail** (needs ≥ 3:1) | Kids `border-strong` must be a solid color (see below) |

**Resolved:** `border-strong` = `#6B7280` (4.48:1 on `surface-app`, 4.83:1 on `surface-card`) and `border-subtle` = `#82868F` (3.38:1 / 3.65:1), so both clear ≥ 3:1. Locked in `globals.css` and recorded in `docs/contrast-matrix.md` §4. The previous `border-subtle` (`#D1D5DB`, 1.36:1) did not meet the target.

**Rule kept:** hex values appear only in `globals.css`. The contrast test reads values from that file, so the matrix cannot drift from the tokens.

## 3. Assumptions (confirm or correct)

| Item | Assumed | If different |
|---|---|---|
| Framework | Vite + React 19 (confirmed) | Next.js changes the no-flash bootstrap (inline script in `layout`/`_document`) |
| Language | TypeScript strict, no `any` | n/a |
| Styling | Tailwind CSS 4, configured in CSS (`@theme`, `@utility`); no `tailwind.config.js` | n/a |
| Animation | Framer Motion | n/a |
| Tests | Vitest (only `lib/adaptive.test.ts`); Testing Library and axe-core not installed yet | n/a |
| Font | One sans-serif family (Nunito) with system fallbacks | Name your preferred font |
| Package manager | npm | n/a |

## 4. Deviations and clarifications

- **Duplicate brief:** the spec was received twice with identical content, so it is treated as one brief.
- **Camera-to-feedback latency target:** the spec says "define". Proposed: ≤ 500 ms on the mock recognizer, to be re-measured with a real model.
- **`--sign-video-min-height`:** the spec says "define". Implemented: Kids `16rem`, Adult `12rem`, set as tokens.
- **Worker boundary:** the mock recognizer runs behind a Web Worker (`recognizer.worker.ts`, bridged by `recognizer.ts`) so the real model can replace it without changing callers. The bridge falls back to an in-process service when Workers are unavailable.
- **Parental gate (Stage 7):** stubbed as a press-and-hold control, marked `// PROTOTYPE:` with the production path (profile-driven mode plus a guardian-set gate).

## 5. `PROTOTYPE:` stub register (filled in as built)

| Stub | Production path |
|---|---|
| Auth and profile | Real identity provider; mode derived from the learner profile |
| Backend and progress | API with per-role access control |
| `MockSignRecognizer` | Landmark-based classifier (hand, face, and pose landmarks) behind `SignRecognizer` |
| Sign clips and glosses | Produced and validated by Deaf FSL signers and instructors |
| CSV export | Server-generated export with privacy review |
| Parental gate | Guardian-controlled profile setting |

## 6. Non-negotiables carried forward

1. No sound or speech dependency anywhere; every cue has a visual equivalent.
2. No invented FSL content; placeholders are labeled, with the dev banner visible.
3. No hex codes, pixel values, or arbitrary Tailwind values outside `globals.css`.
4. No `mode === 'kids' ? … : …` on raw values; use CSS variables or `useAgeMode()`.
5. All UI copy lives in the i18n dictionary (`en-PH`, `fil-PH`), at about grade 5 reading level.
6. Feedback copy never uses "wrong", "failed", or "incorrect".

## 7. Decisions needed before Layer 1 (resolved)

- [x] Framework: **Vite** (React 19). No Next.js, so the anti-flash bootstrap stays an inline `<script>` in `index.html`.
- [x] Tailwind version: **4** (`@tailwindcss/vite`; tokens live in `globals.css` under `@theme`/`@utility`, no `tailwind.config.js`).
- [x] Font: **Nunito** with system fallbacks (`--font-family-body`), loaded from Google Fonts with `font-display: swap`.
- [x] `--sign-video-min-height`: Kids `16rem`, Adult `12rem` (set as tokens).