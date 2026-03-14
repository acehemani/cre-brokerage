import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { posthog } from './lib/analytics'
import PasswordGate from './components/PasswordGate'
import ErrorBoundary from './components/ErrorBoundary'
import Sidebar from './components/Sidebar'
import Breadcrumbs from './components/Breadcrumbs'
import ToastPortal from './components/Toast'
import ShortcutModal from './components/ShortcutModal'
import LoadingSkeleton from './components/LoadingSkeleton'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

const CommandCenter = lazy(() => import('./pages/CommandCenter'))
const DealPipeline = lazy(() => import('./pages/DealPipeline'))
const DealDetail = lazy(() => import('./pages/DealDetail'))
const DocumentIntelligence = lazy(() => import('./pages/DocumentIntelligence'))
const MorningBriefing = lazy(() => import('./pages/MorningBriefing'))
const Analytics = lazy(() => import('./pages/Analytics'))

function AppContent() {
  const location = useLocation()
  const [shortcutModalOpen, setShortcutModalOpen] = useState(false)
  const toggleHelp = useCallback(() => setShortcutModalOpen((v) => !v), [])
  useKeyboardShortcuts(toggleHelp)

  useEffect(() => {
    posthog.capture('$pageview')
  }, [location.pathname])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Breadcrumbs />
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<ErrorBoundary><CommandCenter /></ErrorBoundary>} />
            <Route path="/pipeline" element={<ErrorBoundary><DealPipeline /></ErrorBoundary>} />
            <Route path="/deals/:id" element={<ErrorBoundary><DealDetail /></ErrorBoundary>} />
            <Route path="/documents" element={<ErrorBoundary><DocumentIntelligence /></ErrorBoundary>} />
            <Route path="/briefing" element={<ErrorBoundary><MorningBriefing /></ErrorBoundary>} />
            <Route path="/analytics" element={<ErrorBoundary><Analytics /></ErrorBoundary>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <ToastPortal />
      <ShortcutModal open={shortcutModalOpen} onClose={() => setShortcutModalOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <PasswordGate>
      <AppContent />
    </PasswordGate>
  )
}
