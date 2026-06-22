import { useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import Card from '../components/Card';
import './SettingsScreen.css';

const SETTINGS = [
  {
    key: 'notifications',
    icon: '🔔',
    label: 'Notifications',
    description: 'Receive alerts and updates',
  },
  {
    key: 'darkMode',
    icon: '🌙',
    label: 'Dark Mode',
    description: 'Switch to a dark theme',
  },
  {
    key: 'analytics',
    icon: '📈',
    label: 'Analytics',
    description: 'Help improve the app',
  },
];

function SettingRow({ icon, label, description, value, onValueChange }) {
  return (
    <div className="settings-row">
      <div className="settings-icon-circle" aria-hidden="true">
        <span className="settings-icon">{icon}</span>
      </div>
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
  const [values, setValues] = useState({
    notifications: true,
    darkMode: false,
    analytics: false,
  });

  const toggle = (key) => {
    setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScreenLayout scroll>
      <h1 className="settings-header">Settings</h1>
      <p className="settings-subheader">Customize your experience</p>

      <h2 className="settings-section-title">Preferences</h2>
      <Card className="settings-card">
        {SETTINGS.map((setting, index) => (
          <div key={setting.key}>
            <SettingRow
              icon={setting.icon}
              label={setting.label}
              description={setting.description}
              value={values[setting.key]}
              onValueChange={() => toggle(setting.key)}
            />
            {index < SETTINGS.length - 1 ? (
              <div className="settings-divider" />
            ) : null}
          </div>
        ))}
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
          <span className="settings-info-badge settings-info-badge-accent">
            Expo SDK 56
          </span>
        </div>
      </Card>
    </ScreenLayout>
  );
}
