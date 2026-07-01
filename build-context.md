# build-context.md — Twenty Notification Center

## What this is
Twenty is an open-source B2B CRM (Salesforce alternative for 10–20 person teams).
User is Martha, an AE working one large enterprise deal at a time.
Problem: Twenty is passive. Martha context-switches across Gmail, Slack, Calendar, and Twenty all day because no tool tells her what needs attention. Missing one signal can silently kill a deal.

## North Star
Surface the highest-priority action for each deal in one place and let Martha complete it without leaving Twenty.

## Core flow
1. VIP customer emails requesting final approval on enterprise renewal
2. Twenty flags it: `P1 · Urgent · Reply Needed`
3. Martha opens the Notification Center — email card shows customer name, deal stage, last quoted price, AI summary of the thread
4. She clicks Reply — the deal record becomes an inline email editor
5. She sends — task auto-marked complete, no tab switch, no Gmail, no Slack

## Key design decisions
- **P1/P2/P3 priority tiers, not a flat list** — because Martha must triage in under 3 seconds, not scroll and judge
- **P1 on by default, P3 off by default** — because low-signal noise buries urgent work
- **AI summary on every card** — because Martha's biggest fear is reconstructing context under pressure
- **Inline action inside the record page** — because leaving Twenty to reply in Gmail is the exact problem being solved
- **Inactivity triggers, not just event triggers** — because a deal going quiet is as dangerous as a new email arriving
- **One attention rule fans out across Table, Kanban, Company page, and Notification Center** — because Thomas explicitly requires reusable system logic, not a one-off inbox screen

## The remote-control rule
Every action (reply, snooze, assign, mark complete) must be executable from the Notification Center card without navigating away. The card opens context inline. The record page becomes the workspace. The user never leaves the flow.

## Constraints
- Use Twenty's existing object model: Tasks, Opportunities, Companies, People — no new objects
- Design tokens must match Twenty's design system (dark sidebar, neutral surface, pill badges)
- No hard-coded inbox screen — every behavior must be applicable to Table and Kanban views too
- No email client built from scratch — the reply editor is an inline composer attached to the existing record

## Non-goals
- Do not build a standalone notification page that lives outside the CRM object model
- Do not build per-tool integrations (Gmail tab, Slack tab) — the point is consolidation
- Do not design for deal volume metrics — Martha works one big deal at a time; speed per deal, not throughput
- Do not invent baseline KPI numbers — they don't exist yet; frame all metrics as hypotheses
