import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from "@material-ui/core";
import LockOutlined from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState<IRegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const { firstName, lastName, email, password } = formData;

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* Form still need to be validated before uploading */}
        <form
          className={classes.form}
          noValidate
          onSubmit={event => onSubmitHandler(event)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => onChangeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
