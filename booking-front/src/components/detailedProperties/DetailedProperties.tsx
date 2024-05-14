import './detailedProperties.css';

import { properties } from './dataDetailedProperties';
import useFetch from '../hooks/useFetch';
import { HotelDBInfoType } from '../../types/types.ts';

// type HotelDBInfoType = {
//   _id: string;
//   name: string;
//   type: string;
//   city: string;
//   address: string;
//   distance: string;
//   title: string;
//   photos: string;
//   description: string;
//   rating: number;
//   rooms: string;
//   economicPrice: number;
//   featured: boolean;
// };

const DetailedProperties = (): JSX.Element => {
  let url =
    'http://localhost:8800/api/hotels/getHotelsByQuery/?featured=true&min=1&max=10000&limit=4';

  const {
    fetchState: { data, isLoading, error },
  } = useFetch<HotelDBInfoType[]>(url);

  console.log('data:', data);

  return (
    <div className='best-properties'>
      {!!error && <div>Something went wrong, {error.message}</div>}
      {isLoading
        ? 'Loading...'
        : properties.map((item, indx) => {
            const {
              id,
              urlImage,
              name,
              place,
              price,
              rating: { rate: rate, rating: rating },
            } = item;

            const {
              name: namedb,
              city,
              economicPrice,
              rating: ratingdb,
              photos,
              _id,
            } = data![indx];

            return (
              <div
                className='item-container'
                key={id.toString() + '-' + indx.toString()}
              >
                <img
                  src={photos[0] || urlImage}
                  alt={`${id}_${name}_${_id}`}
                  className='image-property'
                />

                <span className='name-property'>{namedb || name}</span>
                <span className='place-property'>
                  {city.toLowerCase() || place.toLowerCase()}
                </span>
                <span className='price-property'>
                  Starting from ${economicPrice || price}
                </span>

                <div className='rating-property'>
                  <button className='rate'>{ratingdb || rate}</button>
                  <span className='rating'>{rating}</span>
                  <span className='review'>
                    {Math.ceil(Math.random() * 100)} reviews
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DetailedProperties;
