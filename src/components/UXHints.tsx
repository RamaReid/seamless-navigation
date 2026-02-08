/**
 * UXHints - Hints de UX fuera del iframe
 * 
 * - Hint "pasar página" en el vértice inferior derecho del hero revista
 * - Hint "scroll" sutil, persistente por sessionStorage
 * - Ambos se ocultan al primer input correspondiente
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
  const [pageHintVisible, setPageHintVisible] = useState(false);
  const [scrollHintVisible, setScrollHintVisible] = useState(false);

  // Check if hints have been shown before
  useEffect(() => {
    const pageHintShown = sessionStorage.getItem('gd_page_hint_shown') === '1';
    const scrollHintShown = sessionStorage.getItem('gd_scroll_hint_shown') === '1';

    if (showPageHint && !pageHintShown) {
      // Delay showing page hint until after intro
      const timeout = setTimeout(() => setPageHintVisible(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showPageHint]);

  useEffect(() => {
    const scrollHintShown = sessionStorage.getItem('gd_scroll_hint_shown') === '1';
    
    if (showScrollHint && !scrollHintShown) {
      // Show scroll hint after a delay
      const timeout = setTimeout(() => setScrollHintVisible(true), 4000);
      return () => clearTimeout(timeout);
    }
  }, [showScrollHint]);

  // Listen for hero interactions to hide page hint
  useEffect(() => {
    if (!pageHintVisible) return;

    const handleHeroInteraction = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent?.detail?.type;
      if (type === 'HERO_PAGE_FLIP' || type === 'HERO_INTERACTION') {
        setPageHintVisible(false);
        sessionStorage.setItem('gd_page_hint_shown', '1');
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (type === 'HERO_PAGE_FLIP' || type === 'HERO_INTERACTION') {
        setPageHintVisible(false);
        sessionStorage.setItem('gd_page_hint_shown', '1');
      }
    };

    window.addEventListener('heroInteraction', handleHeroInteraction);
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('heroInteraction', handleHeroInteraction);
      window.removeEventListener('message', handleMessage);
    };
  }, [pageHintVisible]);

  // Listen for scroll to hide scroll hint
  useEffect(() => {
    if (!scrollHintVisible) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollHintVisible(false);
        sessionStorage.setItem('gd_scroll_hint_shown', '1');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollHintVisible]);

  return (
    <>
      {/* Hint "pasar página" - bottom-right del hero */}
      {pageHintVisible && (
        <div 
          className={cn(
            "ux-hint ux-hint-page",
            "fixed bottom-[15vh] right-[60px] z-[50]",
            "pointer-events-none select-none",
            "transition-all duration-700 ease-out",
            pageHintVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
          aria-hidden="true"
        >
          <div className="ux-hint-content flex items-center gap-2 text-white/60 text-sm">
            <span className="ux-hint-text">pasar página</span>
            <span className="ux-hint-icon animate-pulse">→</span>
          </div>
        </div>
      )}

      {/* Hint "scroll" - bottom-center */}
      {scrollHintVisible && (
        <div 
          className={cn(
            "ux-hint ux-hint-scroll",
            "fixed bottom-8 left-1/2 -translate-x-1/2 z-[50]",
            "pointer-events-none select-none",
            "transition-all duration-700 ease-out",
            scrollHintVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          aria-hidden="true"
        >
          <div className="ux-hint-content flex flex-col items-center gap-1 text-white/50 text-xs">
            <span className="ux-hint-icon animate-bounce">↓</span>
            <span className="ux-hint-text tracking-widest">scroll</span>
          </div>
        </div>
      )}
    </>
  );
};

export default UXHints;
