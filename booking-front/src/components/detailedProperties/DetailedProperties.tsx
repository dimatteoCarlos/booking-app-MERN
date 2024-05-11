import './detailedProperties.css';

import { properties } from './dataDetailedProperties';

const DetailedProperties = (): JSX.Element => {
  return (
    <div className='best-properties'>
      {properties.map((item, indx) => {
        const {
          id,
          url,
          name,
          place,
          price,
          rating: { rate: rate, rating: rating },
        } = item;

        return (
          <div
            className='item-container'
            key={id.toString() + '-' + indx.toString()}
          >
            <img src={url} alt={`${id}_${name}`} className='image-property' />

            <span className='name-property'>{name}</span>
            <span className='place-property'>{place}</span>
            <span className='price-property'>{price}</span>
            <div className='rating-property'>
              <button className='rate'>{rate}</button>
              <span className='rating'>{rating}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedProperties;
