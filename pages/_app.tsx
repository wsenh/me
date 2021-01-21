import { ThemeProvider } from "next-themes";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Sen Hung Wong</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
