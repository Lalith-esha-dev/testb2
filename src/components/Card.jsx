import './Card.css';

export default function Card({
  children,
  className = '',
  style,
  accent = false,
  tint,
}) {
  const classes = ['card'];
  if (accent) classes.push('card-accent');
  if (tint === 'primary') classes.push('card-tint-primary');
  if (tint === 'accent') classes.push('card-tint-accent');
  if (className) classes.push(className);

  return (
    <section className={classes.join(' ')} style={style}>
      {children}
    </section>
  );
}
