import React from 'react';

const LoginForm = () => {
  return <div>
    <input
      type='text'
      data-testid='usernameText'
    />
    <input
      type='password'
      data-testid='passwordText'
    />
    <button
      type="submit"
      data-testid='loginButton'
    >
      Login
    </button>
  </div>;
};

export default LoginForm;
