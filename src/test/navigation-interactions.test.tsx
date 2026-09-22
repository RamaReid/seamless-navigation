import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { TransitionShell } from '@/components/TransitionShell';
import { Header } from '@/components/Header';
import { HeroRevista } from '@/components/HeroRevista';
import Proyecto from '@/pages/Proyecto';

vi.mock('@/components/Loader', () => ({
  Loader: ({ onComplete }: { onComplete: () => void }) => (
    <button type="button" data-testid="mock-loader" onClick={onComplete}>
      Complete transition
    </button>
  ),
}));

const originalInnerWidth = window.innerWidth;
const originalScrollTo = window.scrollTo;
const originalScrollBy = window.scrollBy;
const originalScrollIntoView = Element.prototype.scrollIntoView;
const originalElementScrollTo = HTMLElement.prototype.scrollTo;

const RouteContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main>
      <p data-testid="current-route">{location.pathname}{location.hash}</p>
      <Link to="/estudio">Ir a Estudio</Link>
      <Link to="/momentos">Ir a Momentos</Link>
      <button type="button" onClick={() => navigate(-1)}>Atrás</button>
      <button type="button" onClick={() => navigate(1)}>Adelante</button>
      <div id="contacto">Contacto</div>
    </main>
  );
};

const renderTransitionShell = (initialEntries: string[]) => render(
  <MemoryRouter initialEntries={initialEntries}>
    <TransitionShell>
      <Routes>
        <Route path="*" element={<RouteContent />} />
      </Routes>
    </TransitionShell>
  </MemoryRouter>,
);

const LocationProbe = () => {
  const location = useLocation();
  return <span data-testid="route-probe">{location.pathname}</span>;
};

const renderProject = () => render(
  <MemoryRouter initialEntries={['/proyectos/magahause']}>
    <Routes>
      <Route path="/proyectos/:id" element={<Proyecto />} />
    </Routes>
  </MemoryRouter>,
);

const renderHomeWithHero = () => render(
  <MemoryRouter initialEntries={['/']}>
    <TransitionShell>
      <HeroRevista />
      <Routes>
        <Route path="*" element={<RouteContent />} />
      </Routes>
    </TransitionShell>
  </MemoryRouter>,
);

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', () => undefined);
  vi.stubGlobal(
    'IntersectionObserver',
    class MockIntersectionObserver {
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
      observe(_target: Element) {}
      unobserve(_target: Element) {}
      disconnect() {}
    },
  );

  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window, 'scrollBy', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window.history, 'scrollRestoration', {
    configurable: true,
    writable: true,
    value: 'auto',
  });
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value: 120,
  });
  window.innerWidth = 1024;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    writable: true,
    value: originalScrollTo,
  });
  Object.defineProperty(window, 'scrollBy', {
    configurable: true,
    writable: true,
    value: originalScrollBy,
  });
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: originalScrollIntoView,
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
    configurable: true,
    writable: true,
    value: originalElementScrollTo,
  });
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value: 0,
  });
  window.innerWidth = originalInnerWidth;
  document.body.className = '';
});

describe('route scroll behavior', () => {
  it('locks only during the transition and releases native scrolling on completion', () => {
    renderTransitionShell(['/momentos']);

    expect(document.body).toHaveClass('sequence-only');

    fireEvent.click(screen.getByTestId('mock-loader'));

    expect(document.body).not.toHaveClass('sequence-only');
  });

  it('cleans the transition lock when the shell unmounts', () => {
    const view = renderTransitionShell(['/estudio']);

    expect(document.body).toHaveClass('sequence-only');

    view.unmount();

    expect(document.body).not.toHaveClass('sequence-only');
  });

  it('starts a route without a hash at the top', () => {
    renderTransitionShell(['/momentos']);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });

  it('moves to a hash destination smoothly', () => {
    renderTransitionShell(['/estudio#contacto']);

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('resets scroll when navigating and using browser history', async () => {
    renderTransitionShell(['/momentos']);

    fireEvent.click(screen.getByRole('link', { name: 'Ir a Estudio' }));
    await waitFor(() => expect(screen.getByTestId('current-route')).toHaveTextContent('/estudio'));

    fireEvent.click(screen.getByRole('button', { name: 'Atrás' }));
    await waitFor(() => expect(screen.getByTestId('current-route')).toHaveTextContent('/momentos'));

    fireEvent.click(screen.getByRole('button', { name: 'Adelante' }));
    await waitFor(() => expect(screen.getByTestId('current-route')).toHaveTextContent('/estudio'));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });
});

describe('mobile navigation', () => {
  it('locks scroll, traps focus, closes with Escape and restores the trigger', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: 'Abrir menú' });
    fireEvent.click(trigger);

    const menu = screen.getByRole('dialog', { name: 'Menú' });
    const closeButton = within(menu).getByRole('button', { name: 'Cerrar menú' });
    expect(document.body).toHaveClass('nav-open');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(closeButton).toHaveFocus();

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    focusable[focusable.length - 1].focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(focusable[0]);

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body).not.toHaveClass('nav-open');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 120,
      left: 0,
      behavior: 'auto',
    });
  });

  it('closes when selecting the current route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: 'Abrir menú' });
    fireEvent.click(trigger);
    const menu = screen.getByRole('dialog', { name: 'Menú' });
    fireEvent.click(within(menu).getByRole('link', { name: 'Inicio' }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body).not.toHaveClass('nav-open');
  });

  it('does not restore the previous scroll position after changing route', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/estudio']} initialIndex={0}>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Abrir/ }));
    vi.mocked(window.scrollTo).mockClear();

    const menu = screen.getByRole('dialog', { name: /Men/ });
    fireEvent.click(within(menu).getByRole('link', { name: 'Estudio' }));

    await waitFor(() => expect(screen.getByRole('button', { name: /Abrir/ })).toBeTruthy());
    expect(window.scrollTo).not.toHaveBeenCalledWith({
      top: 120,
      left: 0,
      behavior: 'auto',
    });
  });
});

describe('project lightbox interaction', () => {
  it('supports keyboard opening, traps focus and restores the trigger', async () => {
    renderProject();

    const hero = screen.getByRole('button', { name: 'Ver galeria' });
    fireEvent.keyDown(hero, { key: 'Enter' });

    const dialog = screen.getByRole('dialog', { name: 'Galeria de imagenes' });
    const buttons = within(dialog).getAllByRole('button');
    expect(dialog).toHaveAttribute('aria-hidden', 'false');
    expect(buttons[0]).toHaveFocus();

    buttons[buttons.length - 1].focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[0]);

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(hero).toHaveFocus());
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  it('opens a card with Space', () => {
    renderProject();

    const card = document.querySelector('.scene-card') as HTMLElement;
    expect(card).toBeTruthy();
    fireEvent.keyDown(card, { key: ' ' });

    expect(screen.getByRole('dialog', { name: 'Galeria de imagenes' }))
      .toHaveAttribute('aria-hidden', 'false');
  });

  it('cleans the lightbox lock when leaving a project', () => {
    const view = renderProject();
    const card = document.querySelector('.scene-card') as HTMLElement;

    fireEvent.keyDown(card, { key: ' ' });
    expect(document.body).toHaveClass('lightbox-open');

    view.unmount();

    expect(document.body).not.toHaveClass('lightbox-open');
  });
});

describe('magazine scroll bridge', () => {
  it('accepts bounded vertical scroll only from the same-origin hero iframe', async () => {
    renderHomeWithHero();
    fireEvent.click(screen.getByTestId('mock-loader'));

    const iframe = screen.getByTitle('Revista GD Arquitectura') as HTMLIFrameElement;
    const trustedMessage = new MessageEvent('message', {
      data: { type: 'HERO_VERTICAL_SCROLL', deltaY: 2400 },
      origin: window.location.origin,
    });
    Object.defineProperty(trustedMessage, 'source', { value: iframe.contentWindow });
    window.dispatchEvent(trustedMessage);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: 1200,
      left: 0,
      behavior: 'auto',
    });

    vi.mocked(window.scrollBy).mockClear();

    const untrustedMessage = new MessageEvent('message', {
      data: { type: 'HERO_VERTICAL_SCROLL', deltaY: 240 },
      origin: 'https://example.invalid',
    });
    Object.defineProperty(untrustedMessage, 'source', { value: iframe.contentWindow });
    window.dispatchEvent(untrustedMessage);

    expect(window.scrollBy).not.toHaveBeenCalled();
  });

  it('ignores lateral and unknown hero messages', () => {
    renderHomeWithHero();
    fireEvent.click(screen.getByTestId('mock-loader'));

    const iframe = screen.getByTitle('Revista GD Arquitectura') as HTMLIFrameElement;
    const lateralMessage = new MessageEvent('message', {
      data: { type: 'HERO_PAGE_FLIP', deltaY: 240 },
      origin: window.location.origin,
    });
    Object.defineProperty(lateralMessage, 'source', { value: iframe.contentWindow });
    window.dispatchEvent(lateralMessage);

    const unknownMessage = new MessageEvent('message', {
      data: { type: 'UNKNOWN', deltaY: 240 },
      origin: window.location.origin,
    });
    Object.defineProperty(unknownMessage, 'source', { value: iframe.contentWindow });
    window.dispatchEvent(unknownMessage);

    expect(window.scrollBy).not.toHaveBeenCalled();
  });
});

describe('mobile hero carousel', () => {
  it('uses the mobile carousel at 768px and ignores clicks after dragging', async () => {
    window.innerWidth = 768;

    render(
      <MemoryRouter initialEntries={['/']}>
        <HeroRevista />
        <LocationProbe />
      </MemoryRouter>,
    );

    const track = await screen.findByRole('group', { name: 'Proyectos destacados' });
    const firstLink = within(track).getByRole('link', { name: 'Ver MaGa Hause' });

    fireEvent.pointerDown(track, { pointerType: 'mouse', pointerId: 1, clientX: 10 });
    fireEvent.pointerMove(track, { pointerType: 'mouse', pointerId: 1, clientX: 100 });
    fireEvent.pointerUp(track, { pointerType: 'mouse', pointerId: 1, clientX: 100 });
    fireEvent.click(firstLink);

    expect(screen.getByTestId('route-probe')).toHaveTextContent('/');
  });
});
