# BrokerPower Research Synthesis
## Cross-Model Intelligence Brief — March 14, 2026

**Sources:** Gemini Deep Research (76 citations), GPT Extended Pro (40+ citations), Claude AI Opus Deep Research, Claude Code web search. All four models were given the same 9-area research prompt with BrokerPower v1 context.

---

## Executive Summary

Four independent AI research sessions converged on the same core thesis: **BrokerPower's biggest opportunity is not building a better dashboard — it's building the broker's daily operating layer.** The product that wins mid-market CRE is the one that carries data and tasks forward automatically, so brokers spend their time on calls, tours, and closings instead of updating spreadsheets and triaging email.

### The 5 Strategic Bets (All 4 Models Agree)

1. **Document Intelligence is the wedge.** Manual extraction from T-12s, rent rolls, and OMs is universally the most hated task in CRE. Crexi Vault validated the category (6,300+ docs processed in beta, 3,150+ hours saved). But extraction alone is table stakes — BrokerPower must go deeper into line-item parsing, cross-document reconciliation, anomaly detection, and auto-populating deal cards.

2. **Morning Briefing is the differentiator.** No competitor offers proactive daily intelligence. Every model flagged this as genuinely novel. But it must be deal-centric ("your buyer on 500 Main went dark 4 days ago") not just market-centric ("Houston office vacancy is 29%").

3. **Mid-market is the gap.** Dealpath owns institutional ($10T+ in transactions). Buildout owns large brokerages (50K+ brokers). Solo brokers and 1-10 person teams ($20M-$200M deal volume) are stuck cobbling together 7+ disconnected tools. Price at $79-99/user/mo to undercut Buildout ($129-149) and RealNex ($134-159).

4. **Due diligence tracking is the biggest unmet operational need.** The DD phase has the highest deal-death rate and the worst tooling. Nobody does integrated DD checklists well. A "DD War Room" with document tracking, deadline management, responsible parties, and blocker flags would fill a genuine market vacuum.

5. **The buyer is the ops manager/team lead, not the individual broker.** Brokers resist new tools. Managers mandate them. BrokerPower needs dual value props: "saves you 2 hours/day" for the broker, "pipeline visibility and commission forecasting without asking anyone" for the manager.

---

## The Deal Lifecycle (Research-Informed)

BrokerPower v1 uses 6 stages. All four models agreed these are wrong — they mix lead-flow with transaction stages, and "Under Contract" / "Due Diligence" happen simultaneously in CRE, not sequentially.

### Recommended Pipeline Stages (Investment Sales)

```
1. PROSPECTING / OWNER COVERAGE
   What: Cold calls, referral cultivation, CoStar/Reonomy research, ownership tenure analysis
   Docs: None generated. Owner contact info, tax records, prior sales
   Kill reason: Owner not ready, pricing expectations unrealistic
   Time: 40-50% of senior broker time (most avoided, highest value)

2. BOV / PITCH / UNDERWRITING
   What: Broker Opinion of Value, listing presentation, pricing strategy
   Docs: BOV, CMA, comps package, market reports
   Kill reason: Competing broker wins, valuation mismatch
   Pain: Assembling a defensible story fast from messy source files

3. LISTING WON / SELLER INTAKE
   What: Exclusive signed, collect seller docs, build data room
   Docs: Listing agreement, T-12, rent roll, leases, photos, floorplans
   Kill reason: Seller data arrives late/incomplete, financials reveal problems
   Pain: *** DOC INTELLIGENCE MOST VALUABLE HERE ***

4. MARKETING / OM LIVE
   What: OM creation, buyer list curation, CA/NDA tracking, email campaigns
   Docs: Offering Memorandum, teaser/flyer, confidentiality agreement
   Kill reason: Insufficient buyer interest, market shift
   Pain: OM creation takes 20-40 hours. Version control. Tracking who saw what

5. TOURS / OFFERS / BEST & FINAL
   What: Property tours, Q&A, collecting LOIs, bid comparison, best-and-final rounds
   Docs: Tour schedules, LOIs, bid matrix, buyer diligence materials
   Kill reason: Bid-ask spread too wide, buyer financing contingencies
   Pain: Comparing non-like-for-like bids across email/PDF/spreadsheet

6. UNDER CONTRACT (DD ACTIVE)
   What: PSA negotiation + due diligence + financing — all happening simultaneously
   Docs: PSA, title commitment, ALTA survey, Phase I/II ESA, PCA, estoppels,
         SNDAs, zoning letter, lease files, lender materials, appraisal
   Kill reason: Environmental issues, title defects, lease inconsistencies,
                appraisal gap, financing failure
   Pain: *** HIGHEST DEAL-DEATH RISK. WORST TOOLING ***
   Note: 30-90 day window. This is where DD War Room lives

7. CONTINGENCIES WAIVED / HARD
   What: Buyer removes contingencies, earnest money goes "hard" (non-refundable)
   Docs: Contingency removal notice, updated closing timeline
   Kill reason: Last-minute title cures, financing breakdown, admin errors
   Pain: Critical date management — missing a deadline creates liability

8. CLOSED
   What: Title company coordinates closing, funds transfer, deed recorded
   Docs: Settlement statement, deed, title insurance, commission disbursement
   Pain: Commission split accuracy, post-close comp capture for future reference
```

### Tenant Rep Pipeline (Different Workflow)
GPT and Gemini both flagged that tenant rep needs a completely separate mode:
```
Requirement Definition → Market Survey → Shortlist → Tours → RFP/LOI →
Lease Negotiation → Execution → Critical Date Management / Renewals
```
**v2 recommendation:** Build for investment sales first (more document-intensive, higher pain, higher value per deal). Note tenant rep as a future mode.

---

## Pain Point Ranking

Consolidated across all 4 models. Severity and frequency scored 1-5. "Convergence" = how many models independently identified it as a top pain.

| Rank | Pain Point | Sev | Freq | Conv | BrokerPower v1 |
|------|-----------|-----|------|------|----------------|
| 1 | **Fragmented tools / duplicate data entry across 7+ systems** | 5 | 5 | 4/4 | Partial — single platform, but no integrations |
| 2 | **Manual document extraction & reconciliation (T-12, rent roll, OM, leases)** | 5 | 5 | 4/4 | Partial — Doc Intelligence exists but mock/shallow |
| 3 | **No DD checklist / critical date tracking** | 5 | 5 | 4/4 | Gap |
| 4 | **Stale pipeline / no probability tracking / silent deal death** | 4 | 5 | 4/4 | Partial — static Kanban, no alerts |
| 5 | **BOV/OM creation is slow and design-intensive** | 5 | 4 | 3/4 | Gap |
| 6 | **LOI/offer comparison is manual spreadsheet work** | 4 | 4 | 3/4 | Gap |
| 7 | **Comp data trapped in silos (email, spreadsheets, OMs)** | 4 | 5 | 3/4 | Gap |
| 8 | **Commission tracking and forecasting done in fragile spreadsheets** | 4 | 4 | 4/4 | Gap |
| 9 | **CRM adoption is dismal — 80% of data never entered** | 4 | 5 | 4/4 | Partial — but requires manual entry |
| 10 | **Buyer/seller intelligence scattered across email threads** | 4 | 4 | 3/4 | Gap |
| 11 | **Email overload / no automated triage for deal-relevant messages** | 3 | 5 | 3/4 | Gap |
| 12 | **Manager reporting is manual reconciliation from broker spreadsheets** | 3 | 4 | 4/4 | Partial — Analytics exists but no filtering |
| 13 | **AI trust / provenance — brokers distrust black-box outputs** | 4 | — | 2/4 | Gap |
| 14 | **CoStar is expensive ($200-$2K+/mo) and data is incomplete** | 3 | 5 | 2/4 | Gap |
| 15 | **Post-close comp capture for future BOVs** | 2 | 3 | 2/4 | Gap |

---

## Feature Validation

### Scoring (Need Fit × Current Fit)

| Feature | Need (1-5) | v1 Fit (1-5) | Gap | Priority |
|---------|-----------|-------------|-----|----------|
| **Document Intelligence** | 5 | 3.5 | Needs line-item parsing, reconciliation, anomaly detection, pipeline connection | Must-fix for v2 |
| **Deal Pipeline** | 5 | 2.5 | Wrong stages, no drag-drop, no probability, no filters, no critical dates | Must-fix for v2 |
| **Command Center** | 5 | 2 | Static display → action queue with deadlines, missing docs, stale deals | Must-fix for v2 |
| **Morning Briefing** | 4.5 | 3 | Must be deal-centric not market-centric, personalized per broker | Enhance for v2 |
| **Analytics** | 4 (managers: 5) | 2.5 | Needs commission forecasting, per-broker views, weighted pipeline, filtering | Enhance for v2 |

### What Each Feature Is Missing (Consolidated)

**Document Intelligence**
- Line-item rent roll extraction (unit-level: tenant, suite, SF, lease dates, rent/SF, escalations)
- T-12 operating statement parsing with chart-of-accounts normalization
- Cross-document reconciliation: OM claims vs actual rent roll vs T-12 vs leases vs estoppels
- Anomaly detection: expenses at 18% when market is 35-40%, "Economic Vacancy" gaps
- Provenance: show source page/line for every extracted number (GPT's #1 insight)
- Auto-populate deal cards from extracted data
- Export to Excel / underwriting models
- Batch processing (Crexi Vault handles 100 docs at once)

**Deal Pipeline**
- 8 stages matching real broker language (see lifecycle above)
- Drag-and-drop between stages
- Deal probability / confidence scoring (stage-based + manual override)
- Stale-deal alerts ("Deal X hasn't moved in 18 days")
- Critical date tracking with deadline alerts
- Filters: broker, asset type, deal size, submarket, probability
- Team member assignment
- Buyer tracking per listing (who has OM, who toured, who bid)
- "Why stuck" field for each deal

**Command Center**
- Action queue: what changed overnight, who needs follow-up, what deadline is at risk
- Quick-action buttons (log call, create contact, start deal)
- One-click access to any deal
- Attention alerts linked to specific deals with one-tap actions
- Net broker commission stat (not just gross volume — brokers care about take-home)

**Morning Briefing**
- Deal-centric first, market-centric second
- Reference actual deals by name ("Your buyer on 500 Main went dark")
- Surface overnight email activity
- Calendar awareness ("property tour at 2pm — here's the deal summary")
- Deals at risk based on pipeline velocity
- Regenerate button for on-demand refresh
- Checkable action items

**Analytics**
- Commission tracking: amount per deal, split structure, probability-weighted forecast
- Per-broker performance views (critical for team leads)
- Filtering by time period, broker, asset type, market
- Weighted pipeline (not raw pipeline value)
- Proposals-to-close ratio, listings won/lost by source
- Exportable reports for management
- Comparison to prior period / benchmarks

---

## Net-New Feature Ideas (Not in v1 or v2 Plan)

Ranked by cross-model consensus and estimated demo impact.

### Tier 1 — Build These (All Models Agree)

**1. Due Diligence War Room**
*Convergence: 4/4. Impact: Very High.*
Structured checklist per deal with: document category, received Y/N, responsible party, due date, status, blockers. Pre-populated templates by asset type (multifamily, office, retail, industrial). Categories: Financial (T-12, rent roll, lease abstracts), Legal (title, survey, zoning), Physical (PCA, Phase I ESA), Tenant (estoppels, SNDAs). Tracks "open / owner / deadline / blocker / impact" per item. This is the single biggest operational gap across the entire competitive landscape.

**2. Provenance-Based Document Reconciliation**
*Convergence: 3/4 (GPT's unique #1). Impact: Very High.*
Compare OM claims vs rent roll vs T-12 vs leases vs estoppels. Flag mismatches with source-page proof. Show exactly which page/line a number came from. This is what makes brokers trust AI output — and it's what no competitor does well. If BrokerPower becomes the fastest trustworthy reconciliation layer, it will feel like it has actually lived inside a deal.

**3. Comp Database with Auto-Capture**
*Convergence: 3/4. Impact: High.*
Every processed document feeds a searchable comp database (price, price/SF, cap rate, NOI, close date, property type, submarket). Replaces the personal spreadsheets brokers maintain. Creates a data flywheel — the more docs processed, the more valuable the comp set.

**4. Commission Tracker & Forecast**
*Convergence: 4/4. Impact: High.*
Track splits per deal (listing side, selling side, referral fees, team splits), expected close dates, probability-weighted commission forecast. Roll up into broker-level and team-level views. This is the feature that converts ops managers from skeptics to champions. Every ops manager's nightmare is end-of-quarter commission reconciliation in spreadsheets.

**5. Deal Action Engine**
*Convergence: 2/4 (GPT's unique #1 net-new). Impact: High.*
Convert emails, uploaded docs, and stage changes into next actions with owners, due dates, and escalation alerts. The system that answers "what do I do next?" without the broker having to ask.

### Tier 2 — Strong Differentiation

**6. BOV/OM Assembler** — Auto-fill BOVs, OMs, teasers from deal data + templates. Addresses a 20-40 hour/deal pain point.

**7. LOI Comparison Matrix** — Side-by-side term extraction from multiple LOIs (price, earnest money, DD period, contingencies, closing timeline).

**8. Buyer Memory Graph** — Track buyer preferences, tour history, bids, feedback, and pass reasons across deals (not just within one listing). 75.4% of CRE business comes from referrals — relationship memory is critical.

**9. One-Click Call Prep** — Before a client call, surface: latest comps, pricing, buyer activity, unresolved DD items, next deadlines. One screen, 10 seconds.

**10. Email Intelligence Layer** — Parse incoming email to auto-detect deal activity, suggest deal associations, surface action items, reduce manual CRM entry. This is what makes or breaks CRM adoption.

### Tier 3 — Future Roadmap

**11. Relationship Trigger Engine** — Surface loan maturities, lease rollovers, 1031 windows, and owner events that should trigger outreach.

**12. Tenant Rep Mode** — Completely separate workflow: market survey, shortlist, tour book, RFP/LOI equalization, lease abstracting, key-date reminders.

**13. Mobile Deal Summary Card** — One-screen deal summary optimized for phone. Key stats, last activity, next action. Brokers are out of office 50%+ of the time.

**14. Market Snapshot Integration** — Pull vacancy rates, rent trends, cap rate benchmarks from public sources to reduce CoStar dependency.

---

## Competitive Landscape

### Market Map (Consolidated from All 4 Models)

| Competitor | Focus | Price | Buyer | Strength | Weakness / BrokerPower Opportunity |
|-----------|-------|-------|-------|----------|-----------------------------------|
| **Buildout** | End-to-end brokerage (CRM + marketing + commissions) | $125-149/user/mo | Brokerage firms | 50K+ brokers, OM creation, Salesforce-based | Complex, long learning curve. "Unified CRM" push is recent — room for more document-deep, action-oriented UX |
| **Dealpath** | Institutional deal management | Enterprise/custom | Institutional teams | $10T+ in transactions, CBRE/JLL/Cushman | Enterprise-focused, not mid-market. Setup complaints: "billing starts before system is set up" |
| **RealNex** | All-in-one CRE suite | $134-224/user/mo | Individual brokers, small teams | CRM + financial analysis + marketing in one | Dated UI, less AI innovation |
| **Crexi** | Marketplace + data + Vault (doc AI) | Free to $299+/mo | Individual brokers | 2M+ monthly users, Vault extracts 24+ data points in 2 min | Marketplace-first, not daily operating layer |
| **Reonomy** | Property/ownership intelligence | $49+/mo | Brokers, investors | 54M+ properties, "likely to sell" signals | Data/sourcing only, not workflow |
| **ClientLook** | Simple CRM | Affordable | Solo brokers | Easy setup, free trial | Basic, limited deal management |
| **Altrio** | Investment-sales workflow | Demo-based | Mid-market brokers | "Lead capture to closing dinner," buyer tracking, data extraction | Closest conceptual comp to BrokerPower — watch closely |
| **RealQuant** | Document intelligence | Unknown | Analysts, brokers | Excel-native, links every number to exact page/line | Narrow — doc intelligence only |
| **AnthemIQ** | Tenant-rep workflow | Brokerage-paid | Tenant-rep teams | Collaborative deal management, AI doc assist, key-date reminders | Tenant-rep only |
| **Cactus** | AI underwriting | Unknown | Investors, brokers, lenders | Fast deal modeling, 1,500+ professionals | Underwriting-focused, no broader workflow |
| **Bracket CRE** | "Operating system" for investment sales | New/unknown | Mid-market brokers | Marketplace + workflow, March 2026 launch | Brand new, unproven |

### BrokerPower's Differentiation (5 Open Lanes)

**Lane 1: Intelligence layer across the full deal lifecycle.**
Every competitor does data OR CRM OR documents OR pipeline. Nobody synthesizes all of these into a daily intelligence layer that tells the broker what matters right now. Morning Briefing + AI deal scoring + document anomaly detection = a true "AI copilot" positioning no incumbent has achieved.

**Lane 2: Mid-market sweet spot.**
Dealpath = enterprise. Buildout = large brokerages. Free tools = too generic. The 1-10 person team doing $20M-$200M in deals is underserved by purpose-built tools that are simple, opinionated, and useful on day one. Price at $79-99/user/mo.

**Lane 3: Document reconciliation with provenance.**
RedIQ and Clik.ai extract data but dump it into standalone reports. Crexi Vault extracts but doesn't reconcile. Nobody compares OM vs rent roll vs T-12 vs leases and shows source-page proof. This is BrokerPower's chance to be the "fastest trustworthy reconciliation layer."

**Lane 4: Due diligence workflow management.**
Surprisingly underdeveloped across the entire landscape. DD tracking lives in Google Sheets, email threads, and sometimes Smartsheet. An integrated DD checklist connected to the deal pipeline fills a genuine vacuum.

**Lane 5: Proactive intelligence vs passive record-keeping.**
Every CRM is a passive system brokers must feed. BrokerPower's Morning Briefing flips this: the system tells the broker what to do. Extending to stale-deal alerts, deadline reminders, and "deals at risk" warnings is genuinely novel.

---

## Personas

### Persona 1: Jake Torres — The Solo Hunter
**Profile:** 38, independent investment sales broker in San Antonio. 8 years in CRE. 2-person team (himself + part-time admin). Multifamily and retail, $3M-$15M deals. ~$50M annual volume across 6-10 closings.

**Daily reality:** 50%+ of time out of office on tours, meetings, networking. Manages pipeline in a personal Excel spreadsheet with color-coded tabs. Creates OMs himself in InDesign or pays a freelancer ($1,500-$3,000 each, 2 weeks turnaround). No CRM — his phone contacts and mental Rolodex are the system.

**Tool stack:** CoStar ($400+/mo), Crexi (free listing), Excel, Gmail, iPhone, occasional InDesign. Total: ~$600/mo + freelance costs.

**Top frustrations:** Forgets follow-ups because no system reminds him. Spends weekends formatting OMs. Can't pull comps during a phone call. Loses track of DD deadlines when juggling 4-5 deals. Admin assistant spends 60% of time on filing instead of prospect research.

**What 10x looks like:** One app on his phone and laptop that shows every deal, every deadline, every document, and tells him who to call today. Opens it at 6:30am and knows exactly what to do before his 8am meeting. Drops an OM in and it builds a financial model without manual entry.

**Buying triggers:** Loses a deal because he missed a DD deadline tracked only in his head. Another broker at a conference shows him their pipeline on a tablet. Analyst quits and all deal knowledge walks out the door.

**Objections:** "I don't have time to learn a new system." "My spreadsheet works fine for 5 deals." "I've tried CRMs before, I stop using them after 2 weeks." "Is this platform going to trap my data if I switch firms?"

**Price sensitivity:** $50-100/mo if it demonstrably saves 5+ hours/week. Needs free trial to commit.

**The quote that defines him:** "I'm not trying to be a grinder — the reason I love this job is because you can get away with working very little, but I still would like to bring in $250k/yr. I love to golf and I want to spend most of my time on the course." — r/CommercialRealEstate

---

### Persona 2: Rachel Kim — The Team Captain
**Profile:** 44, SVP at a regional brokerage in Houston. 15 years experience. Leads 8 people (4 senior brokers, 2 analysts, 1 marketing coordinator, 1 admin). Office and industrial investment sales, $20M-$100M deals. ~$400M annual team volume across 15-20 closings.

**Daily reality:** Mornings reviewing team pipeline, resolving deal issues, coaching juniors. Afternoons on her own deals and client relationships. Constant Slack/email from team: "where are we on X?" Runs weekly pipeline meetings using a shared Google Sheet that's never current. Friday afternoons assembling pipeline reports for firm leadership. Cannot forecast commissions accurately.

**Tool stack:** Buildout/Rethink CRM (firm mandate, 40% adoption), CoStar, Argus (begrudgingly), Excel (extensive), Slack, Outlook, Google Drive. Total: ~$400/user/mo across tools, plus analyst salaries.

**Top frustrations:** No visibility into what team is actually doing. Juniors don't update the shared spreadsheet. Analysts spend 40% of time on data entry from OMs instead of real underwriting. Gets blindsided by DD issues nobody tracked. Monday pipeline meetings are 90 minutes of verbal updates.

**What 10x looks like:** Opens one screen and sees every deal her team is working, the status of every DD item, forecasted commissions for the quarter, and which deals need her attention. Never has to ask anyone for a status update again.

**Buying triggers:** A deal blows up because DD was mismanaged. Leadership demands better reporting. Loses a junior broker who complains about outdated tools. Missing a quarterly revenue target because a junior hid a dying deal.

**Objections:** "My top producers won't use anything new." "Does it integrate with Buildout? We're locked into a contract." "Can't justify the cost for 8 seats without proving ROI first." "Implementation timeline?"

**Price sensitivity:** Budget authority up to $200/user/mo if ROI is clear. Needs team pilot (3-4 users) first.

---

### Persona 3: David Park — The Ops Optimizer
**Profile:** 52, Director of Operations at a 60-person regional brokerage in Atlanta. Not a broker — came from fintech. Manages systems, reporting, compliance, and technology. Reports to Managing Director.

**Daily reality:** Oversees CRM administration (Salesforce, poorly adopted — 30-40% at best). Runs monthly commission calculations in a custom Excel macro that breaks every quarter. Produces management reports by manually compiling broker spreadsheets. Fields constant requests from brokers needing data, reports, or system help. Onboarding new brokers takes 3 weeks because of fragmented stack.

**Tool stack:** Manages Salesforce, Buildout, CoStar Enterprise, DocuSign, SharePoint, custom Excel commission tracker, Concur, QuickBooks. Total firm tech spend: ~$3,000/broker/year across 7+ tools.

**Top frustrations:** CRM data quality is terrible — brokers enter minimal info to comply with mandates. Can't answer the MD's basic question: "What's our pipeline value right now?" Commission accounting is a nightmare of spreadsheets and exceptions. Every new tool means another integration to maintain. "Swivel chair syndrome" — constantly copying data between systems.

**What 10x looks like:** 90%+ CRM adoption because the system gives brokers value back (morning briefings, deal alerts, automated docs). Commission forecasting automated and accurate. Pipeline reports generate themselves. New broker onboarding in one day, not three weeks.

**Buying triggers:** Audit finding about missing deal documentation. MD demands technology overhaul. Annual tech budget review reveals $180K/year on 7+ tools that don't talk to each other. Losing a vendor contract and needing to replace a core system.

**Objections:** "We just implemented Salesforce 2 years ago." "How do I get 40 brokers to actually use this?" "What's the data migration path?" "Does it handle our commission splits, which are unique to each broker?" "Security and compliance certifications?"

**Price sensitivity:** Thinks firm-wide. Current: ~$3,000/broker/year. Would pay $1,200-2,400/broker/year ($100-200/mo) for a consolidated platform that replaces 3+ tools and actually gets adopted.

---

## Positioning & Messaging

### Tagline Options (Informed by Research)

**For brokers:** "AI agents that run your brokerage while you close deals."
- Maps to the universal desire: more time for prospecting, relationships, and golf — less time on admin

**For managers:** "See your entire pipeline without asking anyone."
- Maps to the #1 team-lead frustration: no visibility without chasing brokers

**For ops:** "One platform instead of seven. Data that enters itself."
- Maps to the "swivel chair syndrome" and fragmented tool stack

### Key Messaging Principles

1. **"Buys back time" not "adds features"** — Frame every capability around giving brokers more hours for revenue-generating activities
2. **"AI that makes the broker indispensable"** — Not a replacement, a multiplier. Addresses AI anxiety directly
3. **"Read-only first, then let go"** — Profasee's trust model works perfectly for CRE. Start in observe mode, earn autonomy
4. **Show provenance** — Every AI output must cite its source. Brokers who underwrite for a living will not trust black boxes
5. **Respect the broker's independence** — "Software must conform to the broker's workflow, not force the broker to conform to the software"

### The Quote That Should Guide Everything

> "Stop behaving like a dashboard and start behaving like the broker's daily operating layer — what do I call now, what document is wrong, what deadline is at risk, and what should I send next?"
> — GPT Extended Pro synthesis

---

## v2 Priority Recommendations

### Must-Build (Demo Impact + Research Validation)

1. **Fix the pipeline** — 8 stages, drag-drop, probability, stale alerts, filters, critical dates
2. **Wire Document Intelligence to Pipeline** — extracted data auto-populates deal cards
3. **Due Diligence War Room** — checklist tracker per deal with document status and deadlines
4. **Commission Tracker in Analytics** — splits, probability-weighted forecast, per-broker views
5. **Personalize Morning Briefing** — deal-centric, reference actual deals by name, surface overnight activity
6. **Command Center as action queue** — not static cards, but "what needs your attention right now" with one-tap actions

### Should-Build (Competitive Differentiation)

7. **Agent personality system** — Named AI agents (Scout, Iris, Atlas, Sage, Ledger, Maven) that show up in activity feeds and briefings
8. **Cross-document reconciliation with provenance** — OM vs rent roll vs T-12 with source-page proof
9. **Comp database with auto-capture** — every closed deal feeds searchable comp set

### Could-Build (Future Roadmap)

10. BOV/OM generation from templates
11. LOI comparison matrix
12. Buyer memory graph
13. Email intelligence layer
14. Tenant rep mode

---

## Appendix: Source Summary

| Model | Report Length | Citations | Unique Strengths |
|-------|-------------|-----------|-----------------|
| **Gemini Deep Research** | ~15K words | 76 sources | Deepest sourcing, Reddit/practitioner quotes, "Economic Vacancy" insight, "Commission Conundrum" concept |
| **GPT Extended Pro** | ~8K words | 40+ sources | Most practitioner-authentic, 9-stage lifecycle, surfaced Altrio/RealQuant/AnthemIQ, "provenance-based reconciliation," honest about data gaps |
| **Claude AI Opus Deep** | ~6K words | 20+ sources | Cleanest structure, dual value prop insight, 5-point priority plan, Bracket CRE competitive flag |
| **Claude Code** | ~5K words | 15+ sources | Best quick-reference tables, specific pricing data across competitors, fastest turnaround |

---

*Generated March 14, 2026 by cross-referencing 4 independent AI research sessions for BrokerPower v2 product strategy.*
