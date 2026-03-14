import { createContext, useReducer, useContext, type ReactNode } from 'react'
import { deals as initialDeals, type Deal, type DealStage } from '../data/mockData'

type DealAction =
  | { type: 'MOVE_DEAL'; dealId: string; toStage: DealStage }
  | { type: 'ADD_NOTE'; dealId: string; note: { date: string; action: string; agent: boolean; agentId?: string } }
  | { type: 'ADD_DEAL'; deal: Deal }

interface DealState {
  deals: Deal[]
}

function dealReducer(state: DealState, action: DealAction): DealState {
  switch (action.type) {
    case 'MOVE_DEAL':
      return {
        deals: state.deals.map((d) =>
          d.id === action.dealId ? { ...d, stage: action.toStage, daysInStage: 0 } : d
        ),
      }
    case 'ADD_NOTE':
      return {
        deals: state.deals.map((d) =>
          d.id === action.dealId
            ? { ...d, timeline: [action.note, ...d.timeline] }
            : d
        ),
      }
    case 'ADD_DEAL':
      return { deals: [...state.deals, action.deal] }
    default:
      return state
  }
}

interface DealContextValue {
  deals: Deal[]
  dispatch: React.Dispatch<DealAction>
}

const DealContext = createContext<DealContextValue | null>(null)

export function DealProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dealReducer, { deals: initialDeals })
  return (
    <DealContext.Provider value={{ deals: state.deals, dispatch }}>
      {children}
    </DealContext.Provider>
  )
}

export function useDealContext() {
  const ctx = useContext(DealContext)
  if (!ctx) throw new Error('useDealContext must be used within DealProvider')
  return ctx
}
