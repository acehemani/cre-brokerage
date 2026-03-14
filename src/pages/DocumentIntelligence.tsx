import { useState, useCallback } from 'react'
import { processedDocuments, type ProcessedDocument } from '../data/mockData'
import { useDealContext } from '../context/DealContext'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'
import { Upload, FileText, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp, Loader2, Save } from 'lucide-react'

const typeBadgeClasses: Record<ProcessedDocument['type'], string> = {
  OM: 'bg-info/20 text-info',
  'Rent Roll': 'bg-accent/20 text-accent',
  Financial: 'bg-success/20 text-success',
  Inspection: 'bg-warning/20 text-warning',
  Survey: 'bg-text-muted/20 text-text-muted',
  LOI: 'bg-info/20 text-info',
}

const statusConfig: Record<ProcessedDocument['status'], { icon: typeof CheckCircle; color: string }> = {
  Processed: { icon: CheckCircle, color: 'text-success' },
  Pending: { icon: Clock, color: 'text-warning' },
  Failed: { icon: XCircle, color: 'text-danger' },
}

const phaseLabels = [
  'Reading document...',
  'Extracting data with AI...',
  'Verifying extracted fields...',
]

const mockExtracted: Record<string, string> = {
  'Property Name': 'Demo Property',
  Address: '1234 Example Blvd, Houston, TX',
  'Asking Price': '$9,500,000',
  NOI: '$712,000',
  'Cap Rate': '7.5%',
  SF: '65,000',
  'Year Built': '2010',
  Occupancy: '92%',
}

type DocFilter = 'All' | 'OM' | 'Rent Roll' | 'Financial' | 'Inspection'

export default function DocumentIntelligence() {
  usePageTitle('Document Intelligence')
  const { deals } = useDealContext()
  const { addToast } = useToast()

  const [dragOver, setDragOver] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [processingPhase, setProcessingPhase] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [droppedFileName, setDroppedFileName] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [saveDealId, setSaveDealId] = useState<string>('')
  const [docFilter, setDocFilter] = useState<DocFilter>('All')

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    setDroppedFileName(file.name)
    setProcessing(true)
    setShowResult(false)
    setProcessingPhase(0)

    setTimeout(() => setProcessingPhase(1), 1000)
    setTimeout(() => setProcessingPhase(2), 2000)
    setTimeout(() => {
      setProcessing(false)
      setShowResult(true)
    }, 3000)
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  function handleSaveToDeal() {
    if (!saveDealId) return
    const deal = deals.find((d) => d.id === saveDealId)
    addToast(`Document saved to ${deal?.name ?? 'deal'}`, 'success')
    setSaveDealId('')
  }

  const filteredDocs = docFilter === 'All'
    ? processedDocuments
    : processedDocuments.filter((d) => d.type === docFilter)

  const docFilters: DocFilter[] = ['All', 'OM', 'Rent Roll', 'Financial', 'Inspection']

  // Processing stats
  const processed = processedDocuments.filter((d) => d.status === 'Processed').length
  const pending = processedDocuments.filter((d) => d.status === 'Pending').length
  const failed = processedDocuments.filter((d) => d.status === 'Failed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Document Intelligence</h1>
        <p className="mt-1 text-sm text-text-secondary">
          AI-powered document processing and data extraction
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? 'border-accent bg-accent-bg'
            : 'border-border bg-bg-card'
        }`}
      >
        {processing ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="text-sm font-medium text-text-primary">{phaseLabels[processingPhase]}</p>
            <p className="text-xs text-text-muted">{droppedFileName}</p>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-8 w-8 text-text-muted" />
            <p className="mt-3 text-sm text-text-secondary">
              Drop a PDF here to see AI extraction in action
            </p>
            <p className="mt-1 text-xs text-text-muted">or click to browse</p>
          </>
        )}
      </div>

      {/* Extraction Result + Save to Deal */}
      {showResult && (
        <div className="rounded-xl border border-accent-border bg-bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-semibold text-text-primary">Extraction Complete</span>
            <span className="ml-2 text-xs text-text-muted">{droppedFileName}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
            {Object.entries(mockExtracted).map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-text-muted">{label}</p>
                <p className="text-sm font-medium text-text-primary">{value}</p>
              </div>
            ))}
          </div>

          {/* Save to Deal */}
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            <Save className="h-4 w-4 text-text-muted" />
            <select
              value={saveDealId}
              onChange={(e) => setSaveDealId(e.target.value)}
              className="rounded-lg border border-border bg-bg-secondary px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              <option value="">Save to deal...</option>
              {deals.filter((d) => d.stage !== 'Closed').map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button
              onClick={handleSaveToDeal}
              disabled={!saveDealId}
              className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-bg-primary hover:bg-accent/90 disabled:opacity-40 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Processing Stats Bar */}
      <div className="flex items-center gap-6 rounded-xl border border-border bg-bg-card px-5 py-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-success" />
          <span className="text-sm text-text-secondary"><span className="font-medium text-text-primary">{processed}</span> Processed</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-warning" />
          <span className="text-sm text-text-secondary"><span className="font-medium text-text-primary">{pending}</span> Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-danger" />
          <span className="text-sm text-text-secondary"><span className="font-medium text-text-primary">{failed}</span> Failed</span>
        </div>
      </div>

      {/* Doc Type Filter Tabs */}
      <div className="flex gap-1 border-b border-border">
        {docFilters.map((f) => (
          <button
            key={f}
            onClick={() => setDocFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              docFilter === f
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Document Table */}
      <div className="rounded-xl border border-border bg-bg-card">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_100px_1fr_120px_80px_32px] items-center gap-4 border-b border-border px-4 py-3">
          <span className="text-xs uppercase tracking-wider text-text-muted">Filename</span>
          <span className="text-xs uppercase tracking-wider text-text-muted">Type</span>
          <span className="text-xs uppercase tracking-wider text-text-muted">Deal</span>
          <span className="text-xs uppercase tracking-wider text-text-muted">Date</span>
          <span className="text-xs uppercase tracking-wider text-text-muted">Status</span>
          <span />
        </div>

        {/* Table Rows */}
        {filteredDocs.map((doc) => {
          const StatusIcon = statusConfig[doc.status].icon
          const statusColor = statusConfig[doc.status].color
          const hasData = !!doc.extractedData
          const isExpanded = expandedId === doc.id

          return (
            <div key={doc.id}>
              <div
                onClick={() => hasData && toggleExpand(doc.id)}
                className={`grid grid-cols-[1fr_100px_1fr_120px_80px_32px] items-center gap-4 border-b border-border px-4 py-3 transition-colors ${
                  hasData ? 'cursor-pointer hover:bg-bg-card-hover' : ''
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-4 w-4 shrink-0 text-text-muted" />
                  <span className="truncate text-sm text-text-primary">{doc.filename}</span>
                </div>
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeBadgeClasses[doc.type]}`}
                  >
                    {doc.type}
                  </span>
                </div>
                <span className="truncate text-sm text-text-secondary">{doc.dealName}</span>
                <span className="text-xs text-text-muted">{doc.uploadDate}</span>
                <div className="flex items-center gap-1">
                  <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                  <span className={`text-xs ${statusColor}`}>{doc.status}</span>
                </div>
                <div className="flex justify-center">
                  {hasData &&
                    (isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-text-muted" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-text-muted" />
                    ))}
                </div>
              </div>

              {/* Expanded Extracted Data */}
              {isExpanded && doc.extractedData && (
                <div className="border-b border-border bg-bg-secondary px-6 py-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                    {Object.entries(doc.extractedData).map(([key, val]) => (
                      <div key={key}>
                        <p className="text-xs text-text-muted">{key}</p>
                        <p className="text-sm font-medium text-text-primary">{String(val)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
