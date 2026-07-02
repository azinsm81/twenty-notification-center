"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar, type SortMode } from "@/components/TopBar";
import { DetailDrawer } from "@/components/DetailDrawer";
import { NOTIFICATIONS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const COMPANY_BG: Record<string, string> = {
  S: "#FFECE8",
  J: "#DCFCE7",
  B: "#EEF2FF",
};
const COMPANY_COLOR: Record<string, string> = {
  S: "#E54D2E",
  J: "#16A34A",
  B: "#3E63DD",
};

// Group notifications by dateGroup
const DATE_GROUPS = ["Today", "Yesterday"];

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifARead, setNotifARead] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("chronological");

  function handleSent() {
    setDrawerOpen(false);
    setNotifARead(true);
    setShowToast(true);
  }

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const isRead = (id: string) => (id === "A" && notifARead) || id === "B" || id === "C";

  const sortedNotifications = sortMode === "importance"
    ? [...NOTIFICATIONS].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0))
    : [...NOTIFICATIONS];

  const DATE_GROUPS_SORTED = sortMode === "importance"
    ? ["Urgent", "Other"]
    : DATE_GROUPS;

  function getGroup(n: typeof NOTIFICATIONS[number]) {
    if (sortMode === "importance") return n.urgent ? "Urgent" : "Other";
    return n.dateGroup;
  }

  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar unreadCount={notifARead ? 0 : 1} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative">
        <TopBar sortMode={sortMode} onSortChange={setSortMode} />

        <main className="flex-1 overflow-y-auto bg-(--color-bg-primary)">
          <div>
            {DATE_GROUPS_SORTED.map((group) => {
              const rows = sortedNotifications.filter((n) => getGroup(n) === group);
              if (!rows.length) return null;

              return (
                <div key={group}>
                  {/* Date group header */}
                  <div className="px-6 pt-6 pb-2">
                    <span className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest">
                      {group}
                    </span>
                  </div>

                  {/* Notification rows */}
                  {rows.map((n) => {
                    const isA = n.id === "A";
                    const read = isRead(n.id);
                    const initial = n.customer[0];
                    const bg = COMPANY_BG[initial] ?? "#F1F1F1";
                    const color = COMPANY_COLOR[initial] ?? "#999999";

                    return (
                      <div
                        key={n.id}
                        className={`group flex gap-4 px-6 py-4 border-b border-(--color-border-light) transition-colors ${
                          isA ? "cursor-pointer hover:bg-(--color-bg-notification-hover)" : "cursor-default"
                        }`}
                        onClick={isA ? () => setDrawerOpen(true) : undefined}
                      >
                        {/* Unread dot column */}
                        <div className="pt-1.5 w-3 flex-shrink-0 flex items-start justify-center">
                          {!read && (
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 block"
                              style={{ backgroundColor: n.urgent ? "#E5484D" : "#8E4EC6" }}
                            />
                          )}
                        </div>

                        {/* Avatar */}
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: bg, color }}
                        >
                          {initial}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[13px] font-semibold leading-snug text-(--color-text-primary)">
                                {n.title}
                              </span>
                              {n.urgent && !read && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[13px] font-medium bg-(--color-bg-danger) text-(--color-text-danger) flex-shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-red-9) inline-block" />
                                  Urgent
                                </span>
                              )}
                            </div>
                            <span className="text-[12px] text-(--color-text-tertiary) flex-shrink-0 mt-0.5">{n.timestamp}</span>
                          </div>

                          <p className="text-[13px] mt-1 leading-relaxed text-(--color-text-secondary)">
                            {n.description}
                          </p>

                          {/* Action buttons — urgent only */}
                          {!read && n.urgent && n.actions.length > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              {n.actions.map((action) => (
                                <button
                                  key={action}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isA) setDrawerOpen(true);
                                  }}
                                  className="h-7 px-3 rounded-md text-[12px] font-medium transition-colors border bg-(--color-bg-primary) border-(--color-border-medium) text-(--color-text-primary) hover:bg-(--color-bg-tertiary)"
                                >
                                  {action}
                                </button>
                              ))}

                              <ArrowUpRight
                                size={14}
                                strokeWidth={1.5}
                                className="ml-auto text-(--color-text-tertiary) opacity-0 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                          )}

                          {read && (
                            <span className="inline-block mt-2 text-[12px] text-(--color-text-tertiary)">Sent · {n.timestamp}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {drawerOpen && (
        <DetailDrawer
          notification={NOTIFICATIONS[0]}
          onClose={() => setDrawerOpen(false)}
          onSent={handleSent}
        />
      )}

      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-4 py-2.5 rounded-md bg-(--color-bg-inverted) text-(--color-text-inverted) text-[13px]"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <span style={{ color: "#4ade80" }}>✓</span>
          <span>Email sent to Sarah Chen</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 text-[12px] font-medium underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
