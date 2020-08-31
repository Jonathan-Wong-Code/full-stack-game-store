// import App from 'next/app'
import React from 'react';
import Head from 'next/head';
import { object, func } from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'wicg-inert';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme/themes';
import { ThemeContextProvider } from '../src/context/themeContext';

import { configureStore } from '../src/store';

import { GlobalStyle } from '../theme/Global';
import Layout from '../src/components/Layout';
import RouteListener from '../src/components/RouteListener';

function MyApp({ Component, pageProps }) {
  const { store, persistor } = configureStore(pageProps.initialReduxState);

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
            <PersistGate loading={null} persistor={persistor}>
              <GlobalStyle />
              <Layout>
                <RouteListener>
                  <Component {...pageProps} />
                </RouteListener>
              </Layout>
            </PersistGate>
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
