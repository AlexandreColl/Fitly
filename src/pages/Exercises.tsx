import { useState, useCallback } from 'react'
import { useExercises } from '../hooks/useExercises'
import { MUSCLE_GROUPS, EXERCISE_TAGS } from '../types'
import { ExerciseForm } from '../components/ExerciseForm'
import { VideoEmbed } from '../components/VideoEmbed'
import { Search, ChevronDown, ChevronUp, Shuffle, Plus, Pencil } from 'lucide-react'

export function ExercisesPage() {
  const { exercises, loading, refresh } = useExercises()
  const [search, setSearch] = useState('')
  const [filterMuscle, setFilterMuscle] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [suggested, setSuggested] = useState<number[]>([])
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)

  const filtered = exercises.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterMuscle && !e.muscleGroups.includes(filterMuscle)) return false
    if (filterTag && !e.tags.includes(filterTag)) return false
    return true
  })

  const pickRandom = useCallback(() => {
    if (exercises.length === 0) return
    const shuffled = [...exercises].sort(() => Math.random() - 0.5)
    setSuggested(shuffled.slice(0, 4).map(e => e.id!))
  }, [exercises])

  const handleSaved = () => {
    setFormOpen(false)
    setEditing(null)
    refresh()
  }

  if (loading) return <div className="p-4 text-slate-500">Cargando...</div>

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Ejercicios</h1>
        <div className="flex gap-2">
          <button onClick={pickRandom}
            className="flex items-center gap-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors">
            <Shuffle className="size-4" /> Sugerir
          </button>
          <button onClick={() => setFormOpen(true)}
            className="flex items-center gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="size-4" /> Nuevo
          </button>
        </div>
      </div>

      {suggested.length > 0 && (
        <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-3">
          <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Sugeridos para hoy</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggested.map(id => {
              const ex = exercises.find(e => e.id === id)
              if (!ex) return null
              return (
                <button key={id} onClick={() => setSelected(id)}
                  className="flex-shrink-0 bg-slate-900 rounded-lg px-3 py-2 border border-slate-700 text-left whitespace-nowrap">
                  <div className="text-white text-sm font-medium">{ex.name}</div>
                  <div className="text-xs text-slate-400">{ex.muscleGroups.join(', ')}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {(formOpen || editing !== null) && (
        <ExerciseForm
          exercise={editing !== null ? exercises.find(e => e.id === editing) ?? null : null}
          onClose={() => { setFormOpen(false); setEditing(null) }}
          onSaved={handleSaved}
        />
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
        <input
          type="search"
          placeholder="Buscar ejercicio..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-800 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm border border-slate-700 focus:border-emerald-500 outline-none"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <select
          value={filterMuscle}
          onChange={e => setFilterMuscle(e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-700"
        >
          <option value="">Todos los músculos</option>
          {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-700"
        >
          <option value="">Todos los tags</option>
          {EXERCISE_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map(ex => {
          const isOpen = selected === ex.id
          return (
            <div key={ex.id}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setSelected(isOpen ? null : ex.id!)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{ex.name}</div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {ex.muscleGroups.map(m => (
                      <span key={m} className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded-full">{m}</span>
                    ))}
                    {ex.tags.map(t => (
                      <span key={t} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                {isOpen ? <ChevronUp className="size-4 text-slate-500 flex-shrink-0 ml-2" /> : <ChevronDown className="size-4 text-slate-500 flex-shrink-0 ml-2" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
                  {ex.video && <VideoEmbed url={ex.video} />}
                  <p className="text-sm text-slate-400">{ex.instructions}</p>
                  <button onClick={() => { setEditing(ex.id!); setFormOpen(true) }}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                    <Pencil className="size-3.5" /> Editar
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-slate-500 text-center py-8">No hay ejercicios que coincidan</p>
        )}
      </div>
    </div>
  )
}
