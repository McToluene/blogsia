import { AuthState, AuthActionTypes } from "../auth/type";
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action: AuthActionTypes) {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      const token: any = payload.token;
      localStorage.setItem("token", token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
}
