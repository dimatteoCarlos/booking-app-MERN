//SimpleChart.tsx
//Parent:DetailedInfo.tsx
import './simpleLineChart.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Chart } from '../../../types/MakeType/SingleDataType2';

type SimpleChartTypeProp = {
  chartObjData: Chart;
};

const SimpleLineChart = ({ chartObjData }: SimpleChartTypeProp) => {
  const { data, dataKeys } = chartObjData;

  return (
    <>
      <div className='simpleLineChart--container'>
        <ResponsiveContainer>
          <LineChart
            data={data!}
            margin={{
              top: 5,
              right: 15,
              left: 5,
              bottom: 15,
            }}
          >
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip
              contentStyle={{
                border: 'none',
                background: 'transparent',
                borderRadius: '5px',
                fontSize: '0.875rem',
              }}
              position={{ x: 165, y: 165 }}
              active={true}
            />
            <Legend verticalAlign='bottom' />

            {dataKeys?.map((keyData) => (
              <Line
                type='monotone'
                dataKey={keyData.name}
                stroke={keyData.color}
                activeDot={{ r: 3 }}
                key={keyData.name}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SimpleLineChart;
