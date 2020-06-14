import React from 'react';
import { node } from 'prop-types';
import Nav from '../Nav';
import Footer from '../Footer';

const Layout = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: node.isRequired
};

export default Layout;
