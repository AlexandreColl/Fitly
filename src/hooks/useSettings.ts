import { useEffect, useState } from 'react'
import { db } from '../db'
import type { Settings } from '../types'
import { DEFAULT_SETTINGS } from '../types'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    db.settings.get(1).then(s => {
      if (s) setSettings(s)
      else db.settings.add(DEFAULT_SETTINGS)
    })
  }, [])

  const update = async (partial: Partial<Settings>) => {
    const next = { ...settings, ...partial }
    await db.settings.put(next)
    setSettings(next)
  }

  return { settings, update }
}
