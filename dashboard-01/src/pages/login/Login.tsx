//Login.tsx
//Parent:

import { useState } from 'react';
import { useAuthData } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const baseURL = 'http://localhost:8800';

const INITIAL_CREDENTIALS_STATE: {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
} = {
  username: undefined,
  email: undefined,
  password: undefined,
};

// const INITIAL_CREDENTIALS_STATE:{  username: string |undefined,
//   email: string |undefined,
//   password: string |undefined,} = {
//   username: "Elva_McDonald",
//   email: "elva@gmail.com",
//   password: "'password'+i",
//   }

function Login() {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE);

  const { authState, authDispatch } = useAuthData();

  const { loading, error, user } = authState;

  // console.log('from authState:', { loading, error, user });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function loginHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    authDispatch({ type: 'LOGIN_START' });

    try {

      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        credentials
      );

      console.log('resp:', response.data);

      const {
        details: {username}, details: {email},
      } = response.data;

      authDispatch({ type: 'LOGIN_SUCCESS', payload: {username, email} });

      navigateTo('/', { state: { info: response.data.details } });

    } catch (error: any) {
      authDispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  }

  console.log(user);

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
          />

          <input
            type='email'
            placeholder='email'
            id='email'
            name='email'
            onChange={inputHandler}
            className='login__input--email login__input'
          />

          <input
            type='password'
            placeholder='password'
            id='password'
            name='password'
            onChange={inputHandler}
            className='login__input--password login__input'
          />

          <button
            onClick={loginHandler}
            disabled={loading}
            className='booking-btn'
          >
            Login
          </button>

          {error && <span className='error__msg'>{error.message}</span>}
        </div>
      </div>
    </>
  );
}

export default Login;
