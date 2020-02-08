export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: AuthState;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload: AuthState;
}

interface UserLoadedAction {
  type: typeof USER_LOADED,
  payload: AuthState
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR,
  payload: AuthState;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  payload: AuthState
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL,
  payload: AuthState
}

export type AuthActionTypes = RegisterSuccessAction | RegisterFailAction | UserLoadedAction | AuthErrorAction | LoginSuccessAction | LoginFailAction;
