import React from 'react';
import { cn } from '@/lib/utils';
import { useHorizontalDrag } from '@/hooks/useHorizontalDrag';

interface SceneProps {
  variant?: 'intro' | 'divider' | 'moments' | 'space' | 'bridge' | 'details';
  children: React.ReactNode;
  className?: string;
}

export const Scene: React.FC<SceneProps> = ({ variant = 'divider', children, className }) => {
  const { isDragging, dragHandlers } = useHorizontalDrag();
  const isTriad = variant === 'moments' || variant === 'details';

  const getVariantClass = () => {
    switch (variant) {
      case 'intro':
        return 'scene scene-intro';
      case 'divider':
      case 'bridge':
        return 'scene scene-divider';
      case 'moments':
        return 'scene scene-moments scene-triad';
      case 'details':
        return 'scene scene-details scene-triad';
      case 'space':
        return 'scene';
      default:
        return 'scene';
    }
  };

  return (
    <section 
      className={cn(getVariantClass(), isTriad && isDragging && 'is-dragging', className)}
      data-scene={variant}
      {...(isTriad ? dragHandlers : {})}
    >
      {children}
    </section>
  );
};

interface SceneTextProps {
  children: React.ReactNode;
  mobileChildren?: React.ReactNode;
  className?: string;
}

const ResponsiveSceneCopy: React.FC<Pick<SceneTextProps, 'children' | 'mobileChildren'>> = ({ children, mobileChildren }) => (
  mobileChildren === undefined ? <>{children}</> : (
    <>
      <span className="gd-copy-desktop">{children}</span>
      <span className="gd-copy-mobile">{mobileChildren}</span>
    </>
  )
);

export const SceneTitle: React.FC<SceneTextProps> = ({ children, mobileChildren, className }) => (
  <p className={cn("scene-title", className)}>
    <ResponsiveSceneCopy mobileChildren={mobileChildren}>{children}</ResponsiveSceneCopy>
  </p>
);

export const SceneSubtitle: React.FC<SceneTextProps> = ({ children, mobileChildren, className }) => (
  <p className={cn("scene-subtitle", className)}>
    <ResponsiveSceneCopy mobileChildren={mobileChildren}>{children}</ResponsiveSceneCopy>
  </p>
);

export const SceneText: React.FC<SceneTextProps> = ({ children, mobileChildren, className }) => (
  <p className={cn("scene-text", className)}>
    <ResponsiveSceneCopy mobileChildren={mobileChildren}>{children}</ResponsiveSceneCopy>
  </p>
);

export default Scene;
