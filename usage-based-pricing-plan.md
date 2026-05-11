# GitHub Copilot Usage-Based Pricing Plan

> **Note:** This document is an internal **planning guideline**, not a blog
> post. It is the source of truth for the following published drafts in
> `newblogideas/`:
>
> - `copilot-usage-based-billing-announcement.md` (Part 1 — Announcement)
> - `copilot-ai-credits-admin-playbook.md` (Part 2 — Admin actions)
> - `efficient-token-usage-for-copilot.md` (Part 3 — Developer guidance)
> - `copilot-billing-rollout-faq-and-checklist.md` (Part 4 — Appendix, FAQ, checklist)
>
> Update this file when the facts or policy change, then propagate edits into
> the affected drafts.

## Purpose

Create a clear internal plan to announce GitHub Copilot's move to usage-based billing, guide immediate admin and user actions, and help teams use Copilot efficiently under the new GitHub AI Credits model.

## Audience

- Engineering leaders
- Developers using GitHub Copilot
- GitHub organization and enterprise owners
- Billing managers and cost center owners
- Developer productivity, platform engineering, and FinOps teams

## Part 1: Announcement

### Key message

GitHub Copilot is moving to usage-based billing on **June 1, 2026**. Instead of premium request units, Copilot usage will consume **GitHub AI Credits**.

### What is changing

- Copilot plans will include a monthly allotment of GitHub AI Credits.
- AI Credits are consumed based on token usage, including input tokens, output tokens, and cached tokens.
- Usage cost depends on the model used and the number of tokens consumed.
- Code completions and Next Edit suggestions remain included and do not consume AI Credits.
- Base plan pricing is not changing:
  - Copilot Pro: $10/month, including $10 in monthly AI Credits.
  - Copilot Pro+: $39/month, including $39 in monthly AI Credits.
  - Copilot Business: $19/user/month, including $19 in monthly AI Credits.
  - Copilot Enterprise: $39/user/month, including $39 in monthly AI Credits.
- For Business and Enterprise, included AI Credits are pooled at the billing entity level.
- Existing Business and Enterprise customers receive promotional included usage for June, July, and August 2026:
  - Copilot Business: $30 in monthly AI Credits per user.
  - Copilot Enterprise: $70 in monthly AI Credits per user.
- If the included credit pool is exhausted, admins can either allow additional usage at published rates or cap spend.
- Copilot code review will also consume GitHub Actions minutes in addition to GitHub AI Credits.

### Why GitHub is making the change

Copilot has evolved from an in-editor assistant into an agentic development platform that can run longer, multi-step tasks across repositories. Usage-based billing aligns cost with actual model and token consumption, improves budget control, and supports a more sustainable Copilot experience.

### Suggested announcement copy

> GitHub has announced that Copilot will move to usage-based billing on June 1, 2026. Premium request units will be replaced by GitHub AI Credits, which are consumed based on token usage and model choice.
>
> Base subscription prices are not changing, and code completions plus Next Edit suggestions remain included. For Business and Enterprise customers, included credits will be pooled across the billing entity, and admins will have budget controls to set limits, alerts, and caps.
>
> Our immediate focus is to prepare teams by reviewing usage, setting budgets and alerts, encouraging auto model selection, and sharing practical guidance for efficient token usage.

### Source

- [GitHub announcement: GitHub Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)

## Part 2: Quick Actions and Suggestions

### Admin quick actions

1. **Review the preview bill**
   - Check the Billing Overview page in early May to understand projected Copilot costs before the June 1 transition.
   - Identify high-usage users, teams, repositories, and cost centers.

2. **Use auto model selection**
   - Recommend auto model selection as the default user behavior where available.
   - Auto model selection helps route tasks to an appropriate model and can reduce unnecessary use of high-cost models.

3. **Set organization or enterprise budgets**
   - Create budgets for Copilot usage at the right scope:
     - Enterprise level
     - Organization level
     - Cost center level
     - User level
   - Avoid overlapping budgets that could unexpectedly block users.

4. **Set caps where spend must be controlled**
   - Enable **Stop usage when budget limit is reached** for budgets that should act as hard caps.
   - Use hard caps for pilots, cost-sensitive teams, or users who should not exceed a defined allowance.
   - Remember: if a user-level budget is exhausted, that user's Copilot access is halted even if the organization pool still has available credits.

5. **Enable alerts**
   - Turn on budget threshold alerts at 75%, 90%, and 100%.
   - Enable included usage alerts at 90% and 100%.
   - Assign alert recipients who can act quickly, such as billing managers, platform owners, or engineering managers.

6. **Decide the additional usage policy**
   - Choose whether additional usage is allowed after included AI Credits are exhausted.
   - If additional usage is allowed, usage continues at published rates.
   - If additional usage is not allowed, usage is blocked until the next billing cycle.

7. **Map ownership**
   - Define who owns:
     - Budget configuration
     - Alert response
     - User communication
     - Cost center review
     - Exception approvals

### Developer quick actions

1. **Use auto model selection by default**
   - Let Copilot choose the right model for routine work instead of manually selecting frontier models for every prompt.

2. **Start with smaller prompts**
   - Ask Copilot to inspect or change a focused area first.
   - Expand the task only when needed.

3. **Use included experiences when they fit**
   - Continue using code completions and Next Edit suggestions for routine coding because they remain included.

4. **Be deliberate with agentic tasks**
   - Reserve long-running agent sessions for work where autonomous exploration and implementation are worth the extra token usage.

5. **Monitor alerts**
   - Treat 75%, 90%, and 100% budget alerts as action points, not just informational emails.

### Suggested operating model

| Area | Recommendation |
| --- | --- |
| Default model behavior | Use auto model selection |
| Budget strategy | Set enterprise/org-level monitoring budgets and targeted user or cost-center caps |
| Alerting | Enable 75%, 90%, and 100% budget alerts plus included usage alerts |
| Exceptions | Allow additional usage only for approved users, teams, or cost centers |
| Review cadence | Review usage trends during the preview period and after each billing cycle |
| Communication | Share user guidance before June 1 and refresh it after the first month of usage data |

### Sources

- [Usage-based billing for organizations and enterprises](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)
- [Set up budgets](https://docs.github.com/en/billing/how-tos/set-up-budgets)

## Part 3: Efficient Token Usage

### Principles

Efficient token usage does not mean using Copilot less. It means using Copilot intentionally: choosing the right feature, giving focused context, and avoiding unnecessary repeated or broad requests.

### Practical guidance for users

1. **Prefer focused prompts**
   - Good: "Update the validation logic in `checkout.ts` to reject expired discount codes."
   - Less efficient: "Review the whole repo and improve anything related to checkout."

2. **Give Copilot the right context once**
   - Include relevant files, errors, constraints, and expected behavior up front.
   - Avoid a long sequence of corrective follow-ups caused by missing context.

3. **Break large tasks into phases**
   - Ask for a plan first.
   - Confirm scope.
   - Then ask Copilot to implement the specific approved changes.

4. **Use the smallest capable workflow**
   - Use inline completions or Next Edit suggestions for local edits.
   - Use chat for explanation, refactoring help, or targeted changes.
   - Use agentic workflows for multi-file changes, test fixes, or tasks that need repository exploration.

5. **Avoid repeatedly sending large context**
   - Do not paste large files or logs repeatedly.
   - Summarize what matters or point Copilot to the specific file, function, test failure, or stack trace.

6. **Ask for diffs, not rewrites**
   - Prefer "change only the error handling in this function" over "rewrite this file."
   - Smaller changes reduce review effort and unnecessary token usage.

7. **Constrain output**
   - Ask for concise answers when you do not need detailed explanations.
   - Ask Copilot to skip unrelated commentary, alternatives, or broad summaries when the task is straightforward.

8. **Use cheaper/default models for routine work**
   - Use auto model selection where possible.
   - Manually choose advanced models only when the task needs deeper reasoning, complex architecture tradeoffs, or difficult debugging.

9. **Stop unproductive loops**
   - If Copilot repeats the same failed approach, pause and provide the exact error, failing test, or expected behavior.
   - Restart with a narrower prompt rather than continuing a long, unfocused thread.

10. **Be intentional with code review**
    - Use Copilot code review for meaningful changes where automated review adds value.
    - Remember that Copilot code review can consume both GitHub AI Credits and GitHub Actions minutes.

### Prompt patterns

| Scenario | Efficient prompt pattern |
| --- | --- |
| Bug fix | "Fix this failing test. Change only the production code needed. Explain the root cause briefly." |
| Refactor | "Refactor this function for readability without changing behavior. Keep public interfaces unchanged." |
| Feature | "Implement this feature in these files. Ask before changing unrelated modules." |
| Debugging | "Given this stack trace and file, identify the likely cause and propose the smallest fix." |
| Review | "Review this diff for correctness, security, and regressions. Ignore style-only comments." |
| Docs | "Update the README section for this behavior. Keep it under 200 words." |

### Team enablement ideas

- Publish a short "Copilot efficient usage" guide.
- Add prompt examples to engineering onboarding.
- Share examples of high-value agentic tasks versus low-value overuse.
- Review the first month of usage data and identify common patterns.
- Create a lightweight exception process for users who need higher budgets.

## Part 4: Optional Appendix

Use this section only if Part 3 becomes too long for the main communication.

### Optional appendix topics

1. **Detailed model guidance**
   - When to use auto model selection.
   - When to manually select a stronger model.
   - When to stay with included or lower-cost options.

2. **Budget policy examples**
   - Conservative policy: cap additional usage by default and approve exceptions.
   - Balanced policy: allow additional usage for engineering cost centers with alerts.
   - Flexible policy: allow additional usage broadly but monitor usage weekly.

3. **FAQ**
   - Do code completions consume AI Credits?
     - No. Code completions and Next Edit suggestions remain included.
   - What happens when included credits are exhausted?
     - It depends on admin policy. Usage can either continue at published rates or be blocked.
   - Are credits pooled?
     - For Business and Enterprise, included credits are pooled at the billing entity level.
   - Do unused credits roll over?
     - Treat monthly included usage as a monthly allowance, not a rollover balance.
   - Who should receive alerts?
     - Billing managers, engineering platform owners, and cost center owners.

4. **Rollout checklist**
   - Review preview bill.
   - Confirm budget owners.
   - Configure budgets and alerts.
   - Decide additional usage policy.
   - Communicate user guidance.
   - Review usage after launch.
   - Adjust caps and exception process based on observed usage.

## Draft rollout timeline

| Phase | Focus | Outcome |
| --- | --- | --- |
| Preparation | Review announcement, docs, preview billing, and current usage | Baseline understanding of expected impact |
| Controls | Configure budgets, caps, alerts, and ownership | Spend controls are ready before the billing transition |
| Enablement | Share user guidance and prompt patterns | Developers understand how to use Copilot efficiently |
| Launch | Monitor usage and respond to alerts | Teams continue working with controlled spend |
| Optimization | Review usage trends and adjust budgets | Budgets and practices reflect real usage patterns |

## Success criteria

- Admins understand the billing change and available controls.
- Budgets and alerts are configured before June 1, 2026.
- Developers know to use auto model selection and efficient prompting.
- High-usage patterns are visible and reviewed.
- Exceptions are handled through a clear owner-approved process.
