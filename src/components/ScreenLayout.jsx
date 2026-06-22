import './ScreenLayout.css';

export default function ScreenLayout({ children, scroll = false }) {
  return (
    <div className={scroll ? 'screen screen-scroll' : 'screen'}>
      <div className="screen-top-stripe" aria-hidden="true" />
      <div className="screen-decor-large" aria-hidden="true" />
      <div className="screen-decor-small" aria-hidden="true" />
      <div className="screen-content">{children}</div>
    </div>
  );
}
