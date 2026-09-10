# Probar la versión celular con mouse y teclado

Hoy, en la vista de celular, el carrusel de la portada y el visor de fotos solo responden bien al dedo. En la vista previa (donde se usa mouse y teclado) cuesta pasar de foto. La idea es que todo lo que se hace con el dedo también se pueda hacer arrastrando con el mouse o con las teclas.

## Qué va a cambiar

**Carrusel de la portada (celular)**
- Arrastrar con el mouse hacia los lados para pasar de casa, igual que con el dedo.
- Flechas del teclado (izquierda/derecha) para pasar de casa cuando el carrusel está enfocado.
- Los puntitos de abajo pasan a ser botones: al hacer clic saltan a esa casa.
- Un arrastre no debe abrir la casa por error: solo el clic sin arrastre entra al proyecto.

**Visor de fotos ampliadas**
- Arrastrar con el mouse: a los lados cambia de foto, hacia abajo cierra (mismos gestos que con el dedo).
- Rueda del mouse horizontal también cambia de foto.
- Se mantienen las teclas ya existentes: flechas para navegar y Escape para cerrar.

**Menú a pantalla completa**
- Se puede recorrer con Tab y activar con Enter; Escape lo cierra (ya funciona).

## Detalles técnicos

- `src/components/HeroRevista.tsx` (`MobileHeroCarousel`): handlers `pointerdown`/`pointermove`/`pointerup` sobre la pista, moviendo `scrollLeft` durante el arrastre y haciendo `scrollTo` con snap al soltar; umbral de ~40px para distinguir arrastre de clic y `preventDefault` en el clic del enlace si hubo arrastre. `tabIndex={0}` + `onKeyDown` para flechas. Los puntos pasan a `<button>` con `aria-label` y `scrollTo` al índice.
- `src/pages/Proyecto.tsx`: reutilizar la lógica de `touchStartRef` generalizándola a eventos de puntero (`onPointerDown`/`onPointerUp` en `.gd-lightbox-inner`), manteniendo los umbrales actuales (50px lateral, 80px vertical). Añadir `onWheel` con `deltaX` para navegación lateral.
- `src/styles/gd-mobile.css`: `cursor: grab`/`grabbing` en la pista, `user-select: none` durante el arrastre y estilos de los puntos como botones (área táctil mínima 44px con relleno transparente).
- Sin cambios en escritorio ni en la revista; sin librerías nuevas.
