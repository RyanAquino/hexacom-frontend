import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  tabContainer: {
    marginLeft: 'auto',
    marginRight: '50px',
  },
  tab: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '1rem',
    marginLeft: '25px',
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [value, setValue] = useState(0);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeNavigation = (e, v) => {
    setValue(v);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Hexacom
            </Typography>
            <Tabs value={value} onChange={changeNavigation} className={classes.tabContainer}>
              <Tab className={classes.tab} label="Dashboard" />
              <Tab className={classes.tab} label="Accounts" />
              <Tab className={classes.tab} label="Configuration" />
            </Tabs>
            <IconButton>
              <PermIdentityIcon onClick={handleClick} />
            </IconButton>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </StyledMenuItem>
            </StyledMenu>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarMargin} />
      </div>
    </>
  );
}

export default Header;
