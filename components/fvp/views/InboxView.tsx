import { Plus, RotateCcw } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";
import { TaskRow } from "@/components/fvp/TaskRow";

export function InboxView({ controller }: { controller: FvpController }) {
  return (
    <div className="viewStack">
      <section className="pageHeader">
        <p className="eyebrow">Inbox</p>
        <h1>Capture anything.</h1>
        <p>Clear your mind. Dotlist can hold the list while you choose what is next.</p>
      </section>

      <form className="capture" onSubmit={controller.handleAddTask}>
        <label className="srOnly" htmlFor="new-task">
          New task
        </label>
        <input
          id="new-task"
          aria-label="New task"
          autoComplete="off"
          disabled={controller.loading}
          placeholder="Add a task..."
          value={controller.newTask}
          onChange={(event) => controller.setNewTask(event.target.value)}
        />
        <button type="submit" aria-label="Add task" disabled={controller.loading}>
          <Plus size={20} />
        </button>
      </form>

      <section className="listHeader">
        <div>
          <h2>Open list</h2>
          <p aria-live="polite">
            {controller.loading
              ? "Loading saved list..."
              : `${controller.openTasks.length} open ${controller.openTasks.length === 1 ? "task" : "tasks"}`}
          </p>
        </div>
        {controller.dottedTasks.length > 0 ? (
          <button className="ghostButton" onClick={controller.clearDots}>
            <RotateCcw size={16} />
            Clear chain
          </button>
        ) : null}
      </section>

      <section className="taskList" aria-label="FVP task list">
        {controller.openTasks.length === 0 ? (
          <div className="emptyState">
            <p>Your inbox is clear. Add anything you want Dotlist to hold.</p>
          </div>
        ) : (
          controller.openTasks.map((task, index) => (
            <TaskRow controller={controller} index={index} key={task.id} task={task} />
          ))
        )}
      </section>
    </div>
  );
}
