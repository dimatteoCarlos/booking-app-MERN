import './detailsOfHotel.css';

import { photosHotel } from './photosHotel';
import { dataOfAHotel } from './dataOfAHotel';

import Header from '../../components/header/Header';
import DetailLayout from './DetailLayout';
import FooterList from '../../components/footerList/FooterList';
import EmailSignup from '../../components/emailSignup/EmailSignup';
// import { HotelDBInfoType } from '../../types/types.ts';
import { useLocation } from 'react-router-dom';

const DetailsOfHotel = () => {

  const location = useLocation()
  console.log(location)
  // const hotelId = location.pathname.split('/')[2]


  //----------------
  // let url = `http://localhost:8800/api/hotels/find/${hotelId}`;

  // const {
  //   fetchState: { data, isLoading, error },
  //   reFetch,
  // } = useFetch<HotelDBInfoType[]>(url);

  // console.log(data, isLoading, error);


  return (
    <>
      <Header modeType={'list'} />
      <div className='details-container'>
        <DetailLayout data={dataOfAHotel} datadb={data} isLoading={isLoading} error={error} photosHotel={photosHotel} />
      </div>
      <EmailSignup />
      <FooterList />
    </>
  );
};

export default DetailsOfHotel;
