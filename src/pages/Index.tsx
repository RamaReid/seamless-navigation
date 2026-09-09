import React, { useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroRevista } from '@/components/HeroRevista';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import { useSceneCardReveal } from '@/hooks/useSceneCardReveal';

// Imágenes originales del proyecto
const fondoCasaM = '/img/FondoCasaM.webp';
const magahauseTerrazaVida = '/img/magahause/magahause-terraza-vida.webp';
const gadehausePiletaPortal = '/img/gadehause/gadehause-pileta-portal.webp';
const gadehauseCocina = '/img/gadehause/gadehause-cocina-panoramica.webp';
const markhauseComedor = '/img/markhause/markhause-comedor.webp';
const cedahauseLiving = '/img/cedahause/cedahause-living.webp';
const jonohauseBano = '/img/jonohause/jonohause-bano.webp';
const donahauseQuincho = '/img/donahause/donahause-quincho.webp';

const BEAT = 465;

const Index = () => {
  const seqTimersRef = React.useRef<number[]>([]);

  const clearSeqTimers = useCallback(() => {
    seqTimersRef.current.forEach(clearTimeout);
    seqTimersRef.current = [];
  }, []);

  // Coreografía original: header a 3 BEATs, hero (revista) a 8 BEATs
  const handleTransitionComplete = useCallback(() => {
    clearSeqTimers();

    seqTimersRef.current.push(
      window.setTimeout(() => {
        document.body.classList.add('header-visible');
      }, BEAT * 3)
    );

    seqTimersRef.current.push(
      window.setTimeout(() => {
        document.body.classList.remove('header-visible');
        document.body.classList.add('hero-visible');
        window.dispatchEvent(new Event('heroVisible'));
      }, BEAT * 8)
    );
  }, [clearSeqTimers]);

  // Listen for transitionComplete event from TransitionShell
  useEffect(() => {
    window.addEventListener('transitionComplete', handleTransitionComplete);

    return () => {
      window.removeEventListener('transitionComplete', handleTransitionComplete);
      clearSeqTimers();
    };
  }, [handleTransitionComplete, clearSeqTimers]);

  // Fallback: if no active loader exists, apply the same sequence immediately.
  useEffect(() => {
    const hasActiveLoader = !!document.getElementById('intro-layer');
    if (!hasActiveLoader) {
      handleTransitionComplete();
    }
  }, [handleTransitionComplete]);


  useSceneCardReveal();

  // Parallax for plano-bg
  useEffect(() => {
    let scrollUnlocked = false;

    const handleHeroVisible = () => {
      scrollUnlocked = true;
    };

    const handleScroll = () => {
      const planoBg = document.getElementById('plano-bg');
      if (planoBg && scrollUnlocked) {
        const offset = window.pageYOffset * 0.1;
        planoBg.style.transform = `translateY(${offset}px) scale(1.03)`;
      }
    };

    window.addEventListener('heroVisible', handleHeroVisible);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('heroVisible', handleHeroVisible);
      window.removeEventListener('scroll', handleScroll);
    };
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
        <div id="inicio" />
        
        <Header />

        <HeroRevista visible={true} />

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
