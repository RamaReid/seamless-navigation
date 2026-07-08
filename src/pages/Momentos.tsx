import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { SceneCard } from '@/components/SceneCard';
import fondoCasaM from '@/assets/img/FondoCasaM.webp';

// Hero Collage Images
import jobeEntrada from '@/assets/img/jobehause/jobehause-exterior-entrada.webp';
import cedaCocina from '@/assets/img/cedahause/cedahause-cocina.webp';
import gadeComedor from '@/assets/img/gadehause/gadehause-comedor.webp';
import markLiving from '@/assets/img/markhause/markhause-living.webp';
import scoGaleria from '@/assets/img/scohause/scohause-galeria-panoramica.webp';
import cedaBanoDucha from '@/assets/img/cedahause/cedahause-bano-ducha.webp';
import jonoDormitorio from '@/assets/img/jonohause/jonohause-dormitorio.webp';
import scoQuincho from '@/assets/img/scohause/scohause-quincho.webp';
import markExterior from '@/assets/img/markhause/markhause-exterior-hero.webp';
import jomaCocina from '@/assets/img/jomahause/jomahause-cocina.webp';
import cedaComedor from '@/assets/img/cedahause/cedahause-comedor.webp';
import markDormitorio from '@/assets/img/markhause/markhause-dormitorio.webp';

// Chapter images - Llegar
import cedaExteriorEntrada from '@/assets/img/cedahause/cedahause-exterior-entrada.webp';
import magaEntrada from '@/assets/img/magahause/magahause-entrada.webp';
import gadeExteriorEntrada from '@/assets/img/gadehause/gadehause-exterior-entrada.webp';

// Chapter images - Respirar
import gadeCocina from '@/assets/img/gadehause/gadehause-cocina.webp';
import jomaCocinaComedor from '@/assets/img/jomahause/jomahause-cocina-comedor.webp';
import vidaCocina from '@/assets/img/vidahause/vidahause-cocina.webp';

// Chapter images - Compartir
import donaComedorLiving from '@/assets/img/donahause/donahause-comedor-living.webp';
import markComedor from '@/assets/img/markhause/markhause-comedor.webp';
import jonoComedor from '@/assets/img/jonohause/jonohause-comedor.webp';

// Chapter images - Habitar
import cedaLiving from '@/assets/img/cedahause/cedahause-living.webp';
import scoLiving from '@/assets/img/scohause/scohause-living.webp';
import magaLiving from '@/assets/img/magahause/magahause-living.webp';

// Chapter images - Cruzar
import gadePiletaPortal from '@/assets/img/gadehause/gadehause-pileta-portal.webp';
import scoGaleriaRelacion from '@/assets/img/scohause/scohause-galeria-relacion.webp';
import vidaVistaSurPatio from '@/assets/img/vidahause/vidahause-vista-sur-patio.webp';

// Chapter images - Refrescar
import cedaBanoBacha from '@/assets/img/cedahause/cedahause-bano-bacha.webp';
import gadeBanoPrincipal from '@/assets/img/gadehause/gadehause-bano-principal.webp';
import jomaBanoBanera from '@/assets/img/jomahause/jomahause-bano-banera.webp';

// Chapter images - Dormir
import gadeDormitorio from '@/assets/img/gadehause/gadehause-dormitorio.webp';
import magaDormitorio from '@/assets/img/magahause/magahause-dormitorio.webp';
import jonoDormitorio2 from '@/assets/img/jonohause/jonohause-dormitorio-2.webp';

// Chapter images - Encender
import donaQuinchoB from '@/assets/img/donahause/donahause-quincho-b.webp';
import jomaQuincho from '@/assets/img/jomahause/jomahause-quincho.webp';
import magaQuincho from '@/assets/img/magahause/magahause-quincho.jpeg';

// Chapter images - Pertenecer
import cedaExteriorOeste from '@/assets/img/cedahause/cedahause-exterior-hero-oeste.webp';
import magaExteriorOeste from '@/assets/img/magahause/magahause-exterior-oeste.webp';

// Collage photo data
const COLLAGE_PHOTOS = [
  { href: '#hola', img: jobeEntrada, title: 'llegar', x: '16%', y: '30%', r: '-12deg', z: 3, delay: 0, dx: '-200px', dy: '-240px' },
  { href: '#cafe', img: cedaCocina, title: 'respirar', x: '40.73%', y: '28%', r: '10deg', z: 5, delay: 140, dx: '-120px', dy: '-220px' },
  { href: '#mesa', img: gadeComedor, title: 'compartir', x: '59.27%', y: '28%', r: '-18deg', z: 2, delay: 280, dx: '80px', dy: '-220px' },
  { href: '#habitar', img: markLiving, title: 'habitar', x: '71.64%', y: '72%', r: '14deg', z: 6, delay: 420, dx: '200px', dy: '-200px' },
  { href: '#portal', img: scoGaleria, title: 'cruzar', x: '84%', y: '32%', r: '-8deg', z: 7, delay: 560, dx: '-160px', dy: '-80px' },
  { href: '#agua', img: cedaBanoDucha, title: 'refrescar', x: '22.18%', y: '72%', r: '12deg', z: 4, delay: 700, dx: '-40px', dy: '-80px' },
  { href: '#sueno', img: jonoDormitorio, title: 'dormir', x: '65.45%', y: '52%', r: '8deg', z: 5, delay: 840, dx: '120px', dy: '-80px' },
  { href: '#brasas', img: scoQuincho, title: 'encender', x: '77.82%', y: '66%', r: '-16deg', z: 0, delay: 980, dx: '200px', dy: '-60px' },
  { href: '#hogar', img: markExterior, title: 'pertenecer', x: '46.91%', y: '52%', r: '16deg', z: 3, delay: 1120, dx: '-140px', dy: '140px' },
  { href: '#cafe', img: jomaCocina, title: 'respirar', x: '53.09%', y: '68%', r: '12deg', z: 1, delay: 1260, dx: '40px', dy: '140px' },
  { href: '#mesa', img: cedaComedor, title: 'compartir', x: '34.55%', y: '68%', r: '-12deg', z: 6, delay: 1400, dx: '160px', dy: '120px' },
  { href: '#sueno', img: markDormitorio, title: 'dormir', x: '28.36%', y: '54%', r: '-10deg', z: 1, delay: 1540, dx: '200px', dy: '140px' },
];

// Chapters data
const CHAPTERS = [
  {
    id: 'hola',
    title: 'llegar',
    subtitle: 'La bienvenida anticipa el refugio.',
    text: 'No importan la escala ni el material: la entrada es el primer abrazo de la casa. Un gesto arquitectónico que deja el mundo afuera y te confirma, apenas cruzás el umbral, la certeza de haber llegado.',
    images: [
      { img: cedaExteriorEntrada, link: '/proyectos/cedahause', alt: 'hola 01' },
      { img: magaEntrada, link: '/proyectos/magahause', alt: 'hola 02' },
      { img: gadeExteriorEntrada, link: '/proyectos/gadehause', alt: 'hola 03' },
    ],
  },
  {
    id: 'cafe',
    title: 'respirar',
    subtitle: 'El aire se llena de vida.',
    text: 'Es el pulso de la mañana y el aroma de lo cotidiano. Espacios diáfanos donde la luz entra temprano para marcar el ritmo del día e invitar a la primera pausa.',
    images: [
      { img: gadeCocina, link: '/proyectos/gadehause', alt: 'cafe 01' },
      { img: jomaCocinaComedor, link: '/proyectos/jomahause', alt: 'cafe 02' },
      { img: vidaCocina, link: '/proyectos/vidahause', alt: 'cafe 03' },
    ],
  },
  {
    id: 'mesa',
    title: 'compartir',
    subtitle: 'El encuentro encuentra su centro.',
    text: 'La arquitectura se retrae para que la mesa sea protagonista. Dimensiones pensadas para que la charla fluya y el tiempo se detenga, transformando el acto de comer en un ritual de unión.',
    images: [
      { img: donaComedorLiving, link: '/proyectos/donahause', alt: 'mesa 01' },
      { img: markComedor, link: '/proyectos/markhause', alt: 'mesa 02' },
      { img: jonoComedor, link: '/proyectos/jonohause', alt: 'mesa 03' },
    ],
  },
  {
    id: 'habitar',
    title: 'habitar',
    subtitle: 'La pausa reclama su espacio.',
    text: 'Rincones diseñados para el ocio, donde la luz baja y las texturas invitan a descalzarse. No se trata solo de sentarse: es permitirse el lujo de no hacer nada y simplemente estar.',
    images: [
      { img: cedaLiving, link: '/proyectos/cedahause', alt: 'estar 01' },
      { img: scoLiving, link: '/proyectos/scohause', alt: 'estar 02' },
      { img: magaLiving, link: '/proyectos/magahause', alt: 'estar 03' },
    ],
  },
  {
    id: 'portal',
    title: 'cruzar',
    subtitle: 'Los límites se desdibujan.',
    text: 'Galerías y transiciones que engañan al ojo: el jardín entra y la casa sale. Espacios híbridos que extienden el uso y multiplican las formas de disfrutar el clima y el paisaje.',
    images: [
      { img: gadePiletaPortal, link: '/proyectos/gadehause', alt: 'portal 01' },
      { img: scoGaleriaRelacion, link: '/proyectos/scohause', alt: 'portal 02' },
      { img: vidaVistaSurPatio, link: '/proyectos/vidahause', alt: 'portal 03' },
    ],
  },
  {
    id: 'agua',
    title: 'refrescar',
    subtitle: 'El agua renueva la calma.',
    text: 'Materiales nobles y luces tenues cuidan la intimidad absoluta. Un santuario personal donde el agua no solo limpia: resetea los sentidos y lava el peso del día.',
    images: [
      { img: cedaBanoBacha, link: '/proyectos/cedahause', alt: 'agua 01' },
      { img: gadeBanoPrincipal, link: '/proyectos/gadehause', alt: 'agua 02' },
      { img: jomaBanoBanera, link: '/proyectos/jomahause', alt: 'agua 03' },
    ],
  },
  {
    id: 'sueno',
    title: 'dormir',
    subtitle: 'La noche dicta el silencio.',
    text: 'El entorno se apaga para que el descanso sea profundo. La orientación protege y la atmósfera envuelve, creando ese nido necesario donde el cuerpo finalmente se entrega a la calma.',
    images: [
      { img: gadeDormitorio, link: '/proyectos/gadehause', alt: 'sueño 01' },
      { img: magaDormitorio, link: '/proyectos/magahause', alt: 'sueño 02' },
      { img: jonoDormitorio2, link: '/proyectos/jonohause', alt: 'sueño 03' },
    ],
  },
  {
    id: 'brasas',
    title: 'encender',
    subtitle: 'El fuego magnetiza.',
    text: 'La llama convoca de forma primitiva e irresistible. Un espacio que celebra lo informal, donde el calor alarga las horas y refuerza la camaradería.',
    images: [
      { img: donaQuinchoB, link: '/proyectos/donahause', alt: 'brasas 01' },
      { img: jomaQuincho, link: '/proyectos/jomahause', alt: 'brasas 02' },
      { img: magaQuincho, link: '/proyectos/magahause', alt: 'brasas 03' },
    ],
  },
  {
    id: 'hogar',
    title: 'pertenecer',
    subtitle: 'El espacio nace del vínculo.',
    text: 'Cada proyecto parte de una vida real y crece con ella. La casa que perdura es la que sabe contener lo que más queremos, proteger la intimidad y celebrar la pertenencia.',
    images: [
      { img: cedaExteriorOeste, link: '/proyectos/cedahause', alt: 'hogar 01' },
      { img: magaExteriorOeste, link: '/proyectos/magahause', alt: 'hogar 02' },
      { img: markExterior, link: '/proyectos/markhause', alt: 'hogar 03' },
    ],
  },
];

const Momentos = () => {
  const [collageReady, setCollageReady] = useState(false);
  const collageRef = useRef<HTMLDivElement>(null);
  const didRevealRef = useRef(false);

  // Modo visual específico de Momentos
  useEffect(() => {
    document.body.classList.add('project-index');

    return () => {
      document.body.classList.remove('project-index');
    };
  }, []);

  // Timings de entrada de Hero + Header + Collage
  useEffect(() => {
    const timeouts: number[] = [];
    const hasActiveLoader = !!document.getElementById('intro-layer');

    const queueTimeout = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeouts.push(id);
    };

    const revealMomentos = () => {
      if (didRevealRef.current) return;
      didRevealRef.current = true;

      document.body.classList.add('hero-visible');

      // Header entra después del hero para recuperar la secuencia visual
      queueTimeout(() => {
        document.body.classList.add('header-visible');
      }, 120);

      // Collage cae después de header + hero
      queueTimeout(() => {
        setCollageReady(true);
      }, 560);
    };

    const handleTransitionComplete = () => {
      revealMomentos();
    };

    setCollageReady(false);
    didRevealRef.current = false;

    // Evita que se vea contenido antes del final del reveal en navegación interna
    if (hasActiveLoader) {
      document.body.classList.remove('hero-visible', 'header-visible');
    }

    window.addEventListener('transitionComplete', handleTransitionComplete);

    // Fallback para entrada directa sin transición activa
    if (!hasActiveLoader) {
      queueTimeout(() => {
        revealMomentos();
      }, 140);
    }

    return () => {
      window.removeEventListener('transitionComplete', handleTransitionComplete);
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Intersection observer for cards
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

    document.querySelectorAll('.projects-chapter').forEach((ch) => observer.observe(ch));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo */}
      <div
        id="plano-bg"
        style={{ backgroundImage: `url(${fondoCasaM})` }}
      />

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <Header />

        {/* Hero Collage */}
        <section
          id="hero-revista-section"
          className="hero-revista-section hero-board"
          aria-label="Hero Proyectos"
        >
          <div className="hero-revista-shell hero-board-shell" id="hero-revista-shell">
            <div
              ref={collageRef}
              className={`hero-collage ${collageReady ? 'is-visible is-ready' : ''}`}
              aria-label="Collage de capítulos"
            >
              {COLLAGE_PHOTOS.map((photo, idx) => (
                <a
                  key={idx}
                  className="hero-photo"
                  href={photo.href}
                  style={{
                    '--x': photo.x,
                    '--y': photo.y,
                    '--r': photo.r,
                    '--z': photo.z,
                    '--delay': `${photo.delay}ms`,
                    '--dx': photo.dx,
                    '--dy': photo.dy,
                  } as React.CSSProperties}
                >
                  <span className="hero-photo-inner">
                    <img src={photo.img} alt={`Capítulo ${photo.title}`} />
                    <span className="hero-photo-title">{photo.title}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          <Scene variant="intro">
            <SceneTitle>Los momentos de tu vida</SceneTitle>
          </Scene>
          <Scene variant="divider">
            <SceneSubtitle>
              Tu forma de disfrutar los momentos define los espacios.
            </SceneSubtitle>
            <SceneText>
              Gestos cotidianos, usos y tiempos personales que definen la manera de habitar.<br />
              Las formas, colores, texturas y dimensiones aparecen cuando ese momento encuentra un espacio que lo representa, lo estimula y lo contiene.<br />
              Un proceso claro, cuidado y sincero permite transformarlo en tu proyecto.
            </SceneText>
          </Scene>
        </div>

        {/* Chapters */}
        <main className="projects-main">
          {CHAPTERS.map((chapter) => (
            <section
              key={chapter.id}
              className="projects-chapter"
              id={chapter.id}
              aria-label={`Capítulo ${chapter.title}`}
            >
              <div className="chapter-triptych">
                {chapter.images.map((img, idx) => (
                  <SceneCard
                    key={idx}
                    to={img.link}
                    image={img.img}
                    alt={img.alt}
                  />
                ))}
              </div>
              <section className="scene scene-divider projects-chapter-text">
                <p className="scene-subtitle">{chapter.subtitle}</p>
                <p className="scene-text">{chapter.text}</p>
              </section>
            </section>
          ))}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Momentos;
