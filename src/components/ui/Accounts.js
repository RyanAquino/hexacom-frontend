import React, {useEffect, useState} from 'react';
import MUIDataTable from 'mui-datatables';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from 'axios';
import theme from './Theme';
import Header from './header';

function Accounts() {
    const useStyle = makeStyles(() => ({
        dataTable: {
            marginTop: '3%',
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        margins: {
            marginTop: '2rem',
        },
    }));

    const columns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'number',
            label: 'Contact Number',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'address',
            label: 'Address',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'options',
            label: 'Options',
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    const [useData, setUseData] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');


    useEffect(() => {
        const userToken = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        axios.get('users', {
            headers: {
                Authorization: 'Bearer' + ' ' + userToken,
                'Content-type': 'Application/json',
            },
        })
            .then((response) => {
                const res = response.data.user;
                console.log(response)
                for (let i = 0; i < res.length; i++) {
                    delete res[i].job_orders;
                }
                updateStatus(res)
                setUseData(res);
            })
            .catch((e) => {
                if (e.response.status === 401) {
                    localStorage.clear()
                    document.location.href = '/'
                } else {
                    console.log(e)
                }

            })
        ;
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateAccount = (id) => {
        let auth = localStorage.getItem('token')
        axios.post('user_switch/' + id, {}, {
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + auth
                }
            }
        )
            .then(res => {
                document.location.href = '/accounts'
            }).catch(e => {
            console.log('I am erroring!')
            console.log(e)
        })
    }

    const updateStatus = (data) => {
        console.log(data[0].status)
        let auth = localStorage.getItem('username')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].status === 'active') {
                data[i].options =
                    <Button variant="contained" color="secondary" onClick={() => updateAccount(data[i].username)}>
                        Deactivate
                    </Button>
            } else {
                data[i].options =
                    <Button variant="contained" color="primary" onClick={() => updateAccount(data[i].username)}>
                        Activate
                    </Button>
            }

        }

        return data
    }
    const createUser = () => {
        const status = 'active'
        const type = 'user'
        // let number;
        const data = {
            username,
            password,
            name,
            number,
            address,
            status,
            type
        };
        const headers = {
            'Content-type': 'Application/json',
        };
        axios.post('register', data, {headers})
            .then((response) => {
                if (response.status === 201) {
                    window.location.reload(false);
                }
            })
            .catch((e) => {
                localStorage.clear()
                document.location.href = '/'
            })
        ;

    };

    const options = {
        selectableRows: 'none',
        sortOrder: {
            name: 'status',
            direction: 'asc'
        },
        customToolbar: () => (
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon/>}
                onClick={handleOpen}
            >
                New
            </Button>
        ),
    };

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    backgroundColor: "#FFF",
                    height: "2rem"
                }
            }
        }
    })

    const classes = useStyle();
    return (
        <>
            <Header/>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container justify="center">
                                <Grid item xs={6}>
                                    <Typography align="center">
                                        New user account
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item={6}>
                                    <FormControl fullWidth className={classes.margins} variant="outlined">
                                        <InputLabel htmlFor="username-input">Username</InputLabel>
                                        <OutlinedInput
                                            id="username-input"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.margins} variant="outlined">
                                        <InputLabel htmlFor="password-input">Password</InputLabel>
                                        <OutlinedInput
                                            id="password-input"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.margins} variant="outlined">
                                        <InputLabel htmlFor="fullname-input">Full Name</InputLabel>
                                        <OutlinedInput
                                            id="fullname-input"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.margins} variant="outlined">
                                        <InputLabel htmlFor="number-input">Contact Number</InputLabel>
                                        <OutlinedInput
                                            id="number-input"
                                            value={number}
                                            onChange={(event) => setNumber(event.target.value)}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.margins} variant="outlined">
                                        <InputLabel htmlFor="password-input">Address</InputLabel>
                                        <OutlinedInput
                                            id="address-input"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" className={classes.margins}>
                                <Grid item xs={6}>
                                    <Typography align="center">
                                        <Button variant="contained" type="button" color="primary" onClick={createUser}>
                                            Create
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <div className={classes.dataTable}>
                <MuiThemeProvider theme={getMuiTheme}>
                    <MUIDataTable
                        title="Account Management"
                        data={useData}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
            </div>
        </>
    );
}

export default Accounts;
