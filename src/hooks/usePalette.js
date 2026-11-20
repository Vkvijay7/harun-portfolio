import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PALETTE, PALETTES, getPalette } from '../palettes';

/**
 * Holds the active colour combination and pushes it onto :root as CSS custom
 * properties, so the page, the cards and the canvas all change together.
 */
export function usePalette() {
  const [id, setId] = useState(() => {
    try {
      return localStorage.getItem('hrb-palette') || DEFAULT_PALETTE;
    } catch {
      return DEFAULT_PALETTE;
    }
  });

  const palette = getPalette(id);

  useEffect(() => {
    const root = document.documentElement;
    const set = (k, v) => root.style.setProperty(k, v);

    set('--bg', palette.ink);
    set('--card', palette.card);
    set('--card-alt', palette.cardAlt);
    set('--card-ink', palette.cardInk);
    set('--red', palette.red);
    set('--yellow', palette.yellow);
    set('--green', palette.green);

    // Legacy accent tokens still used by a few components.
    set('--accent', palette.red);
    set('--accent-soft', palette.yellow);
    set('--accent-deep', palette.green);
    set('--amber', palette.yellow);
    set('--glow', hexToRgba(palette.yellow, 0.18));

    root.setAttribute('data-palette', palette.id);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.ink);

    try {
      localStorage.setItem('hrb-palette', palette.id);
    } catch {
      /* storage can be blocked — the palette still applies for this visit */
    }
  }, [palette]);

  const cycle = useCallback(() => {
    setId((current) => {
      const i = PALETTES.findIndex((p) => p.id === current);
      return PALETTES[(i + 1) % PALETTES.length].id;
    });
  }, []);

  return { palette, setPalette: setId, cycle };
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const n = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
