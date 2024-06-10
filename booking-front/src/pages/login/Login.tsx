//Login.tsx
//Parent:

import { useState } from 'react';
import { useAuthData } from '../../components/context/AuthContext';

import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const INITIAL_CREDENTIALS_STATE = {
  username: undefined,
  email: undefined,
  password: undefined,
};

function Login() {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE);

  const { authState, authDispatch } = useAuthData();

  const { loading, error, user } = authState;
  console.log({ loading, error, user });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function loginHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    authDispatch({ type: 'LOGIN_START' });

    const url = 'http://localhost:8800/api/auth/login';

    try {
      //await request to post  '/api/auth/login'credentials at the route '/auth/login
      //first a register?evaluate this

      const response = await axios.post(`${url}login`, credentials);

      console.log("🚀 ~ Login ~ response:", response)
      
      authDispatch({ type: 'LOGIN_SUCCESS', payload: response.data.details });
      navigateTo('/', { state: { info: response.data.details } });

      console.log(user);
    } catch (error: any) {
      authDispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  }

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
            className='login__modal--btn'
          >
            Login
          </button>

          {error && <span className='error__msg'>{error}</span>}
        </div>
      </div>
    </>
  );
}

export default Login;
