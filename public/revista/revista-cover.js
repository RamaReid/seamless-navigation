// Ajuste "cover" por spread sin deformar (mantiene proporción y continuidad entre páginas)
// Se ejecuta después de revista.js (PageFlip) y recalcula en resize.

(function () {
  const getBgUrl = (el) => {
    if (!el) return null;
    const bg = window.getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none') return null;
    const m = bg.match(/url\(["']?([^"')]+)["']?\)/);
    return m?.[1] ?? null;
  };

  const applyToSpread = (spreadNum) => {
    const leftPage = document.getElementById(`spread-${spreadNum}-left`);
    const rightPage = document.getElementById(`spread-${spreadNum}-right`);
    const left = leftPage?.querySelector('.page-content');
    const right = rightPage?.querySelector('.page-content');
    if (!left || !right) return;

    const url = getBgUrl(left);
    if (!url) return;

    const rect = left.getBoundingClientRect();
    const pageW = rect.width;
    const pageH = rect.height;
    if (!pageW || !pageH) return;

    const spreadW = pageW * 2;

    const img = new Image();
    img.onload = function () {
      const imgW = this.naturalWidth || this.width;
      const imgH = this.naturalHeight || this.height;
      if (!imgW || !imgH) return;

      // Cover sobre el SPREAD completo (2 páginas)
      const scale = Math.max(spreadW / imgW, pageH / imgH);
      const dispW = Math.ceil(imgW * scale);
      const dispH = Math.ceil(imgH * scale);

      // Centrado horizontal del recorte dentro del spread
      const offsetX = Math.round((dispW - spreadW) / 2);

      const bgSize = `${dispW}px ${dispH}px`;

      // Página izquierda muestra la primera mitad del spread
      left.style.backgroundSize = bgSize;
      left.style.backgroundRepeat = 'no-repeat';
      left.style.backgroundPosition = `${-offsetX}px center`;

      // Página derecha continúa la imagen (shift -pageW)
      right.style.backgroundSize = bgSize;
      right.style.backgroundRepeat = 'no-repeat';
      right.style.backgroundPosition = `${-(offsetX + pageW)}px center`;
    };

    img.src = url;
  };

  const applyAll = () => {
    // 10 spreads (1..10)
    for (let i = 1; i <= 10; i++) applyToSpread(i);
  };

  let resizeT = null;
  const onResize = () => {
    if (resizeT) window.clearTimeout(resizeT);
    resizeT = window.setTimeout(applyAll, 120);
  };

  window.addEventListener('load', applyAll);
  window.addEventListener('resize', onResize);

  // Por si el load ya ocurrió
  if (document.readyState === 'complete') {
    applyAll();
  }
})();
