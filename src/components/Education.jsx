import Icon from './Icon';
import Reveal from './Reveal';
import { education, languages } from '../data/profile';
import { useReveal } from '../hooks/useScrollFx';

function Languages() {
  const [ref, shown] = useReveal();
  return (
    <div className="lang-card" ref={ref}>
      <h3>
        <Icon name="globe" size={17} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
        Languages
      </h3>
      <div className="gauges">
        {languages.map((l, i) => (
          <div key={l.name}>
            <div className="gauge__head">
              <span>{l.name}</span>
              <span className="gauge__val">{l.level}</span>
            </div>
            <div className="bar" role="img" aria-label={`${l.name}: ${l.level}`}>
              <div
                className={`bar__fill ${i % 2 ? 'bar__fill--amber' : ''}`}
                style={{ width: shown ? `${l.value}%` : 0, '--delay': `${i * 110}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Education &amp; languages</span>
          <h2 className="section-title">Mechanical engineering foundation</h2>
        </Reveal>

        <div className="edu__grid">
          <div className="edu-list">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 90} className="edu" as="article">
                <span className="edu__icon">
                  <Icon name="cap" size={20} />
                </span>
                <span>
                  <span className="edu__degree">{e.degree}</span>
                  <span className="edu__institute">{e.institute}</span>
                </span>
                <span className="edu__score">{e.score}</span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <Languages />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
