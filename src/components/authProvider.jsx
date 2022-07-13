import { createContext, useContext, useReducer } from "react";
import * as actions from "./authActionType";

const AuthContext = createContext();
const useAuthProvider = () => useContext(AuthContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case actions.loginStatus:
      return {
        ...state,
        isLogin: action.payload,
      };
    case actions.signupStatus:
      return {
        ...state,
        isSignup: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  isLogin: false,
  isSignup: false,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthProvider, AuthProvider };
