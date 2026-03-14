// ─── Types ──────────────────────────────────────────────────────────────────

export type DealStage =
  | 'Prospecting'
  | 'BOV / Pitch'
  | 'Listing Won'
  | 'Marketing / OM Live'
  | 'Tours / Offers'
  | 'Under Contract (DD)'
  | 'Contingencies Cleared'
  | 'Closed'

export type PropertyType = 'Office' | 'Retail' | 'Industrial' | 'Multifamily' | 'Mixed-Use'

export interface Deal {
  id: string
  name: string
  address: string
  type: PropertyType
  askingPrice: number
  sf: number
  pricePerSF: number
  capRate: number
  noi: number
  yearBuilt: number
  occupancy: number
  units?: number
  stage: DealStage
  daysInStage: number
  broker: string
  badge?: string
  documents: DealDocument[]
  timeline: TimelineEvent[]
}

export interface DealDocument {
  name: string
  type: string
  date: string
}

export interface TimelineEvent {
  date: string
  action: string
  agent: boolean
  agentId?: string
}

export interface ProcessedDocument {
  id: string
  filename: string
  type: 'OM' | 'Rent Roll' | 'Financial' | 'Inspection' | 'Survey' | 'LOI'
  dealName: string
  uploadDate: string
  status: 'Processed' | 'Pending' | 'Failed'
  extractedData?: Record<string, string | number>
}

export interface ActivityItem {
  id: string
  time: string
  message: string
  type: 'document' | 'pipeline' | 'analysis' | 'alert'
  agentId?: string
  dealId?: string
}

export interface AttentionItem {
  id: string
  title: string
  description: string
  urgency: 'high' | 'medium'
  action: string
  dealId?: string
}
