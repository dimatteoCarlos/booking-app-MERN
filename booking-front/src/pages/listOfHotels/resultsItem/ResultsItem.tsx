//ResultsItem.tsx
//Parent: ListOfHotels.tsx

import { Link, useNavigate } from 'react-router-dom';
import './resultsItem.css';
import { resultsOfSearch as defaultData } from './resultsOfSearch.ts';

import { HotelDBInfoType } from '../../../types/typesHotel.ts';

type ResultsItemPropsType = {
  data: HotelDBInfoType[] | null;
  isLoading?: boolean;
};

const ResultsItem = ({ data }: ResultsItemPropsType): JSX.Element => {
  const navigateTo = useNavigate();

  // console.log('len:', defaultData.length, 'dataLen:', data!.length);

  //usage of data instead of defaultData

  return (
    <>
      {defaultData!.length > 0 ? (
        <div className='list-results'>
          {defaultData?.map((item, rndx) => {
            const {
              _id: id,
              name: nameDb,
              type,
              city,
              details: {
                // address,
                title,
                distance: { km: distToCenter, comment: distCom },
              },
              details: {
                detailsDescription: { description: desc, recommendation },
              },
              rate,
              rating,
              // rooms,
              economicPrice,
              // featured,
              photoUrlImages: photosDb,
            } = data![rndx];

            const {
              features_details: {
                featureTitle,
                featureSubTitle,
                features,
                cancelOp,
                cancelOpSubtitle,
                taxesOp,
              },
            } = data![rndx];

            const ratingToShow: number = rate || Number(item.rating.rate);

            // console.log('module:', rndx % defaultData.length)

            return (
              <div className='result-item' key={rndx} id={id}>
                <img
                  className='image-item'
                  src={photosDb![0] || item.image}
                  alt={'image-' + { rndx } + '-' + { nameDb }}
                  onClick={() => navigateTo('/hotels/hotel')}
                />
                <div className='desc'>
                  <h1 className='title'>{title || item.title}</h1>
                  <span className='distance'>
                    {`${distToCenter || item.distance} km from center`}
                  </span>
                  <span className='taxiOp'>
                    {item.taxiOp || 'Check if Free airport taxi is available'}
                  </span>

                  <span className='title'>{featureTitle || item.title}</span>

                  <span className='subtitle'>
                    {featureSubTitle || item.subtitle || desc}
                  </span>

                  {/*  */}
                  <span className='features'>
                    {`${type} in ${city}: 
                   ${features || recommendation || item.features || distCom}`}
                  </span>

                  <div className='cancelOp'>{cancelOp || item.cancelOp}</div>

                  <div className='cancelOpSubtitle'>
                    {cancelOpSubtitle || item.cancelOpSubtitle}
                  </div>
                </div>

                <div className='details'>
                  {(rating || item.rating) && (
                    <div
                      className='rating'
                      style={{ textTransform: 'capitalize' }}
                    >
                      <span className='ratingDesc'>
                        {rating || item.rating.desc}
                      </span>

                      <button className='btnRate'>{`${ratingToShow.toFixed(
                        1
                      )}`}</button>
                    </div>
                  )}

                  <div className='texts'>
                    <span className='price'>
                      {`$${economicPrice}` || item.price}
                    </span>
                    <div className='taxesOp'>{taxesOp || item.taxesOp}</div>

                    {/* Details of Hotel */}
                    <Link to={`/hotels/${id}`}>
                      <button className='btn'>See availability</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        'Non property fits the `search conditions, please try again, changing search parameters'
      )}
    </>
  );
};

export default ResultsItem;

// http://localhost:8800/api/hotels/find/663f7364420a784bf6c15b76
