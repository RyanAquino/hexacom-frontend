import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Grid } from '@material-ui/core';
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
      name: '-',
      label: '-',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const [useData, setUseData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users', {
      headers: {
        Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDc3Njk4MTEsImlhdCI6MTYwNzc0MTAxMSwibmJmIjoxNjA3NzQxMDExLCJpZGVudGl0eSI6Mn0.E1oNV2LpSB0_qV5xrd7Qg3K9Cbd9ivoxyAUKASwe-Kc',
        'Content-type': 'Application/json',
      },
    })
      .then((response) => {
        const res = response.data.user;
        for (let i = 0; i < res.length; i++) {
          delete res[i].job_orders;
        }
        setUseData(res);
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createUser = () => {
    const data = {
      username,
      password,
      name,
    };
    const headers = {
      'Content-type': 'Application/json',
    };
    axios.post('http://localhost:5000/register', data, { headers })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      });
  };

  const options = {
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New
      </Button>
    ),
  };

  const classes = useStyle();
  return (
    <>
      <Header />
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
                    <InputLabel htmlFor="fullname-input">Full Name</InputLabel>
                    <OutlinedInput
                      id="fullname-input"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
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
        <MUIDataTable
          title="Account Management"
          data={useData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

export default Accounts;
