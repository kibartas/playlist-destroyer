import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';

describe('<Login />', () => {
  let screen: RenderResult;
  beforeEach(() => {
    screen = render(<Login />);
  });
  afterEach(cleanup);

  describe('typing user info', () => {
    it('shows username and password', async () => {
      expect(screen.queryByDisplayValue('JohnLukeThe3rd')).toBeNull();
      await userEvent.type(
        screen.getByTestId('usernameText'),
        'JohnLukeThe3rd',
      );
      await userEvent.type(screen.getByTestId('passwordText'), 'Password123');
      expect(screen.queryByDisplayValue('JohnLukeThe3rd')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('Password123')).toBeInTheDocument();
    });
  });

  describe('username field', () => {
    it('gets focused on component mount', () => {
      expect(screen.getByTestId('usernameText')).toEqual(document.activeElement);
    });
  });

  describe('submit handler', () => {
    let loginButton: HTMLElement;
    let submitHandler: jest.Mock;
    let form: HTMLElement;

    beforeEach(() => {
      loginButton = screen.getByText(/login/i);
      submitHandler = jest.fn((e) => e.preventDefault());
      form = screen.getByTestId(/loginForm/i);
      form.onsubmit = submitHandler;
    });

    it('should display error if fields or a field is empty', () => {
      userEvent.click(loginButton);
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId(/usernameLabel/i)).toHaveTextContent(
        'Required field',
      );
      expect(screen.getByTestId(/passwordLabel/i)).toHaveTextContent(
        'Required field',
      );
    });
    it('executes if fields non-empty', async () => {
      expect(submitHandler).not.toHaveBeenCalled();
      await userEvent.type(
        screen.getByTestId('usernameText'),
        'JohnLukeThe3rd',
      );
      await userEvent.type(screen.getByTestId('passwordText'), 'Password123');
      userEvent.click(loginButton);
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(submitHandler).toHaveReturnedWith(undefined);
    });
  });
});
