//Login.tsx
//Parent:useRouter.tsx

import { useState } from 'react';
import { useAuthData } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { BASE_URL } from '../../constants/constants';

// const INITIAL_CREDENTIALS_STATE: {
//   username: string | undefined;
//   email: string | undefined;
//   password: string | undefined;
//   isAdmin?:boolean | undefined;
// } = {
//   username: undefined,
//   email: undefined,
//   password: undefined,
//   isAdmin:undefined
// };

const INITIAL_CREDENTIALS_STATE: {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
} = {
  username: 'Elva_McDonald',
  email: 'elva@gmail.com',
  password: 'password',
};

function LoginAdmin() {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE);

  const { authState, authDispatch } = useAuthData();

  const { isLoading, error, user} = authState;

  // console.log(
  //   'from authState:',
  //   { isLoading, error, user },
  //   'el resto:',
  //   restAuthState
  // );

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function loginHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    authDispatch({ type: 'LOGIN_START' });
  

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {withCredentials: true});

      // console.log('resp:', response.data);

      const {
        userAuthInfo: { username },
        userAuthInfo: { email },
        userAuthInfo: { img },
        userAuthInfo: { _id: userId },
        isAdmin,
        role, //to crosscheck
      } = response.data;

      console.log(username, email, img, isAdmin, role, userId);

      if (isAdmin) {
        // if (user) {
        authDispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: { username, email, img }, isAdmin, userId },
          // payload: response.data.userAuthInfo
        });
        // authDispatch({ type: 'LOGIN_SUCCESS', payload: { username, email } });

        navigateTo('/', { state: { info: response.data.userAuthInfo } });
      } else {
        authDispatch({
          type: 'LOGIN_FAILURE',
          payload: { message: `Sorry! The role of "${role}" has no clearance` },
        });
      }
    } catch (error: any) {
      console.log(error);
      authDispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  }

  //create a reusable custom Form Component: for login and register
  //apply input debounce

  return (
    <>
      <div className='login__modal'>
        <div className='login__modal__container'>
          <input
            type='text'
            placeholder='username'
            id='username'
            name='username'
            onChange={inputHandler}
            className='login__input--username login__input'
            required
          />

          <input
            type='email'
            placeholder='email'
            id='email'
            name='email'
            onChange={inputHandler}
            className='login__input--email login__input'
            required
          />

          <input
            type='password'
            placeholder='password'
            id='password'
            name='password'
            onChange={inputHandler}
            className='login__input--password login__input'
            required
          />

          <button
            onClick={loginHandler}
            disabled={isLoading}
            className='login__modal--btn'
          >
            Login
          </button>

          {error && <span className='error__msg'>{error.message}</span>}
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
