import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Header from "./header";
import axios from "axios";

const ChangePassword = () => {
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
    const [isLoading, setLoading] = useState(false)
    const [isFailed, setFailed] = useState(false)
    const [old, setOld] = useState('')
    const [newPass, setPass] = useState('')
    const [newPass2, setPass2] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)

    const updatePassword = () => {
        console.log(old, newPass, newPass2)
        let auth = localStorage.getItem('token')
        if (newPass !== newPass2) {
            setFailed(true)
            console.log('New passwords do not match!')
        }else {
                const data = {
                    old_password: old,
                    password: newPass,
                };
                const headers = {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + auth
                };
                axios.post('change_password', data, {headers})
                    .then((response) => {
                        console.log(response.status)
                        if (response.status === 200){
                            setSuccess(true)
                        }
                        setMessage(response.data.message)


                    })
                    .catch((e) => {
                        if(e.response.data.message){
                            setMessage(e.response.data.message)
                        }else {
                            localStorage.clear()
                            document.location.href = '/'
                        }

                    })
                ;
        }
    }


    return (

        <div>
            <Header/>
            {
                success === false && message !== ''?
                    <Grid container justify="center" style={styles.marginTop}>
                        <Grid item xs={3}>
                            <Typography align="center" variant="h4">
                                <Alert severity="error">{message}</Alert>
                            </Typography>
                        </Grid>
                    </Grid> :
                    null

            }
            {
                success ?
                    <Grid container justify="center" style={styles.marginTop}>
                        <Grid item xs={3}>
                            <Typography align="center" variant="h4">
                                <Alert severity="success">{message}</Alert>
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
                                Update Password
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={styles.marginTop}>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-full-width-old"
                                label="Old password"
                                placeholder="Enter old password"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={old}
                                onChange={(event) => setOld(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-full-width-password1"
                                label="New Password"
                                placeholder="Enter new password"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                type="password"
                                value={newPass}
                                onChange={(event) => setPass(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-full-width-password2"
                                label="Confirm Password"
                                placeholder="Confirm password"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                type="password"
                                value={newPass2}
                                onChange={(event) => setPass2(event.target.value)}
                            />
                        </Grid>
                    </Grid>

                    {
                        isLoading ?
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
                                            onClick={() => updatePassword()}
                                        >
                                            Update Password
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                    }

                    {
                        isFailed ?
                            <Grid container justify="center" style={styles.marginTop}>
                                <Grid item xs={3}>
                                    <Typography align="center" variant="h4">
                                        <Alert severity="error">New passwords do not match! </Alert>
                                    </Typography>
                                </Grid>
                            </Grid>
                            :
                            null
                    }
                </div>
            </form>

        </div>
    )
}

export default ChangePassword
