//Appt.tsx
//Parent:main.tsx

import './styles/index.css';

import { RouterProvider } from 'react-router-dom';
import useRouter from './hooks/useRouter';
import AuthContextProvider from './context/AuthContext';

function App(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
