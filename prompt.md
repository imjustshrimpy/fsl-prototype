# TASK: Implement Stepper Progress Bar, Customizable Onboarding, and Instructor Mode in Talinturo

## Project Title
**TALINTURO: Development of a Cross-Platform Age-Adaptive Gamified Filipino Sign Language Communication Simulation Application for Diverse Learners Using MediaPipe Hand Landmarks, Random Forest Classification, Ultralytics YOLO26, and Scenario Engine**

---

## Brand & Design System Compliance
Maintain the official Talinturo design system:
- **Primary Brand Colors:**
  - Dark Charcoal: `#393939` (Borders, primary text, node outlines)
  - Electric Blue: `#1A3FBF` (Active step node background, primary CTA, active tabs)
  - Vibrant Orange: `#F66233` (Completed step checkmark fill, active connector bar line)
  - Bright Yellow: `#F3C730` (XP / Distinction badges, star highlights)
  - Cream Neutral: `#EADFCE` (Main background surface)
- **Typography:**
  - Headings: `All Round Gothic Bold`
  - Body & Labels: `Open Sans Regular`
- **Layout Grid Specs:**
  - Outer Padding: `24px`
  - Stepper Node Size: `36px × 36px` (Desktop) / `32px × 32px` (Mobile)
  - Connector Line Thickness: `4px`
  - Minimum Touch/Click Targets: `44px × 44px` (Adult/Instructor) / `56px × 56px` (Kids)

---

## Component Specification: Multi-Step Stepper Progress Bar

Implement a reusable Stepper Progress Bar component (`StepperProgress.jsx` / `StepperProgress.tsx`) at the top of the Onboarding Flow that updates dynamically across 6 steps:

### Node States & Visual Styling
1. **Completed Steps (1 to Active - 1):**
   - **Icon/Node:** Circle with thick `#393939` border, filled with `#F66233` (Vibrant Orange), displaying a white Checkmark (`✓`).
   - **Connecting Bar (Left):** Solid `#F66233` line connecting to the previous node.
   - **Step Label:** Bold `#F66233` text below node (e.g., `Role Selection`, `Focus`, `Commitment`).
2. **Active Current Step:**
   - **Icon/Node:** Circle with thick `#393939` border, filled with `#1A3FBF` (Electric Blue), displaying the step number in white bold text (e.g., `1`, `2`, `3`).
   - **Connecting Bar (Right):** Unfilled Light Gray (`#CCCCCC` or `#D9D9D9`) line.
   - **Step Label:** Bold `#1A3FBF` text below node.
3. **Upcoming Uncompleted Steps:**
   - **Icon/Node:** Circle with thin `#393939` border, filled with white/neutral background, displaying the step number in muted gray text.
   - **Connecting Bar:** Unfilled Light Gray line.
   - **Step Label:** Muted text (`#393939` at 50% opacity).

### Stepper Data Structure
```json
[
  { "step": 1, "label": "Role Selection" },
  { "step": 2, "label": "Focus" },
  { "step": 3, "label": "Commitment" },
  { "step": 4, "label": "Strictness" },
  { "step": 5, "label": "Sensory" },
  { "step": 6, "label": "Setup Complete" }
]