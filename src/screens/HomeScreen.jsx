import { useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import Chip from '../components/Chip';
import InputField from '../components/InputField';
import './HomeScreen.css';

const QUICK_ACTIONS = ['Say Hi', 'Explore', 'Tasks'];

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [greeted, setGreeted] = useState(false);

  const handleGreet = () => {
    if (name.trim()) setGreeted(true);
  };

  const handleReset = () => {
    setName('');
    setGreeted(false);
  };

  const isDisabled = !name.trim();

  return (
    <ScreenLayout>
      <div className="home-flex">
        <h1 className="home-title">Hello App</h1>
        <p className="home-subtitle">A minimal React Native screen</p>

        <div className="home-chip-row">
          {QUICK_ACTIONS.map((action, i) => (
            <Chip key={action} label={action} active={i === 0} />
          ))}
        </div>

        <Card accent className="home-card">
          {!greeted ? (
            <>
              <InputField
                icon="✏️"
                placeholder="Enter your name..."
                value={name}
                onChange={setName}
                onSubmit={handleGreet}
              />
              <button
                type="button"
                className={`home-button${isDisabled ? ' home-button-disabled' : ''}`}
                onClick={handleGreet}
                disabled={isDisabled}
              >
                <span className="home-button-text">Say Hello</span>
              </button>
            </>
          ) : (
            <>
              <div className="home-greeting-wrap">
                <div className="home-greeting-circle">
                  <span className="home-greeting-emoji" aria-hidden="true">
                    👋
                  </span>
                </div>
                <p className="home-greeting">Hello, {name}!</p>
                <p className="home-greeting-sub">Great to see you here.</p>
              </div>
              <button
                type="button"
                className="home-button home-button-secondary"
                onClick={handleReset}
              >
                <span className="home-button-text home-button-text-secondary">
                  Start Over
                </span>
              </button>
            </>
          )}
        </Card>

        <Card tint="accent" className="home-tip-card">
          <p className="home-tip-title">💡 Tip</p>
          <p className="home-tip-text">
            Use the tab bar below to jump between screens anytime.
          </p>
        </Card>
      </div>
    </ScreenLayout>
  );
}
