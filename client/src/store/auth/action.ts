import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./type";
import { setAlert } from "../alert/action";
import { IUser } from "../../models/User";

const BASE_URL = "http://localhost:5000";

export const registerUser = (user: IUser) => async (
  dispatch: Dispatch<any>
) => {
  const config = {
    headers: {
      "Context-Type": "application/json"
    }
  };
  const { name, email, password } = user;
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response?.data.errors;
    console.log(error.message);
    if (errors) {
      errors.forEach((error: any) =>
        dispatch(setAlert(error.message, "error", true))
      );
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
