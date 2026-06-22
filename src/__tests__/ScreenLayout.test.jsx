import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScreenLayout from '../components/ScreenLayout';

describe('ScreenLayout', () => {
  it('renders children inside the screen container', () => {
    render(
      <ScreenLayout>
        <p>hello layout</p>
      </ScreenLayout>
    );
    expect(screen.getByText('hello layout')).toBeInTheDocument();
  });

  it('uses the non-scroll class by default', () => {
    const { container } = render(
      <ScreenLayout>
        <span>x</span>
      </ScreenLayout>
    );
    const root = container.firstChild;
    expect(root).toHaveClass('screen');
    expect(root).not.toHaveClass('screen-scroll');
  });

  it('adds the scroll class when scroll prop is true', () => {
    const { container } = render(
      <ScreenLayout scroll>
        <span>x</span>
      </ScreenLayout>
    );
    expect(container.firstChild).toHaveClass('screen-scroll');
  });

  it('renders the decorative top stripe and shape elements', () => {
    const { container } = render(
      <ScreenLayout>
        <span>x</span>
      </ScreenLayout>
    );
    expect(container.querySelector('.screen-top-stripe')).not.toBeNull();
    expect(container.querySelector('.screen-decor-large')).not.toBeNull();
    expect(container.querySelector('.screen-decor-small')).not.toBeNull();
  });
});
