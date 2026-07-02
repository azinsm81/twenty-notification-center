export type Notification = {
  id: string;
  urgent: boolean;
  read: boolean;
  title: string;
  description: string;
  timestamp: string;
  dateGroup: string;
  customer: string;
  company: string;
  dealStage: string;
  dealValue: string | null;
  emailFrom?: string;
  emailSubject?: string;
  snippet?: string;
  aiSummary?: string;
  aiDraft?: string;
  aiDraftWrongAttachment?: string;
  aiDraftCorrectAttachment?: string;
  actions: string[];
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "A",
    urgent: true,
    read: false,
    title: "Reply needed: Final pricing approval",
    description: "Customer is waiting for final pricing approval before Friday's board meeting.",
    timestamp: "18 min ago",
    dateGroup: "Today",
    customer: "Sarah Chen",
    company: "Acme Corp",
    dealStage: "Negotiation",
    dealValue: "$240,000 / yr",
    emailFrom: "sarah.chen@acmecorp.com",
    emailSubject: "Re: Acme Corp Renewal — Final Approval",
    snippet:
      "Hi, just following up on the renewal proposal — can you confirm the pricing before Friday? Our board meeting is that afternoon and I need final sign-off.",
    aiSummary:
      "Sarah is following up on the enterprise renewal proposal sent last week. She's requesting final approval on pricing before her board meeting on Friday. The deal is at $240K/yr — unchanged from the last quoted figure. Sentiment is positive; she's ready to sign pending your confirmation.",
    aiDraft:
      "Hi Sarah,\n\nThank you for following up. I'm happy to confirm the pricing at $240,000/year as discussed.\n\nI've looped in our legal team to send over the final contract today — you should receive it within the hour. Looking forward to getting this across the line before your board meeting on Friday.\n\nBest,\nMartha",
    aiDraftWrongAttachment: "Q3 2024 Pricing Deck.pdf",
    aiDraftCorrectAttachment: "Q4 2024 Enterprise Renewal — Acme Corp.pdf",
    actions: ["Reply"],
  },
  {
    id: "B",
    urgent: false,
    read: false,
    title: "Your product import is complete",
    description: "Everything came through cleanly. Head to the Import page to review.",
    timestamp: "2 hr ago",
    dateGroup: "Today",
    customer: "James Howell",
    company: "Globex",
    dealStage: "Proposal Sent",
    dealValue: null,
    actions: [],
  },
  {
    id: "C",
    urgent: false,
    read: false,
    title: "Your contacts have been imported",
    description: "1 contact is now in Twenty and ready to use.",
    timestamp: "Yesterday · 5:08 PM",
    dateGroup: "Yesterday",
    customer: "Bill Lumbergh",
    company: "Initech",
    dealStage: "Contract Sent",
    dealValue: null,
    actions: [],
  },
];
