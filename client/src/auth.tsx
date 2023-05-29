import { createContext, useReducer, FC } from "react";
import jwtDecode from "jwt-decode";
import {
  UserType,
  AuthAction,
  AuthState,
  ActionOptions,
  LoginInput,
  ContextType,
} from "./types";

const initialState: AuthState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken: any = jwtDecode(localStorage.getItem("token") as string);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<ContextType>({
  user: null,
  login: (userData: LoginInput): void => {},
  logout: (): void => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionOptions.LOGIN:
      return {
        ...state,
        user: action.payload as UserType,
      };
    case ActionOptions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: any = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: LoginInput) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: ActionOptions.LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: ActionOptions.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
