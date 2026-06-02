import { Check, CircleDot, SkipForward } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";

export function SelectionView({ controller }: { controller: FvpController }) {
  const candidate = controller.selectionCandidate;
  const benchmark = controller.benchmarkTask;
  const displayBenchmark = controller.dottedTasks.length > 0 ? benchmark : undefined;
  const hasTasks = controller.openTasks.length > 0;
  const comparisonQuestion =
    candidate && displayBenchmark
      ? `Do you want to do "${candidate.title}" more than "${displayBenchmark.title}"?`
      : "Is this the first task you want to choose?";

  return (
    <div className="viewStack">
      <section className="pageHeader">
        <p className="eyebrow">Select</p>
        <h1>Choose intentionally.</h1>
        <p>Choose gently. Dotlist will build your work order.</p>
      </section>

      <section className="selectionPanel" aria-live="polite">
        {!hasTasks ? (
          <div className="emptyState">
            <p>Add tasks before selecting.</p>
            <button className="primaryButton" onClick={() => controller.setView("inbox")}>
              Open Inbox
            </button>
          </div>
        ) : candidate ? (
          <>
            <h2 className="selectionQuestion">{comparisonQuestion}</h2>
            <div className="compareGrid">
              <div>
                <span>Already chosen</span>
                <strong>{displayBenchmark?.title ?? "Start here"}</strong>
              </div>
              <div>
                <span>This task</span>
                <strong>{candidate.title}</strong>
              </div>
            </div>
            {controller.scanAnchorTask && controller.dottedTasks.length > 0 ? (
              <p className="selectionHint">Looking below {controller.scanAnchorTask.title}</p>
            ) : null}
            <div className="selectionActions">
              <button className="primaryButton" onClick={controller.selectCandidate}>
                <Check size={18} />
                Select
              </button>
              <button className="ghostButton" onClick={controller.skipCandidate}>
                <SkipForward size={18} />
                Skip
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="completeBadge">
              <CircleDot size={22} />
              Selection complete
            </div>
            <h2>
              {controller.suggestedTask
                ? `"${controller.suggestedTask.title}" is ready to work next.`
                : "No task is selected yet."}
            </h2>
            <div className="selectionActions">
              {controller.suggestedTask ? (
                <button
                  className="primaryButton"
                  onClick={() => controller.startWork(controller.suggestedTask!)}
                >
                  Start Focus
                </button>
              ) : null}
              <button className="ghostButton" onClick={controller.beginSelection}>
                Choose again
              </button>
            </div>
          </>
        )}
      </section>

      <div className="progressStrip" aria-label="Selected chain progress">
        {controller.openTasks.map((task) => (
          <span
            className={task.dotted ? "isSelected" : ""}
            key={task.id}
            title={task.title}
            aria-label={task.dotted ? `${task.title} selected` : `${task.title} not selected`}
          />
        ))}
      </div>
    </div>
  );
}
