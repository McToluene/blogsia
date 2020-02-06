import uuid from "uuid";
import { Dispatch } from "redux";
import { SET_ALERT } from "./type";

export const setAlert = (message: string, alertType: string) => (
  dispatch: Dispatch
) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id }
  });
};
