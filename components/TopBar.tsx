"use client";

import { Bell, Filter, ArrowUpDown, Settings2 } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-12 flex items-center gap-3 px-4 border-b border-(--color-border-medium) bg-(--color-bg-primary) flex-shrink-0">
      <div className="flex items-center gap-2">
        <Bell size={16} className="text-(--color-amber-9)" strokeWidth={1.5} />
        <h1 className="text-[13px] font-semibold text-(--color-text-primary)">
          Notifications
        </h1>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-secondary) text-[13px]">
          <Filter size={14} strokeWidth={1.5} />
          Filter
        </button>
        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-secondary) text-[13px]">
          <ArrowUpDown size={14} strokeWidth={1.5} />
          Sort
        </button>
        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-secondary) text-[13px]">
          <Settings2 size={14} strokeWidth={1.5} />
          Options
        </button>
      </div>
    </header>
  );
}
