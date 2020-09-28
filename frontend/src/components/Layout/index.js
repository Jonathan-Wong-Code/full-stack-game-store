import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { useDispatch } from 'react-redux';
import { startCheckLoggedIn } from '../../actions/auth';
import { getCartItems } from '../../actions/cart';

import Header from '../Header';
import Footer from '../Footer';
import { Content, Main } from './css';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      await dispatch(startCheckLoggedIn());
      setLoading(false);
    };

    dispatch(getCartItems());
    checkLoggedIn();
  }, []);

  if (loading) return null;

  return (
    <>
      <Content>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Header />
          <Main>{children}</Main>
        </div>
      </Content>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired
};

export default Layout;
