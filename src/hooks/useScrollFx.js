import { useEffect, useRef, useState } from 'react';

/* --------------------------------------------------------------------------
 * Scroll direction — one listener for the whole page, read by every reveal.
 * ------------------------------------------------------------------------ */

let scrollDir = 'down';
let lastY = typeof window === 'undefined' ? 0 : window.scrollY;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 2) {
        scrollDir = y > lastY ? 'down' : 'up';
        lastY = y;
      }
    },
    { passive: true }
  );
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal that plays in both directions.
 *
 * Going down, a card rises into place; coming back up it drops in from above.
 * It also plays again each time the element re-enters, so scrolling back
 * through the page is as alive as the first pass. The element is only reset
 * once it is fully clear of the viewport, so nothing flickers at the edges.
 */
export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [dir, setDir] = useState('down');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined' || reducedMotion()) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDir(scrollDir);
            setShown(true);
          } else if (entry.intersectionRatio === 0) {
            // Fully out of frame — arm it to play again on the way back.
            setDir(scrollDir === 'down' ? 'up' : 'down');
            setShown(false);
          }
        });
      },
      { threshold: [0, 0.12], rootMargin: '-6% 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown, dir];
}

/** Counts up to `target` every time the element scrolls back into view. */
export function useCountUp(target, duration = 1500) {
  const [ref, shown, dir] = useReveal();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (reducedMotion()) {
      setValue(target);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shown, target, duration]);

  return [ref, value, shown, dir];
}

/** Scroll progress 0..1 for the page, plus whether the nav should stick. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const top = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(height > 0 ? Math.min(top / height, 1) : 0);
        setScrolled(top > 12);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { progress, scrolled };
}

/** Which section id is currently in view. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/** Rotating word index. */
export function useRotator(length, interval = 2600) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval]);
  return index;
}
