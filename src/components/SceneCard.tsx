import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SceneCardProps {
  to: string;
  image: string;
  alt: string;
  variant?: 'square' | 'wide';
  className?: string;
}

export const SceneCard: React.FC<SceneCardProps> = ({ 
  to, 
  image, 
  alt, 
  variant = 'square',
  className 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      to={to}
      className={cn(
        "block w-full rounded-md overflow-hidden transition-all duration-[1500ms]",
        "opacity-0 translate-y-4 scale-[0.99]",
        isVisible && "opacity-100 translate-y-0 scale-100",
        variant === 'wide' && "aspect-[2.56/1] w-[calc(100%+80px)] -mx-10",
        className
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      <img
        src={image}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-[1500ms]",
          "hover:scale-[1.08]",
          variant === 'square' && "aspect-square"
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
    </Link>
  );
};

export default SceneCard;
