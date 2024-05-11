import './detailLayout.css';

import { useState } from 'react';
import { DataOfAHotelType, PhotoUrlType } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import BookingBtn from '../../components/bookingBtn/BookingBtn';
import Slider from '../../components/slider/Slider';

type DetailLayoutTypeProp = {
  data: DataOfAHotelType;
  photosHotel: PhotoUrlType[];
};

const DetailLayout = ({
  photosHotel,
  data,
}: DetailLayoutTypeProp): JSX.Element => {
  
  const {
    title,
    address,
    distance,
    priceHighlight,
    detailsDescription: { recommendation: rec, description: desc },

    detailsPriceOfStaying: {
      commentStay: comment,
      locationStay: loc,
      price,
      durationStay,
    },
  } = data;

  //---text tag of booking button
  const tagBtn: string = 'Reserve or Book Now!';

  //---states----
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  //-------------------
  function handleOpenModal(indx: number): void {
    setIsOpenModal(true);
    setSlideIndex(indx);
  }

  //-------------------

  return (
    <>
      <div className='layout-container'>
        {isOpenModal && (
          <Slider
            setIsOpen={setIsOpenModal}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
            slides={photosHotel}
          />
        )}

        <div className='hotel-header'>
          <h1 className='title'>{title}</h1>

          <div className='address'>
            {
              <FontAwesomeIcon
                icon={faLocationDot}
                color={'#0071c2'}
                className='icon-loc'
              />
            }

            <div>{address}</div>
          </div>

          <div className='distance'>{distance}</div>
          <div className='priceHightligth'>{priceHighlight}</div>

          <BookingBtn tag={tagBtn} />
        </div>

        <div className='hotel-images'>
          {photosHotel.map((image, indx) => (
            <img
              src={image.imgUrl}
              key={`photo-${indx}`}
              onClick={() => handleOpenModal(indx)}
            />
          ))}
        </div>

        <div className='hotel-details-info'>
          <div className='hotel-desc'>
            <h2 className='rec'>{rec}</h2>
            <p className='desc'>{desc}</p>
          </div>
          <div className='hotel-price'>
            <h2 className='comment'>{comment}</h2>
            <p className='location'>{loc}</p>
            <div className='price-days'>
              <span className='price'>{price}</span>
              <span className='stay-duration'>{durationStay}</span>
            </div>
            <BookingBtn tag={tagBtn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLayout;
