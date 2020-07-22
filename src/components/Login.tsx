import React from 'react';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <label data-testid="errorLabel">
        {errorMessage}
      </label>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            data-testid="usernameText"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            data-testid="passwordText"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" data-testid="loginButton" value="Login"/>
      </form>
    </div>
  );
};

export default LoginForm;
