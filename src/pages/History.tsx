import { useEffect, useState } from 'react'
import { db } from '../db'
import type { WorkoutSession } from '../types'
import { Clock } from 'lucide-react'

export function HistoryPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])

  useEffect(() => {
    db.sessions.orderBy('date').reverse().toArray().then(setSessions)
  }, [])

  if (sessions.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-white">Historial</h1>
        <p className="text-slate-500 text-center py-12">Aún no hay entrenos guardados</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Historial</h1>
      <div className="space-y-2">
        {sessions.map(s => {
          const date = new Date(s.date)
          const mins = Math.floor(s.duration / 60)
          const secs = s.duration % 60
          const totalSets = s.sets.length
          const uniqueExercises = new Set(s.sets.map(s => s.exerciseName)).size
          return (
            <div key={s.id} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">
                  {date.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock className="size-3.5" />
                  {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </div>
              </div>
              <div className="text-slate-400 text-sm mt-1">
                {uniqueExercises} ejercicios · {totalSets} series
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
