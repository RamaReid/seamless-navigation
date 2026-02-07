import { useEffect, useRef, useCallback, useState } from 'react';

const SHOW_THRESHOLD = 150; // px de margen superior
const HERO_IDLE_MS = 6000; // tiempo de inactividad antes de mostrar header

interface UseHeaderOnScrollOptions {
  heroSelector?: string;
  enabled?: boolean;
}

export function useHeaderOnScroll(options: UseHeaderOnScrollOptions = {}) {
  const { heroSelector = '.hero-revista-section', enabled = true } = options;

  const [isVisible, setIsVisible] = useState(false);
  const heroTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tickingRef = useRef(false);

  const isAboveThreshold = useCallback(() => {
    return (window.scrollY || 0) <= SHOW_THRESHOLD;
  }, []);

  const clearHeroTimer = useCallback(() => {
    if (heroTimerRef.current) {
      clearTimeout(heroTimerRef.current);
      heroTimerRef.current = null;
    }
  }, []);

  const scheduleHeroHeader = useCallback(() => {
    if (!enabled) return;
    const heroSection = document.querySelector(heroSelector);
    if (!heroSection) return;

    clearHeroTimer();
    
    heroTimerRef.current = setTimeout(() => {
      if (!isAboveThreshold()) return;
      setIsVisible(true);
      document.body.classList.add('header-visible');
    }, HERO_IDLE_MS);
  }, [enabled, heroSelector, clearHeroTimer, isAboveThreshold]);

  const noteHeroInteraction = useCallback(() => {
    if (!enabled) return;
    const heroSection = document.querySelector(heroSelector);
    if (!heroSection) return;
    if (!isAboveThreshold()) return;

    setIsVisible(false);
    document.body.classList.remove('header-visible');
    scheduleHeroHeader();
  }, [enabled, heroSelector, isAboveThreshold, scheduleHeroHeader]);

  const updateOnScroll = useCallback(() => {
    const y = window.scrollY || 0;

    if (y > SHOW_THRESHOLD) {
      // Al hacer scroll hacia abajo, mostrar header
      setIsVisible(true);
      document.body.classList.add('header-visible');
    } else {
      // En la parte superior, ocultar (a menos que la secuencia lo haya desbloqueado)
      const scrollUnlocked = (window as any).__gd_scroll_unlocked;
      if (scrollUnlocked) {
        setIsVisible(false);
        document.body.classList.remove('header-visible');
      }
    }
    tickingRef.current = false;
  }, []);

  // Escuchar scroll
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(updateOnScroll);
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, updateOnScroll]);

  // Escuchar interacciones del hero
  useEffect(() => {
    if (!enabled) return;

    const heroSection = document.querySelector(heroSelector);
    if (!heroSection) return;

    const handlePointerDown = () => noteHeroInteraction();
    const handleKeyDown = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' || ke.key === ' ') {
        noteHeroInteraction();
      }
    };

    heroSection.addEventListener('pointerdown', handlePointerDown);
    heroSection.addEventListener('keydown', handleKeyDown);

    return () => {
      heroSection.removeEventListener('pointerdown', handlePointerDown);
      heroSection.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, heroSelector, noteHeroInteraction]);

  // Escuchar mensajes del iframe
  useEffect(() => {
    if (!enabled) return;

    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (typeof type !== 'string') return;
      if (!type.includes('HERO')) return;
      noteHeroInteraction();
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [enabled, noteHeroInteraction]);

  // Escuchar evento heroVisible
  useEffect(() => {
    if (!enabled) return;

    const handleHeroVisible = () => {
      scheduleHeroHeader();
    };

    window.addEventListener('heroVisible', handleHeroVisible);
    return () => window.removeEventListener('heroVisible', handleHeroVisible);
  }, [enabled, scheduleHeroHeader]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearHeroTimer();
    };
  }, [clearHeroTimer]);

  return {
    isVisible,
    show: () => {
      setIsVisible(true);
      document.body.classList.add('header-visible');
    },
    hide: () => {
      setIsVisible(false);
      document.body.classList.remove('header-visible');
    },
    noteInteraction: noteHeroInteraction,
  };
}

export default useHeaderOnScroll;
