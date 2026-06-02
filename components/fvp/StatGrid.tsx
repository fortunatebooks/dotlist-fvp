import type { FvpController } from "@/components/fvp/viewTypes";

export function StatGrid({ controller }: { controller: FvpController }) {
  return (
    <div className="statGrid" aria-label="Today's progress">
      <div>
        <strong>{controller.openTasks.length}</strong>
        <span>open</span>
      </div>
      <div>
        <strong>{controller.activeChainTasks.length}</strong>
        <span>selected</span>
      </div>
      <div>
        <strong>{controller.completedToday}</strong>
        <span>done today</span>
      </div>
      <div>
        <strong>{controller.formatDuration(controller.secondsToday)}</strong>
        <span>focus today</span>
      </div>
    </div>
  );
}
