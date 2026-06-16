import { NavLink, Outlet } from 'react-router-dom'
import { Dumbbell, History, Settings, Play, LayoutTemplate, BarChart3, Trophy } from 'lucide-react'

const links = [
  { to: '/', label: 'Ejercicios', icon: Dumbbell },
  { to: '/templates', label: 'Plantillas', icon: LayoutTemplate },
  { to: '/workout', label: 'Entreno', icon: Play },
  { to: '/stats', label: 'Estadísticas', icon: BarChart3 },
  { to: '/achievements', label: 'Logros', icon: Trophy },
  { to: '/history', label: 'Historial', icon: History },
  { to: '/settings', label: 'Ajustes', icon: Settings },
]

export function Layout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-[var(--safe-bottom)] z-50">
        <div className="flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 text-xs text-slate-500 data-[active=true]:text-emerald-400 transition-colors"
            >
              <Icon className="size-5" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
