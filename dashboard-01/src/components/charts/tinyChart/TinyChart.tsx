//TinyChart.tsx

//Parent:ChartBox.tsx

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

import { ChartDataType } from '../../../types/types.ts';

type TinyChartTypeProp = {
  chartData: ChartDataType[];
  color: string;
  dataKey: string;
};

const TinyChart = ({
  chartData,
  dataKey,
  color,
}: TinyChartTypeProp): JSX.Element => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData}>
          <Tooltip
            contentStyle={{ background: 'transparent', border: 'none' }}
            labelStyle={{ display: 'none' }}
            position={{ x: -20, y: 70 }}
          />
          <Line
            type='monotone'
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default TinyChart;
