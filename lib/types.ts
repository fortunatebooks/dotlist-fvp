export type TaskStatus = "open" | "done";

export type FvpTask = {
  id: string;
  title: string;
  status: TaskStatus;
  dotted: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  sourceTaskId?: string;
};

export type WorkSession = {
  id: string;
  taskId: string;
  taskTitle: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  outcome?: "done" | "readded" | "stopped";
  startedWithOverride?: boolean;
};

export type SelectionPass = {
  active: boolean;
  scanIndex: number;
  lastSelectedTaskId?: string;
  completedAt?: string;
};

export type ArchivedChain = {
  id: string;
  taskTitles: string[];
  archivedAt: string;
  reason: "cleared" | "completed";
};

export type FvpState = {
  tasks: FvpTask[];
  sessions: WorkSession[];
  activeSession?: WorkSession;
  lastWorkedTaskId?: string;
  selection?: SelectionPass;
  archivedChains?: ArchivedChain[];
  deletedTaskIds?: string[];
  updatedAt: string;
};
