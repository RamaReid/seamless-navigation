import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GDLogo } from './GDLogo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  visible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/momentos', label: 'Momentos' },
    { path: '/estudio', label: 'Estudio' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
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
                <Link
                  to={item.path}
                  className={cn(
                    location.pathname === item.path && "active"
                  )}
                >
                  {item.label}
                </Link>
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
  );
};

export default Header;
