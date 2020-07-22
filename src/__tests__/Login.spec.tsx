import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Login from '../components/Login';

describe('<Login />', () => {
  it('renders Login component', () => {
    render(<Login/>);
  });
});
