import { useState } from 'react'
import { briefing, alternateBriefing, todayFormatted } from '../data/mockData'
import { agentMap } from '../data/agents'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'
import { Mail, Sun, CheckSquare, TrendingUp, Calendar, Send, Check, RefreshCw, FileDown, Loader2 } from 'lucide-react'

export default function MorningBriefing() {
  usePageTitle('Morning Briefing')
  const { addToast } = useToast()
  const [sent, setSent] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [useAlternate, setUseAlternate] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const currentBriefing = useAlternate ? alternateBriefing : briefing

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  function handleRegenerate() {
    setRegenerating(true)
    setCheckedItems(new Set())
    setTimeout(() => {
      setUseAlternate((prev) => !prev)
      setRegenerating(false)
    }, 1500)
  }

  function handleSharePDF() {
    addToast('PDF export started — will download shortly', 'info')
  }

  function toggleItem(index: number) {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary flex items-center gap-3">
            <Mail className="h-6 w-6 text-accent" />
            Morning Briefing
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{todayFormatted}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors disabled:opacity-50"
          >
            {regenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Regenerate
          </button>
          <button
            onClick={handleSharePDF}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
          >
            <FileDown className="h-4 w-4" />
            Share as PDF
          </button>
          <button
            onClick={handleSend}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              sent
                ? 'bg-success text-bg-primary'
                : 'bg-accent text-bg-primary hover:bg-accent/90'
            }`}
          >
            {sent ? (
              <>
                <Check className="h-4 w-4" />
                Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send to Email
              </>
            )}
          </button>
        </div>
      </div>

      {/* Briefing Card */}
      <div className="max-w-4xl rounded-xl border border-border bg-bg-card p-8">
        {/* Overnight Summary */}
        <section className="border-b border-border py-6 first:pt-0">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-medium text-text-primary">
            <Sun className="h-5 w-5 text-accent" />
            What Happened Overnight
          </h2>
          <ul className="space-y-3">
            {currentBriefing.overnightSummary.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Action Items — Checkable */}
        <section className="border-b border-border py-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-medium text-text-primary">
            <CheckSquare className="h-5 w-5 text-accent" />
            Action Items
          </h2>
          <ul className="space-y-3">
            {currentBriefing.actionItems.map((item, i) => {
              const checked = checkedItems.has(i)
              const agent = item.agentId ? agentMap[item.agentId] : null
              return (
                <li
                  key={i}
                  onClick={() => toggleItem(i)}
                  className="flex items-start gap-3 text-sm cursor-pointer group"
                >
                  <span
                    className={`mt-0.5 inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.priority === 'high'
                        ? 'bg-danger/10 text-danger'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {item.priority === 'high' ? 'High' : 'Medium'}
                  </span>
                  <span
                    className={`text-text-primary transition-all ${
                      checked ? 'animate-line-through opacity-50' : 'group-hover:text-accent'
                    }`}
                  >
                    {item.text}
                  </span>
                  {agent && (
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                    >
                      {agent.name}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        {/* Market Pulse */}
        <section className="border-b border-border py-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-medium text-text-primary">
            <TrendingUp className="h-5 w-5 text-accent" />
            Market Pulse
          </h2>
          <div className="rounded-lg bg-bg-secondary p-4">
            <ul className="space-y-3">
              {currentBriefing.marketPulse.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* This Week's Pipeline */}
        <section className="py-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-medium text-text-primary">
            <Calendar className="h-5 w-5 text-accent" />
            This Week's Pipeline
          </h2>
          <div className="space-y-3">
            {currentBriefing.weekPipeline.map((item, i) => (
              <div key={i} className="border-l-2 border-accent/40 py-2 pl-4">
                <p className="text-sm font-medium text-text-primary">{item.deal}</p>
                <p className="mt-0.5 text-sm text-text-secondary">{item.expected}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <p className="max-w-4xl text-center text-xs text-text-muted">
        Generated by BrokerPower AI at 7:30 AM
      </p>
    </div>
  )
}
