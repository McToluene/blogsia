import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../store/alert/action";
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link
} from "@material-ui/core";

import LockOutlined from "@material-ui/icons/LockOutlined";
import "./Login.css";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(8)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface ILoginProps {
  setAlert: (message: string, alertType: string) => void;
}

const Login: FC<ILoginProps> = props => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.length < 3) {
      props.setAlert("Email length is small", "danger");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Grid item xs={12} sm={6}>
          <a href="/api/auth/google" className="button">
            <div>
              <span className="svgIcon t-popup-svg">
                <svg
                  className="svgIcon-use"
                  width="25"
                  height="37"
                  viewBox="0 0 25 25"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
              </span>
              <span className="button-label">Sign in with Google</span>
            </div>
          </a>
        </Grid>

        <Typography component="span" variant="h6">
          Or
        </Typography>

        <form
          className={classes.form}
          noValidate
          onSubmit={event => onSubmitHandler(event)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => onChangeHandler(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { setAlert })(Login);
