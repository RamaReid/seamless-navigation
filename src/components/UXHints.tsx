/**
 * UXHints - Hints de UX fuera del iframe
 * 
 * - Hint "pasar página" en el vértice inferior derecho del hero revista
 * - Hint "scroll" sutil en la parte inferior central
 * - SIEMPRE VISIBLES (con atenuación permitida, pero NO desaparecen)
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface UXHintsProps {
  showPageHint?: boolean;
  showScrollHint?: boolean;
}

export const UXHints: React.FC<UXHintsProps> = ({ 
  showPageHint = true, 
  showScrollHint = true 
}) => {
  const [pageHintDimmed, setPageHintDimmed] = useState(false);
  const [scrollHintDimmed, setScrollHintDimmed] = useState(false);
  const [hintsReady, setHintsReady] = useState(false);

  // Show hints after intro completes
  useEffect(() => {
    const handleTransitionComplete = () => {
      // Delay showing hints until after reveal
      setTimeout(() => setHintsReady(true), 1500);
    };

    window.addEventListener('transitionComplete', handleTransitionComplete);
    
    // If already past intro (e.g., nav skip)
    if (document.body.classList.contains('hero-visible')) {
      setTimeout(() => setHintsReady(true), 500);
    }

    return () => {
      window.removeEventListener('transitionComplete', handleTransitionComplete);
    };
  }, []);

  // Listen for hero interactions to DIM (not hide) page hint
  useEffect(() => {
    if (!showPageHint) return;

    const handleHeroInteraction = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent?.detail?.type;
      if (type === 'HERO_PAGE_FLIP' || type === 'HERO_INTERACTION') {
        setPageHintDimmed(true);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (type === 'HERO_PAGE_FLIP' || type === 'HERO_INTERACTION') {
        setPageHintDimmed(true);
      }
    };

    window.addEventListener('heroInteraction', handleHeroInteraction);
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('heroInteraction', handleHeroInteraction);
      window.removeEventListener('message', handleMessage);
    };
  }, [showPageHint]);

  // Listen for scroll to DIM (not hide) scroll hint
  useEffect(() => {
    if (!showScrollHint) return;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrollHintDimmed(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollHint]);

  if (!hintsReady) return null;

  return (
    <>
      {/* Hint "pasar página" - bottom-right del hero (SIEMPRE VISIBLE) */}
      {showPageHint && (
        <div 
          className={cn(
            "ux-hint ux-hint-page",
            "fixed z-[50]",
            "pointer-events-none select-none",
            "transition-all duration-700 ease-out",
            pageHintDimmed ? "opacity-30" : "opacity-80"
          )}
          style={{
            bottom: '15vh',
            right: '50px',
          }}
          aria-hidden="true"
        >
          <div className="ux-hint-content flex items-center gap-2 text-white text-sm">
            <span className="ux-hint-text" style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '0.1em' }}>
              pasar página
            </span>
            <span className="ux-hint-icon animate-pulse text-lg">→</span>
          </div>
        </div>
      )}

      {/* Hint "scroll" - bottom-center (SIEMPRE VISIBLE) */}
      {showScrollHint && (
        <div 
          className={cn(
            "ux-hint ux-hint-scroll",
            "fixed bottom-8 left-1/2 -translate-x-1/2 z-[50]",
            "pointer-events-none select-none",
            "transition-all duration-700 ease-out",
            scrollHintDimmed ? "opacity-20" : "opacity-60"
          )}
          aria-hidden="true"
        >
          <div className="ux-hint-content flex flex-col items-center gap-1 text-white text-xs">
            <span className="ux-hint-icon animate-bounce text-lg">↓</span>
            <span className="ux-hint-text tracking-widest" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              scroll
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UXHints;
