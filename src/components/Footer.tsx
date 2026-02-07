import React from 'react';
import { Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    { 
      href: "https://tumarca.com", 
      label: "Desarrollador",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold">RG</text>
        </svg>
      )
    },
    { 
      href: "https://instagram.com/gdarquitectura", 
      label: "Instagram",
      icon: <Instagram className="w-10 h-10" />
    },
    { 
      href: "mailto:info@gd.com", 
      label: "Email",
      icon: <Mail className="w-11 h-11" />
    },
    { 
      href: "https://facebook.com/gdarquitectura", 
      label: "Facebook",
      icon: <Facebook className="w-10 h-10" />
    },
    { 
      href: "https://wa.me/549XXXXXXXXXX", 
      label: "WhatsApp",
      icon: <MessageCircle className="w-10 h-10" />
    },
  ];

  return (
    <footer id="gd-footer" className="w-full py-12 relative z-[100]">
      <div 
        className="flex justify-center items-center gap-24 md:gap-36"
        role="group" 
        aria-label="Redes y contacto"
      >
        {socialLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className="inline-block text-gd-grey transition-all duration-400 hover:-translate-y-3 hover:scale-[1.2] hover:text-white"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            target={link.href.startsWith('http') ? "_blank" : undefined}
            rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
