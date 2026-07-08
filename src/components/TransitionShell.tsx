/**
 * TransitionShell - Layout wrapper que aplica el Loader a TODAS las rutas internas
 * 
 * Protocolo de transición universal:
 * - Cambio de pathname => transición interna con loader
 * - Loader + radial reveal + reset
 * - Al entrar al destino: scrollTo(0,0), limpiar clases, recalcular header
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '@/components/Loader';

interface TransitionShellProps {
  children: React.ReactNode;
}

export const TransitionShell: React.FC<TransitionShellProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true); // Start with loader
  // Canon:
  // - cold start on "/" => FULL_HOME_INTRO
  // - any other case => NAV_INTRO
  const [isNavSkip, setIsNavSkip] = useState(location.pathname !== '/');
  const [showScrollCue, setShowScrollCue] = useState(false);
  const hasInitialized = useRef(false);
  const previousPath = useRef<string | null>(null);
  const scrollCueTimerRef = useRef<number | null>(null);

  // Initial mount - determine if cold start or nav skip
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      document.body.classList.remove('hero-visible', 'header-visible', 'sequence-only');
      setShowScrollCue(false);
      previousPath.current = location.pathname;
      // Loader is already shown (isTransitioning = true)
      return;
    }

    // Subsequent navigation (always transition on route change)
    if (previousPath.current !== location.pathname) {
      // Reset for transition
      window.scrollTo(0, 0);
      document.body.classList.remove('hero-visible', 'header-visible', 'sequence-only');
      setShowScrollCue(false);

      setIsNavSkip(true);
      setIsTransitioning(true);
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);

  const handleLoaderComplete = useCallback(() => {
    setIsTransitioning(false);
    
    // Ensure scroll is at top
    window.scrollTo(0, 0);
    
    // Dispatch event for pages to react
    window.dispatchEvent(new CustomEvent('transitionComplete', { 
      detail: { path: location.pathname } 
    }));
    
  }, [location.pathname]);

  // Scroll cue global para todas las rutas: solo visible cuando no hay interaccion
  useEffect(() => {
    if (isTransitioning) {
      setShowScrollCue(false);
      if (scrollCueTimerRef.current) {
        clearTimeout(scrollCueTimerRef.current);
        scrollCueTimerRef.current = null;
      }
      return;
    }

    const scheduleScrollCue = () => {
      if (scrollCueTimerRef.current) {
        clearTimeout(scrollCueTimerRef.current);
      }

      scrollCueTimerRef.current = window.setTimeout(() => {
        if ((window.scrollY || 0) <= 24) {
          setShowScrollCue(true);
        }
      }, 3000);
    };

    const registerInteraction = (event?: Event) => {
      if (event && 'isTrusted' in event && event.isTrusted === false) return;
      setShowScrollCue(false);
      scheduleScrollCue();
    };

    const handleHeroInteraction = () => {
      registerInteraction();
    };

    const handleHeroMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (type === 'HERO_INTERACTION' || type === 'HERO_PAGE_FLIP' || type === 'HERO_SCROLL_INTENT') {
        registerInteraction();
      }
    };

    // Primera aparicion solo tras inactividad
    scheduleScrollCue();

    window.addEventListener('mousemove', registerInteraction, { passive: true });
    window.addEventListener('pointerdown', registerInteraction);
    window.addEventListener('wheel', registerInteraction, { passive: true });
    window.addEventListener('touchstart', registerInteraction, { passive: true });
    window.addEventListener('touchmove', registerInteraction, { passive: true });
    window.addEventListener('keydown', registerInteraction);
    window.addEventListener('scroll', registerInteraction, { passive: true });
    window.addEventListener('heroInteraction', handleHeroInteraction);
    window.addEventListener('message', handleHeroMessage);

    return () => {
      if (scrollCueTimerRef.current) {
        clearTimeout(scrollCueTimerRef.current);
        scrollCueTimerRef.current = null;
      }

      window.removeEventListener('mousemove', registerInteraction);
      window.removeEventListener('pointerdown', registerInteraction);
      window.removeEventListener('wheel', registerInteraction);
      window.removeEventListener('touchstart', registerInteraction);
      window.removeEventListener('touchmove', registerInteraction);
      window.removeEventListener('keydown', registerInteraction);
      window.removeEventListener('scroll', registerInteraction);
      window.removeEventListener('heroInteraction', handleHeroInteraction);
      window.removeEventListener('message', handleHeroMessage);
    };
  }, [isTransitioning, location.pathname]);

  return (
    <>
      {isTransitioning && (
        <Loader 
          onComplete={handleLoaderComplete} 
          isNavSkip={isNavSkip}
        />
      )}
      {/* Always render children but they control their own visibility via body classes */}
      {children}
      {showScrollCue && (
        <div className="home-scroll-cue" aria-hidden="true">
          <div className="home-scroll-cue__glow" />
          <div className="home-scroll-cue__chevrons">
            <span />
            <span />
            <span />
          </div>
          <div className="home-scroll-cue__peek" />
        </div>
      )}
    </>
  );
};

export default TransitionShell;
