//Title.tsx
import './title.css';
import { headerTitleType } from '../../../types/types';
import SignInBtn from '../../signInBtn/SignInBtn';

const Title = ({ title, description }: headerTitleType) => {
  return (
    <>
      <h1 className='title-text'>{title}</h1>
      <p className='description-text'>{description}</p>

      <SignInBtn />
    </>
  );
};

export default Title;
