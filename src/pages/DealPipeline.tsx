import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { useDealContext } from '../context/DealContext'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'
import { stageOrder, formatCurrency, type DealStage, type PropertyType } from '../data/mockData'
import { MapPin, Clock, User, Search, X, Filter } from 'lucide-react'
import confetti from 'canvas-confetti'

const SCROLL_KEY = 'pipeline-scroll'

export default function DealPipeline() {
  usePageTitle('Deal Pipeline')
  const { deals, dispatch } = useDealContext()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [typeFilter, setTypeFilter] = useState<PropertyType | ''>('')
  const [brokerFilter, setBrokerFilter] = useState('')
  const [search, setSearch] = useState('')

  // Restore scroll position
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      const main = document.querySelector('main')
      if (main) main.scrollTop = parseInt(saved, 10)
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }, [])

  const brokers = useMemo(() => [...new Set(deals.map((d) => d.broker))], [deals])
  const types = useMemo(() => [...new Set(deals.map((d) => d.type))], [deals])

  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      if (typeFilter && d.type !== typeFilter) return false
      if (brokerFilter && d.broker !== brokerFilter) return false
      if (search) {
        const s = search.toLowerCase()
        if (!d.name.toLowerCase().includes(s) && !d.address.toLowerCase().includes(s)) return false
      }
      return true
    })
  }, [deals, typeFilter, brokerFilter, search])

  const dealsByStage = useMemo(() => {
    return stageOrder.reduce<Record<DealStage, typeof filteredDeals>>(
      (acc, stage) => {
        acc[stage] = filteredDeals.filter((d) => d.stage === stage)
        return acc
      },
      {} as Record<DealStage, typeof filteredDeals>
    )
  }, [filteredDeals])

  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'Closed')
    .reduce((sum, d) => sum + d.askingPrice, 0)

  const activeFilters = [
    typeFilter && { label: `Type: ${typeFilter}`, clear: () => setTypeFilter('') },
    brokerFilter && { label: `Broker: ${brokerFilter}`, clear: () => setBrokerFilter('') },
    search && { label: `Search: "${search}"`, clear: () => setSearch('') },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    const toStage = destination.droppableId as DealStage
    const dealId = result.draggableId
    const deal = deals.find((d) => d.id === dealId)
    if (!deal) return

    dispatch({ type: 'MOVE_DEAL', dealId, toStage })

    if (toStage === 'Closed') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      addToast('Deal closed! 🎉', 'success')
    } else {
      addToast(`${deal.name} moved to ${toStage}`, 'success')
    }
  }

  function handleCardClick(dealId: string) {
    const main = document.querySelector('main')
    if (main) sessionStorage.setItem(SCROLL_KEY, String(main.scrollTop))
    navigate(`/deals/${dealId}`)
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Deal Pipeline</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Total pipeline value:{' '}
            <span className="font-semibold text-accent">{formatCurrency(totalPipelineValue)}</span>
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-text-muted" />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as PropertyType | '')}
          className="rounded-lg border border-border bg-bg-card px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={brokerFilter}
          onChange={(e) => setBrokerFilter(e.target.value)}
          className="rounded-lg border border-border bg-bg-card px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none"
        >
          <option value="">All Brokers</option>
          {brokers.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            data-pipeline-search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals..."
            className="rounded-lg border border-border bg-bg-card pl-8 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none w-52"
          />
        </div>
      </div>

      {/* Active Filter Pills */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-3 py-1 text-xs text-accent"
            >
              {f.label}
              <button onClick={f.clear} className="hover:text-text-primary transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => { setTypeFilter(''); setBrokerFilter(''); setSearch('') }}
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {stageOrder.map((stage) => {
            const stagDeals = dealsByStage[stage]
            const stageValue = stagDeals.reduce((s, d) => s + d.askingPrice, 0)
            return (
              <Droppable key={stage} droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-w-[260px] flex-shrink-0 rounded-xl p-3 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-accent/5 ring-1 ring-accent/20' : 'bg-bg-secondary'
                    }`}
                  >
                    {/* Column Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-xs font-semibold text-text-primary truncate">{stage}</h2>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="rounded-full bg-bg-card px-2 py-0.5 text-xs font-medium text-text-secondary">
                          {stagDeals.length}
                        </span>
                        {stageValue > 0 && (
                          <span className="text-xs text-text-muted">{formatCurrency(stageValue)}</span>
                        )}
                      </div>
                    </div>

                    {/* Deal Cards */}
                    <div className="flex flex-col gap-2 min-h-[60px]">
                      {stagDeals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              onClick={() => handleCardClick(deal.id)}
                              className={`relative cursor-pointer rounded-lg border border-border bg-bg-card p-3 transition ${
                                dragSnapshot.isDragging
                                  ? 'shadow-lg shadow-accent/10 ring-1 ring-accent/30'
                                  : 'hover:bg-bg-card-hover'
                              }`}
                            >
                              {deal.badge && (
                                <span className="absolute right-2.5 top-2.5 rounded-full bg-accent-bg px-2 py-0.5 text-[10px] text-accent">
                                  {deal.badge}
                                </span>
                              )}
                              <p className="pr-16 text-sm font-medium text-text-primary leading-tight">{deal.name}</p>
                              <div className="mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-text-muted" />
                                <p className="text-[11px] text-text-muted truncate">{deal.address}</p>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-text-secondary">{formatCurrency(deal.askingPrice)}</span>
                                <span className="text-xs text-text-secondary">{deal.sf.toLocaleString()} SF</span>
                              </div>
                              <div className="mt-1 flex items-center justify-between">
                                <span className="text-[11px] text-text-muted">${deal.pricePerSF}/SF</span>
                                <span className="text-[11px] text-text-muted">{deal.capRate}% cap</span>
                              </div>
                              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-text-muted" />
                                  <span className="text-[11px] text-text-muted">{deal.daysInStage}d</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3 text-text-muted" />
                                  <span className="text-[11px] text-text-muted">{deal.broker}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}
