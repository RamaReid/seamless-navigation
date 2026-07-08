import React from 'react';

const GDFooter: React.FC = () => {
  return (
    <footer id="gd-footer">
      <div className="footer-icons" role="group" aria-label="Redes y contacto">
        {/* Desarrollador */}
        <a href="https://www.linkedin.com/in/ramareid/" aria-label="Desarrollador" className="icon-link">
          <img src="/assets/icons/logoRagar.svg" alt="" />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/ramareid/" aria-label="Instagram" className="icon-link">
          <img src="/assets/icons/Instagram.svg" alt="" />
        </a>

        {/* Mail (centrado) */}
        <a href="mailto:rgarciareid@gmail.com" aria-label="Email" className="icon-link">
          <img src="/assets/icons/Gmail.svg" alt="" />
        </a>

        {/* Facebook */}
        <a href="https://www.facebook.com/gdarqyconstruccion/" aria-label="Facebook" className="icon-link">
          <img src="/assets/icons/facebook.svg" alt="" />
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/5492494626455" aria-label="WhatsApp" className="icon-link">
          <img src="/assets/icons/Whatsapp.svg" alt="" />
        </a>
      </div>
    </footer>
  );
};

export default GDFooter;
