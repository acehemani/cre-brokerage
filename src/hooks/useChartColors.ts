import { useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function useChartColors() {
  const { theme } = useTheme()

  return useMemo(() => {
    const accent = getCssVar('--color-accent') || '#2dd4bf'
    const accentDim = getCssVar('--color-accent-dim') || '#0d9488'
    const info = getCssVar('--color-info') || '#3b82f6'
    const success = getCssVar('--color-success') || '#22c55e'
    const warning = getCssVar('--color-warning') || '#f59e0b'
    const danger = getCssVar('--color-danger') || '#ef4444'
    const border = getCssVar('--color-border') || '#2a2b36'
    const muted = getCssVar('--color-text-muted') || '#5a5c6a'
    const card = getCssVar('--color-bg-card') || '#181920'
    const textPrimary = getCssVar('--color-text-primary') || '#f1f2f6'
    const textSecondary = getCssVar('--color-text-secondary') || '#8b8d9a'

    return {
      accent,
      accentDim,
      info,
      success,
      warning,
      danger,
      border,
      muted,
      card,
      textPrimary,
      textSecondary,
    }
  }, [theme])
}
