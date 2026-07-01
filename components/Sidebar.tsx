"use client";

import {
  Search,
  Bell,
  Target,
  CheckSquare,
  User,
  Building2,
  FileText,
  ChevronDown,
  MessageSquare,
  Home,
} from "lucide-react";

const WORKSPACE_ITEMS = [
  { icon: Building2,   label: "Companies",     id: "companies",     bg: "#E8F0FF", iconColor: "#3E63DD" },
  { icon: User,        label: "People",        id: "people",        bg: "#EDE9FE", iconColor: "#7C3AED" },
  { icon: Target,      label: "Opportunities", id: "opportunities", bg: "#FFE4E4", iconColor: "#DC2626" },
  { icon: CheckSquare, label: "Tasks",         id: "tasks",         bg: "#DCFCE7", iconColor: "#16A34A" },
  { icon: FileText,    label: "Notes",         id: "notes",         bg: "#DCFCE7", iconColor: "#16A34A" },
  { icon: Bell,        label: "Notifications", id: "notifications", bg: "#FEF3C7", iconColor: "#D97706" },
];

export function Sidebar({ unreadCount = 1 }: { unreadCount?: number }) {
  return (
    <aside className="w-[240px] flex-shrink-0 h-full flex flex-col border-r border-(--color-border-medium) bg-(--color-bg-primary) overflow-hidden">

      {/* Top bar — 12px horizontal padding */}
      <div className="flex items-center gap-1 px-3 h-12 border-b border-(--color-border-medium) flex-shrink-0">
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-(--color-bg-tertiary) transition-colors">
          <Home size={16} className="text-(--color-text-secondary)" strokeWidth={1.5} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-(--color-bg-tertiary) transition-colors">
          <MessageSquare size={16} className="text-(--color-text-secondary)" strokeWidth={1.5} />
        </button>
        <button className="flex items-center gap-1.5 ml-auto h-8 px-3 rounded-full border border-(--color-border-medium) hover:bg-(--color-bg-tertiary) transition-colors text-[13px] text-(--color-text-secondary)">
          <MessageSquare size={14} strokeWidth={1.5} />
          New chat
        </button>
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-3">
          <p className="text-[11px] font-medium text-(--color-text-tertiary) px-2 mb-1">Workspace</p>

          <nav className="space-y-0">
            {WORKSPACE_ITEMS.map(({ icon: Icon, label, id, bg, iconColor }) => {
              const isActive = id === "notifications";
              return (
                <button
                  key={id}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px] text-left transition-colors cursor-pointer ${
                    isActive ? "bg-(--color-bg-tertiary)" : "hover:bg-(--color-bg-tertiary)"
                  }`}
                >
                  {/* Colored icon badge */}
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={12} strokeWidth={2} style={{ color: iconColor }} />
                  </div>

                  <span className={`flex-1 ${isActive ? "font-semibold text-(--color-text-primary)" : "text-(--color-text-secondary)"}`}>
                    {label}
                  </span>

                  {id === "notifications" && unreadCount > 0 && (
                    <span className="w-[18px] h-[18px] rounded-full bg-(--color-red-9) text-white text-[10px] flex items-center justify-center font-medium flex-shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom user row */}
      <div className="flex-shrink-0 border-t border-(--color-border-medium) px-3 py-2">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-(--color-bg-tertiary) transition-colors">
          <div className="w-5 h-5 rounded-full bg-(--color-accent-3) flex items-center justify-center text-(--color-accent-9) text-[10px] font-semibold flex-shrink-0">
            M
          </div>
          <span className="text-[13px] text-(--color-text-secondary)">Martha</span>
        </button>
      </div>
    </aside>
  );
}
