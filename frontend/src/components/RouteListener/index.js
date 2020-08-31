import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../selectors/auth';

const RouteListener = ({ children }) => {
  const router = useRouter();
  console.log(router);
  const { pathname } = router;
  const isLoggedIn = useSelector(selectAuthUser);

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

  useEffect(() => {
    // Analytics here
    console.log(router.asPath);
  }, [pathname]);

  return children;
};

export default RouteListener;
