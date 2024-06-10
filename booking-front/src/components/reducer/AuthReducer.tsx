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
      loading: boolean;
      error: null;
      user: { username: null; email: null };
    }
  | { loading: boolean; error: string; user: any }
  | { loading: boolean; error: any; user: null } {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
        user: {
          username: null,
          email: null,
        },
      };

    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, error: null, user: action.payload };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: {
          username: null,
          email: null,
        },
      };
    case 'LOGIN_LOGOUT':
      return { ...state, INITIAL_AUTH_STATE };
    // return { ...state, loading: false, error: null, user: {username: null, email: null,}, };

    default:
      return { ...state };
  }
}

// export default AuthReducer;
