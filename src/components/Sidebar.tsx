import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Kanban,
  FileSearch,
  Newspaper,
  BarChart3,
  Sun,
  Moon,
} from 'lucide-react'
import logoIcon from '../assets/brokerpower-icon.png'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Command Center' },
  { to: '/pipeline', icon: Kanban, label: 'Deal Pipeline' },
  { to: '/documents', icon: FileSearch, label: 'Documents' },
  { to: '/briefing', icon: Newspaper, label: 'Briefing' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
]

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <aside className="w-64 bg-bg-sidebar border-r border-border flex flex-col shrink-0">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="BrokerPower" className="w-9 h-9 object-contain" />
          <div>
            <h1 className="text-sm font-semibold text-text-primary tracking-tight">
              Broker<span className="text-accent">Power</span>
            </h1>
            <p className="text-xs text-text-muted">AI-Powered CRE Ops</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-accent-bg text-accent border border-accent-border'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="text-xs">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-muted">All agents active</span>
        </div>
      </div>
    </aside>
  )
}
