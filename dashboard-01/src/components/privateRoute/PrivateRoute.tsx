//PrivateRoute.tsx
//Parent: useRouter.tsx

import { useNavigate } from 'react-router-dom';
import { useAuthData } from '../../context/AuthContext';

import { useEffect } from 'react';
import { PropsWithChildren } from 'react';
type ProtectedRouteProps = PropsWithChildren;

function PrivateRoute({ children }: ProtectedRouteProps): JSX.Element {
  const navigateTo = useNavigate();
  const {
    authState: {
      user: { username },
      user: { email },
      // ...rest
    },
  } = useAuthData();

  // console.log('resto:', rest);

  useEffect(() => {
    const userIsLoggedIn = !!(username && email);

    if (!userIsLoggedIn) {
      navigateTo('/login', { replace: true });
    }
  }, [username, email, navigateTo]);

  return <>{children}</>;
}

export default PrivateRoute;
