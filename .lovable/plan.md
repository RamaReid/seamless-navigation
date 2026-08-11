# Por qué el loader no corta

## Diagnóstico (medido en el navegador, home `/`)

Cronología real de un arranque en frío:

```text
1.6 s   revista lista (postMessage REVISTA_READY)
4.4 s   fin del ciclo 1 del logo (animationend de str5)
7.2 s   fin del ciclo 2 -> recién ahí se abre la compuerta (gate)
7.2 s   lift (2 s)
9.3 s   drop (0.55 s)
10.1 s  bounce (0.4 s)
10.8 s  empieza el reveal radial (5 s)
15.6 s  el loader desaparece
```

El loader no "corta" porque no está esperando a que el contenido esté listo: el contenido ya está listo a los ~1.6 s. Lo que lo retiene son tres tiempos fijos en `src/components/Loader.tsx`:

1. `COLD_START_CYCLES = 2`: exige dos dibujados completos del logo (~7.2 s) aunque todo esté cargado.
2. La cadena lift + drop + bounce (~3.5 s) siempre se ejecuta completa.
3. `RADIAL_REVEAL_DURATION = 5000`: el reveal radial dura 5 s enteros, y el loader sólo se desmonta al terminar.

No hay bug ni cuelgue: el timeout de seguridad de 14 s no llega a activarse. Es duración de diseño.

## Cambio propuesto

Que el loader corte apenas el sistema esté listo, manteniendo la coreografía original pero comprimida:

- Cerrar el ciclo actual del logo en cuanto el gate esté listo, en vez de exigir 2 ciclos completos: si al terminar el ciclo 1 ya hay `assetsReady` + `revistaReady`, pasar a post-loop (arranque ~4.4 s en vez de 7.2 s).
- Reducir el reveal radial de 5 s a 2.2 s (mismo easing cúbico, misma máscara).
- Reescalonar las revelaciones de capa dentro de la nueva duración: header 0.4 s, blur 0.9 s, hero 1.5 s (hoy 1 s / 2 s / 3 s).
- Mantener lift/drop/bounce tal cual (es la firma de marca) y mantener el timeout de seguridad de 14 s.

Resultado esperado: loader completo en ~9 s en frío y ~2-3 s en navegación interna, sin perder ninguna animación original.

## Detalle técnico

Sólo se toca `src/components/Loader.tsx`:

- `COLD_START_CYCLES`: 2 -> 1, con la condición de ciclo extra sólo si el gate aún no está listo (la lógica de `loopKey` ya lo soporta: reinicia el loop mientras falten condiciones).
- `RADIAL_REVEAL_DURATION`: 5000 -> 2200.
- `HEADER_REVEAL_MS` 1000 -> 400, `BLUR_REVEAL_MS` 2000 -> 900, `HERO_REVEAL_MS` 3000 -> 1500.

Sin cambios en CSS, en el gate de assets ni en la revista.

## Verificación

Volver a medir en el navegador la cronología (gate, fases, desaparición de `#intro-layer`) y confirmar que `header-visible`, `reveal-blur` y `hero-visible` se aplican en orden y que el loader desaparece en ~9 s en frío.
