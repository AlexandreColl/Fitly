import { useEffect, useState } from 'react'
import { db } from '../db'
import type { WorkoutSession } from '../types'
import { BarChart3, TrendingUp, Award } from 'lucide-react'

export function StatsPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])

  useEffect(() => {
    db.sessions.orderBy('date').reverse().toArray().then(setSessions)
  }, [])

  const totalWorkouts = sessions.length
  const totalSets = sessions.reduce((s, ses) => s + ses.sets.length, 0)

  const volumeByExercise = new Map<string, number>()
  const maxWeightByExercise = new Map<string, number>()
  for (const ses of sessions) {
    for (const set of ses.sets) {
      const vol = set.weight * set.reps
      volumeByExercise.set(set.exerciseName, (volumeByExercise.get(set.exerciseName) ?? 0) + vol)
      const current = maxWeightByExercise.get(set.exerciseName) ?? 0
      if (set.weight > current) maxWeightByExercise.set(set.exerciseName, set.weight)
    }
  }

  const topExercises = [...volumeByExercise.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const bestRecords = [...maxWeightByExercise.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const totalVolume = [...volumeByExercise.values()].reduce((s, v) => s + v, 0)

  if (sessions.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-white">Estadísticas</h1>
        <p className="text-slate-500 text-center py-12">No hay datos aún. Completá entrenos para ver estadísticas.</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Estadísticas</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center">
          <BarChart3 className="size-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{totalWorkouts}</div>
          <div className="text-xs text-slate-500">Entrenos</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center">
          <TrendingUp className="size-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{totalSets}</div>
          <div className="text-xs text-slate-500">Series</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center">
          <Award className="size-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{(totalVolume / 1000).toFixed(1)}k</div>
          <div className="text-xs text-slate-500">Vol. total</div>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Top volumen</h2>
        {topExercises.map(([name, vol], i) => (
          <div key={name} className="bg-slate-900 rounded-xl px-4 py-3 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-sm w-5">{i + 1}</span>
              <span className="text-white text-sm">{name}</span>
            </div>
            <span className="text-slate-400 text-sm">{(vol / 1000).toFixed(1)}k kg</span>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Marcas personales</h2>
        {bestRecords.map(([name, weight]) => (
          <div key={name} className="bg-slate-900 rounded-xl px-4 py-3 border border-slate-800 flex items-center justify-between">
            <span className="text-white text-sm">{name}</span>
            <span className="text-emerald-400 font-mono text-sm">{weight} kg</span>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Últimos entrenos</h2>
        {sessions.slice(0, 5).map(s => {
          const date = new Date(s.date)
          const mins = Math.floor(s.duration / 60)
          return (
            <div key={s.id} className="bg-slate-900 rounded-xl px-4 py-3 border border-slate-800 flex items-center justify-between">
              <span className="text-white text-sm">
                {date.toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
              <span className="text-slate-400 text-xs">{mins} min · {s.sets.length} series</span>
            </div>
          )
        })}
      </section>
    </div>
  )
}
