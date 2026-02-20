# Narrative Canon

Version: 1.1  
Status: Validated

## FULL_HOME_INTRO

La narrativa completa de Home (`/`) solo puede ejecutarse en estos 2 casos:

1. Cuando el usuario escribe la URL en el navegador y entra a `"/"`.
2. Cuando el usuario hace refresh estando en `"/"`.

Esta narrativa es la intro larga validada (logo completo + secuencia completa + reveal).

## NAV_INTRO

En toda navegación interna del sitio se debe usar `NAV_INTRO`.

`NAV_INTRO` debe mantener exactamente el mismo lenguaje visual y timings de la intro general en:

1. Regeneración del logo (mismo timing del loop).
2. Radial reveal (misma duración).
3. Entrada del header (misma animación y timing).
4. Entrada del hero (misma animación y timing).
5. Blur, fondo y resto de integración visual.

Única diferencia permitida:

1. Solo 1 ciclo de logo.
2. Sin fases `lift`, `drop`, `bounce`.

## Rutas internas incluidas en NAV_INTRO

1. Logo del header -> `"/"`.
2. Item `Momentos` -> `"/momentos"`.
3. Item `Estudio` -> `"/estudio"`.
4. Item `Contacto` -> `"/contacto"`.
5. Scene cards -> `"/proyectos/:id"`.
6. Mini-menú de proyectos -> `"/proyectos/:id"`.

## Criterio operativo

1. `FULL_HOME_INTRO` se decide solo por contexto de entrada externa a `"/"`.
2. `NAV_INTRO` se decide para cualquier transición interna SPA.
3. La decisión del tipo de intro debe vivir en un único punto central (shell de transición).
