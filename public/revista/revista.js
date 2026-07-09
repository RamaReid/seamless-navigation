// Inicialización de PageFlip (versión estable + fix de ghosting)
// AUTO-CORNER HÍBRIDO:
// - Loop por inactividad (vuelve tras 3s)
// - Event-driven por cercanía a esquina inferior derecha
document.addEventListener('DOMContentLoaded', function () {

    // =======================================
    // AUTO CORNER — HÍBRIDO (DESKTOP)
    // - Arranca al abrir
    // - Se pausa ante interacción real
    // - Vuelve tras 3s sin interacción
    // - También responde por cercanía de cursor a esquina inferior derecha
    // =======================================
    const autoCornerState = {
        active: false,
        rafId: null,
        lastRect: null,
        container: null,
        resumeTimer: null,
        mouseNearCorner: false,
        proximityMode: false
    };

    const IDLE_RESUME_MS = 3000;
    const CORNER_THRESHOLD = 120;
    const BEAT_BPM = 50; // pulso más lento/acústico
    const BEAT_SECONDS = 60 / BEAT_BPM;

    const dispatchCornerMove = (time) => {
        if (!autoCornerState.active) {
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
        // Movimiento con pulso musical (beat + acentos por compas).
        const barPhase = (t / (BEAT_SECONDS * 4)) % 1;
        const beatInBar = Math.floor(barPhase * 4);
        const beatLocal = (barPhase * 4) % 1;
        const beatShape = Math.pow(Math.sin(Math.PI * beatLocal), 2.1);
        const beatAccents = [1.0, 0.62, 0.78, 0.62];
        const accent = beatAccents[beatInBar] || 0.7;
        const offbeat = Math.pow(Math.sin(Math.PI * ((t / (BEAT_SECONDS / 2)) % 1)), 2) * 0.25;
        const pulse = Math.min(1, beatShape * accent + offbeat);

        const wobbleX = Math.sin(t * 10.5) * (8 + pulse * 7);
        const wobbleY = Math.cos(t * 9.0) * (6 + pulse * 6);
        const pullX = 28 + pulse * 52;
        const pullY = 16 + pulse * 26;
        const x = rect.right - pullX - wobbleX;
        const y = rect.bottom - pullY - wobbleY;

        const moveEvent = new MouseEvent('mousemove', {
            bubbles: true,
            clientX: x,
            clientY: y
        });
        autoCornerState.container.dispatchEvent(moveEvent);

        autoCornerState.rafId = requestAnimationFrame(dispatchCornerMove);
    };

    const startAutoCorner = (mode = 'idle') => {
        if (autoCornerState.active) return;
        if (autoCornerState.resumeTimer) {
            clearTimeout(autoCornerState.resumeTimer);
            autoCornerState.resumeTimer = null;
        }
        autoCornerState.active = true;
        autoCornerState.proximityMode = mode === 'proximity';
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

    const scheduleAutoCornerResume = () => {
        if (autoCornerState.resumeTimer) {
            clearTimeout(autoCornerState.resumeTimer);
        }
        autoCornerState.resumeTimer = setTimeout(() => {
            startAutoCorner('idle');
        }, IDLE_RESUME_MS);
    };

    const checkMouseNearCorner = (event) => {
        if (!event || event.isTrusted === false) return;

        const container = document.getElementById('mi-revista');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const cornerX = rect.right;
        const cornerY = rect.bottom;
        const distX = Math.abs(event.clientX - cornerX);
        const distY = Math.abs(event.clientY - cornerY);
        const distance = Math.sqrt(distX * distX + distY * distY);
        const nearCorner = distance < CORNER_THRESHOLD;

        if (nearCorner && !autoCornerState.mouseNearCorner) {
            autoCornerState.mouseNearCorner = true;
            startAutoCorner('proximity');
            return;
        }

        if (!nearCorner && autoCornerState.mouseNearCorner) {
            autoCornerState.mouseNearCorner = false;
            if (autoCornerState.active && autoCornerState.proximityMode) {
                stopAutoCorner();
                scheduleAutoCornerResume();
            }
        }
    };

    const registerUserInteraction = (event) => {
        if (event && event.isTrusted === false) return;
        stopAutoCorner();
        scheduleAutoCornerResume();
    };

    document.addEventListener('mousemove', checkMouseNearCorner, { passive: true });
    document.addEventListener('wheel', registerUserInteraction, { passive: true });
    document.addEventListener('keydown', registerUserInteraction);

    // =======================================
    // AVISAR AL HOME: INTERACCIONES DEL HERO
    // Enviar mensaje al padre en cada pointerdown dentro del hero
    // para que el header pueda ocultarse cada vez que el usuario
    // interactúe con la revista.
    // =======================================
    document.addEventListener("pointerdown", (e) => {
        registerUserInteraction(e);
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

    // Cada spread es una sola foto repartida en dos paginas.
    // El encuadre se calcula contra el pliego completo, no contra cada pagina.
    let spreadFitRun = 0;
    const imageSizeCache = new Map();

    const getBackgroundImageUrl = (element) => {
        const backgroundImage = window.getComputedStyle(element).backgroundImage;
        if (!backgroundImage || backgroundImage === 'none') return null;

        const match = backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
        return match ? match[1] : null;
    };

    const loadImageSize = (url) => {
        if (imageSizeCache.has(url)) return imageSizeCache.get(url);

        const imageSizePromise = new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve({
                width: image.naturalWidth,
                height: image.naturalHeight
            });
            image.onerror = reject;
            image.src = url;
        });

        imageSizeCache.set(url, imageSizePromise);
        return imageSizePromise;
    };

    const getSpreadPairs = () => {
        const spreads = new Map();

        container.querySelectorAll('.page.spread').forEach((page) => {
            const match = page.id.match(/^spread-(\d+)-(left|right)$/);
            if (!match) return;

            const spreadId = match[1];
            const side = match[2];

            if (!spreads.has(spreadId)) {
                spreads.set(spreadId, {});
            }

            spreads.get(spreadId)[side] = page.querySelector('.page-content');
        });

        return Array.from(spreads.values()).filter((spread) => spread.left && spread.right);
    };

    const setDefaultSpreadFit = (leftContent, rightContent) => {
        leftContent.style.backgroundSize = '200% auto';
        rightContent.style.backgroundSize = '200% auto';
        leftContent.style.backgroundPosition = 'left center';
        rightContent.style.backgroundPosition = 'right center';
    };

    const getSpreadRatio = () => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            return rect.width / rect.height;
        }

        return window.innerWidth / window.innerHeight;
    };

    const applySpreadFit = () => {
        const runId = ++spreadFitRun;
        const spreadRatio = getSpreadRatio();

        getSpreadPairs().forEach(async ({ left, right }) => {
            const imageUrl = getBackgroundImageUrl(left) || getBackgroundImageUrl(right);

            if (!imageUrl) {
                setDefaultSpreadFit(left, right);
                return;
            }

            try {
                const imageSize = await loadImageSize(imageUrl);

                if (runId !== spreadFitRun) return;

                const imageRatio = imageSize.width / imageSize.height;

                if (!Number.isFinite(imageRatio) || imageRatio <= 0) {
                    setDefaultSpreadFit(left, right);
                    return;
                }

                if (imageRatio <= spreadRatio) {
                    setDefaultSpreadFit(left, right);
                    return;
                }

                const leftPosition = ((spreadRatio - imageRatio) / (spreadRatio - 2 * imageRatio)) * 100;
                const rightPosition = 100 - leftPosition;

                left.style.backgroundSize = 'auto 100%';
                right.style.backgroundSize = 'auto 100%';
                left.style.backgroundPosition = `${leftPosition}% center`;
                right.style.backgroundPosition = `${rightPosition}% center`;
            } catch (error) {
                if (runId !== spreadFitRun) return;
                console.error('Error al calcular el encuadre del spread:', error);
                setDefaultSpreadFit(left, right);
            }
        });
    };

    const scheduleSpreadFit = () => {
        requestAnimationFrame(applySpreadFit);
    };

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
        }
    })();

    // ===============================
    // CARGAR PÁGINAS
    // ===============================
    pageFlip.loadFromHTML(container.querySelectorAll('.page'));
    window.pageFlip = pageFlip;
    scheduleSpreadFit();

    pageFlip.on('flip', () => {
        registerUserInteraction();
        window.parent.postMessage(
            { type: "HERO_PAGE_FLIP" },
            "*"
        );
    });

    // Iniciar hint inmediatamente al abrir
    startAutoCorner();


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
            scheduleSpreadFit();
        } catch (e) {
            console.error('Error al redimensionar PageFlip:', e);
        }
    });

});
