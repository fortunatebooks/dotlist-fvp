import type { ArchivedChain, FvpState, FvpTask, SelectionPass, WorkSession } from "@/lib/types";

export function nowIso() {
  return new Date().toISOString();
}

export function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function createEmptyState(): FvpState {
  return {
    tasks: [],
    sessions: [],
    deletedTaskIds: [],
    updatedAt: nowIso(),
  };
}

export function createTask(title: string, sourceTaskId?: string): FvpTask {
  const timestamp = nowIso();

  return {
    id: makeId("task"),
    title: title.trim(),
    status: "open",
    dotted: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    sourceTaskId,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoLike(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

function normalizeTimestamp(value: unknown, fallback: string) {
  return isIsoLike(value) ? value : fallback;
}

function normalizeTask(value: unknown): FvpTask | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === "string" && value.id ? value.id : makeId("task");
  const title = typeof value.title === "string" ? value.title.trim() : "";
  if (!title) return null;

  const createdAt = normalizeTimestamp(value.createdAt, nowIso());
  const updatedAt = normalizeTimestamp(value.updatedAt, createdAt);
  const completedAt = normalizeTimestamp(value.completedAt, "");

  return {
    id,
    title,
    status: value.status === "done" ? "done" : "open",
    dotted: Boolean(value.dotted),
    createdAt,
    updatedAt,
    completedAt: completedAt || undefined,
    sourceTaskId: typeof value.sourceTaskId === "string" ? value.sourceTaskId : undefined,
  };
}

function normalizeSession(value: unknown): WorkSession | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === "string" && value.id ? value.id : makeId("session");
  const taskId = typeof value.taskId === "string" ? value.taskId : "";
  const taskTitle = typeof value.taskTitle === "string" ? value.taskTitle.trim() : "";
  const startedAt = normalizeTimestamp(value.startedAt, nowIso());
  const endedAt = normalizeTimestamp(value.endedAt, "");
  const outcome =
    value.outcome === "done" || value.outcome === "readded" || value.outcome === "stopped"
      ? value.outcome
      : undefined;

  if (!taskId || !taskTitle) return null;

  return {
    id,
    taskId,
    taskTitle,
    startedAt,
    endedAt: endedAt || undefined,
    durationSeconds:
      typeof value.durationSeconds === "number" && Number.isFinite(value.durationSeconds)
        ? Math.max(0, Math.round(value.durationSeconds))
        : undefined,
    outcome,
    startedWithOverride: Boolean(value.startedWithOverride),
  };
}

function normalizeSelection(value: unknown): SelectionPass | undefined {
  if (!isRecord(value)) return undefined;

  const scanIndex =
    typeof value.scanIndex === "number" && Number.isFinite(value.scanIndex)
      ? Math.max(0, Math.round(value.scanIndex))
      : 0;

  return {
    active: Boolean(value.active),
    scanIndex,
    lastSelectedTaskId:
      typeof value.lastSelectedTaskId === "string" ? value.lastSelectedTaskId : undefined,
    completedAt: normalizeTimestamp(value.completedAt, "") || undefined,
  };
}

function normalizeArchivedChain(value: unknown): ArchivedChain | null {
  if (!isRecord(value)) return null;

  const taskTitles = Array.isArray(value.taskTitles)
    ? value.taskTitles.filter((title): title is string => typeof title === "string" && Boolean(title))
    : [];
  if (taskTitles.length === 0) return null;

  return {
    id: typeof value.id === "string" && value.id ? value.id : makeId("chain"),
    taskTitles,
    archivedAt: normalizeTimestamp(value.archivedAt, nowIso()),
    reason: value.reason === "completed" ? "completed" : "cleared",
  };
}

export function normalizeState(value: unknown): FvpState {
  if (!isRecord(value)) return createEmptyState();

  const updatedAt = normalizeTimestamp(value.updatedAt, nowIso());
  const tasks = Array.isArray(value.tasks)
    ? value.tasks.map(normalizeTask).filter((task): task is FvpTask => Boolean(task))
    : [];
  const sessions = Array.isArray(value.sessions)
    ? value.sessions
        .map(normalizeSession)
        .filter((session): session is WorkSession => Boolean(session))
    : [];
  const archivedChains = Array.isArray(value.archivedChains)
    ? value.archivedChains
        .map(normalizeArchivedChain)
        .filter((chain): chain is ArchivedChain => Boolean(chain))
    : [];
  const deletedTaskIds = Array.isArray(value.deletedTaskIds)
    ? Array.from(
        new Set(
          value.deletedTaskIds.filter(
            (taskId): taskId is string => typeof taskId === "string" && Boolean(taskId),
          ),
        ),
      )
    : [];
  const visibleTasks = tasks.filter((task) => !deletedTaskIds.includes(task.id));
  const activeSession = normalizeSession(value.activeSession);
  const activeTaskExists = activeSession
    ? visibleTasks.some((task) => task.id === activeSession.taskId && task.status === "open")
    : false;

  return {
    tasks: visibleTasks,
    sessions,
    activeSession: activeTaskExists ? activeSession ?? undefined : undefined,
    lastWorkedTaskId:
      typeof value.lastWorkedTaskId === "string" ? value.lastWorkedTaskId : undefined,
    selection: normalizeSelection(value.selection),
    archivedChains,
    deletedTaskIds,
    updatedAt,
  };
}

export function getOpenTasks(state: FvpState) {
  return state.tasks.filter((task) => task.status === "open");
}

export function getDottedTasks(state: FvpState) {
  return getOpenTasks(state).filter((task) => task.dotted);
}

export function getActiveChainTasks(state: FvpState) {
  return getDottedTasks(state);
}

export function getSuggestedTask(state: FvpState) {
  const dotted = getDottedTasks(state);
  if (dotted.length > 0) {
    return dotted[dotted.length - 1];
  }

  return getOpenTasks(state)[0];
}

export function getBenchmarkTask(state: FvpState) {
  const dotted = getDottedTasks(state);
  return dotted[dotted.length - 1] ?? getOpenTasks(state)[0];
}

export function getScanAnchorTask(state: FvpState) {
  const benchmark = getBenchmarkTask(state);
  if (!benchmark) return undefined;

  const benchmarkIndex = state.tasks.findIndex((task) => task.id === benchmark.id);
  const lastWorkedIndex = state.lastWorkedTaskId
    ? state.tasks.findIndex((task) => task.id === state.lastWorkedTaskId)
    : -1;

  if (lastWorkedIndex > benchmarkIndex) {
    return state.tasks[lastWorkedIndex];
  }

  return benchmark;
}

export function getEligibleDotTaskIds(state: FvpState) {
  const openTasks = getOpenTasks(state);
  const dotted = getDottedTasks(state);

  if (openTasks.length === 0) return new Set<string>();
  if (dotted.length === 0) return new Set([openTasks[0].id]);

  const anchor = getScanAnchorTask(state);
  const anchorIndex = anchor ? state.tasks.findIndex((task) => task.id === anchor.id) : -1;

  return new Set(
    state.tasks
      .slice(anchorIndex + 1)
      .filter((task) => task.status === "open" && !task.dotted)
      .map((task) => task.id),
  );
}

export function getSelectionStartIndex(state: FvpState) {
  const openTasks = getOpenTasks(state);
  if (openTasks.length === 0) return -1;

  const dotted = getDottedTasks(state);
  if (dotted.length === 0) {
    return state.tasks.findIndex((task) => task.id === openTasks[0].id);
  }

  const anchor = getScanAnchorTask(state);
  return anchor ? state.tasks.findIndex((task) => task.id === anchor.id) + 1 : -1;
}

export function getSelectionCandidate(state: FvpState) {
  if (state.selection && !state.selection.active && state.selection.completedAt) {
    return undefined;
  }

  const dotted = getDottedTasks(state);
  const startIndex =
    state.selection?.active && typeof state.selection.scanIndex === "number"
      ? state.selection.scanIndex
      : getSelectionStartIndex(state);

  if (startIndex < 0) return undefined;

  if (dotted.length === 0) {
    const firstOpen = getOpenTasks(state)[0];
    if (!firstOpen) return undefined;
    const firstOpenIndex = state.tasks.findIndex((task) => task.id === firstOpen.id);
    return firstOpenIndex >= startIndex ? firstOpen : undefined;
  }

  const anchorIndex = getSelectionStartIndex(state);
  const effectiveStartIndex = Math.max(startIndex, anchorIndex);

  return state.tasks
    .slice(effectiveStartIndex)
    .find((task) => task.status === "open" && !task.dotted);
}

export function startSelectionPass(state: FvpState): FvpState {
  const scanIndex = getSelectionStartIndex(state);
  const benchmark = getBenchmarkTask(state);

  return {
    ...state,
    selection: {
      active: scanIndex >= 0,
      scanIndex: Math.max(0, scanIndex),
      lastSelectedTaskId: benchmark?.id,
      completedAt: undefined,
    },
  };
}

export function selectSelectionCandidate(state: FvpState): FvpState {
  const candidate = getSelectionCandidate(state);
  if (!candidate) {
    return {
      ...state,
      selection: {
        active: false,
        scanIndex: state.selection?.scanIndex ?? 0,
        lastSelectedTaskId: state.selection?.lastSelectedTaskId,
        completedAt: nowIso(),
      },
    };
  }

  const candidateIndex = state.tasks.findIndex((task) => task.id === candidate.id);
  const timestamp = nowIso();
  const nextState = {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === candidate.id ? { ...task, dotted: true, updatedAt: timestamp } : task,
    ),
    selection: {
      active: true,
      scanIndex: candidateIndex + 1,
      lastSelectedTaskId: candidate.id,
      completedAt: undefined,
    },
  };

  return getSelectionCandidate(nextState)
    ? nextState
    : {
        ...nextState,
        selection: {
          ...nextState.selection,
          active: false,
          completedAt: timestamp,
        },
      };
}

export function skipSelectionCandidate(state: FvpState): FvpState {
  const candidate = getSelectionCandidate(state);
  if (!candidate) return startSelectionPass(state);

  const candidateIndex = state.tasks.findIndex((task) => task.id === candidate.id);
  const nextState = {
    ...state,
    selection: {
      active: true,
      scanIndex: candidateIndex + 1,
      lastSelectedTaskId: state.selection?.lastSelectedTaskId ?? getBenchmarkTask(state)?.id,
      completedAt: undefined,
    },
  };

  return getSelectionCandidate(nextState)
    ? nextState
    : {
        ...nextState,
        selection: {
          ...nextState.selection,
          active: false,
          completedAt: nowIso(),
        },
      };
}

export function reorderTask(state: FvpState, taskId: string, targetTaskId: string): FvpState {
  if (taskId === targetTaskId || state.activeSession?.taskId === taskId) return state;

  const fromIndex = state.tasks.findIndex((task) => task.id === taskId);
  const toIndex = state.tasks.findIndex((task) => task.id === targetTaskId);
  if (fromIndex < 0 || toIndex < 0) return state;

  const tasks = [...state.tasks];
  const [movedTask] = tasks.splice(fromIndex, 1);
  tasks.splice(toIndex, 0, { ...movedTask, updatedAt: nowIso() });

  return {
    ...state,
    tasks,
    selection: undefined,
  };
}

export function archiveCurrentChain(
  state: FvpState,
  reason: ArchivedChain["reason"] = "cleared",
): FvpState {
  const chain = getActiveChainTasks(state);
  if (chain.length === 0) return state;

  return {
    ...state,
    archivedChains: [
      {
        id: makeId("chain"),
        taskTitles: chain.map((task) => task.title),
        archivedAt: nowIso(),
        reason,
      },
      ...(state.archivedChains ?? []),
    ],
  };
}

export function isStaleActiveSession(activeSession: WorkSession, maxAgeHours = 12) {
  const startedAt = new Date(activeSession.startedAt).getTime();
  if (Number.isNaN(startedAt)) return true;
  return Date.now() - startedAt > maxAgeHours * 60 * 60 * 1000;
}

function newerIso(left: string | undefined, right: string | undefined) {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime >= rightTime ? left : right;
}

function pickNewerTask(left: FvpTask, right: FvpTask) {
  return new Date(left.updatedAt).getTime() >= new Date(right.updatedAt).getTime() ? left : right;
}

function pickNewerSession(left: WorkSession, right: WorkSession) {
  const leftTime = new Date(left.endedAt ?? left.startedAt).getTime();
  const rightTime = new Date(right.endedAt ?? right.startedAt).getTime();
  return leftTime >= rightTime ? left : right;
}

export function mergeStates(localState: FvpState, remoteState: FvpState) {
  const local = normalizeState(localState);
  const remote = normalizeState(remoteState);
  const tasks = new Map<string, FvpTask>();
  const sessions = new Map<string, WorkSession>();
  const deletedTaskIds = Array.from(
    new Set([...(remote.deletedTaskIds ?? []), ...(local.deletedTaskIds ?? [])]),
  );
  const deletedTaskIdSet = new Set(deletedTaskIds);
  const localIsNewer = new Date(local.updatedAt).getTime() >= new Date(remote.updatedAt).getTime();
  const newerState = localIsNewer ? local : remote;

  for (const task of [...remote.tasks, ...local.tasks]) {
    if (deletedTaskIdSet.has(task.id)) continue;
    const existing = tasks.get(task.id);
    tasks.set(task.id, existing ? pickNewerTask(existing, task) : task);
  }

  for (const workSession of [...remote.sessions, ...local.sessions]) {
    const existing = sessions.get(workSession.id);
    sessions.set(
      workSession.id,
      existing ? pickNewerSession(existing, workSession) : workSession,
    );
  }

  const localActive = local.activeSession;
  const remoteActive = remote.activeSession;
  const activeSession =
    localActive && !isStaleActiveSession(localActive)
      ? localActive
      : remoteActive && !isStaleActiveSession(remoteActive)
        ? remoteActive
        : undefined;

  return normalizeState({
    tasks: orderMergedTasks(tasks, newerState),
    sessions: Array.from(sessions.values()).sort(
      (left, right) =>
        new Date(right.endedAt ?? right.startedAt).getTime() -
        new Date(left.endedAt ?? left.startedAt).getTime(),
    ),
    activeSession,
    lastWorkedTaskId: localIsNewer ? local.lastWorkedTaskId : remote.lastWorkedTaskId,
    selection: localIsNewer ? local.selection : remote.selection,
    archivedChains: [
      ...new Map(
        [...(remote.archivedChains ?? []), ...(local.archivedChains ?? [])].map((chain) => [
          chain.id,
          chain,
        ]),
      ).values(),
    ].sort(
      (left, right) => new Date(right.archivedAt).getTime() - new Date(left.archivedAt).getTime(),
    ),
    deletedTaskIds,
    updatedAt: newerIso(local.updatedAt, remote.updatedAt) ?? nowIso(),
  });
}

function orderMergedTasks(tasks: Map<string, FvpTask>, newerState: FvpState) {
  const orderedTasks: FvpTask[] = [];
  const seenTaskIds = new Set<string>();

  for (const task of newerState.tasks) {
    const mergedTask = tasks.get(task.id);
    if (!mergedTask) continue;

    orderedTasks.push(mergedTask);
    seenTaskIds.add(task.id);
  }

  const missingTasks = Array.from(tasks.values())
    .filter((task) => !seenTaskIds.has(task.id))
    .sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());

  return [...orderedTasks, ...missingTasks];
}

export function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remainder}s`;
  return `${remainder}s`;
}
