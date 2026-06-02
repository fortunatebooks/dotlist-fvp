import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createEmptyState,
  archiveCurrentChain,
  getBenchmarkTask,
  getEligibleDotTaskIds,
  getSelectionCandidate,
  getScanAnchorTask,
  getSuggestedTask,
  mergeStates,
  normalizeState,
  reorderTask,
  selectSelectionCandidate,
  skipSelectionCandidate,
  startSelectionPass,
} from "../lib/fvp";
import type { FvpState, FvpTask } from "../lib/types";

function task(id: string, title: string, dotted = false, status: FvpTask["status"] = "open") {
  return {
    id,
    title,
    status,
    dotted,
    createdAt: `2026-05-11T10:0${id.length}:00.000Z`,
    updatedAt: `2026-05-11T10:0${id.length}:00.000Z`,
  };
}

test("benchmark returns the previous remaining dotted task after work stops", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [
      task("email", "Email", true),
      task("tray", "In-Tray"),
      task("voice", "Voicemail", true),
      task("desk", "Tidy Desk", true, "done"),
      task("backup", "Back Up"),
    ],
    lastWorkedTaskId: "desk",
  };

  assert.equal(getBenchmarkTask(state)?.id, "voice");
  assert.equal(getSuggestedTask(state)?.id, "voice");
  assert.equal(getScanAnchorTask(state)?.id, "desk");
  assert.deepEqual(Array.from(getEligibleDotTaskIds(state)), ["backup"]);
});

test("first open task is the only eligible root when no chain exists", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email"), task("tray", "In-Tray"), task("voice", "Voicemail")],
  };

  assert.equal(getBenchmarkTask(state)?.id, "email");
  assert.deepEqual(Array.from(getEligibleDotTaskIds(state)), ["email"]);
});

test("state normalization drops malformed records and dangling active sessions", () => {
  const state = normalizeState({
    tasks: [task("email", "Email"), { id: "bad", title: "" }],
    sessions: [{ id: "bad-session" }],
    activeSession: {
      id: "session_1",
      taskId: "missing",
      taskTitle: "Missing",
      startedAt: "2026-05-11T10:00:00.000Z",
    },
    updatedAt: "not a date",
  });

  assert.equal(state.tasks.length, 1);
  assert.equal(state.sessions.length, 0);
  assert.equal(state.activeSession, undefined);
  assert.ok(!Number.isNaN(new Date(state.updatedAt).getTime()));
});

test("mergeStates preserves local and remote work by id", () => {
  const local: FvpState = {
    ...createEmptyState(),
    tasks: [task("local", "Local task")],
    sessions: [
      {
        id: "session_local",
        taskId: "local",
        taskTitle: "Local task",
        startedAt: "2026-05-11T10:00:00.000Z",
        endedAt: "2026-05-11T10:05:00.000Z",
        durationSeconds: 300,
      },
    ],
    updatedAt: "2026-05-11T10:05:00.000Z",
  };
  const remote: FvpState = {
    ...createEmptyState(),
    tasks: [task("remote", "Remote task")],
    sessions: [
      {
        id: "session_remote",
        taskId: "remote",
        taskTitle: "Remote task",
        startedAt: "2026-05-11T09:00:00.000Z",
        endedAt: "2026-05-11T09:05:00.000Z",
        durationSeconds: 300,
      },
    ],
    updatedAt: "2026-05-11T09:05:00.000Z",
  };

  const merged = mergeStates(local, remote);

  assert.deepEqual(
    merged.tasks.map((item) => item.id).sort(),
    ["local", "remote"],
  );
  assert.deepEqual(
    merged.sessions.map((item) => item.id).sort(),
    ["session_local", "session_remote"],
  );
});

test("guided selection selects and skips through a pass", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email"), task("tray", "In-Tray"), task("voice", "Voicemail")],
  };

  const started = startSelectionPass(state);
  assert.equal(getSelectionCandidate(started)?.id, "email");

  const selectedFirst = selectSelectionCandidate(started);
  assert.equal(selectedFirst.tasks.find((item) => item.id === "email")?.dotted, true);
  assert.equal(getSelectionCandidate(selectedFirst)?.id, "tray");

  const skippedTray = skipSelectionCandidate(selectedFirst);
  assert.equal(getSelectionCandidate(skippedTray)?.id, "voice");

  const selectedVoice = selectSelectionCandidate(skippedTray);
  assert.equal(selectedVoice.tasks.find((item) => item.id === "voice")?.dotted, true);
  assert.equal(selectedVoice.selection?.active, false);
  assert.equal(getSuggestedTask(selectedVoice)?.id, "voice");
});

test("guided selection stays complete after skipping the final candidate", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email", true), task("tray", "In-Tray")],
    selection: { active: true, scanIndex: 1, lastSelectedTaskId: "email" },
  };

  const completed = skipSelectionCandidate(state);

  assert.equal(completed.selection?.active, false);
  assert.ok(completed.selection?.completedAt);
  assert.equal(getSelectionCandidate(completed), undefined);
});

test("guided selection resumes after the last worked task", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [
      task("email", "Email", true),
      task("tray", "In-Tray"),
      task("voice", "Voicemail", true),
      task("desk", "Tidy Desk", true, "done"),
      task("backup", "Back Up"),
    ],
    lastWorkedTaskId: "desk",
  };

  const started = startSelectionPass(state);

  assert.equal(getSelectionCandidate(started)?.id, "backup");
});

test("reorderTask changes task order and clears in-progress selection", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email"), task("tray", "In-Tray"), task("voice", "Voicemail")],
    selection: { active: true, scanIndex: 1, lastSelectedTaskId: "email" },
  };

  const reordered = reorderTask(state, "voice", "email");

  assert.deepEqual(
    reordered.tasks.map((item) => item.id),
    ["voice", "email", "tray"],
  );
  assert.equal(reordered.selection, undefined);
});

test("mergeStates preserves the newer task list order", () => {
  const local: FvpState = {
    ...createEmptyState(),
    tasks: [
      task("voice", "Voicemail"),
      task("email", "Email"),
      task("tray", "In-Tray"),
    ],
    updatedAt: "2026-05-11T11:00:00.000Z",
  };
  const remote: FvpState = {
    ...createEmptyState(),
    tasks: [
      task("email", "Email"),
      task("tray", "In-Tray"),
      task("voice", "Voicemail"),
      task("remote", "Remote addition"),
    ],
    updatedAt: "2026-05-11T10:00:00.000Z",
  };

  const merged = mergeStates(local, remote);

  assert.deepEqual(
    merged.tasks.map((item) => item.id),
    ["voice", "email", "tray", "remote"],
  );
});

test("mergeStates keeps deleted tasks deleted", () => {
  const local: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email")],
    deletedTaskIds: ["tray"],
    updatedAt: "2026-05-11T11:00:00.000Z",
  };
  const remote: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email"), task("tray", "In-Tray")],
    updatedAt: "2026-05-11T10:00:00.000Z",
  };

  const merged = mergeStates(local, remote);

  assert.deepEqual(
    merged.tasks.map((item) => item.id),
    ["email"],
  );
  assert.deepEqual(merged.deletedTaskIds, ["tray"]);
});

test("archiveCurrentChain stores active dotted task titles", () => {
  const state: FvpState = {
    ...createEmptyState(),
    tasks: [task("email", "Email", true), task("tray", "In-Tray"), task("voice", "Voicemail", true)],
  };

  const archived = archiveCurrentChain(state, "cleared");

  assert.deepEqual(archived.archivedChains?.[0].taskTitles, ["Email", "Voicemail"]);
  assert.equal(archived.archivedChains?.[0].reason, "cleared");
});
