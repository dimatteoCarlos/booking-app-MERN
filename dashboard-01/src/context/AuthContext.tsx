//AuthContext.tsx
//Parent:

import { createContext, useContext, useEffect, useReducer } from 'react';

import { AuthReducer } from '../reducer/AuthReducer.tsx';

export type AuthStateType = {
  loading: boolean;
  error: any;
  user: {
    username: string | null;
    email: string | null;
  };
};

function getLsUser(key: string = 'userInfo'): AuthStateType['user'] {
  const userInfo = localStorage.getItem(key);
  if (!userInfo) {
    return {
      username: null,
      email: null,
    };
  } else {
    return JSON.parse(userInfo);
  }
}

export const INITIAL_AUTH_STATE: AuthStateType = {
  loading: false,
  error: null,
  user: getLsUser('userInfo'),
};

type AuthProviderPropType = {
  children: React.ReactNode;
};

const AuthContext = createContext<{
  authState: AuthStateType;
  authDispatch: React.Dispatch<any>;
}>({ authState: INITIAL_AUTH_STATE, authDispatch: () => null });

function AuthContextProvider({ children }: AuthProviderPropType) {
  const [authState, authDispatch] = useReducer(AuthReducer, INITIAL_AUTH_STATE);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(authState.user));
  }, [authState.user]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthData = () => useContext(AuthContext);

export default AuthContextProvider;
export { AuthContext, useAuthData };
