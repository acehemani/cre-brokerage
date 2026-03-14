export interface Agent {
  id: string
  name: string
  role: string
  description: string
  color: string
  icon: string
  status: 'active' | 'idle' | 'learning'
  tasksCompleted: number
}

export const agents: Agent[] = [
  {
    id: 'scout',
    name: 'Scout',
    role: 'Deal Sourcing',
    description: 'Scans broker listings, off-market networks, and auction platforms to surface acquisition opportunities matching your buy-box criteria.',
    color: '#2dd4bf',
    icon: 'Search',
    status: 'active',
    tasksCompleted: 47,
  },
  {
    id: 'iris',
    name: 'Iris',
    role: 'Document Intelligence',
    description: 'Extracts key terms from OMs, P&Ls, STR reports, and franchise agreements — flags discrepancies and missing data automatically.',
    color: '#3b82f6',
    icon: 'Eye',
    status: 'active',
    tasksCompleted: 132,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Market Analysis',
    description: 'Pulls comp sets, submarket trends, supply pipeline data, and demand drivers to score every market opportunity.',
    color: '#f59e0b',
    icon: 'Globe',
    status: 'idle',
    tasksCompleted: 28,
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Risk Assessment',
    description: 'Evaluates deal risk across brand, market, physical, and financial dimensions — produces a weighted risk score with mitigations.',
    color: '#22c55e',
    icon: 'Shield',
    status: 'active',
    tasksCompleted: 35,
  },
  {
    id: 'ledger',
    name: 'Ledger',
    role: 'Financial Modeling',
    description: 'Builds pro-forma models, calculates IRR/cash-on-cash/DSCR, and runs sensitivity analysis on rate, occupancy, and expense assumptions.',
    color: '#6366f1',
    icon: 'Calculator',
    status: 'learning',
    tasksCompleted: 19,
  },
  {
    id: 'maven',
    name: 'Maven',
    role: 'Strategy & Insights',
    description: 'Synthesizes outputs from all agents into executive briefings, investment memos, and actionable recommendations for your IC.',
    color: '#ef4444',
    icon: 'Lightbulb',
    status: 'idle',
    tasksCompleted: 12,
  },
]

export const agentMap = Object.fromEntries(agents.map((a) => [a.id, a])) as Record<string, Agent>
