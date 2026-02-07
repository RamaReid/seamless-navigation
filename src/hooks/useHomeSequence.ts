import { useEffect, useRef, useCallback, useState } from 'react';

const BEAT = 465; // ms

interface HomeSequenceState {
  headerVisible: boolean;
  heroVisible: boolean;
  scrollUnlocked: boolean;
}

interface UseHomeSequenceOptions {
  enabled?: boolean;
  onHeaderShow?: () => void;
  onHeroShow?: () => void;
}

export function useHomeSequence(options: UseHomeSequenceOptions = {}) {
  const { enabled = false, onHeaderShow, onHeroShow } = options;

  const [state, setState] = useState<HomeSequenceState>({
    headerVisible: false,
    heroVisible: false,
    scrollUnlocked: false,
  });

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Ejecutar secuencia cuando se habilita (después de introComplete)
  useEffect(() => {
    if (!enabled) return;

    // Header aparece a los 3 BEATs
    schedule(() => {
      setState(prev => ({ ...prev, headerVisible: true }));
      onHeaderShow?.();
      document.body.classList.add('header-visible');
    }, BEAT * 3);

    // Hero aparece a los 8 BEATs (header se oculta)
    schedule(() => {
      setState(prev => ({ 
        ...prev, 
        headerVisible: false, 
        heroVisible: true 
      }));
      onHeroShow?.();
      document.body.classList.remove('header-visible');
      document.body.classList.add('hero-visible');
      window.dispatchEvent(new Event('heroVisible'));
    }, BEAT * 8);

    return clearTimers;
  }, [enabled, schedule, clearTimers, onHeaderShow, onHeroShow]);

  // Desbloquear scroll al interactuar con hero
  const unlockScroll = useCallback(() => {
    if (state.scrollUnlocked) return;
    setState(prev => ({ ...prev, scrollUnlocked: true }));
    document.body.classList.remove('sequence-only');
  }, [state.scrollUnlocked]);

  // Escuchar mensajes del iframe de revista
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (typeof type === 'string' && type.includes('HERO')) {
        unlockScroll();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [unlockScroll]);

  // Reset de secuencia (cuando se toca el logo)
  const resetSequence = useCallback(() => {
    clearTimers();
    setState({
      headerVisible: false,
      heroVisible: false,
      scrollUnlocked: false,
    });
    document.body.classList.remove('header-visible', 'hero-visible');
  }, [clearTimers]);

  // Mostrar header manualmente
  const showHeader = useCallback(() => {
    setState(prev => ({ ...prev, headerVisible: true }));
    document.body.classList.add('header-visible');
  }, []);

  // Ocultar header manualmente
  const hideHeader = useCallback(() => {
    setState(prev => ({ ...prev, headerVisible: false }));
    document.body.classList.remove('header-visible');
  }, []);

  return {
    ...state,
    unlockScroll,
    resetSequence,
    showHeader,
    hideHeader,
    BEAT,
  };
}

export default useHomeSequence;
