import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { afterEach, test, vi } from 'vitest';
import App from './App';
import Reducer from './Components/Reducer';

afterEach(() => {
  vi.restoreAllMocks();
});

const renderApp = () => {
  const store = createStore(Reducer);

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('renders quiz settings', () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ trivia_categories: [] }),
  });

  renderApp();

  expect(screen.getByRole('heading', { name: /quiz app/i })).toBeInTheDocument();
});
