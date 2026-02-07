import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';

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

        <HeroSection 
          visible={heroVisible}
          backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
        />

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          <Scene variant="intro">
            <SceneTitle>Estudio</SceneTitle>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>
              Arquitectura que parte de la vida real.
            </SceneSubtitle>
            <SceneText>
              Trabajamos desde la escucha y la observación. Cada proyecto nace de una forma de habitar 
              y se transforma en un espacio claro, funcional y duradero.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Enfoque</SceneSubtitle>
            <SceneText>
              Ordenamos luz, escala y recorridos para que el espacio acompañe la vida cotidiana.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Proceso</SceneSubtitle>
            <SceneText>
              Relevamos, proyectamos, ajustamos y construimos con acompañamiento continuo.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Equipo</SceneSubtitle>
            <SceneText>
              Un equipo compacto con mirada arquitectónica y técnica.
            </SceneText>
          </Scene>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Estudio;
