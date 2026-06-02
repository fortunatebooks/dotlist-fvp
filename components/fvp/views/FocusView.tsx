import { ArrowLeft, Check, Leaf, Pause, Sparkles, Square } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";
import { formatShortDate } from "@/components/fvp/viewTypes";

export function FocusView({ controller }: { controller: FvpController }) {
  const task = controller.activeTask ?? controller.suggestedTask;

  if (controller.state.activeSession && controller.activeTask && controller.hasStaleActiveSession) {
    return (
      <section className="focusMode staleFocus" aria-label="Earlier focus session">
        <span className="zenKicker">Paused since {formatShortDate(controller.state.activeSession.startedAt)}</span>
        <h1>{controller.activeTask.title}</h1>
        <div className="zenActionGroup">
          <button className="zenPrimaryButton" onClick={() => controller.recoverStaleSession("resume")}>
            Keep working
          </button>
          <div className="zenActionGroup horizontal">
            <button className="zenSecondaryButton" onClick={() => controller.recoverStaleSession("stop")}>
              Stop for now
            </button>
            <button className="zenSecondaryButton" onClick={() => controller.recoverStaleSession("discard")}>
              Remove timer
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!controller.state.activeSession || !controller.activeTask) {
    return (
      <section className="focusMode idleFocus" aria-label="Focus">
        <button className="linkButton darkGhost" onClick={() => controller.setView("chain")}>
          <ArrowLeft size={17} /> Back to chain
        </button>
        <div className="focusOrb">
          <Sparkles size={24} />
        </div>
        <span className="zenKicker">Focusing on</span>
        <h1 className="zenFocusTitle">{task ? task.title : "Select a task to focus."}</h1>
        {task ? (
          <button className="zenPrimaryButton" onClick={() => controller.startWork(task)}>
            Start Focus
          </button>
        ) : (
          <button className="zenPrimaryButton" onClick={controller.beginSelection}>
            Start Selection
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="focusMode activeFocus" aria-label="Active focus session">
      <button className="linkButton darkGhost" onClick={() => controller.setView("chain")}>
        <ArrowLeft size={17} /> Back
      </button>
      
      <div className="focusContent">
        <span className="zenKicker">Now working on</span>
        <h1 className="zenFocusTitle">{controller.activeTask.title}</h1>
        <span className="zenFocusTimer">{controller.formatDuration(controller.focusElapsedSeconds)}</span>
      </div>

      <div className="focusControls">
        <button className="zenPrimaryButton" onClick={() => controller.requestStop(controller.activeTask!)}>
          <Check size={20} /> Finished
        </button>
        <div className="zenActionGroup horizontal">
          <button className="zenSecondaryButton" onClick={() => controller.requestStop(controller.activeTask!)}>
            <Pause size={18} /> Finish later
          </button>
          <button className="zenSecondaryButton" onClick={() => controller.requestStop(controller.activeTask!)}>
            <Square size={18} /> End focus
          </button>
        </div>
      </div>
      
      <div className="focusFooter">
        <Leaf size={16} />
        <p>{controller.dailyWisdom}</p>
      </div>
    </section>
  );
}
