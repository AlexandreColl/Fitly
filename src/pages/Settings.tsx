import { useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import { db } from '../db'
import { Sun, Moon, Monitor, Download, Upload } from 'lucide-react'

const themes = [
  { value: 'dark', label: 'Oscuro', icon: Moon },
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'system', label: 'Sistema', icon: Monitor },
] as const

export function SettingsPage() {
  const { settings, update } = useSettings()
  const [importStatus, setImportStatus] = useState('')

  const handleExport = async () => {
    const data = {
      exercises: await db.exercises.toArray(),
      sessions: await db.sessions.toArray(),
      settings: await db.settings.toArray(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fitly-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      try {
        const text = await file.text()
        const data = JSON.parse(text)
        if (data.exercises) await db.exercises.clear(); await db.exercises.bulkAdd(data.exercises)
        if (data.sessions) await db.sessions.clear(); await db.sessions.bulkAdd(data.sessions)
        if (data.settings) await db.settings.clear(); await db.settings.bulkAdd(data.settings)
        setImportStatus('Datos importados correctamente')
      } catch {
        setImportStatus('Error al importar. Archivo inválido.')
      }
    }
    input.click()
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-white">Ajustes</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Apariencia</h2>
        <div className="flex gap-2">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => update({ theme: value })}
              className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl p-3 border transition-colors ${
                settings.theme === value
                  ? 'bg-emerald-900/40 border-emerald-600 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <Icon className="size-5" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Entreno</h2>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">Unidad de peso</span>
            <select
              value={settings.weightUnit}
              onChange={e => update({ weightUnit: e.target.value as 'kg' | 'lb' })}
              className="bg-slate-800 text-white rounded-lg px-3 py-1.5 border border-slate-700"
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Descanso por defecto (s)</span>
            <input
              type="number"
              value={settings.restTimer}
              onChange={e => update({ restTimer: Number(e.target.value) || 60 })}
              className="bg-slate-800 text-white rounded-lg px-3 py-1.5 border border-slate-700 w-20 text-center"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Sonido del temporizador</span>
            <button
              onClick={() => update({ timerSound: !settings.timerSound })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.timerSound ? 'bg-emerald-600' : 'bg-slate-700'
              } relative`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                settings.timerSound ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Datos</h2>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
          <button onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-2.5 text-sm transition-colors">
            <Download className="size-4" /> Exportar backup
          </button>
          <button onClick={handleImport}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-2.5 text-sm transition-colors">
            <Upload className="size-4" /> Importar backup
          </button>
          {importStatus && (
            <p className={`text-sm text-center ${importStatus.includes('Error') ? 'text-red-400' : 'text-emerald-400'}`}>
              {importStatus}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Información</h2>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-sm text-slate-400 space-y-1">
          <p>Fitly v1.0.0</p>
          <p>Datos guardados localmente en el dispositivo.</p>
          <p>Sin conexión a internet necesaria.</p>
        </div>
      </section>
    </div>
  )
}
