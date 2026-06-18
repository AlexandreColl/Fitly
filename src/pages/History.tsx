import { useEffect, useState } from 'react';
import { db } from '../db';
import type { WorkoutSession } from '../types';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

export function HistoryPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    db.sessions.orderBy('date').reverse().toArray().then(setSessions);
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-white">Historial</h1>
        <p className="text-slate-500 text-center py-12">Aún no hay entrenos guardados</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Historial</h1>
      <div className="space-y-2">
        {sessions.map(s => {
          const isOpen = open === s.id;
          const date = new Date(s.date);
          const mins = Math.floor(s.duration / 60);
          const secs = s.duration % 60;
          const totalSets = s.sets.length;
          const uniqueExercises = new Set(s.sets.map(s => s.exerciseName)).size;

          return (
            <div key={s.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : s.id!)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div>
                  <div className="text-white font-semibold text-sm">
                    {date.toLocaleDateString('es', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {uniqueExercises} ejercicios · {totalSets} series
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Clock className="size-3.5" />
                    {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </div>
                  {isOpen ? (
                    <ChevronUp className="size-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="size-4 text-slate-500" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-1.5 border-t border-slate-800 pt-3">
                  {s.sets.map((set, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm bg-slate-800/40 rounded-lg px-3 py-2"
                    >
                      <div>
                        <span className="text-white font-medium">{set.exerciseName}</span>
                        <span className="text-slate-500 ml-2">
                          {set.weight}kg × {set.reps} reps
                        </span>
                      </div>
                      <div className="text-slate-500 text-xs">
                        RIR {set.rir} · {set.restTime}s
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
