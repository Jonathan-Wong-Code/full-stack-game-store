// import App from 'next/app'
import { GlobalStyle } from "../theme/Global";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme/themes";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

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
