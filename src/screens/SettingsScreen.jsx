import { useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import './SettingsScreen.css';

function SettingRow({ label, description, value, onValueChange }) {
  return (
    <div className="settings-row">
      <div className="settings-row-text">
        <p className="settings-row-label">{label}</p>
        {description ? (
          <p className="settings-row-description">{description}</p>
        ) : null}
      </div>
      <label className="settings-switch">
        <input
          type="checkbox"
          role="switch"
          aria-label={label}
          checked={value}
          onChange={(event) => onValueChange(event.target.checked)}
        />
        <span className="settings-switch-track" aria-hidden="true">
          <span className="settings-switch-thumb" />
        </span>
      </label>
    </div>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  return (
    <ScreenLayout scroll>
      <h1 className="settings-header">Settings</h1>
      <p className="settings-subheader">Customize your experience</p>

      <h2 className="settings-section-title">Preferences</h2>
      <Card className="settings-card">
        <SettingRow
          label="Notifications"
          description="Receive alerts and updates"
          value={notifications}
          onValueChange={setNotifications}
        />
        <div className="settings-divider" />
        <SettingRow
          label="Dark Mode"
          description="Switch to a dark theme"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <div className="settings-divider" />
        <SettingRow
          label="Analytics"
          description="Help improve the app"
          value={analytics}
          onValueChange={setAnalytics}
        />
      </Card>

      <h2 className="settings-section-title">App Info</h2>
      <Card>
        <div className="settings-info-row">
          <p className="settings-info-label">Version</p>
          <p className="settings-info-value">1.0.0</p>
        </div>
        <div className="settings-divider" />
        <div className="settings-info-row">
          <p className="settings-info-label">Build</p>
          <p className="settings-info-value">Expo SDK 56</p>
        </div>
      </Card>
    </ScreenLayout>
  );
}
