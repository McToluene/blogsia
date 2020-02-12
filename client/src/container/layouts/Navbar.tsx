import React, { Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/auth/action";
import { AuthState } from "../../store/auth/type";

interface INavProps {
  sections: any[];
  title: string;
  logout: () => void;
  auth: AuthState;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },

    toolbarTitle: {
      flex: 1
    },

    toolbarSecondary: {
      justifyContent: "space-between",
      overflowX: "auto"
    },

    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0
    },

    loginBtn: {
      marginRight: theme.spacing(1)
    }
  })
);

const Navbar: React.FC<INavProps> = props => {
  const classes = useStyles();
  const { sections, title } = props;
  const {
    auth: { loading, isAuthenticated }
  } = props;

  const authLinks = (
    <Fragment>
      <Button
        onClick={props.logout}
        variant="contained"
        color="primary"
        size="small"
      >
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <RouterLink to="/login">
        <Button
          className={classes.loginBtn}
          variant="contained"
          color="primary"
          size="small"
        >
          Login
        </Button>
      </RouterLink>
      <RouterLink to="/register">
        <Button variant="contained" color="primary" size="small">
          Sign up
        </Button>
      </RouterLink>
    </Fragment>
  );

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <RouterLink to="/">{title}</RouterLink>
          </Typography>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </Container>
    </React.Fragment>
  );
};

const mapStateProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateProps, { logout })(Navbar);
