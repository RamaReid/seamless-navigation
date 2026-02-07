import React, { useEffect, useRef } from 'react';

interface RadialRevealProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

const RadialReveal: React.FC<RadialRevealProps> = ({ 
  active, 
  duration = 6000,
  onComplete 
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!active) return;

    const circle = circleRef.current;
    const rect = rectRef.current;
    const svg = svgRef.current;
    const overlay = document.getElementById('background-overlay') || 
                    document.querySelector('.background-overlay');
    const logo = document.querySelector('.loader-container svg, #loader-container svg');

    if (!circle || !rect || !svg || !overlay) return;

    // Obtener dimensiones del overlay
    const overlayRect = overlay.getBoundingClientRect();

    // Ajustar SVG al tamaño del overlay
    svg.setAttribute('width', String(overlayRect.width));
    svg.setAttribute('height', String(overlayRect.height));
    svg.setAttribute('viewBox', `0 0 ${overlayRect.width} ${overlayRect.height}`);

    rect.setAttribute('width', String(overlayRect.width));
    rect.setAttribute('height', String(overlayRect.height));

    // Centro del logo (o centro de pantalla si no hay logo)
    let cx = overlayRect.width / 2;
    let cy = overlayRect.height / 2;

    if (logo) {
      const logoRect = logo.getBoundingClientRect();
      cx = logoRect.left + logoRect.width / 2 - overlayRect.left;
      cy = logoRect.top + logoRect.height / 2 - overlayRect.top;
    }

    // Estado inicial del agujero
    circle.setAttribute('cx', String(cx));
    circle.setAttribute('cy', String(cy));
    circle.setAttribute('r', '0');

    // Radio máximo
    const maxRadius = Math.hypot(overlayRect.width, overlayRect.height);

    const startTime = performance.now();

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easing cúbico

      circle.setAttribute('r', String(eased * maxRadius));

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        overlay.style.pointerEvents = 'none';
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [active, duration, onComplete]);

  return (
    <svg
      ref={svgRef}
      id="radialMaskSVG"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <defs>
        <mask
          id="radialHoleMask"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect
            ref={rectRef}
            id="maskRect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="white"
          />
          <circle
            ref={circleRef}
            id="maskHole"
            cx="0"
            cy="0"
            r="0"
            fill="black"
          />
        </mask>
      </defs>
    </svg>
  );
};

export default RadialReveal;
