/**
 * ProjectsNav - Mini-menú de navegación de proyectos
 * 
 * DOM 1:1 con el original (proyectos.css):
 * - Un SOLO menú con clase .projects-nav
 * - Dos grupos internos: .projects-nav-moments y .projects-nav-projects
 * - Toggle mediante clase .is-projects (no tabs separados)
 * 
 * Comportamiento por ruta:
 * - En /momentos: toggle mediante click en "Proyectos" del header
 * - En /proyectos/:id: siempre visible y en modo projects
 */

import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';

// Capítulos/Momentos para navegación por anclas (exacto del original)
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
  isProjectsMode?: boolean; // Toggle para mostrar proyectos vs momentos
  onClose?: () => void;
}

export const ProjectsNav: React.FC<ProjectsNavProps> = ({ 
  isProjectsMode = false, 
  onClose,
}) => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  
  const isProyectoPage = location.pathname.startsWith('/proyectos/');
  const isMomentosPage = location.pathname === '/momentos';
  
  // Determinar si debe ser visible (solo en /momentos o /proyectos/:id)
  const shouldBeVisible = isProyectoPage || isMomentosPage;
  
  // En páginas de proyecto siempre está en modo projects
  const showProjects = isProyectoPage || isProjectsMode;

  const handleNavClick = () => {
    onClose?.();
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatChapterLabel = (label: string) => label.toUpperCase();
  const formatProjectLabel = (label: string) => label.replace(/\s+/g, '').toUpperCase();

  if (!shouldBeVisible) return null;

  return (
    <nav 
      className={cn(
        "projects-nav",
        showProjects && "is-projects"
      )}
      aria-label="Navegación de proyectos"
    >
      <div className="projects-nav-group">
        {/* Lista de Capítulos/Momentos (anchors) */}
        <div className="projects-nav-moments">
          {CHAPTERS.map((chapter) => (
            <a
              key={chapter.href}
              href={chapter.href}
              onClick={(e) => handleAnchorClick(e, chapter.href)}
              className="projects-nav-item"
            >
              {formatChapterLabel(chapter.label)}
            </a>
          ))}
        </div>

        {/* Lista de Proyectos/Casas (links) */}
        <div className="projects-nav-projects">
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
              {formatProjectLabel(project.name)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ProjectsNav;
