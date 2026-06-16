import Dexie, { type EntityTable } from 'dexie'
import type { Exercise, WorkoutTemplate, WorkoutSession, Settings, UnlockedAchievement } from '../types'

export const db = new Dexie('fitly') as Dexie & {
  exercises: EntityTable<Exercise, 'id'>
  templates: EntityTable<WorkoutTemplate, 'id'>
  sessions: EntityTable<WorkoutSession, 'id'>
  settings: EntityTable<Settings, 'id'>
  achievements: EntityTable<UnlockedAchievement, 'id'>
}

db.version(1).stores({
  exercises: '++id, name, *muscleGroups, *tags',
  templates: '++id, name',
  sessions: '++id, date',
  settings: 'id',
})

db.version(2).stores({
  exercises: '++id, name, *muscleGroups, *tags',
  templates: '++id, name',
  sessions: '++id, date',
  settings: 'id',
  achievements: 'id',
})

export async function seedExercises() {
  const count = await db.exercises.count()
  if (count > 0) return

  await db.exercises.bulkAdd([
    { name: 'Press de banca con barra', muscleGroups: ['Pecho'], tags: ['Fuerza', 'Compuesto'], instructions: 'Acuéstate en el banco, baja la barra al pecho y empuja hacia arriba.' },
    { name: 'Press de banca inclinado con mancuernas', muscleGroups: ['Pecho'], tags: ['Hipertrofia', 'Compuesto'], instructions: 'En banco a 45°, sube y baja mancuernas controladamente.' },
    { name: 'Aperturas con mancuernas', muscleGroups: ['Pecho'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Acostado, abre los brazos en arco y vuelve al centro.' },
    { name: 'Flexiones', muscleGroups: ['Pecho', 'Tríceps'], tags: ['Calistenia', 'Compuesto'], instructions: 'Cuerpo recto, baja el pecho al suelo y sube.' },
    { name: 'Dominadas', muscleGroups: ['Espalda', 'Bíceps'], tags: ['Calistenia', 'Compuesto'], instructions: 'Cuélgate y sube hasta que la barbilla pase la barra.' },
    { name: 'Remo con barra', muscleGroups: ['Espalda'], tags: ['Fuerza', 'Compuesto'], instructions: 'Inclínado, lleva la barra al abdomen.' },
    { name: 'Jalón al pecho', muscleGroups: ['Espalda'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Sentado, baja la polea al pecho.' },
    { name: 'Press militar con barra', muscleGroups: ['Hombros'], tags: ['Fuerza', 'Compuesto'], instructions: 'De pie, empuja la barra sobre la cabeza.' },
    { name: 'Elevaciones laterales', muscleGroups: ['Hombros'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'De pie, sube mancuernas a los lados hasta la altura de hombros.' },
    { name: 'Pájaro', muscleGroups: ['Hombros'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Inclínado, abre los brazos hacia atrás.' },
    { name: 'Curl con barra', muscleGroups: ['Bíceps'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'De pie, sube la barra hacia los hombros.' },
    { name: 'Curl martillo', muscleGroups: ['Bíceps'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Mancuernas en posición neutra, sube alternando.' },
    { name: 'Fondos en paralelas', muscleGroups: ['Tríceps', 'Pecho'], tags: ['Calistenia', 'Compuesto'], instructions: 'Baja y sube con los brazos.' },
    { name: 'Extensión de tríceps con cuerda', muscleGroups: ['Tríceps'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'En polea, empuja la cuerda hacia abajo.' },
    { name: 'Sentadilla con barra', muscleGroups: ['Cuádriceps', 'Isquiotibiales', 'Glúteos'], tags: ['Fuerza', 'Compuesto'], instructions: 'Barra en la espalda, baja hasta paralela y sube.' },
    { name: 'Prensa de piernas', muscleGroups: ['Cuádriceps', 'Glúteos'], tags: ['Fuerza', 'Compuesto'], instructions: 'En la máquina, empuja el peso con las piernas.' },
    { name: 'Zancadas con mancuernas', muscleGroups: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'], tags: ['Hipertrofia', 'Compuesto'], instructions: 'Da un paso al frente y baja la rodilla trasera.' },
    { name: 'Peso muerto convencional', muscleGroups: ['Espalda', 'Glúteos', 'Isquiotibiales'], tags: ['Fuerza', 'Compuesto'], instructions: 'Desde el suelo, levanta la barra con la espalda recta.' },
    { name: 'Curl femoral acostado', muscleGroups: ['Isquiotibiales'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Acostado, flexiona las piernas hacia los glúteos.' },
    { name: 'Elevación de talones de pie', muscleGroups: ['Pantorrillas'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'De puntillas, sube y baja controladamente.' },
    { name: 'Plancha', muscleGroups: ['Abdominales'], tags: ['Resistencia', 'Aislamiento'], instructions: 'Antebrazos en el suelo, cuerpo recto, aguanta el tiempo.' },
    { name: 'Elevación de piernas colgado', muscleGroups: ['Abdominales'], tags: ['Hipertrofia', 'Aislamiento'], instructions: 'Colgado, sube las piernas rectas.' },
    { name: 'Ciclismo', muscleGroups: ['Cardio'], tags: ['Cardio', 'Resistencia'], instructions: 'Pedalea a ritmo constante o intervalos.' },
    { name: 'Burpees', muscleGroups: ['Cuerpo completo'], tags: ['Cardio', 'Calistenia'], instructions: 'Flexión, salto atrás, salto adelante, salto vertical.' },
  ])
}
