import { useState } from 'react'
import Modal from './Modal'
import { useToast } from '../hooks/useToast'

// ─── Add Deal Modal ────────────────────────────────────────────────────────

export function AddDealModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addToast } = useToast()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addToast(`Deal "${name || 'New Deal'}" added to pipeline`, 'success')
    setName('')
    setAddress('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Add New Deal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Property Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Westheimer Office Tower"
            className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 1234 Main St, Houston, TX"
            className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary hover:bg-accent/90 transition-colors">
            Add Deal
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ─── Upload Doc Modal ──────────────────────────────────────────────────────

export function UploadDocModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addToast('Document uploaded and queued for processing', 'success')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border-2 border-dashed border-border bg-bg-secondary p-8 text-center">
          <p className="text-sm text-text-secondary">Drop files here or click to browse</p>
          <p className="mt-1 text-xs text-text-muted">PDF, XLSX, DOC up to 50MB</p>
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Assign to Deal</label>
          <select className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
            <option value="">Select a deal...</option>
            <option>Westheimer Office Tower</option>
            <option>Galleria Retail Center</option>
            <option>Energy Corridor Industrial Park</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary hover:bg-accent/90 transition-colors">
            Upload
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ─── Generate Report Modal ─────────────────────────────────────────────────

export function GenerateReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addToast('Report generation started — will be ready in ~2 min', 'info')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Generate Report">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Report Type</label>
          <select className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
            <option>Pipeline Summary</option>
            <option>Deal Comparison</option>
            <option>Market Analysis</option>
            <option>Portfolio Performance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-text-secondary mb-1">Time Range</label>
          <select className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Year to date</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg-primary hover:bg-accent/90 transition-colors">
            Generate
          </button>
        </div>
      </form>
    </Modal>
  )
}
