export interface Exercise {
  id?: number;
  name: string;
  muscleGroups: string[];
  tags: string[];
  video?: string;
  instructions: string;
}

export interface WorkoutTemplate {
  id?: number;
  name: string;
  exercises: number[]; // Exercise ids
}

export interface WorkoutSession {
  id?: number;
  date: number; // timestamp
  duration: number; // seconds
  sets: SetEntry[];
}

export interface SetEntry {
  id?: number;
  exerciseId: number;
  exerciseName: string;
  weight: number;
  reps: number;
  rir: number;
  restTime: number;
  completedAt: number;
}

export interface Settings {
  id: number;
  theme: 'dark' | 'light' | 'system';
  weightUnit: 'kg' | 'lb';
  restTimer: number;
  timerSound: boolean;
  healthConnectEnabled: boolean;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UnlockedAchievement {
  id: string;
  unlockedAt: number;
}

export const DEFAULT_SETTINGS: Settings = {
  id: 1,
  theme: 'dark',
  weightUnit: 'kg',
  restTimer: 90,
  timerSound: true,
  healthConnectEnabled: false,
};

export const MUSCLE_GROUPS = [
  'Pecho',
  'Espalda',
  'Hombros',
  'Bíceps',
  'Tríceps',
  'Cuádriceps',
  'Isquiotibiales',
  'Glúteos',
  'Pantorrillas',
  'Abdominales',
  'Cardio',
  'Cuerpo completo',
] as const;

export const EXERCISE_TAGS = [
  'Fuerza',
  'Hipertrofia',
  'Resistencia',
  'Calistenia',
  'Cardio',
  'Estiramiento',
  'Compuesto',
  'Aislamiento',
] as const;
