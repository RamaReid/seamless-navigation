import { useEffect, useRef, useCallback } from 'react';

interface UseSmoothScrollOptions {
  enabled?: boolean;
  ease?: number;
  speed?: number;
  maxDelta?: number;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const {
    enabled = true,
    ease = 0.05,
    speed = 0.5,
    maxDelta = 1200,
  } = options;

  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const tickingRef = useRef(false);
  const enabledRef = useRef(enabled);

  // Actualizar ref cuando cambia enabled
  useEffect(() => {
    enabledRef.current = enabled;
    if (enabled) {
      targetYRef.current = window.scrollY || 0;
      currentYRef.current = targetYRef.current;
    }
  }, [enabled]);

  const lerp = useCallback((a: number, b: number, t: number) => {
    return a + (b - a) * t;
  }, []);

  const update = useCallback(() => {
    tickingRef.current = false;
    currentYRef.current = lerp(currentYRef.current, targetYRef.current, ease);
    
    if (Math.abs(currentYRef.current - targetYRef.current) < 0.5) {
      currentYRef.current = targetYRef.current;
    }
    
    window.scrollTo(0, Math.round(currentYRef.current));
    
    if (currentYRef.current !== targetYRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  }, [ease, lerp]);

  const requestTick = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  }, [update]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Permitir nativo en elementos con data-no-smooth
    let node = e.target as HTMLElement | null;
    while (node && node !== document.body) {
      if (node.hasAttribute?.('data-no-smooth')) return;
      node = node.parentNode as HTMLElement | null;
    }

    if (!enabledRef.current) return;
    
    // Verificar si prefiere movimiento reducido
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    e.preventDefault();
    
    const deltaRaw = e.deltaY || 0;
    const delta = Math.max(-maxDelta, Math.min(maxDelta, deltaRaw));
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const proposed = targetYRef.current + delta * speed;

    if (proposed <= 0) {
      if (targetYRef.current === 0) return;
      targetYRef.current = 0;
      requestTick();
      return;
    }

    if (proposed >= maxScroll) {
      if (targetYRef.current === maxScroll) return;
      targetYRef.current = maxScroll;
      requestTick();
      return;
    }

    targetYRef.current = proposed;
    requestTick();
  }, [maxDelta, speed, requestTick]);

  const handleResize = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetYRef.current = Math.max(0, Math.min(maxScroll, targetYRef.current));
    currentYRef.current = Math.max(0, Math.min(maxScroll, currentYRef.current));
  }, []);

  const handleTouchStart = useCallback(() => {
    targetYRef.current = window.scrollY || 0;
    currentYRef.current = targetYRef.current;
  }, []);

  // Sincronizar después de saltos programáticos
  const sync = useCallback(() => {
    targetYRef.current = window.scrollY || 0;
    currentYRef.current = targetYRef.current;
  }, []);

  useEffect(() => {
    // Verificar preferencias de movimiento reducido
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Inicializar estado
    targetYRef.current = window.scrollY || 0;
    currentYRef.current = targetYRef.current;

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleWheel, handleResize, handleTouchStart]);

  return {
    sync,
    enable: () => { enabledRef.current = true; sync(); },
    disable: () => { enabledRef.current = false; },
  };
}

export default useSmoothScroll;
