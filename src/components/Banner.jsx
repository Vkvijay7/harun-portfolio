import Icon from './Icon';
import Reveal from './Reveal';
import { person, photos } from '../data/profile';

/**
 * The 16:9 banner. The photo fills the whole frame at its own composition —
 * subject on the right, clear space on the left — and a scrim carries the
 * beige of the card across that empty half so the type sits on it cleanly.
 */
export default function Banner() {
  return (
    <Reveal className="banner" as="figure">
      <img
        className="banner__img"
        src={photos.banner.src}
        alt={photos.banner.alt}
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
      />
      <span className="banner__scrim" aria-hidden="true" />

      <figcaption className="banner__panel">
        <span className="eyebrow">
          Area Service Manager
          <span className="banner__loc"> · Dindigul, Tamil Nadu</span>
        </span>
        <h2 className="banner__name">
          M. Mohamed <span>Harun Rasheed Baik</span>
        </h2>
        <p className="banner__line">
          8+ years of motorcycle dealership after-sales — service operations, dealer network
          coordination, warranty administration and team development.
        </p>

        <div className="banner__chips">
          <span className="chip">1 Main + 2 Sub-dealers</span>
          <span className="chip">~20 warranty claims / month</span>
          <span className="chip">~10 staff supported</span>
        </div>

        <a className="btn btn--primary banner__btn" href={`mailto:${person.email}`}>
          <Icon name="arrow" size={18} />
          Get in touch
        </a>
      </figcaption>
    </Reveal>
  );
}
