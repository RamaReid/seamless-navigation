/**
 * TransitionShell - Layout wrapper que aplica el Loader a todas las rutas internas.
 * El scroll cue decorativo se retiró: la continuidad se expresa mediante el
 * contenido y el scroll nativo, no mediante flechas superpuestas.
 */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '@/components/Loader';

interface TransitionShellProps {
  children: React.ReactNode;
}

export const TransitionShell: React.FC<TransitionShellProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isNavSkip, setIsNavSkip] = useState(location.pathname !== '/');
  const hasInitialized = useRef(false);
  const previousPath = useRef<string | null>(null);

  const scrollFromHero = useCallback((deltaY: number) => {
    if (!Number.isFinite(deltaY)) return;

    const boundedDelta = Math.max(-1200, Math.min(1200, deltaY));
    if (boundedDelta === 0) return;

    window.scrollBy({
      top: boundedDelta,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  const scrollToLocation = useCallback(() => {
    const hash = location.hash.replace(/^#/, '');

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    let targetId = hash;
    try {
      targetId = decodeURIComponent(hash);
    } catch {
      // Keep the raw hash when malformed URL encoding is provided.
    }

    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.hash]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      document.body.classList.add('sequence-only');
    } else {
      document.body.classList.remove('sequence-only');
    }

    return () => {
      document.body.classList.remove('sequence-only');
    };
  }, [isTransitioning]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      document.body.classList.remove('hero-visible', 'header-visible', 'reveal-blur');
      previousPath.current = location.pathname;
      return;
    }

    if (previousPath.current !== location.pathname) {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      document.body.classList.remove('hero-visible', 'header-visible', 'reveal-blur');
      setIsNavSkip(true);
      setIsTransitioning(true);
      previousPath.current = location.pathname;
    }
  }, [location.pathname, location.hash]);

  useLayoutEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToLocation);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname, location.hash, scrollToLocation]);

  const handleLoaderComplete = useCallback(() => {
    setIsTransitioning(false);

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    window.dispatchEvent(new CustomEvent('transitionComplete', {
      detail: { path: location.pathname },
    }));
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleHeroMessage = (event: MessageEvent) => {
      const heroIframe = document.getElementById('hero-iframe') as HTMLIFrameElement | null;
      if (
        !heroIframe ||
        event.origin !== window.location.origin ||
        event.source !== heroIframe.contentWindow
      ) {
        return;
      }

      const data = event.data;
      if (!data || typeof data !== 'object' || data.type !== 'HERO_VERTICAL_SCROLL') return;

      scrollFromHero(data.deltaY);
    };

    window.addEventListener('message', handleHeroMessage);
    return () => window.removeEventListener('message', handleHeroMessage);
  }, [scrollFromHero]);

  return (
    <>
      {isTransitioning && (
        <Loader onComplete={handleLoaderComplete} isNavSkip={isNavSkip} />
      )}
      {children}
    </>
  );
};

export default TransitionShell;
