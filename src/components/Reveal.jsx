import { useReveal } from '../hooks/useScrollFx';

/**
 * Wraps children in a scroll reveal that plays both ways — rising into place
 * on the way down, dropping in from above on the way back up.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown, dir] = useReveal();
  return (
    <Tag
      ref={ref}
      data-dir={dir}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
