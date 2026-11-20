import Icon from './Icon';
import { person } from '../data/profile';
import { useScrollProgress } from '../hooks/useScrollFx';

export default function Footer() {
  const { progress } = useScrollProgress();

  return (
    <>
      <footer className="footer">
        <div className="shell footer__inner">
          <span>
            © {new Date().getFullYear()} {person.name} · Professional Portfolio
          </span>
          <span>
            <a href={person.phoneHref}>{person.phone}</a>
            {' · '}
            <a href={`mailto:${person.email}`}>{person.email}</a>
          </span>
        </div>
      </footer>

      <a
        className={`to-top ${progress > 0.12 ? 'is-on' : ''}`}
        href="#home"
        aria-label="Back to top"
      >
        <Icon name="up" size={18} />
      </a>
    </>
  );
}
