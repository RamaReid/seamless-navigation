import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProjectById } from '@/data/projects';
import { getProjectPageById } from '@/data/projectPages';
import { useSceneCardReveal } from '@/hooks/useSceneCardReveal';
import type { ProjectPageCard, ProjectPageScene } from '@/data/projectPages';
const fondoCasaM = '/img/FondoCasaM.webp';
const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Proyecto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const page = id ? getProjectPageById(id) : undefined;
  const lightboxImages = page?.lightboxImages ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelLockRef = useRef(false);

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

      if (event.key === 'Tab') {
        const dialog = lightboxRef.current;
        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );

        if (!focusable.length) {
          event.preventDefault();
          dialog.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImages.length, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      const dialog = lightboxRef.current;
      const firstFocusable = dialog?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (firstFocusable || dialog)?.focus();
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [lightboxOpen]);

  const openLightbox = (index: number, trigger?: HTMLElement) => {
    if (!lightboxImages[index]) return;

    lightboxTriggerRef.current = trigger ?? (
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    );
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.classList.add('lightbox-open');
  };

  const openLightboxBySrc = (src: string, trigger?: HTMLElement) => {
    const index = lightboxImages.findIndex((image) => image.src === src);
    openLightbox(index === -1 ? 0 : index, trigger);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.classList.remove('lightbox-open');

    const trigger = lightboxTriggerRef.current;
    lightboxTriggerRef.current = null;
    if (trigger && document.contains(trigger)) {
      window.requestAnimationFrame(() => trigger.focus());
    }
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
      onClick={(event) => openLightboxBySrc(card.src, event.currentTarget)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openLightboxBySrc(card.src, event.currentTarget);
      }}
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
              onClick={(event) => openLightbox(0, event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                openLightbox(0, event.currentTarget);
              }}
              role="button"
              tabIndex={0}
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
        ref={lightboxRef}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de imagenes"
        aria-hidden={!lightboxOpen}
        tabIndex={-1}
      >
        <div
          className="gd-lightbox-inner"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => {
            touchStartRef.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            const start = touchStartRef.current;
            if (!start) return;
            touchStartRef.current = null;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              navigateLightbox(dx < 0 ? 'next' : 'prev');
            } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
              closeLightbox();
            }
          }}
          onPointerCancel={() => {
            touchStartRef.current = null;
          }}
          onWheel={(event) => {
            if (Math.abs(event.deltaX) > 30 && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
              if (wheelLockRef.current) return;
              wheelLockRef.current = true;
              window.setTimeout(() => { wheelLockRef.current = false; }, 350);
              navigateLightbox(event.deltaX > 0 ? 'next' : 'prev');
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
