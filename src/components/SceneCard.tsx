import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SceneCardProps {
  to: string;
  image: string;
  alt: string;
  variant?: 'square' | 'wide';
  label?: string;
  actionLabel?: string;
  className?: string;
}

export const SceneCard: React.FC<SceneCardProps> = ({ 
  to, 
  image, 
  alt, 
  variant = 'square',
  label,
  actionLabel = 'Ver proyecto',
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
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover object-center"
        loading="lazy"
        draggable={false}
      />
      {label && (
        <span className="scene-card-caption">
          <span>{label}</span>
          <span className="scene-card-action">{actionLabel}</span>
        </span>
      )}
    </Link>
  );
};

export default SceneCard;
