import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import { useSceneCardReveal } from '@/hooks/useSceneCardReveal';
import fondoCasaM from '@/assets/img/FondoCasaM.webp';

import estudioExterior from '@/assets/img/gadehause/gadehause-exterior-hero-sur.webp';
import gadehauseCocina from '@/assets/img/gadehause/gadehause-cocina.webp';
import estudioTransicion from '@/assets/img/scohause/scohause-galeria-panoramica.webp';
import cedahauseHero from '@/assets/img/cedahause/cedahause-exterior-hero-oeste.webp';
import gadehauseComedor from '@/assets/img/gadehause/gadehause-comedor.webp';
import gadehausePasillo from '@/assets/img/gadehause/gadehause-dormitorio.webp';
import scohauseRelacion from '@/assets/img/scohause/scohause-galeria-relacion.webp';
import markhauseDetalle from '@/assets/img/markhause/markhause-living.webp';
import gadehauseObra from '@/assets/img/gadehause/gadehause-exterior-entrada.webp';
import cedahauseComedor from '@/assets/img/cedahause/cedahause-comedor.webp';
import cedahauseAcceso from '@/assets/img/cedahause/cedahause-exterior-entrada.webp';
import markhauseExterior from '@/assets/img/markhause/markhause-exterior-hero.webp';
import markhauseMaterialidad from '@/assets/img/markhause/markhause-dormitorio.webp';
import vidahauseCocina from '@/assets/img/vidahause/vidahause-cocina.webp';
import donahauseSocial from '@/assets/img/donahause/donahause-comedor-living.webp';
import jomahauseTradicional from '@/assets/img/jomahause/jomahause-quincho.webp';
import jomahauseExterior from '@/assets/img/jomahause/jomahause-exterior-hero.png';
import cedahauseLiving from '@/assets/img/cedahause/cedahause-living.webp';
import gadehauseBano from '@/assets/img/gadehause/gadehause-bano-principal.webp';
import donahauseMesa from '@/assets/img/donahause/donahause-quincho.webp';
import jomahauseCocina from '@/assets/img/jomahause/jomahause-cocina-comedor.webp';
import vidahauseContemporanea from '@/assets/img/vidahause/vidahause-vista-sur-patio.webp';

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
    const handleHeroVisible = () => {
      setHeroVisible(true);
      scrollToContact();
    };

    window.addEventListener('heroVisible', handleHeroVisible);

    return () => {
      window.removeEventListener('heroVisible', handleHeroVisible);
      document.body.classList.remove('hero-visible', 'header-visible', 'reveal-blur');
    };
  }, [scrollToContact]);

  useSceneCardReveal();

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
            <SceneSubtitle>Arquitectura que parte de la vida real</SceneSubtitle>
            <SceneText>Proyectamos, diseñamos y construimos casas desde la forma concreta de habitar: rutinas, vínculos, tiempos, deseos y límites que ordenan cada decisión.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/gadehause" image={estudioExterior} alt="Fachada principal de una vivienda terminada" />
            <SceneCard to="/proyectos/gadehause" image={gadehauseCocina} alt="Interior habitado de Gadehause" />
            <SceneCard to="/proyectos/scohause" image={estudioTransicion} alt="Transición entre interior y jardín" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Escucha — La casa empieza en una conversación</SceneSubtitle>
            <SceneText>Antes de dibujar, buscamos entender cómo se vive. La casa empieza en una conversación: qué se repite, qué incomoda, qué se quiere cuidar y qué momentos necesitan lugar.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/gadehause" image={gadehauseComedor} alt="Espacio doméstico preparado para compartir" />
            <SceneCard to="/proyectos/scohause" image={scohauseRelacion} alt="Relación entre galería, casa y exterior" />
            <SceneCard to="/proyectos/cedahause" image={cedahauseComedor} alt="Rutina cotidiana en un espacio social" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Proyecto — La información se transforma en arquitectura</SceneSubtitle>
            <SceneText>Esa información se transforma en arquitectura: luz, escala, recorridos, orientación, materialidad y uso. La belleza aparece cuando el espacio responde con claridad.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/gadehause" image={gadehausePasillo} alt="Recorrido interior entre los sectores de la casa" />
            <SceneCard to="/proyectos/vidahause" image={vidahauseContemporanea} alt="Luz natural y relación con el paisaje" />
            <SceneCard to="/proyectos/markhause" image={markhauseDetalle} alt="Detalle arquitectónico interior resuelto" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Construcción — Continuidad entre diseño y obra</SceneSubtitle>
            <SceneText>La obra no es una etapa separada del proyecto. Diseñar y construir forman una continuidad técnica, económica y humana para que la idea llegue entera a la vida cotidiana.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/gadehause" image={gadehauseObra} alt="Acceso y materialidad de una obra terminada" />
            <SceneCard to="/proyectos/cedahause" image={cedahauseAcceso} alt="Materialidad y estructura de una vivienda terminada" />
            <SceneCard to="/proyectos/markhause" image={markhauseExterior} alt="Vista exterior de obra terminada" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Interior contemporáneo</SceneSubtitle>
            <SceneText>La arquitectura interior se construye con luz, proporción, materiales honestos y espacios capaces de acompañar la vida cotidiana.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/vidahause" image={vidahauseCocina} alt="Cocina contemporánea" />
            <SceneCard to="/proyectos/markhause" image={markhauseMaterialidad} alt="Detalle de materialidad interior" />
            <SceneCard to="/proyectos/donahause" image={donahauseSocial} alt="Living comedor integrado" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Trayectoria — Obras realizadas</SceneSubtitle>
            <SceneText>Las obras destacadas muestran una parte del recorrido y la variedad de lenguajes con los que trabajamos según cada lugar y cada forma de habitar.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/jomahause" image={jomahauseExterior} alt="Vivienda contemporánea destacada" />
            <SceneCard to="/proyectos/jomahause" image={jomahauseTradicional} alt="Vivienda de lenguaje tradicional" />
            <SceneCard to="/proyectos/cedahause" image={cedahauseLiving} alt="Segunda obra contemporánea" />
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>Contacto — Contanos tu historia</SceneSubtitle>
            <SceneText>Contanos tu historia, tu rutina o la idea que querés transformar en arquitectura.</SceneText>
          </Scene>
          <Scene variant="details">
            <SceneCard to="/proyectos/gadehause" image={gadehauseBano} alt="Acceso acogedor a una vivienda" />
            <SceneCard to="/proyectos/donahause" image={donahauseMesa} alt="Mesa preparada para una conversación de trabajo" />
            <SceneCard to="/proyectos/jomahause" image={jomahauseCocina} alt="Espacio dispuesto para conversar" />
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
