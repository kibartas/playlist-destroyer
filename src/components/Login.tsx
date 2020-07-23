import React, { useEffect, useRef, useState } from 'react';

type Error = 'Required field' | '';

const Login = (): React.ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<Error>('');
  const [passwordError, setPasswordError] = useState<Error>('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="loginForm">
        <label data-testid="usernameLabel" htmlFor="loginUsernameField">
          {usernameError}
          <br />
          Username:
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
        <input type="submit" data-testid="loginButton" value="Login" />
      </form>
    </div>
  );
};

export default Login;
