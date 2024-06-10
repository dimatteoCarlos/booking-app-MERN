//Presentation.tsx
//Parent: Home.tsx
import './presentation.css';
import { dataPresentation } from './dataPresentation';
import useFetch from '../../hooks/useFetch';

type CityType = { city: string; count: number };

const Presentation = () => {
  //endpoint to count properties by cities specified by the user
  let url =
    'http://localhost:8800/api/hotels/query/countByCity?cities=dublin,berlin,madrid,london';

  //-----------

  const { fetchState } = useFetch<CityType[]>(url);

  const { data, isLoading, error } = fetchState;

  //obtener las fotos principales de una propiedad ubicada en las ciudades presentadas. se require preparacion de la data, para esta presentacion, aqui solo se muestra las propiedades contadas, y las fotos fijas de la data de dataPresentation. asi mismo para el conteo de propiedades por tipo, y las propiedades featured.

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
                  <img src={urlImg} alt={`${id}_${city}`} />
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
