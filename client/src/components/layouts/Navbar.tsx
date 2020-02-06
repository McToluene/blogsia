import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Container, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

interface INavProps {
  sections: any[];
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
}));

const Navbar: React.FC<INavProps> = props => {
  const classes = useStyles();
  const { sections, title } = props;

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

          <RouterLink to="/login">
            <Button
              className={classes.loginBtn}
              variant="outlined"
              color="primary"
              size="small"
            >
              <ExitToAppIcon />
              Login
            </Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button variant="outlined" color="primary" size="small">
              Sign up
            </Button>
          </RouterLink>
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

export default Navbar;
