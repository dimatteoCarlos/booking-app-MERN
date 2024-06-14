//register.tsx
//Parent:

import { useState } from 'react';
import { useAuthData } from '../../components/context/AuthContext';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

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

function Register() {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE);

  const { authState, authDispatch } = useAuthData();

  const { loading, error, user } = authState;

  console.log('from authState:', { loading, error, user });

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function registerHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    authDispatch({ type: 'REGISTER_START' });

    try {
      //await request to post  '/api/auth/register'credentials at the route '/auth/register
      //first a register? evaluate this

      // const response = await axios.get(`${baseURL}/api/auth/register`, {params:{credentials}});

      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        credentials
      );

      console.log('resp:', response.data);

      const {
        details: {username}, details: {email},
      } = response.data;

      authDispatch({ type: 'REGISTER_SUCCESS', payload: {username, email} });

      navigateTo('/', { state: { info: response.data.details } });

    } catch (error: any) {
      authDispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
    }
  }

  console.log(user);

  return (
    <>
      <div className='register__modal'>
        <div className='register__modal__container'>
          <input
            type='text'
            placeholder='username'
            id='username'
            name='username'
            onChange={inputHandler}
            className='register__input--username register__input'
          />

          <input
            type='email'
            placeholder='email'
            id='email'
            name='email'
            onChange={inputHandler}
            className='register__input--email register__input'
          />

          <input
            type='password'
            placeholder='password'
            id='password'
            name='password'
            onChange={inputHandler}
            className='register__input--password register__input'
          />

          <button
            onClick={registerHandler}
            disabled={loading}
            // className='register__modal--btn'
            className='booking-btn '
          >
            register
          </button>

          {error && <span className='error__msg'>{error.message}</span>}
        </div>
      </div>
    </>
  );
}

export default register;
