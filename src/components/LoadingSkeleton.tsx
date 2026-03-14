import { useState, useEffect } from 'react'

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-bg-card-hover animate-skeleton-pulse ${className}`} />
}

function SkeletonPlaceholder() {
  return (
    <div className="space-y-4 p-6">
      <SkeletonBlock className="h-8 w-64" />
      <SkeletonBlock className="h-4 w-48" />
      <div className="grid grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-24" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <SkeletonBlock className="h-64" />
        <SkeletonBlock className="h-64" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton({ children, delay = 200 }: { children?: React.ReactNode; delay?: number }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  // No children: render skeleton permanently (used as Suspense fallback)
  if (!children) {
    return <SkeletonPlaceholder />
  }

  if (!ready) {
    return <SkeletonPlaceholder />
  }

  return <>{children}</>
}
