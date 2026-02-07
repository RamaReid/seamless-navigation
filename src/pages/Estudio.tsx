import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import fondoCasaM from '@/assets/img/FondoCasaM.png';

// Imágenes del estudio (del original)
import cedahauseLiving from '@/assets/img/cedahause/cedahause-living.png';
import gadehauseCocina from '@/assets/img/gadehause/gadehause-cocina-panoramica.png';
import markhauseComedor from '@/assets/img/markhause/markhause-comedor.png';

const Estudio = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setHeroVisible(true), 100);
    setTimeout(() => setHeaderVisible(true), 400);
    document.body.classList.add('hero-visible', 'header-visible');
    
    return () => {
      document.body.classList.remove('hero-visible', 'header-visible');
    };
  }, []);

  // Intersection observer for scene cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.scene-card');
            cards.forEach((card, index) => {
              setTimeout(() => card.classList.add('is-visible'), index * 250);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -15% 0px' }
    );

    document.querySelectorAll('[data-scene]').forEach((scene) => observer.observe(scene));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo con imagen FondoCasaM */}
      <div 
        id="plano-bg"
        style={{
          backgroundImage: `url(${fondoCasaM})`
        }}
      />

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <Header visible={headerVisible} />

        <HeroSection 
          visible={heroVisible}
          backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
        />

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          {/* Título principal */}
          <Scene variant="intro">
            <SceneTitle>Estudio</SceneTitle>
          </Scene>

          {/* Introducción */}
          <Scene variant="divider">
            <SceneSubtitle>
              Arquitectura que parte de la vida real.
            </SceneSubtitle>
            <SceneText>
              Trabajamos desde la escucha y la observación. Cada proyecto nace de una forma de habitar 
              y se transforma en un espacio claro, funcional y duradero.
            </SceneText>
          </Scene>

          {/* Enfoque */}
          <Scene variant="divider">
            <SceneSubtitle>Enfoque</SceneSubtitle>
            <SceneText>
              Ordenamos luz, escala y recorridos para que el espacio acompañe la vida cotidiana.
            </SceneText>
          </Scene>

          {/* Proceso */}
          <Scene variant="divider">
            <SceneSubtitle>Proceso</SceneSubtitle>
            <SceneText>
              Relevamos, proyectamos, ajustamos y construimos con acompañamiento continuo.
            </SceneText>
          </Scene>

          {/* Equipo */}
          <Scene variant="divider">
            <SceneSubtitle>Equipo</SceneSubtitle>
            <SceneText>
              Un equipo compacto con mirada arquitectónica y técnica.
            </SceneText>
          </Scene>

          {/* Galería de espacios */}
          <Scene variant="details">
            <SceneCard
              to="/proyectos/cedahause"
              image={cedahauseLiving}
              alt="Interior contemporáneo"
            />
            <SceneCard
              to="/proyectos/gadehause"
              image={gadehauseCocina}
              alt="Cocina y detalle de materialidad"
            />
            <SceneCard
              to="/proyectos/markhause"
              image={markhauseComedor}
              alt="Espacio social"
            />
          </Scene>

          {/* Materialidad */}
          <Scene variant="divider">
            <SceneSubtitle>Materialidad</SceneSubtitle>
            <SceneText>
              Elegimos materiales honestos, mantenimiento simple y buena performance.
            </SceneText>
          </Scene>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Estudio;
