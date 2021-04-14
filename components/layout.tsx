import React, { ReactNode } from "react";
import Link from "next/link";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import MyAvatar from "./MyAvatar";
import CustomHead from './CustomHead';

type Props = {
  children?: ReactNode;
  title?: string;
};

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/users", label: "Users" },
  { path: "/api/orders", label: "Orders" },
];
const Layout = ({ children, title = "ThisWeeksPlays.com" }: Props) => {
  // const [show, setShow] = useState(true);
  const { isOpen, onToggle, onClose } = useDisclosure()
  
  return (
    <Box>
      <CustomHead title={title} />
      <header>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          mb={8}
          p={3}
        >
          <Box display={{ base: "block", md: "none" }} onClick={onToggle}>
            <Button>{isOpen ? <CloseIcon /> : <HamburgerIcon />}</Button>
          </Box>

          <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  Basic Drawer
                </DrawerHeader>
                <DrawerBody>
                  {NAV_LINKS.map(({ label, path }) => (
                    <Link href={path}>
                      <a>
                        <Box bg="blue.500">{label}</Box>
                      </a>
                    </Link>
                  ))}
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          <Grid
          width="100%"
            templateColumns="repeat(4, 1fr)"
            gap={6}
            display={["none", "flex"]}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <Link href={path}>
                <a>
                  <Box bg="blue.500" padding="3" borderRadius="sm">{label}</Box>
                </a>
              </Link>
            ))}
            <Box position="absolute" right="0" paddingInline="3"><MyAvatar /></Box>
          </Grid>
        </Flex>
      </header>
      <Box>{children}</Box>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </Box>
  );
};

export default Layout;

