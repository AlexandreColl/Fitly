import { useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ExercisesPage } from './pages/Exercises';
import { TemplatesPage } from './pages/Templates';
import { WorkoutPage } from './pages/Workout';
import { HistoryPage } from './pages/History';
import { StatsPage } from './pages/Stats';
import { AchievementsPage } from './pages/Achievements';
import { SettingsPage } from './pages/Settings';
import { AchievementToast } from './components/Toast';
import { useAchievements } from './hooks/useAchievements';
import { useTheme } from './hooks/useTheme';

export default function App() {
  useTheme();
  const { lastUnlocked } = useAchievements();
  const handleDone = useCallback(() => {}, []);

  return (
    <BrowserRouter>
      <AchievementToast achievementId={lastUnlocked} onDone={handleDone} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="exercises" element={<ExercisesPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="workout" element={<WorkoutPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
