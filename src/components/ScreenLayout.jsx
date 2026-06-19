import './ScreenLayout.css';

export default function ScreenLayout({ children, scroll = false }) {
  return (
    <div className={scroll ? 'screen screen-scroll' : 'screen'}>
      <div className="screen-content">{children}</div>
    </div>
  );
}
