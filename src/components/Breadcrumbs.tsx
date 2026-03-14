import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeNames: Record<string, string> = {
  '/': 'Command Center',
  '/pipeline': 'Deal Pipeline',
  '/documents': 'Documents',
  '/briefing': 'Briefing',
  '/analytics': 'Analytics',
}

interface BreadcrumbsProps {
  dealName?: string
}

export default function Breadcrumbs({ dealName }: BreadcrumbsProps) {
  const location = useLocation()
  const path = location.pathname

  // Don't show on home page
  if (path === '/') return null

  const crumbs: { label: string; to?: string }[] = [{ label: 'Home', to: '/' }]

  // Deal detail page
  if (path.startsWith('/deals/')) {
    crumbs.push({ label: 'Deal Pipeline', to: '/pipeline' })
    if (dealName) {
      crumbs.push({ label: dealName })
    }
  } else {
    const name = routeNames[path]
    if (name) {
      crumbs.push({ label: name })
    }
  }

  return (
    <nav className="mb-6 flex items-center gap-1.5 text-sm text-text-muted">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {crumb.to ? (
            <Link to={crumb.to} className="flex items-center gap-1 hover:text-text-primary transition-colors">
              {i === 0 && <Home className="h-3.5 w-3.5" />}
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
