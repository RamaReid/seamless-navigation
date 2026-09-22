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
