import React, { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Hero images for spreads - 8 spreads total
import magahauseHero from '@/assets/img/magahause/magahause-exterior-sur-entrada-hero.png';
import donahauseHero from '@/assets/img/donahause/donahause-hero2.png';
import gadehauseHero from '@/assets/img/gadehause/gadehause-exterior-hero-sur.png';
import jobehauseHero from '@/assets/img/jobehause/jobehause-exterior-frente-hero.png';
import jomahauseHero from '@/assets/img/jomahause/jomahause-exterior-hero.png';
import jonohauseHero from '@/assets/img/jonohause/jonohause-exterior-hero.png';
import cedahauseHero from '@/assets/img/cedahause/cedahause-exterior-hero-este.png';
import markhauseHero from '@/assets/img/markhause/markhause-exterior-hero.png';

const SPREAD_IMAGES = [
  { id: 1, src: magahauseHero, alt: 'MaGaHause exterior', link: '/proyectos/magahause' },
  { id: 2, src: donahauseHero, alt: 'DoNaHause exterior', link: '/proyectos/donahause' },
  { id: 3, src: gadehauseHero, alt: 'GaDeHause exterior', link: '/proyectos/gadehause' },
  { id: 4, src: jobehauseHero, alt: 'JoBeHause exterior', link: '/proyectos/jobehause' },
  { id: 5, src: jomahauseHero, alt: 'JoMaHause exterior', link: '/proyectos/jomahause' },
  { id: 6, src: jonohauseHero, alt: 'JoNoHause exterior', link: '/proyectos/jonohause' },
  { id: 7, src: cedahauseHero, alt: 'CeDaHause exterior', link: '/proyectos/cedahause' },
  { id: 8, src: markhauseHero, alt: 'MarkHause exterior', link: '/proyectos/markhause' },
];

interface HeroRevistaProps {
  visible?: boolean;
  className?: string;
}

export const HeroRevista: React.FC<HeroRevistaProps> = ({ visible = true, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);

  // Initialize PageFlip after component mounts and is visible
  useEffect(() => {
    if (!visible || isMobile || !containerRef.current) return;

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container || pageFlipRef.current) return;

      const pages = container.querySelectorAll('.page');
      if (pages.length === 0) return;

      try {
        const pageWidth = Math.floor(window.innerWidth / 2);
        const pageHeight = window.innerHeight - 50; // Account for padding

        const pageFlip = new PageFlip(container, {
          width: pageWidth,
          height: pageHeight,
          size: 'stretch',
          minWidth: 315,
          maxWidth: 3000,
          minHeight: 400,
          maxHeight: 2000,
          drawShadow: true,
          flippingTime: 800,
          maxShadowOpacity: 0.5,
          showCover: false,
          mobileScrollSupport: false,
          useMouseEvents: true,
          swipeDistance: 30,
          clickEventForward: false,
          usePortrait: false,
          startPage: 0,
          autoSize: true,
          showPageCorners: true,
        });

        pageFlip.loadFromHTML(pages);
        pageFlipRef.current = pageFlip;
        setIsReady(true);

        // Handle resize
        const handleResize = () => {
          if (pageFlipRef.current) {
            try {
              const newPageWidth = Math.floor(window.innerWidth / 2);
              const newPageHeight = window.innerHeight - 50;
              pageFlipRef.current.updateState({ pageWidth: newPageWidth, pageHeight: newPageHeight } as any);
            } catch (e) {
              // Ignore resize errors
            }
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Error initializing PageFlip:', error);
      }
    }, 500);

    return () => {
      clearTimeout(initTimer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        pageFlipRef.current = null;
      }
    };
  }, [visible, isMobile]);

  // Mobile carousel fallback
  if (isMobile) {
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
          <div className="w-full h-full overflow-x-auto overflow-y-hidden">
            <div className="flex gap-4 h-full px-4 snap-x snap-mandatory scroll-smooth">
              {SPREAD_IMAGES.map((spread) => (
                <a
                  key={spread.id}
                  href={spread.link}
                  className="flex-shrink-0 w-[85vw] h-full rounded-lg snap-center block"
                  style={{
                    backgroundImage: `url(${spread.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
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
        "hero-revista-section",
        "transition-all duration-[2500ms] ease-out",
        visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        className
      )}
      aria-label="Hero Revista"
    >
      <div 
        className="hero-revista-shell"
        id="hero-revista-shell"
      >
        <div
          ref={containerRef}
          id="mi-revista"
          className="flip-book"
        >
          {/* Generate spread pages - each spread needs left and right pages */}
          {SPREAD_IMAGES.map((spread) => (
            <React.Fragment key={spread.id}>
              {/* Left page */}
              <div
                id={`spread-${spread.id}-left`}
                className="page spread"
                data-name={`spread-${spread.id}-left`}
              >
                <div
                  className="page-content"
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
                  className="page-content"
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
      
      {/* Flip hints */}
      {isReady && (
        <>
          <div className="hero-hint hero-flip-hint-left is-visible">
            <span className="flip-arrow">‹</span>
          </div>
          <div className="hero-hint hero-flip-hint-right is-visible">
            <span className="flip-arrow">›</span>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroRevista;
