//Parent:Home.tsx

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './areaChartBox.css';
import { AreaChartBoxDataType } from '../../../types/types.ts';

type AreaChartBoxTypeProp = {
  data: AreaChartBoxDataType | undefined;
  gridTitle: string | undefined;
};

const AreaChartBox = ({
  data,
  gridTitle,
}: AreaChartBoxTypeProp): JSX.Element => {
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',

    '#0167FE',
    '#065133',
    '#FFcc78',
    '#FF1672',
  ];

  const keysArray = Object.keys(data![0]).filter((key) => key !== 'name');

  let cycle = 0,
    indx = 0,
    colorLength = COLORS.length;

  const areasToGraphArrayKey = keysArray.map((key, i) => {
    if (key !== 'name') {
      if (i > colorLength) {
        cycle++;
        indx = i - colorLength * cycle;
      } else {
        indx = i;
      }
    }

    return { area: key, stroke: COLORS[indx] };
  });

  return (
    <>
      <div className='area__chartBox--container'>
        <div className='area__chartBox--title'>{gridTitle}</div>

        <div className='area__chartBox--chart'>
          <ResponsiveContainer width='99%' height='100%'>
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip
                contentStyle={{
                  border: 'none',
                  background: 'transparent',
                  borderRadius: '5px',
                }}
                position={{ x: 250, y: -20 }}
                label={false}
              />
              <Legend verticalAlign='bottom' align={'center'} height={16} />

              {areasToGraphArrayKey.map((item) => {
                return (
                  <Area
                    key={`area_${item.area}`}
                    type='monotone'
                    dataKey={item.area}
                    stackId={1}
                    stroke={item.stroke}
                    fill={item.stroke}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AreaChartBox;
