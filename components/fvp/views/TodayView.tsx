import { ArrowRight, CircleDot, Leaf, Plus, Sparkles, Zap } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";

export function TodayView({ controller }: { controller: FvpController }) {
  const hasTasks = controller.openTasks.length > 0;
  const hasChain = controller.activeChainTasks.length > 0;
  const workOrder = [...controller.activeChainTasks].reverse();
  const nextTask = workOrder[0];

  return (
    <div className="todayZen">
      <section className="zenHero">
        <div className="heroLandscape" aria-hidden="true" />
        <div className="zenHeroContent">
          <p className="zenEyebrow">
            <Leaf size={14} /> {controller.dailyWisdom}
          </p>
          <h1>Today</h1>
          <p className="zenSubtitle">Choose lightly. Work clearly.</p>
        </div>
      </section>

      <section className="zenStage">
        {!hasTasks ? (
          <div className="zenCard captureFocus">
            <Sparkles className="zenIcon" size={32} />
            <h2>What&apos;s on your mind?</h2>
            <p>Capture everything to clear your head.</p>
            <form className="zenCapture" onSubmit={controller.handleAddTask}>
              <input
                autoFocus
                placeholder="I want to..."
                value={controller.newTask}
                onChange={(e) => controller.setNewTask(e.target.value)}
              />
              <button type="submit" aria-label="Add task">
                <Plus size={20} />
              </button>
            </form>
          </div>
        ) : !hasChain ? (
          <div className="zenCard selectionFocus">
            <CircleDot className="zenIcon" size={32} />
            <h2>Ready to choose?</h2>
            <p>You have {controller.openTasks.length} tasks waiting for your attention.</p>
            <button className="zenPrimaryButton" onClick={controller.beginSelection}>
              Start Selection <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="zenCard workFocus">
            <Zap className="zenIcon" size={32} />
            <p className="zenKicker">Next step</p>
            <h2>{nextTask?.title}</h2>
            <p>Your chain is {controller.activeChainTasks.length} tasks long.</p>
            <div className="zenActionGroup">
              <button className="zenPrimaryButton" onClick={() => controller.startWork(nextTask)}>
                Start Focus <ArrowRight size={20} />
              </button>
              <button className="zenSecondaryButton" onClick={() => controller.setView("chain")}>
                View Chain
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="zenPulse">
        <div className="pulseItem">
          <strong>{controller.openTasks.length}</strong>
          <span>Open</span>
        </div>
        <div className="pulseDivider" />
        <div className="pulseItem">
          <strong>{controller.activeChainTasks.length}</strong>
          <span>Selected</span>
        </div>
        <div className="pulseDivider" />
        <div className="pulseItem">
          <strong>{controller.completedToday}</strong>
          <span>Done today</span>
        </div>
        <div className="pulseDivider" />
        <div className="pulseItem">
          <strong>{controller.formatDuration(controller.secondsToday)}</strong>
          <span>Focus today</span>
        </div>
      </footer>
    </div>
  );
}
