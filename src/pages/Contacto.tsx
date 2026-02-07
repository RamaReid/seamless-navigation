import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Scene, SceneTitle, SceneSubtitle, SceneText } from '@/components/Scene';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contacto = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    setTimeout(() => setHeaderVisible(true), 400);
    document.body.classList.add('hero-visible', 'header-visible');
    
    return () => {
      document.body.classList.remove('hero-visible', 'header-visible');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío de formulario
    console.log('Formulario enviado');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Plano de fondo */}
      <div 
        id="plano-bg"
        style={{
          backgroundImage: 'linear-gradient(135deg, hsl(226 38% 8%) 0%, hsl(226 38% 15%) 100%)'
        }}
      />

      {/* App Layer */}
      <div id="app-layer" className="relative z-30">
        <Header visible={headerVisible} />

        <HeroSection 
          visible={heroVisible}
          backgroundImage="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&h=1080&fit=crop"
        />

        <main id="home-board" className="w-full max-w-gd mx-auto px-6 md:px-10 box-border">
          <Scene variant="intro">
            <SceneTitle>Contacto</SceneTitle>
          </Scene>

          <Scene variant="divider">
            <SceneSubtitle>
              Contanos tu idea. Te ayudamos a darle forma.
            </SceneSubtitle>
            <SceneText>
              Escribinos y coordinamos una reunión inicial.
            </SceneText>
          </Scene>

          {/* Información de contacto */}
          <Scene variant="divider">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
              <div className="space-y-6">
                <SceneSubtitle className="text-left">Datos</SceneSubtitle>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gd-grey">
                    <Mail className="w-5 h-5 text-gd-blue" />
                    <a href="mailto:info@gd.com" className="hover:text-white transition-colors">
                      info@gd.com
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gd-grey">
                    <Phone className="w-5 h-5 text-gd-blue" />
                    <a href="https://wa.me/549XXXXXXXXXX" className="hover:text-white transition-colors">
                      +54 9 0000 000000
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gd-grey">
                    <MapPin className="w-5 h-5 text-gd-blue" />
                    <span>Buenos Aires</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gd-grey">
                    <Clock className="w-5 h-5 text-gd-blue" />
                    <span>Lun a Vie, 9 a 18</span>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="glass-effect rounded-lg p-6">
                <SceneSubtitle className="text-left mb-6">Agenda una reunión</SceneSubtitle>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      type="text" 
                      placeholder="Nombre"
                      className="bg-transparent border-border focus:border-gd-blue"
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email"
                      className="bg-transparent border-border focus:border-gd-blue"
                    />
                  </div>
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Teléfono"
                      className="bg-transparent border-border focus:border-gd-blue"
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Contanos sobre tu proyecto..."
                      rows={4}
                      className="bg-transparent border-border focus:border-gd-blue resize-none"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gd-blue hover:bg-gd-blue/80 text-white"
                  >
                    Enviar mensaje
                  </Button>
                </form>
                
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Responderemos dentro de 24 a 48 horas.
                </p>
              </div>
            </div>
          </Scene>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Contacto;
