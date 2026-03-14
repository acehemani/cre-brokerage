import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useDealContext } from '../context/DealContext'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatCurrency, monthlyNOI, profitAndLoss } from '../data/mockData'
import { agentMap } from '../data/agents'
import Breadcrumbs from '../components/Breadcrumbs'
import {
  ArrowLeft, Building2, MapPin, FileText, Upload,
  Bot, Send, DollarSign, BarChart3, Clock, Activity,
} from 'lucide-react'

type Tab = 'overview' | 'documents' | 'financials' | 'activity'

const COLORS = {
  accent: '#2dd4bf',
  border: '#2a2b36',
  muted: '#5a5c6a',
}

const chartAxisProps = {
  tick: { fill: '#5a5c6a', fontSize: 12 },
  axisLine: { stroke: '#2a2b36' },
  tickLine: false,
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#181920',
    border: '1px solid #2a2b36',
    borderRadius: '8px',
    color: '#f1f2f6',
  },
}

export default function DealDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deals, dispatch } = useDealContext()
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [noteText, setNoteText] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const deal = deals.find((d) => d.id === id)
  usePageTitle(deal?.name ?? 'Deal')

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-text-secondary">
        <p className="text-lg">Deal not found</p>
        <button onClick={() => navigate('/pipeline')} className="mt-4 text-accent hover:underline">
          Back to Pipeline
        </button>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; icon: typeof Building2 }[] = [
    { key: 'overview', label: 'Overview', icon: Building2 },
    { key: 'documents', label: 'Documents', icon: FileText },
    { key: 'financials', label: 'Financials', icon: DollarSign },
    { key: 'activity', label: 'Activity', icon: Activity },
  ]

  function handleAddNote() {
    if (!noteText.trim()) return
    dispatch({
      type: 'ADD_NOTE',
      dealId: deal!.id,
      note: {
        date: 'Just now',
        action: noteText.trim(),
        agent: false,
      },
    })
    addToast('Note added to timeline', 'success')
    setNoteText('')
  }

  const metrics = [
    { label: 'Asking Price', value: formatCurrency(deal.askingPrice) },
    { label: 'NOI', value: formatCurrency(deal.noi) },
    { label: 'Cap Rate', value: `${deal.capRate}%` },
    { label: 'Square Feet', value: `${deal.sf.toLocaleString()} SF` },
    { label: 'Occupancy', value: `${deal.occupancy}%` },
    { label: 'Year Built', value: String(deal.yearBuilt) },
  ]

  return (
    <div className="min-h-screen">
      <Breadcrumbs dealName={deal.name} />

      {/* Back button */}
      <button
        onClick={() => navigate('/pipeline')}
        className="mb-4 flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Pipeline
      </button>

      {/* Hero Section */}
      <div className="relative rounded-xl border border-border bg-gradient-to-br from-bg-card to-bg-secondary p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{deal.name}</h1>
              <span className="rounded-full bg-accent-bg px-3 py-1 text-xs font-medium text-accent">
                {deal.type}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-text-muted" />
              <p className="text-sm text-text-secondary">{deal.address}</p>
            </div>
            <p className="mt-1 text-xs text-text-muted">
              Stage: <span className="text-accent">{deal.stage}</span> &middot; {deal.daysInStage} days &middot; Broker: {deal.broker}
            </p>
          </div>
        </div>

        {/* Metric Row */}
        <div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-bg-card/50 p-3">
              <p className="text-[11px] text-text-muted">{m.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-text-primary">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="mb-6 flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Summary */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Deal Summary</h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{deal.type} property located at {deal.address}.</p>
              <p>Listed at {formatCurrency(deal.askingPrice)} ({`$${deal.pricePerSF}/SF`}), generating {formatCurrency(deal.noi)} NOI at a {deal.capRate}% cap rate.</p>
              {deal.units && <p>{deal.units} units, {deal.occupancy}% occupied.</p>}
              <p>Currently in <span className="text-accent">{deal.stage}</span> for {deal.daysInStage} days.</p>
            </div>
          </div>

          {/* Key Dates */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Key Dates</h3>
            <div className="space-y-3">
              {deal.timeline.slice(0, 4).map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Clock className="h-3.5 w-3.5 mt-0.5 text-text-muted shrink-0" />
                  <div>
                    <p className="text-xs text-text-muted">{event.date}</p>
                    <p className="text-sm text-text-secondary">{event.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-xl border border-border bg-bg-card p-5 lg:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Location</h3>
            <div className="flex h-48 items-center justify-center rounded-lg bg-bg-secondary text-text-muted">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">{deal.address}</p>
                <p className="text-xs mt-1">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-4">
          {/* Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={(e) => { e.preventDefault(); setDragOver(false) }}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              addToast('Document uploaded to ' + deal.name, 'success')
            }}
            className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
              dragOver ? 'border-accent bg-accent-bg' : 'border-border bg-bg-card'
            }`}
          >
            <Upload className="mx-auto h-6 w-6 text-text-muted" />
            <p className="mt-2 text-sm text-text-secondary">Drop documents here to upload to this deal</p>
          </div>

          {/* Document List */}
          <div className="rounded-xl border border-border bg-bg-card">
            {deal.documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-border last:border-0 px-4 py-3"
              >
                <FileText className="h-4 w-4 text-text-muted shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-primary truncate">{doc.name}</p>
                  <p className="text-xs text-text-muted">{doc.type} &middot; {doc.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'financials' && (
        <div className="space-y-6">
          {/* P&L Table */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Profit & Loss Summary</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 text-text-muted font-medium">Category</th>
                  <th className="pb-2 text-right text-text-muted font-medium">YTD Actual</th>
                  <th className="pb-2 text-right text-text-muted font-medium">Budget</th>
                  <th className="pb-2 text-right text-text-muted font-medium">Variance</th>
                </tr>
              </thead>
              <tbody>
                {profitAndLoss.map((row) => {
                  const variance = row.ytd - row.budget
                  const isPositive = row.category.includes('Expense') || row.category.includes('Vacancy') || row.category.includes('Debt')
                    ? variance <= 0
                    : variance >= 0
                  return (
                    <tr key={row.category} className="border-b border-border-light">
                      <td className={`py-2.5 ${row.category === 'Net Operating Income' || row.category === 'Cash Flow' ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                        {row.category}
                      </td>
                      <td className="py-2.5 text-right text-text-primary">{formatCurrency(Math.abs(row.ytd))}</td>
                      <td className="py-2.5 text-right text-text-secondary">{formatCurrency(Math.abs(row.budget))}</td>
                      <td className={`py-2.5 text-right font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                        {variance >= 0 ? '+' : '-'}{formatCurrency(Math.abs(variance))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Trailing 12-Month NOI Chart */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Trailing 12-Month NOI</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyNOI}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                <XAxis dataKey="month" {...chartAxisProps} />
                <YAxis {...chartAxisProps} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip {...tooltipStyle} formatter={(value) => [`$${(Number(value) / 1000).toFixed(0)}K`, 'NOI']} />
                <Bar dataKey="noi" name="NOI" fill={COLORS.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-4">
          {/* Add Note */}
          <div className="rounded-xl border border-border bg-bg-card p-4">
            <div className="flex gap-3">
              <input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                placeholder="Add a note to the timeline..."
                className="flex-1 rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary hover:bg-accent/90 disabled:opacity-40 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Add Note
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-text-primary flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-accent" />
              Timeline
            </h3>
            <div className="space-y-4">
              {deal.timeline.map((event, i) => {
                const agent = event.agentId ? agentMap[event.agentId] : null
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex shrink-0 pt-0.5">
                      {event.agent ? (
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: agent ? `${agent.color}20` : 'rgba(45,212,191,0.1)' }}
                        >
                          <Bot className="h-3.5 w-3.5" style={{ color: agent?.color ?? '#2dd4bf' }} />
                        </div>
                      ) : (
                        <div className="mt-1 h-5 w-5 rounded-full border-2 border-border bg-bg-card flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-text-muted" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-text-muted">{event.date}</p>
                        {agent && (
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                          >
                            {agent.name}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-text-secondary">{event.action}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
