import React from 'react';
import { render, RenderResult, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import login from '../utils/login';
import Login from '../components/Login';
import { LoginType } from '../types/Login';

jest.mock('../utils/login');
const loginMock = login as jest.Mock;

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

const status500 = {
  status: 500,
  statusText: 'Server error. Try again later',
};

const status422 = {
  status: 422,
  statusText: 'Invalid credentials',
};

const status400 = {
  status: 400,
  statusText: 'An error occurred',
};

const status200 = {
  data: { role: 'user' },
  status: 200,
  statusText: '',
};

const userData: LoginType = {
  username: 'JohnLukeThe3rd',
  password: 'Password123',
};

describe('<Login />', () => {
  let screen: RenderResult;
  beforeEach(() => {
    screen = render(<Login />);
  });

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
      expect(screen.getByTestId('usernameText')).toEqual(
        document.activeElement,
      );
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
        userData.username,
      );
      await userEvent.type(
        screen.getByTestId('passwordText'),
        userData.password,
      );
      await act(async () => userEvent.click(loginButton));
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(submitHandler).toHaveReturnedWith(undefined);
    });
  });

  describe('login error label', () => {
    beforeEach(async () => {
      await userEvent.type(
        screen.getByTestId('usernameText'),
        userData.username,
      );
      await userEvent.type(
        screen.getByTestId('passwordText'),
        userData.password,
      );
    });

    it('should show "An error occurred" if api call returns 400', async () => {
      loginMock.mockRejectedValueOnce({ response: status400 });
      expect(screen.queryByText(status400.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(screen.getByText(status400.statusText)).toBeInTheDocument();
    });

    it('should show "Invalid credentials" if api call returns 422', async () => {
      loginMock.mockRejectedValueOnce({ response: status422 });
      expect(screen.queryByText(status422.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(screen.getByText(status422.statusText)).toBeInTheDocument();
    });

    it('should show "Server error. Try again later" if api call returns 500', async () => {
      loginMock.mockRejectedValueOnce({ response: status500 });
      expect(screen.queryByText(status500.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(screen.getByText(status500.statusText)).toBeInTheDocument();
    });

    it('should show "Network error" if api call returns undefined', async () => {
      loginMock.mockRejectedValueOnce({ response: undefined });
      expect(screen.queryByText('Network error')).not.toBeInTheDocument();
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    it('should show "Server error. Try again later" if api response does not include username', async () => {
      loginMock.mockResolvedValueOnce(status200);
      expect(screen.queryByText(status500.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(screen.getByText(status500.statusText)).toBeInTheDocument();
    });

    it('should redirect on successful login', async () => {
      const correctResponse = {
        ...status200,
        data: { username: userData.username, role: 'user' },
      };
      loginMock.mockResolvedValueOnce(correctResponse);
      await act(async () => userEvent.click(screen.getByTestId('loginButton')));
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith(
        `/${correctResponse.data.username}`,
      );
    });
  });
});
