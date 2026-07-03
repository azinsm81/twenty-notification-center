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
  aiSummaryPoints?: string[];
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
    description: "",
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
    aiSummaryPoints: [
      "Following up on the renewal proposal sent last week",
      "Needs pricing confirmed before Friday's board meeting",
      "Deal at $240K/yr — unchanged from last quote",
      "Sentiment positive; ready to sign on your confirmation",
    ],
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
    title: "Proposal opened by James Howell",
    description: "",
    timestamp: "1 hr ago",
    dateGroup: "Today",
    customer: "James Howell",
    company: "Globex",
    dealStage: "Proposal Sent",
    dealValue: "$85,000 / yr",
    actions: [],
  },
  {
    id: "D",
    urgent: false,
    read: false,
    title: "Deal moved to Negotiation · Pied Piper",
    description: "",
    timestamp: "3 hr ago",
    dateGroup: "Today",
    customer: "Ryan Torres",
    company: "Pied Piper",
    dealStage: "Negotiation",
    dealValue: "$120,000 / yr",
    actions: [],
  },
  {
    id: "E",
    urgent: false,
    read: false,
    title: "Task overdue · Send contract to Hooli",
    description: "",
    timestamp: "5 hr ago",
    dateGroup: "Today",
    customer: "Emily Park",
    company: "Hooli",
    dealStage: "Contract Sent",
    dealValue: "$310,000 / yr",
    actions: [],
  },
  {
    id: "C",
    urgent: false,
    read: false,
    title: "Meeting scheduled · Acme Corp quarterly review",
    description: "",
    timestamp: "Yesterday · 4:30 PM",
    dateGroup: "Yesterday",
    customer: "Sarah Chen",
    company: "Acme Corp",
    dealStage: "Negotiation",
    dealValue: "$240,000 / yr",
    actions: [],
  },
  {
    id: "F",
    urgent: false,
    read: false,
    title: "Contact updated · Ryan Torres promoted to VP",
    description: "",
    timestamp: "Yesterday · 2:15 PM",
    dateGroup: "Yesterday",
    customer: "Ryan Torres",
    company: "Pied Piper",
    dealStage: "Negotiation",
    dealValue: "$120,000 / yr",
    actions: [],
  },
  {
    id: "G",
    urgent: false,
    read: false,
    title: "Your contacts have been imported",
    description: "",
    timestamp: "Yesterday · 5:08 PM",
    dateGroup: "Yesterday",
    customer: "Bill Lumbergh",
    company: "Initech",
    dealStage: "Contract Sent",
    dealValue: null,
    actions: [],
  },
];
