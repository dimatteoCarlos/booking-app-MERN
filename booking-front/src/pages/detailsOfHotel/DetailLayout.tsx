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

//-----context------

import { useSearchData } from '../../components/context/SearchContext.tsx';

import { DateRange } from 'react-date-range';
//-----context------

type DetailLayoutTypeProp = {
  defaultData?: DataOfAHotelType;
  defaultPhotosHotel?: PhotoUrlType[];

  data: HotelDBInfoType;
  // error: any;
  // isLoading: boolean;
};

const DetailLayout = ({
  data,
  defaultData,
  defaultPhotosHotel,
}: DetailLayoutTypeProp): JSX.Element => {
  const {
    _id,
    name,
    type,
    city,

    economicPrice,
    rate,
    rating,
    reviews,
    featured,
    rooms,
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
        totPrice,
        durationStay,
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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  //------Functions-------------

  function daysBetweenDates(start: Date | undefined, end: Date | undefined) {
    const today = new Date();
    const startDate = start ? start : today,
      endDate = end ? end : today;

    const milSecondsInDay = 1000 * 60 * 24 * 60;

    const days =
      Math.ceil(
        Math.abs(startDate?.getTime() - endDate?.getTime()) / milSecondsInDay
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
  function handleOpenModal(indx: number): void {
    setIsOpenModal(true);
    setSlideIndex(indx);
  }

  //------useContext----------------
  const { searchDispatch, searchState } = useSearchData();
  const {
    date: selectedDates,
    options: optionsReservation,
    destination: cityDestination,
  } = searchState;

  console.log(searchState, optionsReservation.rooms);

  //------------------------------
  const stayingDays = daysBetweenDates(
    selectedDates[0].startDate,
    selectedDates[0].endDate
  );

  const totalCost = Math.floor(
    stayingDays * economicPrice * optionsReservation.rooms
  );
  //---------------------
  return (
    <>
      <div className='layout-container'>
        {isOpenModal && (
          <Slider
            setIsOpen={setIsOpenModal}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
            slides={photoUrlImages!}
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

          <div className='distance'>
            {km} <span>km away from center </span>
          </div>
          <div className='priceHightligth'>{priceHighlight}</div>

          <BookingBtn tag={tagBtn} />
        </div>

        <div className='hotel-images'>
          {photoUrlImages?.map((image, indx) => (
            <img
              src={image}
              key={`photo-${indx}`}
              onClick={() => handleOpenModal(indx)}
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

            <BookingBtn tag={tagBtn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLayout;
