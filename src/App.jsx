import { useState } from 'react';
import './App.css';

export default function App() {
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
    <div className="safe">
      <div className="container">
        <section className="card">
          <h1 className="title">Hello App</h1>
          <p className="subtitle">A minimal React screen</p>

          {!greeted ? (
            <>
              <input
                type="text"
                className="input"
                placeholder="Enter your name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className={`button${isDisabled ? ' button-disabled' : ''}`}
                onClick={handleGreet}
                disabled={isDisabled}
              >
                <span className="button-text">Say Hello</span>
              </button>
            </>
          ) : (
            <>
              <p className="greeting">👋 Hello, {name}!</p>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleReset}
              >
                <span className="button-text button-text-secondary">
                  Start Over
                </span>
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
