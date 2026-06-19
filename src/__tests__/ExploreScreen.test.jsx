import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExploreScreen from '../screens/ExploreScreen';
import { EXPLORE_ITEMS } from '../screens/exploreItems';

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/explore']}>
      <Routes>
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/explore/:id" element={<div>detail page {':id'}</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ExploreScreen', () => {
  it('renders the header and subheader', () => {
    renderWithRouter();
    expect(
      screen.getByRole('heading', { name: 'Explore' })
    ).toBeInTheDocument();
    expect(screen.getByText('Discover topics and features')).toBeInTheDocument();
  });

  it('renders a button for every explore item', () => {
    renderWithRouter();
    EXPLORE_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
    expect(screen.getAllByRole('button')).toHaveLength(EXPLORE_ITEMS.length);
  });

  it('navigates to the detail route when an item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<ExploreScreen />} />
          <Route
            path="/explore/:id"
            element={<div data-testid="detail">on detail</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: /Getting Started/i })
    );
    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  it('ignores rapid repeated clicks (still navigates only once)', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/explore']}>
        <Routes>
          <Route path="/explore" element={<ExploreScreen />} />
          <Route
            path="/explore/:id"
            element={<div data-testid="detail">on detail</div>}
          />
        </Routes>
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /Navigation/i });
    await user.click(button);
    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });
});
