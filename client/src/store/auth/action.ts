import axios from "axios";
import { Dispatch } from "redux";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from "./type";
import { setAlert } from "../alert/action";
import { IUser } from "../../models/User";
import setAuthToken from "../../utils/setAuthToken";

const BASE_URL = "http://localhost:5000";

export const  loadUser = () => async (dispatch: Dispatch) => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(BASE_URL + "/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}


export const registerUser = (user: IUser) => async (
  dispatch: Dispatch<any>
) => {
  const config = {
    headers: {
      "Context-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(BASE_URL + "/api/users", user, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error: any) =>
        dispatch(setAlert(error.msg, "error", true))
      );
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
