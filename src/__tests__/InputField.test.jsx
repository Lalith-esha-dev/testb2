import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../components/InputField';

function Harness({ initial = '', onSubmit, icon, placeholder = 'Type...' }) {
  const [value, setValue] = useState(initial);
  return (
    <InputField
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      icon={icon}
      onSubmit={onSubmit}
    />
  );
}

describe('InputField', () => {
  it('renders the placeholder', () => {
    render(<Harness placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(<Harness icon="✏️" />);
    expect(screen.getByText('✏️')).toBeInTheDocument();
  });

  it('does not render an icon when none is provided', () => {
    const { container } = render(<Harness />);
    expect(container.querySelector('.input-field-icon')).toBeNull();
  });

  it('updates value as the user types', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText('Type...');
    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('toggles focused class on focus and blur', async () => {
    const user = userEvent.setup();
    const { container } = render(<Harness />);
    const wrap = container.querySelector('.input-field-wrap');
    const input = screen.getByPlaceholderText('Type...');

    expect(wrap).not.toHaveClass('input-field-wrap-focused');
    await user.click(input);
    expect(wrap).toHaveClass('input-field-wrap-focused');
    await user.tab();
    expect(wrap).not.toHaveClass('input-field-wrap-focused');
  });

  it('calls onSubmit when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText('Type...');
    await user.type(input, 'hi{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('does not call onSubmit on other keys', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText('Type...');
    await user.type(input, 'abc');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('handles a long input value', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText('Type...');
    const long = 'A'.repeat(200);
    await user.type(input, long);
    expect(input).toHaveValue(long);
  });

  it('handles empty Enter without throwing when no onSubmit is provided', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText('Type...');
    await user.type(input, '{Enter}');
    expect(input).toHaveValue('');
  });
});
