import React, { useState, useEffect } from 'react';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const handleLoaderComplete = () => {
    setLoading(false);
    // Secuencia de reveal
    setTimeout(() => setHeroVisible(true), 300);
    setTimeout(() => setHeaderVisible(true), 800);
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add('sequence-only');
    } else {
      document.body.classList.remove('sequence-only');
      document.body.classList.add('hero-visible', 'header-visible');
    }
    
    return () => {
      document.body.classList.remove('sequence-only', 'hero-visible', 'header-visible');
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo */}
      <div 
        id="plano-bg"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(226 38% 8%) 0%, hsl(226 38% 15%) 100%)'
        }}
      />

      {/* Loader */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <div id="inicio" />
        
        <Header visible={headerVisible} />

        <HeroSection visible={heroVisible}>
          <div className="text-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp">
              GD Arquitectura
            </h1>
            <p className="text-xl md:text-2xl text-foreground animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Diseño y Construcción
            </p>
          </div>
        </HeroSection>

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          {/* Bajada Hero */}
          <Scene variant="intro">
            <SceneTitle>El escenario de tu vida</SceneTitle>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>
              Antes de pensar un espacio, existe una manera de habitarlo.
            </SceneSubtitle>
            <SceneText>
              Rutinas, encuentros, pausas, silencios y gestos cotidianos que dan forma a la vida real. 
              Ahí empieza a definirse el escenario sobre el que después se construye todo lo demás.
            </SceneText>
          </Scene>

          {/* Escena — Vida Real */}
          <Scene variant="moments">
            <SceneCard
              to="/proyectos/magahause"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop"
              alt="Terraza vivida en Magahause"
            />
            <SceneCard
              to="/proyectos/gadehause"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop"
              alt="Pileta y portal social en Gadehause"
            />
            <SceneCard
              to="/proyectos/markhause"
              image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop"
              alt="Comedor cotidiano en Markhause"
            />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>
              De esa manera de habitar surgen las preguntas que importan.
            </SceneSubtitle>
            <SceneText>
              Cómo se usan los espacios, cómo se conectan, qué necesita cada momento y qué puede quedar en segundo plano. 
              Cuando esas decisiones se ordenan, la arquitectura empieza a tomar forma.
            </SceneText>
          </Scene>

          {/* Escena — Espacio Pensado */}
          <Scene variant="space">
            <SceneCard
              to="/proyectos/gadehause"
              image="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&h=625&fit=crop"
              alt="Cocina panorámica en Gadehause"
              variant="wide"
            />
          </Scene>

          {/* Texto Puente */}
          <Scene variant="bridge">
            <SceneSubtitle>
              Cuando el espacio nace de esa dinámica, cada decisión encuentra su razón de ser.
            </SceneSubtitle>
            <SceneText>
              La luz, los recorridos, los límites y los materiales dejan de ser elecciones aisladas 
              y pasan a formar parte de un mismo escenario, pensado para sostener el día a día en el tiempo.
            </SceneText>
          </Scene>

          {/* Escena — Detalle y Escala */}
          <Scene variant="details">
            <SceneCard
              to="/proyectos/cedahause"
              image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=800&fit=crop"
              alt="Living principal en Cedahause"
            />
            <SceneCard
              to="/proyectos/jonohause"
              image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=800&fit=crop"
              alt="Baño principal en Jonohause"
            />
            <SceneCard
              to="/proyectos/donahause"
              image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=800&fit=crop"
              alt="Quincho social en Donahause"
            />
          </Scene>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
