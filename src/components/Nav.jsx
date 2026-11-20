import { useEffect, useState } from 'react';
import Icon from './Icon';
import PaletteMenu from './PaletteMenu';
import { person, sections } from '../data/profile';
import { useActiveSection, useScrollProgress } from '../hooks/useScrollFx';

const IDS = sections.map((s) => s.id);

export default function Nav({ palette, setPalette }) {
  const { progress, scrolled } = useScrollProgress();
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <>
      <div className="progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />

      <header className={`nav ${scrolled ? 'is-stuck' : ''}`}>
        <div className="shell nav__inner">
          <a className="brand" href="#home" aria-label={`${person.name} — home`}>
            <span className="brand__mark">{person.initials}</span>
            <span className="brand__text">
              <span className="brand__name">{person.shortName}</span>
              <span className="brand__role">After-Sales Service</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`nav__link ${active === s.id ? 'is-active' : ''}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <PaletteMenu palette={palette} setPalette={setPalette} />
            <button
              className="icon-btn nav__burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav className="drawer" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
