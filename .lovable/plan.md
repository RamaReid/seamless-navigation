# Cortar el loader al terminar el segundo ciclo

## Situación actual (medida en el navegador, home `/`)

```text
1.6 s   revista lista (REVISTA_READY)
4.4 s   fin del ciclo 1 del logo
7.2 s   fin del ciclo 2 -> se abre la compuerta (gate)
7.2 s   pausa + lift (2 s)
9.3 s   drop (0.55 s)
10.1 s  bounce (0.4 s)
10.8 s  reveal radial (5 s)
15.6 s  el loader desaparece
```

Los dos ciclos se cumplen a los 7.2 s. Lo demás es cola fija.

## Objetivo

El loader corta exactamente al terminar el segundo ciclo del logo. Nada más.

## Cambio propuesto

Al detectar el fin del ciclo 2 (el `animationend` de `str5` que deja `loaderCycles === 2`), con `assetsReady` y `revistaReady` ya en true, pasar directamente a `complete`:

- Saltar las fases `post-loop`, `lift`, `drop`, `bounce` y `reveal`.
- Desmontar el loader (`setVisible(false)`) y disparar `onComplete`.
- Aplicar de inmediato `header-visible`, `reveal-blur` y `hero-visible` para que la página quede visible sin hueco.

El loader desaparece a los ~7.2 s, justo al cerrar el segundo ciclo.

## Detalle técnico

Sólo se toca `src/components/Loader.tsx`:

- En el gate final, para arranque en frío (`!isNavSkip`), ir directo a `setPhase('complete')` + `setVisible(false)` + `onComplete?.()` en vez de entrar a `post-loop`/`lift`.
- Mantener el comportamiento de navegación interna (1 ciclo) tal cual está, salvo que también corte al cerrar su ciclo.
- Las clases `header-visible`/`reveal-blur`/`hero-visible` se aplican en el mismo instante del corte (Index ya las gestiona en `transitionComplete`).
- Sin cambios en ciclos, CSS, gate de assets ni revista. Se mantiene el timeout de seguridad de 14 s.

## Verificación

Medir en el navegador: fin del ciclo 2 y desaparición de `#intro-layer` en el mismo instante (~7.2 s), con `header-visible`, `reveal-blur` y `hero-visible` aplicados.
