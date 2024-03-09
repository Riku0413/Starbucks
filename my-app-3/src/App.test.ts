import { render, screen } from '@testing-library/react';
// @ts-expect-error TS(2307): Cannot find module './App' or its corresponding ty... Remove this comment to see the full error message
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
