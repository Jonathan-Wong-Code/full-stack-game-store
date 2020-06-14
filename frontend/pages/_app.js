// import App from 'next/app'
import React from 'react';
import Head from 'next/head';
import { object, func } from 'prop-types';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme/themes';
import { ThemeContextProvider } from '../src/context/themeContext';
import { Wrapper } from '../src/components/Wrapper';
import { GlobalStyle } from '../theme/Global';
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
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
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  );
}

MyApp.propTypes = {
  pageProps: object.isRequired,
  Component: func.isRequired
};
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
