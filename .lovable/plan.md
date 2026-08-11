# Corte del loader al completar los dos ciclos

## Situación actual (medida en el navegador, home `/`)

```text
1.6 s   revista lista (REVISTA_READY)
4.4 s   fin del ciclo 1 del logo
7.2 s   fin del ciclo 2 -> se abre la compuerta (gate)
7.2 s   pausa post-loop + lift (2 s)
9.3 s   drop (0.55 s)
10.1 s  bounce (0.4 s)
10.8 s  empieza el reveal radial (5 s)
15.6 s  el loader desaparece
```

Los dos ciclos ya se cumplen a los 7.2 s. Todo lo que sigue son ~8.4 s de cola fija.

## Objetivo

El loader corta cuando se cumplen los dos ciclos: al terminar el segundo dibujado del logo arranca de inmediato la salida, sin pausa intermedia y sin estirar el reveal.

## Cambio propuesto

- Se mantienen los 2 ciclos completos (`COLD_START_CYCLES = 2`) y el gate de assets/revista tal cual.
- Se elimina la pausa post-loop de 100 ms: al detectar el fin del ciclo 2 se entra directo en la salida.
- Se comprime la coreografía de salida (lift + drop + bounce) para que ocupe ~1.2 s en lugar de ~3 s, conservando las mismas animaciones originales y su orden.
- Se acorta el reveal radial de 5 s a 1.2 s, con el mismo easing cúbico y la misma máscara.
- Se reescalonan las capas dentro del reveal: header 0.2 s, blur 0.5 s, hero 0.9 s.

Resultado esperado: el loader desaparece a los ~9.6 s, encadenado sin huecos al final del segundo ciclo (hoy ~15.6 s). En navegación interna (1 ciclo, sin lift/drop/bounce) el corte queda en ~1.5 s tras el ciclo.

## Detalle técnico

Sólo se toca `src/components/Loader.tsx` (y las duraciones de las animaciones de salida que se declaran ahí mismo en `getPhaseClass`):

- Gate: entrar a `lift` sin el `setTimeout(..., 100)` intermedio.
- `lift` 2 s -> 0.7 s, `drop` 0.55 s -> 0.3 s, `bounce` 0.4 s -> 0.25 s (mismos cubic-bezier).
- `RADIAL_REVEAL_DURATION`: 5000 -> 1200.
- `HEADER_REVEAL_MS` 1000 -> 200, `BLUR_REVEAL_MS` 2000 -> 500, `HERO_REVEAL_MS` 3000 -> 900.
- Sin cambios en CSS de strokes, en el conteo por `animationend` de `str5`, ni en la revista. Se mantiene el timeout de seguridad de 14 s.

## Verificación

Volver a medir en el navegador: fin del ciclo 2, inicio de lift, inicio del reveal y desaparición de `#intro-layer`, confirmando que no queda ningún hueco muerto y que `header-visible`, `reveal-blur` y `hero-visible` se aplican en orden.
