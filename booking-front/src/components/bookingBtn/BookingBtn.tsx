//BookingBtn.tsx
//Parent:DetailLayout.tsx,  Reserve.tsx,

import './bookingBtn.css';
type BookingBtnTypeProp = {
  tag: string;
  onClickFn: ()=>void;

};
const BookingBtn = ({
  tag, 
  onClickFn,
}: BookingBtnTypeProp): JSX.Element => {

  function clickHandler() {
    console.log('me apretaste');
    //  onClickFn && onClickFn(true);
    onClickFn();
    
  }

  return (
    <button onClick={clickHandler} className='booking-btn'>
      {tag}
    </button>
  );
};

export default BookingBtn;
