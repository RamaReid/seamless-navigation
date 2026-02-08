/**
 * ProjectsNav - Mini-menú de navegación de proyectos
 * 
 * Comportamiento por ruta:
 * - En /momentos: toggle mediante click en "Proyectos" del header
 * - En /proyectos/:id: siempre visible
 * - Estructura/estilo equivalente al original proyectos.css
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';

// Capítulos/Momentos para navegación por anclas
const CHAPTERS = [
  { href: '#hola', label: 'llegar' },
  { href: '#cafe', label: 'respirar' },
  { href: '#mesa', label: 'compartir' },
  { href: '#habitar', label: 'habitar' },
  { href: '#portal', label: 'cruzar' },
  { href: '#agua', label: 'refrescar' },
  { href: '#sueno', label: 'dormir' },
  { href: '#brasas', label: 'encender' },
  { href: '#hogar', label: 'pertenecer' },
];

interface ProjectsNavProps {
  isOpen?: boolean;
  onClose?: () => void;
  forceVisible?: boolean; // Para páginas de proyectos individuales
}

export const ProjectsNav: React.FC<ProjectsNavProps> = ({ 
  isOpen = false, 
  onClose,
  forceVisible = false 
}) => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'moments' | 'projects'>('projects');
  
  const isProyectoPage = location.pathname.startsWith('/proyectos/');
  const isMomentosPage = location.pathname === '/momentos';
  
  // En páginas de proyecto siempre mostrar tab de proyectos
  useEffect(() => {
    if (isProyectoPage) {
      setActiveTab('projects');
    }
  }, [isProyectoPage]);

  // Determinar si debe ser visible
  const shouldBeVisible = forceVisible || isProyectoPage || (isMomentosPage && isOpen);

  const handleNavClick = () => {
    sessionStorage.setItem('gd_nav_transition', '1');
    onClose?.();
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose?.();
  };

  return (
    <nav 
      className={cn(
        "projects-nav",
        shouldBeVisible && "is-visible",
        activeTab === 'projects' && "is-projects"
      )}
      aria-label="Navegación de proyectos"
    >
      {/* Tabs solo visibles en /momentos */}
      {isMomentosPage && (
        <div className="projects-nav-tabs">
          <button
            className={cn("projects-nav-tab", activeTab === 'moments' && "is-active")}
            onClick={() => setActiveTab('moments')}
          >
            Momentos
          </button>
          <button
            className={cn("projects-nav-tab", activeTab === 'projects' && "is-active")}
            onClick={() => setActiveTab('projects')}
          >
            Proyectos
          </button>
        </div>
      )}

      {/* Lista de Capítulos/Momentos (solo en tab moments y en /momentos) */}
      {isMomentosPage && activeTab === 'moments' && (
        <div className="projects-nav-list projects-nav-moments">
          {CHAPTERS.map((chapter) => (
            <a
              key={chapter.href}
              href={chapter.href}
              onClick={(e) => handleAnchorClick(e, chapter.href)}
              className="projects-nav-item"
            >
              {chapter.label}
            </a>
          ))}
        </div>
      )}

      {/* Lista de Proyectos/Casas */}
      {(activeTab === 'projects' || isProyectoPage) && (
        <div className="projects-nav-list projects-nav-houses">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/proyectos/${project.id}`}
              className={cn(
                "projects-nav-item",
                id === project.id && "is-active"
              )}
              onClick={handleNavClick}
            >
              {project.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default ProjectsNav;
