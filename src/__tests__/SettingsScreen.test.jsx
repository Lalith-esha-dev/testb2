import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SettingsScreen from '../screens/SettingsScreen';

describe('SettingsScreen', () => {
  it('renders header, subheader and section titles', () => {
    render(<SettingsScreen />);
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Customize your experience')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Preferences' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'App Info' })
    ).toBeInTheDocument();
  });

  it('renders the three preference toggles with correct defaults', () => {
    render(<SettingsScreen />);
    const notifications = screen.getByRole('switch', { name: 'Notifications' });
    const darkMode = screen.getByRole('switch', { name: 'Dark Mode' });
    const analytics = screen.getByRole('switch', { name: 'Analytics' });

    expect(notifications).toBeChecked();
    expect(darkMode).not.toBeChecked();
    expect(analytics).not.toBeChecked();
  });

  it('toggles each preference independently', async () => {
    const user = userEvent.setup();
    render(<SettingsScreen />);
    const notifications = screen.getByRole('switch', { name: 'Notifications' });
    const darkMode = screen.getByRole('switch', { name: 'Dark Mode' });
    const analytics = screen.getByRole('switch', { name: 'Analytics' });

    await user.click(notifications);
    expect(notifications).not.toBeChecked();

    await user.click(darkMode);
    expect(darkMode).toBeChecked();

    await user.click(analytics);
    expect(analytics).toBeChecked();

    expect(notifications).not.toBeChecked();
    expect(darkMode).toBeChecked();
    expect(analytics).toBeChecked();
  });

  it('handles rapid repeated clicks on a toggle', async () => {
    const user = userEvent.setup();
    render(<SettingsScreen />);
    const darkMode = screen.getByRole('switch', { name: 'Dark Mode' });
    await user.click(darkMode);
    await user.click(darkMode);
    await user.click(darkMode);
    expect(darkMode).toBeChecked();
  });

  it('renders App Info rows with version and build', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Build')).toBeInTheDocument();
    expect(screen.getByText('Expo SDK 56')).toBeInTheDocument();
  });

  it('renders an icon for each preference row', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(screen.getByText('📈')).toBeInTheDocument();
  });

  it('styles the Build badge with the accent class', () => {
    render(<SettingsScreen />);
    const badge = screen.getByText('Expo SDK 56');
    expect(badge).toHaveClass('settings-info-badge');
    expect(badge).toHaveClass('settings-info-badge-accent');
  });
});
