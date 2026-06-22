import './Chip.css';

export default function Chip({ label, active = false, onClick }) {
  const classes = active ? 'chip chip-active' : 'chip';
  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={!onClick}
    >
      <span className={active ? 'chip-label chip-label-active' : 'chip-label'}>
        {label}
      </span>
    </button>
  );
}
