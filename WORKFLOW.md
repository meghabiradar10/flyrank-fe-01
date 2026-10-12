# Week 2 AI-Assisted Engineering Workflow Report

This report compares two implementations of the user settings form in `flyrank-fe-01`: `round-1-vague` (commit `291813a`) and `round-2-precise` (commit `12a84ef`). Review times were not tracked or recorded for either round.

## 1. Code Differences Between Implementations

Comparing the implementations reveals distinct architectural and accessibility differences across three core files:

- **Markup (`index.html`)**: `round-1-vague` defined standalone `<input>` and `<p class="error" hidden>` elements without programmatic linkage. In contrast, `round-2-precise` connected each input to its corresponding error message using `aria-describedby` (`name-error`, `email-error`), added `aria-invalid="false"`, and tagged error elements with `role="alert"`.
- **Styling (`styles.css`)**: `round-1-vague` stripped native focus rings using `input:focus { outline: none; }` and lacked focus styling on `.save-button`. `round-2-precise` implemented accessible `:focus-visible` rules, applying a 2px solid accent outline with offset across inputs and the save button, plus an error outline for invalid fields.
- **Logic (`script.js`)**:
  - *Storage handling*: `round-1-vague` parsed `localStorage` with an unchecked `JSON.parse` call. `round-2-precise` introduced `isValidStoredSettings()`, which verifies that the stored value is a non-null, non-array object with string properties before populating inputs, clearing corrupt data defensively.
  - *Focus management*: `round-2-precise` added `firstInvalid.focus()`, automatically shifting keyboard focus to the first invalid field upon failed submission.
  - *State cleanup*: `round-2-precise` added a `clearError()` helper that resets `aria-invalid` and clears the `.error` class on `#form-status` during typing, whereas `round-1-vague` left stale status styling.

## 2. Issues Found in Round 1 Code Review

During code review of `round-1-vague`, two key issues were identified:
1. **Focus Suppression**: The AI removed default focus rings with `outline: none;` without providing a high-contrast replacement, violating WCAG 2.4.7 (Focus Visible) for keyboard navigation.
2. **Missing Accessibility Bindings**: Error paragraphs were visually toggled via `.hidden`, but screen readers were never notified because inputs lacked `aria-describedby` and `aria-invalid` attributes.

## 3. Actually Performed Browser Tests (Round 2)

Only three manual tests were performed in the browser; all three passed:
- **Empty-Field Validation**: Submitting blank fields displayed error messages for both inputs. *(Passed)*
- **Invalid-Email Validation**: Submitting an invalid email displayed the required format error. *(Passed)*
- **Successful Submission**: Submitting valid name and email values displayed the "Settings saved." status message. *(Passed)*

## 4. Tests Not Yet Verified

The following scenarios were not tested during evaluation and remain unverified:
- **Persistence After Refresh**: Verifying saved values re-populate form fields on page reload. *(Not yet verified)*
- **Keyboard Navigation**: Navigating all interactive controls using Tab, Shift+Tab, and Enter. *(Not yet verified)*
- **Visible Focus Indicators**: Verifying `:focus-visible` styling renders correctly across browsers. *(Not yet verified)*
- **Malformed Storage Handling**: Testing runtime recovery when `localStorage` contains corrupt JSON. *(Not yet verified)*
