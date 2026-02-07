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
      className={cn(
        "fixed top-[5px] left-10 right-10 z-40 transition-all duration-[1100ms]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      role="banner"
    >
      <div 
        className="max-w-gd mx-auto mt-10 flex items-center justify-between px-4 pr-9 glass-effect rounded-full"
        role="navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <Link 
            to="/" 
            className="flex items-center no-underline group"
            aria-label="Ir al inicio"
          >
            <GDLogo className="w-[100px] h-auto transition-all duration-300 group-hover:brightness-[1.3] group-hover:scale-110" />
          </Link>
          <span className="text-base tracking-[0.08em] uppercase text-gd-grey whitespace-nowrap hidden md:block">
            Arquitectura, Diseño y Construcción
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center" aria-label="Principal">
          <ul className="list-none flex gap-7 m-0 p-0">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "text-base tracking-[0.1em] uppercase text-gd-grey no-underline relative transition-all duration-300",
                    "hover:scale-110 hover:text-white",
                    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-px",
                    "after:bg-white/70 after:scale-x-0 after:transition-transform after:duration-200",
                    "hover:after:scale-x-100",
                    location.pathname === item.path && "text-white after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="flex md:hidden flex-col justify-center gap-1.5 w-9 h-9 bg-transparent border-0 cursor-pointer"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={cn(
            "block h-0.5 w-full bg-white transition-transform duration-300",
            mobileMenuOpen && "rotate-45 translate-y-2"
          )} />
          <span className={cn(
            "block h-0.5 w-full bg-white transition-opacity duration-300",
            mobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "block h-0.5 w-full bg-white transition-transform duration-300",
            mobileMenuOpen && "-rotate-45 -translate-y-2"
          )} />
        </button>
      </div>

      {/* Mobile Menu */}
      <nav 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 mt-2 mx-10 glass-effect rounded-2xl overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 max-h-60" : "opacity-0 max-h-0 pointer-events-none"
        )}
        aria-label="Menú móvil"
      >
        <ul className="list-none flex flex-col gap-4 p-6 m-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-base tracking-[0.1em] uppercase text-gd-grey no-underline transition-colors duration-300 hover:text-white block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
