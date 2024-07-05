//ChartBox.tsx
//Parent:Home.tsx

import './chartBox.css';
import { ChartBoxTypeData } from '../../../types/types.ts';
import TinyChart from '../tinyChart/TinyChart.tsx';
import { Link } from 'react-router-dom';

type ChartBoxTypeProp = {
  data: ChartBoxTypeData;
  gridTitle: string;
};

const ChartBox = ({ data, gridTitle }: ChartBoxTypeProp): JSX.Element => {
  function sign(number: number): string {
    return number < 0 ? 'tomato' : 'lightgreen';
  }

  const { color, icon, title, number, percentage, dataKey, chartData } = data;
  return (
    <>
      <div className='chartBox__container'>
        {gridTitle}
        <div className='chartBox__side'>
          <div className='chartBox__head'>
            <img src={icon} alt={title} className='chartBox__img' />
            <span className='chartBox__title'>{title} </span>
          </div>

          <div className='chartBox__figure'>{number}</div>
          <Link
            to={'/'}
            className='chartBox__footer'
            style={{ color: `${color}` }}
          >
            View all
          </Link>
        </div>

        <div className='chartBox__side--right chartBox__side'>
          <div className='chartBox__chart'>
            <TinyChart chartData={chartData} dataKey={dataKey} color={color} />
          </div>

          <div className='chartBox__percentage'>
            <div style={{ color: sign(percentage) }}>{`${percentage}%`}</div>
            <div className='text'> this month</div>
          </div>

          <div className='chartBox__footer chartBox__side--right'></div>
        </div>
      </div>
    </>
  );
};

export default ChartBox;
