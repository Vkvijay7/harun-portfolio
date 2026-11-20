import Icon from './Icon';
import Reveal from './Reveal';
import { capabilities } from '../data/profile';

function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Management &amp; operational capabilities</span>
          <h2 className="section-title">What I own day to day</h2>
          <p className="section-lede">
            Seven areas of responsibility spanning the dealer network, the workshop floor, warranty
            administration and the people who deliver the service.
          </p>
        </Reveal>

        <div className="cards">
          {capabilities.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 70}
              className="card"
              as="article"
              onMouseMove={onMove}
            >
              <span className="card__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="card__icon">
                <Icon name={c.icon} size={21} />
              </span>
              <h3 className="card__title">{c.title}</h3>
              <p className="card__body">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
