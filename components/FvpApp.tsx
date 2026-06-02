"use client";

import { AppShell } from "@/components/fvp/Shell";
import { HelpDialog, SettingsDialog, StopDialog } from "@/components/fvp/Overlays";
import { ChainView } from "@/components/fvp/views/ChainView";
import { FocusView } from "@/components/fvp/views/FocusView";
import { InboxView } from "@/components/fvp/views/InboxView";
import { ReviewView } from "@/components/fvp/views/ReviewView";
import { SelectionView } from "@/components/fvp/views/SelectionView";
import { TodayView } from "@/components/fvp/views/TodayView";
import { useFvpController } from "@/components/fvp/useFvpController";

export function FvpApp() {
  const controller = useFvpController();

  return (
    <AppShell controller={controller}>
      {controller.view === "today" ? <TodayView controller={controller} /> : null}
      {controller.view === "inbox" ? <InboxView controller={controller} /> : null}
      {controller.view === "selection" ? <SelectionView controller={controller} /> : null}
      {controller.view === "chain" ? <ChainView controller={controller} /> : null}
      {controller.view === "focus" ? <FocusView controller={controller} /> : null}
      {controller.view === "review" ? <ReviewView controller={controller} /> : null}
      <StopDialog controller={controller} />
      <SettingsDialog controller={controller} />
      <HelpDialog controller={controller} />
    </AppShell>
  );
}
