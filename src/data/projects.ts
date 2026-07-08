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
    heroImage: '/img/cedahause/cedahause-exterior-hero-este.webp',
    images: [
      { src: '/img/cedahause/cedahause-exterior-hero-este.webp', alt: 'Exterior Este' },
      { src: '/img/cedahause/cedahause-exterior-hero-oeste.webp', alt: 'Exterior Oeste' },
      { src: '/img/cedahause/cedahause-exterior-entrada.webp', alt: 'Entrada' },
      { src: '/img/cedahause/cedahause-living.webp', alt: 'Living' },
      { src: '/img/cedahause/cedahause-comedor.webp', alt: 'Comedor' },
      { src: '/img/cedahause/cedahause-cocina.webp', alt: 'Cocina' },
      { src: '/img/cedahause/cedahause-bano-ducha.webp', alt: 'Baño Ducha' },
      { src: '/img/cedahause/cedahause-bano-bacha.webp', alt: 'Baño Bacha' },
    ],
  },
  {
    id: 'donahause',
    name: 'DoNa Hause',
    heroImage: '/img/donahause/donahause-hero2.webp',
    images: [
      { src: '/img/donahause/donahause-hero2.webp', alt: 'Exterior Hero' },
      { src: '/img/donahause/donahause-comedor-living.webp', alt: 'Comedor Living' },
      { src: '/img/donahause/donahause-quincho.webp', alt: 'Quincho' },
      { src: '/img/donahause/donahause-quincho-b.webp', alt: 'Quincho B' },
    ],
  },
  {
    id: 'gadehause',
    name: 'GaDe Hause',
    heroImage: '/img/gadehause/gadehause-exterior-hero-sur.webp',
    images: [
      { src: '/img/gadehause/gadehause-exterior-hero-sur.webp', alt: 'Exterior Sur' },
      { src: '/img/gadehause/gadehause-exterior-entrada.webp', alt: 'Entrada' },
      { src: '/img/gadehause/gadehause-cocina.webp', alt: 'Cocina' },
      { src: '/img/gadehause/gadehause-cocina-panoramica.webp', alt: 'Cocina Panorámica' },
      { src: '/img/gadehause/gadehause-comedor.webp', alt: 'Comedor' },
      { src: '/img/gadehause/gadehause-dormitorio.webp', alt: 'Dormitorio' },
      { src: '/img/gadehause/gadehause-bano-principal.webp', alt: 'Baño Principal' },
      { src: '/img/gadehause/gadehause-pileta-portal.webp', alt: 'Pileta Portal' },
    ],
  },
  {
    id: 'jobehause',
    name: 'JoBe Hause',
    heroImage: '/img/jobehause/jobehause-exterior-frente-hero.webp',
    images: [
      { src: '/img/jobehause/jobehause-exterior-frente-hero.webp', alt: 'Exterior Frente' },
      { src: '/img/jobehause/jobehause-exterior-entrada.webp', alt: 'Entrada' },
    ],
  },
  {
    id: 'jomahause',
    name: 'JoMa Hause',
    heroImage: '/img/jomahause/jomahause-exterior-hero.webp',
    images: [
      { src: '/img/jomahause/jomahause-exterior-hero.webp', alt: 'Exterior Hero' },
      { src: '/img/jomahause/jomahause-cocina.webp', alt: 'Cocina' },
      { src: '/img/jomahause/jomahause-cocina-comedor.webp', alt: 'Cocina Comedor' },
      { src: '/img/jomahause/jomahause-quincho.webp', alt: 'Quincho' },
      { src: '/img/jomahause/jomahause-bano-banera.webp', alt: 'Baño Bañera' },
    ],
  },
  {
    id: 'jonohause',
    name: 'JoNo Hause',
    heroImage: '/img/jonohause/jonohause-exterior-hero.webp',
    images: [
      { src: '/img/jonohause/jonohause-exterior-hero.webp', alt: 'Exterior Hero' },
      { src: '/img/jonohause/jonohause-comedor.webp', alt: 'Comedor' },
      { src: '/img/jonohause/jonohause-dormitorio.webp', alt: 'Dormitorio' },
      { src: '/img/jonohause/jonohause-dormitorio-2.webp', alt: 'Dormitorio 2' },
      { src: '/img/jonohause/jonohause-bano.webp', alt: 'Baño' },
    ],
  },
  {
    id: 'magahause',
    name: 'MaGa Hause',
    heroImage: '/img/magahause/magahause-exterior-sur-entrada-hero.webp',
    images: [
      { src: '/img/magahause/magahause-exterior-sur-entrada-hero.webp', alt: 'Exterior Sur Entrada' },
      { src: '/img/magahause/magahause-exterior-oeste.webp', alt: 'Exterior Oeste' },
      { src: '/img/magahause/magahause-entrada.webp', alt: 'Entrada' },
      { src: '/img/magahause/magahause-living.webp', alt: 'Living' },
      { src: '/img/magahause/magahause-living-comedor.webp', alt: 'Living Comedor' },
      { src: '/img/magahause/magahause-dormitorio.webp', alt: 'Dormitorio' },
      { src: '/img/magahause/magahause-terraza-vida.webp', alt: 'Terraza Vida' },
      { src: '/img/magahause/magahause-quincho.jpeg', alt: 'Quincho' },
    ],
  },
  {
    id: 'markhause',
    name: 'Mark Hause',
    heroImage: '/img/markhause/markhause-exterior-hero.webp',
    images: [
      { src: '/img/markhause/markhause-exterior-hero.webp', alt: 'Exterior Hero' },
      { src: '/img/markhause/markhause-living.webp', alt: 'Living' },
      { src: '/img/markhause/markhause-comedor.webp', alt: 'Comedor' },
      { src: '/img/markhause/markhause-dormitorio.webp', alt: 'Dormitorio' },
    ],
  },
  {
    id: 'scohause',
    name: 'Sco Hause',
    heroImage: '/img/scohause/scohause-exterior-hero.webp',
    images: [
      { src: '/img/scohause/scohause-exterior-hero.webp', alt: 'Exterior Hero' },
      { src: '/img/scohause/scohause-living.webp', alt: 'Living' },
      { src: '/img/scohause/scohause-galeria-panoramica.webp', alt: 'Galería Panorámica' },
      { src: '/img/scohause/scohause-galeria-relacion.webp', alt: 'Galería Relación' },
      { src: '/img/scohause/scohause-quincho.webp', alt: 'Quincho' },
    ],
  },
  {
    id: 'vidahause',
    name: 'ViDa Hause',
    heroImage: '/img/vidahause/vidahause-exterior-hero.webp',
    images: [
      { src: '/img/vidahause/vidahause-exterior-hero.webp', alt: 'Exterior Hero' },
      { src: '/img/vidahause/vidahause-cocina.webp', alt: 'Cocina' },
      { src: '/img/vidahause/vidahause-vista-sur-patio.webp', alt: 'Vista Sur Patio' },
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
