import * as React from "react";
import {
  useSession, signIn, signOut
} from 'next-auth/client'
import { Avatar, Box, Button, ButtonGroup, Grid, Image, ListIcon, ListItem, Menu, MenuItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, typography } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";


const MyAvatar = () => {
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    /* {if logged in, profile foto else avatar } */
    !loading && session ? (
      <Popover placement="top-start">
        <PopoverTrigger>
            <Avatar
              src={`https://avatars.dicebear.com/api/bottts/${session.user.email}.svg`}
              alt={session.user.name}
            />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Login/Share</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Grid templateColumns="repeat(3, 3fr)" gap={1}>
              <Image boxSize="30px" src="img/fbook-share.png" />
              <Image boxSize="30px" src="img/linkedin-share.png" />
              <Image boxSize="30px" src="img/twitter-share.png" />
            </Grid>
            <Button onClick={() =>signOut()}>Log Out</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    ) : (
      <Button leftIcon={<CheckCircleIcon />} onClick={() => signIn()}>
        Login
      </Button>
    )
  );
};

export default MyAvatar;

