# Talinturo Interface Walkthrough

This document explains the current user flow, key screens, and the main functions behind the app as implemented in the current React prototype.

## 1. App startup and boot flow

The app bootstraps through the root app shell in [src/App.tsx](../src/App.tsx).

### Entry flow

1. The app loads and checks whether onboarding has already been completed.
2. If onboarding is incomplete, the user sees [src/pages/OnboardingPage.tsx](../src/pages/OnboardingPage.tsx).
3. Once a user selects a mode and role, the app calls `completeOnboarding(mode, role)`.
4. That handler stores the chosen mode and role, sets the initial tab to `home`, and marks onboarding as done in localStorage.
5. If onboarding is already complete, the app moves into the main interface.

### Key functions in the root app

- `completeOnboarding(mode, role)`
  - Sets the age mode and user role.
  - Resets the active tab to `home`.
  - Persists the onboarding completion flag in localStorage.

- `restartOnboarding()`
  - Clears the active lesson state.
  - Removes the saved onboarding flag.
  - Returns the user to the onboarding screen.

- `renderMainScreen()`
  - Chooses the visible screen based on role and current tab.
  - Educator mode renders the classroom dashboard; learner mode renders lesson, scenario, progress, or settings content.

### Main screen behavior

- If there is an active lesson selected, the app shows [src/pages/LessonPage.tsx](../src/pages/LessonPage.tsx) instead of the normal tab content.
- After a lesson completes, it clears the active lesson and returns the user to `home`.

---

## 2. Global app state and role/mode logic

State is managed through [src/context/AgeModeContext.tsx](../src/context/AgeModeContext.tsx).

### State values

- `mode` = `kids` or `adult`
- `role` = `learner`, `educator`, or `family`
- `activeTab` = the current page or top-level navigation target
- `accessibility` = saved preferences for captions, motion, contrast, text size, and optional sound

### Mode and role toggles

- `setMode(newMode)`
  - Updates the age-mode state.
  - Persists it to `localStorage`.
  - Writes the CSS dataset value to `document.documentElement`.

- `setRole(newRole)`
  - Updates the user role.
  - Persists it to `localStorage`.

- `updateAccessibility(updates)`
  - Merges new accessibility settings into the current state.
  - Saves the updated preferences to localStorage.
  - Applies theme-related CSS dataset changes for contrast, motion reduction, and text scaling.

### Navigation configuration

The provider builds different nav item arrays depending on the active role and mode:

- `KIDS_NAV` for child learner mode
- `ADULT_NAV` for regular adult learner mode
- `EDUCATOR_NAV` for instructor mode

The current code ensures that educator mode uses a classroom-oriented nav bar rather than the learner-oriented route set.

---

## 3. Interface walkthrough by screen

## 3.1 Onboarding screen

File: [src/pages/OnboardingPage.tsx](../src/pages/OnboardingPage.tsx)

This is the first screen shown when the app is new.

### What it does

- Presents three role/mode choices:
  - child learner
  - adult learner
  - instructor / educator
- Lets the user select one option.
- Enables the Continue button only after a choice is selected.

### User flow

- Selecting a card updates local UI state.
- Clicking Continue calls `onComplete(mode, role)` from the parent app.

---

## 3.2 Home screen

File: [src/pages/HomePage.tsx](../src/pages/HomePage.tsx)

This is the main learner landing screen.

### Purpose

- Displays the practice and learning overview.
- Lets the user select a sign lesson to open the lesson detail experience.
- Provides a direct route into scenarios from the home view.

### Main interaction

- `onSelectSign(sign)` triggers the lesson flow.
- `onOpenScenarios()` changes the active tab to the scenarios view.

---

## 3.3 Lesson page

File: [src/pages/LessonPage.tsx](../src/pages/LessonPage.tsx)

This is the active instruction screen for a selected sign.

### Purpose

- Displays the selected sign target.
- Shows a placeholder sign video or sign playback preview.
- Provides evaluation and feedback interaction for practicing the selected sign.

### Main functions

- `onBack()` closes the lesson screen and returns to the prior tab.
- `onCompleteLesson()` clears the active lesson and sets the app back to the home tab.

---

## 3.4 Scenario page

File: [src/pages/ScenariosPage.tsx](../src/pages/ScenariosPage.tsx)

This is the contextual learning flow for practical dialogue scenarios.

### Purpose

- Presents realistic everyday and emergency sign situations.
- Walks the user through scenario steps.
- Evaluates whether the expected sign is being practiced correctly in context.

### Core idea

- Scenario data comes from the mock scenario dataset in [src/data/mock-data.ts](../src/data/mock-data.ts).
- The specific artificial sign practice data is separated into typed mock content and scenario structures.

---

## 3.5 Progress page

File: [src/pages/ProgressPage.tsx](../src/pages/ProgressPage.tsx)

This is the most feature-rich screen and handles all role-specific progress views.

### Role-based rendering

#### Learner mode

- Shows a summary of progress and badge progress.
- Displays an accuracy chart or table toggle.
- Lists competency badges.

#### Family mode

- Displays a family summary card.
- Highlights recent signs learned and momentum toward milestones.

#### Educator mode

- Shows the Google Classroom-inspired instructor dashboard.
- Includes:
  - Stream tab
  - Classwork tab
  - People tab
  - Grades tab

### Instructor dashboard functions

- `handleExportCsv()`
  - Sets an export notice message.

- `handleCopyInvite()`
  - Copies the class invite code to the clipboard.
  - Updates the button UI to show a copied state.

- `openSubmissionReviewer(studentName, assignmentKey)`
  - Opens the review modal for a selected student and assignment.
  - Pre-fills the score and feedback state.

- `handleSaveReview()`
  - Updates the gradebook row for the selected student assignment.
  - Closes the modal after saving.

### Instructor tabs

The educator dashboard currently manages these tabs with local state:

- `stream`
- `classwork`
- `people`
- `grades`

Each tab renders a different panel and the UI switches without reloading the page.

### Instructor content blocks

- Stream panel
  - class announcement box
  - recent feed items
  - upcoming deadlines panel

- Classwork panel
  - assignment groups
  - assignment status pills
  - rubric breakdowns

- People panel
  - class roster table
  - portfolio inspection modal

- Grades panel
  - gradebook matrix
  - clickable cells that open the submission reviewer

---

## 3.6 Settings page

File: [src/pages/SettingsPage.tsx](../src/pages/SettingsPage.tsx)

This page contains all accessibility and app configuration controls.

### Included options

- Toggle captions
- Toggle haptics
- Toggle high contrast mode
- Toggle reduced motion
- Text size scale buttons
- Optional sound toggle
- Language switch between English and Filipino
- Restart setup option

### Main function

- `updateAccessibility({ ... })` updates the global accessibility state and immediately reflects the changes in the DOM dataset.

---

## 4. UI shell and bottom navigation

Files:
- [src/components/adaptive/BottomNavPill.tsx](../src/components/adaptive/BottomNavPill.tsx)
- [src/globals.css](../src/globals.css)

### Bottom navigation

The floating nav bar is driven by `navItems` from the context.

- Each item has a `labelKey` and icon name.
- The active item receives a highlighted pill background.
- For kids mode, the active pill is yellow; for adult/educator mode it is blue.

### Theme system

The styling system is driven by CSS variables in [src/globals.css](../src/globals.css):

- Brand colors are defined centrally in CSS variables.
- `data-age-mode` controls the kids/adult visual variants.
- `data-high-contrast`, `data-reduced-motion`, and `data-text-size` update accessibility styling.

---

## 5. Data and mock content

The prototype relies on mock data defined in [src/data/mock-data.ts](../src/data/mock-data.ts).

This includes:

- scenario definitions
- badge definitions
- educator roster entries
- family summary mock data

These supply the UI with realistic structures so the prototype can test interface behavior without a real backend.

---

## 6. Interface summary

### Learner user flow

1. Onboarding
2. Home screen
3. Select sign or scenario
4. Practice lesson or context-based scenario
5. Progress tracking and badges

### Educator user flow

1. Onboarding chooses educator role
2. Main app switches into classroom view
3. Stream / Classwork / People / Grades tabs are used
4. Portfolio and grade review modals can be opened and edited

### Accessibility and visual consistency

The app intentionally uses:

- role-based state switching
- contrast-aware palette variables
- accessibility settings that affect the DOM dataset
- large touch targets and card-based layout patterns

---

## 7. Overall function map

| Area | Main file | Main purpose |
|---|---|---|
| App shell | [src/App.tsx](../src/App.tsx) | Routes screens and manages onboarding/lesson state |
| Global state | [src/context/AgeModeContext.tsx](../src/context/AgeModeContext.tsx) | Mode, role, tab, and accessibility state |
| Onboarding | [src/pages/OnboardingPage.tsx](../src/pages/OnboardingPage.tsx) | Initial user mode selection |
| Home | [src/pages/HomePage.tsx](../src/pages/HomePage.tsx) | Learner landing screen |
| Lesson | [src/pages/LessonPage.tsx](../src/pages/LessonPage.tsx) | Practice sign experience |
| Scenarios | [src/pages/ScenariosPage.tsx](../src/pages/ScenariosPage.tsx) | Contextual sign practice |
| Progress | [src/pages/ProgressPage.tsx](../src/pages/ProgressPage.tsx) | Learner stats, family overview, and classroom dashboard |
| Settings | [src/pages/SettingsPage.tsx](../src/pages/SettingsPage.tsx) | Accessibility and language preferences |
| Style system | [src/globals.css](../src/globals.css) | Layout tokens, colors, and theme utilities |
| Mock data | [src/data/mock-data.ts](../src/data/mock-data.ts) | Demo roster, scenarios, and progress data |

This walkthrough reflects the current implementation in the repository and should be used as a quick map of how the app is structured and how the interface behavior is coordinated.
