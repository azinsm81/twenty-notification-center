"use client";

import { useState, useEffect } from "react";
import { X, Globe, User, MapPin, Link2, Calendar, Clock, FileText, Mail, CheckSquare } from "lucide-react";

const TABS = ["Timeline", "Tasks", "Notes", "Files", "Emails", "Calendar"];

const TAB_ICONS: Record<string, React.ElementType> = {
  Timeline: Clock,
  Tasks: CheckSquare,
  Notes: FileText,
  Files: FileText,
  Emails: Mail,
  Calendar: Calendar,
};

const EMAILS = [
  {
    id: 1,
    from: "Sarah Chen",
    email: "sarah.chen@acmecorp.com",
    to: "Jessica R.",
    subject: "Re: Acme Corp Renewal — Final Approval",
    preview: "Hi, just following up on the renewal proposal — can you confirm the pricing before Friday? Our board meeting is that afternoon and I need final sign-off.",
    time: "18 min ago",
    unread: true,
  },
  {
    id: 2,
    from: "Jessica R.",
    email: "jessica@twenty.com",
    to: "Sarah Chen",
    subject: "Re: Acme Corp Renewal — Final Approval",
    preview: "Hi Sarah, please find attached the updated renewal proposal for FY2025. The pricing remains at $240,000/yr as discussed. Let me know if you have any questions before the board meeting.",
    time: "Last week",
    unread: false,
  },
  {
    id: 3,
    from: "Sarah Chen",
    email: "sarah.chen@acmecorp.com",
    to: "Jessica R.",
    subject: "Acme Corp Renewal — Final Approval",
    preview: "Hi Jessica, hope you're well. We're coming up on our renewal date and I'd love to get the updated proposal over to our board. Can you send over the final terms when you get a chance?",
    time: "2 weeks ago",
    unread: false,
  },
];

interface Props {
  onClose: () => void;
}

export function CompanyPanel({ onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Timeline");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 250);
  }

  return (
    <div
      className="fixed top-0 h-full w-[360px] bg-(--color-bg-primary) border-l border-(--color-border-medium) z-[49] flex flex-col transition-transform duration-250 ease-out"
      style={{
        right: 480,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        boxShadow: "-4px 0 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Company header */}
      <div className="flex-shrink-0 px-5 pt-6 pb-4 border-b border-(--color-border-medium)">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-(--color-bg-tertiary) flex items-center justify-center text-[15px] font-bold text-(--color-text-primary) flex-shrink-0">
            A
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-(--color-bg-tertiary) transition-colors text-(--color-text-tertiary) flex-shrink-0"
          >
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>
        <p className="text-[16px] font-semibold text-(--color-text-primary)">Acme Corp</p>
        <p className="text-[12px] text-(--color-text-tertiary) mt-0.5">Added 3 months ago</p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex items-center gap-0 px-4 border-b border-(--color-border-medium) overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab];
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-2.5 py-3 text-[12px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-(--color-accent-9) text-(--color-text-primary)"
                  : "border-transparent text-(--color-text-tertiary) hover:text-(--color-text-secondary)"
              }`}
            >
              <Icon size={13} strokeWidth={1.5} />
              {tab}
            </button>
          );
        })}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === "Timeline" && (
          <div className="px-5 py-4">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-4">June 2026</p>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border border-(--color-border-stronger) flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-(--color-text-tertiary)" />
              </div>
              <div>
                <p className="text-[13px] text-(--color-text-secondary) leading-relaxed">
                  <span className="font-medium text-(--color-text-primary)">Acme Corp</span> renewal proposal sent by <span className="font-medium text-(--color-text-primary)">Jessica</span>
                </p>
                <p className="text-[11px] text-(--color-text-tertiary) mt-0.5">1 week ago</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Emails" && (
          <div className="divide-y divide-(--color-border-light)">
            {EMAILS.map((email) => {
              const isJessica = email.from === "Jessica R.";
              return (
                <div key={email.id} className="px-5 py-3.5 hover:bg-(--color-bg-secondary) transition-colors cursor-default">
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: isJessica ? "#EEF2FF" : "#FFECE8",
                        color: isJessica ? "#3E63DD" : "#E54D2E",
                      }}
                    >
                      {email.from[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[12px] ${email.unread ? "font-semibold text-(--color-text-primary)" : "font-medium text-(--color-text-secondary)"}`}>
                          {email.from}
                        </span>
                        <span className="text-[11px] text-(--color-text-tertiary) flex-shrink-0">{email.time}</span>
                      </div>
                      <p className={`text-[12px] mt-0.5 ${email.unread ? "font-medium text-(--color-text-primary)" : "text-(--color-text-secondary)"}`}>
                        {email.subject}
                      </p>
                      <p className="text-[12px] text-(--color-text-tertiary) mt-0.5 leading-relaxed line-clamp-2">
                        {email.preview}
                      </p>
                    </div>
                    {email.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-9) flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab !== "Timeline" && activeTab !== "Emails" && (
          <div className="flex items-center justify-center h-32">
            <p className="text-[13px] text-(--color-text-tertiary)">No {activeTab.toLowerCase()} yet</p>
          </div>
        )}

        {/* Fields */}
        <div className="px-5 py-2 border-t border-(--color-border-light)">

          {/* General */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest">General</p>
              <button className="text-[11px] text-(--color-text-tertiary) hover:text-(--color-text-secondary) transition-colors">
                ↑
              </button>
            </div>
            <div className="space-y-2.5">
              <FieldRow icon={Globe} label="Domain Name">
                <span className="px-2 py-0.5 rounded text-[12px] bg-(--color-bg-tertiary) text-(--color-text-primary)">acmecorp.com</span>
              </FieldRow>
              <FieldRow icon={User} label="Account Owner">
                <span className="text-[13px] text-(--color-text-secondary)">Jessica R.</span>
              </FieldRow>
            </div>
          </div>

          {/* Business */}
          <div className="py-3 border-t border-(--color-border-light)">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-3">Business</p>
            <div className="space-y-2.5">
              <FieldRow icon={Globe} label="Annual Revenue">
                <span className="text-[13px] text-(--color-text-secondary)">$12,000,000</span>
              </FieldRow>
            </div>
          </div>

          {/* Contact */}
          <div className="py-3 border-t border-(--color-border-light)">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-3">Contact</p>
            <div className="space-y-2.5">
              <FieldRow icon={MapPin} label="Address">
                <span className="text-[13px] text-(--color-text-secondary)">San Francisco, CA</span>
              </FieldRow>
              <FieldRow icon={Link2} label="LinkedIn">
                <span className="text-[13px] text-(--color-text-tertiary)">Not set</span>
              </FieldRow>
            </div>
          </div>

          {/* System */}
          <div className="py-3 border-t border-(--color-border-light)">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-3">System</p>
            <div className="space-y-2.5">
              <FieldRow icon={Calendar} label="Creation date">
                <span className="text-[13px] text-(--color-text-secondary)">3 months ago</span>
              </FieldRow>
              <FieldRow icon={User} label="Created by">
                <span className="text-[13px] text-(--color-text-secondary)">Jessica R.</span>
              </FieldRow>
            </div>
          </div>

          {/* People */}
          <div className="py-3 border-t border-(--color-border-light)">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-3">People</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-(--color-bg-danger) flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ color: "#E54D2E" }}>
                S
              </div>
              <span className="text-[13px] text-(--color-text-secondary)">Sarah Chen</span>
            </div>
          </div>

          {/* Opportunities */}
          <div className="py-3 border-t border-(--color-border-light)">
            <p className="text-[11px] font-semibold text-(--color-text-tertiary) uppercase tracking-widest mb-3">Opportunities</p>
            <div className="p-3 rounded-md border border-(--color-border-medium) bg-(--color-bg-secondary)">
              <p className="text-[13px] font-medium text-(--color-text-primary)">Acme Corp Renewal</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-(--color-accent-3) text-(--color-accent-9)">
                  Negotiation
                </span>
                <span className="text-[12px] text-(--color-text-secondary)">$240,000 / yr</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function FieldRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-[130px] flex-shrink-0">
        <Icon size={13} strokeWidth={1.5} className="text-(--color-text-tertiary) flex-shrink-0" />
        <span className="text-[12px] text-(--color-text-tertiary) truncate">{label}</span>
      </div>
      {children}
    </div>
  );
}
