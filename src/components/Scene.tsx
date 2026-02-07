import React from 'react';
import { cn } from '@/lib/utils';

interface SceneProps {
  variant?: 'intro' | 'divider' | 'moments' | 'space' | 'bridge' | 'details';
  children: React.ReactNode;
  className?: string;
}

export const Scene: React.FC<SceneProps> = ({ variant = 'divider', children, className }) => {
  return (
    <section 
      className={cn(
        "max-w-gd mx-auto py-8 relative",
        variant === 'intro' && "pb-5",
        variant === 'divider' && "pb-2.5",
        variant === 'moments' && "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8",
        variant === 'details' && "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-8",
        className
      )}
      data-scene={variant}
    >
      {children}
    </section>
  );
};

export const SceneTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn("text-3xl md:text-[40px] font-bold text-center text-white mb-5 mx-auto", className)}>
    {children}
  </p>
);

export const SceneSubtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn("text-xl md:text-[26px] font-bold text-center text-gd-grey mb-3 mx-auto", className)}>
    {children}
  </p>
);

export const SceneText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn("text-xl md:text-[26px] leading-relaxed text-center max-w-gd mx-auto text-gd-grey", className)}>
    {children}
  </p>
);

export default Scene;
