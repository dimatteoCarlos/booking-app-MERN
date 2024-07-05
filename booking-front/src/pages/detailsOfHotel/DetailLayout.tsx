//DetailLayout.tsx
//Parent:DetailsOfHotel.tsx

import './detailLayout.css';

import { useState } from 'react';
import { DataOfAHotelType, PhotoUrlType } from '../../types/typesHotel.ts';
import { HotelDBInfoType } from '../../types/typesHotel.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import BookingBtn from '../../components/bookingBtn/BookingBtn';
import Slider from '../../components/slider/Slider';

import { DateRange } from 'react-date-range';

import { useNavigate } from 'react-router-dom';

//-----context------
import { useSearchData } from '../../components/context/SearchContext.tsx';
import { useAuthData } from '../../components/context/AuthContext.tsx';
import Reserve from '../../components/reserve/Reserve.tsx';

type DetailLayoutTypeProp = {
  defaultData?: DataOfAHotelType;
  defaultPhotosHotel?: PhotoUrlType[];

  data: HotelDBInfoType;
  hotelId: string;
};

const DetailLayout = ({
  hotelId,
  data,
}: // defaultData,
// defaultPhotosHotel,
DetailLayoutTypeProp): JSX.Element => {
  const {
    // _id,
    // name,
    // type,

    city,
    economicPrice,
    rate,
    rating,

    // reviews,
    // featured,
    // rooms,

    photoUrlImages,

    details: {
      title,
      address,
      priceHighlight,
      distance: { km, comment },

      detailsDescription: { recommendation, description },

      detailsPriceOfStaying: {
        commentStay,
        locationStay,

        // totPrice,
        // durationStay,
      },
    },

    // features_details: {
    //   featureTitle,
    //   featureSubTitle,
    //   features,
    //   cancelOp,
    //   cancelOpSubtitle,
    //   taxesOp,
    // },
  } = data;

  // console.log(
  //   featureTitle,
  //   featureSubTitle,
  //   features,
  //   cancelOp,
  //   cancelOpSubtitle,
  //   taxesOp
  // );

  //---text tag of booking button
  const tagBtn: string = 'Reserve or Book Now!';

  //---states----
  const [isOpenSlider, setIsOpenSlider] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isOpenReserve, setIsOpenReserve] = useState<boolean>(false);

  //------Functions-----------

  function daysBetweenDates(start: Date | undefined, end: Date | undefined) {
    const today = new Date();
    const startDate = start ? start : today,
      endDate = end ? end : today;

    const MILSECONDS_IN_DAY = 1000 * 60 * 24 * 60;

    const days =
      Math.ceil(
        Math.abs(startDate?.getTime() - endDate?.getTime()) / MILSECONDS_IN_DAY
      ) + 1;
    return days;
  }
  //------------------------------
  function wordReplacement(
    strText: string,
    wordToReplace: string,
    replacement: string
  ) {
    // console.log('🚀 ~ strText:', strText);

    const newText = strText.replace(wordToReplace, replacement);
    // console.log('🚀 ~ newText:', newText);

    return newText;
  }

  //--------------
  function severalWordReplacement(
    strText: string,
    city: string,
    rating: string,
    rate: string
  ) {
    const wordsToReplace: { [key: string]: string } = {
      CITY: city,
      RATING: rating,
      RATE: rate,
    };

    const newText = strText.replace(/CITY|RATING|RATE/gi, function (matched) {
      return wordsToReplace[matched].toLocaleUpperCase();
    });

    return newText;
  }

  //------------------
  function handleOpenSlider(indx: number): void {
    setIsOpenSlider(true);
    setSlideIndex(indx);
  }

  //-------------------
  function handleLoginReserve(user: {
    username: string | null;
    email: string | null;
  }): void {
    if (user.username) {
      setIsOpenReserve(true);
      console.log('Open Reserve modal window');
    } else {
      navigateTo('/login');
      setIsOpenReserve(false);
      console.log('Reserve Modal window close');
    }
  }

  //-----Context data-----------
  const { searchState } = useSearchData();

  const {
    authState: { user },
  } = useAuthData();

  const navigateTo = useNavigate();

  const {
    date: startEndSelectedDates,
    options: optionsReservation,
    // destination: cityDestination,
  } = searchState;

  // console.log(searchState, optionsReservation.rooms);

  //------------------------------
  const stayingDays = daysBetweenDates(
    startEndSelectedDates[0].startDate,
    startEndSelectedDates[0].endDate
  );

  const totalCost = Math.floor(
    stayingDays * economicPrice * optionsReservation.rooms
  );
  //---------------------
  return (
    <>
      <div className='layout-container'>
        {isOpenSlider && (
          <Slider
            setIsOpen={setIsOpenSlider}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
            slides={photoUrlImages!}
          />
        )}

        {!!isOpenReserve && (
          <Reserve hotelId={hotelId} setIsOpen={setIsOpenReserve} />
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

          <div className='distance'>
            {km} <span>km away from center </span>
          </div>

          <div className='priceHightligth'>{priceHighlight}</div>

          <BookingBtn onClickFn={() => handleLoginReserve(user)} tag={tagBtn} />
        </div>

        <div className='hotel-images'>
          {photoUrlImages?.map((image, indx) => (
            <img
              src={image}
              key={`photo-${indx}`}
              onClick={() => handleOpenSlider(indx)}
              alt={`photos-${image}`}
            />
          ))}
        </div>

        <div className='hotel-details-info'>
          <div className='hotel-desc'>
            <h2 className='rec'>{recommendation}</h2>
            <p className='desc'>{description}</p>
          </div>

          <div className='hotel-price'>
            <h2 className='comment'>
              {wordReplacement(
                commentStay,
                '${NUMBER-night}',
                `${stayingDays}-night`
              )}
            </h2>

            <h2 className='comment location__comment'>{comment}</h2>
            <p className='location'>
              {severalWordReplacement(
                locationStay,
                city,
                rating,
                rate.toString()
              )}
            </p>

            <div className='price-days'>
              <span className='price'>{`$${totalCost.toFixed(2)}`}</span>
              <span className='stay-duration'>{`(${stayingDays} ${
                stayingDays > 1 ? 'nights' : 'night'
              })`}</span>
            </div>

            <BookingBtn
              onClickFn={() => handleLoginReserve(user)}
              tag={tagBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLayout;
