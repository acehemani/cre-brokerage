import { useState, type FormEvent, type ReactNode } from 'react'
import { Lock, ArrowRight } from 'lucide-react'
import logoFull from '../assets/brokerpower-full.png'

const PASSWORD = 'brokerpower'
const STORAGE_KEY = 'cre-demo-auth'

export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'true'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.toLowerCase().trim() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setAuthenticated(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  if (authenticated) return <>{children}</>

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={logoFull} alt="BrokerPower" className="h-20 object-contain mb-3" />
          <p className="text-text-muted text-sm">AI-Powered CRE Operations</p>
        </div>

        {/* Password form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-bg-card border border-border rounded-xl p-8 ${
            shake ? 'animate-shake' : ''
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-text-muted" />
            <span className="text-sm text-text-secondary">
              Enter the password to view this demo
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError(false)
              }}
              placeholder="Password"
              autoFocus
              className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/80 text-bg-primary p-2 rounded-md transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <p className="text-danger text-sm mt-3">
              Incorrect password. Please try again.
            </p>
          )}
        </form>

      </div>

    </div>
  )
}
