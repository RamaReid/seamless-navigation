import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogoSVG from './BrandLogoSVG';

interface GDHeaderProps {
  onLogoClick?: () => void;
}

const GDHeader: React.FC<GDHeaderProps> = ({ onLogoClick }) => {
  const handleLogoClick = () => {
    sessionStorage.setItem('gd_nav_transition', '1');
    onLogoClick?.();
  };

  return (
    <header className="gd-header" role="banner">
      <div className="navbar" role="navigation">
        {/* Marca */}
        <div className="brand">
          <Link 
            to="/" 
            className="brand-link" 
            aria-label="Ir al inicio"
            onClick={handleLogoClick}
          >
            <BrandLogoSVG />
          </Link>
          <span className="brand-tagline">
            Arquitectura, Diseño y Construcción
          </span>
        </div>
        
        {/* Navegación */}
        <nav className="nav-area" aria-label="Principal">
          <ul className="nav-list">
            <li><Link to="/momentos">Momentos</Link></li>
            <li><Link to="/estudio">Estudio</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        
        <button className="nav-toggle" aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default GDHeader;
