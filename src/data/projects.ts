// Data de proyectos - casas
export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  heroImage: string;
  description?: string;
  location?: string;
  year?: string;
  images: ProjectImage[];
}

// Mapeo de imágenes de cada proyecto (usando rutas públicas)
export const projects: Project[] = [
  {
    id: 'cedahause',
    name: 'CeDa Hause',
    heroImage: '/img/cedahause/cedahause-exterior-hero-este.png',
    images: [
      { src: '/img/cedahause/cedahause-exterior-hero-este.png', alt: 'Exterior Este' },
      { src: '/img/cedahause/cedahause-exterior-hero-oeste.png', alt: 'Exterior Oeste' },
      { src: '/img/cedahause/cedahause-exterior-entrada.png', alt: 'Entrada' },
      { src: '/img/cedahause/cedahause-living.png', alt: 'Living' },
      { src: '/img/cedahause/cedahause-comedor.png', alt: 'Comedor' },
      { src: '/img/cedahause/cedahause-cocina.png', alt: 'Cocina' },
      { src: '/img/cedahause/cedahause-bano-ducha.png', alt: 'Baño Ducha' },
      { src: '/img/cedahause/cedahause-bano-bacha.png', alt: 'Baño Bacha' },
    ],
  },
  {
    id: 'donahause',
    name: 'DoNa Hause',
    heroImage: '/img/donahause/donahause-hero2.png',
    images: [
      { src: '/img/donahause/donahause-hero2.png', alt: 'Exterior Hero' },
      { src: '/img/donahause/donahause-comedor-living.png', alt: 'Comedor Living' },
      { src: '/img/donahause/donahause-quincho.png', alt: 'Quincho' },
      { src: '/img/donahause/donahause-quincho-b.png', alt: 'Quincho B' },
    ],
  },
  {
    id: 'gadehause',
    name: 'GaDe Hause',
    heroImage: '/img/gadehause/gadehause-exterior-hero-sur.png',
    images: [
      { src: '/img/gadehause/gadehause-exterior-hero-sur.png', alt: 'Exterior Sur' },
      { src: '/img/gadehause/gadehause-exterior-entrada.png', alt: 'Entrada' },
      { src: '/img/gadehause/gadehause-cocina.png', alt: 'Cocina' },
      { src: '/img/gadehause/gadehause-cocina-panoramica.png', alt: 'Cocina Panorámica' },
      { src: '/img/gadehause/gadehause-comedor.png', alt: 'Comedor' },
      { src: '/img/gadehause/gadehause-dormitorio.png', alt: 'Dormitorio' },
      { src: '/img/gadehause/gadehause-bano-principal.png', alt: 'Baño Principal' },
      { src: '/img/gadehause/gadehause-pileta-portal.png', alt: 'Pileta Portal' },
    ],
  },
  {
    id: 'jobehause',
    name: 'JoBe Hause',
    heroImage: '/img/jobehause/jobehause-exterior-frente-hero.png',
    images: [
      { src: '/img/jobehause/jobehause-exterior-frente-hero.png', alt: 'Exterior Frente' },
      { src: '/img/jobehause/jobehause-exterior-entrada.png', alt: 'Entrada' },
    ],
  },
  {
    id: 'jomahause',
    name: 'JoMa Hause',
    heroImage: '/img/jomahause/jomahause-exterior-hero.png',
    images: [
      { src: '/img/jomahause/jomahause-exterior-hero.png', alt: 'Exterior Hero' },
      { src: '/img/jomahause/jomahause-cocina.png', alt: 'Cocina' },
      { src: '/img/jomahause/jomahause-cocina-comedor.png', alt: 'Cocina Comedor' },
      { src: '/img/jomahause/jomahause-quincho.png', alt: 'Quincho' },
      { src: '/img/jomahause/jomahause-bano-banera.png', alt: 'Baño Bañera' },
    ],
  },
  {
    id: 'jonohause',
    name: 'JoNo Hause',
    heroImage: '/img/jonohause/jonohause-exterior-hero.png',
    images: [
      { src: '/img/jonohause/jonohause-exterior-hero.png', alt: 'Exterior Hero' },
      { src: '/img/jonohause/jonohause-comedor.png', alt: 'Comedor' },
      { src: '/img/jonohause/jonohause-dormitorio.png', alt: 'Dormitorio' },
      { src: '/img/jonohause/jonohause-dormitorio-2.png', alt: 'Dormitorio 2' },
      { src: '/img/jonohause/jonohause-bano.png', alt: 'Baño' },
    ],
  },
  {
    id: 'magahause',
    name: 'MaGa Hause',
    heroImage: '/img/magahause/magahause-exterior-sur-entrada-hero.png',
    images: [
      { src: '/img/magahause/magahause-exterior-sur-entrada-hero.png', alt: 'Exterior Sur Entrada' },
      { src: '/img/magahause/magahause-exterior-oeste.png', alt: 'Exterior Oeste' },
      { src: '/img/magahause/magahause-entrada.png', alt: 'Entrada' },
      { src: '/img/magahause/magahause-living.png', alt: 'Living' },
      { src: '/img/magahause/magahause-living-comedor.png', alt: 'Living Comedor' },
      { src: '/img/magahause/magahause-dormitorio.png', alt: 'Dormitorio' },
      { src: '/img/magahause/magahause-terraza-vida.png', alt: 'Terraza Vida' },
      { src: '/img/magahause/magahause-quincho.jpeg', alt: 'Quincho' },
    ],
  },
  {
    id: 'markhause',
    name: 'Mark Hause',
    heroImage: '/img/markhause/markhause-exterior-hero.png',
    images: [
      { src: '/img/markhause/markhause-exterior-hero.png', alt: 'Exterior Hero' },
      { src: '/img/markhause/markhause-living.png', alt: 'Living' },
      { src: '/img/markhause/markhause-comedor.png', alt: 'Comedor' },
      { src: '/img/markhause/markhause-dormitorio.png', alt: 'Dormitorio' },
    ],
  },
  {
    id: 'scohause',
    name: 'Sco Hause',
    heroImage: '/img/scohause/scohause-exterior-hero.png',
    images: [
      { src: '/img/scohause/scohause-exterior-hero.png', alt: 'Exterior Hero' },
      { src: '/img/scohause/scohause-living.png', alt: 'Living' },
      { src: '/img/scohause/scohause-galeria-panoramica.png', alt: 'Galería Panorámica' },
      { src: '/img/scohause/scohause-galeria-relacion.png', alt: 'Galería Relación' },
      { src: '/img/scohause/scohause-quincho.png', alt: 'Quincho' },
    ],
  },
  {
    id: 'vidahause',
    name: 'ViDa Hause',
    heroImage: '/img/vidahause/vidahause-exterior-hero.png',
    images: [
      { src: '/img/vidahause/vidahause-exterior-hero.png', alt: 'Exterior Hero' },
      { src: '/img/vidahause/vidahause-cocina.png', alt: 'Cocina' },
      { src: '/img/vidahause/vidahause-vista-sur-patio.png', alt: 'Vista Sur Patio' },
    ],
  },
];

// Obtener proyecto por ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

// Obtener proyecto anterior y siguiente para navegación
export const getAdjacentProjects = (currentId: string) => {
  const currentIndex = projects.findIndex((p) => p.id === currentId);
  if (currentIndex === -1) return { prev: null, next: null };
  
  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  
  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
};
