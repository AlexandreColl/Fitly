import { useState, useCallback, useEffect } from 'react'
import { db } from '../db'
import type { WorkoutSession, SetEntry } from '../types'

export function useWorkout() {
  const [sets, setSets] = useState<SetEntry[]>([])
  const [startTime] = useState(Date.now())

  const addSet = useCallback((set: SetEntry) => {
    setSets(prev => [...prev, set])
  }, [])

  const removeSet = useCallback((index: number) => {
    setSets(prev => prev.filter((_, i) => i !== index))
  }, [])

  const finish = useCallback(async () => {
    const session: WorkoutSession = {
      date: startTime,
      duration: Math.round((Date.now() - startTime) / 1000),
      sets,
    }
    await db.sessions.add(session)
    setSets([])
  }, [startTime, sets])

  return { sets, addSet, removeSet, finish, startTime }
}

export function useHistory() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])

  useEffect(() => {
    db.sessions.orderBy('date').reverse().toArray().then(setSessions)
  }, [])

  return sessions
}
