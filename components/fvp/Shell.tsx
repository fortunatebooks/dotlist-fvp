import {
  BarChart3,
  CircleDot,
  HelpCircle,
  Home,
  Inbox,
  Leaf,
  Link2,
  Menu,
  Settings,
  Timer,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import type { AppView } from "@/components/fvp/useFvpController";
import type { FvpController } from "@/components/fvp/viewTypes";

const primaryNav: Array<{ view: AppView; label: string; icon: ReactNode }> = [
  { view: "today", label: "Today", icon: <Home size={18} /> },
  { view: "inbox", label: "Inbox", icon: <Inbox size={18} /> },
  { view: "selection", label: "Select", icon: <CircleDot size={18} /> },
  { view: "chain", label: "Chain", icon: <Link2 size={18} /> },
  { view: "focus", label: "Focus", icon: <Timer size={18} /> },
  { view: "review", label: "Review", icon: <BarChart3 size={18} /> },
];

const mobileNav: Array<{ view: AppView; label: string; icon: ReactNode }> = [
  { view: "today", label: "Today", icon: <Home size={18} /> },
  { view: "inbox", label: "Inbox", icon: <Inbox size={18} /> },
  { view: "selection", label: "Select", icon: <CircleDot size={18} /> },
  { view: "chain", label: "Chain", icon: <Link2 size={18} /> },
  { view: "review", label: "Review", icon: <BarChart3 size={18} /> },
];

export function AppShell({
  controller,
  children,
}: {
  controller: FvpController;
  children: ReactNode;
}) {
  function goTo(view: AppView) {
    controller.setShowMobileMenu(false);
    controller.setView(view);
  }

  return (
    <main className={`dotlistShell view-${controller.view}`}>
      <aside className="desktopSidebar" aria-label="Dotlist navigation">
        <button className="sidebarBrand" onClick={() => goTo("today")}>
          Dotlist
        </button>
        <nav className="sidebarNav" aria-label="Primary">
          {primaryNav.map((item) => (
            <button
              className={controller.view === item.view ? "sideNavButton isActive" : "sideNavButton"}
              key={item.view}
              onClick={() => goTo(item.view)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebarWisdom">
          <Leaf size={20} />
          <p>{controller.dailyWisdom}</p>
        </div>
        <button className="sideNavButton sidebarSettings" onClick={() => controller.setShowSettings(true)}>
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </aside>


      <section className="appStage">
        <header className="mobileTopbar" aria-label="Mobile controls">
          <button
            className="iconButton subtleIcon"
            aria-label="Open menu"
            onClick={() => controller.setShowMobileMenu(true)}
          >
            <Menu size={18} />
          </button>
          <button className="mobileBrand" onClick={() => goTo("today")}>
            Dotlist
          </button>
          <button
            className="iconButton subtleIcon"
            aria-label="Open help"
            onClick={() => controller.setShowHelp(true)}
          >
            <HelpCircle size={18} />
          </button>
        </header>

        <div className="desktopUtilityBar" aria-label="Status and controls">
          <span>{controller.visibleSyncStatus}</span>
          <button className="iconButton subtleIcon" aria-label="Open help" onClick={() => controller.setShowHelp(true)}>
            <HelpCircle size={17} />
          </button>
          <button
            className="iconButton subtleIcon"
            aria-label="Open settings"
            onClick={() => controller.setShowSettings(true)}
          >
            <Settings size={17} />
          </button>
        </div>

        <section className="mainSurface">{children}</section>
      </section>

      <nav className="bottomNav" aria-label="Primary">
        {mobileNav.map((item) => (
          <button
            className={controller.view === item.view ? "bottomNavButton isActive" : "bottomNavButton"}
            key={item.view}
            onClick={() => goTo(item.view)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {controller.showMobileMenu ? (
        <div className="mobileMenuBackdrop" role="presentation">
          <div className="mobileMenu" role="dialog" aria-modal="true" aria-label="More navigation">
            <div className="mobileMenuHeader">
              <strong>Dotlist</strong>
              <button
                className="iconButton subtleIcon"
                aria-label="Close menu"
                onClick={() => controller.setShowMobileMenu(false)}
              >
                <X size={18} />
              </button>
            </div>
            {primaryNav.map((item) => (
              <button
                className={controller.view === item.view ? "mobileMenuButton isActive" : "mobileMenuButton"}
                key={item.view}
                onClick={() => goTo(item.view)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button className="mobileMenuButton" onClick={() => controller.setShowSettings(true)}>
              <Settings size={17} />
              Settings
            </button>
            <p>{controller.dailyWisdom}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
