import React, { useEffect } from 'react';
import { node } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { startCheckLoggedIn } from '../../actions/auth';

import Header from '../Header';
import Footer from '../Footer';
import { Content, Main } from './css';
import { selectAuthLoading } from '../../selectors/auth';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  useEffect(() => {
    dispatch(startCheckLoggedIn());
  }, []);

  if (isLoading) return null;

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
