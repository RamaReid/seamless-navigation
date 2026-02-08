import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroRevista } from '@/components/HeroRevista';
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

// Timing constant from original home.js
const BEAT = 465;

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [isNavSkip, setIsNavSkip] = useState(false);

  // Check if coming from internal navigation (skip intro)
  useEffect(() => {
    const isNavTransition = sessionStorage.getItem('gd_nav_transition') === '1';
    if (isNavTransition) {
      sessionStorage.removeItem('gd_nav_transition');
      setIsNavSkip(true);
      // En nav/skip, aún mostramos el loader pero con menos ciclos requeridos
      // El loader manejará esto internamente con la prop isNavSkip
    }
  }, []);

  // Run sequence after intro completes
  const runSequence = useCallback(() => {
    // Show header first (BEAT * 3)
    setTimeout(() => {
      document.body.classList.add('header-visible');
    }, BEAT * 3);

    // Hide header briefly, show hero (BEAT * 8)
    setTimeout(() => {
      document.body.classList.remove('header-visible');
      document.body.classList.add('hero-visible');
      setHeroVisible(true);
      window.dispatchEvent(new Event('heroVisible'));
    }, BEAT * 8);

    // Show header again with nav items (BEAT * 10)
    setTimeout(() => {
      document.body.classList.add('header-visible');
    }, BEAT * 10);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    runSequence();
  }, [runSequence]);

  // Manage body classes
  useEffect(() => {
    if (loading) {
      document.body.classList.add('sequence-only');
      document.body.classList.remove('hero-visible', 'header-visible');
    } else {
      document.body.classList.remove('sequence-only');
    }
    
    return () => {
      document.body.classList.remove('sequence-only', 'hero-visible', 'header-visible');
    };
  }, [loading]);

  // Intersection observer for scene cards
  useEffect(() => {
    if (loading) return;

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
  }, [loading]);

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

      {/* Loader */}
      {loading && <Loader onComplete={handleLoaderComplete} isNavSkip={isNavSkip} />}

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <div id="inicio" />
        
        <Header visible={true} />

        <HeroRevista visible={heroVisible} />

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
