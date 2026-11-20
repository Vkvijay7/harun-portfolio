import Reveal from './Reveal';
import { person } from '../data/profile';

const FACTS = [
  { k: 'Current role', v: 'Dealership Operations — Sales & Service' },
  { k: 'Employer', v: 'Dindigul Suzuki — V V R Motors Pvt Ltd' },
  { k: 'Experience', v: '8+ years (2016 — Present)' },
  { k: 'Network', v: '1 Main Dealer + 2 Sub-Dealers' },
  { k: 'Warranty', v: 'SMIPL Suzuki + external claims' },
  { k: 'Systems', v: 'Suzuki DMS · JPS · CRM · CSS · CS&SR' },
  { k: 'Base', v: person.location },
];

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">Professional profile</span>
          <h2 className="section-title">End-to-end dealership operations, from bay to balance sheet</h2>
          <p className="section-lede">
            Eight years inside a motorcycle dealership — billing, Service Advisor activities, sales,
            workshop coordination, warranty and retention — now applied across a multi-outlet
            service network.
          </p>
        </Reveal>

        <div className="profile__grid">
          <Reveal className="quote">
            <p className="quote__body">{person.profile}</p>
          </Reveal>

          <Reveal delay={120} className="facts">
            {FACTS.map((f) => (
              <div className="fact" key={f.k}>
                <span className="fact__k">{f.k}</span>
                <span className="fact__v">{f.v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
