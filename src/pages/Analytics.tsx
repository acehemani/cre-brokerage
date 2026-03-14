import { useState, useEffect, useRef, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts'
import {
  dealFlowByMonth, pipelineValueByStage, avgDaysInStage,
  docProcessingVolume, brokerLeaderboard, dealTypeDistribution, formatCurrency,
} from '../data/mockData'
import { usePageTitle } from '../hooks/usePageTitle'
import { useChartColors } from '../hooks/useChartColors'
import { Zap } from 'lucide-react'

const STAGE_COLORS = [
  '#2dd4bf', '#0d9488', '#3b82f6', '#6366f1',
  '#f59e0b', '#22c55e', '#ef4444', '#a855f7',
]

const PIE_COLORS = ['#3b82f6', '#2dd4bf', '#f59e0b', '#6366f1', '#ef4444']

function PipelineTooltip({ active, payload, label, colors }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: '8px',
        color: colors.textPrimary,
      }}
      className="px-3 py-2 shadow-lg"
    >
      <p className="text-text-primary text-sm font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color || colors.accent }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-card rounded-xl border border-border p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick)
      }
    }
    ref.current = requestAnimationFrame(tick)
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [target, duration])

  return value
}

type DateRange = '30d' | '90d' | '6mo' | '1yr'

export default function Analytics() {
  usePageTitle('Analytics')
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const hoursSaved = useCountUp(47)
  const dollarsSaved = useCountUp(4700)
  const colors = useChartColors()

  const chartAxisProps = useMemo(() => ({
    tick: { fill: colors.muted, fontSize: 12 },
    axisLine: { stroke: colors.border },
    tickLine: false as const,
  }), [colors.muted, colors.border])

  const tooltipStyle = useMemo(() => ({
    contentStyle: {
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      color: colors.textPrimary,
    },
  }), [colors.card, colors.border, colors.textPrimary])

  const ranges: { key: DateRange; label: string }[] = [
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: '6mo', label: '6 Months' },
    { key: '1yr', label: '1 Year' },
  ]

  const maxVolume = Math.max(...brokerLeaderboard.map((b) => b.volume))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Analytics</h1>
          <p className="text-text-secondary mt-1">Performance metrics and deal insights</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-1 rounded-lg border border-border bg-bg-card p-1">
          {ranges.map((r) => (
            <button
              key={r.key}
              onClick={() => setDateRange(r.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                dateRange === r.key
                  ? 'bg-accent text-bg-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agent ROI Callout with Animated Counter */}
      <div className="bg-gradient-to-r from-accent/10 to-info/10 border border-accent/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-accent/10 rounded-lg shrink-0">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-text-primary text-base">
              Your AI agents saved an estimated{' '}
              <span className="text-accent font-bold animate-count-up">{hoursSaved} hours</span> this month
            </p>
            <p className="text-text-secondary text-sm mt-1">
              Equivalent to{' '}
              <span className="text-accent font-bold">${dollarsSaved.toLocaleString()}</span> in staff time based on average broker hourly rate
            </p>
          </div>
        </div>
      </div>

      {/* Charts -- 3-column top row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart 1: Deal Flow by Month */}
        <ChartCard title="Deal Flow" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dealFlowByMonth} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="month" {...chartAxisProps} />
              <YAxis {...chartAxisProps} />
              <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="newDeals" name="New Deals" fill={colors.accent} radius={[4, 4, 0, 0]} />
              <Bar dataKey="closed" name="Closed" fill={colors.info} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.accent }} />
              <span className="text-xs text-text-muted">New Deals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.info }} />
              <span className="text-xs text-text-muted">Closed</span>
            </div>
          </div>
        </ChartCard>

        {/* Chart 2: Pipeline Value by Stage */}
        <ChartCard title="Pipeline Value by Stage" subtitle="Current portfolio">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pipelineValueByStage} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} />
              <XAxis type="number" {...chartAxisProps} tickFormatter={(v: number) => formatCurrency(v)} />
              <YAxis
                type="category"
                dataKey="stage"
                {...chartAxisProps}
                width={100}
                tick={{ fill: colors.textSecondary, fontSize: 10 }}
              />
              <Tooltip content={<PipelineTooltip colors={colors} />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" name="Value" radius={[0, 4, 4, 0]}>
                {pipelineValueByStage.map((_, i) => (
                  <Cell key={i} fill={STAGE_COLORS[i % STAGE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Deal Type Distribution (Donut) */}
        <ChartCard title="Deal Type Distribution" subtitle="By count">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={dealTypeDistribution}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                strokeWidth={0}
              >
                {dealTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-1 px-2 justify-center">
            {dealTypeDistribution.map((d, i) => (
              <div key={d.type} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                <span className="text-xs text-text-muted">{d.type} ({d.count})</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom row -- 3 columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart 4: Average Days in Stage */}
        <ChartCard title="Average Days in Stage" subtitle="Current cycle times">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={avgDaysInStage}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="stage" {...chartAxisProps} tick={{ fill: colors.muted, fontSize: 9 }} interval={0} />
              <YAxis {...chartAxisProps} />
              <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="days" name="Days" fill={colors.info} radius={[4, 4, 0, 0]} label={<DaysLabel colors={colors} />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 5: Broker Leaderboard */}
        <ChartCard title="Broker Leaderboard" subtitle="By deal volume">
          <div className="space-y-4 mt-2">
            {brokerLeaderboard.map((b, i) => (
              <div key={b.broker}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text-primary font-medium">{b.broker}</span>
                  <span className="text-xs text-text-secondary">{b.deals} deals &middot; {formatCurrency(b.volume)}</span>
                </div>
                <div className="h-5 rounded-full bg-bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(b.volume / maxVolume) * 100}%`,
                      backgroundColor: STAGE_COLORS[i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Chart 6: Document Processing Volume */}
        <ChartCard title="Document Processing" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={docProcessingVolume}>
              <defs>
                <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.accent} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="day" {...chartAxisProps} interval={4} />
              <YAxis {...chartAxisProps} />
              <Tooltip {...tooltipStyle} cursor={{ stroke: colors.accent, strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="count"
                name="Documents"
                stroke={colors.accent}
                strokeWidth={2}
                fill="url(#accentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function DaysLabel({ x, y, width, value, colors }: any) {
  return (
    <text x={x + width / 2} y={y - 6} fill={colors?.textPrimary ?? '#f1f2f6'} fontSize={11} textAnchor="middle">
      {value}d
    </text>
  )
}
