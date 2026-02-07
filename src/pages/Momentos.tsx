import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';

interface HeroPhoto {
  id: string;
  href: string;
  image: string;
  title: string;
  style: {
    x: string;
    y: string;
    r: string;
    z: number;
    delay: string;
  };
}

const heroPhotos: HeroPhoto[] = [
  { id: 'hola', href: '#hola', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', title: 'llegar', style: { x: '16%', y: '30%', r: '-12deg', z: 3, delay: '0ms' }},
  { id: 'cafe', href: '#cafe', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop', title: 'respirar', style: { x: '40%', y: '28%', r: '10deg', z: 5, delay: '140ms' }},
  { id: 'mesa', href: '#mesa', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', title: 'compartir', style: { x: '60%', y: '28%', r: '-18deg', z: 2, delay: '280ms' }},
  { id: 'habitar', href: '#habitar', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop', title: 'habitar', style: { x: '72%', y: '72%', r: '14deg', z: 6, delay: '420ms' }},
  { id: 'portal', href: '#portal', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop', title: 'cruzar', style: { x: '84%', y: '32%', r: '-8deg', z: 7, delay: '560ms' }},
  { id: 'agua', href: '#agua', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop', title: 'refrescar', style: { x: '22%', y: '72%', r: '12deg', z: 4, delay: '700ms' }},
  { id: 'sueno', href: '#sueno', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop', title: 'dormir', style: { x: '50%', y: '68%', r: '-6deg', z: 8, delay: '840ms' }},
];

const projects = [
  { id: 'cedahause', name: 'CeDaHause' },
  { id: 'donahause', name: 'DoNaHause' },
  { id: 'gadehause', name: 'GaDeHause' },
  { id: 'jobehause', name: 'JoBeHause' },
  { id: 'jomahause', name: 'JoMaHause' },
  { id: 'jonohause', name: 'JoNoHause' },
  { id: 'magahause', name: 'MaGaHause' },
  { id: 'markhause', name: 'MarkHause' },
  { id: 'scohause', name: 'ScoHause' },
  { id: 'vidahause', name: 'ViDaHause' },
];

const chapters = [
  { id: 'hola', name: 'llegar' },
  { id: 'cafe', name: 'respirar' },
  { id: 'mesa', name: 'compartir' },
  { id: 'habitar', name: 'habitar' },
  { id: 'portal', name: 'cruzar' },
  { id: 'agua', name: 'refrescar' },
  { id: 'sueno', name: 'dormir' },
  { id: 'brasas', name: 'encender' },
  { id: 'hogar', name: 'pertenecer' },
];

const Momentos = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    setTimeout(() => setHeaderVisible(true), 400);
    document.body.classList.add('hero-visible', 'header-visible');
    
    return () => {
      document.body.classList.remove('hero-visible', 'header-visible');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo */}
      <div 
        id="plano-bg"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(226 38% 8%) 0%, hsl(226 38% 15%) 100%)'
        }}
      />

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <Header visible={headerVisible} />

        {/* Projects Navigation */}
        <nav 
          className={cn(
            "fixed top-28 left-1/2 -translate-x-1/2 flex flex-col gap-3 p-4 glass-effect rounded-2xl z-[85]",
            "max-w-[min(92vw,1200px)] overflow-x-auto scrollbar-hide",
            "transition-all duration-300",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          aria-label="Capítulos"
        >
          {/* Chapters */}
          <div className="flex gap-4 justify-center flex-wrap">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="text-xs tracking-[0.28em] text-white/80 opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                {chapter.name}
              </a>
            ))}
          </div>
          
          {/* Projects */}
          <div className="flex gap-4 justify-center flex-wrap border-t border-white/10 pt-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/proyectos/${project.id}`}
                className="text-xs tracking-[0.28em] text-white/80 opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                {project.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Hero Collage */}
        <section 
          className={cn(
            "relative w-full h-screen flex items-center justify-center p-6 box-border z-30",
            "transition-all duration-[2500ms] ease-out",
            heroVisible ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          aria-label="Hero Proyectos"
        >
          <div className="hero-collage relative w-full h-full" aria-label="Collage de capítulos">
            {heroPhotos.map((photo) => (
              <a
                key={photo.id}
                href={photo.href}
                className="hero-photo absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: photo.style.x,
                  top: photo.style.y,
                  rotate: photo.style.r,
                  zIndex: photo.style.z,
                  animationDelay: photo.style.delay,
                }}
              >
                <span className="hero-photo-inner block relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <img 
                    src={photo.image} 
                    alt={`Capítulo ${photo.title}`}
                    className="w-40 md:w-56 h-auto object-cover"
                  />
                  <span className="hero-photo-title absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm tracking-widest uppercase">
                    {photo.title}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          {/* Chapters content would go here */}
          {chapters.map((chapter) => (
            <section 
              key={chapter.id} 
              id={chapter.id}
              className="min-h-screen flex items-center justify-center py-20"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 capitalize">
                  {chapter.name}
                </h2>
                <p className="text-xl text-gd-grey">
                  Contenido del capítulo {chapter.name}
                </p>
              </div>
            </section>
          ))}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Momentos;
