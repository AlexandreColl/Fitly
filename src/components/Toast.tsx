import { useEffect, useState } from 'react'
import { getAchievement } from '../hooks/useAchievements'
import { Trophy } from 'lucide-react'

interface Props {
  achievementId: string | null
  onDone: () => void
}

export function AchievementToast({ achievementId, onDone }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!achievementId) return
    setVisible(true)
    const t = setTimeout(() => { setVisible(false); onDone() }, 3500)
    return () => clearTimeout(t)
  }, [achievementId, onDone])

  if (!visible || !achievementId) return null

  const a = getAchievement(achievementId)
  if (!a) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] animate-bounce">
      <div className="bg-emerald-900/90 border border-emerald-600 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 max-w-sm mx-auto backdrop-blur-sm">
        <Trophy className="size-6 text-yellow-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Logro desbloqueado</div>
          <div className="text-white font-bold text-sm truncate">{a.icon} {a.title}</div>
          <div className="text-slate-400 text-xs truncate">{a.description}</div>
        </div>
      </div>
    </div>
  )
}
