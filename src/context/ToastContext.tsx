import { createContext, useReducer, useCallback, type ReactNode } from 'react'

export type ToastVariant = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastState {
  toasts: Toast[]
}

type ToastAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string }

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':
      return { toasts: [...state.toasts, action.toast] }
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) }
    default:
      return state
  }
}

export interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, variant?: ToastVariant) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = `toast-${++toastId}`
      dispatch({ type: 'ADD', toast: { id, message, variant } })
      setTimeout(() => removeToast(id), 3000)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
