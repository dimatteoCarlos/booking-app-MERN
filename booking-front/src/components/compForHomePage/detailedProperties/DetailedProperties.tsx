import './detailedProperties.css';
import { properties } from './dataDetailedProperties.ts';
import useFetch from '../../hooks/useFetch.tsx';
import { HotelDBInfoType } from '../../../types/typesHotel.ts';

import { useState } from 'react';
import { testImage } from '../../../helpers/testImg.tsx';

export type TestImageType = {
  url: string | string[];
};

const DetailedProperties = (): JSX.Element => {
  let url =
    'http://localhost:8800/api/hotels/getHotelsByQuery/?featured=true&min=1&max=10000&minRate=7&limit=4';

  const {
    fetchState: { data, isLoading, error },
  } = useFetch<HotelDBInfoType[]>(url);

  // console.log('data:', data);

  // const [imageToRender, setImageToRender] = useState<string>('');

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
              rating: ratingDb,
              rate: ratedb,
              photoUrlImages,
              _id,
            } = data![indx];

            const selectedUrlImage =
              photoUrlImages![6] || urlImage || '/backUpImage.webp';

            testImage(selectedUrlImage);

            return (
              <div
                className='item-container'
                key={id.toString() + '-' + indx.toString()}
              >
                <img
                  src={selectedUrlImage}
                  alt={`${id}_${name}_${_id}`}
                  className='image-property'
                />

                <span className='name-property'>{namedb || name}</span>
                <span className='place-property'>
                  {/* {city.toLowerCase() || place.toLowerCase()} */}
                  {place.toLowerCase() || city.toLowerCase()}
                </span>
                <span className='price-property'>
                  Starting from ${economicPrice || price}
                </span>

                <div className='rating-property'>
                  <button className='rate'>{ratedb.toFixed(1) || rate}</button>

                  <span
                    className='rating'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {ratingDb || rating}
                  </span>
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
