import Icon from './Icon';
import Reveal from './Reveal';
import { skillGroups } from '../data/profile';

export default function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section" id="skills">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Technical &amp; professional skills</span>
          <h2 className="section-title">{total} competencies across eight disciplines</h2>
          <p className="section-lede">
            Service and workshop practice, dealer-network reporting, warranty handling, retention,
            training, additional programmes, dealer systems and spare-parts control.
          </p>
        </Reveal>

        <div className="skills">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 60} className="skill" as="article">
              <div className="skill__head">
                <Icon name="spark" size={17} />
                <h3>{g.title}</h3>
                <span className="skill__count">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <div className="tags">
                {g.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
