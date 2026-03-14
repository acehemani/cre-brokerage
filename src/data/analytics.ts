import type { DealStage } from './types'

// ─── Analytics Data ─────────────────────────────────────────────────────────

export const dealFlowByMonth = [
  { month: 'Oct', newDeals: 4, closed: 1 },
  { month: 'Nov', newDeals: 6, closed: 2 },
  { month: 'Dec', newDeals: 3, closed: 1 },
  { month: 'Jan', newDeals: 7, closed: 3 },
  { month: 'Feb', newDeals: 5, closed: 2 },
  { month: 'Mar', newDeals: 8, closed: 2 },
]

export const pipelineValueByStage: { stage: DealStage; value: number; count: number }[] = [
  { stage: 'Prospecting', value: 21700000, count: 2 },
  { stage: 'BOV / Pitch', value: 13200000, count: 2 },
  { stage: 'Listing Won', value: 11200000, count: 1 },
  { stage: 'Marketing / OM Live', value: 22000000, count: 1 },
  { stage: 'Tours / Offers', value: 19000000, count: 2 },
  { stage: 'Under Contract (DD)', value: 18500000, count: 1 },
  { stage: 'Contingencies Cleared', value: 24800000, count: 1 },
  { stage: 'Closed', value: 22300000, count: 2 },
]

export const avgDaysInStage = [
  { stage: 'Prospecting', days: 8 },
  { stage: 'BOV / Pitch', days: 12 },
  { stage: 'Listing Won', days: 10 },
  { stage: 'Marketing', days: 21 },
  { stage: 'Tours', days: 18 },
  { stage: 'Under Contract', days: 30 },
  { stage: 'Contingencies', days: 15 },
]

export const docProcessingVolume = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  count: Math.floor(Math.random() * 8) + 2 + (i > 20 ? 3 : 0),
}))

export const brokerLeaderboard = [
  { broker: 'Marcus Chen', deals: 4, volume: 64300000 },
  { broker: 'Sarah Nguyen', deals: 4, volume: 54300000 },
  { broker: 'David Park', deals: 4, volume: 45000000 },
]

export const dealTypeDistribution = [
  { type: 'Office', count: 5, value: 64500000 },
  { type: 'Retail', count: 2, value: 16500000 },
  { type: 'Industrial', count: 3, value: 48300000 },
  { type: 'Multifamily', count: 1, value: 14500000 },
  { type: 'Mixed-Use', count: 1, value: 8900000 },
]

export const profitAndLoss = [
  { category: 'Gross Revenue', ytd: 4850000, budget: 4600000 },
  { category: 'Vacancy Loss', ytd: -340000, budget: -320000 },
  { category: 'Effective Revenue', ytd: 4510000, budget: 4280000 },
  { category: 'Operating Expenses', ytd: -1580000, budget: -1650000 },
  { category: 'Net Operating Income', ytd: 2930000, budget: 2630000 },
  { category: 'Debt Service', ytd: -1450000, budget: -1450000 },
  { category: 'Cash Flow', ytd: 1480000, budget: 1180000 },
]

export const monthlyNOI = [
  { month: 'Apr', noi: 218000 },
  { month: 'May', noi: 235000 },
  { month: 'Jun', noi: 242000 },
  { month: 'Jul', noi: 228000 },
  { month: 'Aug', noi: 251000 },
  { month: 'Sep', noi: 247000 },
  { month: 'Oct', noi: 256000 },
  { month: 'Nov', noi: 261000 },
  { month: 'Dec', noi: 248000 },
  { month: 'Jan', noi: 268000 },
  { month: 'Feb', noi: 272000 },
  { month: 'Mar', noi: 284000 },
]
