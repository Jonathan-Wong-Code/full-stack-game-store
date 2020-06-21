import React, { useEffect } from 'react';
import { node } from 'prop-types';

import { useDispatch } from 'react-redux';
import { startCheckLoggedIn } from '../../actions/auth';

import Nav from '../Nav';
import Footer from '../Footer';
import { Content, Main } from './css';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCheckLoggedIn());
  }, []);

  return (
    <>
      <Content>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Nav />
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
