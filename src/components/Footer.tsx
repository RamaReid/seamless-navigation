import React from 'react';

// Import SVG icons
import instagramIcon from '@/assets/icons/Instagram.svg';
import gmailIcon from '@/assets/icons/Gmail.svg';
import facebookIcon from '@/assets/icons/Facebook.svg';
import whatsappIcon from '@/assets/icons/Whatsapp.svg';
import logoRagarIcon from '@/assets/icons/LogoRagar.svg';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/ramareid/",
      label: "Desarrollador",
      icon: logoRagarIcon
    },
    {
      href: "https://www.instagram.com/ramareid/",
      label: "Instagram",
      icon: instagramIcon
    },
    {
      href: "mailto:rgarciareid@gmail.com",
      label: "Email",
      icon: gmailIcon,
      larger: true
    },
    {
      href: "https://www.facebook.com/gdarqyconstruccion/",
      label: "Facebook",
      icon: facebookIcon
    },
    {
      href: "https://wa.me/5492494626455",
      label: "WhatsApp",
      icon: whatsappIcon
    },
  ];

  return (
    <footer id="gd-footer" className="w-full py-12 relative z-[100]">
      <div
        className="footer-icons flex justify-center items-center gap-20 md:gap-36"
        role="group"
        aria-label="Redes y contacto"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            aria-label={link.label}
            className="icon-link inline-block transition-all duration-400 hover:-translate-y-3 hover:scale-[1.2]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            target={link.href.startsWith('http') ? "_blank" : undefined}
            rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            <img
              src={link.icon}
              alt=""
              className={link.larger ? "w-11 h-auto" : "w-10 h-auto"}
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
