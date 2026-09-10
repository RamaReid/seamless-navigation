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

const DRAG_THRESHOLD = 40;

const MobileHeroCarousel: React.FC<{ visible: boolean; className?: string }> = ({ visible, className }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    setActive(Math.min(Math.max(index, 0), MOBILE_SLIDES.length - 1));
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(index, 0), MOBILE_SLIDES.length - 1);
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    setActive(clamped);
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return; // el táctil ya usa scroll nativo
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { startX: event.clientX, startScroll: track.scrollLeft, moved: false };
    setDragging(true);
    track.setPointerCapture?.(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track) return;
    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    track.scrollLeft = drag.startScroll - dx;
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    setDragging(false);
    if (!drag || !track) return;
    dragRef.current = null;
    track.releasePointerCapture?.(event.pointerId);
    const dx = event.clientX - drag.startX;
    const current = Math.round(drag.startScroll / Math.max(track.clientWidth, 1));
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      goTo(dx < 0 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  }, [goTo]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(active - 1);
    }
  }, [active, goTo]);

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
            className={cn('gd-carousel-track', dragging && 'is-dragging')}
            onScroll={handleScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="group"
            aria-label="Proyectos destacados"
          >
            {MOBILE_SLIDES.map((slide, idx) => (
              <Link
                key={slide.href}
                to={slide.href}
                className="gd-carousel-slide"
                aria-label={`Ver ${slide.name}`}
                draggable={false}
                onClick={(event) => {
                  if (dragRef.current?.moved || dragging) event.preventDefault();
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.name}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  sizes="100vw"
                  draggable={false}
                />
                <span className="gd-carousel-label">{slide.name}</span>
              </Link>
            ))}
          </div>

          <div className="gd-carousel-dots">
            {MOBILE_SLIDES.map((slide, idx) => (
              <button
                key={slide.href}
                type="button"
                className={cn('gd-carousel-dot', idx === active && 'is-active')}
                aria-label={`Ir a ${slide.name}`}
                aria-current={idx === active}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRevista;
