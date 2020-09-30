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
        case '/signup':
        case '/forgotPassword':
        case '/resetPassword':
          router.push('/');
          break;
        default:
          break;
      }
    }
    if (!isLoggedIn) {
      switch (pathname) {
        case '/profile':
        case '/edit-profile':
        case '/updatePassword':
          router.push('/');
          break;
        default:
          break;
      }
    }
  }, [pathname, isLoggedIn]);

  useEffect(() => {
    // Analytics here
    if (
      pathname !== '/login' ||
      pathname !== '/signup' ||
      pathname !== '/forgotPassword' ||
      pathname !== '/resetPassword/[resetToken]'
    ) {
      ReactGa.pageview(router.asPath);
    }
  }, [pathname]);

  return children;
};

export default RouteListener;
