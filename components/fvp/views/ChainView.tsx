import { Play, RotateCcw } from "lucide-react";
import type { FvpController } from "@/components/fvp/viewTypes";

export function ChainView({ controller }: { controller: FvpController }) {
  const workOrder = [...controller.activeChainTasks].reverse();

  return (
    <div className="viewStack">
      <section className="pageHeader">
        <p className="eyebrow">Chain</p>
        <h1>Your active chain.</h1>
        <p>Focus flows from here. The newest selected task is worked first.</p>
      </section>

      <section className="chainPanel">
        {workOrder.length === 0 ? (
          <div className="emptyState">
            <p>No active chain yet.</p>
            <button className="primaryButton" onClick={controller.beginSelection}>
              Start Selection
            </button>
          </div>
        ) : (
          <>
            <div className="chainHeader">
              <div>
                <span className="railLabel">Next action</span>
                <h2>{workOrder[0].title}</h2>
              </div>
              <button className="primaryButton largeButton" onClick={() => controller.startWork(workOrder[0])}>
                <Play size={18} />
                Start Focus
              </button>
            </div>
            <ol className="chainList">
              {workOrder.map((task, index) => (
                <li key={task.id}>
                  <span>{index + 1}</span>
                  <strong>{task.title}</strong>
                </li>
              ))}
            </ol>
            <button className="ghostButton" onClick={controller.clearDots}>
              <RotateCcw size={16} />
              Start this chain over
            </button>
          </>
        )}
      </section>
    </div>
  );
}
