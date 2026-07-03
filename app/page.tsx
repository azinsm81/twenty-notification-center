"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar, type SortMode } from "@/components/TopBar";
import { DetailDrawer } from "@/components/DetailDrawer";
import { Confetti } from "@/components/Confetti";
import { NOTIFICATIONS } from "@/lib/data";
import { ArrowUpRight, Mail, FileText, TrendingUp, Clock, Calendar, UserRound, Users, type LucideIcon } from "lucide-react";

type NotifIcon = { icon: LucideIcon; bg: string; color: string };

const NOTIF_ICONS: Record<string, NotifIcon> = {
  A: { icon: Mail,       bg: "#FFECE8", color: "#E54D2E" },
  B: { icon: FileText,   bg: "#EEF2FF", color: "#3E63DD" },
  D: { icon: TrendingUp, bg: "#DCFCE7", color: "#16A34A" },
  E: { icon: Clock,      bg: "#FEF3C7", color: "#D97706" },
  C: { icon: Calendar,   bg: "#F3E8FF", color: "#7C3AED" },
  F: { icon: UserRound,  bg: "#CCFBF1", color: "#0D9488" },
  G: { icon: Users,      bg: "#EEF2FF", color: "#4338CA" },
};

// Group notifications by dateGroup
const DATE_GROUPS = ["Today", "Yesterday"];

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifARead, setNotifARead] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("chronological");

  function handleSent() {
    setDrawerOpen(false);
    setNotifARead(true);
    setShowToast(true);
  }

  // #2 Toast: mount first, then trigger visible state for slide-up; fade out before unmount
  useEffect(() => {
    if (showToast) {
      requestAnimationFrame(() => setToastVisible(true));
      const t = setTimeout(() => {
        setToastVisible(false);
        setTimeout(() => setShowToast(false), 150);
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const isRead = (id: string) => (id === "A" && notifARead);

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
          {/* Column headers */}
          <div className="flex items-center gap-4 px-6 py-2 border-b border-(--color-border-light) bg-(--color-bg-secondary)">
            <div className="w-12 flex-shrink-0">
              <span className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-wider">Date</span>
            </div>
            <div className="w-3 flex-shrink-0" />
            <div className="w-9 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-wider">Notification</span>
            </div>
            <div className="w-28 flex-shrink-0">
              <span className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-wider">Created by</span>
            </div>
            <div className="w-[10%] flex-shrink-0" />
          </div>
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
                    const notifIcon = NOTIF_ICONS[n.id];
                    const IconComponent = notifIcon?.icon;

                    return (
                      <div
                        key={n.id}
                        className={`group flex items-start gap-4 px-6 py-4 border-b border-(--color-border-light) transition-colors ${
                          isA ? "cursor-pointer hover:bg-(--color-bg-notification-hover)" : "cursor-default"
                        }`}
                        onClick={isA ? () => setDrawerOpen(true) : undefined}
                      >
                        {/* Date column */}
                        <div className="w-12 flex-shrink-0 pt-0.5">
                          <span className="text-[12px] text-(--color-text-tertiary)">{n.date}</span>
                        </div>

                        {/* Urgent dot — urgent only */}
                        <div className="pt-2 w-3 flex-shrink-0 flex items-start justify-center">
                          {n.urgent && !read && (
                            <span className="w-2 h-2 rounded-full flex-shrink-0 block bg-(--color-red-9)" />
                          )}
                        </div>

                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: notifIcon?.bg ?? "#F1F1F1" }}
                        >
                          {IconComponent && (
                            <IconComponent size={16} strokeWidth={1.5} style={{ color: notifIcon?.color }} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap">
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

                          {/* Body text */}
                          {n.description && (
                            <p className="mt-1 text-[12px] text-(--color-text-secondary) leading-relaxed">
                              {read && n.urgent ? `Email sent · ${n.timestamp}` : n.description}
                            </p>
                          )}

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
                        </div>

                        {/* Created by column — not flush right */}
                        <div className="w-28 flex-shrink-0 pt-0.5">
                          <span className="text-[12px] text-(--color-text-tertiary)">{n.createdBy}</span>
                        </div>

                        {/* Trailing spacer to pull "Created by" away from edge */}
                        <div className="w-[10%] flex-shrink-0" />
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

      <Confetti active={showToast} />

      {/* #2 Toast: slide up on enter, fade out on exit */}
      {showToast && (
        <div
          className={`fixed bottom-16 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3.5 px-5 py-3.5 rounded-lg bg-(--color-bg-inverted) text-(--color-text-inverted) transition-all duration-300 ease-out ${
            toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
        >
          {/* Animated checkmark */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
            <circle cx="10" cy="10" r="9" stroke="#4ade80" strokeWidth="1.5" opacity="0.35" />
            <path
              d="M6 10.5L9 13.5L14 7.5"
              stroke="#4ade80"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              className="animate-draw-check"
              style={{ strokeDashoffset: 20, opacity: 0 }}
            />
          </svg>

          {/* Two-line copy */}
          <div>
            <p className="text-[13px] font-semibold leading-snug">Reply sent to Sarah Chen</p>
            <p className="text-[12px] opacity-60 mt-0.5 leading-snug">Sarah has what she needs for Friday&apos;s board meeting.</p>
          </div>
        </div>
      )}
    </div>
  );
}
