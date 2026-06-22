import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Chip from '../components/Chip';

describe('Chip', () => {
  it('renders the label', () => {
    render(<Chip label="Hello" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument();
  });

  it('applies the active class when active is true', () => {
    render(<Chip label="Active" active onClick={() => {}} />);
    const btn = screen.getByRole('button', { name: 'Active' });
    expect(btn).toHaveClass('chip-active');
  });

  it('does not apply the active class by default', () => {
    render(<Chip label="Idle" onClick={() => {}} />);
    const btn = screen.getByRole('button', { name: 'Idle' });
    expect(btn).not.toHaveClass('chip-active');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="Tap" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Tap' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when no onClick is provided', () => {
    render(<Chip label="Disabled" />);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('handles rapid repeated clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip label="Click" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: 'Click' });
    await user.click(btn);
    await user.click(btn);
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
