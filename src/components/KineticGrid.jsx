import { useCallback, useEffect, useRef } from 'react';

/**
 * KineticGrid — a warping, rippling grid drawn on canvas.
 *
 * Ported from the shadcn/TS original to this project's stack (JSX + CSS, no
 * Tailwind, no `cn`), and deliberately roughed up so it does not read as
 * machine-perfect:
 *
 *  - every intersection carries a fixed seeded offset, so the lattice is hand-
 *    set rather than ruled
 *  - segments are drawn as slight curves with a seeded control point and a
 *    varying pen weight, the way a line drawn against a ruler still wobbles
 *  - the whole field breathes on a slow sine even when nobody is touching it
 *  - a few nodes per screen are "marked" with a pen ring, like points someone
 *    circled on a plan
 *  - film grain sits over the lot
 *
 * Props:
 *   palette  — object from src/palettes.js (ink/paper/accent/line/grain)
 *   opacity  — overall strength of the drawing, 0..1
 */

const CELL_SIZE = 58;
const INFLUENCE_RADIUS = 250;
const MAX_WARP = 22;
const DOT_SPACING = 30;
const LERP_SPEED = 0.085;
const NODE_BASE_RADIUS = 1.5;
const NODE_ACTIVE_RADIUS = 3.4;

const lerp = (a, b, t) => a + (b - a) * t;

/** Deterministic noise in -1..1 — same cell always gets the same wobble. */
function hash2(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return (((h ^ (h >>> 16)) >>> 0) % 20001) / 10000 - 1;
}

function rgba(c, a) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** One-off noise tile, reused as a repeating pattern every frame. */
function makeGrainTile(strength) {
  const size = 128;
  const tile = document.createElement('canvas');
  tile.width = size;
  tile.height = size;
  const tctx = tile.getContext('2d');
  const img = tctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = Math.random() * 255 * strength;
  }
  tctx.putImageData(img, 0, 0);
  return tile;
}

export default function KineticGrid({ palette, opacity = 1, className = '' }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const target = useRef({ x: -9999, y: -9999 });
  const ripples = useRef([]);
  const raf = useRef(0);
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  const grain = useRef(null);
  const paletteRef = useRef(palette);

  paletteRef.current = palette;

  /** Warped position + cursor proximity for one lattice point. */
  const warp = useCallback((gx, gy, col, row, cols, rows, m, rips, now) => {
    // Pin the outer rows/cols so the field never tears away from the edges.
    const margin = 1.6;
    const colPin = Math.min(col / margin, (cols - 1 - col) / margin, 1);
    const rowPin = Math.min(row / margin, (rows - 1 - row) / margin, 1);
    const pin = colPin * colPin * rowPin * rowPin;

    // Hand-set lattice: a fixed offset per intersection.
    const jx = hash2(col, row) * 3.4;
    const jy = hash2(row, col * 7 + 1) * 3.4;

    // Idle breathing so the grid is alive with no pointer on screen.
    const phase = (col * 0.6 + row * 0.9) * 0.35;
    const breath = Math.sin(now / 2600 + phase) * 1.3 * pin;

    const bx = gx + jx * pin;
    const by = gy + jy * pin + breath;

    const dx = bx - m.x;
    const dy = by - m.y;
    const dist = Math.hypot(dx, dy);
    const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pin;

    let rx = 0;
    let ry = 0;
    for (const r of rips) {
      const rd = Math.hypot(bx - r.x, by - r.y);
      const diff = rd - r.radius;
      const waveWidth = 58;
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pin;
        const angle = Math.atan2(by - r.y, bx - r.x);
        const sign = diff < 0 ? -1 : 1;
        rx += Math.cos(angle) * strength * sign * -1;
        ry += Math.sin(angle) * strength * sign * -1;
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pin > 0) {
      const t = dist / INFLUENCE_RADIUS;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const amount = eased * MAX_WARP * pin;
      const angle = Math.atan2(dy, dx);
      return {
        x: bx - Math.cos(angle) * amount + rx,
        y: by - Math.sin(angle) * amount + ry,
        p: proximity,
      };
    }

    return { x: bx + rx, y: by + ry, p: proximity };
  }, []);

  const draw = useCallback(
    (now) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { w: W, h: H } = size.current;
      const pal = paletteRef.current;
      const m = mouse.current;
      const rips = ripples.current;

      const bg = pal.ink;
      // Lines rest in a neutral tone and light up green; the hand-drawn pen
      // rings are yellow; ripples carry the red.
      const lineRgb = pal.line;
      const accentRgb = hexToRgb(pal.green);
      const sparkRgb = hexToRgb(pal.yellow);
      const rippleRgb = hexToRgb(pal.red);
      const base = 0.13;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Background dust
      ctx.fillStyle = rgba(lineRgb, 0.05);
      for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
          const n = hash2(x, y);
          ctx.beginPath();
          ctx.arc(x + n * 2, y - n * 2, 0.6 + Math.abs(n) * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Age the ripples
      for (let i = rips.length - 1; i >= 0; i--) {
        const r = rips[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 380);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) rips.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts = [];
      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        for (let col = 0; col < cols; col++) {
          pts[row][col] = warp(col * cellW, row * cellH, col, row, cols, rows, m, rips, now);
        }
      }

      // Hand-drawn segments: a curve, not a ruled line.
      ctx.lineCap = 'round';
      const segment = (a, b, seed) => {
        const t = Math.min(1, (a.p + b.p) / 2);
        const s = t * t * (3 - 2 * t);
        const wobble = hash2(seed, seed * 3 + 11) * 2.6;
        const mx = (a.x + b.x) / 2 + -(b.y - a.y) * 0.02 + wobble * 0.5;
        const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.02 + wobble * 0.5;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        const r = Math.round(lerp(lineRgb[0], accentRgb[0], s));
        const g = Math.round(lerp(lineRgb[1], accentRgb[1], s));
        const bl = Math.round(lerp(lineRgb[2], accentRgb[2], s));
        ctx.strokeStyle = `rgba(${r},${g},${bl},${(lerp(base, 0.9, s) * opacity).toFixed(3)})`;
        ctx.lineWidth = lerp(0.7, 1.6, s) * (0.78 + Math.abs(hash2(seed * 5, seed)) * 0.45);
        ctx.stroke();
      };

      let seed = 0;
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          segment(pts[row][col], pts[row][col + 1], seed++);

      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          segment(pts[row][col], pts[row + 1][col], seed++);

      // Nodes — plus a few circled by hand.
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const t = p.p * p.p * (3 - 2 * p.p);
          const n = hash2(col * 13 + 7, row * 29 + 3);
          const r = lerp(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t) * (0.85 + Math.abs(n) * 0.5);

          if (t > 0.3) {
            const glowR = r + lerp(0, 7, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, rgba(accentRgb, (t * 0.32 * opacity).toFixed(3)));
            grd.addColorStop(1, rgba(accentRgb, 0));
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          const nr = Math.round(lerp(lineRgb[0], accentRgb[0], t));
          const ng = Math.round(lerp(lineRgb[1], accentRgb[1], t));
          const nb = Math.round(lerp(lineRgb[2], accentRgb[2], t));
          ctx.fillStyle = `rgba(${nr},${ng},${nb},${(lerp(0.2, 1, t) * opacity).toFixed(3)})`;
          ctx.fill();

          // Marked point — a pen ring on roughly one node in twenty.
          if (n > 0.9) {
            ctx.beginPath();
            ctx.arc(p.x + n, p.y - n, 7 + n * 3, 0.4 + n, 0.4 + n + Math.PI * 1.78);
            ctx.strokeStyle = rgba(sparkRgb, (0.16 + t * 0.5) * opacity);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Ripple rings
      for (const r of rips) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
        ctx.strokeStyle = rgba(rippleRgb, (r.opacity * 0.34 * opacity).toFixed(3));
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Grain
      if (grain.current) {
        const pattern = ctx.createPattern(grain.current, 'repeat');
        if (pattern) {
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, W, H);
          ctx.globalCompositeOperation = 'source-over';
        }
      }
    },
    [warp, opacity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    grain.current = makeGrainTile(palette.grain ?? 0.04);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.current = { w, h, dpr };
    };

    resize();
    window.addEventListener('resize', resize);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      target.current = { x: -9999, y: -9999 };
    };
    const onClick = (e) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    if (reduced) {
      draw(performance.now());
      return () => window.removeEventListener('resize', resize);
    }

    if (!coarse) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('pointerdown', onClick, { passive: true });

    // Touch devices get no cursor warp, so half the frame rate is plenty and
    // keeps the battery out of it.
    const minFrameMs = coarse ? 33 : 0;
    let last = 0;

    const loop = (now) => {
      raf.current = requestAnimationFrame(loop);
      if (now - last < minFrameMs) return;
      last = now;
      const m = mouse.current;
      const t = target.current;
      m.x = lerp(m.x, t.x, LERP_SPEED);
      m.y = lerp(m.y, t.y, LERP_SPEED);
      draw(now);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onClick);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [draw, palette.grain]);

  return <canvas ref={canvasRef} className={`kgrid ${className}`.trim()} aria-hidden="true" />;
}
