import React, { Fragment, FC } from "react";
import { connect } from "react-redux";
import { Alert } from "../../store/alert/type";
import CustomAlert from "./CustomAlert";

interface IProps {
  alerts: [Alert];
}

const CustomSnackbar: FC<IProps> = props => {
  const { alerts } = props;
  return (
    <Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => <CustomAlert key={alert.id} alert={alert} />)}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  alerts: state.alert.alert
});

export default connect(mapStateToProps)(CustomSnackbar);
