import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import { useSceneCardReveal } from '@/hooks/useSceneCardReveal';
const fondoCasaM = '/img/FondoCasaM.webp';

const estudioExterior = '/img/gadehause/gadehause-exterior-hero-sur.webp';
const gadehauseCocina = '/img/gadehause/gadehause-cocina.webp';
const estudioTransicion = '/img/scohause/scohause-galeria-panoramica.webp';
const cedahauseHero = '/img/cedahause/cedahause-exterior-hero-oeste.webp';
const gadehauseComedor = '/img/gadehause/gadehause-comedor.webp';
const gadehausePasillo = '/img/gadehause/gadehause-dormitorio.webp';
const scohauseRelacion = '/img/scohause/scohause-galeria-relacion.webp';
const markhauseDetalle = '/img/markhause/markhause-living.webp';
const gadehauseObra = '/img/gadehause/gadehause-exterior-entrada.webp';
const cedahauseComedor = '/img/cedahause/cedahause-comedor.webp';
const cedahauseAcceso = '/img/cedahause/cedahause-exterior-entrada.webp';
const markhauseExterior = '/img/markhause/markhause-exterior-hero.webp';
const markhauseMaterialidad = '/img/markhause/markhause-dormitorio.webp';
const vidahauseCocina = '/img/vidahause/vidahause-cocina.webp';
const donahauseSocial = '/img/donahause/donahause-comedor-living.webp';
const jomahauseTradicional = '/img/jomahause/jomahause-quincho.webp';
const jomahauseExterior = '/img/jomahause/jomahause-exterior-hero.webp';
const cedahauseLiving = '/img/cedahause/cedahause-living.webp';
const gadehauseBano = '/img/gadehause/gadehause-bano-principal.webp';
const donahauseMesa = '/img/donahause/donahause-quincho.webp';
const jomahauseCocina = '/img/jomahause/jomahause-cocina-comedor.webp';
const vidahauseContemporanea = '/img/vidahause/vidahause-vista-sur-patio.webp';

const Estudio = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, subject, message } = contactForm;
    const body = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
    const params = new URLSearchParams({
      subject: subject || `Consulta desde la web de GD`,
      body,
    });

    window.location.href = `mailto:rgarciareid@gmail.com?${params.toString()}`;
  };

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
            <form
              className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-5 text-left"
              onSubmit={handleContactSubmit}
              aria-label="Formulario de contacto"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-foreground">
                  Nombre
                  <input
                    className="rounded-md border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-foreground"
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                    required
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-foreground">
                  Email
                  <input
                    className="rounded-md border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-foreground"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                    required
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-foreground">
                Asunto
                <input
                  className="rounded-md border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-foreground"
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={(event) => setContactForm({ ...contactForm, subject: event.target.value })}
                  autoComplete="off"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-foreground">
                Mensaje
                <textarea
                  className="min-h-36 resize-y rounded-md border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition focus:border-foreground"
                  name="message"
                  value={contactForm.message}
                  onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                  required
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Se abrirá tu aplicación de correo para completar el envío.
                </p>
                <button
                  className="rounded-md border border-foreground px-5 py-3 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background"
                  type="submit"
                >
                  Enviar consulta
                </button>
              </div>
            </form>
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
