//Title.tsx
import './title.css';
// import { headerTitleType } from '../../../types/typesHotel';
import SignInBtn from '../../signInBtn/SignInBtn';

type TitlePropType = {
  title: string;
  description: string;
  username: string | null;
};
const Title = ({ title, description, username }: TitlePropType) => {
  return (
    <>
      <h1 className='title-text'>{title}</h1>
      <p className='description-text'>{description}</p>
      {/* {username ? <p>{username}</p>  : <SignInBtn />} */}
      {!username && <SignInBtn />}
    </>
  );
};

export default Title;
