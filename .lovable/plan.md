# Cortar el loader siempre en el segundo ciclo (sin tocar la coreografía)

## Situación actual (medida en el navegador, home `/`)

```text
1.6 s   revista lista (REVISTA_READY)
4.4 s   fin del ciclo 1 del logo
7.2 s   fin del ciclo 2 -> gate
7.2 s   lift (2 s) -> drop (0.55 s) -> bounce (0.4 s) -> reveal (5 s)
15.6 s  el loader desaparece
```

La coreografía post-ciclo (lift/drop/bounce + reveal radial) es la original y **se conserva intacta**.

## Por qué a veces no corta en el segundo loop

El contador de ciclos reinicia el loop del logo con esta condición (en `Loader.tsx`):

```js
if (newCount < requiredCycles || (!assetsReady || !revistaReady)) {
  setLoopKey(prev => prev + 1);  // reinicia el loop
}
```

Y el gate final sólo se abre si:

```js
const allReady = (cyclesOk && assetsReady && revistaReady) || timedOut;
```

Si al cerrar el ciclo 2 todavía no llegaron `assetsReady` o `revistaReady` (conexión lenta, iframe tardando), el logo **sigue loopeando más allá del segundo ciclo** y el gate no abre hasta el timeout de 14 s. En el test headless la revista avisó a 1.6 s y por eso cortó en 2 ciclos, pero en el preview real o en frío con red lenta no siempre se cumple.

## Cambio propuesto

El loader corta **siempre** al terminar el segundo ciclo, independientemente de si assets/revista llegaron o no. La coreografía (lift → drop → bounce → reveal) se mantiene idéntica.

- Al cerrar el ciclo 2 (`loaderCycles === requiredCycles`), NO reiniciar el loop: dejar de loopear el logo y avanzar.
- El gate final abre con `cyclesOk` solo, sin exigir `assetsReady && revistaReady`: al segundo ciclo se pasa a post-loop y luego lift/drop/bounce/reveal como hoy.
- `assetsReady`/`revistaReady` dejan de ser condicionantes del corte: la revista/contenido ya está detrás del overlay y se irá revelando con el radial reveal igual que ahora.

Resultado: corte garantizado a los ~7.2 s del segundo ciclo + la coreografía original (~8.4 s) = el loader desaparece a los ~15.6 s, pero **nunca se queda colgado loopeando**.

## Detalle técnico

Sólo se toca `src/components/Loader.tsx`:

1. En el handler de `animationend` de `str5`:
   ```js
   if (newCount < requiredCycles) {
     setLoopKey(prev => prev + 1);  // reinicia sólo hasta cumplir los ciclos
   }
   ```
   Se quita el `|| (!assetsReady || !revistaReady)`.

2. En el gate final:
   ```js
   const allReady = cyclesOk || timedOut;
   ```
   Se quita `&& assetsReady && revistaReady`.

3. Se mantiene `assetsReady`/`revistaReady` como signals internas (logs) pero ya no bloquean el corte.

4. Sin cambios en CSS, duraciones, lift/drop/bounce, reveal radial, ni la revista. Se mantiene el timeout de seguridad de 14 s (ahora casi inútil, queda de red).

## Verificación

Medir en el navegador: confirmar que el logo hace exactamente 2 ciclos, luego arranca lift/drop/bounce/reveal sin loops extra, y `#intro-layer` desaparece a los ~15.6 s con `header-visible`, `reveal-blur` y `hero-visible` en orden.
