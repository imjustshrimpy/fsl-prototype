# AGENTS.md — Talinturo FSL Prototype

Clickable React prototype for a Filipino Sign Language (FSL) learning platform with two age-adaptive modes (Kids / Adult). Frontend only; backend, auth, and the ML recognizer are mocked behind typed interfaces.

## Read first
- `prompt.md` is the authoritative product spec: feature requirements, `PROTOTYPE:` stub conventions, and the acceptance checklist. Read it before building or changing behavior.
- `docs/contrast-matrix.md` and `docs/quality-evaluation.md` are committed deliverables; keep them valid when colors/behavior change.

## Commands
- `npm run dev` — Vite dev server.
- `npm run build` — `tsc && vite build` (type-check is part of the build; there is no separate typecheck step). Output goes to the committed `dist/`.
- `npm test` — `vitest run`. Single file: `npx vitest run src/lib/adaptive.test.ts`.
- `npx tsc --noEmit` — type-check only.
- There is **no** lint, format, or `typecheck` script, and no CI. Do not invent `npm run lint`.

## Hard conventions (easy to violate)
- **Tokens only.** No hex codes and no arbitrary Tailwind values (`[72px]`, `bg-[#...]`) anywhere in `src/components/**` or `src/pages/**` (acceptance grep must return zero). All color/size/radius/spacing/duration values live only in `src/globals.css`: define the token, map it in `@theme`, then consume via the mapped utility or the custom `@utility` classes (`rounded-card`, `rounded-control`, `min-h-touch`, `min-h-node`, `min-h-nav-item`, `border-adaptive`, `text-adaptive-*`, `pad-adaptive-control`, `focus-ring-adaptive`).
- **No JSX string literals.** All UI copy lives in `src/i18n/en-PH.ts` and `src/i18n/fil-PH.ts`, read via `t('key.path')`. Default locale `en-PH`.
- **No inline mode branching on raw values.** Do not scatter `mode === 'kids' ? … : …` over literal styling. Mode differences resolve through CSS variables (`data-age-mode` overrides in `globals.css`) or `useAgeMode()` typed config.
- **DHH-first.** Nothing may depend on sound/speech/TTS; every cue has a visual equivalent. Haptics are optional and feature-detected. Do not use hearing metaphors ("listen"/"hear") in copy or icons.
- **Never invent FSL content.** Sign clips/glosses/descriptions are placeholders sourced from `src/data/sign-manifest.ts`. Stub anything mocked with a `// PROTOTYPE:` comment naming the production approach.

## Architecture
- Entry chain: `index.html` → `src/main.tsx` (`I18nProvider` > `AgeModeProvider` > `AppContent`) → `src/App.tsx`.
- `index.html` runs an inline anti-flash bootstrap that sets `data-age-mode`, `data-high-contrast`, `data-reduced-motion`, `data-text-size` from `localStorage` **before** React mounts. If you add a persisted preference, update both this script and `AgeModeProvider` (keys are `talinturo.*`).
- Mode is applied via `document.documentElement.dataset.ageMode`; CSS overrides drive all visual differences. `useAgeMode()` (`src/context/AgeModeContext.tsx`) exposes `mode`, `navItems`, `activeTab`/`setActiveTab`, `accessibility`, and `signPlayerDefaults`.
- **No router.** Screens switch on `AgeModeContext.activeTab`; `App.tsx` also holds a local `activeLessonSign` to show `LessonPage`.
- Recognition runs in a Web Worker: core mock logic in `src/lib/recognizerCore.ts`, message types in `src/lib/recognizerProtocol.ts`, worker entry `src/lib/recognizer.worker.ts`, and the `mockSignRecognizer` bridge (with an in-process fallback) in `src/lib/recognizer.ts`. Force dev outcomes with `setForcedOutcome`. Other mock boundaries: `src/data/mock-data.ts`, `src/data/sign-manifest.ts`.
- Pure logic lives in `src/lib/` (`adaptive.ts`, `motion.ts`, `feedback.ts`). `@` is aliased to `./src` in `vite.config.ts` (but most imports are relative).

## Testing
- Only `src/lib/adaptive.test.ts` exists. Vitest is configured inline in `vite.config.ts` with `globals: true` and `environment: 'node'`.
- `@testing-library/*`, `jsdom`, and `axe-core` are **not installed** (despite being named in `prompt.md`). Component/DOM tests require adding those deps and a jsdom environment first.

## Repo gotchas
- No `.gitignore`; `node_modules/` (~8k files) and `dist/` are tracked. `git status` is extremely noisy — never run broad `git add -A`/`git add .`, and never delete `node_modules/`.
- `legacy/` is an earlier vanilla HTML/CSS/JS prototype, excluded from the Vite build (tsconfig `include` is only `src`). Do not wire it into the app.
- No README; `prompt.md` is the spec.
