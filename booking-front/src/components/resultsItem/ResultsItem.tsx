//ResultsItem.tsx
//Parent: ListOfHotels.tsx

import { Link, useNavigate } from 'react-router-dom';
import './resultsItem.css';
import { resultsOfSearch } from './resultsOfSearch.ts';

import { HotelDBInfoType } from '../../types/types.ts';

type ResultsItemPropsType = {
  data: HotelDBInfoType[] | null;
  isLoading?: boolean;
};

const ResultsItem = ({ data }: ResultsItemPropsType): JSX.Element => {
  const navigateTo = useNavigate();

  function handleBtnAction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();
    console.log(e.target, id);
  }
  
  console.log('len:', resultsOfSearch.length);

  return (
    <>
      {data!.length > 0 ? (
        <div className='list-results'>
          {resultsOfSearch.map((item, rndx) => {
            const {
              _id: idDb,
              name: nameDb,
              type,
              city,
              details: {
                address,
                title,
                distance: { km: distToCenter, comment: distCom },
              },
              details: {
                detailsDescription: { description: desc, recommendation },
              },
              rate,
              rating,
              rooms,
              economicPrice,
              featured,
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

            console.log(idDb, address, rating, rooms, featured);

            return (
              <div className='result-item' key={rndx} id={idDb}>
                <img
                  className='image-item'
                  src={photosDb![0] || item.image}
                  id={idDb}
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

                  <span className='subtitle'>
                    {  featureSubTitle || item.subtitle || desc}
                  </span>

                  {/*  */}
                  <span className='features'>
                    {`${type} in ${city}: 
                   ${features || item.features}`}
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

                    {/* <Link to={`/find/${item._id}`}>
                   <button                 onClick={() => navigateTo('/hotels/hotel')}
                  className='btn'>See availability</button>
                 
                  // </Link> */}
                    {/* aqui se debereia obtener el id y hacer un link para mostrar las fotos del hotel en DetailsOfHotel, donde se haria el fetch para buscar los datos del hotel, o se enviarina ya selecttionados desde aqui? al hacer click en see availability */}
                    <Link to='/hotels/hotel'>
                      <button
                        // onClick={(e) => handleBtnAction(e, id)}
                        className='btn'
                      >
                        See availability
                      </button>
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
