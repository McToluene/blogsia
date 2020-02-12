import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core";
import { Alert as IAlert } from "../../store/alert/type";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

interface IAlertProps {
  alert: IAlert;
}

const CustomAlert: React.FC<IAlertProps> = props => {
  const classes = useStyles();
  const { alert } = props;
  const [open, setOpen] = useState(alert.open);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        key={alert.id}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.alertType}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomAlert;
