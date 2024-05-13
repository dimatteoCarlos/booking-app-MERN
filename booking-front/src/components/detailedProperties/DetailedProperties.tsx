import './detailedProperties.css';

import { properties } from './dataDetailedProperties';
import useFetch from '../hooks/useFetch';

type HotelInfoType = {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  title: string;
  photos: string;
  description: string;
  rating: number;
  rooms: string;
  economicPrice: number;
  featured: boolean;
};

const DetailedProperties = (): JSX.Element => {
  let url =
    'http://localhost:8800/api/hotels/getHotelsByQuery/?featured=true&min=10&max=800&limit=4';

  const { error, isLoading, data } = useFetch<HotelInfoType[]>(url);

  return (
    <div className='best-properties'>
      {!!error && <div>Something went wrong, {error.message}</div>}
      {isLoading
        ? 'Loading...'
        : properties.map((item, indx) => {
            const {
              id,
              url,
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
            } = data![indx];

            return (
              <div
                className='item-container'
                key={id.toString() + '-' + indx.toString()}
              >
                <img
                  src={url}
                  alt={`${id}_${name}`}
                  className='image-property'
                />

                <span className='name-property'>{namedb || name}</span>
                <span className='place-property'>{city || place}</span>
                <span className='price-property'>
                  Starting from ${economicPrice || price}
                </span>

                <div className='rating-property'>
                  <button className='rate'>{ratingdb || rate}</button>
                  <span className='rating'>{rating}</span>
                  <span className='review'>
                    {Math.ceil(Math.random() * 10 * rate)} reviews
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DetailedProperties;
