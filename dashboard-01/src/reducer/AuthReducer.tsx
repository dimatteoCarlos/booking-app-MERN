//AuthReducer.tsx
//Parent:AuthContext.tsx

import { AuthStateType, INITIAL_AUTH_STATE } from '../context/AuthContext.tsx';

export function AuthReducer(
  state: AuthStateType,
  action: any
):
  | any
  | AuthStateType
  | {
      isLoading: boolean;
      error: null;
      user: { username: null; email: null ;img:null};
    }
  | { isLoading: boolean; error: string; user: any }
  | { isLoading: boolean; error: any; user: null } {

  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
        user: {
          username: null,
          email: null,
          img:null,
        },
       
      };

    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, error: null, user: action.payload
        .user, isAdmin:action.payload.isAdmin};

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {
          username: null,
          email: null,
          img:null
        },
      };
    case 'LOGIN_LOGOUT':
      return { ...state, INITIAL_AUTH_STATE };

    default:
      return { ...state };
  }
}

// export default AuthReducer;
