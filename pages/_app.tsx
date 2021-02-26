import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Next.js + MongoDB App</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
