import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Container, Flex, Grid, MenuIcon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import MyAvatar from "./MyAvatar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [show, setShow] = useState(true);
  const toggleMenu = () => {};

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          mb={8}
          p={3}
        >
          <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
            {show ? <CloseIcon /> : <MenuIcon />}
          </Box>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <Link href="/">
              <a>
                <Box bg="blue.500">Home</Box>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <Box bg="blue.500">About</Box>
              </a>
            </Link>
            <Link href="/users">
              <a>
                <Box bg="blue.500">Users List</Box>
              </a>
            </Link>
            <a href="/api/users">
              <Box bg="blue.500">Users API</Box>
            </a>
            <MyAvatar />
          </Grid>
        </Flex>
      </header>
      <div>{children}</div>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
