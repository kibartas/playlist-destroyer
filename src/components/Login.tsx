import React, { useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { AxiosResponse } from "axios";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import login from "../utils/login";

type LoginError =
  | "Invalid credentials"
  | "Network error"
  | "Server error. Try again later"
  | "An error occurred"
  | "";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    bottom: "20vh",
  },
  textField: {
    "::after": {
      borderBottom: "2px solid #28D761",
    },
  },
  inputField: {
    color: theme.palette.info.light,
  },
  button: {
    alignSelf: "center",
  },
  errorText: {
    height: "30px",
    fontSize: "30px",
    color: theme.palette.error.main,
    alignSelf: "center",
  },
  inputLabel: {
    color: theme.palette.info.main,
  },
}));

const Login: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginError>("");

  const navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const { data } = await login({ username, password });
      setLoginError("");
      // TODO: Implement this fully
      if (!data?.username) {
        setLoginError("Server error. Try again later");
        return;
      }
      await navigate(`/${data.username}`);
    } catch (e) {
      const { response }: { response: AxiosResponse | undefined } = e;
      if (response === undefined) {
        setLoginError("Network error");
        return;
      }
      const { status }: { status: number } = response;
      if (status === 500) {
        setLoginError("Server error. Try again later");
      } else if (status === 422) {
        setLoginError("Invalid credentials");
      } else {
        setLoginError("An error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login">
      <Grid
        container
        direction="column"
        spacing={2}
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid className={classes.errorText} item>
          <Typography data-cy="errorMessage">{loginError}</Typography>
        </Grid>
        <Grid item>
          <TextField
            className={classes.textField}
            id="loginUsernameField"
            required
            type="text"
            label="Username"
            placeholder="e.g. JohnLukeThe3rd"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
            inputProps={{
              "data-cy": "usernameText",
              className: classes.inputField,
            }}
            InputLabelProps={{
              className: classes.inputLabel,
            }}
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
            InputLabelProps={{
              className: classes.inputLabel,
            }}
            inputProps={{
              className: classes.inputField,
              "data-cy": "passwordText",
            }}
          />
        </Grid>
        <Grid item className={classes.button}>
          <Button type="submit" data-cy="loginButton" variant="contained">
            <Typography>Login</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
