import { useEffect, useRef, useState } from 'react';
import { PALETTES } from '../palettes';

/** Swatch button + popover for picking a colour combination. */
export default function PaletteMenu({ palette, setPalette }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="pal" ref={wrap}>
      <button
        className="icon-btn pal__btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Colour: ${palette.name}. Change it`}
        title={palette.name}
      >
        <span className="pal__dot" style={{ background: palette.red }} />
        <span className="pal__dot pal__dot--sm" style={{ background: palette.yellow }} />
      </button>

      {open && (
        <div className="pal__menu" role="menu">
          <p className="pal__head">Colour combination</p>
          {PALETTES.map((p) => (
            <button
              key={p.id}
              role="menuitemradio"
              aria-checked={p.id === palette.id}
              className={`pal__row ${p.id === palette.id ? 'is-on' : ''}`}
              onClick={() => {
                setPalette(p.id);
                setOpen(false);
              }}
            >
              <span className="pal__swatch" style={{ background: p.card }}>
                <i style={{ background: p.red }} />
                <i style={{ background: p.yellow }} />
                <i style={{ background: p.green }} />
              </span>
              <span className="pal__text">
                <span className="pal__name">{p.name}</span>
                <span className="pal__note">{p.note}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
