You are an expert Frontend & Creative Technologist specializing in SVG vector graphics, HTML5 Canvas, WebRTC, CSS architecture, Vanilla JavaScript, and accessibility-first UI engineering.

### GOAL:
Build a standalone, single-file HTML/CSS/JS web application component that implements a zero-dependency, steady AR Practice Stage for a Filipino Sign Language (FSL) gamified learning application using a vector-based classroom image background.

---

### CORE REQUIREMENTS & SPECIFICATIONS:

#### 1. DOM Architecture & Layout Strategy
- **Responsive 2-Panel Layout (`.playgrid`):**
  - Left Column / Stage Area (`.cam`): Houses the 16:10 / 4:3 camera stage container (`#stage`), action buttons (`#signBtn`, `#camBtn`), and prototype simulation state toggles (`.demo`).
  - Right Column / Sidebar (`.stack`): Scenario progress panel, active level badge, scenario objective banner (`.objective`), hint container, and adaptive feedback container (`#fb`).
- **Stage Container (`.stage`):**
  - Layered viewport stacking order:
    1. Base layer (`.bg-image`): Inline SVG vector vector artwork reproducing a detailed classroom environment (wall clock, green chalkboard with chalks & eraser, wooden bookshelf with books & potted plant, teacher's desk with laptop & pencil cup, wall chart poster with star pins).
    2. Video layer (`#vid`): Mirror webcam feed (`transform: scaleX(-1)`, opacity `0.85`, WebRTC `navigator.mediaDevices.getUserMedia`).
    3. Canvas layer (`#arc`): Translucent overlay for drawing dynamic NPC character animations and speech pointer positioning.
    4. Zone boundary (`.zone`): Dashed cyan bounding box labeled "Sign Zone".
    5. Hand Landmark overlay (`#hand`): 21-point MediaPipe-style hand skeleton rendered via SVG lines and joint circles.
    6. HUD layer: Top context chips (`.hud`), status pill (`#status`), speech bubble (`#bubble`), bottom objective banner (`.objbar`), and countdown/timer overlays (`.count`, `.timer`, `.spin`).

---

#### 2. Vector Background Artwork (SVG Specifications)
- ViewBox: `0 0 1000 450` with `preserveAspectRatio="xMidYMid slice"`.
- Wall & Floor Base: Warm beige wall (`#F5E8C7`) and brown floor (`#91603A`).
- Wall Clock: Center-aligned top clock at coordinates `(500, 70)` with dark trim, inner dash ticks, and hour/minute hands pointing to ~1:22.
- Center Chalkboard: Dark green board (`#1E523A`) in a wooden frame (`#BF8A52`) with chalk ledge, pinned paper note sheet, colorful chalk sticks, and wooden eraser.
- Wall Poster (Left): Mounted chart sheet with star/badge pin accents in yellow (`#FFCB4D`) and red (`#FF5B62`).
- Bookshelf (Right): Multi-shelf cabinet with colorful books, stacked volumes, and a potted succulent plant (`#66BB6A`).
- Teacher's Desk (Left): Wood desk (`#8D5B28`) with an open laptop (`#CBD5E1`), stack of paper sheets, pencil cup with pens, and an orange desk chair (`#FF8A65`).

---

#### 3. Dynamic NPC Rendering & Speech Bubble Engine
- **Canvas Rendering Loop (`renderFrame`):**
  - Draw an animated NPC guard/teacher character ("Guard Ramon") on the right side of the stage using HTML5 Canvas 2D context.
  - Animate character body bobbing and mood states:
    - `idle`: Gentle breathing animation.
    - `happy`: Bounce animation with expanded smile upon successful sign recognition.
    - `confused`: Slight head tilt and frowning mouth shape on unrecognized gesture.
  - Calculate NPC head screen coordinates (`AR.head`) in real time and anchor the HTML speech bubble (`#bubble`) dynamically above the character's head with horizontal boundary constraints.

---

#### 4. Gesture State Machine & Simulated Recognition Workflow
Implement an async gesture recognition loop triggered by the `#signBtn` button:
- **Phases:**
  1. `idle`: Displays objective prompt and "Ready when you are" status card.
  2. `count`: 3-second animated countdown overlay with pop keyframes (`.count`).
  3. `record`: 1.3-second simulation timer bar (`.timer`). Hand skeleton landmark lines shift dynamically to simulate active gesture tracking.
  4. `recognize`: Brief 800ms loading spinner overlay (`.spin`).
  5. `result`: Evaluates attempt based on selected prototype response (`ok`, `wrong`, or `low`):
     - **Success (`ok`):** Green theme (`.fb.ok`), NPC happy animation, "+50 XP" award, and "Next Sign →" button.
     - **Mismatch (`wrong`):** Red theme (`.fb.bad`), NPC confused animation, target vs. observed sign comparison, and "Try again" option.
     - **Low Clarity (`low`):** Amber theme (`.fb.warn`), requests user to center hand inside the sign zone.

---

#### 5. Hand Landmark Skeleton Overlay (`#hand`)
- Define 21 hand joint coordinates matching standard MediaPipe Hands topology:
  - Joint 0: Wrist
  - Joints 1-4: Thumb
  - Joints 5-8: Index finger
  - Joints 9-12: Middle finger
  - Joints 13-16: Ring finger
  - Joints 17-20: Pinky finger
- SVG `<line>` elements connect adjacent joints; `<circle>` elements mark joint nodes with enlarged fingertips (`r="2.6"`).
- Zone feedback styling: Hand skeleton lines and nodes glow green (`#5BF0BF`) on success or red (`#FF8F94`) on error.

---

#### 6. WebRTC Webcam Integration (`toggleCam()`)
- Connect live camera feed via `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })`.
- Mirror video element horizontally (`transform: scaleX(-1)`).
- Graceful fallback: If camera access is blocked or unavailable, alert the user and maintain steady vector background mode.

---

#### 7. Styling & Theming Tokens
- **Font Families:** Import Google Fonts `Bricolage Grotesque` (headings) and `Figtree` (body).
- **Color Palette:**
  - Background: `#0E1125` (navy dark mode surface: `#171B38`, surface border: `#2B3161`).
  - Primary Accent: `#7189FF` (lavender blue), `#FFCB4D` (sun yellow).
  - Status Indicators: `#5BF0BF` (success green), `#FF8087` (error red), `#FFC53D` (warning amber).
- Glassmorphism overlays (`backdrop-filter: blur(8px)`), smooth CSS transitions, and rounded pill badges.

---

### DELIVERABLE FORMAT:
Output a single, self-contained `index.html` file containing embedded `<style>` and `<script>` blocks. The file must run directly in any browser without external build steps or external dependencies.
