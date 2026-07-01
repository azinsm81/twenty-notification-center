# SPEC.md — Twenty Notification Center Prototype

> Build plan for a clickable prototype. Every "AI" action is mocked with canned data.
> No real APIs, no real email sending, no real AI. Buttons advance a fixed UI flow.

---

## What to build

A Next.js + Tailwind prototype of the Twenty CRM Notification Center. It renders full Twenty chrome (sidebar + top bar) and lets Martha act on one urgent notification without leaving the app.

---

## Screens and states

### Screen 1 — Notification Center list

The main content area when "Notifications" is selected in the sidebar. Martha's start; bell shows an unread count.
Action preview: loading (brief), active (draft shown), AI-got-it-wrong
  (wrong attachment, needs a visible Swap), error (action failed, retry).
- Confirmation: success (with Undo), undo-confirmed (back to the list).
MOCKED: 3 fixed sample notifications, one canned AI draft, one canned
  "wrong attachment" case, one canned success. Buttons advance the mocked flow.

**Layout:** Full Twenty chrome — left sidebar (240px, white `#FFFFFF`, right border `1px solid #EBEBEB`) + top bar — with the notification list filling the content area.

**Sidebar nav items (all present, only Notifications is active):**
- Search
- Notifications ← active
- Opportunities
- Tasks
- People
- Companies
- Settings

**Notification list — 3 hardcoded rows:**

| # | Tag | Title | Subtitle | State |
|---|---|---|---|---|
| A | `Urgent` chip | "Reply needed: Acme Corp renewal" | "Sarah Chen emailed 18 min ago" | `new` → `read` after Send |
| B | none | "No activity — Globex deal" | "Last contact 12 days ago" | decoration, not clickable |
| C | none | "Proposal sent — Initech" | "Awaiting signature · 3 days" | decoration, not clickable |

- "Urgent" chip: pill, bg `#FFEFEF`, text `#E5484D`, `base-default` 13px
- `new` state: full-opacity row, unread dot or bold title
- `read` state: `Text.Secondary` `#666666` title, no dot
- Notification A is the only clickable row. B and C do nothing on click.

---

### Screen 2 — Detail drawer (over the list)

Triggered by clicking Notification A. Slides in from the right, overlays the notification list. List stays visible but inert underneath.

Drawer width: ~480px. Background `#FFFFFF`. Left border `1px solid #EBEBEB`. Shadow: `shadow-md`.

The drawer has **two named view states**:

#### 2A — Summary View (default when drawer opens)

**Header:**
- Customer name: "Sarah Chen · Acme Corp"
- Deal stage chip: e.g. "Negotiation" (Indigo chip)
- Last quoted price: "$240,000 / yr"
- Close (×) button top-right

**Body:**
- Conversation snippet: last email excerpt (2–3 lines, `base-default`, `#666666`)
- Section label "AI Summary" (`base-stronger`, `#999999`)
- Canned AI summary paragraph:
  > "Sarah is following up on the enterprise renewal proposal sent last week. She's requesting final approval on pricing before her board meeting on Friday. The deal is at $240K/yr — unchanged from the last quoted figure. Sentiment is positive; she's ready to sign pending your confirmation."

**Footer:**
- `Reply` button — Primary brand (`#3E63DD`), full width or right-aligned
- Clicking Reply → switches drawer to Compose View (2B)

#### 2B — Compose View

Replaces Summary View in the same drawer. (Keep as a named React state so it can be toggled back for usability testing.)

**Header:** same as Summary View (customer name, deal stage, price, close button)

**Body:**
- To field: pre-filled "sarah.chen@acmecorp.com" (read-only display)
- Subject field: pre-filled "Re: Acme Corp Renewal — Final Approval" (read-only display)
- Empty `<textarea>` email body, placeholder "Write your reply…"
- "Generate with AI" button — Default variant, full width, below textarea

**Generate with AI behavior (mocked):**
- Button click → immediately populates textarea with canned draft:
  > "Hi Sarah, thank you for following up. I'm happy to confirm the pricing at $240,000/year as discussed. I've looped in our legal team to send over the final contract today — you should receive it within the hour. Looking forward to getting this across the line before your board meeting on Friday. Best, Martha"
- Textarea becomes editable after population (user can freely edit)

**Footer:**
- `Send` button — Primary brand (`#3E63DD`)
- Clicking Send → (1) closes drawer, (2) flips Notification A to `read` state, (3) shows toast

---

### Screen 3 — "Email sent" toast

- Appears bottom-center or bottom-right after Send
- Text: "Email sent to Sarah Chen"
- Style: dark bg (`#333333`), white text, `radius-md`, `shadow-md`
- Auto-dismisses after ~3 seconds
- No Undo action

---

## Flow map

```
Notification list
  └── Click Notification A
        └── Drawer opens → Summary View
              └── Click Reply
                    └── Compose View (empty editor)
                          └── Click "Generate with AI"
                                └── Draft populates in editor
                                      └── Click Send
                                            ├── Drawer closes
                                            ├── Notification A → "read" state
                                            └── Toast appears → auto-dismisses
```

---

## Mocked data (all hardcoded, no API calls)

```ts
// notifications.ts
export const notifications = [
  {
    id: "A",
    urgent: true,
    title: "Reply needed: Acme Corp renewal",
    subtitle: "Sarah Chen emailed 18 min ago",
    customer: "Sarah Chen · Acme Corp",
    dealStage: "Negotiation",
    dealValue: "$240,000 / yr",
    emailFrom: "sarah.chen@acmecorp.com",
    emailSubject: "Re: Acme Corp Renewal — Final Approval",
    snippet: "Hi, just following up on the renewal proposal — can you confirm the pricing before Friday? Our board meeting is that afternoon and I need final sign-off.",
    aiSummary: "Sarah is following up on the enterprise renewal proposal sent last week. She's requesting final approval on pricing before her board meeting on Friday. The deal is at $240K/yr — unchanged from the last quoted figure. Sentiment is positive; she's ready to sign pending your confirmation.",
    aiDraft: "Hi Sarah, thank you for following up. I'm happy to confirm the pricing at $240,000/year as discussed. I've looped in our legal team to send over the final contract today — you should receive it within the hour. Looking forward to getting this across the line before your board meeting on Friday. Best, Martha",
  },
  {
    id: "B",
    urgent: false,
    title: "No activity — Globex deal",
    subtitle: "Last contact 12 days ago",
  },
  {
    id: "C",
    urgent: false,
    title: "Proposal sent — Initech",
    subtitle: "Awaiting signature · 3 days",
  },
]
```

---

## Stack

- Next.js (App Router)
- Tailwind CSS
- Lucide React (icons, 16px/20px, 1.5px stroke)
- Inter font (Google Fonts or next/font)
- No external state libraries — React `useState` is enough

---

## Style rules

- Colors only from `design.md` tokens. No raw hex in components — use Tailwind config mapped to token values.
- No inline styles.
- No placeholder images, no external image URLs (e.g. no `picsum.photos`, `via.placeholder.com`, or any CDN URL). Use initials-based avatars rendered in CSS instead.
- No made-up file paths or asset URLs. If an image is needed, it must exist under `public/images/` in the repo.
- Icons: Lucide React only. No other icon library, no SVG files, no emoji as icons.
- Sidebar: `w-60 bg-white border-r border-[#EBEBEB]`
- Chips: `rounded-full text-[13px] px-2 py-0.5`
- Urgent chip: `bg-[#FFEFEF] text-[#E5484D]`
- Buttons: `rounded-md h-8 px-3 text-[13px]`
- Primary button: `bg-[#3E63DD] text-white hover:bg-[#3A5CCC]`
- Default button: `bg-white border border-[#EBEBEB] text-[#333333] hover:bg-[#F1F1F1]`
- Drawer: `fixed inset-y-0 right-0 w-[480px] bg-white border-l border-[#EBEBEB] shadow-lg z-50`
- Toast: `fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#333333] text-white rounded-md px-4 py-2 text-[13px]`
- Every color/spacing/type value comes from design.md (no raw hex).

---

## Explicitly out of scope

- Clicking Notification B or C (inert)
- Snooze, assign, mark complete actions
- Undo on the toast
- Real email sending, real AI, any network calls
- Tasks, Opportunities, People, Companies pages — sidebar links present but navigate nowhere
- Notifications disappearing — they persist as history; only state changes (`new` → `read`)
- Mobile layout

---

## Verification checklist

- [ ] Full Twenty chrome renders: sidebar with nav items, top bar, content area
- [ ] "Notifications" nav item is active/highlighted in the sidebar
- [ ] 3 notifications render on load; only Notification A has the "Urgent" chip
- [ ] Notification A is the only clickable row; B and C do nothing
- [ ] Clicking Notification A opens the drawer from the right (slides over the list)
- [ ] Drawer Summary View shows: customer name, deal stage, deal value, email snippet, AI summary, Reply button
- [ ] Clicking Reply switches drawer to Compose View
- [ ] Compose View shows: To field, Subject field, empty textarea, "Generate with AI" button, Send button
- [ ] Clicking "Generate with AI" populates the textarea with the canned draft
- [ ] Draft is editable after generation
- [ ] Clicking Send closes the drawer
- [ ] After Send, Notification A visually changes to "read" state (muted, no unread indicator)
- [ ] "Email sent to Sarah Chen" toast appears and auto-dismisses (~3s)
- [ ] No console errors
- [ ] Builds clean (`next build` passes)
