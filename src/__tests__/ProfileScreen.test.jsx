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
      { label: 'Streak', value: '5 days' },
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
});
