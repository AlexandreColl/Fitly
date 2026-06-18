import type { AchievementDef } from '../types';

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first_workout', title: 'Primer paso', description: 'Completá tu primer entreno', icon: '🎉' },
  { id: 'streak_3', title: 'Racha de 3', description: '3 días consecutivos entrenando', icon: '🔥' },
  { id: 'streak_7', title: 'Racha de 7', description: '7 días consecutivos entrenando', icon: '🔥' },
  { id: 'streak_14', title: 'Racha de 14', description: '14 días consecutivos entrenando', icon: '🔥' },
  { id: 'streak_30', title: 'Racha de 30', description: '30 días consecutivos entrenando', icon: '🔥' },
  { id: 'workouts_10', title: 'Dedicação', description: 'Completá 10 entrenos', icon: '💪' },
  { id: 'workouts_25', title: 'Constante', description: 'Completá 25 entrenos', icon: '💪' },
  { id: 'workouts_50', title: 'Vicio', description: 'Completá 50 entrenos', icon: '💪' },
  { id: 'workouts_100', title: 'Fitly Legend', description: 'Completá 100 entrenos', icon: '🏆' },
  { id: 'sets_50', title: 'Series básicas', description: 'Acumulá 50 series', icon: '📊' },
  { id: 'sets_200', title: 'Volumen medio', description: 'Acumulá 200 series', icon: '📊' },
  { id: 'sets_500', title: 'Adicto al hierro', description: 'Acumulá 500 series', icon: '📊' },
  { id: 'volume_1000', title: 'Calentando', description: 'Levantá 1.000 kg en total', icon: '🏋️' },
  { id: 'volume_10000', title: 'Bestia', description: 'Levantá 10.000 kg en total', icon: '🏋️' },
  { id: 'volume_50000', title: 'Tanque', description: 'Levantá 50.000 kg en total', icon: '🏋️' },
  { id: 'marathon', title: 'Maratoniano', description: 'Entreno de más de 90 minutos', icon: '⏱️' },
  { id: 'early_bird', title: 'Madrugador', description: 'Entrená antes de las 7 AM', icon: '🌅' },
  { id: 'night_owl', title: 'Búho nocturno', description: 'Entrená después de las 10 PM', icon: '🦉' },
  { id: 'variety', title: 'Variedad', description: 'Usá 12 ejercicios distintos', icon: '🎯' },
];

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find(a => a.id === id);
}
