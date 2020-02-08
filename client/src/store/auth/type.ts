export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

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
  payload?: any;
}

export type AuthActionTypes = RegisterSuccessAction | RegisterFailAction;
