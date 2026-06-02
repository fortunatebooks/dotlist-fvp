"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  archiveCurrentChain,
  createEmptyState,
  createTask,
  formatDuration,
  getActiveChainTasks,
  getBenchmarkTask,
  getDottedTasks,
  getEligibleDotTaskIds,
  getOpenTasks,
  getScanAnchorTask,
  getSelectionCandidate,
  getSuggestedTask,
  isStaleActiveSession,
  makeId,
  nowIso,
  reorderTask,
  selectSelectionCandidate,
  skipSelectionCandidate,
  startSelectionPass,
  mergeStates,
} from "@/lib/fvp";
import { getDailyWisdom, getWisdomLibrary } from "@/lib/inspiration";
import { loadLocalState, saveLocalState } from "@/lib/storage";
import type { FvpState, FvpTask, WorkSession } from "@/lib/types";

export type AppView = "today" | "inbox" | "selection" | "chain" | "focus" | "review";
export type StopChoice = "done" | "readded" | "stopped";
export type ThemePreference = "system" | "light" | "dark";

const ONBOARDING_KEY = "fvp.onboarding.dismissed";
const THEME_KEY = "fvp.theme";

export function useFvpController() {
  const [state, setState] = useState<FvpState>(() => loadLocalState());
  const [view, setView] = useState<AppView>(() =>
    loadLocalState().activeSession ? "focus" : "today",
  );
  const [newTask, setNewTask] = useState("");
  const [stopTask, setStopTask] = useState<FvpTask | null>(null);
  const loading = false;
  const [syncStatus, setSyncStatus] = useState("Saved on this device");
  const [currentTimeMs, setCurrentTimeMs] = useState(0);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(ONBOARDING_KEY) !== "true",
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [theme, setThemeState] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "system";
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    return savedTheme === "light" || savedTheme === "dark" || savedTheme === "system"
      ? savedTheme
      : "system";
  });
  const [overrideDotTaskIds, setOverrideDotTaskIds] = useState<Set<string>>(() => new Set());
  const [resumedStaleSessionIds, setResumedStaleSessionIds] = useState<Set<string>>(
    () => new Set(),
  );

  const openTasks = useMemo(() => getOpenTasks(state), [state]);
  const dottedTasks = useMemo(() => getDottedTasks(state), [state]);
  const activeChainTasks = useMemo(() => getActiveChainTasks(state), [state]);
  const suggestedTask = useMemo(() => getSuggestedTask(state), [state]);
  const benchmarkTask = useMemo(() => getBenchmarkTask(state), [state]);
  const selectionCandidate = useMemo(() => getSelectionCandidate(state), [state]);
  const scanAnchorTask = useMemo(() => getScanAnchorTask(state), [state]);
  const eligibleDotTaskIds = useMemo(() => getEligibleDotTaskIds(state), [state]);
  const completedToday = useMemo(() => countCompletedToday(state.tasks), [state.tasks]);
  const secondsToday = useMemo(() => countSecondsToday(state.sessions), [state.sessions]);
  const capturedToday = useMemo(() => countCapturedToday(state.tasks), [state.tasks]);
  const activeTask = state.activeSession
    ? state.tasks.find((task) => task.id === state.activeSession?.taskId)
    : null;
  const hasStaleActiveSession = Boolean(
    state.activeSession &&
      isStaleActiveSession(state.activeSession) &&
      !resumedStaleSessionIds.has(state.activeSession.id),
  );
  const visibleSyncStatus = syncStatus;
  const historyRows = showAllHistory ? state.sessions : state.sessions.slice(0, 5);
  const focusElapsedSeconds =
    state.activeSession && !hasStaleActiveSession
      ? Math.floor(
          ((currentTimeMs || new Date(state.activeSession.startedAt).getTime()) -
            new Date(state.activeSession.startedAt).getTime()) /
            1000,
        )
      : 0;
  const dailyWisdom = useMemo(() => getDailyWisdom(), []);
  const wisdomLibrary = useMemo(() => getWisdomLibrary(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (loading) return;
    saveLocalState(state);
  }, [loading, state]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== "fvp.state.v1" || !event.newValue) return;

      try {
        const incomingState = JSON.parse(event.newValue) as FvpState;
        setState((current) =>
          incomingState.updatedAt === current.updatedAt ? current : mergeStates(current, incomingState),
        );
        setSyncStatus("Updated from another window");
      } catch {
        setSyncStatus("Could not read changes from another window");
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!state.activeSession) return;
    const timer = window.setInterval(() => setCurrentTimeMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [state.activeSession]);

  function updateState(mutator: (current: FvpState) => FvpState) {
    setState((current) => {
      const next = mutator(current);
      if (next === current) return current;

      return {
        ...next,
        updatedAt: nowIso(),
      };
    });
  }

  function addTask(title: string) {
    if (!title.trim()) return;

    updateState((current) => ({
      ...current,
      tasks: [...current.tasks, createTask(title.trim())],
      selection: undefined,
    }));
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTask(newTask);
    setNewTask("");
  }

  function completeTask(taskId: string) {
    const completedAt = nowIso();

    updateState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "done" as const,
              dotted: true,
              completedAt,
              updatedAt: completedAt,
            }
          : task,
      ),
      lastWorkedTaskId: taskId,
      selection: undefined,
    }));
  }

  function toggleDot(taskId: string, force = false) {
    updateState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              dotted:
                current.activeSession?.taskId === taskId
                  ? task.dotted
                  : force || getEligibleDotTaskIds(current).has(taskId) || task.dotted
                    ? !task.dotted
                    : task.dotted,
              updatedAt: nowIso(),
            }
          : task,
      ),
      selection: undefined,
    }));
  }

  function startWork(task: FvpTask, startedWithOverride = false) {
    updateState((current) => {
      if (current.activeSession) return current;

      const currentTask = current.tasks.find(
        (candidate) => candidate.id === task.id && candidate.status === "open",
      );
      if (!currentTask) return current;

      return {
        ...current,
        activeSession: {
          id: makeId("session"),
          taskId: currentTask.id,
          taskTitle: currentTask.title,
          startedAt: nowIso(),
          startedWithOverride,
        },
      };
    });

    setCurrentTimeMs(Date.now());
    setView("focus");
  }

  function requestStop(task: FvpTask) {
    setStopTask(task);
  }

  function finishWork(choice: StopChoice) {
    if (!state.activeSession || !stopTask) return;

    const endedAt = nowIso();
    const stoppedTaskId = stopTask.id;
    const stoppedTaskTitle = stopTask.title;

    updateState((current) => {
      if (!current.activeSession) return current;

      const durationSeconds = Math.round(
        (new Date(endedAt).getTime() - new Date(current.activeSession.startedAt).getTime()) / 1000,
      );
      const activeSession: WorkSession = {
        ...current.activeSession,
        endedAt,
        durationSeconds,
        outcome: choice,
      };

      const tasks = current.tasks.map((task) => {
        if (task.id !== stoppedTaskId) return task;

        if (choice === "done" || choice === "readded") {
          return {
            ...task,
            status: "done" as const,
            dotted: true,
            completedAt: endedAt,
            updatedAt: endedAt,
          };
        }

        return {
          ...task,
          dotted: true,
          updatedAt: endedAt,
        };
      });

      return {
        ...current,
        tasks:
          choice === "readded"
            ? [...tasks, createTask(stoppedTaskTitle, stoppedTaskId)]
            : tasks,
        sessions: [activeSession, ...current.sessions],
        activeSession: undefined,
        lastWorkedTaskId: stoppedTaskId,
        selection: startSelectionPass({ ...current, tasks, lastWorkedTaskId: stoppedTaskId })
          .selection,
      };
    });

    setStopTask(null);
    setView("selection");
  }

  function deleteTask(taskId: string) {
    updateState((current) => ({
      ...current,
      tasks: current.activeSession?.taskId === taskId
        ? current.tasks
        : current.tasks.filter((task) => task.id !== taskId),
      deletedTaskIds:
        current.activeSession?.taskId === taskId
          ? current.deletedTaskIds
          : Array.from(new Set([...(current.deletedTaskIds ?? []), taskId])),
      selection: undefined,
    }));
  }

  function clearDots() {
    if (!window.confirm("Clear this chain and choose again? Your tasks will stay in the list.")) return;

    updateState((current) => {
      const archived = archiveCurrentChain(current, "cleared");
      return {
        ...archived,
        tasks: archived.tasks.map((task) =>
          task.status === "open" && task.id !== archived.activeSession?.taskId
            ? { ...task, dotted: false, updatedAt: nowIso() }
            : task,
        ),
        lastWorkedTaskId: undefined,
        selection: undefined,
      };
    });
  }

  function moveTaskToEnd(taskId: string) {
    updateState((current) => {
      if (current.activeSession?.taskId === taskId) return current;

      const task = current.tasks.find((candidate) => candidate.id === taskId);
      if (!task) return current;

      return {
        ...current,
        tasks: [
          ...current.tasks.filter((candidate) => candidate.id !== taskId),
          { ...task, updatedAt: nowIso() },
        ],
        selection: undefined,
      };
    });
  }

  function moveTaskBefore(taskId: string, targetTaskId: string) {
    updateState((current) => reorderTask(current, taskId, targetTaskId));
  }

  function beginSelection() {
    updateState(startSelectionPass);
    setShowMobileMenu(false);
    setView("selection");
  }

  function selectCandidate() {
    updateState(selectSelectionCandidate);
  }

  function skipCandidate() {
    updateState(skipSelectionCandidate);
  }

  function recoverStaleSession(choice: "resume" | "stop" | "discard") {
    if (choice === "resume") {
      if (state.activeSession) {
        setResumedStaleSessionIds((current) => new Set(current).add(state.activeSession!.id));
        setCurrentTimeMs(Date.now());
        setView("focus");
      }
      return;
    }

    const endedAt = nowIso();
    updateState((current) => {
      if (!current.activeSession) return current;

      if (choice === "discard") {
        return { ...current, activeSession: undefined };
      }

      const durationSeconds = Math.round(
        (new Date(endedAt).getTime() - new Date(current.activeSession.startedAt).getTime()) / 1000,
      );

      const tasks = current.tasks.map((task) =>
        task.id === current.activeSession?.taskId
          ? { ...task, dotted: true, updatedAt: endedAt }
          : task,
      );

      return {
        ...current,
        tasks,
        sessions: [
          {
            ...current.activeSession,
            endedAt,
            durationSeconds,
            outcome: "stopped",
          },
          ...current.sessions,
        ],
        activeSession: undefined,
        lastWorkedTaskId: current.activeSession.taskId,
        selection: startSelectionPass({
          ...current,
          tasks,
          activeSession: undefined,
          lastWorkedTaskId: current.activeSession.taskId,
        }).selection,
      };
    });
    setView("selection");
  }

  function dismissOnboarding() {
    window.localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  }

  function resetData() {
    if (!window.confirm("Clear Dotlist from this device? This cannot be undone.")) return;
    setState(createEmptyState());
    setSyncStatus("Cleared on this device");
    setView("today");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dotlist-export-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  function setTheme(nextTheme: ThemePreference) {
    setThemeState(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  return {
    activeChainTasks,
    activeTask,
    addTask,
    beginSelection,
    benchmarkTask,
    capturedToday,
    clearDots,
    completeTask,
    completedToday,
    deleteTask,
    dismissOnboarding,
    dottedTasks,
    dailyWisdom,
    eligibleDotTaskIds,
    exportData,
    finishWork,
    focusElapsedSeconds,
    formatDuration,
    handleAddTask,
    hasStaleActiveSession,
    historyRows,
    loading,
    moveTaskBefore,
    moveTaskToEnd,
    newTask,
    openTasks,
    overrideDotTaskIds,
    recoverStaleSession,
    requestStop,
    resetData,
    scanAnchorTask,
    secondsToday,
    selectCandidate,
    selectionCandidate,
    setNewTask,
    setOverrideDotTaskIds,
    setShowAllHistory,
    setShowHelp,
    setShowMobileMenu,
    setShowSettings,
    setTheme,
    setStopTask,
    setView,
    showAllHistory,
    showHelp,
    showMobileMenu,
    showOnboarding,
    showSettings,
    skipCandidate,
    startWork,
    state,
    stopTask,
    suggestedTask,
    syncStatus,
    theme,
    toggleDot,
    view,
    visibleSyncStatus,
    wisdomLibrary,
  };
}

function countCompletedToday(tasks: FvpTask[]) {
  const today = new Date().toDateString();
  return tasks.filter((task) => {
    if (!task.completedAt) return false;
    return new Date(task.completedAt).toDateString() === today;
  }).length;
}

function countCapturedToday(tasks: FvpTask[]) {
  const today = new Date().toDateString();
  return tasks.filter((task) => new Date(task.createdAt).toDateString() === today).length;
}

function countSecondsToday(sessions: WorkSession[]) {
  const today = new Date().toDateString();
  return sessions.reduce((total, workSession) => {
    if (!workSession.endedAt) return total;
    if (new Date(workSession.endedAt).toDateString() !== today) return total;
    return total + (workSession.durationSeconds ?? 0);
  }, 0);
}
