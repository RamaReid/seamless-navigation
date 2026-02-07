import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Hero images for spreads - 10 spreads total (matching original)
import magahauseHero from '@/assets/img/magahause/magahause-exterior-sur-entrada-hero.png';
import donahauseHero from '@/assets/img/donahause/donahause-hero2.png';
import gadehauseHero from '@/assets/img/gadehause/gadehause-exterior-hero-sur.png';
import jobehauseHero from '@/assets/img/jobehause/jobehause-exterior-frente-hero.png';
import jomahauseHero from '@/assets/img/jomahause/jomahause-exterior-hero.png';
import jonohauseHero from '@/assets/img/jonohause/jonohause-exterior-hero.png';
import cedahauseHero from '@/assets/img/cedahause/cedahause-exterior-hero-este.png';
import markhauseHero from '@/assets/img/markhause/markhause-exterior-hero.png';

// Spread configuration matching original revista.js
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
  const [currentSpread, setCurrentSpread] = useState(0);
  const pageContentsRef = useRef<HTMLDivElement[]>([]);

  // Fix ghosting: hide page contents during flip, show on read state
  const hideAllPageContents = useCallback(() => {
    pageContentsRef.current.forEach(el => {
      if (el) el.style.opacity = '0';
    });
  }, []);

  const showAllPageContents = useCallback(() => {
    pageContentsRef.current.forEach(el => {
      if (el) el.style.opacity = '1';
    });
  }, []);

  // Initialize PageFlip after component mounts and is visible
  useEffect(() => {
    if (!visible || isMobile || !containerRef.current) return;

    let handleResize: (() => void) | null = null;

    const initTimer = setTimeout(() => {
      const container = containerRef.current;
      if (!container || pageFlipRef.current) return;

      const pages = container.querySelectorAll('.page');
      if (pages.length === 0) return;

      // Collect all page-content elements for ghosting fix
      pageContentsRef.current = Array.from(container.querySelectorAll('.page-content')) as HTMLDivElement[];

      try {
        // Use container dimensions (matching original revista.js)
        const pageWidth = Math.floor(window.innerWidth / 2);
        const pageHeight = window.innerHeight;

        const pageFlip = new PageFlip(container, {
          width: pageWidth,
          height: pageHeight,
          size: 'stretch',
          minWidth: 315,
          maxWidth: 3000,
          minHeight: 400,
          maxHeight: 2000,
          drawShadow: true,
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
        
        // Ensure initial visibility
        showAllPageContents();
        setIsReady(true);

        // FIX GHOSTING: During flip -> hide page contents
        pageFlip.on('flip', () => {
          hideAllPageContents();
          // Update current spread for navigation
          const pageIndex = pageFlip.getCurrentPageIndex();
          setCurrentSpread(Math.floor(pageIndex / 2));
        });

        // When flip ends and stable ('read' state) -> show page contents
        pageFlip.on('changeState', (e: any) => {
          if (e.data === 'read') {
            showAllPageContents();
          }
        });

        // Handle resize
        handleResize = () => {
          if (!pageFlipRef.current) return;
          try {
            const newPageWidth = Math.floor(window.innerWidth / 2);
            const newPageHeight = window.innerHeight;
            // Use update method as per original
            if (typeof (pageFlipRef.current as any).update === 'function') {
              (pageFlipRef.current as any).update({ width: newPageWidth, height: newPageHeight });
            }
          } catch {
            // Ignore resize errors
          }
        };

        window.addEventListener('resize', handleResize);
      } catch (error) {
        console.error('Error initializing PageFlip:', error);
      }
    }, 500);

    return () => {
      clearTimeout(initTimer);
      if (handleResize) window.removeEventListener('resize', handleResize);

      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        pageFlipRef.current = null;
      }
    };
  }, [visible, isMobile, hideAllPageContents, showAllPageContents]);

  // Navigation handlers
  const goToPrev = useCallback(() => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  }, []);

  const goToNext = useCallback(() => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  }, []);

  // Get adjacent spread labels
  const prevSpread = currentSpread > 0 ? SPREAD_IMAGES[currentSpread - 1] : null;
  const nextSpread = currentSpread < SPREAD_IMAGES.length - 1 ? SPREAD_IMAGES[currentSpread + 1] : null;

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
          <div id="hero-carousel" className="carousel w-full h-full overflow-x-auto overflow-y-hidden">
            <div className="carousel-track flex gap-4 h-full px-4 snap-x snap-mandatory scroll-smooth">
              {SPREAD_IMAGES.map((spread) => (
                <Link
                  key={spread.id}
                  to={spread.link}
                  className="slide flex-shrink-0 w-[85vw] h-full rounded-lg snap-center block"
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
          className="flip-book desktop-only"
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
                  ref={(el) => {
                    if (el) pageContentsRef.current.push(el);
                  }}
                  style={{
                    backgroundImage: `url(${spread.src})`,
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
                  ref={(el) => {
                    if (el) pageContentsRef.current.push(el);
                  }}
                  style={{
                    backgroundImage: `url(${spread.src})`,
                    backgroundPosition: 'right center',
                  }}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Hero carousel controls (matching original home.css) */}
      {isReady && (
        <div className="house-hero-carousel">
          {prevSpread && (
            <button 
              className="house-hero-control house-hero-prev"
              onClick={goToPrev}
              aria-label={`Anterior: ${prevSpread.alt}`}
            >
              <span className="house-hero-arrow">‹</span>
              <span className="house-hero-label">{prevSpread.alt.split(' ')[0]}</span>
            </button>
          )}
          {nextSpread && (
            <button 
              className="house-hero-control house-hero-next"
              onClick={goToNext}
              aria-label={`Siguiente: ${nextSpread.alt}`}
            >
              <span className="house-hero-label">{nextSpread.alt.split(' ')[0]}</span>
              <span className="house-hero-arrow">›</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroRevista;
