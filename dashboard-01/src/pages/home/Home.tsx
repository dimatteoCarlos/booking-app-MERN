//Home.tsx
//Parent:useRouter.tsx
import TopBox from '../../components/topBox/TopBox';
import './home.css';
import {
  topDealUsers,
  chartBoxUser,
  chartBoxRevenue,
  chartBoxProduct,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
  PieChartBoxData,
  areaChartBoxData,
} from '../../data/data.ts';
import ChartBox from '../../components/charts/chartBox/ChartBox.tsx';
import BarChartBox from '../../components/charts/barChartBox/BarChartBox.tsx';
import RingChartBox from '../../components/charts/ringChartBox/RingChartBox.tsx';
import AreaChartBox from '../../components/charts/areaChartBox/AreaChartBox.tsx';
import { useLocation } from 'react-router-dom';

const Home = (): JSX.Element => {
  const gridConfig = [
    {
      classname: 'tile',
      id: 'tile__1',
      col__span: 'span 1',
      row__span: 'span 3',
      content: <TopBox data={topDealUsers} gridTitle='Top Deals' />,
    },
    {
      classname: 'tile',
      id: 'tile__2',
      col__span: 'span 1',
      row__span: 'span 1',

      content: <ChartBox data={chartBoxUser} gridTitle='' />,
    },
    {
      classname: 'tile',
      id: 'tile__3',
      col__span: 'span 1',
      row__span: 'span 1',
      content: <ChartBox data={chartBoxRevenue} gridTitle='' />,
    },
    {
      classname: 'tile',
      id: 'tile__4',
      col__span: 'span 1',
      row__span: 'span 3',
      content: (
        <RingChartBox data={PieChartBoxData} gridTitle='Leads by Source' />
      ),
    },
    {
      classname: 'tile',
      id: 'tile__5',
      col__span: 'span 1',
      row__span: 'span 1',
      content: <ChartBox data={chartBoxProduct} gridTitle='' />,
    },
    {
      classname: 'tile',
      id: 'tile__6',
      col__span: 'span 1',
      row__span: 'span 1',
      content: <ChartBox data={chartBoxConversion} gridTitle='' />,
    },
    {
      classname: 'tile',
      id: 'tile__7',
      col__span: 'span 2',
      row__span: 'span 2',
      content: (
        <AreaChartBox data={areaChartBoxData} gridTitle='Revenue Analytics' />
      ),
    },

    {
      classname: 'tile',
      id: 'tile__8',
      col__span: 'span 1',
      row__span: 'span 1',
      content: <BarChartBox data={barChartBoxVisit} gridTitle='Total Visit' />,
    },
    {
      classname: 'tile',
      id: 'tile__9',
      col__span: 'span 1',
      row__span: 'span 1',
      content: (
        <BarChartBox data={barChartBoxRevenue} gridTitle='Total Visit' />
      ),
    },
  ];

  const {...userStateInfo}=useLocation();
  
  //console.log('user info from location:', userStateInfo ); //info coming from login.tsx

  return (
    <>
      <section className='home__container'>
      <div
            className={`home__${gridConfig[0].classname} home__${gridConfig[0].id}`}
            key={gridConfig[0].id}
            style={{
              gridColumn: `${gridConfig[0].col__span}`,
              gridRow: `${gridConfig[0].row__span}`,
            }}
          >
            {gridConfig[0].content}
          </div>

          <div
            className={`home__${gridConfig[3].classname} home__${gridConfig[3].id}`}
            key={gridConfig[3].id}
            style={{
              gridColumn: `${gridConfig[3].col__span}`,
              gridRow: `${gridConfig[3].row__span}`,
            }}
          >
            {gridConfig[3].content}
          </div>


        {gridConfig.sort(()=>Math.floor(Math.random()-0.5)).map((item) => (
          item.id!=='tile__1' &&  item.id!=='tile__4' &&
          <div
            className={`home__${item.classname} home__${item.id}`}
            key={item.id}
            style={{
              gridColumn: `${item.col__span}`,
              gridRow: `${item.row__span}`,
            }}
          >
            {item.content}
          </div>
        ))}
        
      </section>
    </>
  );
};

export default Home;
