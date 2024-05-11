//ListOfHotels.tsx

import './listOfHotels.css';
import Header from '../../components/header/Header';

import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import { DateRange } from 'react-date-range';
import ResultsItem from '../../components/resultsItem/ResultsItem';

const ListOfHotels = (): JSX.Element => {
  const { date: fecha, destination, options: options } = useLocation().state;

  //--------------------
  const [date, setDate] = useState(fecha);

  //--------------
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);

  return (
    <div>
      {/* <Navbar /> */}

      <Header modeType='list' />

      <div className='list-container'>
        <div className='list-wrapper'>
          <div className='list-search2'>
            <div className='title'>Search</div>

            <div className='list-item'>
              <label htmlFor='detination'>Destination/property/name:</label>

              <input
                type='text'
                name='destination'
                id='destination'
                placeholder={destination}
              />
            </div>

            <div className='list-item date-search'>
              <label htmlFor='check-date'>Check Dates</label>

              <span
                className='date-search'
                onClick={() => setIsOpenDate((prev) => !prev)}
              >
                {`${format(date[0].startDate, 'dd/MMM/yyyy')} \n to \n ${format(
                  date[0].endDate,
                  'dd/MMM/yyyy'
                )}`}
              </span>

              {isOpenDate && (
                <div className=' date-range'>
                  <DateRange
                    onChange={(item) => {
                      setDate([item.selection]);
                    }}
                    minDate={new Date()}
                    ranges={date}
                  />
                </div>
              )}
            </div>

            <div className='list-item options'>
              <label>Options</label>
              <div className='list-options'>
                <div className='option-item'>
                  <span className='option-text'>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    autoComplete='off'
                    className='option-ipnut'
                    min={0}
                  />
                </div>

                <div className='option-item'>
                  <span>
                    Max price <small>per night</small>
                  </span>
                  <input
                    className='option-input'
                    autoComplete='off'
                    type='number'
                    min={0}
                  />
                </div>

                <div className='option-item'>
                  <span>Adult</span>
                  <input
                    placeholder={options.adults}
                    type='number'
                    className='option-input'
                    autoComplete='off'
                    min={1}
                    max={30}
                    step='1'
                  />
                </div>

                <div className='option-item'>
                  <span>Children</span>
                  <input
                    placeholder={options.children}
                    type='number'
                    className='option-input'
                    autoComplete='off'
                    min={0}
                    max={10}
                    step='1'
                  />
                </div>

                <div className='option-item'>
                  <span>Room</span>
                  <input
                    placeholder={options.rooms}
                    type='number'
                    autoComplete='off'
                    min={1}
                    max={30}
                  />
                </div>
                <button className='list-search-btn'>Search</button>
              </div>
            </div>
          </div>
          <ResultsItem />
        </div>
      </div>
    </div>
  );
};

export default ListOfHotels;
