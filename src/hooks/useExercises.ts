import { useEffect, useState, useCallback } from 'react';
import { db, seedExercises } from '../db';
import type { Exercise } from '../types';

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const all = await db.exercises.toArray();
    setExercises(all);
  }, []);

  useEffect(() => {
    (async () => {
      await seedExercises();
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  return { exercises, loading, refresh };
}
