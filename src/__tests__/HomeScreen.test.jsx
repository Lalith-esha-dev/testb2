import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen />);
    expect(screen.getByRole('heading', { name: 'Hello App' })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your name...')
    ).toBeInTheDocument();
  });

  it('keeps the Say Hello button disabled when input is empty or whitespace', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    const button = screen.getByRole('button', { name: /say hello/i });
    expect(button).toBeDisabled();

    await user.type(screen.getByPlaceholderText('Enter your name...'), '   ');
    expect(button).toBeDisabled();
  });

  it('greets the user when a name is entered and the button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    await user.type(
      screen.getByPlaceholderText('Enter your name...'),
      'Alice'
    );
    const button = screen.getByRole('button', { name: /say hello/i });
    expect(button).toBeEnabled();
    await user.click(button);

    expect(screen.getByText('👋 Hello, Alice!')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start over/i })
    ).toBeInTheDocument();
  });

  it('greets when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter your name...');
    await user.type(input, 'Bob{Enter}');
    expect(screen.getByText('👋 Hello, Bob!')).toBeInTheDocument();
  });

  it('resets the form when Start Over is clicked', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    await user.type(
      screen.getByPlaceholderText('Enter your name...'),
      'Carol'
    );
    await user.click(screen.getByRole('button', { name: /say hello/i }));
    await user.click(screen.getByRole('button', { name: /start over/i }));

    const inputAfter = screen.getByPlaceholderText('Enter your name...');
    expect(inputAfter).toHaveValue('');
    expect(
      screen.getByRole('button', { name: /say hello/i })
    ).toBeDisabled();
  });

  it('handles a long name without breaking', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    const longName = 'A'.repeat(120);
    await user.type(screen.getByPlaceholderText('Enter your name...'), longName);
    await user.click(screen.getByRole('button', { name: /say hello/i }));
    expect(screen.getByText(`👋 Hello, ${longName}!`)).toBeInTheDocument();
  });

  it('keeps the greeting visible after rapid repeated clicks on Say Hello', async () => {
    const user = userEvent.setup();
    render(<HomeScreen />);
    const input = screen.getByPlaceholderText('Enter your name...');
    await user.type(input, 'Dan');
    const button = screen.getByRole('button', { name: /say hello/i });
    await user.click(button);
    expect(screen.getByText('👋 Hello, Dan!')).toBeInTheDocument();

    const startOver = screen.getByRole('button', { name: /start over/i });
    fireEvent.click(startOver);
    fireEvent.click(startOver);
    fireEvent.click(startOver);
    expect(
      screen.getByPlaceholderText('Enter your name...')
    ).toHaveValue('');
  });
});
