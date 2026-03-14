// ─── Morning Briefing ───────────────────────────────────────────────────────

export const briefing = {
  overnightSummary: [
    'Processed 8 documents across 4 deals — all key metrics extracted and verified.',
    'Heights Multifamily (64 units, $14.5M) added to pipeline from LoopNet alert.',
    'Generated updated comp analysis for 610 Main Street Tower.',
    'Closing checklist for Energy Corridor Industrial Park updated — 8 of 12 items complete.',
  ],
  actionItems: [
    { text: '3 buyer inquiries for 610 Main St — schedule tours this week.', priority: 'high' as const, agentId: 'maven' },
    { text: 'Order Phase II Environmental for Westheimer Office Tower — DD clock is running.', priority: 'high' as const, agentId: 'sage' },
    { text: 'Review Heights Multifamily flyer — AI flagged as a strong match.', priority: 'medium' as const, agentId: 'scout' },
    { text: 'Follow up with Midtown Retail Strip listing broker — no response in 7 days.', priority: 'medium' as const, agentId: 'maven' },
  ],
  marketPulse: [
    'Houston office vacancy dropped to 18.2% in Q1 — first decline in 3 quarters.',
    'Industrial asking rents up 4.3% YoY in the Energy Corridor submarket.',
    'Two major multifamily developments (800+ units) broke ground in Montrose/Midtown.',
  ],
  weekPipeline: [
    { deal: 'Energy Corridor Industrial Park', expected: 'Closing scheduled for next week' },
    { deal: '610 Main Street Tower', expected: 'Tour scheduling — may receive first offer' },
    { deal: 'Galleria Retail Center', expected: 'Additional docs expected from seller' },
  ],
}

export const alternateBriefing = {
  overnightSummary: [
    'Analyzed 12 new listings from overnight CoStar and LoopNet feeds — 2 flagged as matches.',
    'Spring Branch Warehouse received second offer at $6.6M — counter recommendation generated.',
    'Memorial Green Office listing agreement finalized — OM production begins today.',
    'Risk assessment completed for Katy Freeway Office Park — below-market occupancy noted.',
  ],
  actionItems: [
    { text: 'Review Spring Branch counter-offer strategy — two offers on the table.', priority: 'high' as const, agentId: 'maven' },
    { text: 'Approve Memorial Green OM draft before distribution.', priority: 'high' as const, agentId: 'iris' },
    { text: 'Katy Freeway occupancy risk — review lease-up projections.', priority: 'medium' as const, agentId: 'sage' },
    { text: 'Weekly pipeline review with team at 2 PM.', priority: 'medium' as const, agentId: 'maven' },
  ],
  marketPulse: [
    'Fed held rates steady — CRE lending sentiment improving in Q2.',
    'Houston multifamily absorption turned positive for the first time in 4 months.',
    'New Amazon distribution center announced in Katy — industrial demand expected to rise.',
  ],
  weekPipeline: [
    { deal: 'Spring Branch Warehouse', expected: 'Counter-offer response due by Wednesday' },
    { deal: 'Memorial Green Office', expected: 'OM to be distributed by Thursday' },
    { deal: 'Montrose Mixed-Use', expected: 'BOV presentation scheduled for Friday' },
  ],
}
