import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import { EXPLORE_ITEMS } from './exploreItems';
import './ExploreScreen.css';

export default function ExploreScreen() {
  const navigate = useNavigate();

  return (
    <ScreenLayout scroll>
      <h1 className="explore-header">Explore</h1>
      <p className="explore-subheader">Discover topics and features</p>

      {EXPLORE_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className="explore-item-button"
          onClick={() => navigate(`/explore/${item.id}`)}
        >
          <Card className="explore-item-card">
            <div className="explore-item-row">
              <span className="explore-emoji" aria-hidden="true">
                {item.emoji}
              </span>
              <div className="explore-item-text">
                <p className="explore-item-title">{item.title}</p>
                <p className="explore-item-description">{item.description}</p>
              </div>
              <span className="explore-chevron" aria-hidden="true">
                ›
              </span>
            </div>
          </Card>
        </button>
      ))}
    </ScreenLayout>
  );
}
