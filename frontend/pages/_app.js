// import App from 'next/app'
import React, { useEffect } from 'react';
import Head from 'next/head';
import { object, func } from 'prop-types';
import { Provider } from 'react-redux';
import 'wicg-inert';
import ReactGa from 'react-ga';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme/themes';
import { ThemeContextProvider } from '../src/context/themeContext';

import { configureStore } from '../src/store';

import { GlobalStyle } from '../theme/Global';
import Layout from '../src/components/Layout';
import RouteListener from '../src/components/RouteListener';

function MyApp({ Component, pageProps }) {
  const { store } = configureStore(pageProps.initialReduxState);

  useEffect(() => {
    ReactGa.initialize(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeContextProvider theme={defaultTheme}>
        <ThemeProvider theme={defaultTheme}>
          <Provider store={store}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  );
}

MyApp.propTypes = {
  pageProps: object.isRequired,
  Component: func.isRequired
};

export default MyApp;
