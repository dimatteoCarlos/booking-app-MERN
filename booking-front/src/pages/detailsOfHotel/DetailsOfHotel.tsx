//DetailsOfHotel.tsx
//Parent: App.tsx

import './detailsOfHotel.css';

import { photosHotel } from './photosHotel';
import { dataOfAHotel } from './dataOfAHotel';

import Header from '../../components/header/Header';
import DetailLayout from './DetailLayout';
import FooterList from '../../components/footerList/FooterList';
import EmailSignup from '../../components/emailSignup/EmailSignup';
import { HotelDBInfoType } from '../../types/typesHotel.ts';
import { useLocation } from 'react-router-dom';
import useFetch from '../../components/hooks/useFetch.tsx';

const DetailsOfHotel = () => {
  const location= useLocation();

  const hotelId = location.pathname.split('/')[2];

  //----------------
  let url = `http://localhost:8800/api/hotels/find/${hotelId}`;

  const {
    fetchState: { data, isLoading, error },
    // reFetch,
  } = useFetch<HotelDBInfoType>(url);

  return (
    <>
      <Header modeType={'list'} />
      <div className='details-container'>
        {error && 'Something went wrong, please try again'}
        {isLoading && 'Loading...please wait!'}

        {data && (
          <DetailLayout
            data={data}
            defaultData={dataOfAHotel}
            defaultPhotosHotel={photosHotel}
            hotelId={hotelId}

          />
        )}
      </div>
      <EmailSignup />
      <FooterList />
    </>
  );
};

export default DetailsOfHotel;
