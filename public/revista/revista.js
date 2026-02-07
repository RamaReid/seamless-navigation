// Inicialización de PageFlip (versión estable + fix de ghosting)
// Ported from original GDWeb/js/revista/revista.js

document.addEventListener('DOMContentLoaded', function () {

    // =======================================
    // AUTO HOVER EN ESQUINA (SIMULA HOVER REAL)
    // =======================================
    const autoCornerState = {
        active: false,
        rafId: null,
        lastRect: null,
        container: null
    };

    const dispatchCornerMove = (time) => {
        if (!autoCornerState.active) return;
        if (!autoCornerState.container) {
            autoCornerState.container = document.getElementById('mi-revista');
            if (!autoCornerState.container) return;
        }

        if (!autoCornerState.lastRect) {
            autoCornerState.lastRect = autoCornerState.container.getBoundingClientRect();
        }

        const rect = autoCornerState.lastRect;
        const t = time / 1000;
        const wobble = Math.sin(t * 2.2) * 18;
        const wobbleY = Math.cos(t * 1.6) * 12;
        const x = rect.right - 60 - wobble;
        const y = rect.top + 28 + wobbleY;

        const moveEvent = new MouseEvent('mousemove', {
            bubbles: true,
            clientX: x,
            clientY: y
        });
        autoCornerState.container.dispatchEvent(moveEvent);

        autoCornerState.rafId = requestAnimationFrame(dispatchCornerMove);
    };

    const startAutoCorner = () => {
        if (autoCornerState.active) return;
        autoCornerState.active = true;
        autoCornerState.lastRect = null;
        autoCornerState.rafId = requestAnimationFrame(dispatchCornerMove);
    };

    const stopAutoCorner = () => {
        if (!autoCornerState.active) return;
        autoCornerState.active = false;
        if (autoCornerState.rafId) {
            cancelAnimationFrame(autoCornerState.rafId);
            autoCornerState.rafId = null;
        }
    };

    // =======================================
    // AVISAR AL PADRE: INTERACCIONES DEL HERO
    // =======================================
    document.addEventListener("pointerdown", () => {
        stopAutoCorner();
        window.parent.postMessage({ type: "HERO_INTERACTION" }, "*");
    });

    // =======================================
    // AVISAR AL PADRE: INTENCIÓN DE SCROLL
    // =======================================
    let scrollIntentSent = false;

    const notifyScrollIntent = () => {
        if (scrollIntentSent) return;
        scrollIntentSent = true;
        window.parent.postMessage({ type: "HERO_SCROLL_INTENT" }, "*");
    };

    document.addEventListener("wheel", notifyScrollIntent, { passive: true });
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
        minHeight: 400,
        maxHeight: 2000,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        showCover: false,
        mobileScrollSupport: false,
        useMouseEvents: true,
        swipeDistance: 30,
        clickEventForward: false,
        usePortrait: false,
        startPage: 0,
        autoSize: true,
        showPageCorners: true
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
        stopAutoCorner();
        window.parent.postMessage({ type: "HERO_PAGE_FLIP" }, "*");
    });

    startAutoCorner();

    console.log('PageFlip inicializado en #mi-revista', pageFlip);

    // =====================================================
    // FIX GHOSTING — versión estable
    // =====================================================
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
