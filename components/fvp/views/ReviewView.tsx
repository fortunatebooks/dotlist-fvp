import { Check, Plus, Square } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";
import { formatShortDate, getOutcomeLabel } from "@/components/fvp/viewTypes";

export function ReviewView({ controller }: { controller: FvpController }) {
  const completedTasks = controller.state.tasks.filter((task) => task.status === "done");
  const hasProgressToday = controller.completedToday > 0 || controller.secondsToday > 0;

  return (
    <div className="viewStack">
      <section className="pageHeader">
        <p className="eyebrow">Review</p>
        <h1>{hasProgressToday ? "Good progress today." : "Review today."}</h1>
        <p>
          {hasProgressToday
            ? "Reflect, celebrate, and leave the list lighter."
            : "Completed work and focus time will appear here."}
        </p>
      </section>

      <div className="reviewGrid">
        <div className="reviewCard">
          <span>Open tasks</span>
          <strong>{controller.openTasks.length}</strong>
        </div>
        <div className="reviewCard">
          <span>Selected</span>
          <strong>{controller.activeChainTasks.length}</strong>
        </div>
        <div className="reviewCard">
          <span>Done today</span>
          <strong>{controller.completedToday}</strong>
        </div>
        <div className="reviewCard">
          <span>Focus today</span>
          <strong>{controller.formatDuration(controller.secondsToday)}</strong>
        </div>
      </div>

      <section className="history">
        <h2>Completed tasks</h2>
        {completedTasks.length === 0 ? (
          <p className="quietText">No completed tasks yet.</p>
        ) : (
          completedTasks.slice(0, 8).map((task) => (
            <div className="historyRow" key={task.id}>
              <Check size={15} aria-hidden="true" />
              <span>{task.title}</span>
              <strong>{task.completedAt ? formatShortDate(task.completedAt) : "done"}</strong>
            </div>
          ))
        )}
      </section>

      <section className="history">
        <h2>Recent focus time</h2>
        {controller.state.sessions.length === 0 ? (
          <p className="quietText">No focus time yet.</p>
        ) : (
          controller.historyRows.map((workSession) => (
            <div className="historyRow" key={workSession.id}>
              {getOutcomeIcon(workSession.outcome)}
              <span>{workSession.taskTitle}</span>
              <strong>
                {getOutcomeLabel(workSession.outcome, workSession.startedWithOverride)} ·{" "}
                {controller.formatDuration(workSession.durationSeconds ?? 0)}
              </strong>
            </div>
          ))
        )}
        {controller.state.sessions.length > 5 ? (
          <button
            className="ghostButton"
            onClick={() => controller.setShowAllHistory((current) => !current)}
          >
            {controller.showAllHistory ? "Show less" : "Show all"}
          </button>
        ) : null}
      </section>

      <section className="history">
        <h2>Past chains</h2>
        {(controller.state.archivedChains ?? []).length === 0 ? (
          <p className="quietText">No past chains yet.</p>
        ) : (
          (controller.state.archivedChains ?? []).slice(0, 5).map((chain) => (
            <div className="archiveRow" key={chain.id}>
              <strong>{chain.taskTitles.join(" -> ")}</strong>
              <span>
                {chain.reason === "cleared" ? "cleared from chain" : "completed"} ·{" "}
                {formatShortDate(chain.archivedAt)}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function getOutcomeIcon(outcome?: string) {
  if (outcome === "readded") return <Plus size={15} aria-hidden="true" />;
  if (outcome === "stopped") return <Square size={15} aria-hidden="true" />;
  return <Check size={15} aria-hidden="true" />;
}
