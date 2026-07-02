"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Filter, ArrowUpDown, Settings2, Check } from "lucide-react";

export type SortMode = "chronological" | "importance";

interface Props {
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
}

export function TopBar({ sortMode, onSortChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const options: { label: string; value: SortMode; description: string }[] = [
    { value: "chronological", label: "Chronological", description: "Newest first" },
    { value: "importance", label: "By importance", description: "Urgent notifications at the top" },
  ];

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

        {/* Sort dropdown */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md transition-colors text-[13px] ${
              open || sortMode === "importance"
                ? "bg-(--color-bg-tertiary) text-(--color-text-primary)"
                : "hover:bg-(--color-bg-tertiary) text-(--color-text-secondary)"
            }`}
          >
            <ArrowUpDown size={14} strokeWidth={1.5} />
            Sort{sortMode === "importance" && <span className="text-(--color-accent-9)"> · Importance</span>}
          </button>

          {open && (
            <div
              className="absolute right-0 top-full mt-1 w-52 rounded-md border border-(--color-border-medium) bg-(--color-bg-primary) py-1 z-50"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onSortChange(opt.value); setOpen(false); }}
                  className="w-full flex items-start gap-3 px-3 py-2 hover:bg-(--color-bg-tertiary) transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-(--color-text-primary)">{opt.label}</p>
                    <p className="text-[11px] text-(--color-text-tertiary) mt-0.5">{opt.description}</p>
                  </div>
                  {sortMode === opt.value && (
                    <Check size={14} strokeWidth={1.5} className="text-(--color-accent-9) flex-shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-secondary) text-[13px]">
          <Settings2 size={14} strokeWidth={1.5} />
          Options
        </button>
      </div>
    </header>
  );
}
