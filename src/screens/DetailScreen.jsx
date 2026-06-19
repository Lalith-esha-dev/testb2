import { useNavigate, useParams } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import { findExploreItem } from './exploreItems';
import './DetailScreen.css';

export default function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = findExploreItem(id);

  if (!item) {
    return (
      <ScreenLayout>
        <Card className="detail-card">
          <h1 className="detail-title">Not Found</h1>
          <p className="detail-description">
            We couldn't find the item you were looking for.
          </p>
          <button
            type="button"
            className="detail-button"
            onClick={() => navigate(-1)}
          >
            <span className="detail-button-text">Go Back</span>
          </button>
        </Card>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Card className="detail-card">
        <span className="detail-emoji" aria-hidden="true">
          {item.emoji}
        </span>
        <h1 className="detail-title">{item.title}</h1>
        <p className="detail-description">{item.description}</p>
        <p className="detail-body">
          Tap the back button or use the tab bar to return. This detail screen
          is pushed onto the Explore stack so you can drill into content from
          the list.
        </p>
        <button
          type="button"
          className="detail-button"
          onClick={() => navigate(-1)}
        >
          <span className="detail-button-text">Go Back</span>
        </button>
      </Card>
    </ScreenLayout>
  );
}
