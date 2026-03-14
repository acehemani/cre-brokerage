# Deep Research: CRE Brokerage Pain Points & Workflow Intelligence

Paste this into a new Claude Code session (or Claude.ai with deep research enabled).

---

## Objective

I'm building a demo product called **BrokerPower** — an AI-powered operations platform for commercial real estate brokers. Before I finalize the v2 feature set, I need to deeply understand the daily reality of CRE brokers so the demo resonates as "this person has actually talked to brokers" rather than "this person guessed what brokers need."

The demo already has: deal pipeline Kanban, document intelligence (OCR/extraction from OMs and rent rolls), morning briefing, analytics dashboard, and a command center. I need to validate whether these are the right bets and discover what I'm missing.

## Research Areas

### 1. The Daily Workflow of a CRE Broker
- Walk me through a typical day for a mid-market CRE investment sales broker ($5M–$100M deals). What do the first 2 hours look like? What's lunch? What's the evening grind?
- What about a tenant rep broker vs. an investment sales broker — how do their workflows diverge?
- How much time is spent on deal origination vs. deal execution vs. administrative work? What's the split?
- What are the repetitive, low-value tasks that eat the most time?

### 2. The Deal Lifecycle in Detail
- Map out every stage of a CRE investment sale from initial lead to closing. What are the actual stage names brokers use internally (not what CRM vendors call them)?
- At each stage, what documents are generated, received, or reviewed? Who sends them?
- Where do deals stall most often? What's the #1 reason a deal dies at each stage?
- How do brokers track deal probability/confidence? Is it gut feel or is there a system?

### 3. Document Pain Points
- What specific documents do CRE brokers handle most frequently? (OMs, rent rolls, T-12s, estoppels, PSAs, LOIs, title reports, surveys, environmental reports, etc.)
- Which documents are the most painful to process manually? Why?
- How do brokers currently extract data from OMs and financials — manual data entry? Analysts? Outsourced?
- What errors or inconsistencies in documents cause the most downstream problems?
- How are documents shared between parties today? (email attachments, Dropbox, deal rooms like RealPage or Dealpath?)

### 4. Technology Landscape & Frustrations
- What CRM/deal management tools do CRE brokers actually use? (Salesforce, Buildout, Dealpath, RealNex, ClientLook, Apto, spreadsheets?)
- What's the honest adoption rate — do brokers actually use their CRM or just maintain spreadsheets?
- What are the top complaints about existing CRE tech tools?
- Where are the integration gaps — what systems don't talk to each other that should?
- What's the attitude toward AI among CRE brokers? Excitement, skepticism, fear?

### 5. Communication & Collaboration Patterns
- How do brokers communicate with clients, buyers, sellers, attorneys, title companies, lenders?
- How much of a broker's day is email vs. phone vs. in-person?
- What information do brokers need to pull up quickly during a call with a client?
- How do brokerage teams collaborate on deals — is it usually solo or team-based?

### 6. Analytics & Reporting Needs
- What metrics do brokerage managers/team leads actually track?
- What reporting do brokers hate doing? (pipeline reports, activity reports, commission forecasts?)
- What market data sources do brokers rely on? (CoStar, REIS, STR, Real Capital Analytics, local MLS?)
- How do brokers benchmark their own performance?

### 7. The "I Wish I Had..." Questions
- If you could automate one thing in a CRE broker's workflow, what would have the highest impact?
- What information do brokers wish they had at their fingertips during deal negotiations?
- What would make a broker switch from their current tools to a new platform?
- What would make a brokerage *manager* mandate adoption of a new platform?

### 8. Competitive Intelligence
- Analyze the positioning and feature sets of: Buildout, Dealpath, RealNex, Reonomy, Crexi, CREXi, Cherre, Enodo, Cresa's internal tools, and any AI-native CRE startups.
- What gaps exist in the market that none of these tools address well?
- What are the pricing models and who's the buyer (individual broker vs. brokerage firm)?

### 9. Persona Deep Dive
Build me 3 detailed personas:
1. **Solo broker / small team** (1-3 people, $20M-$80M annual deal volume)
2. **Mid-market brokerage team lead** (5-10 people, $200M+ volume, manages junior brokers)
3. **Brokerage operations manager** (doesn't broker deals, but manages systems, reporting, compliance)

For each: daily frustrations, tool stack, what "10x better" looks like, buying triggers, objections to new software.

## Output Format

Structure your findings as:
1. **Executive Summary** — top 5 insights that should shape the product
2. **Workflow Map** — visual/textual map of the deal lifecycle with pain points annotated
3. **Pain Point Ranking** — ranked list of pain points by severity and frequency, with notes on which ones BrokerPower already addresses vs. gaps
4. **Feature Validation** — for each BrokerPower feature (pipeline, doc intelligence, briefing, analytics, command center), rate how well it maps to real broker needs and what's missing
5. **Net-New Feature Ideas** — things we haven't thought of yet, ranked by impact
6. **Competitive Gaps** — where BrokerPower could differentiate
7. **Personas** — the 3 detailed personas
8. **Quotes & Evidence** — real broker quotes, forum posts, or industry data that support the findings
