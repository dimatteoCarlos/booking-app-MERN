// BarChartBox.tsx
//Parent:Home.tsx
import './barChartBox.css';

import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

import { BarChartBoxType } from '../../../types/types';

type BarChartBoxTypeProp = {
  data: BarChartBoxType;
  gridTitle: string;
};
const BarChartBox = ({
  data,
  gridTitle = '',
}: BarChartBoxTypeProp): JSX.Element => {
  const { title, color, dataKey, chartData } = data;
  return (
    <>
      <div className='barchart__container'>
        <div className='barchart__title'>{title || gridTitle}</div>
        <div className='barchart__chart'>
          <ResponsiveContainer width='99%' height='80%'>
            <BarChart data={chartData}>
              <Tooltip
                contentStyle={{
                  background: 'transparent',
                  borderRadius: '5px',
                  border: 'none',
                }}
                labelStyle={{ display: 'none' }}
                position={{ x: 50, y: -25 }}
                cursor={{ display: 'none' }}
              />
              <Bar dataKey={dataKey} fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BarChartBox;
