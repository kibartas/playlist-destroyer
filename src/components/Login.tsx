import React, { useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import login from '../utils/login';

type FieldError = 'Required field' | '';
type LoginError =
  | 'Invalid credentials'
  | 'Network error'
  | 'Server error. Try again later'
  | 'An error occurred'
  | '';

const Login = (): React.ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<FieldError>('');
  const [passwordError, setPasswordError] = useState<FieldError>('');
  const [loginError, setLoginError] = useState<LoginError>('');
  const inputEl = useRef<HTMLInputElement>(null);

  const history = useHistory();

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (username.length === 0 || password.length === 0) {
      if (username.length === 0) {
        setUsernameError('Required field');
      }
      if (password.length === 0) {
        setPasswordError('Required field');
      }
      return;
    }
    try {
      const { data } = await login({ username, password });
      setLoginError('');
      // TODO: Implement this fully
      if (!data?.username) {
        setLoginError('Server error. Try again later');
        return;
      }
      history.push(`/${data.username}`);
    } catch (e) {
      const { response }: { response: AxiosResponse | undefined } = e;
      if (response === undefined) {
        setLoginError('Network error');
        return;
      }
      const { status }: { status: number } = response;
      if (status === 500) {
        setLoginError('Server error. Try again later');
      } else if (status === 422) {
        setLoginError('Invalid credentials');
      } else {
        setLoginError('An error occurred');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="loginForm">
        <span data-testid="errorMessage">{loginError}</span>
        <label data-testid="usernameLabel" htmlFor="loginUsernameField">
          {usernameError}
          <br />
          BAbUsername:
          <input
            id="loginUsernameField"
            required
            type="text"
            data-testid="usernameText"
            placeholder="e.g. JohnLukeThe3rd"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            ref={inputEl}
          />
        </label>
        <label data-testid="passwordLabel" htmlFor="loginPasswordField">
          {passwordError}
          <br />
          Password:
          <input
            id="loginPasswordField"
            required
            type="password"
            data-testid="passwordText"
            placeholder="e.g. ••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" data-testid="loginButton" value="Login" />
      </form>
    </div>
  );
};

export default Login;
