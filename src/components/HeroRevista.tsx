import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

interface HeroRevistaProps {
  visible?: boolean;
  className?: string;
}

/**
 * HeroRevista - Loads the revista as an iframe (matching original GDWeb behavior)
 * The iframe contains the PageFlip flip-book which handles all page-turning logic
 * and ghosting fixes internally.
 */
export const HeroRevista: React.FC<HeroRevistaProps> = ({ visible = true, className }) => {
  const isMobile = useIsMobile();
  const shellRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [revistaReady, setRevistaReady] = useState(false);

  // Handle messages from the revista iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const type = event?.data?.type;
      if (typeof type !== 'string') return;
      
      // Re-dispatch to parent for header-on-scroll behavior
      if (type === 'HERO_INTERACTION' || type === 'HERO_PAGE_FLIP' || type === 'HERO_SCROLL_INTENT') {
        window.dispatchEvent(new CustomEvent('heroInteraction', { detail: { type } }));
      }
      
      // Revista ready signal from iframe
      if (type === 'REVISTA_READY') {
        setRevistaReady(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  // Mobile: carrusel de fotos (una por pantalla)
  if (isMobile) {
    return (
      <MobileHeroCarousel visible={visible} className={className} />
    );
  }


  // Desktop: iframe with PageFlip flip-book (matching original home.js behavior)
  return (
    <section
      id="hero-revista-section"
      className={cn(
        "hero-revista-section",
        "transition-all gd-transition-2500 ease-out",
        visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        className
      )}
      aria-label="Hero Revista"
    >
      <div 
        ref={shellRef}
        className="hero-revista-shell"
        id="hero-revista-shell"
        data-hero-src="/revista/revista.html"
        data-no-smooth
      >
        <iframe
          id="hero-iframe"
          src="/revista/revista.html"
          style={{
            width: '100%',
            height: '100%',
            border: '0',
            opacity: iframeLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
          onLoad={handleIframeLoad}
          title="Revista GD Arquitectura"
        />
      </div>
    </section>
  );
};

export default HeroRevista;
