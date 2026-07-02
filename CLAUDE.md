# build-context.md — Twenty Notification Center

## What this is
Twenty is an open-source B2B CRM (Salesforce alternative for 10–20 person teams).
User is Martha, an AE working one large enterprise deal at a time.
Problem: Twenty is passive. Martha context-switches across Gmail, Slack, Calendar, and Twenty all day because no tool tells her what needs attention. Missing one signal can silently kills a deal.

## North Star
Surface the highest-priority action for each deal in one place and let Martha complete it without leaving Twenty.

## Core flow
1. VIP customer emails requesting final approval on enterprise renewal
2. Twenty flags it: `P1 · Urgent · Reply Needed`
3. Martha opens Notification Center — card shows customer name, deal stage, last quoted price, AI summary of thread
4. She clicks Reply — inline email editor opens inside the notification card
5. Email sent, task auto-marked complete — all without leaving Twenty

## Key design decisions
- P1 = Urgent tag + top position, because priority must be scannable in <3 seconds
- AI summary on card, because Martha can't act confidently without deal context
- Reply opens inline (not in a new tab/record), because navigation breaks the remote-control premise
- System alerts auto-resolve to "Sent", because they require zero action and must not compete for attention
- Notifications grouped Today / Yesterday by default, because recency is the baseline mental model

## Sort By (implemented feature)
Two modes, toggled from the Sort control in the header bar (existing UI — no layout change):

- **Chronological** (default): newest first, grouped Today / Yesterday
- **By Importance**: Urgent items pinned to top regardless of timestamp; within same priority tier, sort newest first

Sort state is ephemeral (resets on session). No new UI elements — uses the existing Sort button already in the header alongside Filter and Options.

Lego test: sort logic is a property of the Task object (priority field + timestamp). The same two-mode sort could apply to any Task view — table, kanban, company record — without modification.

## Remote-control rule
Every action must execute without navigating away from the Notification Center.
- Reply → inline email editor opens on the card
- Mark done → card resolves in place
- Snooze (future) → card defers in place
If an action requires leaving the view, it breaks the rule and must be redesigned.

## Constraints
- Use Twenty's existing design system tokens only — no new colors, radii, or type styles
- No new sidebar items or navigation patterns
- Sort and Filter live in the existing header controls — do not add new UI chrome
- All behaviors must be reusable across Table, Kanban, and Company page views

## Non-goals
- Do not build a standalone inbox screen that only works here
- Do not hard-code notification types — cards must support any object (email, task, mention, system alert)
- Do not add source attribution or team-state visibility yet — these are open 🔴 usability gaps to resolve in the next design iteration, not this build
