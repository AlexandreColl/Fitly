import { useState, useCallback } from 'react';
import { useExercises } from '../hooks/useExercises';
import { MUSCLE_GROUPS, EXERCISE_TAGS } from '../types';
import { ExerciseForm } from '../components/ExerciseForm';
import { VideoEmbed } from '../components/VideoEmbed';
import { Search, Shuffle, Plus, Pencil, X } from 'lucide-react';

export function ExercisesPage() {
  const { exercises, loading, refresh } = useExercises();
  const [search, setSearch] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [suggested, setSuggested] = useState<number[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  const filtered = exercises.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterMuscle && !e.muscleGroups.includes(filterMuscle)) return false;
    if (filterTag && !e.tags.includes(filterTag)) return false;
    return true;
  });

  const pickRandom = useCallback(() => {
    if (exercises.length === 0) return;
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    setSuggested(shuffled.slice(0, 4).map(e => e.id!));
  }, [exercises]);

  const handleSaved = () => {
    setFormOpen(false);
    setEditing(null);
    refresh();
  };

  if (loading) return <div className="p-4 text-slate-500">Cargando...</div>;

  const selectedEx = exercises.find(e => e.id === selected);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Ejercicios</h1>
        <div className="flex gap-2">
          <button
            onClick={pickRandom}
            className="flex items-center gap-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Shuffle className="size-4" /> Sugerir
          </button>
          <button
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="size-4" /> Nuevo
          </button>
        </div>
      </div>

      {suggested.length > 0 && (
        <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Sugeridos para hoy</h2>
            <button onClick={() => setSuggested([])} className="text-slate-500 hover:text-white">
              <X className="size-3.5" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggested.map(id => {
              const ex = exercises.find(e => e.id === id);
              if (!ex) return null;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className="flex-shrink-0 bg-slate-900 rounded-lg px-3 py-2 border border-slate-700 text-left whitespace-nowrap"
                >
                  <div className="text-white text-sm font-medium">{ex.name}</div>
                  <div className="text-xs text-slate-400">{ex.muscleGroups.join(', ')}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {(formOpen || editing !== null) && (
        <ExerciseForm
          exercise={editing !== null ? (exercises.find(e => e.id === editing) ?? null) : null}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
        <input
          type="search"
          aria-label="Buscar ejercicio"
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
          aria-label="Filtrar por grupo muscular"
          className="bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-700"
        >
          <option value="">Todos los músculos</option>
          {MUSCLE_GROUPS.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
          aria-label="Filtrar por tag"
          className="bg-slate-800 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-700"
        >
          <option value="">Todos los tags</option>
          {EXERCISE_TAGS.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map(ex => (
          <button
            key={ex.id}
            onClick={() => setSelected(ex.id!)}
            className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-left hover:border-slate-700 hover:bg-slate-800/50 transition-colors flex flex-col min-h-[100px]"
          >
            <div className="font-semibold text-white text-sm leading-tight line-clamp-2">{ex.name}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {ex.muscleGroups.slice(0, 2).map(m => (
                <span
                  key={m}
                  className="text-[10px] bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded-full leading-none"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {ex.tags.slice(0, 2).map(t => (
                <span
                  key={t}
                  className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full leading-none"
                >
                  {t}
                </span>
              ))}
            </div>
            {ex.muscleGroups.length > 2 && (
              <div className="text-[10px] text-slate-600 mt-1">+{ex.muscleGroups.length - 2} más</div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-slate-500 text-center py-8">No hay ejercicios que coincidan</p>}

      {/* Modal de detalle */}
      {selectedEx && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-slate-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85dvh] overflow-y-auto border border-slate-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white">{selectedEx.name}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {selectedEx.muscleGroups.map(m => (
                      <span key={m} className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded-full">
                        {m}
                      </span>
                    ))}
                    {selectedEx.tags.map(t => (
                      <span key={t} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white p-1 flex-shrink-0">
                  <X className="size-5" />
                </button>
              </div>

              {selectedEx.video && <VideoEmbed url={selectedEx.video} />}

              <p className="text-sm text-slate-400">{selectedEx.instructions}</p>

              <button
                onClick={() => {
                  setEditing(selectedEx.id!);
                  setFormOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Pencil className="size-3.5" /> Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
