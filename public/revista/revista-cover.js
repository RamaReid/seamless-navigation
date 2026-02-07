// Ajuste "cover" por spread sin deformar (mantiene proporción y continuidad entre páginas)
// Se ejecuta cuando PageFlip está listo y recalcula en resize/flip.

(function () {
  const SPREADS = 10;
  const imageSizeCache = new Map(); // url -> {w,h}

  const getBgUrl = (el) => {
    if (!el) return null;
    const bg = window.getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none') return null;
    const m = bg.match(/url\(["']?([^"')]+)["']?\)/);
    return m?.[1] ?? null;
  };

  const getPageContentEl = (spreadNum, side) => {
    const page = document.getElementById(`spread-${spreadNum}-${side}`);
    return page?.querySelector?.('.page-content') ?? null;
  };

  const ensureImageSize = async (url) => {
    if (imageSizeCache.has(url)) return imageSizeCache.get(url);

    const size = await new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve({ w: img.naturalWidth || img.width, h: img.naturalHeight || img.height });
      };
      img.onerror = function () {
        resolve(null);
      };
      img.src = url;
    });

    if (size) imageSizeCache.set(url, size);
    return size;
  };

  const applyToSpread = async (spreadNum) => {
    const left = getPageContentEl(spreadNum, 'left');
    const right = getPageContentEl(spreadNum, 'right');
    if (!left || !right) return false;

    const url = getBgUrl(left);
    if (!url) return false;

    const rect = left.getBoundingClientRect();
    const pageW = rect.width;
    const pageH = rect.height;
    if (!pageW || !pageH) return false;

    const spreadW = pageW * 2;

    const imgSize = await ensureImageSize(url);
    if (!imgSize?.w || !imgSize?.h) return false;

    // Cover sobre el SPREAD completo (2 páginas) sin deformar
    const scale = Math.max(spreadW / imgSize.w, pageH / imgSize.h);
    const dispW = Math.ceil(imgSize.w * scale);
    const dispH = Math.ceil(imgSize.h * scale);

    // Centrar el recorte horizontalmente dentro del spread
    const offsetX = Math.round((dispW - spreadW) / 2);

    const bgSize = `${dispW}px ${dispH}px`;

    // Izquierda: primera mitad
    left.style.backgroundSize = bgSize;
    left.style.backgroundRepeat = 'no-repeat';
    left.style.backgroundPosition = `${-offsetX}px center`;

    // Derecha: segunda mitad (continuidad)
    right.style.backgroundSize = bgSize;
    right.style.backgroundRepeat = 'no-repeat';
    right.style.backgroundPosition = `${-(offsetX + pageW)}px center`;

    return true;
  };

  const applyAll = async () => {
    const results = await Promise.all(
      Array.from({ length: SPREADS }, (_, i) => applyToSpread(i + 1))
    );
    return results.every(Boolean);
  };

  let retryCount = 0;
  const MAX_RETRIES = 40; // ~40*100ms = 4s
  const scheduleRetry = () => {
    if (retryCount >= MAX_RETRIES) return;
    retryCount++;
    setTimeout(async () => {
      const ok = await applyAll();
      if (!ok) scheduleRetry();
    }, 100);
  };

  const bindPageFlipEvents = () => {
    const pf = window.pageFlip;
    if (!pf || typeof pf.on !== 'function') return;

    // Re-aplicar al terminar un flip (por si PageFlip re-monta nodos)
    pf.on('flip', () => {
      applyAll();
    });

    pf.on('changeOrientation', () => {
      applyAll();
    });

    pf.on('init', () => {
      applyAll();
    });
  };

  let resizeT = null;
  const onResize = () => {
    if (resizeT) window.clearTimeout(resizeT);
    resizeT = window.setTimeout(() => applyAll(), 120);
  };

  window.addEventListener('resize', onResize);

  // Ejecutar apenas esté listo
  window.addEventListener('load', async () => {
    bindPageFlipEvents();
    const ok = await applyAll();
    if (!ok) scheduleRetry();
  });

  // Si ya cargó
  if (document.readyState === 'complete') {
    bindPageFlipEvents();
    applyAll().then((ok) => {
      if (!ok) scheduleRetry();
    });
  }
})();
