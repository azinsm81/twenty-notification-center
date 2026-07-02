"use client";

import { useState, useEffect, useRef } from "react";
import { X, Sparkles, Send, AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import type { Notification } from "@/lib/data";

type NotifA = Notification;

type DrawerView = "summary" | "compose";
type ComposeState = "idle" | "generating" | "draft-ready";

interface Props {
  notification: NotifA;
  onClose: () => void;
  onSent: () => void;
}

export function DetailDrawer({ notification, onClose, onSent }: Props) {
  const [view, setView] = useState<DrawerView>("summary");
  const [composeState, setComposeState] = useState<ComposeState>("idle");
  const [draftText, setDraftText] = useState("");
  const [subject, setSubject] = useState(notification.emailSubject ?? "");
  const [errorKey, setErrorKey] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // #4 Drawer slide-in
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleReply() {
    setView("compose");
    setComposeState("idle");
    setDraftText("");
  }

  function handleGenerate() {
    setComposeState("generating");
    setTimeout(() => {
      setDraftText(notification.aiDraft ?? "");
      setComposeState("draft-ready");
      setTimeout(() => textareaRef.current?.focus(), 50);
    }, 900);
  }

  function handleSend() {
    if (!draftText.trim()) {
      setErrorKey((k) => k + 1);
      return;
    }
    onSent();
  }

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-250 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(0,0,0,0.05)" }}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[480px] bg-(--color-bg-primary) border-l border-(--color-border-medium) z-50 flex flex-col transition-transform duration-250 ease-out"
        style={{
          transform: visible ? "translateX(0)" : "translateX(100%)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Header — arrives with the drawer, no extra delay */}
        <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-(--color-border-medium)">
          {view === "compose" && (
            <button
              onClick={() => setView("summary")}
              className="flex items-center gap-1.5 text-[12px] text-(--color-text-tertiary) hover:text-(--color-text-secondary) transition-colors mb-3"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Back to summary
            </button>
          )}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-7 h-7 rounded-full bg-(--color-accent-3) flex items-center justify-center text-(--color-accent-9) text-[11px] font-semibold flex-shrink-0">
                  SC
                </div>
                <span className="text-[13px] font-semibold text-(--color-text-primary)">{notification.customer}</span>
                <span className="text-[13px] text-(--color-text-tertiary)">·</span>
                <span className="text-[13px] text-(--color-text-secondary)">{notification.company}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-(--color-accent-3) text-(--color-accent-9)">
                  {notification.dealStage}
                </span>
                <span className="text-[12px] text-(--color-text-secondary)">{notification.dealValue}</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-tertiary) flex-shrink-0"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Body — #4 stagger: fades in 80ms after header/drawer arrive */}
        <div
          className={`flex-1 overflow-y-auto px-5 py-4 space-y-5 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: visible ? "80ms" : "0ms" }}
        >
          {/* #3 view crossfade: key forces remount + fade-slide-up on every view switch */}
          <div key={view} className="animate-fade-slide-up space-y-5">
            {view === "summary" ? (
              <SummaryBody notification={notification} />
            ) : (
              <ComposeBody
                notification={notification}
                composeState={composeState}
                draftText={draftText}
                subject={subject}
                setSubject={(v) => setSubject(v)}
                setDraftText={(v) => setDraftText(v)}
                textareaRef={textareaRef}
                onGenerate={handleGenerate}
                errorKey={errorKey}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-(--color-border-medium)">
          {view === "summary" && (
            /* #5 send button press feel */
            <button
              onClick={handleReply}
              className="w-full h-10 rounded-md bg-(--color-accent-9) hover:bg-(--color-accent-10) active:scale-[0.97] text-white text-[14px] font-medium transition-all duration-100"
            >
              Reply
            </button>
          )}

          {view === "compose" && composeState === "generating" && (
            <div className="flex items-center justify-center gap-2 text-[13px] text-(--color-text-tertiary)">
              <RefreshCw size={14} className="animate-spin" strokeWidth={1.5} />
              <span>Generating draft…</span>
            </div>
          )}

          {view === "compose" && composeState !== "generating" && (
            <button
              onClick={handleSend}
              className="w-full h-10 rounded-md bg-(--color-accent-9) hover:bg-(--color-accent-10) active:scale-[0.97] text-white text-[14px] font-medium transition-all duration-100 flex items-center justify-center gap-2"
            >
              <Send size={14} strokeWidth={1.5} />
              Send
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function SummaryBody({ notification }: { notification: NotifA }) {
  return (
    <>
      <div>
        <p className="text-[11px] font-medium text-(--color-text-tertiary) uppercase tracking-wide mb-2">Latest email</p>
        <div className="p-3 rounded-md bg-(--color-bg-secondary) border border-(--color-border-light)">
          <p className="text-[13px] text-(--color-text-secondary) leading-relaxed">"{notification.snippet}"</p>
          <p className="text-[11px] text-(--color-text-tertiary) mt-2">— {notification.customer}, {notification.company}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={13} className="text-(--color-accent-9)" strokeWidth={1.5} />
          <p className="text-[11px] font-medium text-(--color-text-tertiary) uppercase tracking-wide">AI Summary</p>
        </div>
        <p className="text-[13px] text-(--color-text-primary) leading-relaxed">{notification.aiSummary}</p>
      </div>
    </>
  );
}

interface ComposeBodyProps {
  notification: NotifA;
  composeState: ComposeState;
  draftText: string;
  subject: string;
  setSubject: (v: string) => void;
  setDraftText: (v: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onGenerate: () => void;
  errorKey: number;
}

function ComposeBody({
  notification,
  composeState,
  draftText,
  subject,
  setSubject,
  setDraftText,
  textareaRef,
  onGenerate,
  errorKey,
}: ComposeBodyProps) {
  return (
    <>
      {/* Email fields */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 h-8 px-3 rounded-md border border-(--color-border-medium) bg-(--color-bg-secondary)">
          <span className="text-[11px] font-medium text-(--color-text-tertiary) w-8 flex-shrink-0">To</span>
          <span className="text-[13px] text-(--color-text-secondary)">{notification.emailFrom}</span>
        </div>
        <div className="flex items-center gap-2 h-8 px-3 rounded-md border border-(--color-border-medium) bg-(--color-bg-primary) focus-within:border-(--color-accent-9) transition-colors">
          <span className="text-[11px] font-medium text-(--color-text-tertiary) w-12 flex-shrink-0">Subject</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 text-[13px] text-(--color-text-primary) bg-transparent outline-none min-w-0"
          />
        </div>
      </div>

      {/* #1 AI draft landing — key swap triggers fade-slide-up when draft arrives */}
      <div
        key={draftText ? "has-draft" : "empty"}
        className={draftText ? "animate-fade-slide-up" : ""}
      >
        <textarea
          ref={textareaRef}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          placeholder="Write your reply…"
          disabled={composeState === "generating"}
          className={`w-full min-h-[180px] px-3 py-2.5 rounded-md border bg-(--color-bg-primary) text-[13px] text-(--color-text-primary) placeholder:text-(--color-text-tertiary) resize-none leading-relaxed focus:outline-none disabled:bg-(--color-bg-tertiary) transition-colors ${
            errorKey > 0 && !draftText.trim()
              ? "border-(--color-text-danger)"
              : "border-(--color-border-medium) focus:border-(--color-accent-9)"
          }`}
        />
        {/* Error appears directly under the field */}
        {errorKey > 0 && !draftText.trim() && (
          <p key={errorKey} className="animate-slide-down mt-1.5 text-[12px] text-(--color-text-danger) flex items-center gap-1.5">
            <AlertTriangle size={12} strokeWidth={1.5} className="flex-shrink-0" />
            Your message is empty. Write a reply before sending.
          </p>
        )}
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={composeState === "generating"}
        className="w-full h-10 rounded-md border border-(--color-border-medium) bg-(--color-bg-primary) hover:bg-(--color-bg-tertiary) active:scale-[0.97] text-[14px] text-(--color-text-secondary) font-medium transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Sparkles size={14} strokeWidth={1.5} className="text-(--color-accent-9)" />
        Generate with AI
      </button>
    </>
  );
}
