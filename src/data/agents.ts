export interface Agent {
  id: string
  name: string
  role: string
  color: string
  icon: string
}

export const agents: Agent[] = [
  { id: 'scout', name: 'Scout', role: 'Deal Sourcing', color: '#2dd4bf', icon: 'Search' },
  { id: 'iris', name: 'Iris', role: 'Document Intelligence', color: '#3b82f6', icon: 'Eye' },
  { id: 'atlas', name: 'Atlas', role: 'Market Analysis', color: '#f59e0b', icon: 'Globe' },
  { id: 'sage', name: 'Sage', role: 'Risk Assessment', color: '#22c55e', icon: 'Shield' },
  { id: 'ledger', name: 'Ledger', role: 'Financial Modeling', color: '#6366f1', icon: 'Calculator' },
  { id: 'maven', name: 'Maven', role: 'Strategy & Insights', color: '#ef4444', icon: 'Lightbulb' },
]

export const agentMap = Object.fromEntries(agents.map((a) => [a.id, a])) as Record<string, Agent>
