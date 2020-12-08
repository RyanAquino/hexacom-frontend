import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
}));

function Header() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Hexacom
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarMargin} />
      </div>
    </>
  );
}

export default Header;
