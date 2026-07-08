import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import fondoCasaM from '@/assets/img/FondoCasaM.webp';

import livingScola from '@/assets/img/cedahause/cedahause-living.webp';
import gadehauseCocina from '@/assets/img/gadehause/gadehause-cocina-panoramica.webp';
import markhauseComedor from '@/assets/img/markhause/markhause-comedor.webp';
import cedahauseHero from '@/assets/img/cedahause/cedahause-exterior-hero-oeste.webp';

const Estudio = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const scrollToContact = useCallback(() => {
    if (window.location.hash !== '#contacto') return;

    window.setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 260);
  }, []);

  useEffect(() => {
    const heroTimer = window.setTimeout(() => setHeroVisible(true), 100);
    const headerTimer = window.setTimeout(() => setHeaderVisible(true), 400);
    document.body.classList.add('hero-visible', 'header-visible');

    const handleTransitionComplete = () => {
      document.body.classList.add('hero-visible', 'header-visible');
      scrollToContact();
    };

    window.addEventListener('transitionComplete', handleTransitionComplete);
    scrollToContact();

    return () => {
      window.clearTimeout(heroTimer);
      window.clearTimeout(headerTimer);
      window.removeEventListener('transitionComplete', handleTransitionComplete);
      document.body.classList.remove('hero-visible', 'header-visible');
    };
  }, [scrollToContact]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.scene-card');
            cards.forEach((card, index) => {
              window.setTimeout(() => card.classList.add('is-visible'), index * 250);
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
      <div
        id="plano-bg"
        style={{
          backgroundImage: `url(${fondoCasaM})`,
        }}
      />

      <div id="app-layer" className="relative z-30">
        <Header visible={headerVisible} />

        <HeroSection
          visible={heroVisible}
          backgroundImage={cedahauseHero}
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
              Proyectamos, diseñamos y construimos casas desde la forma concreta de habitar: rutinas, vínculos, tiempos, deseos y límites que ordenan cada decisión.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Escucha</SceneSubtitle>
            <SceneText>
              Antes de dibujar, buscamos entender cómo se vive. La casa empieza en una conversación: qué se repite, qué incomoda, qué se quiere cuidar y qué momentos necesitan lugar.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Proyecto</SceneSubtitle>
            <SceneText>
              Esa información se transforma en arquitectura: luz, escala, recorridos, orientación, materialidad y uso. La belleza aparece cuando el espacio responde con claridad.
            </SceneText>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Construcción</SceneSubtitle>
            <SceneText>
              La obra no es una etapa separada del proyecto. Diseñar y construir forman una continuidad técnica, económica y humana para que la idea llegue entera a la vida cotidiana.
            </SceneText>
          </Scene>

          <Scene variant="details">
            <SceneCard
              to="/proyectos/cedahause"
              image={livingScola}
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

          <Scene variant="divider">
            <SceneSubtitle>Trayectoria</SceneSubtitle>
            <SceneText>
              Las obras destacadas muestran una parte del recorrido. La base completa de obras realizadas se incorporará como mapa y archivo visual cuando estén consolidados los datos reales.
            </SceneText>
          </Scene>

          <Scene variant="divider" className="scene-contact">
            <div id="contacto" className="contact-anchor" />
            <SceneSubtitle>Contacto</SceneSubtitle>
            <SceneText>
              Contanos tu historia, tu rutina o la idea que querés transformar en arquitectura.
            </SceneText>
            <div className="contact-actions" aria-label="Canales de contacto">
              <a className="contact-link" href="mailto:rgarciareid@gmail.com">rgarciareid@gmail.com</a>
              <a className="contact-link" href="https://wa.me/5492494626455" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <SceneText className="contact-meta">Tandil, Buenos Aires</SceneText>
            <SceneText className="contact-meta">Lun a Vie, 9 a 18</SceneText>
          </Scene>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Estudio;
