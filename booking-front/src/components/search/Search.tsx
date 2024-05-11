//Search.tsx
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import ChevronArrowDown from '../../svg-components/ChevronArrowDown.tsx';
import BedFront from '../../svg-components/BedFront.tsx';

import DateRangeComp from './dateRange/DateRangeComp';

import { Range } from 'react-date-range';

import { format } from 'date-fns';
import { useState } from 'react';
import OptionsComp from './options/OptionsComp.tsx';
import { OptionsType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
//-------------------------

const Search = () => {
  //date-range--------------
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);

  const [date, setDate] = useState<Range[] | undefined>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  //options------------------
  //range 1 to 30 for adults, 0 to 10 for children, and 1 to 30 rooms; in options
  const [options, setOptions] = useState<OptionsType>({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  //destination-------------------
  const [destination, setDestination] = useState<string>('');
  //------------------------
  const navigateTo = useNavigate();

  //------------------------
  const handleSearch = () => {
    navigateTo('/hotels', { state: { destination, date, options } });
  };

  //------------------------
  return (
    <>
      <div className='search-container'>
        <div
          className='search-item input'
          onClick={() => {
            setIsOpenDate(false);
            setIsOptionsOpen(false);
          }}
        >
          <div className='search-icon' />

          <BedFront color={'#625858'} widthsize={28} heightsize={28} />

          <input
            className='search-input'
            type='text'
            placeholder='Where are you going?'
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
{/*  */}
        <div className='search-item date-search'>
          <div
            className='click-zone'
            onClick={() => {
              setIsOpenDate((isOpenDate) => !isOpenDate);
              setIsOptionsOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDays} className='search-icon' />

            <span className='search-text'>
              {date &&
                `${format(date[0]!.startDate!, 'dd/MMM/yy')} \n to \n ${format(
                  date[0]!.endDate!,
                  'dd/MMM/yy'
                )}`}
            </span>
          </div>

          {true && (
            <div
              className='search-panel'
              style={{ scale: isOpenDate ? '1' : '0' }}
            >
              <div className='search-rendered'>
                <DateRangeComp date={date} setDate={setDate} />
              </div>
            </div>
          )}
        </div>

        <div className='search-item options-search'>
          <div
            className='click-zone'
            onClick={() => {
              setIsOptionsOpen((prev) => !prev);
              setIsOpenDate(false);
            }}
          >
            <FontAwesomeIcon icon={faUser} className='search-icon' />

            <div className='search-text'>
              <span className='search-text'>
                {` ${options.adults} ${
                  options.adults == 1 ? 'adult' : 'adults'
                } ·  ${options.children} ${
                  options.children == 1 ? 'child' : 'children'
                } ·  ${options.rooms} ${
                  options.rooms == 1 ? 'room ' : 'rooms '
                }`}
              </span>
              <span style={{ verticalAlign: 'middle', marginLeft: '.5rem' }}>
                <ChevronArrowDown />
              </span>
            </div>
          </div>

          <div
            className='search-panel options'
            style={{ scale: isOptionsOpen ? '1' : '0' }}
          >
            <span className='options-rendered'>
              <OptionsComp
                options={options}
                setOptions={setOptions}
                setIsOptionsOpen={setIsOptionsOpen}
              />
            </span>
          </div>
        </div>

        <div className='search-item btn'>
          <button className='search-btn' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
