import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Head>
          <title>Top 5 Plays</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
