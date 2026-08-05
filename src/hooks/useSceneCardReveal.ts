import { useEffect } from 'react';

const SCENE_CARD_REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: '0px 0px -15% 0px',
};

export function useSceneCardReveal() {
  useEffect(() => {
    const revealTimers = new Set<number>();
    const revealedScenes = new WeakSet<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || revealedScenes.has(entry.target)) return;

        revealedScenes.add(entry.target);
        const cards = entry.target.querySelectorAll<HTMLElement>('.scene-card');
        cards.forEach((card, index) => {
          const timer = window.setTimeout(() => {
            card.classList.add('is-visible');
            revealTimers.delete(timer);
          }, index * 250);
          revealTimers.add(timer);
        });
      });
    }, SCENE_CARD_REVEAL_OPTIONS);

    document.querySelectorAll<HTMLElement>('[data-scene]').forEach((scene) => {
      observer.observe(scene);
    });

    return () => {
      observer.disconnect();
      revealTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}

export default useSceneCardReveal;
