# Week 2 AI-Assisted Engineering Workflow Report

This document compares two implementations of the user settings form in `flyrank-fe-01`:
- `round-1-vague`: A settings form created using a vague AI prompt.
- `round-2-precise`: A settings form created with explicit validation and accessibility requirements.

---

## 1. Implementation Comparison

| Attribute | Round 1 (`round-1-vague`) | Round 2 (`round-2-precise`) |
| :--- | :--- | :--- |
| **Commit** | `291813a` (*feat: add basic settings form*) | `12a84ef` (*feat: add validated settings form*) |
| **Prompt Style** | Vague, high-level prompt requesting a basic settings form. | Precise prompt specifying exact field validations, ARIA bindings, focus management, and defensive storage parsing. |
| **Form & Error Markup** | Basic HTML5 inputs with `<p class="error" hidden>` elements. | Inputs explicitly associated with error containers using `aria-describedby` and `aria-invalid`; error elements use `role="alert"`. |
| **Focus Handling** | Inputs used `input:focus { outline: none; }` with box-shadow only; button lacked explicit `:focus-visible` styling; no focus movement on submit error. | High-contrast `:focus-visible` styling added to inputs and button; script includes programmatic focus shift to the first invalid field on error. |
| **Storage Handling** | Parsed `localStorage` with `JSON.parse` and simple truthiness check without runtime schema verification. | Runtime schema guard function (`isValidStoredSettings`) verifying that stored data is a non-null object with expected string properties before applying. |
| **Input Event Reset** | Reset error text and input validity class, but did not remove `.error` class from `#form-status`. | Uses `clearError` helper and removes `.error` class from `#form-status` alongside resetting validation states. |

---

## 2. Review Effort & AI Mistake Analysis

- **Review Time Tracking**: *[Pending / Not Formally Measured]* — Precise review times were not tracked or recorded for either round.
- **Specific AI Mistake Identification**: *[Pending / Not Formally Logged]* — No specific AI mistakes were formally cataloged or claimed during the prompt execution review.
- **Observed Code Gaps Between Implementations**: While no specific mistake was formally logged, comparing the codebase of `round-1-vague` to `round-2-precise` shows that the vague prompt resulted in omitted accessibility attributes (`aria-describedby`, `aria-invalid`, `role="alert"`), disabled focus outlines (`outline: none`), unverified `localStorage` data parsing, and absence of programmatic focus shift on error. These gaps were resolved in `round-2-precise` by providing explicit requirements up front.

---

## 3. Accessibility Comparison

| Feature | Round 1 (`round-1-vague`) | Round 2 (`round-2-precise`) | Status |
| :--- | :--- | :--- | :--- |
| **Error Message Association** | Not linked (`aria-describedby` omitted). | Linked (`aria-describedby="name-error"` and `aria-describedby="email-error"`). | Implemented |
| **Invalid State Indication** | `aria-invalid` omitted. | `aria-invalid` initialised to `"false"` and toggled on error. | Implemented |
| **Screen Reader Alerts** | No `role="alert"` on field error elements. | `role="alert"` included on error elements. | Implemented |
| **Focus Indicator Styles** | Native outline suppressed with `outline: none`. | 2px solid accent `:focus-visible` outlines on inputs and button. | Implemented |
| **Focus Management on Submit** | Focus remained on submit button when errors occurred. | Script targets `firstInvalid.focus()` upon validation failure. | Implemented |

---

## 4. Edge Cases and Defensive Programming

- **Whitespace Handling**: Both implementations trim user input before evaluating validation rules.
- **Corrupted Storage Data**: Round 2 includes defensive type and structure checks via `isValidStoredSettings()`, clearing the storage key if malformed data is encountered.
- **Form Status Reset**: Round 2 cleans up the `.error` CSS class on `#form-status` whenever the user types into an input field.

---

## 5. Verification and Test Results

### Actually Performed Tests (Round 2)
The following tests were actively performed in the browser and verified:

1. **Empty-Field Validation**:
   - **Action**: Submitted the form with name and email fields left empty.
   - **Expected**: Validation error messages appear for both fields.
   - **Result**: **Passed**
2. **Invalid-Email Validation**:
   - **Action**: Entered a valid name and an invalid email format, then submitted the form.
   - **Expected**: Email error message displays indicating a valid email address is required.
   - **Result**: **Passed**
3. **Successful Submission**:
   - **Action**: Entered valid name and email values and clicked Save.
   - **Expected**: Form submits without validation errors and displays the "Settings saved." confirmation message.
   - **Result**: **Passed**

### Additional Tests (Not Yet Verified)
The following test scenarios remain pending and have not yet been verified:

- **Persistence After Refresh**: *[Not Yet Verified]* — Confirming stored values repopulate form fields automatically after page reload.
- **Keyboard Navigation**: *[Not Yet Verified]* — Navigating the entire form via Tab / Shift+Tab and Enter key submission.
- **Visible Focus Indicators**: *[Not Yet Verified]* — Visual verification of `:focus-visible` outline appearance across all interactive elements.
- **Invalid Stored-Data Handling**: *[Not Yet Verified]* — Verifying error recovery when `localStorage` contains corrupted or unexpected data structures.
