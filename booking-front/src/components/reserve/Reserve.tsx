//Reserve.tsx
//Parent:DetailLayout.tsx
import './reserve.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCircleXmark,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';

import useFetch from '../../components/hooks/useFetch.tsx';

import { useSearchData } from '../../components/context/SearchContext.tsx';

import './reserve.css';

import { useState } from 'react';

import { RoomInfoDBType } from '../../types/typesRoom.ts';

import BookingBtn from '../bookingBtn/BookingBtn.tsx';
import axios from 'axios';

type ReservePropType = {
  hotelId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Reserve({ hotelId, setIsOpen }: ReservePropType) {
  /*states*/
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  /**************/
  const { searchState } = useSearchData();

  //get rooms data from hotel db
  const baseURL = 'http://localhost:8800';

  const url = `/api/hotels/room/${hotelId}`;

  const { fetchState } = useFetch<RoomInfoDBType[]>(`${baseURL}${url}`);

  const { data, error, isLoading } = fetchState;
  // console.log({ data });

  //-------Get Selected Dates in Range-----
  const {
    date: dates,
    // destination,
    // options
  } = searchState;

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

  // console.log('🚀 ~ Reserve ~ selectedDatesInRange:', selectedDatesInRange);

  //----------------------

  //isRoomAvailable: para un roomNumber o hab, determina si la fecha en el arreglo unavailable se encuentra dentro de las ya seleccionadas
  // const selectedDatesInRange = [
  //   '2024-06-29T18:18:37.897Z',
  //   '2024-06-30T18:18:37.897Z',
  //   '2024-07-01T18:18:37.897Z',
  //   '2024-07-02T18:18:37.897Z',
  //   '2024-07-03T18:18:37.897Z',
  //   '2024-07-04T18:18:37.897Z',
  //   '2024-07-05T18:18:37.897Z',
  //   '2024-07-06T18:18:37.897Z',
  //   '2024-07-07T18:18:37.897Z',
  //   '2024-07-08T18:18:37.897Z',
  //   '2024-07-09T18:18:37.897Z',
  //   '2024-07-10T18:18:37.897Z',
  //   '2024-07-11T18:18:37.897Z',
  //   '2024-07-12T18:18:37.897Z',
  //   '2024-07-13T18:18:37.897Z',
  //   '2024-07-14T18:18:37.897Z',
  //   '2024-07-15T18:18:37.897Z',
  //   '2024-07-16T18:18:37.897Z',
  //   '2024-07-17T18:18:37.897Z',
  //   '2024-07-18T18:18:37.897Z',
  //   '2024-07-19T18:18:37.897Z',
  //   '2024-07-20T18:18:37.897Z',
  //   '2024-07-21T18:18:37.897Z',
  //   '2024-07-22T18:18:37.897Z',
  //   '2024-07-23T18:18:37.897Z',
  //   '2024-07-24T18:18:37.897Z',
  //   '2024-07-25T18:18:37.897Z',
  //   '2024-07-26T18:18:37.897Z',
  //   '2024-07-27T18:18:37.897Z',
  //   '2024-07-28T18:18:37.897Z',
  //   '2024-07-29T18:18:37.897Z',
  //   '2024-07-30T18:18:37.897Z',
  // ];

  // const unavailableDates = [
  //   '2024-06-28T04:00:00.000Z',
  //   '2024-06-29T04:00:00.000Z',
  //   '2024-07-03T04:00:00.000Z',
  // ];

  function isRoomAvailable(roomNumber: {
    _id: string;
    number: number;
    unavailableDates: Date[];
  }) {
    const { unavailableDates } = roomNumber;
    // console.log('hello, isRoomAvailable working');
    //everything as string
    // const isDateFound =selectedDatesInRange.some(date=>unavailableDates.includes(date));

    //if selectedDatesInRange data type are Date type and unavailableDates data type are string.

    // const isDateFound =  unavailableDates.some((date) =>
    //   selectedDatesInRange.includes(new Date(date))
    // );

    const isDateFound = selectedDatesInRange.some((date) =>
      unavailableDates.includes(date)
    );
    // console.log('probando fechas:', selectedDatesInRange, 'fechas no disponibles:', unavailableDates)
    return !isDateFound;
  }

  /*rooms schema from database: 
_id:, title:, price:, maxPeople:, desc:, 
roomNumbers: {number:Number, unavailableDates:{_id:ObjectId, number:string[]}}[]
*/

  //roomNumber.unavailableDates
  //

  function handleReserveClosing() {
    setIsOpen(false);
  }

  function handleRoomSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const isRoomSelected = e.target.checked;
    const roomInfo = e.target.value;
    setSelectedRooms(
      ((selectedRooms) => {
        if (isRoomSelected) {
          return [...selectedRooms, roomInfo];
        } else {
          return selectedRooms.filter((room) => room !== roomInfo);
        }
      })(selectedRooms)
    );

    console.log(roomInfo, 'room', isRoomSelected);
    console.log({ selectedRooms });
  }

  return (
    <div className='rooms__reserve'>
      <div className='reserve__container'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='close-btn'
          onClick={handleReserveClosing}
          // style={{ color: 'gray' }}
        />
        <span className='reserve__title'>Select your rooms:</span>

        {!!data ? (
          data!.map((datum, indx) =>
            !!datum ? (
              <div className='reserve__item' key={indx}>
                <div className='reserv__item__info'>
                  <div className='reserve__item__info--title'>
                    {datum.title} titulo
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
                        value={roomNumber._id}
                        onChange={handleRoomSelection}
                        disabled={!isRoomAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='error__message' key={`null-${indx}`}>
                Room info not Available
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

  //-------------------------------------
  async function handleRoomBooking() {
    console.log('room booking', {selectedRooms}, {selectedDatesInRange});

    const url = `/api/rooms/availability/`;

    ///api/rooms/availability/:roomId

    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          console.log(`url: ${baseURL}${url}${roomId}`);

          const res: any = await axios.put(`${baseURL}${url}${roomId}`, {
            dates: selectedDatesInRange
          });

          console.log(`RoomId: ${roomId} data: ${res.data}`);

          return res.data; //just in case
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default Reserve;
