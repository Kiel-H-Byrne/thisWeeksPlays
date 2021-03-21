import * as React from "react";
import {
  useSession, signIn, signOut
} from 'next-auth/client'
import { ButtonGroup, ListIcon, ListItem, Menu, MenuItem, typography } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";


const MyAvatar = () => {
  
  const [ session, loading ] = useSession()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (session) {
    console.log(session.user);
  }

  return (
    <div>
      <ButtonGroup
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="primary"
        onClick={handleClick}
      >
        {
          /* {if logged in, profile foto else avatar } */
          !loading && session ? (
            <Avatar src={user.picture} alt={user.name} />
          ) : (
            <img src="img/Logo_MOBB-banner.png" alt={"MOBB"} />
          )
        }
      </ButtonGroup>
      <Menu
        id="customized-menu"
        onClose={handleClose}
      >
        <MenuItem>
          <ListIcon />
          {/* <ListItemText primary="Share" /> */}
          <ListItem className={classes.root}>
            <a
              className="link-share"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2FMOBB%2Ekielbyrne%2Ecom&amp;title=Locate%2C+Promote%2C+%26+Support+a+Business+Owned+By+Us%2E"
              target="_blank"
              rel="noreferrer noopener"
              title="Share on Facebook"
            >
              <img
                src="/img/fbook-share.png"
                alt="Share on Facebook"
                className={classes.image}
              />
            </a>
            <a
              className="link-share"
              href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2FMOBB%2Ekielbyrne%2Ecom&amp;title=Locate%2C+Promote%2C+%26+Support+a+Business+Owned+By+Us%2E&amp;source=mobb%2Ekielbyrne%2Ecom"
              target="_blank"
              rel="noreferrer noopener"
              title="Share on LinkedIn"
            >
              <img
                src="/img/linkedin-share.png"
                alt="Share on LinkedIn"
                className={classes.image}
              />
            </a>
            <a
              className="link-share"
              href="https://twitter.com/intent/tweet?text=Locate%2C+Promote%2C+%26+Support+a+Business+Owned+By+Us%3A+MOBB%2Ekielbyrne%2Ecom"
              target="_blank"
              rel="noreferrer noopener"
              title="Share on Twitter"
            >
              <img
                src="/img/twitter-share.png"
                alt="Share on Twitter"
                className={classes.image}
              />
            </a>
          </ListItem>
        </MenuItem>
        {/* <MenuItem
          onClick={() => (isAuthenticated ? logout() : loginWithPopup())}
        >
          <ListItemIcon>
            <ExitToAppTwoTone />
          </ListItemIcon>
          <ListItemText primary={isAuthenticated ? "Sign Out" : "Sign In"} />
        </MenuItem>
         */}
        <MenuItem>
          <InfoIcon />
          <ListItem primary="About" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyAvatar;