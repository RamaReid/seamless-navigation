/**
 * useGateReady - Hook para gestionar el gate de arranque del sistema
 * 
 * Implementa las 3 condiciones del PRD:
 * 1. loaderCycles >= N (2 cold start, 1 nav/skip)
 * 2. assetsReady (fuentes, imágenes críticas, layout estable)
 * 3. revistaReady (hero revista listo vía postMessage)
 * 
 * Incluye timeout de seguridad (12-15s) con fallback.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Configuración de tiempos
const STR5_DELAY = 3300; // 3.3s delay para str5
const STR5_DURATION = 1300; // 1.3s duración de str5
const CYCLE_DURATION = STR5_DELAY + STR5_DURATION; // ~4.6s por ciclo

const COLD_START_CYCLES = 2;
const NAV_SKIP_CYCLES = 1;
const GATE_TIMEOUT_MS = 14000; // 14s timeout de seguridad

interface GateState {
  loaderCycles: number;
  assetsReady: boolean;
  revistaReady: boolean;
  gateReady: boolean;
  timedOut: boolean;
  timeoutReason: string | null;
}

interface UseGateReadyOptions {
  isNavSkip?: boolean; // true si viene de navegación interna
  onGateReady?: () => void;
  onTimeout?: (reason: string) => void;
}

export const useGateReady = (options: UseGateReadyOptions = {}) => {
  const { isNavSkip = false, onGateReady, onTimeout } = options;
  
  const requiredCycles = isNavSkip ? NAV_SKIP_CYCLES : COLD_START_CYCLES;
  
  const [state, setState] = useState<GateState>({
    loaderCycles: 0,
    assetsReady: false,
    revistaReady: false,
    gateReady: false,
    timedOut: false,
    timeoutReason: null,
  });
  
  const cycleCountRef = useRef(0);
  const gateReadyFiredRef = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const layoutStableFrames = useRef(0);
  const lastLayoutSize = useRef<{ width: number; height: number } | null>(null);

  // ========================================
  // 1. CONTADOR DE CICLOS DEL LOADER
  // ========================================
  useEffect(() => {
    if (state.gateReady || state.timedOut) return;

    const cycleTimer = setInterval(() => {
      cycleCountRef.current += 1;
      setState(prev => ({ ...prev, loaderCycles: cycleCountRef.current }));
    }, CYCLE_DURATION);

    return () => clearInterval(cycleTimer);
  }, [state.gateReady, state.timedOut, requiredCycles]);

  // ========================================
  // 2. ASSETS READY (Fuentes + Layout estable)
  // ========================================
  useEffect(() => {
    if (state.assetsReady || state.timedOut) return;

    const checkAssetsReady = async () => {
      try {
        // Esperar a que las fuentes estén listas
        if ('fonts' in document) {
          await document.fonts.ready;
        }

        // Verificar layout estable (2 frames consecutivos sin cambios)
        const checkLayoutStability = () => {
          const heroShell = document.getElementById('hero-revista-shell');
          const appLayer = document.getElementById('app-layer');
          const container = heroShell || appLayer;
          
          if (!container) {
            requestAnimationFrame(checkLayoutStability);
            return;
          }

          const rect = container.getBoundingClientRect();
          const currentSize = { width: rect.width, height: rect.height };

          if (lastLayoutSize.current) {
            const sameSize = 
              Math.abs(lastLayoutSize.current.width - currentSize.width) < 1 &&
              Math.abs(lastLayoutSize.current.height - currentSize.height) < 1;

            if (sameSize && currentSize.width > 0 && currentSize.height > 0) {
              layoutStableFrames.current += 1;
            } else {
              layoutStableFrames.current = 0;
            }
          }

          lastLayoutSize.current = currentSize;

          if (layoutStableFrames.current >= 2) {
            setState(prev => ({ ...prev, assetsReady: true }));
          } else {
            requestAnimationFrame(checkLayoutStability);
          }
        };

        // Empezar a verificar layout después de un pequeño delay
        setTimeout(() => {
          requestAnimationFrame(checkLayoutStability);
        }, 100);

      } catch (error) {
        console.error('[Gate] Error checking assets:', error);
        // En caso de error, marcar como ready después de un delay
        setTimeout(() => {
          setState(prev => ({ ...prev, assetsReady: true }));
        }, 2000);
      }
    };

    checkAssetsReady();
  }, [state.assetsReady, state.timedOut]);

  // ========================================
  // 3. REVISTA READY (postMessage desde iframe)
  // ========================================
  useEffect(() => {
    if (state.revistaReady || state.timedOut) return;

    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (type === 'REVISTA_READY') {
        setState(prev => ({ ...prev, revistaReady: true }));
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback: si el iframe no envía el mensaje, verificar después de un tiempo
    const fallbackTimeout = setTimeout(() => {
      const iframe = document.getElementById('hero-iframe') as HTMLIFrameElement;
      if (iframe && !state.revistaReady) {
        // Verificar si el iframe tiene contenido
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc && iframeDoc.body && iframeDoc.body.innerHTML.length > 100) {
            setState(prev => ({ ...prev, revistaReady: true }));
          }
        } catch {
          // Cross-origin, asumir que está listo después de timeout
          setState(prev => ({ ...prev, revistaReady: true }));
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallbackTimeout);
    };
  }, [state.revistaReady, state.timedOut]);

  // ========================================
  // GATE FINAL: Combinar las 3 condiciones
  // ========================================
  useEffect(() => {
    const cyclesOk = state.loaderCycles >= requiredCycles;
    const allReady = cyclesOk && state.assetsReady && state.revistaReady;

    if (allReady && !state.gateReady && !gateReadyFiredRef.current) {
      gateReadyFiredRef.current = true;
      setState(prev => ({ ...prev, gateReady: true }));
      onGateReady?.();
      
      // Limpiar timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }
  }, [state.loaderCycles, state.assetsReady, state.revistaReady, state.gateReady, requiredCycles, onGateReady]);

  // ========================================
  // TIMEOUT DE SEGURIDAD
  // ========================================
  useEffect(() => {
    if (state.gateReady || state.timedOut) return;

    timeoutIdRef.current = setTimeout(() => {
      if (!gateReadyFiredRef.current) {
        const reasons: string[] = [];
        if (state.loaderCycles < requiredCycles) reasons.push('cycles');
        if (!state.assetsReady) reasons.push('assets');
        if (!state.revistaReady) reasons.push('revista');
        
        const reason = `Timeout: ${reasons.join(', ')} not ready`;
        console.warn(`[Gate] ⚠ ${reason}`);
        
        setState(prev => ({ 
          ...prev, 
          timedOut: true, 
          timeoutReason: reason,
          gateReady: true // Forzar gate ready para liberar el sitio
        }));
        
        onTimeout?.(reason);
      }
    }, GATE_TIMEOUT_MS);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [state.gateReady, state.timedOut, state.loaderCycles, state.assetsReady, state.revistaReady, requiredCycles, onTimeout]);

  // ========================================
  // LOGS DE DEBUG
  // ========================================
  useEffect(() => {
      cycles: `${state.loaderCycles}/${requiredCycles}`,
      assetsReady: state.assetsReady,
      revistaReady: state.revistaReady,
      gateReady: state.gateReady,
      timedOut: state.timedOut,
    });
  }, [state, requiredCycles]);

  return {
    ...state,
    requiredCycles,
    cycleProgress: Math.min(state.loaderCycles / requiredCycles, 1),
  };
};

export default useGateReady;
