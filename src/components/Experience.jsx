import Icon from './Icon';
import Reveal from './Reveal';
import { experience } from '../data/profile';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Professional experience</span>
          <h2 className="section-title">Progression through the dealership</h2>
          <p className="section-lede">
            From billing and Service Advisor work to multi-outlet service coordination, warranty
            administration and team training.
          </p>
        </Reveal>

        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal
              key={job.company}
              delay={i * 110}
              as="article"
              className={`tl ${job.current ? 'tl--current' : ''}`}
            >
              <div className="tl__head">
                <h3 className="tl__company">{job.company}</h3>
                <span className="tl__period">{job.period}</span>
              </div>
              <p className="tl__role">
                {job.role}
                {job.place ? ` · ${job.place}` : ''}
              </p>

              {job.points.length > 0 && (
                <ul className="tl__points">
                  {job.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={14} strokeWidth={2.2} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
