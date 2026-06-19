import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import DetailScreen from '../screens/DetailScreen';
import { EXPLORE_ITEMS } from '../screens/exploreItems';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={['/explore', path]} initialIndex={1}>
      <Routes>
        <Route
          path="/explore"
          element={
            <div>
              <p data-testid="explore-list">explore list</p>
              <Link to="/explore/1">go</Link>
            </div>
          }
        />
        <Route path="/explore/:id" element={<DetailScreen />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetailScreen', () => {
  it('renders the matched explore item', () => {
    const item = EXPLORE_ITEMS[0];
    renderAt(`/explore/${item.id}`);
    expect(
      screen.getByRole('heading', { name: item.title })
    ).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });

  it('renders a Go Back button', () => {
    renderAt(`/explore/${EXPLORE_ITEMS[0].id}`);
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('navigates back when Go Back is clicked', async () => {
    const user = userEvent.setup();
    renderAt(`/explore/${EXPLORE_ITEMS[1].id}`);
    await user.click(screen.getByRole('button', { name: /go back/i }));
    expect(screen.getByTestId('explore-list')).toBeInTheDocument();
  });

  it('renders a Not Found state for an unknown id', () => {
    renderAt('/explore/9999');
    expect(
      screen.getByRole('heading', { name: /not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });
});
