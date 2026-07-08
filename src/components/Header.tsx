import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GDLogo } from './GDLogo';
import { ProjectsNav } from './ProjectsNav';
import { cn } from '@/lib/utils';

interface HeaderProps {
  visible?: boolean;
}

// Timing from original home.js
const SHOW_THRESHOLD = 150;
const HERO_IDLE_MS = 6000;

export const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsNavOpen, setProjectsNavOpen] = useState(false);
  const heroTimerRef = useRef<number | null>(null);

  // Determinar contexto de ruta
  const isMomentosPage = location.pathname === '/momentos';
  const isProyectoPage = location.pathname.startsWith('/proyectos/');
  
  // En /momentos el ítem "Momentos" se muestra como "Proyectos" y hace toggle del mini-menú
  const navItems = [
    { 
      path: '/momentos', 
      label: isMomentosPage ? 'Proyectos' : 'Momentos',
      isToggle: isMomentosPage // En /momentos es toggle, no link
    },
    { path: '/estudio', label: 'Estudio', isToggle: false },
  ];

  // Close projects nav on route change
  useEffect(() => {
    setProjectsNavOpen(false);
  }, [location.pathname]);

  // Clear hero timer helper
  const clearHeroTimer = useCallback(() => {
    if (heroTimerRef.current) {
      clearTimeout(heroTimerRef.current);
      heroTimerRef.current = null;
    }
  }, []);

  // Handle hero interactions - hide header temporarily
  useEffect(() => {
    const isAboveThreshold = () => (window.scrollY || 0) <= SHOW_THRESHOLD;

    const scheduleHeroHeader = () => {
      clearHeroTimer();
      heroTimerRef.current = window.setTimeout(() => {
        if (!isAboveThreshold()) return;
        document.body.classList.add('header-visible');
      }, HERO_IDLE_MS);
    };

    const noteHeroInteraction = () => {
      if (!isAboveThreshold()) return;
      document.body.classList.remove('header-visible');
      scheduleHeroHeader();
    };

    const handleHeroInteraction = (event: Event) => {
      const customEvent = event as CustomEvent;
      const type = customEvent?.detail?.type;
      if (typeof type !== 'string' || !type.includes('HERO')) return;
      noteHeroInteraction();
    };

    // Listen for hero interactions from iframe messages
    window.addEventListener('heroInteraction', handleHeroInteraction);

    return () => {
      clearHeroTimer();
      window.removeEventListener('heroInteraction', handleHeroInteraction);
    };
  }, [clearHeroTimer]);

  // Scroll-based header visibility (from header-on-scroll.js)
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY || 0;

      // If the user scrolls down, the header shows and stays visible
      if (y > SHOW_THRESHOLD) {
        document.body.classList.add('header-visible');
        clearHeroTimer();
      }
      // Note: We don't hide the header on scroll up - that's controlled by the hero sequence

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [clearHeroTimer]);

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.isToggle) {
      e.preventDefault();
      setProjectsNavOpen(!projectsNavOpen);
    }
  };

  return (
    <>
      <header 
        className="gd-header"
        role="banner"
      >
        <nav className="navbar" role="navigation">
          {/* Brand */}
          <div className="brand">
            <Link 
              to="/" 
              className="brand-link"
              aria-label="Ir al inicio"
              onClick={() => {
                setProjectsNavOpen(false);
              }}
            >
              <GDLogo className="brand-logo" />
            </Link>
            <span className="brand-tagline">
              Arquitectura, Diseño y Construcción
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-area">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  {item.isToggle ? (
                    <button
                      className={cn(
                        "nav-toggle-btn",
                        projectsNavOpen && "is-active"
                      )}
                      onClick={(e) => handleNavClick(item, e)}
                      aria-expanded={projectsNavOpen}
                      aria-controls="projects-nav"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        location.pathname === item.path && "active"
                      )}
                      onClick={(e) => handleNavClick(item, e)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="nav-toggle"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              document.body.classList.toggle('nav-open', !mobileMenuOpen);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* Projects Navigation - contextual por ruta */}
      <ProjectsNav 
        isProjectsMode={projectsNavOpen || isProyectoPage}
        onClose={() => setProjectsNavOpen(false)}
      />
    </>
  );
};

export default Header;
