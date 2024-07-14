//AuthContext.tsx
//Parent:

import { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthReducer } from '../reducer/AuthReducer.tsx';
// import { BASE_URL } from '../constants/constants.ts';
// import axios from 'axios';

export type AuthStateType = {
  isLoading: boolean;
  error: any;
  user: {
    username: string | null;
    email: string | null;
    img?:string | null;
  };

  isAdmin?: boolean;
};

function getLsUser(key: string = 'userInfo'): AuthStateType['user'] {
  const userInfo = localStorage.getItem(key);
  if (!userInfo) {
    return {
      username: null,
      email: null,
      img:null,

    };
  } else {
    return JSON.parse(userInfo);
  }
}

//crear un use middleware para consultar si el usuario autorizado
//es admin.  el controlador middleware seria un get, basado en el username del usuario loggeado, sin necesidad de realizar verficacion. al obtener el isAdmin, e incluirlo en el authContextData, para su disposicion global.

export const INITIAL_AUTH_STATE: AuthStateType = {
  isLoading: false,
  error: null,
  user: getLsUser('userInfo'),
};

//incluir autenticacion aqui tambien

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
