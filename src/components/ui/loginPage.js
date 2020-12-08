import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10%',
  },
  marginTop: {
    marginTop: '2%',
  },
  textColor: {
    color: 'aqua',
  },
  borderColors: {
    border: 'thick',
  },
}));

function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={4}>
          <Typography align="center" variant="h3">
            HEXACOM
          </Typography>
          <Typography align="center" variant="h6">
            Login Page
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.marginTop}>
        <Grid item xs={3}>
          <TextField
            id="outlined-full-width-username"
            label="Username"
            placeholder="Enter username"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={3}>
          <TextField
            id="outlined-full-width-password"
            label="Password"
            placeholder="Enter password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.marginTop}>
        <Grid item xs={2}>
          <Typography align="center" variant="h4">
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
