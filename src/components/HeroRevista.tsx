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

const MOBILE_SLIDES = [
  { href: '/proyectos/magahause', img: '/img/magahause/magahause-exterior-sur-entrada-hero.webp', name: 'MaGa Hause' },
  { href: '/proyectos/donahause', img: '/img/donahause/donahause-hero2.webp', name: 'Dona Hause' },
  { href: '/proyectos/gadehause', img: '/img/gadehause/gadehause-exterior-hero-sur.webp', name: 'Gade Hause' },
  { href: '/proyectos/jobehause', img: '/img/jobehause/jobehause-exterior-frente-hero.webp', name: 'Jobe Hause' },
  { href: '/proyectos/jomahause', img: '/img/jomahause/jomahause-exterior-hero.webp', name: 'Joma Hause' },
  { href: '/proyectos/jonohause', img: '/img/jonohause/jonohause-exterior-hero.webp', name: 'Jono Hause' },
  { href: '/proyectos/cedahause', img: '/img/cedahause/cedahause-exterior-hero-este.webp', name: 'Ceda Hause' },
  { href: '/proyectos/markhause', img: '/img/markhause/markhause-exterior-hero.webp', name: 'Mark Hause' },
  { href: '/proyectos/scohause', img: '/img/scohause/scohause-exterior-hero.webp', name: 'Sco Hause' },
  { href: '/proyectos/vidahause', img: '/img/vidahause/vidahause-exterior-hero.webp', name: 'Vida Hause' },
];

const MobileHeroCarousel: React.FC<{ visible: boolean; className?: string }> = ({ visible, className }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setActive(Math.min(Math.max(index, 0), MOBILE_SLIDES.length - 1));
  }, []);

  return (
    <section
      id="hero-revista-section"
      className={cn(
        'hero-revista-section',
        'transition-all gd-transition-2500 ease-out',
        visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        className
      )}
      aria-label="Hero Revista"
    >
      <div className="hero-revista-shell">
        <div className="gd-carousel">
          <div
            ref={trackRef}
            className="gd-carousel-track"
            onScroll={handleScroll}
            role="group"
            aria-label="Proyectos destacados"
          >
            {MOBILE_SLIDES.map((slide, idx) => (
              <Link
                key={slide.href}
                to={slide.href}
                className="gd-carousel-slide"
                aria-label={`Ver ${slide.name}`}
              >
                <img
                  src={slide.img}
                  alt={slide.name}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  sizes="100vw"
                  draggable={false}
                />
                <span className="gd-carousel-label">{slide.name}</span>
              </Link>
            ))}
          </div>

          <div className="gd-carousel-dots" aria-hidden="true">
            {MOBILE_SLIDES.map((slide, idx) => (
              <span
                key={slide.href}
                className={cn('gd-carousel-dot', idx === active && 'is-active')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRevista;
