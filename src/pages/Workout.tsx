import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useWorkout } from '../hooks/useWorkout'
import { useExercises } from '../hooks/useExercises'
import { useSettings } from '../hooks/useSettings'
import { useAchievements } from '../hooks/useAchievements'
import { beep } from '../lib/sound'
import type { SetEntry } from '../types'
import { db } from '../db'
import { Square, Plus, Trash2, Timer, SkipForward, ArrowLeft } from 'lucide-react'

export function WorkoutPage() {
  const { exercises } = useExercises()
  const { settings } = useSettings()
  const { sets, addSet, removeSet, finish, startTime } = useWorkout()
  const { check } = useAchievements()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const templateId = searchParams.get('template')

  const [activeExerciseQueue, setActiveExerciseQueue] = useState<number[]>([])
  const [queueIndex, setQueueIndex] = useState(0)
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [rir, setRir] = useState('2')
  const [rest, setRest] = useState(String(settings.restTimer))
  const [restRemaining, setRestRemaining] = useState(0)
  const [restTotal, setRestTotal] = useState(0)

  useEffect(() => {
    if (exercises.length === 0) return
    if (templateId) {
      ;(async () => {
        const tpl = await db.templates.get(Number(templateId))
        if (tpl) setActiveExerciseQueue(tpl.exercises)
      })()
    } else if (!activeExerciseQueue.length) {
      setActiveExerciseQueue([exercises[0].id!])
    }
  }, [templateId, exercises])

  const activeExerciseId = activeExerciseQueue[queueIndex] ?? 0

  useEffect(() => {
    if (restRemaining <= 0) return
    const id = setInterval(() => {
      setRestRemaining(p => {
        if (p <= 1) {
          clearInterval(id)
          if (settings.timerSound) beep()
          if (navigator.vibrate) navigator.vibrate(200)
          return 0
        }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [restRemaining, settings.timerSound])

  const handleAddSet = () => {
    const ex = exercises.find(e => e.id === activeExerciseId)
    if (!ex?.id) return
    const set: SetEntry = {
      exerciseId: ex.id,
      exerciseName: ex.name,
      weight: Number(weight) || 0,
      reps: Number(reps) || 0,
      rir: Number(rir) || 0,
      restTime: Number(rest) || settings.restTimer,
      completedAt: Date.now(),
    }
    addSet(set)
    const restSecs = Number(rest) || settings.restTimer
    setRestRemaining(restSecs)
    setRestTotal(restSecs)
    setWeight('')
    setReps('')
  }

  const skipRest = () => {
    setRestRemaining(0)
  }

  const nextExercise = () => {
    if (queueIndex < activeExerciseQueue.length - 1) {
      setQueueIndex(i => i + 1)
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000)
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {templateId && (
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white">
              <ArrowLeft className="size-5" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-white">Entreno</h1>
        </div>
        <div className="text-emerald-400 font-mono text-lg">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      {activeExerciseQueue.length > 1 && (
        <div className="flex gap-1">
          {activeExerciseQueue.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${
              i === queueIndex ? 'bg-emerald-500' : i < queueIndex ? 'bg-emerald-800' : 'bg-slate-700'
            }`} />
          ))}
        </div>
      )}

      <select
        value={activeExerciseId}
        onChange={e => setActiveExerciseQueue([Number(e.target.value)])}
        className="w-full bg-slate-800 text-white rounded-xl px-4 py-3 border border-slate-700"
      >
        {exercises.map(ex => (
          <option key={ex.id} value={ex.id}>{ex.name}</option>
        ))}
      </select>

      <div className="grid grid-cols-4 gap-2">
        <div>
          <label className="text-xs text-slate-500">Peso ({settings.weightUnit})</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 text-center" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Reps</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 text-center" />
        </div>
        <div>
          <label className="text-xs text-slate-500">RIR</label>
          <select value={rir} onChange={e => setRir(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 text-center">
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Descanso (s)</label>
          <input type="number" value={rest} onChange={e => setRest(e.target.value)}
            className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 text-center" />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={handleAddSet}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-colors">
          <Plus className="size-5" /> Añadir serie
        </button>
        {activeExerciseQueue.length > 1 && queueIndex < activeExerciseQueue.length - 1 && (
          <button onClick={nextExercise}
            className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-4 py-3 transition-colors">
            <SkipForward className="size-5" />
          </button>
        )}
      </div>

      {restRemaining > 0 && (
        <div className="bg-emerald-900/40 border border-emerald-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="size-5 text-emerald-400" />
              <span className="text-emerald-300 font-mono text-xl">{restRemaining}s</span>
            </div>
            <button onClick={skipRest} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <SkipForward className="size-3.5" /> Saltar
            </button>
          </div>
          {restTotal > 0 && (
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${(restRemaining / restTotal) * 100}%` }} />
            </div>
          )}
        </div>
      )}

      {sets.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Series completadas</h2>
          {sets.map((set, i) => (
            <div key={i} className="bg-slate-900 rounded-xl px-4 py-3 flex items-center justify-between border border-slate-800">
              <div>
                <div className="text-white font-medium text-sm">{set.exerciseName}</div>
                <div className="text-slate-400 text-xs">
                  {set.weight}{settings.weightUnit} × {set.reps} reps · RIR {set.rir}
                </div>
              </div>
              <button onClick={() => removeSet(i)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {sets.length > 0 && (
        <button onClick={async () => { await finish(); check() }}
          className="w-full bg-red-600 hover:bg-red-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-colors">
          <Square className="size-5" /> Finalizar entreno
        </button>
      )}
    </div>
  )
}
