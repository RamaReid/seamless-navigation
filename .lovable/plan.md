# Por qué el loader no corta

## Diagnóstico (medido en el navegador, home `/`)

```text
1.6 s   revista lista (postMessage REVISTA_READY)
4.4 s   fin del ciclo 1 del logo
7.2 s   fin del ciclo 2 -> se abre la compuerta (gate)
7.2 s   lift (2 s)
9.3 s   drop (0.55 s)
10.1 s  bounce (0.4 s)
10.8 s  empieza el reveal radial (5 s)
15.6 s  el loader desaparece
```

No hay cuelgue ni timeout: el segundo ciclo termina a los 7.2 s, pero después quedan ~8.4 s de cola fija (lift/drop/bounce + un reveal radial de 5 s) antes de que el loader se desmonte.

## Cambio propuesto

Mantener los 2 ciclos completos del logo y hacer que el corte ocurra apenas termina el segundo:

- Se conservan `COLD_START_CYCLES = 2` y la coreografía lift + drop + bounce sin tocar (firma de marca).
- Se acorta el reveal radial de 5 s a 1.6 s, que es lo que hoy estira el final.
- Se reescalonan las revelaciones de capa dentro de esa nueva duración: header 0.3 s, blur 0.7 s, hero 1.1 s (hoy 1 s / 2 s / 3 s).

Resultado: el loader desaparece a los ~10.5 s en vez de ~15.6 s, encadenado directamente al final del segundo ciclo, sin perder ninguna animación original.

## Detalle técnico

Sólo se toca `src/components/Loader.tsx`:

- `RADIAL_REVEAL_DURATION`: 5000 -> 1600.
- `HEADER_REVEAL_MS` 1000 -> 300, `BLUR_REVEAL_MS` 2000 -> 700, `HERO_REVEAL_MS` 3000 -> 1100.
- Sin cambios en ciclos, CSS, gate de assets ni revista. Se mantiene el timeout de seguridad de 14 s.

## Verificación

Medir de nuevo en el navegador la cronología (gate, fases, desaparición de `#intro-layer`) y confirmar que `header-visible`, `reveal-blur` y `hero-visible` se aplican en orden y que el loader corta justo después del segundo ciclo.
