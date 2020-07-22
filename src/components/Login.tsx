import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="loginForm">
        <label>
          Username:
          <input
            required
            type="text"
            data-testid="usernameText"
            placeholder="e.g. JohnLukeThe3rd"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
          />
        </label>
        <label>
          Password:
          <input
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
