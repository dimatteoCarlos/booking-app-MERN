//Layout.tsx
//Parent: useRouter.tsx
import './layout.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { menu } from '../../data.ts';
import Menu from '../../components/menu/Menu';
import Footer from '../../components/footer/Footer';

const Layout = () => {
  return (
    <>
      <div className='main__layout'>
        <Navbar />
        <div className='main__container'>
          <div className='main__menu'>
            <Menu menu={menu} />
          </div>
          <div className='main__content'>
            <Outlet />
          </div>
        </div>
        <div className='main__footer'>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
