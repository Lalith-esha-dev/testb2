import './ScreenLayout.css';

export default function ScreenLayout({ children, scroll = false }) {
  return (
    <div className={scroll ? 'screen screen-scroll' : 'screen'}>
      <div className="screen-bg-top" aria-hidden="true" />
      <div className="screen-bg-blob-primary" aria-hidden="true" />
      <div className="screen-bg-blob-accent" aria-hidden="true" />
      <div className="screen-content">{children}</div>
    </div>
  );
}
