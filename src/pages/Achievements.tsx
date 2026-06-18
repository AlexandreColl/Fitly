import { useEffect } from 'react';
import { useAchievements } from '../hooks/useAchievements';
import { ACHIEVEMENTS } from '../lib/achievements';
import { Lock } from 'lucide-react';

export function AchievementsPage() {
  const { unlocked, check } = useAchievements();

  useEffect(() => {
    check();
  }, [check]);

  const unlockedIds = new Set(unlocked.map(u => u.id));

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Logros</h1>
      <p className="text-sm text-slate-400">
        {unlocked.length} / {ACHIEVEMENTS.length} desbloqueados
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map(a => {
          const isUnlocked = unlockedIds.has(a.id);
          const data = unlocked.find(u => u.id === a.id);
          return (
            <div
              key={a.id}
              className={`rounded-xl p-4 border text-center transition-colors ${
                isUnlocked ? 'bg-emerald-900/30 border-emerald-700/50' : 'bg-slate-900 border-slate-800 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">
                {isUnlocked ? a.icon : <Lock className="size-6 mx-auto text-slate-600" />}
              </div>
              <div className={`text-sm font-semibold ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>{a.title}</div>
              <div className="text-xs text-slate-500 mt-1">{a.description}</div>
              {data && (
                <div className="text-[10px] text-slate-600 mt-2">
                  {new Date(data.unlockedAt).toLocaleDateString('es')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
