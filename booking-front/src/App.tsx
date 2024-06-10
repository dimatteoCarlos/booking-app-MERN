import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import DefaultLayout from './pages/defaultLayout/DefaultLayout';
import ListOfHotels from './pages/listOfHotels/ListOfHotels';
import DetailsOfHotel from './pages/detailsOfHotel/DetailsOfHotel';

import { ModeType } from './types/typesHotel';
import Login from './pages/login/Login';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
          id: 'Home',
          loader: (): ModeType => {
            return null;
          },
        },
        {
          path: '/hotels',
          element: <ListOfHotels />,
          id: 'ListOfHotels',
          loader: (): ModeType => {
            return 'list';
          },
        },
        { path: '/hotels/:hotelId', element: <DetailsOfHotel /> },

        { path: '/login', element: <Login /> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
//video: 2:03:37 -  context api para hotelId;
//
