# Component Guide

The app uses a simple controller-and-view pattern.

## Controller

`components/fvp/useFvpController.ts` owns the persisted FVP state, UI state, derived values, and event handlers. It returns a `FvpController` object, typed in `components/fvp/viewTypes.ts`.

Views do not keep their own task state. They receive `controller` and call methods such as `addTask()`, `beginSelection()`, `startWork()`, `finishWork()`, and `resetData()`.

## Shell

`components/fvp/Shell.tsx` renders:

- desktop sidebar navigation
- mobile top bar and bottom navigation
- slide-out mobile menu
- help and settings controls
- the main content surface

## Views

Each view lives in `components/fvp/views/`:

- `TodayView.tsx`: dashboard, suggested task, stale-session recovery, onboarding
- `InboxView.tsx`: task capture and full open task list
- `SelectionView.tsx`: guided FVP comparison flow
- `ChainView.tsx`: current dotted task chain
- `FocusView.tsx`: active work timer and finish controls
- `ReviewView.tsx`: completed session history

## Overlays

`components/fvp/Overlays.tsx` contains:

- `StopDialog`: finish, re-add, or stop an active task
- `SettingsDialog`: theme, local storage status, export, and reset
- `HelpDialog`: short method reminders and support link

## Shared UI

- `TaskRow.tsx`: reusable task row with dot, start, move, complete, and delete actions
- `StatGrid.tsx`: dashboard metrics

Keep new components presentational unless they truly need local UI state. Put method behavior and persistence in the controller or pure helpers in `lib/fvp.ts`.
