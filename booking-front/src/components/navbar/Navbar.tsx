import './navbar.css';

import flag from '../../assets/images/Us3x.png';
import Support from '../../svg-components/Support';
import { Link } from 'react-router-dom';

function Navbar(): JSX.Element {
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

            <button className='nav-button'>
              <span>Register</span>
            </button>
            <button className='nav-button'>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

//
