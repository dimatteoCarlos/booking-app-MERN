//DetailedInfo.tsx
/*Parents:
 DetailedProduct.tsx , DetailedUser.tsx
 */

import { SingleProductDataType } from '../../types/SingleProductDataType';

import { SingleUserDataType } from '../../types/SingleUserDataType';

import SimpleLineChart from '../charts/simpleLineChart/SimpleLineChart';

import TimeLine from './timeline/TimeLine';

type DetailedDataTypeProp = {
  detailedInfo: SingleProductDataType | SingleUserDataType;
};

import './detailedInfo.css';

const DetailedInfo = ({ detailedInfo }: DetailedDataTypeProp) => {
  const { id, title, img, info, chart, activities } = detailedInfo;

  return (
    <>
      <section className='detailed__container'>
        <article className='detailed__view'>
          <div className='view__info'>
            <img src={img} className='info__img' alt='info__img' />

            <h2 className='info__title'>{title}</h2>
            <button className='info__btn' onClick={() => {}}>
              Update
            </button>
          </div>

          <div className='info__description'>
            {Object.entries(info).map((elem) => (
              <div className='elem' key={`${id}_${elem[0]}`}>
                <span className='key'>{elem[0]}:</span>
                <span className='value'>{elem[1]}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className='view__chart'>
            <SimpleLineChart chartObjData={chart} />
          </div>
        </article>

        <div className='detailed__timeline'>
          {activities && (
            <TimeLine timeInfo={activities} title={'Latest Activities'} />
          )}
        </div>
      </section>
    </>
  );
};

export default DetailedInfo;
