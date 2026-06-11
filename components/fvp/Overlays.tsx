import { Check, Download, Plus, RotateCcw, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef } from "react";
import type { FvpController } from "@/components/fvp/viewTypes";

export function StopDialog({ controller }: { controller: FvpController }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!controller.stopTask) return;

    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    window.setTimeout(() => {
      const firstButton = dialogRef.current?.querySelector<HTMLButtonElement>("button");
      firstButton?.focus();
    }, 0);

    return () => {
      lastFocusedElementRef.current?.focus();
    };
  }, [controller.stopTask]);

  if (!controller.stopTask) return null;

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      controller.setStopTask(null);
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("disabled"));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="dialogBackdrop" role="presentation">
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stop-title"
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
      >
        <h2 id="stop-title">What happened with this task?</h2>
        <p>{controller.stopTask.title}</p>
        <div className="dialogActions">
          <button className="primaryButton dark" onClick={() => controller.finishWork("done")}>
            <Check size={18} />
            Mark done
          </button>
          <button className="primaryButton" onClick={() => controller.finishWork("readded")}>
            <Plus size={18} />
            Put back at the end
          </button>
          <button className="ghostButton" onClick={() => controller.finishWork("stopped")}>
            Stop for now
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDialog({ controller }: { controller: FvpController }) {
  if (!controller.showSettings) return null;

  return (
    <div className="dialogBackdrop" role="presentation">
      <div className="dialog settingsDialog" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="dialogTitleRow">
          <h2 id="settings-title">Settings</h2>
          <button
            className="iconButton"
            aria-label="Close settings"
            onClick={() => controller.setShowSettings(false)}
          >
            <X size={18} />
          </button>
        </div>
        <label className="fieldLabel" htmlFor="theme-preference">
          Theme
        </label>
        <select
          id="theme-preference"
          value={controller.theme}
          onChange={(event) => controller.setTheme(event.target.value as typeof controller.theme)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <div className="settingsGroup">
          <span className="railLabel">Storage</span>
          <p>{controller.visibleSyncStatus}</p>
          <p>Dotlist stores data in this browser. Use export before clearing site data or changing devices.</p>
        </div>

        <div className="settingsActions">
          <button className="ghostButton" onClick={controller.exportData}>
            <Download size={16} />
            Export data
          </button>
          <button className="ghostButton dangerButton" onClick={controller.resetData}>
            <RotateCcw size={16} />
            Clear this device
          </button>
        </div>
      </div>
    </div>
  );
}

export function HelpDialog({ controller }: { controller: FvpController }) {
  if (!controller.showHelp) return null;

  return (
    <div className="dialogBackdrop" role="presentation">
      <div className="dialog helpDialog" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <div className="dialogTitleRow">
          <h2 id="help-title">Help</h2>
          <button
            className="iconButton"
            aria-label="Close help"
            onClick={() => controller.setShowHelp(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="helpList">
          <p>Capture everything in Inbox so your mind does not have to hold it.</p>
          <p>Use Select to choose whether you would rather do the next task.</p>
          <p>Follow the newest selected task first from Chain or Focus.</p>
          <p>Put unfinished work back at the end when you want to come back to it later.</p>
        </div>
        <div className="wisdomShelf" aria-label="Dotlist wisdom">
          {controller.wisdomLibrary.slice(0, 12).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <a className="supportLink" href="https://github.com/fortunatebooks/dotlist-fvp/issues">
          Contact support
        </a>
      </div>
    </div>
  );
}
