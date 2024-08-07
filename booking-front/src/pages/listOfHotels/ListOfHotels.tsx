//ListOfHotels.tsx
//Parent:App.tsx
import './listOfHotels.css';
import Header from '../../components/header/Header';

import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import { format } from 'date-fns';

import { DateRange } from 'react-date-range';
import ResultsItem from './resultsItem/ResultsItem.tsx';

import { HotelDBInfoType } from '../../types/typesHotel.ts';

import useFetch from '../../hooks/useFetch.tsx';
import { useSearchData } from '../../components/context/SearchContext.tsx';
// import { OptionsType } from '../../types/types';

//----------------------------

const ListOfHotels = (): JSX.Element => {
  const {
    date: dates,
    options: optionsValue,
    // destination: destinationValue,
  } = useLocation().state;

  const location = useLocation();

  //---define states received in location state (useNavigate from Search)

  const [date, setDate] = useState(dates);
  const [destination, setDestination] = useState(location.state.destination);

  const [options, setOptions] = useState(optionsValue);

  //----------------------
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  //----------------
  const { searchDispatch } = useSearchData();

  //----------------
  let url = `http://localhost:8800/api/hotels/getHotelsByQuery/?city=${destination.toLowerCase()}&min=${
    minPrice || 1
  }&max=${maxPrice || 10000}&minRate=2&limit=1000`;

  const {
    fetchState: { data, isLoading },
    reFetch,
  } = useFetch<HotelDBInfoType[]>(url);

  // console.log(data, isLoading, );

  const handlePrice = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: React.Dispatch<React.SetStateAction<number | undefined>>
  ) => {
    e.preventDefault();
    cb(Number(e.target.value));
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log('🚀 ~ ListOfHotels ~ url:', url);
    e.preventDefault();
    reFetch!();

    searchDispatch({
      type: 'NEW_SEARCH',
      payload: { destination, date, options },
    });
  };

  // const handleDestination = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const placeToGo = e.target.value;

  //   setTimeout(() => {
  //     setDestination(placeToGo);
  //   }, 1500);
  // };

  // function handleOptions(e:React.ChangeEvent<HTMLInputElement>){}

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
                value={destination}
                id='destination'
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                // onChange={(e) => handleDestination(e)}
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
                    className='option-input'
                    min={0}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   setMinPrice(Number(e.target.value))
                    // }
                    onChange={(e) => handlePrice(e, setMinPrice)}
                    value={minPrice}
                    // placeholder={`${minPrice ?? ''}`}
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
                    min={1}
                    onChange={(e) => handlePrice(e, setMaxPrice)}
                    value={maxPrice}
                    placeholder={`${maxPrice ?? ''}`}
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
                    // value={options.adults}
                    // onChange={(e) => handleOptions(e)}
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
                <button
                  className='list-search-btn'
                  onClick={(e) => handleSearch(e)}
                >
                  Search
                </button>
              </div>
            </div>
            <div className='totalCountResults'>
              {data && data.length > 0
                ? `${data!.length} properties found `
                : null}
            </div>
          </div>

          {isLoading ? 'Loading...' : <ResultsItem data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ListOfHotels;
