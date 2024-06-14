//Reserve.tsx
//Parent:DetailLayout.sx
//Reserv.tsx
//Parent: Details

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import useFetch from '../../components/hooks/useFetch.tsx';

import axios from 'axios';

import { useSearchData } from '../../components/context/SearchContext.tsx';

import { useNavigate } from 'react-router-dom';

import './reserve.css';

import { useState } from 'react';

import BookingBtn from '../bookingBtn/BookingBtn.tsx';

type ReservePropType = {
  hotelId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Reserve({ hotelId, setIsOpen }: ReservePropType) {
  const navigateTo = useNavigate();

  /*states*/
  const [selectedRooms, setSelectedRooms] = useState<[]>([]);

  /**************/
  const { searchState } = useSearchData();

  const baseURL = 'http://localhost:8800';

  const url = `/api/hotels/room/${hotelId}`;

//get rooms data from hotel db
  const { fetchState } = useFetch(`${baseURL}${url}`);

  const { data, error, isLoading } = fetchState;

  const {
    // destination,
    date: dates,
    // options
  } = searchState;


  const start = dates[0] ? dates[0].startDate : new Date();
  const end = dates[0] ? dates[0].endDate : new Date();

  /*Functions */
  //daysInRangeDate: to getDatesInRange
  //it gets the dates and delivers each day date between the selected start and end dates. Every day date is in locale? format.

  function daysInRangeDates(
    startDate: Date | undefined,
    endDate: Date | undefined
  ) {
    let start = startDate ?? new Date(),
      end = endDate ?? new Date();

    const MilSecInDay = 24 * 60 * 60 * 1000;
    const len =
      Math.floor(Math.abs(end!.getTime() - start!.getTime()) / MilSecInDay) + 1;

    console.log({ len });

    const selectedDates = Array.from({ length: len }, (_, i) => {
      const date = new Date(start);
      return new Date(date.setDate(start!.getDate() + i));
    });
    return selectedDates;
  }

  const selectedDates = daysInRangeDates(start, end);
  console.log('🚀 ~ Reserve ~ selectedDates:', selectedDates);

  //isRoomAvailable: para el arreglo roomNumber o hab, determina si la fecha se encuentra dentro de las ya seleccionadas.

  /*rooms from database: 
_id:, title:, price:, maxPeople:, desc:, 
roomNumbers: {number:Number, unavailableDates:{_id:ObjectId, number:string[]}}[]
  */

  //roomNumber.unavailableDates
  //

  function handleReserveClosing() {
    setIsOpen(false);
  }

  return (
    <>
      <div className='rooms__reserve'>
        <div className='reserve__container'>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className='close-btn'
            onClick={handleReserveClosing}
          />

          <span className='reserve__title'>Select your rooms:</span>
          {/* data.map() */}

          <div className='reserve__item' key={'_id'}>
            <div className='reserv__item__info'>
              <div className='reserve__item__info--title'>{'title'}</div>
              <div className='reserve__item__info--description'>
                {'description'}
              </div>
              <div className='reserve__item__info--maxPeople'>
                Max people: <b>{'maxPeople'}</b>
              </div>

              <div className='reserve__item__info--price'>{'price'}</div>
            </div>

            <div className='reserve__item--selectRooms'>
              {/* roomNumbers.map(roomNumber) */}
              <div className='reserve__selectRooms__roomForm'>
                <label htmlFor=''>{'number'}</label>
                <input
                  type='checkbox'
                  id='_id'
                  className='roomNumber'
                  // onChange={handleSelect}
                  // disabled={!isAvailable(roomNumber)}
                />
              </div>
            </div>
          </div>

          {/* <BookingBtn tag='Reserve Now' onClickFn={handleClick} /> */}
        </div>
      </div>
    </>
  );
}

export default Reserve;
