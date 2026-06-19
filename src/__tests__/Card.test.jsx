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
});
