# Versión mobile first

Objetivo: que el sitio se vea y funcione pensado primero para el celular, sin cambiar nada de lo que ya funciona en pantalla grande.

## Decisiones tomadas

- En el celular, la portada muestra un carrusel de fotos (una foto de cada casa) en lugar de la revista de doble página.
- El menú se abre como un panel a pantalla completa.
- Se adaptan todas las páginas: Inicio, Momentos, cada proyecto, Estudio y Contacto.
- La animación de inicio se mantiene igual, solo ajustada al tamaño de la pantalla.

## Qué se hace, página por página

### Base (todo el sitio)
- Márgenes, tamaños de letra y espacios pensados primero para pantalla chica y luego ampliados en pantallas grandes.
- Textos que hoy son muy grandes en el celular (títulos de 40px, párrafos de 26px) pasan a una escala que se adapta sola al ancho.
- Todos los botones y enlaces con área de toque cómoda (mínimo 44px) y sin efectos que dependan de pasar el mouse.
- Nada de desplazamiento horizontal accidental.

### Encabezado y menú
- Barra más compacta: logo más chico, sin la frase larga al lado.
- El botón de menú abre un panel que cubre toda la pantalla, con los enlaces grandes y un botón claro para cerrar. Se bloquea el desplazamiento del fondo mientras está abierto y se cierra al elegir un destino.
- El menú de proyectos se muestra como lista vertical dentro de ese panel, no como tira flotante.

### Inicio
- El carrusel del celular se mejora: se pasa con el dedo, una foto por vez que ocupa la pantalla, con el nombre de la casa encima y puntos de posición abajo.
- Las secciones de fotos pasan a una sola columna con separación cómoda.
- La animación de apertura se mantiene, con el logo escalado al ancho del teléfono.

### Momentos
- El collage pasa a una columna, con las fotos en orden narrativo y los capítulos de texto intercalados.
- Los saltos a cada capítulo siguen funcionando desde el menú.

### Cada proyecto
- Foto principal a pantalla completa, título y datos debajo.
- Galería en una columna (o dos en teléfonos anchos), y al tocar una foto se abre en grande ocupando la pantalla, con cierre por botón y por gesto.

### Estudio y Contacto
- Texto en una columna legible, íconos de contacto grandes y tocables, y los enlaces de teléfono/mail que abren la app correspondiente.

### Pie de página
- Íconos en fila con separación pareja, sin depender del efecto de pasar el mouse.

## Detalles técnicos

- Reescribir los bloques responsive de `src/index.css` y `src/styles/gd-home.css` con enfoque mobile-first: estilos base para pantalla chica y `min-width` para ampliar, en lugar de la cascada actual de `max-width`.
- `Header.tsx`: nuevo estado de panel a pantalla completa, bloqueo de scroll del body, cierre por ruta y por tecla Escape; `ProjectsNav.tsx` renderiza en modo lista cuando está dentro del panel.
- `HeroRevista.tsx`: mantener el corte por `useIsMobile`, reemplazar el carrusel de scroll libre por uno con ajuste por slide, indicadores y precarga solo de la primera imagen; el resto en carga diferida.
- `Momentos.tsx` y `Proyecto.tsx`: grillas a una columna por defecto y columnas extra desde `md`; lightbox con `object-contain` a pantalla completa y cierre por gesto.
- Imágenes con `loading="lazy"`, `decoding="async"` y `sizes` acorde al ancho real para bajar el peso en datos móviles.
- Verificación con navegador a 390x844 y 768x1024, y revisión de que no aparezcan errores de compilación.

## Fuera de alcance

- No se toca la revista de doble página del escritorio ni su lógica de pasar hojas.
- No se cambian textos, fotos ni la estructura de contenido.
