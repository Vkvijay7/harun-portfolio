import Icon from './Icon';
import Reveal from './Reveal';
import { person } from '../data/profile';

export default function Contact() {
  const rows = [
    { icon: 'mail', k: 'Email', v: person.email, href: `mailto:${person.email}` },
    { icon: 'phone', k: 'Phone', v: person.phone, href: person.phoneHref },
    { icon: 'pin', k: 'Location', v: person.location, href: null },
  ];

  return (
    <section className="section" id="contact">
      <div className="shell">
        <Reveal className="contact" as="div">
          <span className="eyebrow">Career objective</span>
          <h2 className="contact__title">
            Ready to take a service territory and make it run cleanly.
          </h2>
          <p className="contact__objective">{person.objective}</p>

          <div className="contact__rows">
            {rows.map((r) => {
              const Tag = r.href ? 'a' : 'div';
              return (
                <Tag key={r.k} className="contact__row" href={r.href || undefined}>
                  <Icon name={r.icon} size={20} />
                  <span>
                    <span className="contact__k">{r.k}</span>
                    <span className="contact__v">{r.v}</span>
                  </span>
                </Tag>
              );
            })}
          </div>

          <div className="hero__cta">
            <a className="btn btn--primary" href={`mailto:${person.email}`}>
              <Icon name="arrow" size={18} />
              Start a conversation
            </a>
            <a className="btn btn--ghost" href={person.resume} download>
              <Icon name="download" size={18} />
              Download portfolio PDF
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
