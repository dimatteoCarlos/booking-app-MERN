//Router.tsx
//Parent: App.tsx
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/home/Home';
import Users from '../pages/users/Users';
import Products from '../pages/products/Products';
import Layout from '../pages/layout/Layout';
import DetailedUser from '../pages/detailedUser/DetailedUser';
import { DetailedProduct } from '../pages/detailedProduct/DetailedProduct';
import UnderConstruction from '../pages/underConstruction/UnderConstruction';
import PrivateRoute from '../components/privateRoute/PrivateRoute';

export default function useRouter() {
  const router = createBrowserRouter([
    { path: 'link', element: <UnderConstruction /> },
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,

      children: [
        { index: true, element: <PrivateRoute><Home /></PrivateRoute> },
        {
          path: 'users',
          element: (
            // <PrivateRoute>
              <Users title={'users'} btnLabel={'add new user'} />
            // </PrivateRoute>
          ),
        },
   
        {
          path: 'users/:id',
          element: <PrivateRoute>
            <DetailedUser />
            </PrivateRoute>,
        },

             {
          path: 'products',
          element: <Products title={'products'} btnLabel={'add new product'} />,
        },
        {
          path: 'products/:id',
          element: <DetailedProduct />,
        },
      ],
    },
  ]);

  return router;
}
