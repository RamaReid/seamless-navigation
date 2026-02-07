import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoaderSVG from './LoaderSVG';

interface IntroLayerProps {
  onIntroComplete?: () => void;
  skipIntro?: boolean;
}

type Phase = 'loading' | 'lift' | 'drop' | 'bounce' | 'reveal' | 'complete';

const IntroLayer: React.FC<IntroLayerProps> = ({ onIntroComplete, skipIntro = false }) => {
  const [phase, setPhase] = useState<Phase>('loading');
  const [loaderCycles, setLoaderCycles] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const loaderKeyRef = useRef(0);

  // Marcar como cargado cuando window.load
  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);
    
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Manejar ciclo completo del loader
  const handleCycleComplete = useCallback(() => {
    setLoaderCycles(prev => {
      const newCycles = prev + 1;
      
      // Si skipIntro y tenemos al menos 1 ciclo, iniciar reveal
      if (skipIntro && newCycles >= 1) {
        setPhase('reveal');
      }
      
      return newCycles;
    });
    
    // Si no hemos alcanzado condiciones de ready, reiniciar el loader
    // Esto se logra cambiando la key del componente
    if (!skipIntro && (loaderCycles < 1 || !isLoaded)) {
      loaderKeyRef.current += 1;
    }
  }, [skipIntro, loaderCycles, isLoaded]);

  // Verificar condiciones de appReady
  useEffect(() => {
    if (skipIntro) return;
    
    if (isLoaded && loaderCycles >= 2 && phase === 'loading') {
      // Iniciar secuencia de intro (lift)
      setPhase('lift');
    }
  }, [isLoaded, loaderCycles, phase, skipIntro]);

  // Manejar fin de animaciones del logo
  const handleAnimationEnd = useCallback((animationName: string) => {
    if (animationName === 'lift') {
      setPhase('drop');
    } else if (animationName === 'drop') {
      setPhase('bounce');
    } else if (animationName === 'bounce') {
      setPhase('reveal');
    }
  }, []);

  // Cuando entramos en fase reveal, iniciar el radial reveal
  useEffect(() => {
    if (phase !== 'reveal') return;

    // Desvanecer el logo
    const logo = loaderContainerRef.current?.querySelector('svg');
    if (logo) {
      logo.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      logo.style.opacity = '0';
    }

    // El radial reveal se maneja por el componente RadialReveal
    // Solo necesitamos programar cuando ocultar el layer
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      setPhase('complete');
      onIntroComplete?.();
    }, 6500);

    return () => clearTimeout(hideTimer);
  }, [phase, onIntroComplete]);

  // Determinar clase del SVG según fase
  const getSVGClassName = () => {
    switch (phase) {
      case 'lift': return 'lift-logo';
      case 'drop': return 'drop-logo';
      case 'bounce': return 'bounce-logo';
      default: return '';
    }
  };

  if (isHidden) return null;

  return (
    <div 
      id="intro-layer" 
      className="intro-layer"
      style={{ display: isHidden ? 'none' : undefined }}
    >
      {/* Overlay con máscara radial */}
      <div 
        id="background-overlay" 
        className="background-overlay"
      />
      
      {/* Loader stage */}
      <div id="loader-stage" className="loader-stage">
        <div 
          ref={loaderContainerRef}
          id="loader-container" 
          className="loader-container"
        >
          <LoaderSVG
            key={loaderKeyRef.current}
            className={getSVGClassName()}
            onCycleComplete={handleCycleComplete}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroLayer;
