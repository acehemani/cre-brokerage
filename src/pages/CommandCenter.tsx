import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  activityFeed,
  attentionItems,
  quickStats,
  todayFormatted,
  type ActivityItem,
  type AttentionItem,
} from '../data/mockData'
import { agentMap } from '../data/agents'
import { usePageTitle } from '../hooks/usePageTitle'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { AddDealModal, UploadDocModal, GenerateReportModal } from '../components/QuickActionModals'
import { Activity, FileText, AlertTriangle, TrendingUp, Clock, ChevronRight, Plus, Upload, BarChart3 } from 'lucide-react'

const statCards = [
  { label: 'Active Deals', value: quickStats.activeDeals, icon: TrendingUp },
  { label: 'Docs Processed Today', value: quickStats.docsProcessedToday, icon: FileText },
  { label: 'Pending Actions', value: quickStats.pendingActions, icon: Clock },
  { label: 'Closing This Month', value: quickStats.closingThisMonth, icon: TrendingUp },
]

const activityBorderColor: Record<ActivityItem['type'], string> = {
  document: 'border-l-info',
  pipeline: 'border-l-accent',
  analysis: 'border-l-accent-dim',
  alert: 'border-l-warning',
}

const activityDotColor: Record<ActivityItem['type'], string> = {
  document: 'bg-info',
  pipeline: 'bg-accent',
  analysis: 'bg-accent-dim',
  alert: 'bg-warning',
}

function urgencyBadge(urgency: AttentionItem['urgency']) {
  if (urgency === 'high') {
    return (
      <span className="inline-flex items-center rounded-full bg-danger/15 px-2.5 py-0.5 text-xs font-medium text-danger">
        High
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-medium text-warning">
      Medium
    </span>
  )
}

export default function CommandCenter() {
  usePageTitle('Command Center')
  const navigate = useNavigate()
  const [addDealOpen, setAddDealOpen] = useState(false)
  const [uploadDocOpen, setUploadDocOpen] = useState(false)
  const [genReportOpen, setGenReportOpen] = useState(false)

  return (
    <LoadingSkeleton>
      <div className="min-h-screen bg-bg-primary p-6 lg:p-8">
        {/* Greeting Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Good morning, Marcus
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{todayFormatted}</p>
        </div>

        {/* Quick Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="relative rounded-xl border border-border bg-bg-card p-5"
            >
              <card.icon className="absolute right-4 top-4 h-5 w-5 text-accent" />
              <p className="text-3xl font-semibold text-text-primary">{card.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions Row */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setAddDealOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Deal
          </button>
          <button
            onClick={() => setUploadDocOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Doc
          </button>
          <button
            onClick={() => setGenReportOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left — Agent Activity Feed */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <Activity className="h-4 w-4 text-accent" />
                <h2 className="text-sm font-medium text-text-primary">Agent Activity</h2>
              </div>
              <div className="divide-y divide-border-light">
                {activityFeed.map((item) => {
                  const agent = item.agentId ? agentMap[item.agentId] : null
                  return (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 border-l-2 px-5 py-3 ${activityBorderColor[item.type]}`}
                    >
                      {agent ? (
                        <div
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${agent.color}20` }}
                        >
                          <span className="text-[9px] font-bold" style={{ color: agent.color }}>
                            {agent.name[0]}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${activityDotColor[item.type]}`}
                        />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-text-muted">{item.time}</span>
                          {agent && (
                            <span
                              className="rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                              style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
                            >
                              {agent.name}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-text-secondary">
                          {item.dealId ? (
                            <>
                              {item.message.split('—')[0]}
                              {item.message.includes('—') && (
                                <>
                                  —{' '}
                                  <button
                                    onClick={() => navigate(`/deals/${item.dealId}`)}
                                    className="text-accent hover:underline"
                                  >
                                    View Deal
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            item.message
                          )}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — Needs Your Attention */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-bg-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <h2 className="text-sm font-medium text-text-primary">Needs Your Attention</h2>
              </div>
              <div className="divide-y divide-border-light">
                {attentionItems.map((item) => (
                  <div key={item.id} className="px-5 py-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium text-text-primary">{item.title}</span>
                      {urgencyBadge(item.urgency)}
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => item.dealId && navigate(`/deals/${item.dealId}`)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-dim"
                    >
                      {item.action}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddDealModal open={addDealOpen} onClose={() => setAddDealOpen(false)} />
        <UploadDocModal open={uploadDocOpen} onClose={() => setUploadDocOpen(false)} />
        <GenerateReportModal open={genReportOpen} onClose={() => setGenReportOpen(false)} />
      </div>
    </LoadingSkeleton>
  )
}
