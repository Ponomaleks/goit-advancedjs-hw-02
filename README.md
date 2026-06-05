# Countdown Timer & Promise Notification Demo

This repository contains a small demo project implemented with plain HTML, CSS,
and JavaScript. It showcases two independent tasks used for learning DOM
manipulation, working with third-party libraries, and building interactive UI
widgets.

## Project Overview

- Task 1 — Countdown Timer: an interactive timer that counts down to a user-
   selected future date.
- Task 2 — Promise Notification Generator: a small form that creates a promise
   which resolves or rejects after a user-specified delay and displays a toast
   notification reflecting the result.

Both tasks demonstrate integration with `flatpickr` (date picker) and
`iziToast` (toast notifications), and follow specific behavior rules useful for
mentoring and automatic checks.

## Files

- `src/1-timer.html` and `src/1-timer.js` — Countdown timer UI and logic.
- `src/2-snackbar.html` and `src/2-snackbar.js` — Promise generator and
   notification logic.
- `src/css/` — styles used by the demo pages.

## Libraries

- `flatpickr` — date picker used to choose the target countdown date.
- `iziToast` — toast notifications used for warnings and promise result
   messages.

## Features and Behavior

### Task 1 — Countdown Timer

- On first load the `Start` button is disabled.
- Clicking the date input opens a calendar to select a date.
- If a past date is selected, the `Start` button remains disabled and a toast
   message appears: "Please choose a date in the future".
- If a future date is selected the `Start` button becomes enabled.
- Pressing `Start` disables the button, displays the remaining time in the
   format `DD:HH:MM:SS` (two-digit segments), and starts the countdown.
- The interface updates every second.
- The timer stops automatically when the leftover time reaches zero and shows
   `00:00:00:00`.

Notes on formatting: every time segment is displayed with two digits (leading
zero when needed).

### Task 2 — Promise Notification Generator

- A form accepts a delay in milliseconds and a radio choice indicating whether
   the promise should resolve (fulfilled) or reject.
- Submitting the form creates a promise that settles after the specified
   delay. The promise value passed to `resolve` or `reject` is the delay value
   in milliseconds.
- When the promise settles, an `iziToast` notification appears showing the
   chosen state (success/error) and the delay value.

## Mentor Checklist (Acceptance Criteria)

- `flatpickr` and `iziToast` are included and used in the pages.
- Timer page: `Start` is disabled on initial load.
- Calendar opens on input click; past date selection shows
   "Please choose a date in the future" and keeps `Start` disabled.
- Future date selection enables `Start`.
- Clicking `Start` disables the button and starts a live countdown shown as
   `DD:HH:MM:SS` with two-digit formatting.
- The countdown updates every second and stops at `00:00:00:00`.
- Notification page: creating a promise shows an `iziToast` with the chosen
   state and the delay in milliseconds, matching the task template.

## Development — Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the demo pages in your browser:

- `src/1-timer.html` — countdown timer demo
- `src/2-snackbar.html` — promise notification demo

If the dev server is running via Vite, visit `http://localhost:5173` and open
the pages from the project root.

## How to Use

- Timer: open the timer page, pick a future date using the calendar, then
   click `Start` to begin the countdown.
- Promise generator: open the notification page, enter a delay (ms), choose
   resolve or reject, then submit to see the notification after the given
   delay.
