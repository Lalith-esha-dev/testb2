import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TasksScreen from '../screens/TasksScreen';

describe('TasksScreen', () => {
  it('renders the header and subheader with initial completion count', () => {
    render(<TasksScreen />);
    expect(
      screen.getByRole('heading', { name: 'Tasks' })
    ).toBeInTheDocument();
    expect(screen.getByText('1 of 4 completed')).toBeInTheDocument();
  });

  it('renders all initial tasks as buttons with correct labels', () => {
    render(<TasksScreen />);
    expect(
      screen.getByRole('button', { name: 'Review app screens' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try the Explore tab' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Update profile info' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Check activity feed' })
    ).toBeInTheDocument();
  });

  it('marks the initially-done task as pressed and others as not pressed', () => {
    render(<TasksScreen />);
    expect(
      screen.getByRole('button', { name: 'Review app screens' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: 'Try the Explore tab' })
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles a task from not done to done and updates the count', async () => {
    const user = userEvent.setup();
    render(<TasksScreen />);
    const task = screen.getByRole('button', { name: 'Try the Explore tab' });
    expect(task).toHaveAttribute('aria-pressed', 'false');

    await user.click(task);

    expect(task).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('2 of 4 completed')).toBeInTheDocument();
  });

  it('toggles a task from done to not done and updates the count', async () => {
    const user = userEvent.setup();
    render(<TasksScreen />);
    const task = screen.getByRole('button', { name: 'Review app screens' });
    expect(task).toHaveAttribute('aria-pressed', 'true');

    await user.click(task);

    expect(task).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('0 of 4 completed')).toBeInTheDocument();
  });

  it('only toggles the task that was clicked', async () => {
    const user = userEvent.setup();
    render(<TasksScreen />);
    const second = screen.getByRole('button', { name: 'Try the Explore tab' });
    const third = screen.getByRole('button', { name: 'Update profile info' });

    await user.click(second);

    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(third).toHaveAttribute('aria-pressed', 'false');
  });

  it('handles rapid repeated clicks on the same task', async () => {
    const user = userEvent.setup();
    render(<TasksScreen />);
    const task = screen.getByRole('button', { name: 'Update profile info' });

    await user.click(task);
    await user.click(task);
    await user.click(task);

    expect(task).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('2 of 4 completed')).toBeInTheDocument();
  });

  it('reaches all tasks completed when every task is toggled on', async () => {
    const user = userEvent.setup();
    render(<TasksScreen />);
    await user.click(screen.getByRole('button', { name: 'Try the Explore tab' }));
    await user.click(screen.getByRole('button', { name: 'Update profile info' }));
    await user.click(screen.getByRole('button', { name: 'Check activity feed' }));

    expect(screen.getByText('4 of 4 completed')).toBeInTheDocument();
  });
});
