# CRE Brokerage Demo — Build Prompt

Paste everything below this line into Claude Code, then run `/plan-ceo-review` and pick HOLD SCOPE.

---

Build a CRE brokerage operations demo — a working web app that shows a mid-market commercial real estate broker what their back-office looks like when AI agents run it 24/7.

STACK: React + Tailwind + Vite (already scaffolded with react-router-dom, recharts, lucide-react installed). Use Tailwind v4 with @tailwindcss/vite plugin.

DEPLOY TARGET: Cloudflare Pages (wrangler is authenticated). After build, deploy with `npx wrangler pages deploy dist --project-name=cre-brokerage-demo`

THE APP HAS 5 SCREENS:

1. COMMAND CENTER (home dashboard)
   - "Good morning" banner with today's date
   - Agent Activity Feed: timestamped log of what the AI agents did overnight. Examples:
     - "Processed 3 new OMs from email — extracted key deal data"
     - "Updated pipeline: Westheimer Office moved to Due Diligence"
     - "Generated comp analysis for 610 Main St listing"
     - "Flagged: LOI for Galleria Tower expires in 48 hours"
   - Quick stats: Active Deals (12), Documents Processed Today (8), Pending Actions (3), Deals Closing This Month (2)
   - "Needs Your Attention" cards — 2-3 items requiring human decision

2. DEAL PIPELINE
   - Kanban board with stages: Prospect → Contacted → LOI → Due Diligence → Under Contract → Closed
   - 8-10 realistic Houston CRE deals (use real street names, realistic asking prices $2M-$25M, real property types: office, retail, industrial, multifamily)
   - Each deal card shows: property name, address, asking price, SF, price/SF, days in stage, assigned broker
   - Click a deal → slide-out panel with full details, document list, timeline of agent activity on that deal
   - Badge on cards: "3 new docs processed" or "OM extracted"

3. DOCUMENT INTELLIGENCE
   - Shows recently processed documents with AI extraction results
   - Each document shows: filename, type (OM, Rent Roll, Financial, Inspection), upload date, status (Processed/Pending/Failed)
   - Click a document → shows extracted data in a clean table:
     - For OMs: property name, address, asking price, NOI, cap rate, SF, units, year built, occupancy
     - For Rent Rolls: tenant list, lease expiry dates, rent/SF, total annual rent
   - LIVE DEMO FEATURE: drag-and-drop zone at top — "Drop a PDF here to see AI extraction in action" (simulate processing with a 3-second loading animation, then show mock extracted data)

4. MORNING BRIEFING
   - Auto-generated daily summary that would be emailed to the broker
   - Sections:
     - "What happened overnight" (deals updated, documents processed)
     - "Action items" (LOIs expiring, follow-ups due, documents needing review)
     - "Market pulse" (2-3 bullet points about Houston CRE market — mock data)
     - "This week's pipeline" (deals expected to move stages)
   - "Send to Email" button (mock — just shows a toast "Sent to broker@example.com")

5. ANALYTICS
   - Simple charts (use Recharts):
     - Deal flow by month (bar chart, last 6 months)
     - Pipeline value by stage (horizontal bar)
     - Average days in each stage (line or bar)
     - Document processing volume (area chart, last 30 days)
   - "Agent ROI" callout box: "Your AI agents saved an estimated 47 hours this month — equivalent to $4,700 in staff time"

DESIGN REQUIREMENTS:
- Dark, professional theme. Think Bloomberg terminal meets modern SaaS.
- Subtle accent color (teal or blue-green).
- Clean typography, lots of whitespace, data-dense but not cluttered.
- Sidebar nav with icons for each screen.
- Must feel like a real product, not a prototype.
- Responsive but optimize for laptop/desktop demo (1280px+).

MOCK DATA:
- Use realistic Houston commercial real estate data
- Property names like "Westheimer Office Tower", "Galleria Retail Center", "Energy Corridor Industrial Park", "Montrose Mixed-Use"
- Realistic CRE metrics: cap rates 5.5-8%, NOI ranges, price/SF by type
- Broker names, realistic email subjects for the activity feed
- Timestamps should be "today" and "last 24-48 hours" for the feed

THE GOAL: A broker sees this and says "that's my business — but better."

PARALLEL BUILD STRATEGY: Use multiple parallel Claude Code sessions via Conductor if available. Split the work:
- Session 1: Layout shell (sidebar, routing, theme, Tailwind config)
- Session 2: Command Center + Morning Briefing screens
- Session 3: Deal Pipeline (kanban + slide-out panel)
- Session 4: Document Intelligence (table + drag-drop demo)
- Session 5: Analytics (all Recharts charts + ROI callout)
- Session 6: Mock data module (all deals, documents, activity feed data)

After all screens are built, run `/qa` to verify everything works, then deploy:
```
npx wrangler pages deploy dist --project-name=cre-brokerage-demo
```
