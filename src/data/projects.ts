import { projectPages } from './projectPages';

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

export const projects: Project[] = projectPages.map((page) => ({
  id: page.id,
  name: page.name,
  heroImage: page.hero.src,
  images: page.lightboxImages.map((image) => ({ ...image })),
}));

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getAdjacentProjects = (currentId: string) => {
  const currentIndex = projects.findIndex((project) => project.id === currentId);
  if (currentIndex === -1) return { prev: null, next: null };

  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
};
