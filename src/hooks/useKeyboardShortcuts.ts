import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const routes = ['/', '/pipeline', '/documents', '/briefing', '/analytics']

export function useKeyboardShortcuts(onToggleHelp?: () => void) {
  const navigate = useNavigate()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) return

      // ? toggles shortcut help modal
      if (e.key === '?') {
        e.preventDefault()
        onToggleHelp?.()
        return
      }

      // 1-5 navigate pages
      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= 5) {
        e.preventDefault()
        navigate(routes[num - 1])
        return
      }

      // / focuses pipeline search
      if (e.key === '/') {
        e.preventDefault()
        const searchInput = document.querySelector('[data-pipeline-search]') as HTMLInputElement | null
        if (searchInput) {
          searchInput.focus()
        } else {
          navigate('/pipeline')
        }
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate, onToggleHelp])
}
