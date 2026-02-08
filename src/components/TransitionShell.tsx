/**
 * TransitionShell - Layout wrapper que aplica el Loader a TODAS las rutas internas
 * 
 * Protocolo de transición universal:
 * - Antes de navegar: sessionStorage.gd_nav_transition = "1"
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
  const [isNavSkip, setIsNavSkip] = useState(false);
  const hasInitialized = useRef(false);
  const previousPath = useRef<string | null>(null);

  // Initial mount - determine if cold start or nav skip
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      const isNavTransition = sessionStorage.getItem('gd_nav_transition') === '1';
      
      if (isNavTransition) {
        sessionStorage.removeItem('gd_nav_transition');
        setIsNavSkip(true);
      }
      
      previousPath.current = location.pathname;
      // Loader is already shown (isTransitioning = true)
      return;
    }

    // Subsequent navigation
    if (previousPath.current !== location.pathname) {
      const isNavTransition = sessionStorage.getItem('gd_nav_transition') === '1';
      
      if (isNavTransition) {
        sessionStorage.removeItem('gd_nav_transition');
        
        // Reset for transition
        window.scrollTo(0, 0);
        document.body.classList.remove('hero-visible', 'header-visible', 'sequence-only');
        
        setIsNavSkip(true);
        setIsTransitioning(true);
      }
      
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
    
    console.log('[TransitionShell] Transition complete:', location.pathname);
  }, [location.pathname]);

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
    </>
  );
};

export default TransitionShell;
