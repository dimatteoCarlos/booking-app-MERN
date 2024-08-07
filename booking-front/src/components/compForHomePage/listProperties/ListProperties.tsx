//ListProperties.tsx
//Parent:Home.tsx
import './listProperties.css';
import { propertiesList } from './dataListProperties.ts';
import useFetch from '../../../hooks/useFetch.tsx';

export type TypePropertyType = { type: string; count: number };

const ListProperties = (): JSX.Element => {
  //endpoint to count properties by type specified by the user
  // let url =
  //   'http://localhost:8800/api/hotels/query/countByType?types=hotel,apartment,cabin,room,VILLAGE,Hotel,CABIN,villa, resort';

  //endpoint to count properties of ALL types defined in the database, but specified at the api.

  let url = 'http://localhost:8800/api/hotels/count/countByType';

  //-----------

  const { fetchState } = useFetch<TypePropertyType[]>(url);

  const { data, isLoading } = fetchState;
  // console.log('data:', data);

  return (
    <div className='list-container'>
      {isLoading
        ? 'Loading...'
        : propertiesList.map((item, indx) => {
            const {
              id,
              urlImage,
              titles: { category: category },
            } = item;

            return (
              <div className='listProperty-item' key={indx}>
                <img
                  src={urlImage}
                  alt={`${id}_${category}`}
                  className='image-item'
                />

                <div className='titles-item'>
                  <h1
                    className='category'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {data![indx].type}
                    {data![indx].count > 1 ? 's' : ''}
                  </h1>
                  <h2
                    className='quantity'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {data![indx]?.count} {data![indx].type.toLowerCase()}
                    {data![indx]?.count > 1 ? 's' : ''}
                  </h2>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default ListProperties;
