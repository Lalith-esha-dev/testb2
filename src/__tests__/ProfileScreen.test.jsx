import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen', () => {
  it('renders the user identity', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Guest User')).toBeInTheDocument();
    expect(screen.getByText('guest@helloapp.dev')).toBeInTheDocument();
    expect(screen.getByText('LK')).toBeInTheDocument();
  });

  it('renders all stats with their values and labels', () => {
    render(<ProfileScreen />);
    const expected = [
      { label: 'Sessions', value: '12' },
      { label: 'Tasks Done', value: '48' },
      { label: 'Streak', value: '5d' },
    ];
    for (const stat of expected) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it('renders the Your Stats and About section headings', () => {
    render(<ProfileScreen />);
    expect(
      screen.getByRole('heading', { name: 'Your Stats' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders the About body text', () => {
    render(<ProfileScreen />);
    expect(
      screen.getByText(/multiple UI sections can live on one tab/i)
    ).toBeInTheDocument();
  });

  it('renders an emoji for each stat card', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders the decorative banner above the profile card', () => {
    const { container } = render(<ProfileScreen />);
    expect(container.querySelector('.profile-banner')).not.toBeNull();
    expect(container.querySelector('.profile-banner-pattern')).not.toBeNull();
  });

  it('renders the accent overlay on the banner', () => {
    const { container } = render(<ProfileScreen />);
    expect(container.querySelector('.profile-banner-accent')).not.toBeNull();
  });

  it('renders the profile card with the elevated class', () => {
    const { container } = render(<ProfileScreen />);
    const profileCard = container.querySelector('.profile-card');
    expect(profileCard).not.toBeNull();
    expect(profileCard).toHaveClass('card-elevated');
  });

  it('applies the primary tint class to each stat card', () => {
    const { container } = render(<ProfileScreen />);
    const tinted = container.querySelectorAll('.profile-stat-card.card-tint-primary');
    expect(tinted.length).toBe(3);
  });
});
