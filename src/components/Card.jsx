import './Card.css';

export default function Card({
  children,
  className = '',
  style,
  accent = false,
  tint,
  elevated = false,
}) {
  const classes = ['card'];
  if (elevated) classes.push('card-elevated');
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
