import type { DealStage } from './types'
import { todayDate } from './_helpers'

// ─── Formatters ─────────────────────────────────────────────────────────────

export const todayFormatted = todayDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

export function formatNumber(n: number): string {
  return n.toLocaleString()
}

export const stageOrder: DealStage[] = [
  'Prospecting',
  'BOV / Pitch',
  'Listing Won',
  'Marketing / OM Live',
  'Tours / Offers',
  'Under Contract (DD)',
  'Contingencies Cleared',
  'Closed',
]
