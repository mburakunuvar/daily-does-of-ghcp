---
post_title: "GitHub Copilot Moves to Usage-Based Billing: What Changes on June 1, 2026"
author: Burak Unuvar
post_slug: copilot-usage-based-billing-announcement
microsoft_alias: buraknvar
featured_image: ../images/copilot-usage-based-billing-announcement.png
categories:
  - RecentUpdates-Announcements
tags:
  - GitHub Copilot
  - Usage-based billing
  - GitHub AI Credits
  - Pricing
  - Announcement
ai_note: true
summary: "Why every Copilot team needs a clear picture of the June 1, 2026 transition before it lands. How GitHub AI Credits replace premium request units while base subscription prices and included experiences stay the same. What readers gain is a concise, source-grounded view of what is changing, what is included, and why GitHub is making the move."
post_date: 2026-05-11
---

GitHub Copilot is moving to usage-based billing on **June 1, 2026**. The change
is straightforward at the surface — premium request units are being replaced by
**GitHub AI Credits** — but the implications for teams, budgets, and day-to-day
prompting are wider than a unit rename.

This post focuses on the announcement itself: what is changing, what is staying
the same, and why GitHub is making the move. Follow-up posts cover admin
governance, developer habits, and a rollout checklist.

## What Is Changing on June 1, 2026

The unit that meters Copilot usage is changing from premium requests to
**GitHub AI Credits**.

- Copilot plans include a monthly allotment of AI Credits.
- AI Credits are consumed based on token usage — input, output, and cached tokens.
- The cost of a given task depends on the model used and the number of tokens
  consumed.
- For Business and Enterprise, included credits are pooled at the billing entity
  level rather than locked to a single user.
- If the included pool is exhausted, admins choose whether to allow additional
  usage at published rates or cap spend.
- Copilot code review will also consume GitHub Actions minutes in addition to
  AI Credits.

> **⚠️ Important:** The premium-request model applies until June 1, 2026.
> Internal communications, dashboards, and budget reports should reflect the
> transition date so finance and engineering see the same picture.

## Base Plan Pricing Is Not Changing

The base monthly subscription price stays the same on every plan. What changes
is that each plan now ships with a matching dollar value of included AI Credits.

| Plan | Base price | Included AI Credits |
| --- | --- | --- |
| Copilot Pro | $10 / month | $10 in AI Credits |
| Copilot Pro+ | $39 / month | $39 in AI Credits |
| Copilot Business | $19 / user / month | $19 per user in AI Credits |
| Copilot Enterprise | $39 / user / month | $39 per user in AI Credits |

## Promotional Included Usage for Business and Enterprise

To smooth the transition, existing Business and Enterprise customers receive
extra included AI Credits for **June, July, and August 2026**.

- Copilot Business: $30 per user per month in AI Credits.
- Copilot Enterprise: $70 per user per month in AI Credits.

This promotional window is a good baseline for observing real token consumption
before configuring stricter budgets.

## What Stays Included and Unmetered

Not every Copilot interaction consumes AI Credits. The most common day-to-day
experiences remain included.

- Code completions stay included and unmetered.
- Next Edit suggestions stay included and unmetered.
- These experiences should continue to be the default for routine coding.

> **💡 Tip:** Encourage developers to keep using completions and Next Edit
> suggestions as their primary loop. AI Credits should be reserved for chat,
> agentic, and review workflows where the deeper context is worth the spend.

## Why GitHub Is Making This Change

Copilot has evolved from an in-editor assistant into an **agentic development
platform** that can run longer, multi-step tasks across repositories. A flat
request-based model does not reflect the wide range of compute these tasks now
consume.

Usage-based billing aligns cost with actual model and token consumption,
improves budget control for organizations, and supports a more sustainable
Copilot experience as agentic workloads grow.

## Summary

- **Why:** Copilot is evolving into an agentic platform with workloads that vary
  widely in cost, and the previous flat unit model no longer reflects what
  customers actually consume.
- **How:** GitHub AI Credits replace premium request units, meter usage by
  tokens and model, and pool included credits at the billing entity for
  Business and Enterprise — while base subscription prices stay the same.
- **What:** Teams enter June 1, 2026 with a clearer view of what is changing,
  what stays included, and where to invest follow-up planning effort.

## References

- [GitHub announcement: GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Usage-based billing for organizations and enterprises](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)
- [Set up budgets](https://docs.github.com/en/billing/how-tos/set-up-budgets)
