import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkingCredentials: false,
      invalidCredentials: false,
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('username'));
    if (localStorage.getItem('token') !== null && localStorage.getItem('username') !== null) {
      console.log('redirecting....');
      document.location.href = '/dashboard';
    }
  }

  usernameChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  loginHandler() {
    this.setState({
      checkingCredentials: true,
    });
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    const headers = {
      'Content-type': 'Application/json',
    };
    axios.post('login', data, { headers })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('username', this.state.username);
        }
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('username'));
        this.setState({
          checkingCredentials: false,
          invalidCredentials: false,
        });
      })
      .catch((e) => {
        this.setState({
          checkingCredentials: false,
          invalidCredentials: true,
        });
        console.log(e);
      });
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10%',
      },
      marginTop: {
        marginTop: '5%',
      },
      textColor: {
        color: 'aqua',
      },
      borderColors: {
        border: 'thick',
      },
    };

    return (
      <div>

        {
          this.state.invalidCredentials
            ? (
              <Grid container justify="center" style={styles.marginTop}>
                <Grid item xs={3}>
                  <Typography align="center" variant="h4">
                    <Alert severity="error">
                      Wrong Credentials!, Please check your username and
                      password.
                    </Alert>
                  </Typography>
                </Grid>
              </Grid>
            )
            : null
        }
        <div style={styles.root}>
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
          <Grid container justify="center" style={styles.marginTop}>
            <Grid item xs={4}>
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
                value={this.state.username}
                onChange={this.usernameChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={4}>
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
                value={this.state.password}
                onChange={this.passwordChangeHandler}
              />
            </Grid>
          </Grid>

          {
            this.state.checkingCredentials
              ? (
                <Grid container justify="center" style={styles.marginTop}>
                  <Grid item xs={3}>
                    <Typography align="center" variant="h4">
                      <CircularProgress />
                    </Typography>
                  </Grid>
                </Grid>
              )
              : (
                <Grid container justify="center" style={styles.marginTop}>
                  <Grid item xs={3}>
                    <Typography align="center" variant="h4">
                      <Button
                        variant="contained"
                        color="primary"
                        href="#contained-buttons"
                        fullWidth
                        size="large"
                        onClick={() => this.loginHandler()}
                      >
                        Login
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              )
          }

        </div>
      </div>
    );
  }
}

export default Login;