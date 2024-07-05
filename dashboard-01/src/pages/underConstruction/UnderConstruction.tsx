// UnderConstruction.tsx
import { Link } from 'react-router-dom';
import './underConstruction.css';
const UnderConstruction = () => {
  return (
    <>
      <section className='showcase__container'>
        <Link to='/'>Go back to homepage</Link>
      </section>
    </>
  );
};

export default UnderConstruction;
