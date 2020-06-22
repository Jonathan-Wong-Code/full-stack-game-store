import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../selectors/auth';

const RouteListener = ({ children }) => {
  const router = useRouter();
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

  return children;
};

export default RouteListener;
