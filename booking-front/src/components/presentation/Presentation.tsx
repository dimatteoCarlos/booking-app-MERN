//Presentation.tsx
//Parent: Home.tsx
import './presentation.css';
import { dataPresentation } from './dataPresentation';
import useFetch from '../hooks/useFetch';

type CityType = { city: string; count: number };

// export type CityApiResponseType = {
//   isLoading: boolean;
//   error: any;
//   data: CityType[];
// };

const Presentation = () => {
  let url =
    'http://localhost:8800/api/hotels/query/countByType?types=hotel,apartment,cabin,room,VILLAGE,Hotel,CABIN,village';

  url = 'http://localhost:8800/api/hotels/count/countByType';

  url =
    'http://localhost:8800/api/hotels/query/countByCity?cities=dublin,berlin,madrid,paraguachon,new%20york';

  //-----------

  const { data, isLoading, error } = useFetch<CityType[]>(url);

  return (
    <>
      <div className='presentation-container presentation'>
        {!!error && <div>Something went wrong, {error.message}</div>}

        {isLoading
          ? 'Loading...'
          : dataPresentation.map((item, indx) => {
              const { id, urlImg } = item;

              const city = data![indx].city;
              const count = data![indx].count;

              return (
                <div className='item-product' key={indx}>
                  <img src={urlImg} alt={`${id}_${'city'}`} />
                  <div className='item-titles'>
                    <h1
                      className='place'
                      style={{ textTransform: 'capitalize' }}
                    >
                      {city}
                    </h1>
                    <h2 className='properties'>
                      {count} {count > 1 ? 'properties' : 'property'}
                    </h2>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Presentation;
