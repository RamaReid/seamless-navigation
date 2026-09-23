import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('native scroll CSS contract', () => {
  it('keeps the document scrollable in every global body state', () => {
    const indexCss = readProjectFile('src/index.css');
    const mobileCss = readProjectFile('src/styles/gd-mobile.css');

    expect(indexCss).toMatch(/body\s*\{[^}]*overflow-y:\s*auto/s);
    expect(indexCss).not.toMatch(
      /body\.sequence-only\s*\{[^}]*overflow\s*:\s*hidden/s,
    );
    expect(indexCss).not.toMatch(
      /body\.lightbox-open\s*\{[^}]*overflow\s*:\s*hidden/s,
    );
    expect(mobileCss).not.toMatch(
      /body\.nav-open\s*\{[^}]*overflow\s*:\s*hidden/s,
    );
    expect(mobileCss).not.toMatch(/overscroll-behavior-y:\s*none/s);
  });

  it('allows vertical overflow on the mobile carousel track', () => {
    const mobileCss = readProjectFile('src/styles/gd-mobile.css');

    expect(mobileCss).toMatch(
      /\.gd-carousel-track\s*\{[^}]*overflow-y:\s*auto/s,
    );
    expect(mobileCss).toMatch(
      /\.gd-carousel-track\s*\{[^}]*touch-action:\s*pan-y/s,
    );
  });
});
