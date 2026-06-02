# FVP Algorithm Reference

Technical reference for the Final Version Perfected (FVP) implementation in Dotlist. Covers the method, key concepts, state machine, and pure function signatures from `lib/fvp.ts`.

## 1. The FVP Method

FVP (Final Version Perfected) is a time management system by Mark Forster. It uses one long task list with a psychological-readiness-based preselection algorithm:

1. **Dot** tasks by asking "What do I want to do more than X?" -- where X is the last dotted task (the benchmark).
2. **Work** the last dotted task first (the task you most want to do).
3. After finishing work on a task, **re-scan** from the task you just worked on, asking the benchmark question again for tasks after it.

The result: tasks are always done in order of genuine psychological readiness, balancing urgency, importance, and motivation.

## 2. Key Concepts

### Chain

The set of dotted open tasks. Dotted tasks form a linked chain of preferences: each one was selected because you want to do it more than the previous one. The chain is built by the selection pass and consumed in reverse order (newest first).

```ts
getActiveChainTasks(state)  // = getDottedTasks(state)
// Returns: FvpTask[] (dotted, open tasks, in list order)
```

### Benchmark

The last dotted open task -- the most recently selected task in the chain. This is the comparison reference for the question "What do I want to do more than X?". If no tasks are dotted, the first open task serves as the fallback benchmark.

```ts
getBenchmarkTask(state)
// Returns: FvpTask | undefined
```

### Suggested Task

The task the UI recommends working on next. It is always the last dotted open task (newest chain member), falling back to the first open task when no chain exists. This is the task you most want to do according to the FVP algorithm.

```ts
getSuggestedTask(state)
// Returns: FvpTask | undefined
```

### Scan Anchor

Where scanning starts after work. The anchor determines which tasks are eligible for dotting in the next selection pass.

- If `lastWorkedTaskId` is later in the list than the benchmark, the anchor is the last worked task.
- Otherwise, the anchor is the benchmark.

This implements Forster's rule: after working a task, scan only the tasks that come after it.

```ts
getScanAnchorTask(state)
// Returns: FvpTask | undefined
```

### Eligible Dot Candidates

Open, undotted tasks that appear **after** the scan anchor in `state.tasks` (the full array including done tasks for positioning). These are the tasks the user can legitimately dot during a selection pass.

```ts
getEligibleDotTaskIds(state)
// Returns: Set<string>
```

### Selection Pass

A state machine (`SelectionPass` type) tracking an in-progress FVP scan. Stored on `state.selection`:

```ts
type SelectionPass = {
  active: boolean;            // true while the scan is in progress
  scanIndex: number;          // current position in state.tasks
  lastSelectedTaskId?: string; // benchmark used for this pass
  completedAt?: string;       // ISO timestamp when pass finished
};
```

## 3. Selection Pass State Machine

Three pure functions in `lib/fvp.ts` drive the scan. All return a new `FvpState` (no mutation).

### `startSelectionPass(state)`

Initializes a new selection pass.

1. Computes `scanIndex` from `getSelectionStartIndex(state)`.
2. Sets `lastSelectedTaskId` to the benchmark task.
3. If `scanIndex < 0` (no open tasks), sets `active = false`.
4. Clears any prior `completedAt`.

```ts
function startSelectionPass(state: FvpState): FvpState
```

### `selectSelectionCandidate(state)`

Dots the current candidate and advances the scan.

1. Reads the current candidate via `getSelectionCandidate(state)`.
2. If no candidate exists, marks the pass complete (`active = false`, sets `completedAt`).
3. Otherwise, sets `dotted: true` on the candidate task.
4. Updates `lastSelectedTaskId` to the newly dotted task.
5. Advances `scanIndex` to just past the candidate.
6. Checks if another candidate exists after the new position; if not, marks pass complete.

```ts
function selectSelectionCandidate(state: FvpState): FvpState
```

### `skipSelectionCandidate(state)`

Advances past the current candidate without dotting it.

1. Reads the current candidate via `getSelectionCandidate(state)`.
2. If no candidate, re-initializes via `startSelectionPass(state)`.
3. Otherwise, advances `scanIndex` past the candidate.
4. Preserves `lastSelectedTaskId` from the previous selection (does not update).
5. Same end-of-pass detection as `select`: if no further candidate exists, marks complete.

```ts
function skipSelectionCandidate(state: FvpState): FvpState
```

## 4. Eligibility Rules

`getEligibleDotTaskIds(state)` returns the set of task IDs that may be dotted during a normal selection pass:

| Condition | Result |
|-----------|--------|
| No open tasks | Empty set |
| No dotted tasks (no chain) | Only the first open task is eligible (becomes chain root) |
| Chain exists | Open, undotted tasks after the scan anchor in `state.tasks` |

**Override mechanism**: The TaskRow UI provides an "Override dot" button that bypasses eligibility by passing `force: true` to the dot toggle handler. This allows users to dot any open task regardless of position, useful for urgent items or corrections. The override flag is checked in `useFvpController.ts`:

```ts
dotted: force || getEligibleDotTaskIds(current).has(taskId) || task.dotted
  ? !task.dotted
  : task.dotted
```

## 5. Post-Work Behavior

After `finishWork()` in `useFvpController.ts`, regardless of outcome (done / readded / stopped):

1. The active session is finalized with `endedAt`, `durationSeconds`, and `outcome`.
2. Session is prepended to `sessions` array.
3. `activeSession` is cleared.
4. `lastWorkedTaskId` is set to the worked task.
5. `startSelectionPass()` is called automatically on the updated state.
6. View switches to `"selection"`.

For the "readded" outcome specifically, the original task is marked done + dotted with `completedAt`, and a new copy is appended with `sourceTaskId` pointing to the original.

For "stopped", the task remains open and is dotted (signifying it was worked on).

## 6. Chain Management

### Reading the Chain

```ts
getActiveChainTasks(state)  // alias for getDottedTasks(state)
// Returns dotted open tasks in list order (oldest first)
```

The chain view reverses this so the newest (suggested) task appears at the top.

### Clearing Dots (`clearDots`)

Defined in `useFvpController.ts`:

1. Archives the current chain via `archiveCurrentChain(state, "cleared")`.
2. Undots all open tasks (except the currently active session's task, if any).
3. Resets `lastWorkedTaskId` to `undefined`.
4. Clears `selection`.
5. Requires user confirmation via `window.confirm`.

### Archiving Chains

```ts
function archiveCurrentChain(state: FvpState, reason?: "cleared" | "completed"): FvpState
```

Creates an `ArchivedChain` record with:
- `id`: unique identifier
- `taskTitles`: titles of all chain tasks at archive time
- `archivedAt`: ISO timestamp
- `reason`: `"cleared"` or `"completed"` (default `"cleared"`)

Archived chains are stored in `state.archivedChains` (newest first) and survive state normalization.

## 7. Re-Add Flow

When a user stops work on a task and chooses "re-add":

1. **Original task**: marked `status: "done"`, `dotted: true`, `completedAt` set to now.
2. **New copy**: created via `createTask(originalTitle, originalTaskId)` -- same title, `sourceTaskId` pointing to the original, appended at the end of the task list with `status: "open"`, `dotted: false`.
3. **Session**: recorded with `outcome: "readded"`.
4. The new copy will be eligible for dotting in future selection passes based on its position at the end of the list.

## 8. Pure Function Reference

All functions below live in `lib/fvp.ts`. All state-producing functions return new state (no mutation).

### Task Queries

```ts
getOpenTasks(state: FvpState): FvpTask[]
getDottedTasks(state: FvpState): FvpTask[]
getActiveChainTasks(state: FvpState): FvpTask[]  // alias for getDottedTasks
getSuggestedTask(state: FvpState): FvpTask | undefined
getBenchmarkTask(state: FvpState): FvpTask | undefined
getScanAnchorTask(state: FvpState): FvpTask | undefined
```

### Eligibility and Selection

```ts
getEligibleDotTaskIds(state: FvpState): Set<string>
getSelectionStartIndex(state: FvpState): number
getSelectionCandidate(state: FvpState): FvpTask | undefined
```

### Selection Pass Operations

```ts
startSelectionPass(state: FvpState): FvpState
selectSelectionCandidate(state: FvpState): FvpState
skipSelectionCandidate(state: FvpState): FvpState
```

### Task Manipulation

```ts
reorderTask(state: FvpState, taskId: string, targetTaskId: string): FvpState
archiveCurrentChain(state: FvpState, reason?: "cleared" | "completed"): FvpState
```

### State Lifecycle

```ts
createEmptyState(): FvpState
createTask(title: string, sourceTaskId?: string): FvpTask
normalizeState(value: unknown): FvpState
mergeStates(localState: FvpState, remoteState: FvpState): FvpState
```

### Utilities

```ts
nowIso(): string
makeId(prefix: string): string
isStaleActiveSession(activeSession: WorkSession, maxAgeHours?: number): boolean
formatDuration(totalSeconds: number): string
```
