import { useNavigate } from 'react-router-dom';
import './resultsItem.css';
import { resultsOfSearch } from './resultsOfSearch';

import { HotelDBInfoType } from '../../types/types.ts';

type ResultsItemPropsType = {
  data: HotelDBInfoType[] | null;
};

const ResultsItem = ({ data }: ResultsItemPropsType): JSX.Element => {
  const navigateTo = useNavigate();

  return (
    <>
      <div className='list-results'>
        {resultsOfSearch.map((item, rndx) => {
          const {
            _id,
            name: namedb,
            type,
            city,
            address,
            distance,
            title,
            description: desc,
            rating,
            rooms,
            economicPrice,
            featured,
            photos,
          } = data![rndx];

          return (
            <div className='result-item' key={rndx}>
              <img
                src={item.image || photos[0]}
                alt={'image-' + { rndx }}
                className='image-item'
                onClick={() => navigateTo('/hotels/hotel')}
              />
              <div className='desc'>
                <h1 className='title'>{item.title || title}</h1>
                <span className='distance'>{item.distance || distance}</span>
                <span className='taxiOp'>{item.taxiOp}</span>
                <span className='subtitle'>{item.subtitle || desc}</span>
                <span className='features'>
                  {item.features} {city}
                </span>
                <div className='cancelOp'>{item.cancelOp}</div>
                <div className='cancelOpSubtitle'>{item.cancelOpSubtitle}</div>
              </div>

              <div className='details'>
                <div className='rating'>
                  <span className='ratingDesc'>{item.rating.desc}</span>

                  <span className='btnRate'>{item.rating.rate}</span>
                </div>

                <div className='texts'>
                  <span className='price'>
                    {`$${economicPrice}` || item.price}
                  </span>
                  <div className='taxesOp'>{item.taxesOp}</div>
                  <button className='btn'>See availability</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ResultsItem;
