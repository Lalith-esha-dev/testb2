import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppNavigator from '../navigation/AppNavigator';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppNavigator />
    </MemoryRouter>
  );
}

describe('AppNavigator', () => {
  it('renders the bottom tab bar with all tabs', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders the Home screen at /', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { name: 'Hello App' })
    ).toBeInTheDocument();
  });

  it('renders the Explore screen at /explore', () => {
    renderAt('/explore');
    expect(
      screen.getByRole('heading', { name: 'Explore' })
    ).toBeInTheDocument();
  });

  it('renders the Profile screen at /profile', () => {
    renderAt('/profile');
    expect(screen.getByText('Guest User')).toBeInTheDocument();
  });

  it('renders the Tasks screen at /tasks', () => {
    renderAt('/tasks');
    expect(
      screen.getByRole('heading', { name: 'Tasks' })
    ).toBeInTheDocument();
  });

  it('renders the Settings screen at /settings', () => {
    renderAt('/settings');
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
  });

  it('renders the Detail screen at /explore/:id', () => {
    renderAt('/explore/2');
    expect(
      screen.getByRole('heading', { name: 'UI Components' })
    ).toBeInTheDocument();
  });

  it('navigates between tabs when a tab link is clicked', async () => {
    const user = userEvent.setup();
    renderAt('/');
    expect(
      screen.getByRole('heading', { name: 'Hello App' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /settings/i }));
    expect(
      screen.getByRole('heading', { name: 'Settings' })
    ).toBeInTheDocument();
  });

  it('marks the active tab with the active class', () => {
    renderAt('/profile');
    const profileLink = screen.getByRole('link', { name: /profile/i });
    expect(profileLink).toHaveClass('tab-item-active');
  });

  it('renders an active dot indicator on the active tab only', () => {
    const { container } = renderAt('/profile');
    const profileLink = screen.getByRole('link', { name: /profile/i });
    const homeLink = screen.getByRole('link', { name: /home/i });

    const profileDot = profileLink.querySelector('.tab-dot');
    expect(profileDot).not.toBeNull();
    expect(profileDot).not.toHaveClass('tab-dot-placeholder');

    const homeDot = homeLink.querySelector('.tab-dot');
    expect(homeDot).not.toBeNull();
    expect(homeDot).toHaveClass('tab-dot-placeholder');

    expect(container.querySelectorAll('.tab-dot').length).toBe(5);
  });

  it('wraps the icon in a highlighted background on the active tab', () => {
    renderAt('/explore');
    const exploreLink = screen.getByRole('link', { name: /explore/i });
    const iconWrap = exploreLink.querySelector('.tab-icon-wrap');
    expect(iconWrap).toHaveClass('tab-icon-wrap-active');
  });
});
