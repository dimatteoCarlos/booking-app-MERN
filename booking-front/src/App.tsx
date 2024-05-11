import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import ErrorPage from './pages/errorPage/ErrorPage';
import DefaultLayout from './pages/defaultLayout/DefaultLayout';

import ListOfHotels from './pages/listOfHotels/ListOfHotels';
import DetailsOfHotel from './pages/detailsOfHotel/DetailsOfHotel';

import { ModeType } from './types/types';

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
        { path: '/hotels/:hotel', element: <DetailsOfHotel /> },
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
