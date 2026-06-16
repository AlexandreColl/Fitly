import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ExercisesPage } from './pages/Exercises'
import { TemplatesPage } from './pages/Templates'
import { WorkoutPage } from './pages/Workout'
import { HistoryPage } from './pages/History'
import { StatsPage } from './pages/Stats'
import { AchievementsPage } from './pages/Achievements'
import { SettingsPage } from './pages/Settings'
import { AchievementToast } from './components/Toast'
import { useAchievements } from './hooks/useAchievements'
import { useTheme } from './hooks/useTheme'

export default function App() {
  useTheme()
  const { lastUnlocked } = useAchievements()

  return (
    <BrowserRouter>
      <AchievementToast achievementId={lastUnlocked} onDone={() => {}} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ExercisesPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="workout" element={<WorkoutPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
