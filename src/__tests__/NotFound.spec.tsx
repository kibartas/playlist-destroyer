import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('<NotFound />', () => {
  let screen: RenderResult;
  beforeAll(() => {
    screen = render(<NotFound />);
  });

  it('should display "Page not found" text', () => {
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
