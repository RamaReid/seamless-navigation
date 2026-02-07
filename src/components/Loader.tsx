import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  onComplete?: () => void;
}

// Timing constants matching original boot.js + intro.js
const LOADER_CYCLES_REQUIRED = 2;
const STR5_DELAY = 3300; // 3.3s delay for str5
const STR5_DURATION = 1300; // 1.3s duration for str5
const CYCLE_DURATION = STR5_DELAY + STR5_DURATION; // ~4.6s per cycle
const RADIAL_REVEAL_DURATION = 6000; // 6s for radial reveal

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'loading' | 'lift' | 'drop' | 'bounce' | 'reveal' | 'complete'>('loading');
  const [visible, setVisible] = useState(true);
  const [loaderCycles, setLoaderCycles] = useState(0);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [revealRadius, setRevealRadius] = useState(0);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const cycleCountRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Track window load
  useEffect(() => {
    const handleLoad = () => setWindowLoaded(true);
    
    if (document.readyState === 'complete') {
      setWindowLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Simulate loader cycles (matching loader.js behavior)
  useEffect(() => {
    if (phase !== 'loading') return;

    const cycleTimer = setInterval(() => {
      cycleCountRef.current += 1;
      setLoaderCycles(cycleCountRef.current);
    }, CYCLE_DURATION);

    return () => clearInterval(cycleTimer);
  }, [phase]);

  // Gate: window.load + loaderCycles >= 2 => start intro (matching boot.js)
  useEffect(() => {
    if (phase !== 'loading') return;
    if (!windowLoaded) return;
    if (loaderCycles < LOADER_CYCLES_REQUIRED) return;

    // Gate passed - start intro sequence
    setPhase('lift');
  }, [phase, windowLoaded, loaderCycles]);

  // Handle phase transitions (lift -> drop -> bounce -> reveal)
  useEffect(() => {
    if (phase === 'loading') return;

    const svg = svgRef.current;
    if (!svg) return;

    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.target !== svg) return;

      if (e.animationName === 'lift') {
        setPhase('drop');
      } else if (e.animationName === 'drop') {
        setPhase('bounce');
      } else if (e.animationName === 'bounce') {
        setPhase('reveal');
      }
    };

    svg.addEventListener('animationend', handleAnimationEnd as EventListener);
    return () => svg.removeEventListener('animationend', handleAnimationEnd as EventListener);
  }, [phase]);

  // Radial Reveal Animation
  useEffect(() => {
    if (phase !== 'reveal') return;

    const svg = svgRef.current;
    if (svg) {
      svg.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      svg.style.opacity = "0";
    }

    // Dispatch introComplete event
    window.dispatchEvent(new Event("introComplete"));
    document.body.classList.remove("sequence-only");

    // Calculate max radius
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / RADIAL_REVEAL_DURATION);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setRevealRadius(eased * maxRadius);

      if (t < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Complete
        setTimeout(() => {
          setPhase('complete');
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 500);
        }, 500);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase, onComplete]);

  if (!visible) return null;

  const getPhaseClass = () => {
    switch (phase) {
      case 'lift':
        return 'animate-[lift_2s_cubic-bezier(0.22,0.6,0.2,1)_forwards]';
      case 'drop':
        return 'animate-[drop_0.55s_cubic-bezier(0,0,0.2,1)_forwards]';
      case 'bounce':
        return 'animate-[bounce_0.4s_cubic-bezier(0.25,0.5,0.5,1)_forwards]';
      default:
        return '';
    }
  };

  // Calculate center for reveal (center of screen)
  const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;

  return (
    <>
      {/* Intro Layer - Fixed fullscreen */}
      <div 
        id="intro-layer"
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        {/* 
          CAPA DE COBERTURA con SVG Mask
          La máscara SVG crea un "agujero" que crece desde el centro.
          - Rect blanco = visible
          - Circle negro = agujero (transparente)
        */}
        <svg
          className="absolute inset-0 w-full h-full z-[2]"
          style={{ pointerEvents: 'none' }}
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="revealMask">
              {/* Área blanca = se muestra el overlay */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Círculo negro = agujero transparente que crece */}
              <circle cx={cx} cy={cy} r={revealRadius} fill="black" />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsl(226, 38%, 10%)"
            mask="url(#revealMask)"
            style={{
              opacity: phase === 'complete' ? 0 : 1,
              transition: phase === 'complete' ? 'opacity 0.5s ease' : 'none',
            }}
          />
        </svg>
        
        {/* Loader Stage - Centered logo */}
        <div 
          id="loader-stage" 
          className="absolute inset-0 flex items-center justify-center z-[3]"
        >
          <div 
            id="loader-container"
            className="loader-container"
            style={{ 
              width: 'var(--gd-logo-width, 300px)', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg 
              ref={svgRef}
              viewBox="0 0 210 170" 
              className={cn(
                "w-full h-auto block",
                getPhaseClass()
              )}
              style={{ 
                transformOrigin: '50% 70%',
                maxWidth: '90vw'
              }}
            >
              <defs>
                <mask id="maskX" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectX" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-x"/>
                </mask>
                
                <mask id="maskY" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectY" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-y"/>
                </mask>
                
                <mask id="maskTop" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectTop" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-ltr"/>
                </mask>
                
                <mask id="maskBottom" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectBottom" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-rtl"/>
                </mask>
                
                <mask id="maskLeft" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectLeft" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-ttb"/>
                </mask>
                
                <mask id="maskRight" maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="210" height="170" fill="black"/>
                  <rect id="rectRight" x="0" y="0" width="210" height="170" fill="white" className="mask-reveal-btt"/>
                </mask>
              </defs>
              
              {/* Capa 1: Horizontal punteada */}
              <line className="str0" x1="9.0716" y1="85.2402" x2="204.1578" y2="85.2402" mask="url(#maskX)" />
              
              {/* Capa 2: Vertical punteada */}
              <line className="str0" x1="106.6195" y1="15.5714" x2="106.6195" y2="154.9187" mask="url(#maskY)" />
              
              {/* Capa 3: Marco */}
              <line className="str1" x1="22.3182" y1="51.9211" x2="185.0042" y2="51.9211" mask="url(#maskTop)" />
              <line className="str1" x1="185.0042" y1="118.5687" x2="22.3182" y2="118.5687" mask="url(#maskBottom)" />
              <line className="str1" x1="40.4825" y1="30.2342" x2="40.4825" y2="137.8011" mask="url(#maskLeft)" />
              <line className="str1" x1="173.3234" y1="36.2735" x2="173.778" y2="134.9636" mask="url(#maskRight)" />
              
              {/* Capa 4: Trazo gris */}
              <path className="str2" d="M40.2984 91.3929l-24.5814 -24.5814m24.739 16.8603l-20.4766 -20.4767m21.2644 13.8587l-13.4553 -13.4554m14.7903 6.6471l-19.4185 -19.154m22.7901 13.4333l-19.6266 -19.2516m24.0593 15.393l-16.1737 -16.174m20.284 12.3788l-24.2662 -24.2662m28.029 21.4377l-20.5351 -20.535m25.4782 18.2299l-18.6113 -18.6114m27.0674 18.8737l-24.7692 -24.7694m32.4902 24.6118l-17.1474 -17.1475m24.8685 17.4627l-24.8965 -24.8965m32.6177 24.7388l-30.4333 -30.4334m38.548 30.1971l-20.8176 -20.8178m23.9743 16.4346l-21.1986 -22.3254m21.2069 13.3015l-10.1705 -10.1706m10.6916 4.1006l-11.125 -11.125m10.5904 112.855l-15.7602 -15.7602m9.8488 17.7272l-18.4335 -18.4332m-7.2483 0.1575l31.3568 31.3569m-39.3064 -32.1251l21.4234 22.1206m-69.6592 -61.4654l58.0721 58.072m3 10.2484l-57.6968 -57.6967m40.844 47.4351l-35.4694 -35.4691m4.0871 11.9924l24.4343 24.4343m-26.4029 -17.7365l19.2316 19.2314m58.2132 -113.3956l-8.0492 -8.0492"/>
              
              {/* Capa 5: G interior y exterior (rojo) */}
              <polyline className="str3" points="106.6195,82.9488 104.2629,80.3041 106.6195,85.245 101.6786,80.3041 106.6195,87.4096 99.541,80.3041 106.6195,89.7911 97.1325,80.3041 104.4452,90.0939 94.9097,80.3041 102.3762,90.0939 92.5865,80.3041 100.2251,90.0939 90.4141,80.3041 97.8299,90.0939 88.0403,80.3041 95.3396,90.0939 85.9997,80.3041 93.284,90.0939 83.4942,80.3041 90.9876,90.0939 81.3534,80.3041 88.7379,90.0939 78.9481,80.3041 86.4567,90.0939 76.7517,80.3041 84.1918,90.0939 74.4018,80.3041 83.2476,91.2387 73.0841,81.1464 83.2476,93.696 73.084,83.5326 83.2476,95.7476 73.0841,85.6456 82.0756,96.9055 73.0841,88.0787 79.7167,96.9592 73.0841,90.0939 77.4185,96.9592 73.0841,92.6248 75.1865,96.9592 73.084,94.8639 73.7147,96.9592"/>
              
              <path className="str4" d="M55.1067 114.5553l15.9655 15.8777 -10.3657 -14.9084 14.5875 14.9402 -8.3474 -12.8934 12.9635 12.9193 -7.6697 -12.1716 12.1902 12.1902 -7.7936 -12.3396 12.3397 12.3396 -7.644 -12.1902 12.1902 12.1902 -7.6441 -12.1902 12.1901 12.1902 -7.7934 -12.3397 12.3395 12.3395 -7.7934 -12.3395 11.673 11.673 -6.9775 -11.5234 6.9774 6.9773 -2.4313 -6.9774 2.4314 2.4312m0.0083 -81.762l-5.8022 -5.802 5.7939 10.2798 -7.9219 -8.1888 7.9219 12.7349 -12.1828 -12.419 12.2885 17.3717 -16.048 -16.557 10.336 15.0903 -14.5139 -14.7504 9.9679 14.7504 -13.8837 -14.1987 9.3376 14.1987 -13.3322 -13.3322 8.786 13.3322 -13.3281 -13.3322 8.782 13.3322 -13.1882 -13.1881 8.642 13.1881 -12.6847 -12.6846 8.1386 12.6846 -11.8866 -11.8866 7.3405 11.8866 -10.8377 -10.8375 7.2147 11.7608 -10.4912 -10.4913 6.9937 11.5399 -10.0717 -10.0718 6.8737 11.4199 -9.7688 -9.7687 6.9236 11.3233 -9.6468 -9.5005 6.8591 11.4052 -9.4183 -9.4181 6.9461 11.4922 -9.3456 -9.3456 7.0924 11.6385 -9.3344 -9.3345 7.3006 11.8469 -9.3847 -9.3847 7.5779 12.1239 -9.5008 -9.5008 7.936 12.4823 -9.6922 -9.6924 8.3954 12.9416 -9.976 -9.976 8.9873 13.5336 -10.3793 -10.3794 9.6104 14.1566 -10.7959 -10.7961 10.817 15.3632 -11.7714 -11.7713 12.3486 16.8946 -13.0365 -13.0365 18.1694 22.1865 -18.5404 -18.0114 23.489 27.1108 -23.4657 -22.5412 38.4752 43.0213 -37.9152 -37.9151 31.9672 36.5131 -30.5652 -30.5651 23.4369 27.9829 -20.2772 -20.277"/>
              
              {/* Capa 6: D azul */}
              <path className="str5" d="M108.2842 119.0335l-2.2381 -2.9343 5.8936 3.0836 -5.6208 -6.6608 11.0576 6.5115 -11.0576 -11.0577 15.7532 11.207 -15.7532 -15.7531 20.2993 15.7531 -20.2993 -20.2993 24.6961 20.15 -24.8465 -24.8465 29.542 24.9958 -29.2693 -29.2692 33.2134 28.6672 -28.6744 -28.6742 33.3777 28.8314 -28.8387 -28.8386 32.684 28.1379 -28.1448 -28.145 31.6337 27.0877 -27.0947 -27.0948 30.2656 25.7195 -25.7266 -25.7265 28.6077 24.0615 -24.0687 -24.0687 26.6804 22.1342 -22.1413 -22.1413 24.4975 19.9515 -23.0574 -23.0575 25.1664 20.6202 -25.1664 -25.1664 27.0306 22.4846 -52.3113 -52.3114 53.9277 49.3815 -49.3839 -49.3837 50.7416 46.1954 -46.1988 -46.1988 47.278 42.7317 -42.736 -42.736 43.5009 38.9549 -38.9596 -38.9596 39.3497 34.8036 -34.8088 -34.8088 34.7115 30.1653 -30.1683 -30.1684 29.3408 24.7946 -24.1128 -24.1126 21.7898 17.2437 -15.197 -15.197m-43.0371 25.1548l-4.0927 -4.5901 8.6317 4.5831 -8.6317 -8.6318 13.1707 8.6246 -13.1707 -13.1707 17.7098 13.1636 -17.7935 -17.7934 22.3325 17.7864 -22.2488 -22.2489 26.7878 22.2418 -26.7878 -26.788 31.327 26.7808 -27.8181 -27.8179 29.8268 25.2807"/>
            </svg>
          </div>
        </div>
      </div>

    </>
  );
};

export default Loader;
