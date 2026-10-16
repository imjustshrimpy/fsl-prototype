# Talinturo Quality Evaluation & ISO/IEC 25010 Benchmark

This report provides the formal product quality evaluation for the **Talinturo Filipino Sign Language (FSL) Interactive Prototype with Age-Adaptive Modes**.

Following **ISO/IEC 25010:2023** (Systems and software Quality Requirements and Evaluation — Product Quality Model), Accessibility is evaluated both as an integral facet of *Interaction Capability (Inclusivity)* and as a dedicated primary evaluation pillar in alignment with Deaf and Hard-of-Hearing (DHH) user requirements.

---

## 1. ISO/IEC 25010 Quality Model Matrix

| Characteristic / Sub-characteristic | Prototype Evaluation Target & Criteria | Measured Evidence & Result | Status |
|---|---|---|---|
| **Functional Suitability**<br>· Completeness<br>· Correctness | Complete interactive learning loop: lesson demonstration, "Your turn" camera / self-check practice, non-judgmental feedback, XP/streak progression, 4 multi-turn scenarios, role dashboards. | Vitest suite (`src/lib/adaptive.test.ts`) passes 100%. All Stage 2–4 flows fully navigable and interactive. | **PASS** |
| **Interaction Capability & Usability**<br>· Appropriateness<br>· Learnability<br>· User Error Protection | Plain-language UI copy (grade 5 reading level), no auditory dependencies, single central state avoiding remounts on mode toggle. | Dual Kids and Adult modes verified. Parental gate prevents accidental mode switching by young learners. | **PASS** |
| **Inclusivity & Accessibility**<br>· DHH Primary Access<br>· Visual Equivalence<br>· WCAG 2.1 AA/AAA | Zero reliance on audio/TTS. Every cue has visual shape + icon + text. Captions contrast ≥ 7:1. Touch targets Kids ≥ 52px, Adult ≥ 44px. Focus indicators ≥ 3:1. | Contrast matrix verified in `docs/contrast-matrix.md`. Touch targets adhere strictly to declared tokens. | **PASS** |
| **Performance Efficiency**<br>· Time Behavior<br>· Resource Utilization | Lightweight vector representations for instant rendering offline without buffering. Fast mode switching under 50ms. | Initial build gzipped bundle budget ≤ 250 KB. Fast instant reactivity via CSS custom properties. | **PASS** |
| **Reliability**<br>· Fault Tolerance<br>· Graceful Degradation | Camera denied, camera lost, low lighting, or device lack of vibration degrades gracefully to self-check mode. | Tested fallback path (`startCamera` error triggers self-check mode). Hardware vibration feature-detected. | **PASS** |
| **Child Safety & Privacy**<br>· Data Minimization<br>· Guardian Awareness | Zero camera video streaming or recording. Frames analyzed on-device only. No third-party ads or external links in Kids Mode. | Verified `getUserMedia` uses local preview only with explicit permission pre-prompt. | **PASS** |

---

## 2. DHH-Specific Heuristic Inspection Checklist

| Checkpoint | Requirement | Result |
|---|---|---|
| **Auditory Independence** | App operable with sound muted and no audio hardware present. | **PASS** (Zero audio requirements; sound effects disabled by default, zero TTS). |
| **Sign Visibility** | Video stage preserves upper body, face, and hands without cropping or occluding UI elements. | **PASS** (Framing guide and stage dimensions sized to preserve upper torso and hands). |
| **Metaphor Audit** | No auditory idioms in UI copy (e.g., "listen", "hear"). | **PASS** (Replaced by "watch", "show", "sign", "gayahin", "panoorin"). |
| **Non-Judgmental Feedback** | No red-alone error states, no harsh buzzer, no "Wrong" or "Failed". | **PASS** (Uses "Almost! Try turning your palm toward your chest" with yellow/green cues). |
| **Motion Sensitivity** | Flash rates strictly ≤ 3 flashes/second; reduced motion override replaces springs with gentle fades. | **PASS** (Adheres to CSS `prefers-reduced-motion` and in-app override). |

---

## 3. Co-Designed User Feedback Instrument (Learner & Instructor)

All evaluation involving Deaf participants must be co-designed with and reviewed by the Deaf community, with informed consent (and guardian consent for minors).

### A. English (`en-PH`)
1. **Clarity of Signs:** "How easy was it to watch and copy the hand shapes?"
   - [ ] Very Easy  [ ] Easy  [ ] A Little Hard  [ ] Hard
2. **Camera & Self-Check:** "Did you like practicing with the camera or checking your own signs?"
   - [ ] Loved the camera  [ ] Liked self-check  [ ] Liked both
3. **Pacing & Speed:** "Did the slow speed (0.75x) help you practice tricky signs?"
   - [ ] Yes, very helpful  [ ] Regular speed was fine
4. **Suggestions:** "What other signs would you like to practice with Talinturo?"
   - *[Open text response]*

### B. Filipino (`fil-PH`)
1. **Kalinawan ng Senyas:** "Gaano kadaling sundan at gayahin ang mga hugis ng kamay?"
   - [ ] Napakadali  [ ] Madali  [ ] Medyo Mahirap  [ ] Mahirap
2. **Kamera at Sariling Suri:** "Nasiyahan ka ba sa pagsasanay gamit ang kamera o ang sariling suri?"
   - [ ] Mas gusto ang kamera  [ ] Mas gusto ang sariling suri  [ ] Parehong maganda
3. **Bilis ng Video:** "Nakatulong ba ang mabagal na bilis (0.75x) sa mahihirap na senyas?"
   - [ ] Oo, malaking tulong  [ ] Ayos lang ang karaniwang bilis
4. **Mungkahi:** "Anong iba pang mga senyas ang nais mong idagdag sa Talinturo?"
   - *[Lugar para sa tugon]*

