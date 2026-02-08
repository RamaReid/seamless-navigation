// Inicialización de PageFlip (versión estable + fix de ghosting)
// AUTO-CORNER EVENT-DRIVEN: Solo insinúa esquina ante intención real
document.addEventListener('DOMContentLoaded', function () {

    // =======================================
    // AUTO CORNER — EVENT DRIVEN (MENOS ROBÓTICO)
    // Solo activa cuando el mouse está cerca de la esquina
    // Se desactiva tras primer flip/interacción real
    // =======================================
    const autoCornerState = {
        active: false,
        rafId: null,
        lastRect: null,
        container: null,
        hasInteracted: false, // Se pone true tras primer flip/click
        hintTimeout: null,
        mouseNearCorner: false
    };

    // Distancia en px para considerar "cerca de la esquina"
    const CORNER_THRESHOLD = 120;
    const HINT_DURATION = 4000; // 4s de hint inicial máximo

    const dispatchCornerMove = (time) => {
        if (!autoCornerState.active || autoCornerState.hasInteracted) {
            stopAutoCorner();
            return;
        }
        if (!autoCornerState.container) {
            autoCornerState.container = document.getElementById('mi-revista');
            if (!autoCornerState.container) return;
        }

        if (!autoCornerState.lastRect) {
            autoCornerState.lastRect = autoCornerState.container.getBoundingClientRect();
        }

        const rect = autoCornerState.lastRect;
        const t = time / 1000;
        // Movimiento más sutil
        const wobble = Math.sin(t * 1.5) * 12;
        const wobbleY = Math.cos(t * 1.2) * 8;
        const x = rect.right - 50 - wobble;
        const y = rect.top + 35 + wobbleY;

        const moveEvent = new MouseEvent('mousemove', {
            bubbles: true,
            clientX: x,
            clientY: y
        });
        autoCornerState.container.dispatchEvent(moveEvent);

        autoCornerState.rafId = requestAnimationFrame(dispatchCornerMove);
    };

    const startAutoCorner = () => {
        if (autoCornerState.active || autoCornerState.hasInteracted) return;
        autoCornerState.active = true;
        autoCornerState.lastRect = null;
        autoCornerState.rafId = requestAnimationFrame(dispatchCornerMove);
        
        // Auto-stop después de HINT_DURATION
        autoCornerState.hintTimeout = setTimeout(() => {
            stopAutoCorner();
        }, HINT_DURATION);
    };

    const stopAutoCorner = () => {
        if (!autoCornerState.active) return;
        autoCornerState.active = false;
        if (autoCornerState.rafId) {
            cancelAnimationFrame(autoCornerState.rafId);
            autoCornerState.rafId = null;
        }
        if (autoCornerState.hintTimeout) {
            clearTimeout(autoCornerState.hintTimeout);
            autoCornerState.hintTimeout = null;
        }
        const container = document.getElementById('mi-revista');
        if (container) {
            const rect = container.getBoundingClientRect();
            const leaveEvent = new MouseEvent('mouseleave', {
                bubbles: true,
                clientX: rect.left - 10,
                clientY: rect.top - 10
            });
            container.dispatchEvent(leaveEvent);
        }
    };

    // Detectar si el mouse está cerca de la esquina inferior derecha
    const checkMouseNearCorner = (e) => {
        if (autoCornerState.hasInteracted) return;
        
        const container = document.getElementById('mi-revista');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const cornerX = rect.right;
        const cornerY = rect.bottom;
        
        const distX = Math.abs(e.clientX - cornerX);
        const distY = Math.abs(e.clientY - cornerY);
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < CORNER_THRESHOLD && !autoCornerState.mouseNearCorner) {
            autoCornerState.mouseNearCorner = true;
            startAutoCorner();
        } else if (distance >= CORNER_THRESHOLD * 1.5 && autoCornerState.mouseNearCorner) {
            autoCornerState.mouseNearCorner = false;
            stopAutoCorner();
        }
    };

    // Escuchar movimiento del mouse para detectar intención
    document.addEventListener('mousemove', checkMouseNearCorner, { passive: true });

    // =======================================
    // AVISAR AL HOME: INTERACCIONES DEL HERO
    // Enviar mensaje al padre en cada pointerdown dentro del hero
    // para que el header pueda ocultarse cada vez que el usuario
    // interactúe con la revista.
    // =======================================
    document.addEventListener("pointerdown", () => {
        autoCornerState.hasInteracted = true;
        stopAutoCorner();
        window.parent.postMessage(
            { type: "HERO_INTERACTION" },
            "*"
        );
    });

    // =======================================
    // AVISAR AL HOME: INTENCIÓN DE SCROLL
    // =======================================
    let scrollIntentSent = false;

    const notifyScrollIntent = () => {
        if (scrollIntentSent) return;

        scrollIntentSent = true;

        window.parent.postMessage(
            { type: "HERO_SCROLL_INTENT" },
            "*"
        );  
    };

    // Rueda de mouse
    document.addEventListener("wheel", notifyScrollIntent, { passive: true });

    // Touch (mobile)
    document.addEventListener("touchmove", notifyScrollIntent, { passive: true });
    
    // ===============================
    // CONTENEDOR
    // ===============================
    const container = document.getElementById('mi-revista');

    if (!container) {
        console.error('No se encontró el contenedor #mi-revista.');
        return;
    }

    if (typeof St === 'undefined' || !St.PageFlip) {
        console.error('La librería PageFlip (St) no está cargada.');
        return;
    }

    // ===============================
    // DIMENSIONES
    // ===============================
    const pageWidth  = Math.floor(window.innerWidth / 2);
    const pageHeight = window.innerHeight;

    const pageFlip = new St.PageFlip(container, {
        width: pageWidth,
        height: pageHeight,
        size: 'stretch',
        minWidth: 315,
        maxWidth: 3000,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        showCover: false,
        mobileScrollSupport: false
    });

    // ===============================
    // ASEGURAR PÁGINAS PARES
    // ===============================
    (function ensureEvenTotalPages(){
        const allPages = Array.from(container.querySelectorAll('.page'));
        if (allPages.length % 2 !== 0) {
            const last = allPages[allPages.length - 1];
            const blank = document.createElement('div');
            blank.className = 'page';
            blank.setAttribute('data-name', 'blank-inserted');
            last.parentNode.insertBefore(blank, last);
            console.log('Se insertó página en blanco para paridad.');
        }
    })();

    // ===============================
    // CARGAR PÁGINAS
    // ===============================
    pageFlip.loadFromHTML(container.querySelectorAll('.page'));
    window.pageFlip = pageFlip;

    pageFlip.on('flip', () => {
        autoCornerState.hasInteracted = true;
        stopAutoCorner();
        window.parent.postMessage(
            { type: "HERO_PAGE_FLIP" },
            "*"
        );
    });

    // Solo iniciar hint si no ha habido interacción previa
    // y con un delay para que no sea inmediato
    setTimeout(() => {
        if (!autoCornerState.hasInteracted) {
            startAutoCorner();
        }
    }, 2000);

    console.log('PageFlip inicializado en #mi-revista', pageFlip);

    // =======================================
    // NOTIFICAR AL PADRE: REVISTA READY
    // Enviar postMessage cuando PageFlip esté completamente inicializado
    // y el primer frame esté estable (2 frames consecutivos)
    // =======================================
    let revistaReadySent = false;
    let stableFrameCount = 0;
    let lastContainerRect = null;

    const checkRevistaStability = () => {
        if (revistaReadySent) return;

        const rect = container.getBoundingClientRect();
        const currentSize = { width: rect.width, height: rect.height };

        if (lastContainerRect) {
            const sameSize = 
                Math.abs(lastContainerRect.width - currentSize.width) < 1 &&
                Math.abs(lastContainerRect.height - currentSize.height) < 1;

            if (sameSize && currentSize.width > 0 && currentSize.height > 0) {
                stableFrameCount++;
            } else {
                stableFrameCount = 0;
            }
        }

        lastContainerRect = currentSize;

        if (stableFrameCount >= 2) {
            revistaReadySent = true;
            console.log('[Revista] Sending REVISTA_READY to parent');
            window.parent.postMessage({ type: "REVISTA_READY" }, "*");
        } else {
            requestAnimationFrame(checkRevistaStability);
        }
    };

    // Iniciar verificación de estabilidad después de un pequeño delay
    setTimeout(() => {
        requestAnimationFrame(checkRevistaStability);
    }, 100);

    // ===============================
    // MAPA DE PÁGINAS (DEBUG)
    // ===============================
    (function logPageNames(){
        const pages = container.querySelectorAll('.page');
        const map = [];
        pages.forEach((p, i) => {
            map.push({ index: i, id: p.id || null, name: p.getAttribute('data-name') || null });
        });
        console.log('Mapa de páginas:', map);
    })();

    // =====================================================
    // 🔧 FIX REAL DEL PROBLEMA (GHOSTING AL AVANZAR)
    // =====================================================
    // NO toca CSS
    // NO rompe fluidez
    /// ===============================
    // FIX GHOSTING — versión estable
    // ===============================
    const pageContents = container.querySelectorAll('.page-content');

    // Asegurar visibilidad inicial
    pageContents.forEach(el => {
        el.style.opacity = '1';
    });

    // Durante el flip → ocultar suavemente
    pageFlip.on('flip', () => {
        pageContents.forEach(el => {
            el.style.opacity = '0';
        });
    });

    // Cuando el flip termina y queda estable → mostrar
    pageFlip.on('changeState', (e) => {
        if (e.data === 'read') {
            pageContents.forEach(el => {
                el.style.opacity = '1';
            });
        }
    });
    // Evita que PageFlip reutilice el frame anterior


    // ===============================
    // RESIZE
    // ===============================
    window.addEventListener('resize', function(){
        try {
            const newPageWidth  = Math.floor(window.innerWidth / 2);
            const newPageHeight = window.innerHeight;

            if (typeof pageFlip.update === 'function') {
                pageFlip.update({ width: newPageWidth, height: newPageHeight });
            } else if (typeof pageFlip.resize === 'function') {
                pageFlip.resize(newPageWidth, newPageHeight);
            }
            if (autoCornerState.active) {
                autoCornerState.lastRect = null;
            }
        } catch (e) {
            console.error('Error al redimensionar PageFlip:', e);
        }
    });

});
