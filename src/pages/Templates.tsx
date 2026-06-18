import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import type { WorkoutTemplate } from '../types';
import { Plus, Play, Trash2, ChevronDown, ChevronUp, Pencil, Check, X, ArrowUp, ArrowDown } from 'lucide-react';

export function TemplatesPage() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [exercisesMap, setExercisesMap] = useState<Map<number, string>>(new Map());
  const [open, setOpen] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [editingName, setEditingName] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    db.templates.toArray().then(setTemplates);
    db.exercises.toArray().then(all => {
      setExercisesMap(new Map(all.map(e => [e.id!, e.name])));
    });
  }, []);

  const exercises = [...exercisesMap.entries()];

  const create = async () => {
    if (!newName.trim()) return;
    const id = await db.templates.add({ name: newName.trim(), exercises: [] });
    setTemplates(prev => [...prev, { id, name: newName.trim(), exercises: [] }]);
    setOpen(id!);
    setNewName('');
  };

  const remove = async (id: number) => {
    await db.templates.delete(id);
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const startRename = (tpl: WorkoutTemplate) => {
    setEditingName(tpl.id!);
    setEditValue(tpl.name);
  };

  const confirmRename = async (id: number) => {
    if (!editValue.trim()) return;
    await db.templates.update(id, { name: editValue.trim() });
    setTemplates(prev => prev.map(t => (t.id === id ? { ...t, name: editValue.trim() } : t)));
    setEditingName(null);
  };

  const toggleExercise = async (tpl: WorkoutTemplate, exId: number) => {
    const next = tpl.exercises.includes(exId) ? tpl.exercises.filter(id => id !== exId) : [...tpl.exercises, exId];
    await db.templates.update(tpl.id!, { exercises: next });
    setTemplates(prev => prev.map(t => (t.id === tpl.id ? { ...t, exercises: next } : t)));
  };

  const moveExercise = async (tpl: WorkoutTemplate, exId: number, dir: -1 | 1) => {
    const idx = tpl.exercises.indexOf(exId);
    if (idx === -1) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= tpl.exercises.length) return;
    const next = [...tpl.exercises];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    await db.templates.update(tpl.id!, { exercises: next });
    setTemplates(prev => prev.map(t => (t.id === tpl.id ? { ...t, exercises: next } : t)));
  };

  const startWorkout = (tpl: WorkoutTemplate) => {
    navigate(`/workout?template=${tpl.id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Plantillas</h1>

      <div className="flex gap-2">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Nombre de la plantilla..."
          className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-2.5 text-sm border border-slate-700 focus:border-emerald-500 outline-none"
          onKeyDown={e => e.key === 'Enter' && create()}
        />
        <button
          onClick={create}
          disabled={!newName.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl px-4 flex items-center gap-1.5 transition-colors"
        >
          <Plus className="size-4" /> Crear
        </button>
      </div>

      <div className="space-y-2">
        {templates.map(tpl => {
          const isOpen = open === tpl.id;
          const selExercises = tpl.exercises.map(id => [id, exercisesMap.get(id)] as const).filter(([, n]) => n);

          return (
            <div key={tpl.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : tpl.id!)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
              >
                {editingName === tpl.id ? (
                  <div className="flex items-center gap-1 flex-1 mr-2" onClick={e => e.stopPropagation()}>
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="flex-1 bg-slate-800 text-white rounded-lg px-2 py-1 text-sm border border-slate-700"
                      onKeyDown={e => {
                        if (e.key === 'Enter') confirmRename(tpl.id!);
                        if (e.key === 'Escape') setEditingName(null);
                      }}
                      autoFocus
                    />
                    <button onClick={() => confirmRename(tpl.id!)} className="text-emerald-400 hover:text-emerald-300">
                      <Check className="size-4" />
                    </button>
                    <button onClick={() => setEditingName(null)} className="text-slate-400 hover:text-white">
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-white">{tpl.name}</span>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <button onClick={() => startRename(tpl)} className="text-slate-500 hover:text-white p-0.5">
                        <Pencil className="size-3.5" />
                      </button>
                      {isOpen ? (
                        <ChevronUp className="size-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="size-4 text-slate-500" />
                      )}
                    </div>
                  </>
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
                  <div className="text-xs text-slate-500 mb-1">Ejercicios seleccionados: {selExercises.length}</div>
                  <div className="max-h-48 overflow-y-auto space-y-0.5">
                    {selExercises.map(([id, name]) => (
                      <div
                        key={id}
                        className="flex items-center gap-1.5 text-sm text-slate-300 bg-slate-800/50 rounded-lg px-2.5 py-1.5"
                      >
                        <span className="flex-1 truncate">{name}</span>
                        <button
                          onClick={() => moveExercise(tpl, id, -1)}
                          className="text-slate-500 hover:text-white p-0.5"
                        >
                          <ArrowUp className="size-3" />
                        </button>
                        <button
                          onClick={() => moveExercise(tpl, id, 1)}
                          className="text-slate-500 hover:text-white p-0.5"
                        >
                          <ArrowDown className="size-3" />
                        </button>
                        <button
                          onClick={() => toggleExercise(tpl, id)}
                          className="text-red-400 hover:text-red-300 p-0.5"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                    {selExercises.length === 0 && <p className="text-sm text-slate-500 italic">Sin ejercicios aún</p>}
                  </div>
                  <details>
                    <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
                      Agregar ejercicios
                    </summary>
                    <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                      {exercises
                        .filter(([id]) => !tpl.exercises.includes(id))
                        .map(([id, name]) => (
                          <button
                            key={id}
                            onClick={() => toggleExercise(tpl, id)}
                            className="w-full text-left text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg px-2.5 py-1.5 transition-colors"
                          >
                            + {name}
                          </button>
                        ))}
                    </div>
                  </details>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => startWorkout(tpl)}
                      disabled={tpl.exercises.length === 0}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="size-4" /> Empezar entreno
                    </button>
                    <button onClick={() => remove(tpl.id!)} className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {templates.length === 0 && (
          <p className="text-slate-500 text-center py-8">No hay plantillas aún. Creá una arriba.</p>
        )}
      </div>
    </div>
  );
}
