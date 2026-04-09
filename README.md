# Project Overhaul: Rick & Morty Multiverse Portal

Este proyecto ha sido sometido a una profunda revisión técnica y estética, transformando una aplicación educativa básica en una plataforma web de alto rendimiento, visualmente impactante y accesible.

## 🚀 Mejoras Implementadas

### 1. Estética Premium (Rich Aesthetics)
- **Tema Dark Multiverso**: Implementación de una paleta de colores coherente (Verde Portal, Negro Espacial, Azul Neón).
- **Glassmorphism**: Efectos de desenfoque de fondo y transparencias en tarjetas, barras de navegación y formularios para un aspecto moderno.
- **Tipografía**: Incorporación de fuentes futuristas (`Orbitron`) combinadas con fuentes de alta legibilidad (`Roboto`).
- **Animaciones**: Transiciones suaves al interactuar con las tarjetas y botones.

### 2. Refactorización de Arquitectura
- **Capa de Servicios de API**: Extracción de todas las llamadas de red a un módulo centralizado (`src/services/api.js`), facilitando el mantenimiento y permitiendo el uso de variables de entorno (`.env`).
- **Redux Optimizado**: Uso de `async/await` y Redux Toolkit para una gestión de estado más limpia y predecible.
- **Corrección de Bugs**:
    - Se solucionó el problema de navegación reactiva en `App.jsx`.
    - Se arreglaron las redirecciones de acceso.
    - Se corrigió el typo de la carpeta del servidor (`scr` -> `src`).

### 3. Responsividad y UX
- **Sincronización Inicial**: Implementación del endpoint `GET /card/` que utiliza `getCharController` para poblar la base de datos local desde la API externa al cargar el Home por primera vez.
- **Mobile First**: Rediseño completo del `NavBar` y el sistema de filtros para ser totalmente funcionales en móviles mediante Bootstrap 5 Grid.

- **Acceso Rápido**: Se añadió un botón "Random" (RND) para añadir personajes aleatorios al instante.
- **Estados Vacíos**: Se mejoraron las vistas de Favoritos y Home para mostrar mensajes claros cuando no hay contenido.

### 4. Accesibilidad (WCAG AA)
- **Semántica**: Uso correcto de etiquetas HTML5 (`nav`, `main`, `section`, `header`).
- **ARIA**: Inclusión de `aria-label` en todos los botones visuales que carecen de texto.
- **Alt Text**: Todas las imágenes de personajes ahora cuentan con descripciones dinámicas (`alt="Character: Rick Sanchez"`).

### 5. Testing & DevOps
- **Vitest Integration**: Configuración inicial para pruebas unitarias.
- **Sample Tests**: Creación de pruebas para la lógica de validación.

### 6. Modernización de Dependencias (Actual)
- **Frontend**: Migración a **React 19**, **Redux Toolkit 2.x** y **Vite 6+**.
- **Backend**: Salto a **Express 5**, **Sequelize 6.37+** y **Axios 1.15**.
- **Seguridad**: Eliminación de vulnerabilidades mediante la alineación con las versiones más estables.
### 7. Seguridad de Contraseñas (Hashing)
- **Cifrado Robusto**: Las contraseñas de los usuarios ya no se guardan en texto plano. Se utiliza **bcryptjs** con un factor de costo (salt rounds) de **10**.
- **Autenticación Segura**: La verificación se realiza mediante comparaciones de hash, garantizando que incluso si la base de datos es comprometida, las contraseñas originales permanezcan protegidas.
- **Rutas Protegidas**: Se migraron los endpoints de autenticación de `GET` con parámetros en URL a `POST` con cuerpo (JSON) para evitar que las credenciales queden registradas en logs de red o servidores.
- **Rate Limiting**: Implementación de `express-rate-limit` para prevenir ataques de fuerza bruta en los intentos de login.
- **Script de Migración**: Se incluyó un script automático (`src/migratePasswords.js`) para hashear de forma segura las contraseñas de usuarios existentes sin perder acceso.
### 8. Filtros y Búsqueda Avanzada (AND Logic)
- **Búsqueda en Tiempo Real**: Implementación de un campo de búsqueda por nombre con **debounce** (400ms) para optimizar el rendimiento.
- **Lógica Combinada**: Los filtros de género, estado y la búsqueda por texto funcionan bajo un **AND lógico**. Solo los personajes que cumplan TODAS las condiciones activas son mostrados.
- **Estado Global Centralizado**: Refactorización del store de Redux para manejar los criterios de filtrado como un único objeto de estado, asegurando consistencia en la UI.
- **Feedback Visual**: Mensajes personalizados cuando no hay resultados que coincidan con los criterios aplicados.
## 🛠️ Cómo Ejecutar Localmente

### Frontend
```bash
cd RickAndMorty
npm install
npm run dev
```

### Backend (Prerrequisito: Postgres)
```bash
cd server
npm install
npm start
```
### Migración de Base de Datos
Si ya tienes usuarios creados, ejecuta el script de migración para hashear sus contraseñas:
```bash
cd server
node src/migratePasswords.js
```
---

## 📋 Lista de Cambios Detallada (CHANGELOG.md)
Puedes consultar todas las modificaciones técnicas en el archivo `CHANGELOG.md`.

---
*Desarrollado con ❤️ para los fans de Rick & Morty.*
