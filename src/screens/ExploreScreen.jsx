import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import Chip from '../components/Chip';
import { EXPLORE_ITEMS, EXPLORE_FILTERS } from './exploreItems';
import './ExploreScreen.css';

export default function ExploreScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const visible =
    filter === 'All'
      ? EXPLORE_ITEMS
      : EXPLORE_ITEMS.filter((item) => item.tag === filter);

  return (
    <ScreenLayout scroll>
      <h1 className="explore-header">Explore</h1>
      <p className="explore-subheader">Discover topics and features</p>

      <div className="explore-chip-row" role="group" aria-label="Filters">
        {EXPLORE_FILTERS.map((label) => (
          <Chip
            key={label}
            label={label}
            active={filter === label}
            onClick={() => setFilter(label)}
          />
        ))}
      </div>

      {visible.map((item) => (
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
                <span className="explore-item-tag">{item.tag}</span>
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
