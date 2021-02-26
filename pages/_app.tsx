import { ThemeProvider } from "next-themes";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Layout/Footer";
import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Sen Hung Wong</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
