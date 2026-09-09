# Corregir el comportamiento del encabezado en el inicio

## Qué pasa hoy

Verificado en el código actual:

1. Al terminar la intro, en la página de inicio se activan a la vez el encabezado y la revista (`src/pages/Index.tsx`, líneas 21-29). Nunca se quita el encabezado, así que no existe el momento "aparece y se vuelve a ocultar" cuando entra la revista.
2. Al hacer scroll, el encabezado se muestra pasados 150 px y ya no se vuelve a ocultar nunca: el manejador de scroll solo agrega la clase, no la quita al volver arriba (`src/components/Header.tsx`, líneas 86-97, con el comentario que lo dice explícitamente).

Resultado: el encabezado queda fijo desde el arranque y después del scroll, en lugar de seguir la coreografía original.

## Qué se va a hacer

- Restituir el compás original en el inicio: el encabezado aparece unos instantes después de la intro y se oculta cuando entra en escena la revista.
- Al volver a la zona superior de la página (revista a la vista), el encabezado se vuelve a ocultar en lugar de quedar fijo.
- Se mantiene la regla de reaparición por inactividad: si no se toca la revista durante unos segundos estando arriba, el encabezado vuelve a mostrarse; cualquier interacción con la revista lo oculta de nuevo.
- Con la página desplazada hacia abajo, el encabezado sigue visible como hasta ahora.

## Detalle técnico

- `src/pages/Index.tsx`: separar los dos momentos con el ritmo original (BEAT 465 ms) — encabezado a 3 BEATs, y a 8 BEATs se quita `header-visible` y se agrega `hero-visible` + evento `heroVisible`. Limpiar los temporizadores al desmontar.
- `src/components/Header.tsx`: en el manejador de scroll, cuando `scrollY <= 150` quitar `header-visible` y reprogramar el temporizador de inactividad del hero (solo en rutas con hero, es decir inicio); por encima del umbral, mantener el comportamiento actual.
- No se tocan duraciones de animación, z-index ni estilos.
