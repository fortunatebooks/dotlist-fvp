import { ArrowDownToLine, Circle, CircleDot, GripVertical, Play, Trash2 } from "lucide-react";
import type { FvpTask } from "@/lib/types";
import type { FvpController } from "@/components/fvp/viewTypes";
import { formatShortDate } from "@/components/fvp/viewTypes";

export function TaskRow({
  controller,
  index,
  task,
}: {
  controller: FvpController;
  index: number;
  task: FvpTask;
}) {
  const isSuggested = controller.suggestedTask?.id === task.id;
  const isEligibleDot = controller.eligibleDotTaskIds.has(task.id);
  const isActiveTask = controller.state.activeSession?.taskId === task.id;
  const canToggleDot =
    !isActiveTask &&
    (task.dotted || isEligibleDot || controller.overrideDotTaskIds.has(task.id));

  return (
    <article
      className={[
        "taskRow",
        task.dotted ? "isDotted" : "",
        isSuggested ? "isSuggested" : "",
        isEligibleDot ? "isEligibleDot" : "",
      ].join(" ")}
      draggable={!isActiveTask}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", task.id);
        event.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const movedTaskId = event.dataTransfer.getData("text/plain");
        if (movedTaskId) controller.moveTaskBefore(movedTaskId, task.id);
      }}
    >
      <GripVertical className="dragHandle" size={18} aria-hidden="true" />
      <button
        className="completeButton"
        aria-label={`Complete ${task.title}`}
        disabled={Boolean(isActiveTask)}
        onClick={() => controller.completeTask(task.id)}
      >
        <Circle size={16} />
      </button>
      <button
        className="dotButton"
        aria-label={task.dotted ? `Remove dot from ${task.title}` : `Dot ${task.title}`}
        disabled={!canToggleDot}
        onClick={() => controller.toggleDot(task.id)}
      >
        {task.dotted ? <span /> : null}
      </button>
      <div className="taskBody">
        <p>{task.title}</p>
        <span>
          #{index + 1} · added {formatShortDate(task.createdAt)}
          {task.sourceTaskId ? " · put back at the end" : ""}
          {isEligibleDot ? " · next to consider" : ""}
        </span>
      </div>
      {!canToggleDot && !task.dotted ? (
        <button
          className="textButton"
          onClick={() => {
            controller.setOverrideDotTaskIds((current) => new Set(current).add(task.id));
            controller.toggleDot(task.id, true);
          }}
        >
          Choose anyway
        </button>
      ) : null}
      <button
        className="iconButton"
        aria-label={isSuggested ? `Start ${task.title}` : `Start ${task.title} anyway`}
        disabled={Boolean(controller.state.activeSession)}
        onClick={() => controller.startWork(task, !isSuggested)}
      >
        <Play size={17} />
      </button>
      <button
        className="iconButton"
        aria-label={`Move ${task.title} to end`}
        disabled={Boolean(isActiveTask)}
        onClick={() => controller.moveTaskToEnd(task.id)}
      >
        <ArrowDownToLine size={17} />
      </button>
      <button
        className="iconButton"
        aria-label={`Delete ${task.title}`}
        disabled={Boolean(isActiveTask)}
        onClick={() => controller.deleteTask(task.id)}
      >
        <Trash2 size={17} />
      </button>
      <div className="mobileTaskActions" aria-label={`${task.title} actions`}>
        <button
          aria-label={task.dotted ? `Unselect ${task.title}` : `Select ${task.title}`}
          disabled={!canToggleDot}
          onClick={() => controller.toggleDot(task.id)}
        >
          <CircleDot size={15} />
          {task.dotted ? "Unselect" : "Select"}
        </button>
        <button
          aria-label={isSuggested ? `Start ${task.title}` : `Start ${task.title} anyway`}
          disabled={Boolean(controller.state.activeSession)}
          onClick={() => controller.startWork(task, !isSuggested)}
        >
          <Play size={15} />
          Start
        </button>
        <button
          aria-label={`Delete ${task.title}`}
          disabled={Boolean(isActiveTask)}
          onClick={() => controller.deleteTask(task.id)}
        >
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </article>
  );
}
