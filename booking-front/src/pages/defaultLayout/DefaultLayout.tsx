import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const DefaultLayout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
