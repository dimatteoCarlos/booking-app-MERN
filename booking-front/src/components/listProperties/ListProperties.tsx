//ListProperties.tsx
import './listProperties.css';
import { propertiesList } from './dataListProperties.ts';

const ListProperties = (): JSX.Element => {
  return (
    <div className='list-container'>
      {propertiesList.map((item, indx) => {
        const {
          id,
          url,
          titles: { category: category, qty: quantity },
        } = item;

        return (
          <div className='listProperty-item' key={indx}>
            <img src={url} alt={`${id}_${category}`} className='image-item' />

            <div className='titles-item'>
              <h1 className='category'>{category}</h1>
              <h2 className='quantity'>{quantity}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListProperties;
