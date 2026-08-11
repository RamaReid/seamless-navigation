# Ocultar el badge de Lovable de la página

## Situación actual
El logo/badge flotante de Lovable no está en el código del proyecto — es inyectado por la plataforma en el preview y en el sitio publicado. Actualmente `hide_badge` es `false` (visible).

## Cambio
Cambiar `hide_badge` a `true` con `publish_settings--set_badge_visibility`. No se toca ningún archivo del proyecto.

## Verificación
Recargar el preview y confirmar que el badge flotante de Lovable ya no aparece.
