import { useEffect } from 'react';

import ReactGa from 'react-ga';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../selectors/auth';

const RouteListener = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const isLoggedIn = useSelector(selectAuthUser);

  useEffect(() => {
    if (isLoggedIn) {
      switch (pathname) {
        case '/login':
          router.push('/');
          break;
        case '/signup':
          router.push('/');
          break;
        case '/forgotPassword':
          router.push('/');
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    // Analytics here
    if (
      pathname !== '/login' ||
      pathname !== '/signup' ||
      pathname !== '/forgotPassword'
    ) {
      ReactGa.pageview(router.asPath);
    }
  }, [pathname]);

  return children;
};

export default RouteListener;
