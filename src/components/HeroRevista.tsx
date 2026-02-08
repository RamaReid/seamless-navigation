import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
        console.log('[HeroRevista] Received REVISTA_READY from iframe');
        setRevistaReady(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = useCallback(() => {
    console.log('[HeroRevista] Iframe loaded');
    setIframeLoaded(true);
  }, []);

  // Mobile carousel fallback (matching original revista.html mobile carousel)
  if (isMobile) {
    const slides = [
      { href: '/proyectos/magahause', img: '/img/magahause/magahause-exterior-sur-entrada-hero.png' },
      { href: '/proyectos/donahause', img: '/img/donahause/donahause-hero2.png' },
      { href: '/proyectos/gadehause', img: '/img/gadehause/gadehause-exterior-hero-sur.png' },
      { href: '/proyectos/jobehause', img: '/img/jobehause/jobehause-exterior-frente-hero.png' },
      { href: '/proyectos/jomahause', img: '/img/jomahause/jomahause-exterior-hero.png' },
      { href: '/proyectos/jonohause', img: '/img/jonohause/jonohause-exterior-hero.png' },
      { href: '/proyectos/cedahause', img: '/img/cedahause/cedahause-exterior-hero-este.png' },
      { href: '/proyectos/markhause', img: '/img/markhause/markhause-exterior-hero.png' },
      { href: '/proyectos/scohause', img: '/img/scohause/scohause-exterior-hero.png' },
      { href: '/proyectos/vidahause', img: '/img/vidahause/vidahause-exterior-hero.png' },
    ];

    return (
      <section
        id="hero-revista-section"
        className={cn(
          "hero-revista-section",
          "transition-all duration-[2500ms] ease-out",
          visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
          className
        )}
        aria-label="Hero Revista"
      >
        <div className="hero-revista-shell">
          <div id="hero-carousel" className="carousel w-full h-full overflow-x-auto overflow-y-hidden">
            <div className="carousel-track flex gap-4 h-full px-4 snap-x snap-mandatory scroll-smooth">
              {slides.map((slide, idx) => (
                <a
                  key={idx}
                  href={slide.href}
                  className="slide flex-shrink-0 w-[85vw] h-full rounded-lg snap-center block"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  aria-label={`Ver proyecto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: iframe with PageFlip flip-book (matching original home.js behavior)
  return (
    <section
      id="hero-revista-section"
      className={cn(
        "hero-revista-section",
        "transition-all duration-[2500ms] ease-out",
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
