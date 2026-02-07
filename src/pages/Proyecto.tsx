import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getProjectById, getAdjacentProjects, Project } from '@/data/projects';
import fondoCasaM from '@/assets/img/FondoCasaM.png';

const Proyecto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      navigate('/momentos');
      return;
    }

    const projectData = getProjectById(id);
    if (!projectData) {
      navigate('/momentos');
      return;
    }

    setProject(projectData);
    
    // Reset states for new project
    setHeroVisible(false);
    setHeaderVisible(false);
    
    // Start sequence
    document.body.classList.add('sequence-only');
    
    setTimeout(() => setHeroVisible(true), 100);
    setTimeout(() => setHeaderVisible(true), 400);
    setTimeout(() => {
      document.body.classList.remove('sequence-only');
      document.body.classList.add('hero-visible', 'header-visible');
    }, 800);

    return () => {
      document.body.classList.remove('sequence-only', 'hero-visible', 'header-visible');
    };
  }, [id, navigate]);

  const { prev, next } = id ? getAdjacentProjects(id) : { prev: null, next: null };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.classList.add('lightbox-open');
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.classList.remove('lightbox-open');
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!project) return;
    const newIndex = direction === 'prev'
      ? (lightboxIndex === 0 ? project.images.length - 1 : lightboxIndex - 1)
      : (lightboxIndex === project.images.length - 1 ? 0 : lightboxIndex + 1);
    setLightboxIndex(newIndex);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex, project]);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo */}
      <div
        id="plano-bg"
        style={{ backgroundImage: `url(${fondoCasaM})` }}
      />

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <Header visible={headerVisible} />

        {/* Hero Section */}
        <section
          id="hero-revista-section"
          className={`hero-revista-section transition-all duration-[2500ms] ease-out ${heroVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          aria-label={`Hero ${project.name}`}
        >
          <div className="hero-revista-shell" id="hero-revista-shell">
            <div
              className="w-full h-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${project.heroImage})` }}
              onClick={() => openLightbox(0)}
              role="button"
              aria-label="Ver galería"
            />
          </div>

          {/* Navigation Controls */}
          <div className="house-hero-carousel">
            {prev && (
              <Link
                to={`/proyectos/${prev.id}`}
                className="house-hero-control house-hero-prev"
                onClick={() => sessionStorage.setItem('gd_nav_transition', '1')}
              >
                <span className="house-hero-arrow">←</span>
                <span className="house-hero-label">{prev.name}</span>
              </Link>
            )}
            {next && (
              <Link
                to={`/proyectos/${next.id}`}
                className="house-hero-control house-hero-next"
                onClick={() => sessionStorage.setItem('gd_nav_transition', '1')}
              >
                <span className="house-hero-label">{next.name}</span>
                <span className="house-hero-arrow">→</span>
              </Link>
            )}
          </div>
        </section>

        {/* Gallery */}
        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          <section className="scene scene-intro">
            <p className="scene-title">{project.name}</p>
          </section>

          <section className="scene scene-moments">
            {project.images.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="scene-card is-visible cursor-pointer"
                onClick={() => openLightbox(idx + 1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx + 1)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-square object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            ))}
          </section>

          <Footer />
        </main>
      </div>

      {/* Lightbox */}
      <div
        className={`gd-lightbox ${lightboxOpen ? 'is-open' : ''}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Galería de imágenes"
      >
        <div className="gd-lightbox-inner" onClick={(e) => e.stopPropagation()}>
          {project.images[lightboxIndex] && (
            <img
              src={project.images[lightboxIndex].src}
              alt={project.images[lightboxIndex].alt}
              className="gd-lightbox-image"
            />
          )}
          <button
            className="gd-lightbox-close"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <button
            className="gd-lightbox-nav gd-lightbox-prev"
            onClick={() => navigateLightbox('prev')}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className="gd-lightbox-nav gd-lightbox-next"
            onClick={() => navigateLightbox('next')}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proyecto;
