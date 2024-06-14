import './navbar.css';

import flag from '../../assets/images/Us3x.png';
import Support from '../../svg-components/Support';
import { Link, NavLink } from 'react-router-dom';
import { useAuthData } from '../context/AuthContext';

function Navbar(): JSX.Element {
  const { authState, authDispatch } = useAuthData();

  const { user } = authState;

  return (
    <>
      <div className='navbar'>
        <div className='navbar-container'>
          <Link to='/'>
            <span className='logo'>Bookingapp</span>
          </Link>
          <div className='nav-items'>
            <button className='currency'>USD</button>
            <button className='flag'>
              <img src={flag} alt='flag' />
            </button>

            <button className='support'>
              <span className='svg'>
                <Support />
              </span>
            </button>

            <button className='property'>List your property</button>

            {!!user.username ? (
              user.username
            ) : (
              <>
                <button className='nav-button'>
                  <Link to='/register'>
                    <span>Register</span>
                  </Link>
                </button>
                <button className='nav-button'>
                  <Link to='/login'>
                    <span>Login</span>
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

//
