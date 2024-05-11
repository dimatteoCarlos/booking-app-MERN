import './bookingBtn.css';
type BookingBtnTypeProp = { tag: string };
const BookingBtn = ({ tag }: BookingBtnTypeProp): JSX.Element => {
  return <button className='booking-btn'>{tag}</button>;
};

export default BookingBtn;
