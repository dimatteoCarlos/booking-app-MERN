import { Link, useNavigate } from 'react-router-dom';
import './resultsItem.css';
import { resultsOfSearch } from './resultsOfSearch';

import { HotelDBInfoType } from '../../types/types.ts';

type ResultsItemPropsType = {
  data: HotelDBInfoType[] | null;
  isLoading?: boolean;
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

          const ratingToShow: string | number = item.rating.rate || rating;

          console.log(_id, address, rating, rooms, featured);

          return (
            <div className='result-item' key={rndx} id={_id}>
              <img
                className='image-item'
                src={item.image || photos[0]}
                alt={'image-' + { rndx } + '-' + { namedb }}
                onClick={() => navigateTo('/hotels/hotel')}
              />
              <div className='desc'>
                <h1 className='title'>{item.title || title}</h1>
                <span className='distance'>
                  {item.distance || `${distance} m from center`}
                </span>
                <span className='taxiOp'>
                  {item.taxiOp} ||
                  {'Check if Free airport taxi is available on your staying'}
                </span>
                <span className='subtitle'>{item.subtitle || desc}</span>
                <span className='features'>
                  {`${type} in ${city}: 
                   ${item.features}`}
                </span>
                <div className='cancelOp'>{item.cancelOp}</div>
                <div className='cancelOpSubtitle'>{item.cancelOpSubtitle}</div>
              </div>

              <div className='details'>
                {
                  <div className='rating'>
                    <span className='ratingDesc'>{item.rating.desc}</span>
                    <span className='btnRate'>{`${ratingToShow}`}</span>
                  </div>
                }

                <div className='texts'>
                  <span className='price'>
                    {`$${economicPrice}` || item.price}
                  </span>
                  <div className='taxesOp'>{item.taxesOp}</div>

                  {/* <Link to={`/find/${item._id}`}>
                    <button className='btn'>See availability</button>
                  </Link> */}
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
// http://localhost:8800/api/hotels/find/663f7364420a784bf6c15b76
