import React, { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Hero images for spreads
import magahauseHero from '@/assets/img/magahause/magahause-exterior-sur-entrada-hero.png';
import donahauseHero from '@/assets/img/donahause/donahause-hero2.png';
import gadehauseHero from '@/assets/img/gadehause/gadehause-exterior-hero-sur.png';
import cedahauseHero from '@/assets/img/cedahause/cedahause-exterior-hero-este.png';
import jonohauseHero from '@/assets/img/jonohause/jonohause-exterior-hero.png';
import markhauseHero from '@/assets/img/markhause/markhause-exterior-hero.png';

const SPREAD_IMAGES = [
  { id: 1, src: magahauseHero, alt: 'MaGaHause exterior' },
  { id: 2, src: donahauseHero, alt: 'DoNaHause exterior' },
  { id: 3, src: gadehauseHero, alt: 'GaDeHause exterior' },
  { id: 4, src: cedahauseHero, alt: 'CeDaHause exterior' },
  { id: 5, src: jonohauseHero, alt: 'JoNoHause exterior' },
  { id: 6, src: markhauseHero, alt: 'MarkHause exterior' },
];

interface HeroRevistaProps {
  visible?: boolean;
  className?: string;
}

export const HeroRevista: React.FC<HeroRevistaProps> = ({ visible = true, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isMobile || isInitialized) return;

    const container = containerRef.current;
    const pageWidth = Math.floor(window.innerWidth / 2);
    const pageHeight = window.innerHeight;

    // Initialize PageFlip
    const pageFlip = new PageFlip(container, {
      width: pageWidth,
      height: pageHeight,
      size: 'stretch',
      minWidth: 315,
      maxWidth: 3000,
      drawShadow: true,
      maxShadowOpacity: 0.5,
      showCover: false,
      mobileScrollSupport: false,
    });

    const pages = container.querySelectorAll('.page');
    if (pages.length > 0) {
      pageFlip.loadFromHTML(pages);
      pageFlipRef.current = pageFlip;
      setIsInitialized(true);
    }

    // Handle resize
    const handleResize = () => {
      try {
        const newPageWidth = Math.floor(window.innerWidth / 2);
        const newPageHeight = window.innerHeight;
        if (typeof pageFlip.update === 'function') {
          pageFlip.update({ width: newPageWidth, height: newPageHeight } as any);
        }
      } catch (e) {
        console.error('Error resizing PageFlip:', e);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, [isMobile, isInitialized]);

  // Mobile carousel
  if (isMobile) {
    return (
      <section
        id="hero-revista-section"
        className={cn(
          "relative w-full h-screen flex items-center justify-center p-6 box-border z-30",
          "transition-all duration-[2500ms] ease-out",
          visible ? "opacity-100 visible" : "opacity-0 invisible",
          className
        )}
        aria-label="Hero Revista"
      >
        <div className="hero-revista-shell w-full h-full glass-effect overflow-hidden">
          <div className="w-full h-full overflow-x-auto overflow-y-hidden">
            <div className="flex gap-4 h-full px-4 snap-x snap-mandatory scroll-smooth">
              {SPREAD_IMAGES.map((spread) => (
                <div
                  key={spread.id}
                  className="flex-shrink-0 w-[85vw] h-full rounded-lg snap-center"
                  style={{
                    backgroundImage: `url(${spread.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  role="img"
                  aria-label={spread.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop flip-book
  return (
    <section
      id="hero-revista-section"
      className={cn(
        "relative w-full h-screen flex items-center justify-center p-6 box-border z-30",
        "transition-all duration-[2500ms] ease-out",
        visible ? "opacity-100 visible" : "opacity-0 invisible",
        className
      )}
      aria-label="Hero Revista"
    >
      <div 
        className="hero-revista-shell w-full h-full glass-effect overflow-hidden"
        id="hero-revista-shell"
      >
        <div
          ref={containerRef}
          id="mi-revista"
          className="flip-book w-full h-full relative"
        >
          {/* Generate spread pages */}
          {SPREAD_IMAGES.map((spread) => (
            <React.Fragment key={spread.id}>
              {/* Left page */}
              <div
                id={`spread-${spread.id}-left`}
                className="page spread"
                data-name={`spread-${spread.id}-left`}
              >
                <div
                  className="page-content w-full h-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${spread.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '200% auto',
                    backgroundPosition: 'left center',
                  }}
                />
              </div>
              {/* Right page */}
              <div
                id={`spread-${spread.id}-right`}
                className="page spread"
                data-name={`spread-${spread.id}-right`}
              >
                <div
                  className="page-content w-full h-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${spread.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '200% auto',
                    backgroundPosition: 'right center',
                  }}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroRevista;
