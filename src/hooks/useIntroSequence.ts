import { useEffect, useRef, useCallback, useState } from 'react';

const BEAT = 465; // ms - constante de timing del sistema original

interface IntroState {
  phase: 'loading' | 'lift' | 'drop' | 'bounce' | 'reveal' | 'complete';
  loaderCycles: number;
  isLoaded: boolean;
  isAppReady: boolean;
  skipIntro: boolean;
}

interface UseIntroSequenceOptions {
  skipIntro?: boolean;
  onIntroComplete?: () => void;
  onAppReady?: () => void;
  onPhaseChange?: (phase: IntroState['phase']) => void;
}

export function useIntroSequence(options: UseIntroSequenceOptions = {}) {
  const { 
    skipIntro = false, 
    onIntroComplete, 
    onAppReady,
    onPhaseChange 
  } = options;

  const [state, setState] = useState<IntroState>({
    phase: 'loading',
    loaderCycles: 0,
    isLoaded: false,
    isAppReady: false,
    skipIntro,
  });

  const svgRef = useRef<SVGSVGElement | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Incrementar ciclo del loader
  const incrementCycle = useCallback(() => {
    setState(prev => {
      const newCycles = prev.loaderCycles + 1;
      return { ...prev, loaderCycles: newCycles };
    });
  }, []);

  // Marcar como cargado (window.load equivalent)
  const markLoaded = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true }));
  }, []);

  // Verificar si está listo para appReady (cycles >= 2 && loaded)
  useEffect(() => {
    if (state.isLoaded && state.loaderCycles >= 2 && !state.isAppReady && !state.skipIntro) {
      setState(prev => ({ ...prev, isAppReady: true }));
      onAppReady?.();
    }
  }, [state.isLoaded, state.loaderCycles, state.isAppReady, state.skipIntro, onAppReady]);

  // Skip intro flow (navegación interna)
  useEffect(() => {
    if (state.skipIntro && state.loaderCycles >= 1) {
      setState(prev => ({ ...prev, phase: 'reveal' }));
      
      const revealTimer = setTimeout(() => {
        setState(prev => ({ ...prev, phase: 'complete' }));
        onIntroComplete?.();
      }, 6000);

      timersRef.current.push(revealTimer);
    }
  }, [state.skipIntro, state.loaderCycles, onIntroComplete]);

  // Secuencia de intro completa (lift -> drop -> bounce -> reveal)
  useEffect(() => {
    if (!state.isAppReady || state.skipIntro) return;

    // Iniciar fase lift
    setState(prev => ({ ...prev, phase: 'lift' }));
    onPhaseChange?.('lift');

    // La transición entre fases se maneja por eventos de animación CSS
    // El hook expone métodos para que el componente notifique los cambios
  }, [state.isAppReady, state.skipIntro, onPhaseChange]);

  // Manejar fin de animación
  const handleAnimationEnd = useCallback((animationName: string) => {
    setState(prev => {
      let newPhase = prev.phase;

      if (animationName === 'lift') {
        newPhase = 'drop';
      } else if (animationName === 'drop') {
        newPhase = 'bounce';
      } else if (animationName === 'bounce') {
        newPhase = 'reveal';
        
        // Iniciar reveal y programar complete
        const revealTimer = setTimeout(() => {
          setState(p => ({ ...p, phase: 'complete' }));
          onIntroComplete?.();
        }, 6500);
        
        timersRef.current.push(revealTimer);
      }

      if (newPhase !== prev.phase) {
        onPhaseChange?.(newPhase);
      }

      return { ...prev, phase: newPhase };
    });
  }, [onIntroComplete, onPhaseChange]);

  // Cleanup
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // Check for nav transition flag
  useEffect(() => {
    const navTransition = sessionStorage.getItem('gd_nav_transition') === '1';
    if (navTransition) {
      sessionStorage.removeItem('gd_nav_transition');
      setState(prev => ({ ...prev, skipIntro: true }));
    }
  }, []);

  return {
    state,
    svgRef,
    incrementCycle,
    markLoaded,
    handleAnimationEnd,
    BEAT,
  };
}

export default useIntroSequence;
