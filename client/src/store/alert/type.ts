enum AlertType {
  success,
  error
}

export interface Alert {
  id: string;
  message: string;
  alertType: AlertType;
}

export interface AlertState {
  alert: Alert[];
}

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: Alert;
}

interface RemoveAlertAction {
  type: typeof REMOVE_ALERT;
  payload: string;
}
export type AlertActionTypes = SetAlertAction | RemoveAlertAction;
