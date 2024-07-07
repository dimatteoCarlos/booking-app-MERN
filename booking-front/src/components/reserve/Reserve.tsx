//Reserve.tsx
//Parent:DetailLayout.tsx
import './reserve.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import useFetch from '../../hooks/useFetch.tsx';

import { useSearchData } from '../../components/context/SearchContext.tsx';

import './reserve.css';

import { useState } from 'react';

import { RoomInfoDBType } from '../../types/typesRoom.ts';

import BookingBtn from '../bookingBtn/BookingBtn.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type ReservePropType = {
  hotelId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Reserve({ hotelId, setIsOpen }: ReservePropType) {
  /*states*/
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  /**************/
  const navigateTo = useNavigate();
  const { searchState } = useSearchData();

  //get rooms data from hotel db
  const baseURL = 'http://localhost:8800';

  const url = `/api/hotels/room/${hotelId}`;

  const { fetchState } = useFetch<RoomInfoDBType[]>(`${baseURL}${url}`);

  const { data } = fetchState;

  // console.log({ data });

  //-------Get Selected Dates in Range-----
  const {
    date: dates,
    // destination,
    // options
  } = searchState;
  //-------------------------
  const start = dates[0] ? dates[0].startDate : new Date();
  const end = dates[0] ? dates[0].endDate : new Date();

  function daysInRangeDates(
    startDate: Date | undefined,
    endDate: Date | undefined
  ) {
    let start = startDate ?? new Date(),
      end = endDate ?? new Date();

    const MilSecInDay = 24 * 60 * 60 * 1000;
    const len =
      Math.floor(Math.abs(end!.getTime() - start!.getTime()) / MilSecInDay) + 1;

    // console.log({ len });

    const selectedDatesInRange = Array.from({ length: len }, (_, i) => {
      const date = new Date(start);
      return new Date(date.setDate(start!.getDate() + i));
    });

    return selectedDatesInRange;
  }

  const selectedDatesInRange: Date[] = daysInRangeDates(start, end);

  //----------------------

  //isRoomAvailable: a roomNumber is hab number. This function determnines if selected dates are available for this selected room.

  function isRoomAvailable(roomNumber: {
    _id: string;
    number: number;
    unavailableDates: Date[];
  }) {
    const { unavailableDates, number } = roomNumber;

    // console.log(
    //   'hotelId',
    //   hotelId,
    //   'room:',
    //   number,
    //   'id:',
    //   id,
    //   'no disp:',
    //   unavailableDates,
    //   selectedDatesInRange
    // );

    // The Date.parse() static method parses a string representation of a date, and returns the date's timestamp.

    // The toDateString() method of Date instances returns a string representing the date portion of this date interpreted in the local timezone.

    //convert dates to timestamp

    const selectedDates = selectedDatesInRange.map((d) =>
      Date.parse(d.toDateString())
    );

    const unavailableDate = unavailableDates.map((d) =>
      Date.parse(new Date(d).toDateString())
    );

    const isDateFound = selectedDates.some((date) =>
      unavailableDate.includes(date)
    );

    console.log(
      `Room: ${number} is ${!isDateFound ? 'available' : 'not available'}`
    );

    return !isDateFound;
  }

  /*rooms schema from database: 
    _id:, title:, price:, maxPeople:, desc:, 
    roomNumbers: {number:Number, unavailableDates:Date[], _id:ObjectId}[]
  */
  //roomNumber.unavailableDates

  function handleReserveClosing() {
    setIsOpen(false);
  }

  function handleRoomSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const isRoomSelected = e.target.checked;
    const selectedRoomId = e.target.value;

    setSelectedRooms(
      ((selectedRooms) => {
        if (isRoomSelected) {
          return [...selectedRooms, selectedRoomId];
        } else {
          return selectedRooms.filter((room) => room !== selectedRoomId);
        }
      })(selectedRooms)
    );
  }

  //-------------------------------------
  async function handleRoomBooking() {
    // console.log('room booking', { selectedRooms }, { selectedDatesInRange });

    const route = `/api/rooms/availability/`;

    //api/rooms/availability/:roomId

    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          // console.log(`url: ${baseURL}${route}${roomId}`);

          const res: any = await axios.put(`${baseURL}${route}${roomId}`, {
            dates: selectedDatesInRange,
          });

          // console.log(`RoomId: ${roomId} data: ${res.data}`);

          return res.data; //just in case
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Reserve modal closed');
      setIsOpen(false);
      navigateTo('/');
    }
  }
  /******************************/
  return (
    <div className='rooms__reserve'>
      <div className='reserve__container'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='close-btn'
          onClick={handleReserveClosing}
        />
        <span className='reserve__title'>Select your rooms:</span>

        {!!data ? (
          data!.map((datum, indx) =>
            !!datum ? (
              <div className='reserve__item' key={indx}>
                <div className='reserv__item__info'>
                  <div className='reserve__item__info--title'>
                    {datum.title} {datum._id}
                  </div>
                  <div className='reserve__item__info--description'>
                    {datum.desc}
                  </div>
                  <div className='reserve__item__info--maxPeople'>
                    Max people: <b>{datum.maxPeople}</b>
                  </div>

                  <div className='reserve__item__info--price'>
                    Price per night: $ {datum.price}
                  </div>
                </div>

                <div className='reserve__item--selectRooms'>
                  {datum.roomNumbers.map((roomNumber, i) => (
                    <div
                      className='reserve__selectRooms__roomForm'
                      key={`roomForm-${i}`}
                    >
                      <label htmlFor=''>{roomNumber.number}</label>
                      <input
                        type='checkbox'
                        id={roomNumber._id}
                        className='roomNumber'
                        value={`${datum._id}_${roomNumber._id}`}
                        onChange={handleRoomSelection}
                        disabled={!isRoomAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='error__message' key={`null-${indx}`}>
                {'Room info not Available'}
              </div>
            )
          )
        ) : (
          <div className='error__message'>'Data not Found'</div>
        )}

        {data && (
          <div className='reserve__item--booking-btn'>
            <BookingBtn onClickFn={handleRoomBooking} tag={'Book Now'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Reserve;
