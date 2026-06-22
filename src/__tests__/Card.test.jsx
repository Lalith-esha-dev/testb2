import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>card content</p>
      </Card>
    );
    expect(screen.getByText('card content')).toBeInTheDocument();
  });

  it('applies the base card class', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('card');
  });

  it('appends a custom className', () => {
    const { container } = render(<Card className="extra">x</Card>);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('extra');
  });

  it('forwards inline style', () => {
    const { container } = render(<Card style={{ marginTop: 10 }}>x</Card>);
    expect(container.firstChild).toHaveStyle({ marginTop: '10px' });
  });

  it('adds the accent class when accent prop is true', () => {
    const { container } = render(<Card accent>x</Card>);
    expect(container.firstChild).toHaveClass('card-accent');
  });

  it('adds the primary tint class when tint="primary"', () => {
    const { container } = render(<Card tint="primary">x</Card>);
    expect(container.firstChild).toHaveClass('card-tint-primary');
    expect(container.firstChild).not.toHaveClass('card-tint-accent');
  });

  it('adds the accent tint class when tint="accent"', () => {
    const { container } = render(<Card tint="accent">x</Card>);
    expect(container.firstChild).toHaveClass('card-tint-accent');
    expect(container.firstChild).not.toHaveClass('card-tint-primary');
  });

  it('does not add tint classes when tint is unknown', () => {
    const { container } = render(<Card tint="bogus">x</Card>);
    expect(container.firstChild).not.toHaveClass('card-tint-primary');
    expect(container.firstChild).not.toHaveClass('card-tint-accent');
  });

  it('adds the elevated class when elevated prop is true', () => {
    const { container } = render(<Card elevated>x</Card>);
    expect(container.firstChild).toHaveClass('card-elevated');
  });

  it('does not add the elevated class by default', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).not.toHaveClass('card-elevated');
  });

  it('can combine elevated with tint and accent', () => {
    const { container } = render(
      <Card elevated accent tint="primary">
        x
      </Card>
    );
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('card-elevated');
    expect(container.firstChild).toHaveClass('card-accent');
    expect(container.firstChild).toHaveClass('card-tint-primary');
  });
});
