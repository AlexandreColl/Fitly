import { type FormEvent, useState } from 'react';
import { db } from '../db';
import { MUSCLE_GROUPS, EXERCISE_TAGS } from '../types';
import type { Exercise } from '../types';
import { X } from 'lucide-react';

interface Props {
  exercise?: Exercise | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ExerciseForm({ exercise, onClose, onSaved }: Props) {
  const [name, setName] = useState(exercise?.name ?? '');
  const [muscleGroups, setMuscleGroups] = useState<string[]>(exercise?.muscleGroups ?? []);
  const [tags, setTags] = useState<string[]>(exercise?.tags ?? []);
  const [video, setVideo] = useState(exercise?.video ?? '');
  const [instructions, setInstructions] = useState(exercise?.instructions ?? '');
  const [saving, setSaving] = useState(false);

  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const data = {
      name: name.trim(),
      muscleGroups,
      tags,
      video: video.trim() || undefined,
      instructions: instructions.trim(),
    };
    if (exercise?.id) {
      await db.exercises.update(exercise.id, data);
    } else {
      await db.exercises.add(data);
    }
    onSaved();
  };

  const handleDelete = async () => {
    if (!exercise?.id) return;
    await db.exercises.delete(exercise.id);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60">
      <div className="bg-slate-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90dvh] overflow-y-auto border border-slate-800">
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">{exercise ? 'Editar' : 'Nuevo'} ejercicio</h2>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <X className="size-5" />
            </button>
          </div>

          <div>
            <label htmlFor="ef-name" className="text-xs text-slate-400 block mb-1">
              Nombre
            </label>
            <input
              id="ef-name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700"
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Grupos musculares</label>
            <div className="flex flex-wrap gap-1.5">
              {MUSCLE_GROUPS.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMuscleGroups(toggle(muscleGroups, m))}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    muscleGroups.includes(m)
                      ? 'bg-emerald-900/40 border-emerald-600 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {EXERCISE_TAGS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTags(toggle(tags, t))}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    tags.includes(t)
                      ? 'bg-emerald-900/40 border-emerald-600 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ef-video" className="text-xs text-slate-400 block mb-1">
              URL del video (opcional)
            </label>
            <input
              id="ef-video"
              value={video}
              onChange={e => setVideo(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700"
            />
          </div>

          <div>
            <label htmlFor="ef-instructions" className="text-xs text-slate-400 block mb-1">
              Instrucciones
            </label>
            <textarea
              id="ef-instructions"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              rows={3}
              className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg py-2.5 font-medium transition-colors"
            >
              {saving ? 'Guardando...' : exercise ? 'Guardar cambios' : 'Crear ejercicio'}
            </button>
            {exercise && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-2.5 font-medium transition-colors"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
