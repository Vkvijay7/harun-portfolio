import Banner from './Banner';
import Icon from './Icon';
import Reveal from './Reveal';
import { person, photos, stats } from '../data/profile';
import { useCountUp, useReveal, useRotator } from '../hooks/useScrollFx';

const GAUGES = [
  { label: 'Dealer outlets coordinated', value: '1 Main + 2 Sub', pct: 100 },
  { label: 'Warranty claims / month', value: '~20', pct: 78, amber: true },
  { label: 'Staff / technicians supported', value: '~10', pct: 62 },
  { label: 'Years in dealership operations', value: '8+', pct: 88, amber: true },
];

function Stat({ stat, delay }) {
  const [ref, count, inView, dir] = useCountUp(stat.value, 1600);
  const label = stat.display ?? `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`;
  return (
    <div
      className={`stat reveal ${inView ? 'is-in' : ''}`}
      data-dir={dir}
      ref={ref}
      style={{ '--delay': `${delay}ms` }}
    >
      <div className="stat__value">{label}</div>
      <div className="stat__label">{stat.label}</div>
    </div>
  );
}

function Gauges() {
  const [ref, shown] = useReveal();
  return (
    <div className="gauges" ref={ref}>
      {GAUGES.map((g, i) => (
        <div key={g.label}>
          <div className="gauge__head">
            <span>{g.label}</span>
            <span className="gauge__val">{g.value}</span>
          </div>
          <div
            className="bar"
            role="img"
            aria-label={`${g.label}: ${g.value}`}
          >
            <div
              className={`bar__fill ${g.amber ? 'bar__fill--amber' : ''}`}
              style={{ width: shown ? `${g.pct}%` : 0, '--delay': `${i * 120}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const roleIndex = useRotator(person.roles.length);

  return (
    <section className="section hero" id="home">
      <div className="shell">
        <div className="hero__grid">
          <div>
            <Reveal className="hero__badge" as="div">
              <span className="dot" />
              Open to Area / Territory Service Manager roles
            </Reveal>

            <Reveal delay={60}>
              <h1 className="hero__name">
                M. Mohamed <span>Harun Rasheed Baik</span>
              </h1>
            </Reveal>

            <Reveal delay={120} className="hero__rotator" as="div">
              <i>&gt;</i>
              <span className="rotator__word" key={roleIndex}>
                {person.roles[roleIndex]}
              </span>
            </Reveal>

            <Reveal delay={180}>
              <p className="hero__lede">{person.profile}</p>
            </Reveal>

            <Reveal delay={240} className="hero__cta" as="div">
              <a className="btn btn--primary" href={`mailto:${person.email}`}>
                <Icon name="mail" size={18} />
                Get in touch
              </a>
              <a className="btn btn--ghost" href={person.resume} download>
                <Icon name="download" size={18} />
                Download portfolio PDF
              </a>
            </Reveal>

            <Reveal delay={300} className="hero__meta" as="div">
              <span>
                <Icon name="pin" size={16} />
                {person.location}
              </span>
              <a href={person.phoneHref}>
                <Icon name="phone" size={16} />
                {person.phone}
              </a>
              <a href={`mailto:${person.email}`}>
                <Icon name="mail" size={16} />
                {person.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={200} className="hero__card" as="aside">
            <div className="hero__card-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="hero__avatar hero__avatar--photo">
                  <img src={photos.avatar.src} alt={photos.avatar.alt} loading="lazy" />
                </span>
                <span>
                  <span className="hero__card-title">Dindigul Suzuki — V V R Motors</span>
                  <span className="hero__card-sub">Dealership Operations · 2018 — Present</span>
                </span>
              </div>
              <span className="chip">
                <span className="dot" />
                Live
              </span>
            </div>
            <Gauges />
          </Reveal>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Stat key={s.label} stat={s} delay={i * 90} />
          ))}
        </div>

        <Banner />
      </div>
    </section>
  );
}
