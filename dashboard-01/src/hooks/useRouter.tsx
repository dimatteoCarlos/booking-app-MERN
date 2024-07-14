//Router.tsx
//Parent: App.tsx
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../pages/error/ErrorPage';
import Home from '../pages/home/Home';
import Layout from '../pages/layout/Layout';

import UnderConstruction from '../pages/underConstruction/UnderConstruction';
import PrivateRoute from '../components/privateRoute/PrivateRoute';

import ListItems from '../pages/listItems/ListItems.tsx';
import DetailedUser from '../pages/detailedUser/DetailedUser';
import { DetailedProduct } from '../pages/detailedProduct/DetailedProduct';

import { userRows, productRows } from '../data/data.ts';

// import { data_hotel as hotelRows } from '../data/data_hotel_1000.ts';

import { usersHeaderColumnData } from '../pages/listItems/itemHeaderColumns/usersHeaderColumns.tsx';

import { productsHeaderColumnData } from '../pages/listItems/itemHeaderColumns/productsHeaderColumns.tsx';

import { roomsHeaderColumnData } from '../pages/listItems/itemHeaderColumns/roomsHeaderColumns.tsx';

import { hotelsHeaderColumnData } from '../pages/listItems/itemHeaderColumns/hotelsHeaderColumns.tsx';
import LoginAdmin from '../pages/loginAdmin/LoginAdmin.tsx';

export type UserInfoDBType = {
  _id: string;
  img: string;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city: string;
  occupation: string;
  role: string;
  phone: string;
  isAdmin: Boolean;
};

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
          path: 'users',
          element: (
            // <PrivateRoute>
            <ListItems
              itemsHeaderColumnData={usersHeaderColumnData}
              itemRowsData={userRows!}
            />
            //</PrivateRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <PrivateRoute>
              <ListItems
                itemsHeaderColumnData={productsHeaderColumnData}
                itemRowsData={productRows}
              />
            </PrivateRoute>
          ),
        },
        {
          path: 'hotels',
          element: (
            <PrivateRoute>
              <ListItems
                itemsHeaderColumnData={hotelsHeaderColumnData}
                // itemRowsData={hotelRows}
              />
            </PrivateRoute>
          ),
        },

        {
          path: 'hotels/new',
          element: (
            <PrivateRoute>
              <ListItems
                itemsHeaderColumnData={hotelsHeaderColumnData}
                // itemRowsData={hotelRows}
              />
            </PrivateRoute>
          ),
        },


        {
          path: 'rooms',
          element: (
            <PrivateRoute>
              <ListItems
                itemsHeaderColumnData={roomsHeaderColumnData}
                itemRowsData={undefined}
              />
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
        { path: '/login', element: <LoginAdmin /> },

        // { path: '/logout', element:
        //     <Logout />
        //  },
        // { path: '/register', element:
        //     <Register/>
        //  },
      ],
    },
  ]);

  return router;
}
