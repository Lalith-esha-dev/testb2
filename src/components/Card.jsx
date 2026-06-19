import './Card.css';

export default function Card({ children, className = '', style }) {
  const classes = className ? `card ${className}` : 'card';
  return (
    <section className={classes} style={style}>
      {children}
    </section>
  );
}
