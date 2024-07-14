//Navbar.tsx
//Paren:Layout.tsx

import { Link } from 'react-router-dom';
import './navbar.css';

import logo from './logo/slack-icon-svgrepo-com.svg';

import iconSearch from './icons-svg/search-svgrepo-com.svg';
import expand from './icons-svg/expand.svg';
import app from './icons-svg/app.svg';
import notification from './icons-svg/notification-svgrepo-com.svg';
import setting from './icons-svg/setting-setting-svgrepo-com.svg';
import logout from '/logout.svg';
import { useAuthData, AuthStateType } from '../../context/AuthContext';

function Navbar() {
  const {
    authState: { user}
  } = useAuthData();
  //  console.log('navbar:', user)
  return (
    <>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <span className='navbar__logo__icon'>
            <img src={logo} alt='' />
          </span>
          <span className='navbar__logo__text'>AdminBoard</span>
        </div>

        <ul className='navbar__list'>
          <li className='navbar__link'>
            <Link to='link'>
              <img className='navbar__icon' src={iconSearch} alt='' />
            </Link>
          </li>

          <li className='navbar__link'>
            <Link to='link'>
              <img className='navbar__icon' src={app} alt='' />
            </Link>
          </li>

          <li className='navbar__link'>
            <Link to='link'>
              <img className='navbar__icon' src={expand} alt='' />
            </Link>
          </li>

          <li className='navbar__link navbar__link-notification navbar__link-double'>
            <Link to='link'>
              <img
                className='navbar__icon navbar__icon-notification'
                src={notification}
                alt=''
              />

              <span className='navbar__icon icon__tooltip'>1</span>
            </Link>
          </li>

          <li className='navbar__link '>
            <Link to='link' className='navbar__link-double'>
              <img
                className='navbar__icon navbar__icon-user '
                src={user.img!}
                alt='user'
              />
              <div className='navbar__icon navbar__icon-username'>
                {user.username}
              </div>
            </Link>
          </li>

          <li className='navbar__link'>
            <Link to='link'>
              <img className='navbar__icon' src={logout} alt='' />
            </Link>
          </li>

          <li className='navbar__link'>
            <Link to='link'>
              <img className='navbar__icon' src={setting} alt='' />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
