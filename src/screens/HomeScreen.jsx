import { useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import './HomeScreen.css';

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleGreet();
    }
  };

  const isDisabled = !name.trim();

  return (
    <ScreenLayout>
      <div className="home-flex">
        <Card className="home-card">
          <h1 className="home-title">Hello App</h1>
          <p className="home-subtitle">A minimal React Native screen</p>

          {!greeted ? (
            <>
              <input
                type="text"
                className="home-input"
                placeholder="Enter your name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={handleKeyDown}
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
              <p className="home-greeting">👋 Hello, {name}!</p>
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
      </div>
    </ScreenLayout>
  );
}
