import { useNavigate } from 'react-router-dom';
import './resultsItem.css';
import { resultsOfSearch } from './resultsOfSearch';

const ResultsItem = () => {
  const navigateTo = useNavigate();

  return (
    <>
      <div className='list-results'>
        {resultsOfSearch.map((item, rndx) => (
          <div className='result-item' key={rndx}>
            <img
              src={item.image}
              alt={'image-' + { rndx }}
              className='image-item'
              onClick={() => navigateTo('/hotels/hotel')}
            />
            <div className='desc'>
              <h1 className='title'>{item.title}</h1>
              <span className='distance'>{item.distance}</span>
              <span className='taxiOp'>{item.taxiOp}</span>
              <span className='subtitle'>{item.subtitle}</span>
              <span className='features'>{item.features}</span>
              <div className='cancelOp'>{item.cancelOp}</div>
              <div className='cancelOpSubtitle'>{item.cancelOpSubtitle}</div>
            </div>

            <div className='details'>
              <div className='rating'>
                <span className='ratingDesc'>{item.rating.desc}</span>

                <span className='btnRate'>{item.rating.rate}</span>
              </div>

              <div className='texts'>
                <span className='price'>{item.price}</span>
                <div className='taxesOp'>{item.taxesOp}</div>
                <button className='btn'>See availability</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultsItem;
