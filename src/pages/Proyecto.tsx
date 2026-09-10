import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProjectById } from '@/data/projects';
import { getProjectPageById } from '@/data/projectPages';
import { useSceneCardReveal } from '@/hooks/useSceneCardReveal';
import type { ProjectPageCard, ProjectPageScene } from '@/data/projectPages';
const fondoCasaM = '/img/FondoCasaM.webp';

const Proyecto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const page = id ? getProjectPageById(id) : undefined;
  const lightboxImages = page?.lightboxImages ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useSceneCardReveal();

  useEffect(() => {
    if (!id || !project || !page) {
      navigate('/momentos');
      return;
    }

    setLightboxOpen(false);
    setLightboxIndex(0);
    document.body.classList.remove('lightbox-open');
  }, [id, navigate, page, project]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen || !lightboxImages.length) return;

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === 0 ? lightboxImages.length - 1 : current - 1,
        );
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === lightboxImages.length - 1 ? 0 : current + 1,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImages.length, lightboxOpen]);

  const openLightbox = (index: number) => {
    if (!lightboxImages[index]) return;

    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.classList.add('lightbox-open');
  };

  const openLightboxBySrc = (src: string) => {
    const index = lightboxImages.findIndex((image) => image.src === src);
    openLightbox(index === -1 ? 0 : index);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.classList.remove('lightbox-open');
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImages.length) return;

    setLightboxIndex((current) => {
      if (direction === 'prev') {
        return current === 0 ? lightboxImages.length - 1 : current - 1;
      }

      return current === lightboxImages.length - 1 ? 0 : current + 1;
    });
  };

  const renderCard = (card: ProjectPageCard) => (
    <div
      key={card.src}
      className={`scene-card ${card.variant} cursor-pointer is-visible`}
      onClick={() => openLightboxBySrc(card.src)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => event.key === 'Enter' && openLightboxBySrc(card.src)}
      aria-label={card.alt}
    >
      <img src={card.src} alt={card.alt} loading="lazy" draggable={false} />
    </div>
  );

  const renderScene = (scene: ProjectPageScene) => {
    const sectionClassName = `scene ${scene.className}`;

    if (scene.title) {
      return (
        <section
          key={scene.dataScene}
          className={sectionClassName}
          data-scene={scene.dataScene}
        >
          <h1 className="scene-title">{scene.title}</h1>
        </section>
      );
    }

    if (scene.cards?.length) {
      return (
        <section
          key={scene.dataScene}
          className={sectionClassName}
          data-scene={scene.dataScene}
        >
          {scene.cards.map(renderCard)}
        </section>
      );
    }

    return (
      <section
        key={scene.dataScene}
        className={sectionClassName}
        data-scene={scene.dataScene}
      >
        {scene.subtitle && <p className="scene-subtitle">{scene.subtitle}</p>}
        {scene.text && <p className="scene-text">{scene.text}</p>}
      </section>
    );
  };

  if (!project || !page) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div id="plano-bg" style={{ backgroundImage: `url(${fondoCasaM})` }} />

      <div id="app-layer" className="relative z-30">
        <Header />

        <section
          id="hero-revista-section"
          className="hero-revista-section"
          aria-label={`Hero ${project.name}`}
        >
          <div className="hero-revista-shell hero-static" id="hero-revista-shell">
            <img
              className="project-hero-image w-full h-full cursor-pointer"
              src={page.hero.src}
              alt={`Hero ${project.name}`}
              style={{
                objectFit: page.hero.backgroundSize === 'cover' ? 'cover' : 'contain',
                objectPosition: page.hero.backgroundPosition,
              }}
              onClick={() => openLightbox(0)}
              role="button"
              aria-label="Ver galeria"
              draggable={false}
            />
          </div>
        </section>

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          {page.scenes.map(renderScene)}
          <Footer />
        </main>
      </div>

      <div
        className={`gd-lightbox ${lightboxOpen ? 'is-open' : ''}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de imagenes"
      >
        <div
          className="gd-lightbox-inner"
          onClick={(event) => event.stopPropagation()}
          onTouchStart={(event) => {
            const touch = event.changedTouches[0];
            touchStartRef.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={(event) => {
            const start = touchStartRef.current;
            if (!start) return;
            touchStartRef.current = null;
            const touch = event.changedTouches[0];
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              navigateLightbox(dx < 0 ? 1 : -1);
            } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
              closeLightbox();
            }
          }}
        >
          {lightboxImages[lightboxIndex] && (
            <img
              src={lightboxImages[lightboxIndex].src}
              alt={lightboxImages[lightboxIndex].alt}
              className="gd-lightbox-image"
              style={{ objectFit: 'contain', maxWidth: '90vw', maxHeight: '90vh' }}
              draggable={false}
            />
          )}
          <button
            className="gd-lightbox-close"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            x
          </button>
          <button
            className="gd-lightbox-nav gd-lightbox-prev"
            onClick={() => navigateLightbox('prev')}
            aria-label="Anterior"
          >
            &lt;
          </button>
          <button
            className="gd-lightbox-nav gd-lightbox-next"
            onClick={() => navigateLightbox('next')}
            aria-label="Siguiente"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
