//Parent:Home.tsx

import './topBox.css';

import { topDealUsersTypeData } from '../../types/types.ts';

type TopBoxTypeProp = {
  data: topDealUsersTypeData[];
  gridTitle: string;
};

const TopBox = ({ data, gridTitle }: TopBoxTypeProp): JSX.Element => {
  return (
    <>
      <article className='topBox__container'>
        <div className='topBox__title'>{gridTitle}</div>
        {data.map((item) => {
          const { id, img, username, email, amount } = item;

          return (
            <div className='topBox__userItem' key={id}>
              <div className='topBox__user'>
                <div className='topBox__img'>
                  <img src={img} alt='user_img' />
                </div>

                <div className='topBox__userInfo'>
                  <span className='topBox__username'>{username}</span>
                  <span className='topBox__userEmail'>{email}</span>
                </div>
              </div>
              <div className='topBox__amount'>$ {amount}</div>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default TopBox;
