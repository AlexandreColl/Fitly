import { useCallback, useEffect, useState } from 'react'
import { db } from '../db'
import { ACHIEVEMENTS } from '../lib/achievements'
import type { UnlockedAchievement } from '../types'

export function useAchievements() {
  const [unlocked, setUnlocked] = useState<UnlockedAchievement[]>([])
  const [lastUnlocked, setLastUnlocked] = useState<string | null>(null)

  useEffect(() => {
    db.achievements.toArray().then(setUnlocked)
  }, [])

  const check = useCallback(async () => {
    const sessions = await db.sessions.orderBy('date').toArray()
    const unlockedIds = new Set((await db.achievements.toArray()).map(a => a.id))
    const now = Date.now()
    const newUnlocks: string[] = []

    const tryUnlock = async (id: string) => {
      if (unlockedIds.has(id)) return
      await db.achievements.add({ id, unlockedAt: now })
      unlockedIds.add(id)
      newUnlocks.push(id)
    }

    // Primer entreno
    if (sessions.length >= 1) await tryUnlock('first_workout')

    // Cantidad de entrenos
    if (sessions.length >= 10) await tryUnlock('workouts_10')
    if (sessions.length >= 25) await tryUnlock('workouts_25')
    if (sessions.length >= 50) await tryUnlock('workouts_50')
    if (sessions.length >= 100) await tryUnlock('workouts_100')

    // Series totales
    const totalSets = sessions.reduce((s, ses) => s + ses.sets.length, 0)
    if (totalSets >= 50) await tryUnlock('sets_50')
    if (totalSets >= 200) await tryUnlock('sets_200')
    if (totalSets >= 500) await tryUnlock('sets_500')

    // Volumen total
    const totalVolume = sessions.reduce((s, ses) =>
      s + ses.sets.reduce((s2, set) => s2 + set.weight * set.reps, 0), 0)
    if (totalVolume >= 1000) await tryUnlock('volume_1000')
    if (totalVolume >= 10000) await tryUnlock('volume_10000')
    if (totalVolume >= 50000) await tryUnlock('volume_50000')

    // Rachas de días consecutivos
    const days = new Set(sessions.map(s => {
      const d = new Date(s.date)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }))
    const sortedDays = [...days].sort()
    let streak = 1
    let maxStreak = 1
    for (let i = 1; i < sortedDays.length; i++) {
      const prev = new Date(sortedDays[i - 1])
      const curr = new Date(sortedDays[i])
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      if (diff === 1) {
        streak++
        if (streak > maxStreak) maxStreak = streak
      } else {
        streak = 1
      }
    }
    if (maxStreak >= 3) await tryUnlock('streak_3')
    if (maxStreak >= 7) await tryUnlock('streak_7')
    if (maxStreak >= 14) await tryUnlock('streak_14')
    if (maxStreak >= 30) await tryUnlock('streak_30')

    // Entrenos especiales
    for (const ses of sessions) {
      const h = new Date(ses.date).getHours()
      if (h < 7) await tryUnlock('early_bird')
      if (h >= 22) await tryUnlock('night_owl')
      if (ses.duration >= 90 * 60) await tryUnlock('marathon')
    }

    // Variedad de ejercicios
    const usedExercises = new Set(sessions.flatMap(s => s.sets.map(set => set.exerciseName)))
    if (usedExercises.size >= 12) await tryUnlock('variety')

    if (newUnlocks.length > 0) {
      const all = await db.achievements.toArray()
      setUnlocked(all)
      setLastUnlocked(newUnlocks[newUnlocks.length - 1])
      setTimeout(() => setLastUnlocked(null), 4000)
    }
  }, [])

  return { unlocked, lastUnlocked, check }
}

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find(a => a.id === id)
}
