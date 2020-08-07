import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { UserHome } from '../pages';

describe('<UserHome/>', () => {
  let screen: RenderResult;
  beforeAll(() => {
    screen = render(<UserHome />);
  });
  it('should display an h1 element', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
