import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { ToastContext, type ToastVariant } from '../context/ToastContext'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const variantStyles: Record<ToastVariant, { bg: string; icon: typeof CheckCircle; iconColor: string }> = {
  success: { bg: 'bg-success/15 border-success/30', icon: CheckCircle, iconColor: 'text-success' },
  error: { bg: 'bg-danger/15 border-danger/30', icon: XCircle, iconColor: 'text-danger' },
  info: { bg: 'bg-info/15 border-info/30', icon: Info, iconColor: 'text-info' },
}

export default function ToastPortal() {
  const ctx = useContext(ToastContext)
  if (!ctx) return null
  const { toasts, removeToast } = ctx

  if (toasts.length === 0) return null

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const { bg, icon: Icon, iconColor } = variantStyles[toast.variant]
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm animate-slide-in-right ${bg}`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
            <span className="text-sm text-text-primary">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 shrink-0 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>,
    document.body
  )
}
