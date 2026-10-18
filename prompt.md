You are an expert Lead EdTech QA Engineer, Principal UI/UX Architect, and Senior JavaScript Auditor.

### OBJECTIVE:
Perform a full, rigorous quality assurance audit, sanity check, and coherence validation across the entire live Pikipit codebase (`index.html`, `app.js`, `styles.css`). Your goal is to identify, document, and fix EVERY inconsistency, UI visual glitch, broken state transition, functional anomaly, edge-case bug, or narrative/design "plot hole" before we pitch the prototype.

Leave NO stone unturned. Every single feature across all three major user persona modes (Kids Mode, Adult Mode, Instructor LMS Mode) must function seamlessly, cohesively, and reliably.

---

### STEP 1: DUAL-ENGINE & TRI-INTERFACE COHERENCE AUDIT

1. **Kids Mode (Ages 4–12):**
   - Verify that playful typography (`Fredoka`), vibrant color accents (Amber/Orange/Cyan), and mascot presence (*Piki the Pipit*) are consistently applied.
   - Confirm that all low-cognitive-load messaging, gamified star rewards, and positive reinforcement popups render without overflowing or breaking layout on small viewports.

2. **Adult / Professional Mode (Ages 13+):**
   - Verify that clean, efficiency-first typography (`Figtree`/`Inter`) and contextual dark/light slate palettes trigger cleanly upon toggling.
   - Confirm that practical real-world scenario categories (Medical, Emergency, Service Desk, Workplace FSL) reflect professional tone, precise feedback metrics (speed in seconds, accuracy %), and realistic dialogue flows.

3. **Instructor Mode (Google Classroom LMS):**
   - Confirm that switching `S.role` to `'instructor'` completely replaces the learner interface with the Google Workspace / Classroom-inspired layout.
   - Verify that all 4 sub-tabs (**Stream**, **Classwork**, **People**, **Grades**) render smoothly with proper active tab styling (`#00796B` Teal accents, material design pills, matrix grid table).
   - Test the video submission review drawer: clicking a student cell must open the simulated AR video playback modal, display AI joint-precision metrics, allow numeric score adjustments, and return feedback to state cleanly.

---

### STEP 2: STATE & ARCHITECTURE INTEGRATION VALIDATION

1. **Global State Integrity (`S` Object):**
   - Audit state variables (`S.role`, `S.tab`, `S.points`, `S.streak`, `S.done`, `S.stars`, `S.resume`). Ensure switching between tabs or switching viewports (Mobile frame vs. Desktop widescreen) NEVER corrupts or resets active state unprompted.
   - Test role-switching toggles (`Learner` <-> `Instructor`) and ensure sub-navigation menus (`desktopNav`, `mobileBottomNav`) dynamically rebuild to display appropriate options for the active role.

2. **Scenario Progress & Completion State Machine:**
   - Trace scenario progression from Level 1 ("Gate Hello") through Level 5 ("Emergency").
   - Confirm that completing a scenario updates `S.done[sc.id] = true`, awards points/XP correctly, updates badge progress, and unlocks the next scenario in the Interactive Town Map (`renderTownMapSVG()`).
   - Check for progression "plot holes": ensure locked scenarios cannot be launched prematurely unless `S.unlockAll` is explicitly active.

3. **Spatial AR Stage State Loop (`P` Object & Canvas Engine):**
   - Inspect the gesture simulation loop: `idle` -> `count` (3s countdown) -> `record` (1.3s timer bar) -> `recognize` (800ms spinner) -> `result` (`ok`, `wrong`, or `low`).
   - Verify that `P.run` cancellation tokens operate correctly so rapidly clicking "Sign Now" or exiting mid-recording does NOT create dangling async timers, orphaned animation frames, or console memory leaks.
   - Confirm that WebRTC camera toggles (`toggleCam()`) handle stream initialization and stream termination (`track.stop()`) gracefully, falling back to steady classroom SVG mode without throwing unhandled promises.

---

### STEP 3: UI/UX, RESPONSIVENESS & ANOMALY SWEEP

1. **Responsive Viewport Frame (`#frameWrapper`):**
   - Test viewport modes (`Mobile` 384px frame vs. `Desktop` multi-panel container). Ensure no text overflow, clipped modal dialogs, broken rounded corners, or overlapping z-index layers occur in either view.
   - Verify that touch targets across buttons, tab items, and scenario nodes maintain minimum sizes (48px on mobile, 40px+ on desktop).

2. **SVG & Graphic Rendering Consistency:**
   - Inspect the vector classroom background in `#stage`: confirm proper aspect ratio fitting (`preserveAspectRatio="xMidYMid slice"`), valid SVG tags, correct element positioning (wall clock, chalkboard, teacher desk, bookshelf), and high visual contrast against dark mode containers.
   - Verify that dynamic NPC elements (speech bubble pointer `#bubble`, canvas character bobs, status indicators) stay correctly anchored across screen resizes.

3. **Accessibility & Visual Contrast Sweep:**
   - Confirm high-contrast color pairings across light and dark modes (Deaf/Hard-of-Hearing focus: zero audio dependence, high-visibility cyan sign zone, clear status icons `✓` / `✕`).
   - Verify that aria tags (`aria-pressed`, `aria-live="polite"`) and feedback banners (`#feedbackBanner`) behave predictably.

---

### EXECUTION INSTRUCTIONS FOR AGENT:

1. Scan `index.html`, `app.js`, and `styles.css` line-by-line against all validation points listed above.
2. Fix any discovered bugs, broken selectors, unhandled state edge cases, or styling misalignment directly in code.
3. Output a structured **Audit & Resolution Summary Report** detailing:
   - **Anomalies Detected & Fixed:** Specific line items corrected across layout, state logic, and UI bindings.
   - **Feature Coherence Checklist:** Status verification for Kids Mode, Adult Mode, Instructor LMS Mode, and AR Stage.
   - **Pitch Readiness Confirmation:** Final verdict confirming zero console errors and 100% prototype stability.
