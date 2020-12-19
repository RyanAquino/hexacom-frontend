import React, {Component} from 'react';
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
            isDeactivated: false,
            checkingCredentials: false,
            invalidCredentials: false,
            failedMessage: ''
        };

    }

    componentDidMount() {
        if (localStorage.getItem('username') !== null && localStorage.getItem('token') !== null) {
            console.log(localStorage.getItem('token'))
            document.location.href = '/dashboard'
        }
    }

    loginHandler() {
        this.setState({
            checkingCredentials: true
        });
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        const headers = {
            'Content-type': 'Application/json',
        };

        axios.post('login', data, {headers})
            .then((response) => {
                console.log(response)
                axios.get('user/' + this.state.username, {
                    headers: {
                        'Content-type': 'Application/json',
                        'Authorization': 'Bearer ' + response.data.access_token
                    }
                })
                    .then(res => {
                        if (res.data.type === 'admin') {
                            localStorage.setItem('status', 'yes')
                        }

                    })
                    .then(() => {
                        if (response.status === 200) {
                            localStorage.setItem('username', this.state.username)
                            localStorage.setItem('token', response.data.access_token)
                            document.location.href = '/dashboard'
                        }
                        this.setState({
                            checkingCredentials: false,
                            invalidCredentials: false
                        });
                    })

            })
            .catch((e) => {
                localStorage.clear()
                if (e.response.data.message) {
                    this.setState({
                        checkingCredentials: false,
                        invalidCredentials: true,
                        failedMessage: e.response.data.message
                    });
                }


            })

        ;
    };

    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

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
                    this.state.invalidCredentials ?
                        <Grid container justify="center" style={styles.marginTop}>
                            <Grid item xs={3}>
                                <Typography align="center" variant="h4">
                                    <Alert severity="error">{this.state.failedMessage}</Alert>
                                </Typography>
                            </Grid>
                        </Grid> :
                        null
                }
                <form>
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
                            this.state.checkingCredentials ?
                                <Grid container justify="center" style={styles.marginTop}>
                                    <Grid item xs={3}>
                                        <Typography align="center" variant="h4">
                                            <CircularProgress/>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container justify="center" style={styles.marginTop}>
                                    <Grid item xs={3}>
                                        <Typography align="center" variant="h4">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                onClick={() => this.loginHandler()}
                                            >
                                                Login
                                            </Button>
                                        </Typography>
                                    </Grid>
                                </Grid>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
