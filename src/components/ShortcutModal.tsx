import Modal from './Modal'

const shortcuts = [
  { key: '1', action: 'Command Center' },
  { key: '2', action: 'Deal Pipeline' },
  { key: '3', action: 'Documents' },
  { key: '4', action: 'Morning Briefing' },
  { key: '5', action: 'Analytics' },
  { key: '/', action: 'Focus search' },
  { key: '?', action: 'Show this help' },
]

interface ShortcutModalProps {
  open: boolean
  onClose: () => void
}

export default function ShortcutModal({ open, onClose }: ShortcutModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Keyboard Shortcuts">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
        {shortcuts.map((s) => (
          <div key={s.key} className="contents">
            <kbd className="bg-bg-secondary border border-border rounded px-2 py-1 font-mono text-sm text-text-primary text-center">
              {s.key}
            </kbd>
            <span className="text-text-muted text-sm leading-7">{s.action}</span>
          </div>
        ))}
      </div>
    </Modal>
  )
}
