import React, { useState, useEffect } from 'react';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';

// Imágenes originales del proyecto
import fondoCasaM from '@/assets/img/FondoCasaM.png';
import magahauseTerrazaVida from '@/assets/img/magahause/magahause-terraza-vida.png';
import gadehausePiletaPortal from '@/assets/img/gadehause/gadehause-pileta-portal.png';
import gadehauseCocina from '@/assets/img/gadehause/gadehause-cocina-panoramica.png';
import markhauseComedor from '@/assets/img/markhause/markhause-comedor.png';
import cedahauseLiving from '@/assets/img/cedahause/cedahause-living.png';
import jonohauseBano from '@/assets/img/jonohause/jonohause-bano.png';
import donahauseQuincho from '@/assets/img/donahause/donahause-quincho.png';

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
      {/* Plano de fondo con imagen FondoCasaM */}
      <div 
        id="plano-bg"
        style={{
          backgroundImage: `url(${fondoCasaM})`
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
              image={magahauseTerrazaVida}
              alt="Terraza vivida en Magahause"
            />
            <SceneCard
              to="/proyectos/gadehause"
              image={gadehausePiletaPortal}
              alt="Pileta y portal social en Gadehause"
            />
            <SceneCard
              to="/proyectos/markhause"
              image={markhauseComedor}
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
              image={gadehauseCocina}
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
              image={cedahauseLiving}
              alt="Living principal en Cedahause"
            />
            <SceneCard
              to="/proyectos/jonohause"
              image={jonohauseBano}
              alt="Baño principal en Jonohause"
            />
            <SceneCard
              to="/proyectos/donahause"
              image={donahauseQuincho}
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
