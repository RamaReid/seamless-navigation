import React from 'react';
import { cn } from '@/lib/utils';

interface SceneProps {
  variant?: 'intro' | 'divider' | 'moments' | 'space' | 'bridge' | 'details';
  children: React.ReactNode;
  className?: string;
}

export const Scene: React.FC<SceneProps> = ({ variant = 'divider', children, className }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'intro':
        return 'scene scene-intro';
      case 'divider':
      case 'bridge':
        return 'scene scene-divider';
      case 'moments':
      case 'details':
        return 'scene scene-moments';
      case 'space':
        return 'scene';
      default:
        return 'scene';
    }
  };

  return (
    <section 
      className={cn(getVariantClass(), className)}
      data-scene={variant}
    >
      {children}
    </section>
  );
};

interface SceneTextProps {
  children: React.ReactNode;
  className?: string;
}

export const SceneTitle: React.FC<SceneTextProps> = ({ children, className }) => (
  <p className={cn("scene-title", className)}>
    {children}
  </p>
);

export const SceneSubtitle: React.FC<SceneTextProps> = ({ children, className }) => (
  <p className={cn("scene-subtitle", className)}>
    {children}
  </p>
);

export const SceneText: React.FC<SceneTextProps> = ({ children, className }) => (
  <p className={cn("scene-text", className)}>
    {children}
  </p>
);

export default Scene;
