import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../db'
import type { WorkoutTemplate } from '../types'
import { Plus, Play, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export function TemplatesPage() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([])
  const [exercises, setExercises] = useState<Map<number, string>>(new Map())
  const [open, setOpen] = useState<number | null>(null)
  const [newName, setNewName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    db.templates.toArray().then(setTemplates)
    db.exercises.each(e => setExercises(m => new Map(m).set(e.id!, e.name)))
  }, [])

  const create = async () => {
    if (!newName.trim()) return
    const id = await db.templates.add({ name: newName.trim(), exercises: [] })
    setTemplates(prev => [...prev, { id, name: newName.trim(), exercises: [] }])
    setOpen(id!)
    setNewName('')
  }

  const remove = async (id: number) => {
    await db.templates.delete(id)
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  const toggleExercise = async (tpl: WorkoutTemplate, exId: number) => {
    const next = tpl.exercises.includes(exId)
      ? tpl.exercises.filter(id => id !== exId)
      : [...tpl.exercises, exId]
    await db.templates.update(tpl.id!, { exercises: next })
    setTemplates(prev => prev.map(t => t.id === tpl.id ? { ...t, exercises: next } : t))
  }

  const startWorkout = (tpl: WorkoutTemplate) => {
    navigate(`/workout?template=${tpl.id}`)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Plantillas</h1>

      <div className="flex gap-2">
        <input value={newName} onChange={e => setNewName(e.target.value)}
          placeholder="Nombre de la plantilla..."
          className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-2.5 text-sm border border-slate-700 focus:border-emerald-500 outline-none"
          onKeyDown={e => e.key === 'Enter' && create()} />
        <button onClick={create} disabled={!newName.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl px-4 flex items-center gap-1.5 transition-colors">
          <Plus className="size-4" /> Crear
        </button>
      </div>

      <div className="space-y-2">
        {templates.map(tpl => {
          const isOpen = open === tpl.id
          return (
            <div key={tpl.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : tpl.id!)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
                <span className="font-semibold text-white">{tpl.name}</span>
                {isOpen ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {[...exercises.entries()].map(([id, name]) => (
                      <label key={id} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input type="checkbox" checked={tpl.exercises.includes(id)}
                          onChange={() => toggleExercise(tpl, id)}
                          className="accent-emerald-500" />
                        {name}
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startWorkout(tpl)}
                      disabled={tpl.exercises.length === 0}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors">
                      <Play className="size-4" /> Empezar entreno
                    </button>
                    <button onClick={() => remove(tpl.id!)}
                      className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {templates.length === 0 && (
          <p className="text-slate-500 text-center py-8">No hay plantillas aún. Creá una arriba.</p>
        )}
      </div>
    </div>
  )
}
