import uuid from "uuid";
import { Dispatch, AnyAction } from "redux";
import { SET_ALERT, REMOVE_ALERT } from "./type";

export const setAlert = (
  message: string,
  alertType: "success" | "error" | "info" | "warning",
  open: boolean
) => (dispatch: Dispatch<AnyAction>) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id, open }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 6000);
};
