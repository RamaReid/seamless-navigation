# Sistema mobile-first de GD

Este documento reúne los criterios visuales y de interacción aplicados hasta 768 px. La versión móvil no reduce la composición desktop: organiza la experiencia como un recorrido editorial de **imagen → forma de habitar → escenas → proyectos → contacto**.

## Principios

- La arquitectura y las fotografías tienen la primera jerarquía.
- El texto acompaña la lectura de la imagen: una idea principal por escena, frases sintéticas y sin repetir lo que ya muestra la fotografía.
- La proximidad comunica pertenencia: 12–16 px entre elementos relacionados y aproximadamente 32 px entre escenas.
- Los contenedores visibles se reservan para agrupaciones funcionales, especialmente selectores y galerías.
- El fondo, el blur y las transiciones funcionan como atmósfera secundaria y no bloquean el scroll.

## Tipografía

- Georgia, con `Times New Roman` y `serif` como alternativas.
- Peso regular `400` como base; no se comprime el texto para hacerlo entrar.
- `letter-spacing: normal` para preservar legibilidad.
- Títulos principales con interlineado `1.15`.
- Títulos de capítulo entre 22 y 28 px, con interlineado `1.25`.
- Descripciones de 18 px, con interlineado `1.55` y alineación izquierda.
- Navegación y formularios de 16 px como referencia, con controles de al menos 44–48 px.
- Márgenes laterales de lectura de 15 px.

## Home

- La fotografía principal mantiene formato 1:1, ocupa todo el ancho disponible y no lleva marco, borde, margen ni texto visible.
- El mismo tratamiento de imagen hero se aplica en Estudio y en las fichas de proyecto. Momentos conserva un índice vertical de acciones porque su apertura no es un hero singular.
- El header mantiene sus animaciones y comportamiento. En móvil usa una fila compacta de 48 px, logo de 62 px, botón de 44 px y hamburger de 23 px con trazos de 1.5 px.
- El blur queda localizado dentro del header, con base oscura al 72 % y radio de 12 px.
- El selector de proyectos usa Embla con loop, sin autoplay. Tiene 15 px de margen lateral, miniaturas cuadradas separadas 8 px y una selección centrada con tres imágenes completas más fragmentos laterales.
- El selector admite click, tap, teclado y arrastre. Arrastrar no impide el scroll vertical.
- El único texto visible del umbral es `El escenario de tu vida`, fuera del contenedor del selector.

## Tríadas

Las tríadas conservan sus tres imágenes, orden y peso narrativo. En móvil se recorren en un carrusel horizontal finito independiente del scroll vertical: una imagen completa y una porción de la siguiente. El título y el texto compartido quedan fuera de las fotografías.

El selector Home es infinito porque selecciona proyectos. Las tríadas son finitas porque desarrollan una escena.

## Accesibilidad y movimiento

- Las imágenes conservan textos alternativos y los controles mantienen nombres accesibles aunque no muestren etiquetas visuales.
- El header conserva foco, Escape, restauración de foco y navegación de menú.
- Lightbox, navegación entre rutas y anclas existentes se mantienen.
- `prefers-reduced-motion` reduce transiciones y animaciones sin impedir la interacción.
- Los únicos desplazamientos horizontales intencionales son el selector Home y las tríadas.

## Compatibilidad

Las rutas, identificadores de proyectos y APIs externas no cambian. Los estilos móviles se limitan a `max-width: 768px`; la composición desktop conserva su estructura original.
