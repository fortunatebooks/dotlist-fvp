# Dotlist FVP Architecture

Dotlist FVP is a static Next.js app. The public open source version has no server runtime, database, account system, or required environment variables.

## Runtime

- `next.config.ts` enables `output: "export"` for static hosting.
- The app entry point is `/app`.
- All task state is stored in `localStorage` under `fvp.state.v1`.
- Theme preference is stored in `localStorage` under `fvp.theme`.
- Other tabs are merged through the browser `StorageEvent`.

## Main Flow

```text
User action
  -> view calls a controller method
  -> useFvpController updates FvpState
  -> derived values recompute
  -> localStorage persistence runs
  -> active view re-renders
```

## Key Files

| File | Role |
| ---- | ---- |
| `components/FvpApp.tsx` | Thin coordinator that renders the shell and active view |
| `components/fvp/useFvpController.ts` | All app state, UI state, timers, persistence, and actions |
| `components/fvp/Shell.tsx` | Desktop sidebar, mobile navigation, and utility controls |
| `components/fvp/views/*.tsx` | Presentational views for Today, Inbox, Selection, Chain, Focus, and Review |
| `components/fvp/Overlays.tsx` | Stop, Settings, and Help dialogs |
| `lib/fvp.ts` | Pure FVP state machine and selection helpers |
| `lib/storage.ts` | Local browser persistence |
| `lib/types.ts` | Shared task, session, and state types |
| `tests/fvp.test.ts` | Node unit tests for the pure state logic |

## State Model

`FvpState` contains tasks, completed work sessions, the optional active work session, the optional selection pass, archived chains, deleted task ids, and an `updatedAt` timestamp.

The controller keeps UI state separate from persisted FVP state: current view, modal visibility, mobile menu state, theme preference, current form input, and focus timer ticks are React state only.

## Persistence

`loadLocalState()` reads from local storage and normalizes untrusted JSON through `normalizeState()`. `saveLocalState()` writes the full state object after each mutation. Cross-tab changes are merged with `mergeStates()` so separate browser windows can preserve task/session records by id.

This local-first boundary is intentional. The repository is a self-contained open source web tool that can be hosted as static files.
