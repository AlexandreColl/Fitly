<a id="readme-top"></a>

[![License](https://img.shields.io/badge/license-MIT-e94560?style=for-the-badge)]()
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?style=for-the-badge)]()
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)]()
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-3FC7EB?style=for-the-badge)]()
[![GitHub](https://img.shields.io/badge/GitHub-AlexandreColl-181717?style=for-the-badge&logo=github)](https://github.com/AlexandreColl/Fitly)

<br />
<div align="center">
  <a href="https://github.com/AlexandreColl/Fitly">
    <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  </a>
  <h1 align="center">Fitly</h1>

  <p align="center">
    App de rutinas de ejercicio offline-first con PWA
    <br />
    <a href="#-funcionalidades"><strong>Explorar funcionalidades »</strong></a>
    <br />
    <br />
    <a href="#-primeros-pasos">Primeros Pasos</a>
    &middot;
    <a href="https://github.com/AlexandreColl/Fitly/issues/new?labels=bug">Reportar Error</a>
    &middot;
    <a href="https://github.com/AlexandreColl/Fitly/issues/new?labels=enhancement">Solicitar Funcionalidad</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li>
      <a href="#-sobre-el-proyecto">Sobre el Proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido Con</a></li>
      </ul>
    </li>
    <li>
      <a href="#-primeros-pasos">Primeros Pasos</a>
      <ul>
        <li><a href="#requisitos">Requisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#-uso">Uso</a></li>
    <li><a href="#-comandos">Comandos</a></li>
    <li><a href="#-desarrollo">Desarrollo</a></li>
    <li><a href="#-estructura-del-proyecto">Estructura del Proyecto</a></li>
    <li><a href="#-roadmap">Roadmap</a></li>
    <li><a href="#-contribuir">Contribuir</a></li>
    <li><a href="#-licencia">Licencia</a></li>
    <li><a href="#-contacto">Contacto</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## 💪 Sobre el Proyecto

Fitly es una aplicación de rutinas de ejercicio progresiva (PWA) que funciona **100% offline** y **sin registro**. Todos los datos se guardan localmente en el dispositivo mediante IndexedDB, sin backend ni servidores.

Está construida con **React** + **TypeScript** + **Vite** + **Tailwind CSS** como PWA instalable, lo que permite usarla desde el navegador, instalarla en el móvil o en Windows, y más adelante empaquetarla con **Capacitor** para Android e iOS.

La app incluye una biblioteca de ejercicios clasificados por grupos musculares y tags, un sistema de entreno con temporizador de descanso, plantillas personalizables, historial, estadísticas y un sistema de logros.

Características principales:
* :books: **Biblioteca de ejercicios** — 24 ejercicios pre-cargados con búsqueda, filtros y videos embebidos de YouTube
* :pencil2: **CRUD de ejercicios** — creá, editá y eliminá tus propios ejercicios
* :muscle: **Entreno en vivo** — cronómetro, registro de peso/reps/RIR, temporizador de descanso con sonido y vibración
* :card_file_box: **Plantillas** — creá plantillas con ejercicios y empezá un entrono desde ellas
* :bar_chart: **Estadísticas** — volumen total, marcas personales, top ejercicios y gráfico de progreso
* :trophy: **Logros** — 19 logros desbloqueables con rachas, volumen, series y condiciones especiales
* :floppy_disk: **Export/Import** — backup completo de todos los datos en JSON
* :art: **Temas** — oscuro, claro y seguimiento del sistema
* :zap: **PWA** — instalable, offline, service worker con Workbox

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

### Construido Con

* [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
* [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
* [![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
* [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
* [![Dexie](https://img.shields.io/badge/Dexie-4.x-0EA5E9?style=for-the-badge&logo=indexeddb&logoColor=white)](https://dexie.org/)
* [![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
* [![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://vite-pwa-org.netlify.app/)
* [![Lucide](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- GETTING STARTED -->
## 🚀 Primeros Pasos

Para obtener una copia local y ejecutarla, seguí estos pasos.

### Requisitos

* **Node.js** v18 o superior
* **pnpm**
  ```sh
  npm install -g pnpm
  ```

### Instalación

1. Cloná el repositorio
   ```sh
   git clone https://github.com/AlexandreColl/Fitly.git
   cd Fitly
   ```
2. Instalá las dependencias
   ```sh
   pnpm install
   ```
3. Iniciá en modo desarrollo
   ```sh
   pnpm dev
   ```

> [!NOTE]
> La app funciona completamente offline. No requiere conexión a internet ni registro de usuario.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- USAGE -->
## 🎮 Uso

### Inicio

La pantalla principal muestra un **resumen semanal**: racha actual de días consecutivos, entrenos esta semana, volumen total y minutos. Incluye un botón grande para empezar un entreno rápido y una lista de los últimos 3 entrenos.

### Ejercicios

Navegá a la sección **Ejercicios** para explorar la biblioteca en formato grilla. Usá el buscador o los filtros por grupo muscular y tags. Hacé clic en una tarjeta para abrir el modal con instrucciones y video. Usá el botón **Sugerir** para obtener ejercicios aleatorios o **Nuevo** para agregar tus propios ejercicios.

### Entreno

Andá a la sección **Entreno**, seleccioná un ejercicio, ingresá peso, repeticiones y RIR, y añadí series. El temporizador de descanso arranca automáticamente después de cada serie. Si venís desde una plantilla, los ejercicios aparecen en cola con barra de progreso.

### Plantillas

En **Plantillas** podés crear rutinas personalizadas seleccionando ejercicios con checkboxes. Cada plantilla permite **editar el nombre**, **reordenar los ejercicios** con flechas arriba/abajo, y **agregar o quitar** ejercicios. Una vez creada, se puede iniciar directamente y los ejercicios se encolan automáticamente.

### Estadísticas

La sección **Estadísticas** muestra un resumen global con volumen total, top ejercicios por volumen, marcas personales (peso máximo) y últimos entrenos.

### Logros

Completá entrenos para desbloquear logros. Hay 19 distribuidos en categorías: rachas de días consecutivos, volumen acumulado, series, entrenos totales y condiciones especiales como entrenar antes de las 7 AM o después de las 10 PM.

### Ajustes

| Opción | Descripción |
|--------|-------------|
| Tema | Oscuro, Claro o Seguir Sistema |
| Unidad de peso | kg o lb |
| Descanso por defecto | Tiempo en segundos |
| Sonido del temporizador | Activar/desactivar |
| Exportar backup | Descarga JSON con todos los datos |
| Importar backup | Restaura datos desde un JSON |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- COMMANDS -->
## ⌨️ Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo con HMR |
| `pnpm build` | Compila TypeScript + Vite para producción |
| `pnpm preview` | Previsualiza el build de producción |
| `pnpm build:mobile` | Build + Capacitor sync (Android/iOS) |
| `pnpm cap:android` | Abre Android Studio |
| `pnpm cap:ios` | Abre Xcode |
| `dev.bat` | (Windows) Inicia servidor de desarrollo con un clic |
| `build.bat` | (Windows) Compila producción con un clic |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- DEVELOPMENT -->
## 🛠️ Desarrollo

### Build producción

```sh
pnpm build
```

El resultado se genera en la carpeta `dist/` con el service worker y el manifest para PWA.

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Compila TypeScript + Vite para producción |
| `pnpm preview` | Sirve el build de producción localmente |
| `pnpm build:mobile` | Build web + `cap sync` |
| `pnpm cap:android` | Abre Android Studio para compilar APK/AAB |
| `pnpm cap:ios` | Abre Xcode para compilar IPA |
| `dev.bat` | Doble clic → `pnpm dev` (Windows) |
| `build.bat` | Doble clic → `pnpm build` (Windows) |

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- PROJECT STRUCTURE -->
## 📁 Estructura del Proyecto

```
fitly/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Navegación inferior con 8 secciones
│   │   ├── ExerciseForm.tsx    # Modal para crear/editar ejercicios
│   │   ├── VideoEmbed.tsx      # Reproductor de YouTube embebido
│   │   └── Toast.tsx           # Notificación de logro desbloqueado
│   ├── pages/
│   │   ├── Home.tsx            # Dashboard semanal: racha, volumen, últimos entrenos
│   │   ├── Exercises.tsx       # Biblioteca en grilla con modal detalle
│   │   ├── Templates.tsx       # Plantillas con nombre editable y reorden
│   │   ├── Workout.tsx         # Entreno en vivo con temporizador + confirmación
│   │   ├── History.tsx         # Historial con detalle expandible de series
│   │   ├── Stats.tsx           # Estadísticas y marcas personales
│   │   ├── Achievements.tsx    # Grid de 19 logros
│   │   └── Settings.tsx        # Configuración + export/import backup
│   ├── hooks/
│   │   ├── useExercises.ts     # CRUD de ejercicios
│   │   ├── useWorkout.ts       # Sesión activa con ids únicos por serie
│   │   ├── useSettings.ts      # Configuración persistente
│   │   ├── useTheme.ts         # Tema oscuro/claro/sistema
│   │   └── useAchievements.ts  # Detección y desbloqueo de 19 logros
│   ├── db/
│   │   └── index.ts            # Dexie schema (v2), tablas y seed 24 ejercicios
│   ├── lib/
│   │   ├── sound.ts            # Web Audio API para beep
│   │   └── achievements.ts     # Definición de los 19 logros + getAchievement()
│   ├── types/
│   │   └── index.ts            # Tipos: Exercise, WorkoutSession, SetEntry, AchievementDef...
│   ├── App.tsx                 # Router con 8 rutas + Toast de logros
│   ├── main.tsx                # Entry point React 19
│   └── index.css               # Tailwind v4 + tema claro/oscuro con overrides CSS
├── android/                    # Proyecto Android nativo (Capacitor)
├── ios/                        # Proyecto iOS nativo (Capacitor)
├── dist/                       # Build PWA (generado, no trackear)
├── public/
│   └── favicon.svg             # Icono de la app
├── capacitor.config.ts         # Configuración Capacitor
├── dev.bat                     # (Windows) pnpm dev con un clic
├── build.bat                   # (Windows) pnpm build con un clic
├── index.html                  # Meta tags PWA + viewport-fit
├── vite.config.ts              # React + Tailwind + PWA (Workbox)
├── tsconfig.json
└── package.json
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- ROADMAP -->
## 🗺️ Roadmap

- [x] Biblioteca de ejercicios con filtros y búsqueda
- [x] CRUD de ejercicios (crear, editar, eliminar)
- [x] Entreno en vivo con temporizador de descanso
- [x] Sonido y vibración al finalizar el descanso
- [x] Plantillas de entrenamiento personalizables
- [x] Historial de sesiones completadas
- [x] Estadísticas con volumen y marcas personales
- [x] Sistema de logros (19 logros)
- [x] Exportación e importación de datos (backup JSON)
- [x] Temas oscuro, claro y seguimiento del sistema
- [x] PWA con service worker y offline completo
- [x] Videos de YouTube embebidos inline + detección automática
- [x] Confirmación al finalizar entreno
- [x] Dashboard de inicio con resumen semanal
- [x] Editar nombre de plantillas
- [x] Reordenar ejercicios en plantillas
- [x] Detalle de sesión en historial (series individuales)
- [x] Fase 2: Empaquetado con Capacitor para Android e iOS
- [ ] Fase 3: Integración con Health Connect, Apple Health, Garmin, Fitbit, Polar

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- CONTRIBUTING -->
## 🤝 Contribuir

Las contribuciones hacen que la comunidad open source sea un lugar increíble para aprender, inspirar y crear. **Cualquier contribución que hagas será muy apreciada.**

Si tenés una sugerencia que mejore el proyecto, por favor hacé un fork del repositorio y creá un pull request. También podés abrir un issue con la etiqueta "enhancement".

1. Hacé un Fork del Proyecto
2. Creá tu Rama de Funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Commit tus Cambios (`git commit -m 'feat: add some amazing feature'`)
4. Push a la Rama (`git push origin feature/AmazingFeature`)
5. Abrí un Pull Request

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- LICENSE -->
## 📄 Licencia

Distribuido bajo la licencia MIT. Consultá `LICENSE` para más información.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- CONTACT -->
## 📫 Contacto

Alexandre Coll Molina — [LinkedIn](https://www.linkedin.com/in/alexandre-coll-molina/)

Project Link: [https://github.com/AlexandreColl/Fitly](https://github.com/AlexandreColl/Fitly)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>
