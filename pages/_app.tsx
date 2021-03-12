import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Top 5 Plays</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
