import { Link } from 'react-router-dom';
import './animated404page.css';
import imageError1 from './1.png';

const Animated404Page = () => {
  return (
    <>
      <div className='container404'>
        <img className='image404' src={imageError1} alt='' />
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <span className='Link404'>
          <Link to='/' className='Link404'>
            Go back to homepage
          </Link>
        </span>
      </div>
    </>
  );
};

export default Animated404Page;
