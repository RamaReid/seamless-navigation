import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  visible?: boolean;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  visible = true, 
  backgroundImage,
  children,
  className 
}) => {
  return (
    <section 
      id="hero-revista-section"
      className={cn(
        "relative w-full h-screen flex items-center justify-center p-6 box-border z-30",
        "transition-all gd-transition-2500 ease-out",
        visible ? "opacity-100 visible" : "opacity-0 invisible",
        className
      )}
      aria-label="Hero"
    >
      <div 
        className={cn(
          "hero-revista-shell w-full h-full glass-effect overflow-hidden",
          "flex items-center justify-center"
        )}
        id="hero-revista-shell"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default HeroSection;
