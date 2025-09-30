import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './App';

test('renders autocomplete app', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  expect(screen.getByText('Autocomplete App')).toBeInTheDocument();
});
