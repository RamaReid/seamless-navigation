import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroRevistaProps {
  visible?: boolean;
  className?: string;
}

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

/** Desktop keeps the PageFlip magazine; mobile uses an image-led editorial entry point. */
export const HeroRevista: React.FC<HeroRevistaProps> = ({ visible = true, className }) => {
  const isMobile = useIsMobile();
  const shellRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const iframe = document.getElementById('hero-iframe') as HTMLIFrameElement | null;
      if (!iframe || event.origin !== window.location.origin || event.source !== iframe.contentWindow) return;

      const data = event.data;
      if (!data || typeof data !== 'object' || typeof data.type !== 'string') return;

      if (data.type === 'HERO_INTERACTION' || data.type === 'HERO_PAGE_FLIP' || data.type === 'HERO_SCROLL_INTENT') {
        window.dispatchEvent(new CustomEvent('heroInteraction', { detail: { type: data.type } }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = useCallback(() => setIframeLoaded(true), []);

  if (isMobile) return <MobileHeroStage visible={visible} className={className} />;

  return (
    <section
      id="hero-revista-section"
      className={cn(
        'hero-revista-section',
        'transition-all gd-transition-2500 ease-out',
        visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        className,
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
            transition: 'opacity 0.5s ease',
          }}
          onLoad={handleIframeLoad}
          title="Revista GD Arquitectura"
        />
      </div>
    </section>
  );
};

const MobileHeroStage: React.FC<{ visible: boolean; className?: string }> = ({ visible, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', containScroll: false });
  const [active, setActive] = useState(0);
  const activeSlide = MOBILE_SLIDES[active];

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelection = () => setActive(emblaApi.selectedScrollSnap());
    updateSelection();
    emblaApi.on('select', updateSelection);
    emblaApi.on('reInit', updateSelection);

    return () => {
      emblaApi.off('select', updateSelection);
      emblaApi.off('reInit', updateSelection);
    };
  }, [emblaApi]);

  const selectSlide = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi?.scrollNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
  };

  return (
    <section
      id="hero-revista-section"
      className={cn(
        'hero-revista-section',
        'mobile-ommi-section',
        'transition-all gd-transition-2500 ease-out',
        visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        className,
      )}
      aria-label="Escenas destacadas de GD"
    >
      <div className="gd-mobile-ommi-stage">
        <Link to={activeSlide.href} className="gd-mobile-ommi-main" aria-label={`Ver ${activeSlide.name}`}>
          <img
            src={activeSlide.img}
            alt={activeSlide.name}
            loading="eager"
            decoding="async"
            sizes="100vw"
            draggable={false}
          />
        </Link>

        <div className="gd-mobile-ommi-rack" role="tablist" aria-label="Seleccionar proyecto destacado">
          <div
            ref={emblaRef}
            className="gd-mobile-ommi-rack-viewport"
            tabIndex={0}
            role="group"
            aria-label="Arrastrar para explorar proyectos"
            onKeyDown={handleKeyDown}
          >
            <div className="gd-mobile-ommi-rack-track">
              {MOBILE_SLIDES.map((slide, index) => (
                <button
                  key={slide.href}
                  data-carousel-item
                  type="button"
                  className={cn('gd-mobile-ommi-thumb', index === active && 'is-active')}
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Mostrar ${slide.name}`}
                  onClick={() => selectSlide(index)}
                >
                  <img src={slide.img} alt="" loading={index < 4 ? 'eager' : 'lazy'} draggable={false} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <h1 className="gd-mobile-ommi-title">El escenario de tu vida</h1>
      </div>
    </section>
  );
};

export default HeroRevista;
