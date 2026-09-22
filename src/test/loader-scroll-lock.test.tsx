import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from '@/components/Loader';

afterEach(() => {
  cleanup();
  document.body.className = '';
});

describe('Loader scroll-lock integration', () => {
  it('renders the SVG with the animation class expected by the active loader styles', () => {
    vi.useFakeTimers();

    try {
      const { container } = render(
        <MemoryRouter initialEntries={['/momentos']}>
          <Loader isNavSkip onComplete={() => undefined} />
        </MemoryRouter>,
      );

      expect(container.querySelector('svg.loader-svg')).toBeTruthy();
    } finally {
      cleanup();
      vi.useRealTimers();
    }
  });

});
