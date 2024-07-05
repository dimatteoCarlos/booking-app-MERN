//RingChartBox.tsx
//Parent:Home.tsx
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import './ringChartBox.css';

import { RingChartBoxDataType } from '../../../types/types.ts';

type chartBoxDataTypeProp = {
  data: RingChartBoxDataType;
  gridTitle: string;
};

const RingChartBox = ({
  data,
  gridTitle,
}: chartBoxDataTypeProp): JSX.Element => {
  return (
    <>
      <div className='ring__chartBox--container'>
        <div className='ring__chartBox--title'>{gridTitle}</div>
        <div className='ring__chartBox--chart'>
          <ResponsiveContainer width='99%' height='100%'>
            <PieChart>
              <Legend verticalAlign='bottom' layout='horizontal' />
              <Tooltip
                contentStyle={{
                  border: 'none',
                  background: 'transparent',
                  borderRadius: '5px',
                }}
                position={{ x: 50, y: 20 }}
                label={false}
              />

              <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey='value'
                label={true}
                legendType='circle'
              >
                {data.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='legend'>
          {data.map((item, i) => (
            <div className='legend--box' key={'legend_' + item.name}>
              <div
                className='legend--dot'
                style={{ backgroundColor: item.color }}
              ></div>

              <div className='legend--item' style={{ color: item.color }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RingChartBox;
