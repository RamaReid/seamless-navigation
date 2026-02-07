import React from 'react';
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
  return (
    <Link
      to={to}
      className={cn(
        "scene-card block w-full rounded-md overflow-hidden",
        variant === 'wide' && "wide",
        variant === 'square' && "square",
        className
      )}
      onClick={() => {
        sessionStorage.setItem('gd_nav_transition', '1');
      }}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </Link>
  );
};

export default SceneCard;
