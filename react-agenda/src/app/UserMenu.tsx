import { Box, Icon } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { IUser, singOutEndPoint } from './backend';

interface IUserMenu {
  onSingOut: () => void;
  user: IUser;
}

const useStyles = makeStyles({
  userDetails: {
    borderBottom: '1px solid rgb(224, 224, 224)',
    padding: '16px',
    display: 'flex',
    marginBottom: '8px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& > *': {
    marginBottom: '8px',
  },
});

export default function UserMenu(props: IUserMenu) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function singOut() {
    singOutEndPoint();
    props.onSingOut();
  }

  return (
    <IconButton aria-label="User">
      <div>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box className={classes.userDetails}>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
            <div>{props.user.name}</div>
            <small>{props.user.email}</small>
          </Box>

          <MenuItem onClick={singOut}>Logout</MenuItem>
        </Menu>
      </div>
    </IconButton>
  );
}
