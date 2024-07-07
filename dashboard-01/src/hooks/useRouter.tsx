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
import Login from '../pages/login/Login';

export default function useRouter() {
  const router = createBrowserRouter([
    { path: 'link', element: <UnderConstruction /> },
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            // <PrivateRoute>
            <Home />
            // {/* </PrivateRoute> */}
          ),
        },
        {
          path: 'users',
          element: (
            // <PrivateRoute>
            //change it later to UsersList, ProductList, make just one DetailedItem reusable component to show detailed info of any Item

            <Users title={'users'} btnLabel={'add new user'} />
            //</PrivateRoute>
          ),
        },

        {
          path: 'users/:id',
          element: (
            <PrivateRoute>
              <DetailedUser />
            </PrivateRoute>
          ),
        },

        {
          path: 'users/new',
          element: (
            <PrivateRoute>
              {/* <NewToAdd inputs={newUserEntry} title='Add New User'/> */}
            </PrivateRoute>
          ),
        },

        {
          path: 'products',
          element: (
            <PrivateRoute>
              <Products title={'products'} btnLabel={'add new product'} />
            </PrivateRoute>
          ),
        },
        {
          path: 'products/:id',

          element: (
            <PrivateRoute>
              <DetailedProduct />
            </PrivateRoute>
          ),
        },

        {
          path: 'products/new',
          element: (
            <PrivateRoute>
              {/* <NewToAdd inputs={newProductEntry} title='Add New Product'/> */}
            </PrivateRoute>
          ),
        },

        { path: '/login', element: <Login /> },

        // { path: '/logout', element:
        //     <Logout />
        //  },
        // { path: '/register', element:
        //     <Register />
        //  },
      ],
    },
  ]);

  return router;
}
