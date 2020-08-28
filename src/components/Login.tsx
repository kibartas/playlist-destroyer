import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import login from '../utils/login';

type LoginError =
  | 'Invalid credentials'
  | 'Network error'
  | 'Server error. Try again later'
  | 'An error occurred'
  | '';

const useStyles = makeStyles({
  root: {
    border: 'solid 5px black',
  },
  textField: {
    backgroundColor: 'white',
  },
  form: {
    border: 'solid 2px orange',
  },
  button: {
    alignSelf: 'center',
  },
  errorText: {
    height: '30px',
    fontSize: '30px',
    color: 'red',
    alignSelf: 'center',
  },
});

const Login = (): React.ReactElement => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<LoginError>('');

  const history = useHistory();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
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
    <Container className={classes.root} maxWidth="xl">
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        data-testid="loginForm"
      >
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid className={classes.errorText} item>
            <Typography data-testid="errorMessage">{loginError}</Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.textField}
              id="loginUsernameField"
              required
              type="text"
              label="Username"
              data-testid="usernameText"
              placeholder="e.g. JohnLukeThe3rd"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.textField}
              id="loginPasswordField"
              required
              label="Password"
              type="password"
              data-testid="passwordText"
              placeholder="e.g. ••••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item className={classes.button}>
            <Button type="submit" data-testid="loginButton" variant="contained">
              <Typography>Login</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
