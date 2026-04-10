
## [1.2.1] - 2026-04-09

### 🔄 Carga Incremental Sincronizada
- **Sincronización Bajo Demanda**: Implementación de una tarjeta de "Cargar Más" en la última página que permite sincronizar 5 páginas adicionales (100 personajes) de la API oficial con un solo clic.
- **Carga Inicial Ultrarrápida**: Reducción del volumen de datos inicial a las primeras 10 páginas, optimizando el tiempo de respuesta en el primer acceso.
- **UI Proactiva**: La tarjeta de carga aparece solo cuando hay datos pendientes en el multiverso externo.

## [1.2.0] - 2026-04-09

### 🚀 Optimización y Rendimiento
- **Caché de Base de Datos**: `getCharController` ahora persiste los personajes en la DB local (PostgreSQL), reduciendo el tiempo de carga de ~5s a <100ms en visitas subsiguientes.
- **Sincronización Dinámica**: El backend ahora detecta automáticamente el número total de páginas de la API externa para una sincronización completa y robusta.
- **Feedback Visual**: Implementación de una animación de **Portal Dimensional** personalizada durante la carga inicial de datos.
- **Estado Global**: Integración de indicadores de carga (`isLoading`) en Redux Toolkit.
 
### 🔵 Modernización
- **Tech Stack**: Actualización masiva de dependencias en Frontend y Backend.
- **Frontend**: Migración a **React 19**, **Redux Toolkit 2.x**, **Vite 6+**, **React Router 7**.
- **Backend**: Actualización a **Express 5**, **Sequelize 6.37**, **Axios 1.15**.
- **Estabilidad**: Resolución de vulnerabilidades y optimización de auditoría de paquetes.

## [1.0.0] - 2026-04-01

### 🟢 Añadido
- **Servicio Centralizado**: Creación de `src/services/api.js` con Axios.
- **Botón Random**: Funcionalidad de añadir personaje aleatorio (1-826) en SearchBar.
- **Glassmorphism**: Nuevo diseño visual para Cards, NavBar y Formulario.
- **Testing**: Integración de `vitest` y pruebas unitarias para `Validation.js`.
- **Accesibilidad**: Labels ARIA y descripciones dinámicas de imágenes.
- **Fuentes Premium**: Integración de Google Fonts (`Orbitron`, `Roboto`).

### 🟡 Modificado
- **App.jsx**: Refactorización completa de la lógica de enrutamiento y autenticación.
- **Redux Slice**: Mejora en la optimización de los casos de Redux Toolkit.
- **Views Reestructuradas**: `About`, `Detail`, `Favorite` y `Home` ahora usan Grid de Bootstrap 5 correctamente.
- **Estilos Globales**: `style.css` completamente reescrito para un look premium.
- **Carpetas Backend**: Renombrado de `/scr` a `/src` para seguir estándares de la industria.

### 🔴 Corregido
- **Error de Inconsistencia**: El estado `setAccess` ahora maneja booleanos consistentes.
- **Error de ID duplicado**: Evita añadir personajes que ya están en la lista (basado en `allCards`).
- **Navegación Móvil**: El NavBar ya no colapsa sus elementos internos en viewports pequeños.
- **Errores de Red**: Manejo de errores en promesas (async/await) para avisar al usuario si el servidor está caído.

---
*Desarrollado con altos estándares de Ingeniería de Software.*
