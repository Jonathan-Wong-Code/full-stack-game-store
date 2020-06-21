import React from 'react';
// import Router from 'next/router';

import { useSelector } from 'react-redux';
import { selectAuthUser } from '../selectors/auth';

function withAuth(Component) {
  return function WrappedComponent() {
    const isLoggedIn = !!useSelector(selectAuthUser);
    return <Component isLoggedIn={isLoggedIn} />;
  };
}

export default withAuth;
