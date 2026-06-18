import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Flame, Dumbbell, Clock, BarChart3, Play, ChevronRight } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);
  const [weeklyVolume, setWeeklyVolume] = useState(0);
  const [weeklyTime, setWeeklyTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastSessions, setLastSessions] = useState<
    { id: number; date: number; setsCount: number; exerciseNames: string[] }[]
  >([]);

  useEffect(() => {
    (async () => {
      const sessions = await db.sessions.orderBy('date').toArray();
      const now = Date.now();
      const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
      const thisWeek = sessions.filter(s => s.date >= weekAgo);

      setWeeklyWorkouts(thisWeek.length);
      setWeeklyVolume(thisWeek.reduce((s, ses) => s + ses.sets.reduce((s2, set) => s2 + set.weight * set.reps, 0), 0));
      setWeeklyTime(thisWeek.reduce((s, ses) => s + ses.duration, 0));

      const days = [
        ...new Set(
          sessions.map(s => {
            const d = new Date(s.date);
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          }),
        ),
      ]
        .sort()
        .reverse();

      let streakCount = 0;
      const today = new Date();
      for (let i = 0; i < days.length; i++) {
        const d = new Date(days[i]);
        const expected = new Date(today);
        expected.setDate(expected.getDate() - i);
        if (
          d.getFullYear() === expected.getFullYear() &&
          d.getMonth() === expected.getMonth() &&
          d.getDate() === expected.getDate()
        ) {
          streakCount++;
        } else break;
      }
      setStreak(streakCount);

      const last = sessions.slice(-3).reverse();
      setLastSessions(
        last.map(s => ({
          id: s.id!,
          date: s.date,
          setsCount: s.sets.length,
          exerciseNames: [...new Set(s.sets.map(set => set.exerciseName))],
        })),
      );
    })();
  }, []);

  const weekMins = Math.floor(weeklyTime / 60);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Fitly</h1>
      <p className="text-slate-400 text-sm -mt-3">Tu resumen semanal</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Flame className="size-5 text-orange-400 mb-1" />
          <div className="text-2xl font-bold text-white">{streak}</div>
          <div className="text-xs text-slate-500">días seguidos</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Dumbbell className="size-5 text-emerald-400 mb-1" />
          <div className="text-2xl font-bold text-white">{weeklyWorkouts}</div>
          <div className="text-xs text-slate-500">entrenos esta semana</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <BarChart3 className="size-5 text-blue-400 mb-1" />
          <div className="text-2xl font-bold text-white">{(weeklyVolume / 1000).toFixed(1)}k</div>
          <div className="text-xs text-slate-500">kg esta semana</div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Clock className="size-5 text-purple-400 mb-1" />
          <div className="text-2xl font-bold text-white">{weekMins}</div>
          <div className="text-xs text-slate-500">min esta semana</div>
        </div>
      </div>

      <button
        onClick={() => navigate('/workout')}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
      >
        <Play className="size-6" /> Empezar entreno
      </button>

      {lastSessions.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Últimos entrenos</h2>
            <button
              onClick={() => navigate('/history')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
            >
              Ver todo <ChevronRight className="size-3" />
            </button>
          </div>
          {lastSessions.map(s => {
            const date = new Date(s.date);
            return (
              <div key={s.id} className="bg-slate-900 rounded-xl px-4 py-3 border border-slate-800">
                <div className="text-white text-sm font-medium">
                  {date.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {s.setsCount} series · {s.exerciseNames.slice(0, 3).join(', ')}
                  {s.exerciseNames.length > 3 ? ` +${s.exerciseNames.length - 3}` : ''}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {weeklyWorkouts === 0 && (
        <p className="text-slate-500 text-center py-6 text-sm">
          Esta semana aún no entrenaste. ¡Dale al botón de arriba!
        </p>
      )}
    </div>
  );
}
